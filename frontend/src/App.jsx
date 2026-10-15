import { useState } from "react";
import { ArrowRight, BadgeCheck, Banknote, Check, ChevronDown, CircleHelp, FileCheck2, Landmark, Languages, LoaderCircle, MapPin, ShieldCheck, Sparkles } from "lucide-react";

const copy = {
  en: {
    eyebrow: "SMALL BUSINESS SUPPORT, MADE CLEARER",
    title: "Find support for your next step.",
    intro: "Share a few details about your business. We’ll surface public schemes that may be worth exploring.",
    profile: "Your profile", profileNote: "Used only to find relevant schemes.",
    gender: "Gender", woman: "Woman", man: "Man", nonbinary: "Non-binary", prefer: "Prefer not to say",
    category: "Social category", disability: "I am a person with a disability",
    sector: "Business sector", sectorPlaceholder: "Choose a sector", manufacturing: "Manufacturing", services: "Services", trading: "Trading", agriculture: "Agriculture & allied", food: "Food & hospitality", other: "Other",
    location: "State or union territory", locationPlaceholder: "e.g. Maharashtra", funding: "Funding needed", submit: "Find matching schemes", loading: "Finding matches…",
    results: "Recommended schemes", resultsHint: "Ranked by eligibility and profile relevance", emptyTitle: "No eligible matches found", emptyText: "Try reviewing your funding need or profile details. Scheme rules can vary by state and change over time.", startTitle: "Your shortlist starts here", startText: "Complete your profile to see schemes ranked by fit, with a plain-language explanation for each.", match: "profile match", why: "Why it may fit", benefits: "Potential benefit", issued: "Issued by", giveFeedback: "Have you applied?", applied: "Applied", approved: "Approved", notEligible: "Not eligible", feedbackSent: "Feedback recorded", error: "We couldn’t load matches. Check that the API is running and try again.", privacy: "Your profile stays in this session and is not saved. Feedback is anonymous.", amount: "INR", locationError: "Enter a state or union territory.", formError: "Complete all required fields to find matches.", reference: "Illustrative scheme data · Verify current rules with the issuing body before applying.", allSchemes: "public schemes", process: "Eligibility first", processText: "Only schemes that pass the listed rules are ranked.", language: "Language",
  },
  hi: {
    eyebrow: "छोटे व्यवसायों के लिए सहायता",
    title: "अपने अगले कदम के लिए सहायता खोजें।",
    intro: "अपने व्यवसाय की कुछ जानकारी दें। हम आपके लिए उपयोगी सरकारी योजनाएँ दिखाएँगे।",
    profile: "आपकी जानकारी", profileNote: "इसका उपयोग केवल योजनाएँ खोजने के लिए होगा।",
    gender: "लिंग", woman: "महिला", man: "पुरुष", nonbinary: "नॉन-बाइनरी", prefer: "बताना नहीं चाहते",
    category: "सामाजिक वर्ग", disability: "मैं दिव्यांग व्यक्ति हूँ",
    sector: "व्यवसाय का क्षेत्र", sectorPlaceholder: "क्षेत्र चुनें", manufacturing: "विनिर्माण", services: "सेवाएँ", trading: "व्यापार", agriculture: "कृषि और संबद्ध", food: "खाद्य और आतिथ्य", other: "अन्य",
    location: "राज्य या केंद्र शासित प्रदेश", locationPlaceholder: "उदा. महाराष्ट्र", funding: "आवश्यक राशि", submit: "मिलती-जुलती योजनाएँ खोजें", loading: "योजनाएँ खोजी जा रही हैं…",
    results: "अनुशंसित योजनाएँ", resultsHint: "पात्रता और जानकारी के आधार पर क्रमबद्ध", emptyTitle: "कोई पात्र योजना नहीं मिली", emptyText: "राशि या जानकारी जाँचें। नियम राज्य के अनुसार अलग हो सकते हैं और समय के साथ बदलते हैं।", startTitle: "आपकी सूची यहाँ शुरू होगी", startText: "योजनाओं की उपयुक्तता और कारण देखने के लिए जानकारी भरें।", match: "उपयुक्तता", why: "यह क्यों उपयुक्त हो सकती है", benefits: "संभावित लाभ", issued: "जारीकर्ता", giveFeedback: "क्या आपने आवेदन किया?", applied: "आवेदन किया", approved: "स्वीकृत", notEligible: "पात्र नहीं", feedbackSent: "प्रतिक्रिया दर्ज हुई", error: "परिणाम नहीं मिल सके। API जाँचकर फिर कोशिश करें।", privacy: "आपकी जानकारी इस सत्र में रहती है और सहेजी नहीं जाती। प्रतिक्रिया गुमनाम है।", amount: "रुपये", locationError: "राज्य या केंद्र शासित प्रदेश दर्ज करें।", formError: "योजनाएँ खोजने के लिए सभी आवश्यक जानकारी भरें।", reference: "उदाहरण हेतु योजना डेटा · आवेदन से पहले जारीकर्ता से वर्तमान नियम जाँचें।", allSchemes: "सरकारी योजनाएँ", process: "पहले पात्रता", processText: "केवल पात्रता नियमों से मेल खाने वाली योजनाएँ दिखाई जाती हैं।", language: "भाषा",
  },
};

const initialProfile = {
  gender: "woman",
  socialCategory: "SC",
  disability: false,
  sector: "",
  location: "",
  fundingNeed: "500000",
};

function formatCurrency(value) {
  return new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(value);
}

function SchemeCard({ scheme, text, onFeedback, feedback }) {
  return (
    <article className="scheme-card">
      <div className="scheme-card-top">
        <div className="scheme-icon"><Landmark size={19} strokeWidth={1.8} /></div>
        <div className="match-score"><strong>{scheme.matchPercentage}%</strong><span>{text.match}</span></div>
      </div>
      <p className="scheme-category">{scheme.category}</p>
      <h3>{scheme.name}</h3>
      <div className="why-box">
        <div className="why-title"><Sparkles size={15} />{text.why}</div>
        <p>{scheme.explanation}</p>
      </div>
      <div className="scheme-details">
        <div><span>{text.benefits}</span><p>{scheme.benefits}</p></div>
        <div><span>{text.issued}</span><p>{scheme.issuingBody}</p></div>
      </div>
      <div className="feedback-row">
        <span>{feedback ? <><Check size={14} /> {text.feedbackSent}</> : text.giveFeedback}</span>
        {!feedback && <div className="feedback-actions">
          <button type="button" onClick={() => onFeedback(scheme.name, "applied")} aria-label={text.applied}>{text.applied}</button>
          <button type="button" onClick={() => onFeedback(scheme.name, "approved")} aria-label={text.approved}>{text.approved}</button>
          <button type="button" onClick={() => onFeedback(scheme.name, "not-eligible")} aria-label={text.notEligible}>{text.notEligible}</button>
        </div>}
      </div>
    </article>
  );
}

export default function App() {
  const [language, setLanguage] = useState("en");
  const [profile, setProfile] = useState(initialProfile);
  const [matches, setMatches] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [feedback, setFeedback] = useState({});
  const t = copy[language];

  function update(field, value) {
    setProfile((current) => ({ ...current, [field]: value }));
  }

  async function findMatches(event) {
    event.preventDefault();
    setError("");
    if (!profile.sector || !profile.location.trim() || !Number(profile.fundingNeed)) {
      setError(t.formError);
      return;
    }
    setIsLoading(true);
    try {
      const response = await fetch("/api/match", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...profile, fundingNeed: Number(profile.fundingNeed) }),
      });
      if (!response.ok) throw new Error("Match request failed");
      const data = await response.json();
      setMatches(data.matches);
    } catch {
      setError(t.error);
    } finally {
      setIsLoading(false);
    }
  }

  async function submitFeedback(schemeId, outcome) {
    try {
      const response = await fetch("/api/feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ schemeId, outcome }),
      });
      if (!response.ok) throw new Error("Feedback failed");
      setFeedback((current) => ({ ...current, [schemeId]: outcome }));
    } catch {
      setError(t.error);
    }
  }

  return (
    <div className="app-shell">
      <header className="topbar">
        <a className="brand" href="#top" aria-label="AI Scheme Matcher home">
          <span className="brand-mark"><Landmark size={18} /></span>
          <span>scheme<span className="brand-light">wise</span></span>
        </a>
        <div className="topbar-right">
          <span className="topbar-note"><ShieldCheck size={15} /> {t.privacy}</span>
          <label className="language-switch" aria-label={t.language}>
            <Languages size={16} />
            <select value={language} onChange={(event) => setLanguage(event.target.value)} aria-label={t.language}>
              <option value="en">EN</option>
              <option value="hi">हिंदी</option>
            </select>
            <ChevronDown size={13} />
          </label>
        </div>
      </header>

      <main id="top">
        <section className="intro-row">
          <div>
            <div className="eyebrow"><span />{t.eyebrow}</div>
            <h1>{t.title}</h1>
            <p className="intro-copy">{t.intro}</p>
          </div>
          <div className="intro-meta"><span className="meta-icon"><BadgeCheck size={20} /></span><div><strong>{t.process}</strong><span>{t.processText}</span></div></div>
        </section>

        <section className="workspace-grid" aria-label="Scheme matcher">
          <form className="profile-panel" onSubmit={findMatches}>
            <div className="panel-heading">
              <div className="panel-number">01</div>
              <div><h2>{t.profile}</h2><p>{t.profileNote}</p></div>
            </div>
            <div className="form-fields">
              <label className="field"><span>{t.gender}</span>
                <select value={profile.gender} onChange={(event) => update("gender", event.target.value)}>
                  <option value="woman">{t.woman}</option><option value="man">{t.man}</option><option value="nonbinary">{t.nonbinary}</option><option value="prefer-not-to-say">{t.prefer}</option>
                </select>
              </label>
              <label className="field"><span>{t.category}</span>
                <select value={profile.socialCategory} onChange={(event) => update("socialCategory", event.target.value)}>
                  <option value="SC">SC</option><option value="ST">ST</option><option value="OBC">OBC</option><option value="Minority">Minority</option><option value="General">General</option>
                </select>
              </label>
              <label className="check-field"><input type="checkbox" checked={profile.disability} onChange={(event) => update("disability", event.target.checked)} /><span>{t.disability}</span></label>
              <label className="field"><span>{t.sector}</span>
                <select value={profile.sector} onChange={(event) => update("sector", event.target.value)} required>
                  <option value="">{t.sectorPlaceholder}</option><option value="manufacturing">{t.manufacturing}</option><option value="services">{t.services}</option><option value="trading">{t.trading}</option><option value="agriculture">{t.agriculture}</option><option value="food and hospitality">{t.food}</option><option value="other">{t.other}</option>
                </select>
              </label>
              <label className="field"><span>{t.location}</span>
                <div className="input-with-icon"><MapPin size={16} /><input value={profile.location} onChange={(event) => update("location", event.target.value)} placeholder={t.locationPlaceholder} maxLength={100} required /></div>
              </label>
              <label className="field"><span>{t.funding}</span>
                <div className="input-with-prefix"><span>₹</span><input type="number" min="1" max="1000000000" step="1000" value={profile.fundingNeed} onChange={(event) => update("fundingNeed", event.target.value)} required /></div>
              </label>
            </div>
            <button className="submit-button" type="submit" disabled={isLoading}>
              {isLoading ? <LoaderCircle className="spin" size={17} /> : <ArrowRight size={17} />}{isLoading ? t.loading : t.submit}
            </button>
            <div className="form-footnote"><ShieldCheck size={14} />{t.privacy}</div>
          </form>

          <section className="results-panel" aria-live="polite">
            <div className="results-heading">
              <div><div className="section-overline">02 / {t.allSchemes}</div><h2>{t.results}</h2><p>{t.resultsHint}</p></div>
              {matches && matches.length > 0 && <span className="result-count">{matches.length} <span>{language === "hi" ? "मिले" : "found"}</span></span>}
            </div>
            {error && <div className="error-message" role="alert"><CircleHelp size={17} />{error}</div>}
            {matches === null ? <div className="empty-state"><div className="empty-icon"><FileCheck2 size={24} /></div><h3>{t.startTitle}</h3><p>{t.startText}</p><div className="empty-rule"><span /> <span /> <span /></div></div>
              : matches.length === 0 ? <div className="empty-state no-results"><div className="empty-icon"><CircleHelp size={24} /></div><h3>{t.emptyTitle}</h3><p>{t.emptyText}</p></div>
                : <div className="scheme-list">{matches.map((scheme) => <SchemeCard key={scheme.name} scheme={scheme} text={t} feedback={feedback[scheme.name]} onFeedback={submitFeedback} />)}</div>}
          </section>
        </section>
        <footer className="page-footer"><span><Banknote size={15} /> {t.reference}</span><a href="https://www.myscheme.gov.in/" target="_blank" rel="noreferrer">Explore official scheme directory <ArrowRight size={13} /></a></footer>
      </main>
    </div>
  );
}
