export const demoSchemes = [
  {
    name: "Pradhan Mantri MUDRA Yojana",
    category: "Micro enterprise credit",
    eligibilityRules: {
      gender: [], socialCategories: [], disability: null, sectors: [], states: [],
      minFunding: 0, maxFunding: 2000000,
    },
    benefits: "Collateral-free institutional credit for income-generating micro businesses through Shishu, Kishor and Tarun loan categories.",
    issuingBody: "Department of Financial Services, Government of India",
    description: "For entrepreneurs starting or growing a small manufacturing, trading, service or allied-agriculture business.",
  },
  {
    name: "Stand-Up India",
    category: "Greenfield enterprise finance",
    eligibilityRules: {
      gender: [], socialCategories: [], anyOf: [{ gender: ["woman"] }, { socialCategories: ["SC", "ST"] }], disability: null,
      sectors: [], states: [], minFunding: 1000000, maxFunding: 10000000,
    },
    benefits: "Bank loans from Rs 10 lakh to Rs 1 crore for a greenfield enterprise in manufacturing, services, trading or allied agriculture.",
    issuingBody: "Department of Financial Services, Government of India",
    description: "Supports at least one woman borrower and one SC or ST borrower per bank branch for a first-time enterprise.",
  },
  {
    name: "National Scheduled Castes Finance and Development Corporation",
    category: "Targeted term loan",
    eligibilityRules: {
      gender: [], socialCategories: ["SC"], disability: null,
      sectors: [], states: [], minFunding: 0, maxFunding: 5000000,
    },
    benefits: "Concessional finance and support for income-generating self-employment and small business activities.",
    issuingBody: "Ministry of Social Justice and Empowerment, Government of India",
    description: "For eligible members of Scheduled Castes; applications are generally routed through state channelizing agencies or partner institutions.",
  },
  {
    name: "National Divyangjan Finance and Development Corporation",
    category: "Accessible enterprise finance",
    eligibilityRules: {
      gender: [], socialCategories: [], disability: true,
      sectors: [], states: [], minFunding: 0, maxFunding: 2500000,
    },
    benefits: "Concessional financial assistance for self-employment and income-generating activities for persons with disabilities.",
    issuingBody: "Department of Empowerment of Persons with Disabilities, Government of India",
    description: "A financing option for entrepreneurs with disabilities; eligibility and application channels depend on the current programme and state partner.",
  },
  {
    name: "Prime Minister's Employment Generation Programme",
    category: "Credit-linked subsidy",
    eligibilityRules: {
      gender: [], socialCategories: [], disability: null,
      sectors: [], states: [], minFunding: 0, maxFunding: 5000000,
    },
    benefits: "Margin-money subsidy linked to bank credit for setting up eligible new micro-enterprises in rural or urban areas.",
    issuingBody: "Ministry of Micro, Small and Medium Enterprises, Government of India",
    description: "For new micro-enterprises in eligible manufacturing and service activities; subsidy rates vary by applicant category and location.",
  },
];
