const normalizeText = (value) => String(value ?? "")
  .normalize("NFKC")
  .trim()
  .toLocaleLowerCase("en-IN")
  .replace(/[^\p{L}\p{N}\s-]/gu, " ")
  .replace(/\s+/g, " ");

export function normalizeProfile(profile) {
  return {
    gender: normalizeText(profile.gender),
    socialCategory: normalizeText(profile.socialCategory),
    disability: Boolean(profile.disability),
    sector: normalizeText(profile.sector),
    location: normalizeText(profile.location),
    fundingNeed: Number(profile.fundingNeed),
  };
}

export function encodeCategorical(profile) {
  const categories = {
    gender: ["woman", "man", "nonbinary", "prefer-not-to-say"],
    socialCategory: ["sc", "st", "obc", "minority", "general"],
    disability: ["yes", "no"],
  };
  const values = {
    gender: profile.gender,
    socialCategory: profile.socialCategory,
    disability: profile.disability ? "yes" : "no",
  };
  return Object.fromEntries(Object.entries(categories).map(([field, options]) => [
    field,
    Object.fromEntries(options.map((option) => [option, values[field] === option ? 1 : 0])),
  ]));
}

function tokens(text) {
  return normalizeText(text).split(" ").filter((token) => token.length > 1);
}

function tfidfVectors(documents) {
  const tokenized = documents.map(tokens);
  const documentFrequency = new Map();
  tokenized.forEach((terms) => {
    for (const term of new Set(terms)) {
      documentFrequency.set(term, (documentFrequency.get(term) ?? 0) + 1);
    }
  });
  return tokenized.map((terms) => {
    const counts = new Map();
    terms.forEach((term) => counts.set(term, (counts.get(term) ?? 0) + 1));
    const vector = new Map();
    for (const [term, count] of counts) {
      const inverseFrequency = Math.log((documents.length + 1) / ((documentFrequency.get(term) ?? 0) + 1)) + 1;
      vector.set(term, (count / terms.length) * inverseFrequency);
    }
    return vector;
  });
}

function cosineSimilarity(left, right) {
  let dot = 0;
  let leftNorm = 0;
  let rightNorm = 0;
  for (const value of left.values()) leftNorm += value * value;
  for (const value of right.values()) rightNorm += value * value;
  for (const [term, value] of left) dot += value * (right.get(term) ?? 0);
  return leftNorm && rightNorm ? dot / (Math.sqrt(leftNorm) * Math.sqrt(rightNorm)) : 0;
}

function isEligible(profile, rules = {}) {
  const matchesDemographicGroup = (group = {}) => {
    const gender = (group.gender ?? []).map(normalizeText);
    const categories = (group.socialCategories ?? []).map(normalizeText);
    return (!gender.length || gender.includes(profile.gender))
      && (!categories.length || categories.includes(profile.socialCategory))
      && (group.disability == null || group.disability === profile.disability);
  };
  const sectors = (rules.sectors ?? []).map(normalizeText);
  const states = (rules.states ?? []).map(normalizeText);
  const demographicsMatch = rules.anyOf?.length
    ? rules.anyOf.some((group) => matchesDemographicGroup(group))
    : matchesDemographicGroup(rules);
  return demographicsMatch
    && (!sectors.length || sectors.includes(profile.sector))
    && (!states.length || states.includes(profile.location))
    && profile.fundingNeed >= (rules.minFunding ?? 0)
    && (rules.maxFunding == null || profile.fundingNeed <= rules.maxFunding);
}

function explain(profile, scheme) {
  const rules = scheme.eligibilityRules ?? {};
  const reasons = [];
  if (rules.gender?.some((gender) => normalizeText(gender) === profile.gender)) reasons.push("the scheme is intended for your gender group");
  if (rules.socialCategories?.some((category) => normalizeText(category) === profile.socialCategory)) reasons.push(`it includes applicants in the ${profile.socialCategory.toUpperCase()} category`);
  if (rules.anyOf?.some((group) => group.gender?.map(normalizeText).includes(profile.gender))) reasons.push("it supports women entrepreneurs");
  if (rules.anyOf?.some((group) => group.socialCategories?.map(normalizeText).includes(profile.socialCategory))) reasons.push(`it includes applicants in the ${profile.socialCategory.toUpperCase()} category`);
  if (rules.disability === true && profile.disability) reasons.push("it is designed to support entrepreneurs with disabilities");
  if (rules.sectors?.length) reasons.push(`your ${profile.sector} business is in a supported sector`);
  else if (profile.sector) reasons.push(`it supports micro-enterprises like your ${profile.sector} business`);
  if (rules.states?.some((state) => normalizeText(state) === profile.location)) reasons.push(`it is listed for applicants in ${profile.location}`);
  if (profile.fundingNeed) reasons.push("the funding range is compatible with your stated need");
  const detail = reasons.length ? reasons.join("; ") : "your profile meets the listed baseline criteria";
  return `This may fit because ${detail}. ${scheme.benefits}`;
}

export function rankSchemes(rawProfile, schemes) {
  const profile = normalizeProfile(rawProfile);
  const eligible = schemes.filter((scheme) => isEligible(profile, scheme.eligibilityRules));
  if (!eligible.length) return [];

  const encodedValues = Object.entries(encodeCategorical(profile))
    .flatMap(([field, values]) => Object.entries(values)
      .filter(([, isActive]) => isActive)
      .map(([value]) => `${field} ${value}`))
    .join(" ");
  const profileText = `${profile.sector} ${profile.location} ${encodedValues}`;
  const documents = [profileText, ...eligible.map((scheme) => `${scheme.name} ${scheme.category} ${scheme.description} ${scheme.benefits} ${scheme.issuingBody}`)];
  const vectors = tfidfVectors(documents);
  return eligible.map((scheme, index) => {
    const similarity = cosineSimilarity(vectors[0], vectors[index + 1]);
    const matchScore = Math.min(98, Math.round(70 + similarity * 28));
    return {
      ...scheme,
      matchPercentage: matchScore,
      explanation: explain(profile, scheme),
    };
  }).sort((left, right) => right.matchPercentage - left.matchPercentage);
}
