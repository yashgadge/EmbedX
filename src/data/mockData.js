export const applications = [
  {
    id: 'EMB-2026-001',
    company: 'Agritech Ventures Pvt Ltd',
    loanAmount: 25000000,
    score: 42,
    status: 'High Risk',
    date: '2026-01-15',
    industry: 'Agriculture',
    cin: 'U01110MH2019PTC123456',
  },
  {
    id: 'EMB-2026-002',
    company: 'SteelCore Industries Ltd',
    loanAmount: 75000000,
    score: 71,
    status: 'Approved',
    date: '2026-01-18',
    industry: 'Steel',
    cin: 'L27100GJ2005PLC045678',
  },
  {
    id: 'EMB-2026-003',
    company: 'TextilePro Solutions',
    loanAmount: 12000000,
    score: 58,
    status: 'Under Review',
    date: '2026-01-20',
    industry: 'Textile',
    cin: 'U17200TN2010PTC078901',
  },
  {
    id: 'EMB-2026-004',
    company: 'Freshmart FMCG Ltd',
    loanAmount: 45000000,
    score: 83,
    status: 'Approved',
    date: '2026-01-22',
    industry: 'FMCG',
    cin: 'L15400MH2001PLC234567',
  },
  {
    id: 'EMB-2026-005',
    company: 'Greenfield Realty Corp',
    loanAmount: 150000000,
    score: 39,
    status: 'High Risk',
    date: '2026-01-25',
    industry: 'Real Estate',
    cin: 'U45200DL2015PLC345678',
  },
  {
    id: 'EMB-2026-006',
    company: 'CloudStack IT Services',
    loanAmount: 8000000,
    score: 91,
    status: 'Approved',
    date: '2026-01-28',
    industry: 'IT Services',
    cin: 'U72200KA2018PTC456789',
  },
  {
    id: 'EMB-2026-007',
    company: 'Pharmex Bio Labs',
    loanAmount: 35000000,
    score: 64,
    status: 'Under Review',
    date: '2026-02-01',
    industry: 'Pharma',
    cin: 'L24200MH2012PLC567890',
  },
  {
    id: 'EMB-2026-008',
    company: 'MetalWorks Fabricators',
    loanAmount: 22000000,
    score: 47,
    status: 'Pending',
    date: '2026-02-03',
    industry: 'Manufacturing',
    cin: 'U28900GJ2008PTC678901',
  },
  {
    id: 'EMB-2026-009',
    company: 'HarvestGrow Agri',
    loanAmount: 18000000,
    score: 76,
    status: 'Approved',
    date: '2026-02-05',
    industry: 'Agriculture',
    cin: 'U01400RJ2016PTC789012',
  },
  {
    id: 'EMB-2026-010',
    company: 'NexGen Pharma Ltd',
    loanAmount: 60000000,
    score: 55,
    status: 'Under Review',
    date: '2026-02-07',
    industry: 'Pharma',
    cin: 'L24230MH2009PLC890123',
  },
];

export const kpiData = [
  { label: 'Pending Assessments', value: '24', delta: '+3', trend: 'up', color: 'blue' },
  { label: 'High Risk Alerts', value: '7', delta: '-2', trend: 'down', color: 'red' },
  { label: 'Avg Processing Time', value: '3.2d', delta: '-0.4d', trend: 'down', color: 'green' },
  { label: 'Total Applications', value: '142', delta: '+18', trend: 'up', color: 'purple' },
];

export const shapData = [
  { feature: 'Revenue Growth', value: 0.34, positive: true },
  { feature: 'Debt Service Ratio', value: -0.28, positive: false },
  { feature: 'Promoter Background', value: -0.22, positive: false },
  { feature: 'GST Compliance', value: 0.19, positive: true },
  { feature: 'Bank Transactions', value: -0.17, positive: false },
  { feature: 'Industry Risk', value: -0.14, positive: false },
  { feature: 'Legal Issues', value: -0.11, positive: false },
];

export const timelineEvents = [
  {
    id: 1,
    date: 'Nov 2024',
    title: 'Director firm struck off',
    description: 'MCA struck off associated entity Ravi Agro Pvt Ltd for non-compliance.',
    severity: 'high',
  },
  {
    id: 2,
    date: 'Jan 2026',
    title: 'Cheque bounce case filed',
    description: 'Section 138 case filed at Mumbai MM Court. Case no. CC-1234/2026.',
    severity: 'high',
  },
  {
    id: 3,
    date: 'Mar 2026',
    title: 'GST mismatch detected',
    description: 'GSTR-3B vs GSTR-2A variance of ₹42L identified in FY2025-26.',
    severity: 'high',
  },
];

export const networkNodes = [
  { id: 'company', label: 'Agritech Ventures', x: 160, y: 100, type: 'company' },
  { id: 'dir1', label: 'R. Sharma', x: 60, y: 50, type: 'director' },
  { id: 'dir2', label: 'P. Gupta', x: 60, y: 150, type: 'director' },
  { id: 'dir3', label: 'S. Mehta', x: 260, y: 50, type: 'director' },
  { id: 'flagged', label: 'Ravi Agro Pvt', x: 260, y: 160, type: 'flagged' },
];

export const networkEdges = [
  { from: 'company', to: 'dir1' },
  { from: 'company', to: 'dir2' },
  { from: 'company', to: 'dir3' },
  { from: 'company', to: 'flagged' },
  { from: 'dir1', to: 'flagged' },
];

export const researchFeed = [
  {
    id: 1,
    source: 'MCA Portal',
    date: 'Nov 12, 2024',
    headline: 'Associated entity Ravi Agro Pvt Ltd struck off by RoC Mumbai',
    tag: 'MCA Filing',
    tagColor: 'blue',
  },
  {
    id: 2,
    source: 'ECIR Database',
    date: 'Jan 8, 2026',
    headline: 'Cheque dishonour complaint filed — Mumbai Magistrate Court CC-1234/2026',
    tag: 'Litigation',
    tagColor: 'red',
  },
  {
    id: 3,
    source: 'Business Standard',
    date: 'Feb 14, 2026',
    headline: 'Agri sector credit stress rises; NPA ratio up 120bps YoY in Q3FY26',
    tag: 'News Risk',
    tagColor: 'amber',
  },
  {
    id: 4,
    source: 'GST Portal',
    date: 'Mar 2, 2026',
    headline: 'GSTR-3B vs 2A mismatch flagged — ₹42L discrepancy in FY2025-26',
    tag: 'MCA Filing',
    tagColor: 'blue',
  },
];

export const camSections = {
  executiveSummary: `Agritech Ventures Pvt Ltd has applied for a term loan of ₹2.5 Cr for working capital and equipment financing. The EmbedX engine has assessed the application and flagged several risk factors including a director-linked entity strike-off, GST reconciliation variance of 25.7%, and a pending cheque bounce litigation. The overall EmbedX Risk Score is 42/100, categorised as High Risk.`,
  companyAnalysis: `Incorporated in 2019 under CIN U01110MH2019PTC123456, Agritech Ventures operates in the agri-machinery distribution segment across Maharashtra and Madhya Pradesh. The company reported revenue of ₹8.4 Cr in FY2024 (down from ₹11.2 Cr in FY2023), EBITDA margin of 7.2%, and net profit of ₹18L. Current ratio stands at 0.94, indicating tight liquidity. Debt-to-equity ratio is 3.1x, above the sector median of 1.8x.`,
  promoterBackground: `Primary promoter Rajiv Sharma (DIN: 07234567) holds 62% stake. He is also a director in Ravi Agro Pvt Ltd, which was struck off by RoC Mumbai in November 2024 for non-compliance. Co-promoter Priya Gupta (DIN: 08345678) has a clean background. A cheque dishonour case (Section 138) has been filed against the company at Mumbai Metropolitan Magistrate Court in January 2026.`,
  financialAnalysis: `Revenue declined 25% YoY in FY2024. Operating cash flows turned negative (₹-34L) for the first time. DSCR of 0.82 is below the minimum threshold of 1.25 required by lending policy. Interest coverage ratio of 1.4x. Working capital days have increased from 67 to 94 days. GST returns show a discrepancy of ₹42L vs bank receipts, suggesting possible revenue underreporting.`,
  industryOutlook: `The agri-machinery sector in India is projected to grow at 6-8% CAGR through FY2028, driven by government mechanisation schemes. However, small distributors face pressure from direct OEM sales and fintech-enabled competitors. Monsoon dependency and rural credit stress are key macro risks. The sector NPA ratio rose 120bps to 8.4% in Q3FY26.`,
  recommendation: `Based on the EmbedX assessment, this application is recommended for CONDITIONAL APPROVAL subject to: (1) Personal guarantee from both promoters, (2) Pledge of additional collateral equivalent to 40% of loan value, (3) Mandatory submission of GST reconciliation statement within 15 days, (4) Monthly bank statement covenant until loan closure. Sanctioned amount to be limited to ₹1.5 Cr (60% of requested amount).`,
};
