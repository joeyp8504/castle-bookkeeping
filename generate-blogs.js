const fs = require('fs');
const path = require('path');

const BLOG_DIR = path.join(__dirname, 'blog');
const SITE_URL = 'https://bookwithcastle.com';
const PHONE = '(587) 872-0602';

// Ensure blog directory exists
if (!fs.existsSync(BLOG_DIR)) fs.mkdirSync(BLOG_DIR, { recursive: true });

const PHOTOS = {
  neighbourhoods: [
    'https://images.pexels.com/photos/11521733/pexels-photo-11521733.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    'https://images.pexels.com/photos/12487421/pexels-photo-12487421.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    'https://images.pexels.com/photos/11744907/pexels-photo-11744907.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    'https://images.pexels.com/photos/19456900/pexels-photo-19456900.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    'https://images.pexels.com/photos/30405519/pexels-photo-30405519.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  ],
  restaurants: [
    'https://images.pexels.com/photos/15646691/pexels-photo-15646691.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    'https://images.pexels.com/photos/21661595/pexels-photo-21661595.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    'https://images.pexels.com/photos/19553654/pexels-photo-19553654.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  ],
  construction: [
    'https://images.pexels.com/photos/2833686/pexels-photo-2833686.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    'https://images.pexels.com/photos/9338940/pexels-photo-9338940.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    'https://images.pexels.com/photos/4160347/pexels-photo-4160347.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  ],
  automotive: [
    'https://images.pexels.com/photos/10126656/pexels-photo-10126656.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    'https://images.pexels.com/photos/4482005/pexels-photo-4482005.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    'https://images.pexels.com/photos/29198149/pexels-photo-29198149.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  ],
  bookkeeping: [
    'https://images.pexels.com/photos/265111/pexels-photo-265111.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    'https://images.pexels.com/photos/7054399/pexels-photo-7054399.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    'https://images.pexels.com/photos/8296990/pexels-photo-8296990.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    'https://images.pexels.com/photos/5196828/pexels-photo-5196828.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    'https://images.pexels.com/photos/8296953/pexels-photo-8296953.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  ],
  business: [
    'https://images.pexels.com/photos/10375889/pexels-photo-10375889.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    'https://images.pexels.com/photos/7054399/pexels-photo-7054399.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    'https://images.pexels.com/photos/5196828/pexels-photo-5196828.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  ],
};

// Global photo counter per category for rotation
const photoCounters = {};

function getPhoto(category, title) {
  const t = title.toLowerCase();
  let key = 'bookkeeping';

  if (category === 'Neighbourhoods') key = 'neighbourhoods';
  else if (t.includes('restaurant') || t.includes('food') || t.includes('coffee') || t.includes('brew')) key = 'restaurants';
  else if (t.includes('construct') || t.includes('contractor') || t.includes('plumb') || t.includes('electric') || t.includes('hvac') || t.includes('landscap')) key = 'construction';
  else if (t.includes('auto') || t.includes('repair') || t.includes('tire') || t.includes('vehicle')) key = 'automotive';
  else if (t.includes('tax') || t.includes('gst') || t.includes('deduction') || t.includes('cra') || t.includes('payroll') || t.includes('budget') || t.includes('filing')) key = 'bookkeeping';
  else if (category === 'Guides') key = 'business';
  else if (category === 'Seasonal') key = 'business';

  const arr = PHOTOS[key];
  if (!photoCounters[key]) photoCounters[key] = 0;
  const photo = arr[photoCounters[key] % arr.length];
  photoCounters[key]++;
  return photo;
}

function slug(title) {
  return title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
}

function randomDate(startMonth, endMonth) {
  const month = startMonth + Math.floor(Math.random() * (endMonth - startMonth + 1));
  const day = 1 + Math.floor(Math.random() * 28);
  // Cap at March 2026
  if (month > 3) return randomDate(startMonth, 3);
  const dateStr = '2026-' + String(month).padStart(2, '0') + '-' + String(day).padStart(2, '0');
  // Cap at today
  if (dateStr > '2026-03-18') return '2026-03-' + String(1 + Math.floor(Math.random() * 17)).toString().padStart(2, '0');
  return dateStr;
}

function formatDate(iso) {
  const d = new Date(iso + 'T00:00:00');
  return d.toLocaleDateString('en-CA', { year: 'numeric', month: 'long', day: 'numeric' });
}

// ─── NEIGHBOURHOOD POSTS ───────────────────────────────────────
const neighbourhoods = [
  'Beltline','Kensington','Inglewood','Bridgeland','Mission','Marda Loop','Bowness',
  'Airdrie','Cochrane','Okotoks','Chestermere','Downtown Calgary','East Village',
  'Ramsay','Sunnyside','Bankview','Mount Royal','Killarney','Signal Hill',
  'Panorama Hills','Tuscany','Mahogany','Cranston','McKenzie Towne','Auburn Bay'
];

const neighbourhoodFacts = {
  'Beltline': { desc: 'one of Calgary\'s densest and most vibrant urban neighbourhoods', biz: 'restaurants, boutiques, freelancers, and professional-service firms', charm: 'walkable streets, condo towers, and a thriving nightlife scene' },
  'Kensington': { desc: 'a trendy inner-city village known for independent shops', biz: 'cafes, bookstores, yoga studios, and creative agencies', charm: 'eclectic storefronts along Kensington Road and a fiercely loyal local customer base' },
  'Inglewood': { desc: 'Calgary\'s oldest neighbourhood and a hub for arts and antiques', biz: 'galleries, vintage shops, breweries, and design studios', charm: 'historic brick buildings along 9th Avenue SE and a booming creative economy' },
  'Bridgeland': { desc: 'a revitalized inner-city community just north of the Bow River', biz: 'bakeries, brunch spots, wellness clinics, and tech startups', charm: 'river pathways, community gardens, and a growing food scene' },
  'Mission': { desc: 'a historic neighbourhood along the Elbow River with a mix of heritage and modern living', biz: 'fitness studios, pubs, salons, and professional offices', charm: 'tree-lined avenues, 4th Street boutiques, and a walkable lifestyle' },
  'Marda Loop': { desc: 'a family-friendly inner-city gem centred on 33rd Avenue SW', biz: 'coffee shops, pet stores, dental offices, and home-service contractors', charm: 'community events, local farmers\' markets, and a strong neighbourhood identity' },
  'Bowness': { desc: 'a charming riverside community with a small-town feel inside the city', biz: 'auto repair shops, ice cream parlours, daycares, and trades contractors', charm: 'Bowness Park, the main street strip, and tight-knit community spirit' },
  'Airdrie': { desc: 'a fast-growing city just north of Calgary with a booming suburban economy', biz: 'landscapers, cleaning services, home builders, and retail stores', charm: 'rapid residential development, new commercial corridors, and small-town friendliness' },
  'Cochrane': { desc: 'a picturesque town west of Calgary at the edge of the foothills', biz: 'ranchers, tourism operators, cafes, and trades companies', charm: 'mountain views, the iconic Cochrane Ranche, and explosive population growth' },
  'Okotoks': { desc: 'a thriving town south of Calgary known for its community spirit', biz: 'veterinary clinics, salons, fitness studios, and real estate offices', charm: 'the Sheep River valley, heritage main street, and family-oriented vibe' },
  'Chestermere': { desc: 'a lakeside city east of Calgary popular with commuters and families', biz: 'daycare operators, landscapers, home-based businesses, and retail shops', charm: 'Chestermere Lake recreation, new housing developments, and a growing commercial base' },
  'Downtown Calgary': { desc: 'the economic heart of Alberta and home to Canada\'s energy-sector headquarters', biz: 'consulting firms, law offices, tech companies, and financial services', charm: 'the Plus-15 network, Stephen Avenue, and a workforce of over 100,000' },
  'East Village': { desc: 'Calgary\'s most ambitious urban-renewal neighbourhood along the Bow River', biz: 'restaurants, co-working spaces, creative agencies, and retail startups', charm: 'Studio Bell, the Central Library, and modern condo developments' },
  'Ramsay': { desc: 'a compact heritage neighbourhood perched on the bluffs above the Elbow River', biz: 'artisan workshops, cafes, photographers, and micro-businesses', charm: 'century-old homes, views of the Stampede grounds, and an artistic vibe' },
  'Sunnyside': { desc: 'a walkable inner-city neighbourhood hugging the north bank of the Bow River', biz: 'brunch restaurants, florists, therapists, and independent retailers', charm: 'river pathways, the Sunnyside farmers\' market, and a strong sense of community' },
  'Bankview': { desc: 'an up-and-coming hillside neighbourhood with skyline views and easy downtown access', biz: 'freelancers, food trucks, personal trainers, and small tech firms', charm: 'panoramic city vistas, infill development, and affordable commercial rents' },
  'Mount Royal': { desc: 'one of Calgary\'s most established and affluent residential communities', biz: 'medical clinics, legal practices, financial advisors, and high-end services', charm: 'stately homes, mature tree canopy, and proximity to 17th Avenue' },
  'Killarney': { desc: 'a revitalizing inner-city neighbourhood west of Crowchild Trail', biz: 'home-renovation contractors, daycares, yoga studios, and food businesses', charm: 'rapid infill construction, young families, and a growing commercial strip on 26th Avenue' },
  'Signal Hill': { desc: 'a well-established suburban community in Calgary\'s southwest', biz: 'dental offices, insurance brokers, tutoring centres, and retail franchises', charm: 'proximity to Westhills Shopping Centre, family parks, and established residential streets' },
  'Panorama Hills': { desc: 'one of Calgary\'s largest and most diverse northern communities', biz: 'ethnic restaurants, tutoring centres, cleaning companies, and accounting practices', charm: 'Country Hills Golf Club, multicultural population, and family-friendly amenities' },
  'Tuscany': { desc: 'a popular northwest community nestled against the Rocky Mountain foothills', biz: 'trades contractors, fitness trainers, pet groomers, and home-based e-commerce sellers', charm: 'mountain views, Tuscany Club recreational facilities, and easy access to the Trans-Canada Highway' },
  'Mahogany': { desc: 'Calgary\'s newest lake community in the deep southeast', biz: 'daycare centres, landscaping companies, new-build contractors, and mobile service providers', charm: 'Mahogany Lake, Westman Village, and a young, fast-growing population' },
  'Cranston': { desc: 'a family-oriented southeast community along the Bow River valley', biz: 'dental clinics, physiotherapists, pet services, and home-improvement contractors', charm: 'Cranston\'s Riverstone clubhouse, Fish Creek Park proximity, and a tight-knit HOA community' },
  'McKenzie Towne': { desc: 'a master-planned community in Calgary\'s southeast inspired by small-town design', biz: 'cafes, insurance offices, hair salons, and trades businesses', charm: 'High Street shopping district, Inverness community events, and a New Urbanist layout' },
  'Auburn Bay': { desc: 'a lake community in southeast Calgary with a resort-style lifestyle', biz: 'wellness clinics, real estate agents, cleaning services, and food entrepreneurs', charm: 'Auburn House community centre, private lake access, and rapid neighbourhood growth' }
};

function neighbourhoodBody(n) {
  const f = neighbourhoodFacts[n] || { desc: 'a thriving Calgary neighbourhood', biz: 'restaurants, shops, and service providers', charm: 'community spirit and local commerce' };
  return `
<p>If you run a small business in ${n}, you already know the neighbourhood is ${f.desc}. With ${f.charm}, ${n} attracts entrepreneurs across every sector, from ${f.biz}. But keeping your books in order while serving customers is a challenge most owners face.</p>

<h2>Why ${n} Business Owners Need Reliable Bookkeeping</h2>
<p>Running a business in ${n} comes with unique financial considerations. Local leases, neighbourhood-specific marketing spend, seasonal foot-traffic patterns, and Alberta's provincial tax rules all affect your bottom line. Without accurate, up-to-date books you risk missing deductions, filing GST late, or being unprepared for a CRA review.</p>
<p>Many ${n} entrepreneurs start by handling their own books. A spreadsheet here, a shoebox of receipts there. That approach works for the first few months, but as revenue grows it quickly becomes a liability. Missed entries compound, bank reconciliations fall behind, and suddenly you're facing a stressful catch-up project right before tax season.</p>

<h2>What Castle Bookkeeping Offers ${n} Businesses</h2>
<p>Castle Bookkeeping is a Calgary-based, flat-fee bookkeeping firm that works with small businesses across ${n} and the surrounding area. Our services include:</p>
<ul>
  <li><strong>Monthly bookkeeping</strong>, including transaction categorisation, bank and credit-card reconciliations, and financial statements delivered on time, every month.</li>
  <li><strong>GST/HST filing</strong>. We calculate, prepare, and file your returns so you never miss a deadline.</li>
  <li><strong>Payroll processing</strong>, including T4s, ROEs, and CRA remittances handled accurately.</li>
  <li><strong>Tax preparation</strong>. Personal and corporate returns coordinated with your accountant or filed directly.</li>
  <li><strong>Catch-up bookkeeping</strong>. Months (or years) behind? We'll bring your books current without judgement.</li>
</ul>

<h2>Flat-Fee Pricing, No Surprises</h2>
<p>Unlike firms that bill by the hour, Castle charges a predictable flat monthly fee based on your transaction volume. That means you always know what bookkeeping will cost, and you can budget accordingly. For most ${n} small businesses, plans start at $300 per month.</p>

<h2>Get Started Today</h2>
<p>Whether you're launching a new venture in ${n} or you've been operating for years and need to get your finances on track, Castle Bookkeeping is here to help. We offer a free, no-obligation consultation so we can understand your business and recommend the right plan.</p>
`;
}

// ─── INDUSTRY POSTS ────────────────────────────────────────────
const industries = [
  'Restaurants','Hair Salons','Auto Repair Shops','Landscaping Companies','Daycare Operators',
  'Real Estate Agents','Yoga Studios','Wellness Clinics','Contractors','Electricians',
  'Plumbers','HVAC Companies','Dental Offices','Veterinary Clinics','Food Trucks',
  'Coffee Shops','Fitness Trainers','Massage Therapists','Photographers','Web Designers',
  'Trucking Companies','Construction Companies','Cleaning Services','Property Managers',
  'Insurance Brokers','Florists','Pet Groomers','Tattoo Studios','Breweries',
  'Chiropractors','Naturopaths','Accounting Firms','Law Offices','Consulting Firms',
  'E-Commerce Sellers'
];

const industryDetails = {
  'Restaurants': { pain: 'high-volume daily transactions, tip tracking, food-cost management, and multiple payment processors', tip: 'Track your cost-of-goods-sold (COGS) weekly, not monthly, so you can spot supplier price creeps before they erode margins.', deduction: 'commercial-kitchen equipment depreciation, staff meals, and marketing expenses' },
  'Hair Salons': { pain: 'booth-rental income splits, product inventory, and appointment cancellations affecting cash flow', tip: 'Separate booth-rental income from service revenue in your chart of accounts so you can track profitability by revenue stream.', deduction: 'professional tools, continuing-education courses, and salon supplies' },
  'Auto Repair Shops': { pain: 'parts inventory management, warranty-claim tracking, and high-value equipment financing', tip: 'Use a job-costing method to track parts and labour per vehicle so you know which services are most profitable.', deduction: 'diagnostic equipment, shop supplies, and vehicle lifts' },
  'Landscaping Companies': { pain: 'seasonal revenue swings, multiple crew payrolls, and equipment maintenance costs', tip: 'Set aside 25-30% of peak-season revenue to cover winter months when cash flow tightens.', deduction: 'vehicle expenses, equipment depreciation, and fuel costs' },
  'Daycare Operators': { pain: 'government subsidy tracking, parent billing cycles, and strict licensing-related expenses', tip: 'Maintain a separate ledger for subsidy income versus parent-paid fees to simplify government reporting.', deduction: 'educational supplies, facility maintenance, and staff training' },
  'Real Estate Agents': { pain: 'irregular commission income, split structures with brokerages, and high marketing spend', tip: 'Estimate taxes quarterly on commission income so you\'re not hit with a large lump-sum payment at tax time.', deduction: 'vehicle mileage, staging costs, MLS fees, and marketing materials' },
  'Yoga Studios': { pain: 'class-pack and membership revenue recognition, instructor contractor payments, and seasonal enrolment shifts', tip: 'Recognise class-pack revenue as it\'s earned (per class) rather than when the pack is purchased, for accurate monthly financials.', deduction: 'studio rent, instructor fees, props and equipment, and teacher training' },
  'Wellness Clinics': { pain: 'insurance billing, multiple practitioner payouts, and patient-record-related expenses', tip: 'Reconcile insurance reimbursements monthly to catch underpayments and denied claims early.', deduction: 'medical supplies, continuing education, and clinic software subscriptions' },
  'Contractors': { pain: 'project-based billing, progress draws, holdback tracking, and subcontractor payments', tip: 'Track each project as a separate profit centre so you can see which jobs make money and which don\'t.', deduction: 'tools, vehicle expenses, safety equipment, and subcontractor payments' },
  'Electricians': { pain: 'job-costing across residential and commercial work, permit fees, and apprentice wages', tip: 'Separate residential and commercial revenue streams to identify where your margins are strongest.', deduction: 'tools, work vehicle expenses, licensing fees, and safety gear' },
  'Plumbers': { pain: 'emergency-call revenue, parts inventory, and warranty-service tracking', tip: 'Track emergency versus scheduled-service revenue separately. Emergency calls typically carry higher margins.', deduction: 'tools, vehicle costs, pipe and fitting inventory, and licensing fees' },
  'HVAC Companies': { pain: 'seasonal demand peaks, maintenance-contract revenue, and high-value equipment sales', tip: 'Recognise maintenance-contract revenue monthly rather than upfront to smooth your financial statements.', deduction: 'service vehicles, diagnostic tools, parts inventory, and licensing fees' },
  'Dental Offices': { pain: 'insurance-claim reconciliation, high equipment costs, and associate-dentist compensation structures', tip: 'Run an aging report on insurance receivables every two weeks to catch overdue claims before they become write-offs.', deduction: 'dental equipment depreciation, continuing education, and office supplies' },
  'Veterinary Clinics': { pain: 'pharmaceutical inventory, lab-test billing, and mixed-payment processing', tip: 'Implement inventory tracking for pharmaceuticals. Shrinkage and expired stock can significantly affect margins.', deduction: 'medical equipment, pharmaceutical inventory, and continuing education' },
  'Food Trucks': { pain: 'cash-heavy transactions, event-based revenue spikes, and commissary-kitchen expenses', tip: 'Use a mobile POS that integrates with your accounting software so every sale is captured automatically.', deduction: 'vehicle costs, commissary fees, food inventory, and event permit fees' },
  'Coffee Shops': { pain: 'high-volume low-dollar transactions, inventory spoilage, and tip pooling', tip: 'Track waste and spoilage as a separate expense category. It\'s often 5-10% of revenue in coffee shops.', deduction: 'equipment depreciation, coffee-bean inventory, and marketing costs' },
  'Fitness Trainers': { pain: 'session-pack revenue, cancellation policies, and home-office deductions for online training', tip: 'Track each client\'s prepaid sessions in a liability account and recognise revenue as sessions are delivered.', deduction: 'fitness equipment, certification courses, and marketing expenses' },
  'Massage Therapists': { pain: 'insurance direct billing, product sales tracking, and home-office or rental-space costs', tip: 'Keep product sales (lotions, oils) in a separate revenue account from service revenue for clearer margin analysis.', deduction: 'massage supplies, table and equipment, and continuing education' },
  'Photographers': { pain: 'project-based income, equipment depreciation, and deposits versus final payments', tip: 'Record deposits as a liability until the shoot is delivered. This gives you an accurate picture of earned revenue.', deduction: 'camera equipment, editing software, travel expenses, and studio rent' },
  'Web Designers': { pain: 'project milestone billing, recurring maintenance revenue, and subcontractor payments', tip: 'Separate one-time project revenue from recurring maintenance retainers to better forecast monthly cash flow.', deduction: 'software subscriptions, hardware, subcontractor fees, and home office' },
  'Trucking Companies': { pain: 'fuel-tax credits, long-haul expense tracking, and driver payroll compliance', tip: 'Use per-kilometre tracking to maximise fuel-tax credits and vehicle-expense deductions.', deduction: 'fuel, vehicle maintenance, insurance premiums, and driver per-diem allowances' },
  'Construction Companies': { pain: 'progress billing, holdbacks, WCB premiums, and multi-project cost tracking', tip: 'Implement percentage-of-completion accounting for long-term projects to get accurate profit recognition.', deduction: 'heavy equipment depreciation, subcontractor costs, safety equipment, and WCB premiums' },
  'Cleaning Services': { pain: 'multiple client billing cycles, supply costs, and employee versus contractor classification', tip: 'Properly classify workers as employees or contractors. CRA penalties for misclassification are severe.', deduction: 'cleaning supplies, vehicle expenses, bonding insurance, and uniforms' },
  'Property Managers': { pain: 'trust-account reconciliation, multiple-property tracking, and owner disbursements', tip: 'Never commingle trust-account funds with operating funds. This is both a legal requirement and a bookkeeping best practice.', deduction: 'office expenses, software subscriptions, vehicle costs, and professional development' },
  'Insurance Brokers': { pain: 'commission structures, policy renewals, and compliance-related record keeping', tip: 'Track commissions by carrier and product line to identify which partnerships are most profitable.', deduction: 'E&O insurance, licensing fees, office expenses, and marketing costs' },
  'Florists': { pain: 'perishable inventory management, seasonal sales spikes, and wire-service fees', tip: 'Track inventory waste weekly. Perishable flower stock can erode margins fast if not monitored.', deduction: 'flower and supply inventory, delivery-vehicle costs, and cooler equipment' },
  'Pet Groomers': { pain: 'appointment scheduling revenue, product sales, and mobile-grooming vehicle costs', tip: 'Track revenue per appointment type (bath, full groom, specialty) to understand which services drive profit.', deduction: 'grooming tools, vehicle costs, cleaning supplies, and professional certifications' },
  'Tattoo Studios': { pain: 'cash transactions, artist booth-rental splits, and supply inventory', tip: 'Implement a POS system for all transactions. CRA scrutinises cash-heavy businesses more closely.', deduction: 'tattoo supplies, autoclave equipment, studio rent, and artist convention travel' },
  'Breweries': { pain: 'excise-tax compliance, ingredient inventory, and taproom versus wholesale revenue tracking', tip: 'Separate taproom, wholesale, and online-sales revenue streams for clearer profitability analysis.', deduction: 'brewing equipment, ingredient inventory, packaging, and taproom expenses' },
  'Chiropractors': { pain: 'insurance direct billing, patient-plan tracking, and clinic overhead allocation', tip: 'Reconcile insurance payments weekly to catch underpayments and speed up your receivable cycle.', deduction: 'chiropractic equipment, continuing education, clinic rent, and professional liability insurance' },
  'Naturopaths': { pain: 'supplement sales tracking, insurance billing for select services, and regulatory fees', tip: 'Track supplement inventory with FIFO (first-in, first-out) to manage expiry dates and reduce waste.', deduction: 'supplements inventory, lab testing fees, continuing education, and clinic supplies' },
  'Accounting Firms': { pain: 'WIP (work-in-progress) tracking, staff utilisation rates, and software subscription management', tip: 'Track WIP rigorously. Unbilled time is the silent profit killer in professional-service firms.', deduction: 'professional software, staff training, office rent, and professional liability insurance' },
  'Law Offices': { pain: 'trust-account compliance, billable-hour tracking, and disbursement management', tip: 'Perform monthly trust-account reconciliations. Law Society requirements are strict, and errors are costly.', deduction: 'legal research databases, professional insurance, staff salaries, and continuing education' },
  'Consulting Firms': { pain: 'project-based billing, retainer tracking, and contractor payments', tip: 'Use time-tracking software that integrates with your accounting system to automate project billing.', deduction: 'travel expenses, software subscriptions, subcontractor fees, and home-office costs' },
  'E-Commerce Sellers': { pain: 'multi-platform sales tracking, shipping costs, inventory valuation, and cross-border transactions', tip: 'Reconcile each sales channel (Shopify, Amazon, Etsy) monthly so marketplace fees and refunds are accurately captured.', deduction: 'shipping supplies, platform fees, product inventory, and warehouse or storage costs' }
};

function industryBody(ind) {
  const d = industryDetails[ind] || { pain: 'complex bookkeeping needs', tip: 'Review your books monthly.', deduction: 'standard business expenses' };
  return `
<p>Running a ${ind.toLowerCase().replace(/s$/, '').replace(/ies$/, 'y')} business in Calgary is rewarding, but managing the financial side can feel overwhelming. ${ind} face specific bookkeeping challenges including ${d.pain}. Without a system in place, these complexities can lead to costly errors, missed deductions, and stressful CRA interactions.</p>

<h2>Bookkeeping Challenges Unique to ${ind}</h2>
<p>Every industry has its own financial quirks, and ${ind.toLowerCase()} are no exception. The most common issues we see include:</p>
<ul>
  <li><strong>Cash-flow management</strong>. Understanding when money comes in and goes out, and planning for lean periods.</li>
  <li><strong>Expense categorisation</strong>. ${d.pain}. Getting categories right is essential for accurate tax filing.</li>
  <li><strong>GST compliance</strong>. Alberta businesses earning over $30,000 must register for and remit GST. Late or incorrect filings attract penalties and interest from CRA.</li>
  <li><strong>Payroll obligations</strong>. Source deductions, T4 preparation, and ROEs must be handled correctly to avoid CRA penalties.</li>
</ul>

<h2>Pro Tip for Calgary ${ind}</h2>
<p>${d.tip}</p>

<h2>Common Deductions for ${ind}</h2>
<p>Calgary-based ${ind.toLowerCase()} are often entitled to deductions for ${d.deduction}. However, claiming these correctly requires proper documentation and categorisation. Our team ensures you capture every eligible deduction while maintaining CRA-compliant records.</p>

<h2>Why Castle Bookkeeping?</h2>
<p>Castle Bookkeeping specialises in flat-fee bookkeeping for Calgary small businesses. We understand the financial realities of ${ind.toLowerCase()} and tailor our services accordingly. Our monthly plans include transaction categorisation, bank reconciliation, financial statements, and GST filing, all for one predictable price.</p>

<h2>Let's Talk About Your Books</h2>
<p>Whether you're just starting out or you've been in business for years, we can help bring clarity and confidence to your finances. Book a free consultation today to learn how Castle Bookkeeping supports Calgary ${ind.toLowerCase()}.</p>
`;
}

// ─── PROBLEM POSTS ─────────────────────────────────────────────
const problemPosts = [
  {
    title: 'How to Catch Up on Months of Missed Bookkeeping',
    slug: 'how-to-catch-up-on-months-of-missed-bookkeeping',
    excerpt: 'Fallen behind on your books? Here is a step-by-step plan to get current without the stress.',
    body: `
<p>It happens to the best of us. You launched your Calgary business with every intention of staying on top of your books, but then life happened — busy seasons, staffing challenges, or simply the daily grind of running a business. Now you're staring at months of unsorted receipts and bank statements, and tax season is approaching fast.</p>

<h2>Step 1: Don't Panic</h2>
<p>Being behind on your books is far more common than you think. We work with Calgary businesses every week who are three, six, or even twelve months behind. The important thing is to start — not to stress about how you got here.</p>

<h2>Step 2: Gather Your Records</h2>
<p>Pull together bank statements, credit-card statements, invoices, and receipts for the period you need to catch up. Most banks let you download CSV or PDF statements going back several years. Don't worry about organising everything perfectly — just get it all in one place.</p>

<h2>Step 3: Choose Your Tool</h2>
<p>If you're using QuickBooks Online or Xero, you can connect your bank feeds and pull in historical transactions. If you've been working in spreadsheets, now might be the time to upgrade. Cloud accounting software makes catch-up work significantly faster.</p>

<h2>Step 4: Categorise Systematically</h2>
<p>Work through transactions month by month, starting with the oldest period. Categorise each transaction using a consistent chart of accounts. Focus on accuracy over speed — incorrect categorisation causes problems down the line.</p>

<h2>Step 5: Reconcile Each Month</h2>
<p>After categorising, reconcile each month's bank and credit-card statements. This ensures every dollar is accounted for and catches any missed or duplicated entries.</p>

<h2>Step 6: File Overdue Returns</h2>
<p>Once your books are current, you can prepare and file any overdue GST returns or tax returns. Filing late is always better than not filing at all — CRA penalties accumulate, so the sooner you file, the less you'll owe in interest and penalties.</p>

<h2>Or Let Castle Handle It</h2>
<p>Catch-up bookkeeping is one of our most popular services. We'll bring your books current quickly and accurately, then set you up on a monthly plan so you never fall behind again. No judgement — just clean books and peace of mind.</p>
`
  },
  {
    title: 'GST Filing Deadlines Every Calgary Business Should Know',
    slug: 'gst-filing-deadlines-every-calgary-business-should-know',
    excerpt: 'Missing a GST deadline means penalties and interest. Here are the key dates Alberta businesses need to know.',
    body: `
<p>If your Calgary business earns more than $30,000 in revenue over four consecutive quarters, you're required to register for and collect GST (Goods and Services Tax) at 5%. But collecting it is only half the battle — you also need to file and remit on time. Here's what you need to know.</p>

<h2>Filing Frequencies</h2>
<p>CRA assigns your filing frequency based on your annual revenue:</p>
<ul>
  <li><strong>Annual filing</strong> — revenue under $1.5 million. Your return is due three months after your fiscal year-end.</li>
  <li><strong>Quarterly filing</strong> — revenue between $1.5 million and $6 million. Returns are due one month after each quarter ends.</li>
  <li><strong>Monthly filing</strong> — revenue over $6 million. Returns are due one month after each reporting period.</li>
</ul>
<p>You can voluntarily elect a more frequent filing period if it suits your cash flow — many businesses prefer quarterly filing even if they qualify for annual.</p>

<h2>Key Deadlines for 2026</h2>
<p>For businesses on a calendar fiscal year with quarterly filing:</p>
<ul>
  <li><strong>Q1 (Jan–Mar)</strong> — due April 30, 2026</li>
  <li><strong>Q2 (Apr–Jun)</strong> — due July 31, 2026</li>
  <li><strong>Q3 (Jul–Sep)</strong> — due October 31, 2026</li>
  <li><strong>Q4 (Oct–Dec)</strong> — due January 31, 2027</li>
</ul>

<h2>Penalties for Late Filing</h2>
<p>CRA charges a penalty of 1% of the balance owing plus 0.25% for each month the return is late, up to 12 months. Interest also accrues on the unpaid balance at the prescribed rate, which is adjusted quarterly.</p>

<h2>Input Tax Credits (ITCs)</h2>
<p>Don't forget — you can claim back the GST you paid on business expenses through Input Tax Credits. Proper bookkeeping ensures you capture every eligible ITC, which reduces your net GST remittance. Many Calgary businesses leave money on the table by not claiming all their ITCs.</p>

<h2>Let Castle Keep You on Track</h2>
<p>Our monthly bookkeeping plans include GST filing so you never miss a deadline. We calculate your net GST, prepare the return, and file it with CRA on your behalf. One less thing to worry about.</p>
`
  },
  {
    title: '5 Tax Deductions Calgary Contractors Miss',
    slug: '5-tax-deductions-calgary-contractors-miss',
    excerpt: 'Calgary contractors leave thousands of dollars on the table every year. Here are five commonly missed deductions.',
    body: `
<p>Calgary's construction and trades industry is booming, but many contractors are paying more tax than they need to. Whether you're a general contractor, electrician, plumber, or HVAC technician, here are five deductions you might be missing.</p>

<h2>1. Vehicle Expenses</h2>
<p>If you use your vehicle for work, you can deduct a portion of fuel, insurance, maintenance, and depreciation based on business-use percentage. The key is keeping a mileage log. CRA requires a record of business versus personal kilometres — without it, your claim won't survive an audit.</p>

<h2>2. Home Office Deduction</h2>
<p>Many contractors run their business from home — quoting jobs, handling invoices, and managing schedules from a home office. If you use a dedicated space regularly for business, you can deduct a proportionate share of rent or mortgage interest, utilities, property tax, and internet.</p>

<h2>3. Tool and Equipment Depreciation</h2>
<p>Large tool purchases and equipment aren't fully deductible in the year of purchase — they're depreciated over time using CCA (Capital Cost Allowance) classes. However, the Accelerated Investment Incentive allows you to claim a larger deduction in the first year. Many contractors miss this enhanced first-year write-off.</p>

<h2>4. Training and Certification</h2>
<p>Courses, certifications, safety training (like first aid or fall protection), and trade-school tuition are deductible if they relate to your current business. This includes travel costs to attend training courses outside Calgary.</p>

<h2>5. Bad Debts</h2>
<p>If a client hasn't paid you and you've exhausted reasonable collection efforts, you can write off the unpaid invoice as a bad debt. Many contractors simply absorb unpaid invoices without claiming the deduction. You can also recover the GST you remitted on that invoice.</p>

<h2>Don't Leave Money on the Table</h2>
<p>Proper bookkeeping is the foundation of maximising your deductions. When your books are accurate and well-organised, nothing gets missed. Castle Bookkeeping works with dozens of Calgary contractors and trades businesses — we know exactly which deductions apply to your situation.</p>
`
  },
  {
    title: 'When to Switch from DIY Bookkeeping to a Professional',
    slug: 'when-to-switch-from-diy-bookkeeping-to-a-professional',
    excerpt: 'DIY bookkeeping works at first, but there comes a point when professional help pays for itself.',
    body: `
<p>When you first started your Calgary business, doing your own bookkeeping made sense. Revenue was manageable, transactions were few, and a simple spreadsheet or basic QuickBooks setup was enough. But as your business grows, the demands on your time and the complexity of your finances grow too. Here's how to know when it's time to hire a professional bookkeeper.</p>

<h2>Sign 1: You're Always Behind</h2>
<p>If your books are perpetually a month or two (or six) behind, that's a clear signal. Falling behind means your financial data is stale — you can't make informed decisions about spending, hiring, or pricing because you don't actually know where your business stands financially.</p>

<h2>Sign 2: Tax Season Causes Panic</h2>
<p>If the approach of tax season fills you with dread, it's because your books aren't ready. A professional bookkeeper keeps your records current throughout the year so that tax prep is a straightforward process, not a scramble.</p>

<h2>Sign 3: You've Received a CRA Notice</h2>
<p>If CRA has questioned a filing, requested documentation, or initiated a review, your record-keeping may not be at the standard required. A bookkeeper ensures your records meet CRA's documentation requirements and can help you respond to inquiries.</p>

<h2>Sign 4: You Have Employees</h2>
<p>The moment you hire your first employee, payroll obligations — source deductions, T4 preparation, ROEs, and CRA remittances — add a significant layer of complexity. Payroll errors attract swift penalties from CRA.</p>

<h2>Sign 5: Your Time Is Worth More Elsewhere</h2>
<p>This is the most important consideration. If you're spending five or ten hours a month on bookkeeping, calculate what that time is worth if spent on revenue-generating activities. For most Calgary business owners, hiring a bookkeeper at $300–$500 per month pays for itself many times over.</p>

<h2>The Castle Advantage</h2>
<p>Castle Bookkeeping offers flat-fee monthly plans so you know exactly what bookkeeping costs. We handle everything — categorisation, reconciliation, GST filing, payroll, and financial reporting — so you can focus on running your business.</p>
`
  },
  {
    title: 'How to Choose a Bookkeeper in Calgary',
    slug: 'how-to-choose-a-bookkeeper-in-calgary',
    excerpt: 'Not all bookkeepers are created equal. Here is what to look for when hiring a bookkeeper in Calgary.',
    body: `
<p>Choosing the right bookkeeper is one of the most important financial decisions a Calgary small business owner can make. Your bookkeeper will have access to your bank accounts, financial records, and sensitive business data — so you need someone trustworthy, competent, and responsive. Here's what to look for.</p>

<h2>1. Experience with Your Industry</h2>
<p>Bookkeeping isn't one-size-fits-all. A bookkeeper who understands restaurants will know about tip tracking and food-cost ratios. One who works with contractors will understand holdbacks and progress billing. Ask potential bookkeepers about their experience with businesses like yours.</p>

<h2>2. Software Proficiency</h2>
<p>Most Calgary businesses use QuickBooks Online or Xero. Your bookkeeper should be certified in the platform you use (or plan to use) and able to set it up correctly from the start. Poor software setup causes ongoing headaches.</p>

<h2>3. Clear Pricing</h2>
<p>Hourly billing creates uncertainty — you never know what your monthly bookkeeping cost will be. Look for a firm that offers flat-fee pricing so you can budget with confidence. Be wary of prices that seem too low — you usually get what you pay for.</p>

<h2>4. Communication Style</h2>
<p>Your bookkeeper should be proactive about communicating issues, responsive to your questions, and willing to explain things in plain language. If you can't get a timely response during the sales process, it won't get better after you sign up.</p>

<h2>5. CRA Compliance Knowledge</h2>
<p>A good bookkeeper stays current on CRA rules, filing deadlines, and documentation requirements. They should be able to advise you on GST obligations, payroll compliance, and record-retention policies.</p>

<h2>6. References and Reviews</h2>
<p>Check Google Reviews, ask for client references, and look for testimonials from businesses similar to yours. A strong track record is the best predictor of reliable service.</p>

<h2>Why Calgary Businesses Choose Castle</h2>
<p>Castle Bookkeeping checks every box: industry experience across dozens of sectors, QuickBooks and Xero certification, transparent flat-fee pricing, responsive communication, and a 5.0-star Google rating from over 45 Calgary business owners. Book a free consultation to see if we're the right fit.</p>
`
  },
  {
    title: 'Bookkeeping Mistakes That Trigger CRA Audits',
    slug: 'bookkeeping-mistakes-that-trigger-cra-audits',
    excerpt: 'Certain red flags on your books can increase your chances of a CRA audit. Here is how to avoid them.',
    body: `
<p>No Calgary business owner wants to deal with a CRA audit. While audits can be random, certain bookkeeping mistakes significantly increase your chances of being selected for review. Here are the most common red flags — and how to avoid them.</p>

<h2>1. Inconsistent Revenue Reporting</h2>
<p>If the income on your tax return doesn't match your GST filings, bank deposits, or T4A slips, CRA's matching algorithms will flag the discrepancy. Accurate, consistent bookkeeping ensures all your filings tell the same story.</p>

<h2>2. Excessive Business Expense Claims</h2>
<p>Claiming business expenses that are disproportionately high relative to your revenue is a red flag. This is especially true for meals and entertainment, vehicle expenses, and home-office deductions. The key is to claim only legitimate business expenses and keep supporting documentation.</p>

<h2>3. Round Numbers</h2>
<p>If your expense claims are suspiciously round ($500, $1,000, $2,000), it suggests estimation rather than actual record-keeping. Real expenses have real, specific dollar amounts. Always use actual figures from receipts and invoices.</p>

<h2>4. Cash-Heavy Businesses</h2>
<p>Restaurants, salons, and trades businesses that handle a lot of cash are inherently higher-risk from CRA's perspective. If your reported revenue seems low relative to your industry benchmarks or business size, expect questions. The solution is meticulous tracking of all cash transactions.</p>

<h2>5. Repeated Late Filings</h2>
<p>Chronically late GST or tax filings signal disorganisation — and CRA may wonder what else is being mismanaged. Filing on time, every time, keeps you off the radar.</p>

<h2>6. Claiming Personal Expenses as Business</h2>
<p>This is one of the most common audit triggers. Personal cell phone bills, personal vehicle use, and personal meals cannot be claimed as business expenses unless there's a genuine business purpose — and the personal portion must be excluded.</p>

<h2>Your Best Defence: Clean Books</h2>
<p>Accurate, well-organised bookkeeping is the single best defence against a CRA audit. When every transaction is properly categorised, every receipt is retained, and every filing is consistent and timely, you have nothing to worry about. Castle Bookkeeping helps Calgary businesses maintain CRA-ready books year-round.</p>
`
  },
  {
    title: 'QuickBooks vs Xero: Which Is Better for Calgary Businesses',
    slug: 'quickbooks-vs-xero-which-is-better-for-calgary-businesses',
    excerpt: 'Choosing between QuickBooks Online and Xero? Here is how they compare for Canadian small businesses.',
    body: `
<p>QuickBooks Online and Xero are the two leading cloud accounting platforms for small businesses in Canada. Both are excellent tools, but they have different strengths. Here's an honest comparison to help you decide which is right for your Calgary business.</p>

<h2>Market Share and Accountant Availability</h2>
<p>QuickBooks Online dominates the Canadian market. Most bookkeepers and accountants in Calgary are proficient with QBO, which means you'll have an easier time finding professional support. Xero is growing rapidly, but QBO's ecosystem is still larger in Canada.</p>

<h2>User Interface</h2>
<p>Xero wins on design. Its interface is cleaner, more intuitive, and easier to navigate for non-accountants. QuickBooks Online has improved significantly in recent years but can still feel cluttered, especially for new users.</p>

<h2>Bank Feeds</h2>
<p>Both platforms connect to Canadian banks and automatically import transactions. QBO has slightly better coverage of Canadian financial institutions, but Xero covers all the major banks. Both allow CSV uploads as a backup.</p>

<h2>Invoicing</h2>
<p>Both offer professional invoicing with online payment options. QBO integrates natively with more Canadian payment processors. Xero's invoicing interface is slightly more customisable.</p>

<h2>Payroll</h2>
<p>QBO offers an integrated Canadian payroll add-on that handles source deductions, T4s, and CRA remittances. Xero does not have a native Canadian payroll solution — you'll need a third-party integration like Wagepoint or Humi.</p>

<h2>GST/HST Filing</h2>
<p>Both platforms calculate GST automatically and generate filing-ready reports. QBO allows direct electronic filing to CRA from within the platform. Xero requires you to file manually through CRA's online portal.</p>

<h2>Pricing (as of 2026)</h2>
<p>QBO Simple Start begins around $22/month; Xero Starter begins around $17/month. Mid-tier plans are comparable. QBO's payroll add-on increases the cost gap. Both offer discounts for the first few months.</p>

<h2>Our Recommendation</h2>
<p>For most Calgary small businesses, we recommend QuickBooks Online. The larger accountant ecosystem, integrated payroll, and direct CRA filing make it the more practical choice in Canada. That said, if you're already on Xero and it's working well, there's no compelling reason to switch.</p>

<p>Castle Bookkeeping is certified in both QuickBooks Online and Xero. Whichever platform you choose, we can set it up correctly and keep your books running smoothly.</p>
`
  },
  {
    title: 'How to Prepare Your Calgary Business for Tax Season',
    slug: 'how-to-prepare-your-calgary-business-for-tax-season',
    excerpt: 'Tax season does not have to be stressful. Here is how to prepare your Calgary business step by step.',
    body: `
<p>Tax season is a reality every Calgary business owner faces. But with the right preparation, it doesn't have to be a last-minute scramble. Here's a step-by-step guide to getting your business ready for tax filing.</p>

<h2>1. Ensure Your Books Are Current</h2>
<p>This is the foundation. If your bookkeeping is up to date — all transactions categorised, bank accounts reconciled, and financial statements prepared — tax preparation becomes straightforward. If you're behind, catch up now rather than waiting until the filing deadline.</p>

<h2>2. Gather Your Tax Documents</h2>
<p>Collect all relevant documents including: T3, T4, and T5 slips; RRSP contribution receipts; business income statements; receipts for deductible expenses; prior-year tax returns; and any CRA correspondence received during the year.</p>

<h2>3. Review Your Deductions</h2>
<p>Go through your expense accounts and ensure all legitimate deductions are captured. Common ones include: office expenses, vehicle costs, insurance premiums, professional fees, advertising, and business-use-of-home expenses. Make sure you have receipts or documentation for each.</p>

<h2>4. Reconcile Your GST</h2>
<p>If you file GST annually, now is the time to reconcile your GST collected and Input Tax Credits for the full year. If you file quarterly, verify that all four quarters were filed and the totals align with your annual revenue.</p>

<h2>5. Review Payroll Year-End</h2>
<p>If you have employees, ensure all T4 slips are prepared and filed by the February 28 deadline. Verify that source deductions match CRA's records and resolve any discrepancies before filing your corporate or personal return.</p>

<h2>6. Coordinate with Your Accountant</h2>
<p>If you use an accountant for tax filing, get your books and documents to them early. Accountants are swamped during tax season — the earlier you deliver clean, organised records, the faster your return gets filed.</p>

<h2>7. Know Your Deadlines</h2>
<p>For sole proprietors: personal tax returns are due June 15, but any balance owing is due April 30. For corporations: returns are due six months after fiscal year-end. Missing these deadlines triggers automatic penalties.</p>

<h2>Make Next Tax Season Effortless</h2>
<p>The best way to prepare for tax season is to keep your books current all year long. Castle Bookkeeping's monthly plans ensure your records are always tax-ready. Contact us today to get started.</p>
`
  },
  {
    title: 'Understanding Alberta\'s Small Business Tax Rate',
    slug: 'understanding-albertas-small-business-tax-rate',
    excerpt: 'Alberta offers one of the lowest small business tax rates in Canada. Here is what you need to know.',
    body: `
<p>Alberta is one of the most tax-friendly provinces in Canada for small businesses. Understanding how the tax system works can help you structure your Calgary business to minimise your tax burden legally and effectively.</p>

<h2>The Federal Small Business Deduction</h2>
<p>Canadian-controlled private corporations (CCPCs) benefit from the federal small business deduction, which reduces the federal corporate tax rate to 9% on the first $500,000 of active business income. This preferential rate is a significant advantage of incorporating.</p>

<h2>Alberta's Provincial Rate</h2>
<p>Alberta's small business tax rate is 2% on the first $500,000 of active business income. Combined with the federal rate of 9%, this gives an effective combined rate of just 11% — one of the lowest in Canada. By comparison, Ontario's combined rate is 12.2% and British Columbia's is 11%.</p>

<h2>Above the Small Business Limit</h2>
<p>Income above $500,000 is taxed at the general corporate rate: 15% federally plus 8% provincially, for a combined rate of 23%. This is still competitive nationally and significantly lower than personal tax rates at equivalent income levels.</p>

<h2>No Provincial Sales Tax</h2>
<p>Alberta has no provincial sales tax (PST), which means businesses only collect the 5% federal GST. This is a meaningful advantage for consumer-facing businesses compared to provinces with HST rates of 13-15%.</p>

<h2>Sole Proprietor vs Corporation</h2>
<p>As a sole proprietor, your business income is taxed at your personal marginal rate, which can reach over 48% at higher income levels in Alberta. Incorporating allows you to leave money in the corporation at the 11% small business rate and control when you draw it out as salary or dividends.</p>

<h2>When Does Incorporation Make Sense?</h2>
<p>Generally, incorporation becomes advantageous when your business income consistently exceeds your personal spending needs — meaning you can leave surplus income in the corporation at the lower tax rate. A rough threshold is when your business earns more than $80,000–$100,000 annually, but the right answer depends on your specific situation.</p>

<h2>Get Personalised Advice</h2>
<p>Tax planning is complex and depends on your individual circumstances. Castle Bookkeeping works alongside your accountant to ensure your books support optimal tax planning. We can also refer you to trusted Calgary accountants who specialise in small business tax strategy.</p>
`
  },
  {
    title: 'Payroll Remittance Guide for Alberta Employers',
    slug: 'payroll-remittance-guide-for-alberta-employers',
    excerpt: 'Payroll remittances are one of the most scrutinised obligations by CRA. Here is how to stay compliant.',
    body: `
<p>If you employ staff in Calgary, you have a legal obligation to deduct income tax, CPP contributions, and EI premiums from their pay — and remit those amounts to CRA along with your employer portions. Payroll compliance is one of the areas CRA scrutinises most heavily, and the penalties for errors or late remittances are steep.</p>

<h2>What You Must Deduct</h2>
<p>For each pay period, you must calculate and withhold:</p>
<ul>
  <li><strong>Federal and provincial income tax</strong> — based on the employee's TD1 form and pay amount.</li>
  <li><strong>Canada Pension Plan (CPP)</strong> — both the employee's share and a matching employer contribution.</li>
  <li><strong>Employment Insurance (EI)</strong> — the employee's share plus the employer's portion (1.4 times the employee amount).</li>
</ul>

<h2>Remittance Frequencies</h2>
<p>CRA assigns your remittance frequency based on your average monthly withholding amount (AMWA):</p>
<ul>
  <li><strong>Regular remitter</strong> (AMWA under $25,000) — remit by the 15th of the month following the pay period.</li>
  <li><strong>Accelerated remitter (threshold 1)</strong> (AMWA $25,000–$99,999) — remit twice monthly.</li>
  <li><strong>Accelerated remitter (threshold 2)</strong> (AMWA over $100,000) — remit within three business days of each pay run.</li>
</ul>
<p>New employers typically start as regular remitters.</p>

<h2>Penalties for Late Remittance</h2>
<p>CRA's penalties escalate with repeated offences:</p>
<ul>
  <li>3% if 1–3 days late</li>
  <li>5% if 4–5 days late</li>
  <li>7% if 6–7 days late</li>
  <li>10% if more than 7 days late or if no remittance is made</li>
  <li>20% for repeat offenders (second default in the same calendar year)</li>
</ul>
<p>Unlike most CRA penalties, payroll remittance penalties can be assessed against directors personally.</p>

<h2>Year-End Obligations</h2>
<p>By February 28, you must file T4 information returns for all employees and provide T4 slips. If an employee leaves during the year, you must issue a Record of Employment (ROE) within five calendar days of the last day of work.</p>

<h2>Let Castle Handle Your Payroll</h2>
<p>Payroll is one of the highest-risk areas of business bookkeeping. Castle Bookkeeping's payroll service handles source deduction calculations, CRA remittances, T4 preparation, and ROE filing — so you stay compliant without the stress. Contact us for a free consultation.</p>
`
  },
  {
    title: 'E-Commerce Sales Tax Rules in Alberta',
    slug: 'e-commerce-sales-tax-rules-in-alberta',
    excerpt: 'Selling online from Alberta? Here is what you need to know about GST, cross-border sales, and marketplace rules.',
    body: `
<p>E-commerce is booming in Calgary, with more entrepreneurs selling products through Shopify, Amazon, Etsy, and their own websites. But understanding your sales tax obligations can be confusing — especially when you're selling across provincial or national borders.</p>

<h2>GST Registration</h2>
<p>If your total worldwide revenue exceeds $30,000 over four consecutive calendar quarters, you must register for GST. This threshold applies to your total revenue, not just e-commerce sales. Once registered, you charge 5% GST on taxable supplies sold to customers in Canada.</p>

<h2>Selling Within Alberta</h2>
<p>This is the simplest scenario. Alberta has no PST, so you only charge 5% GST on domestic sales to Alberta customers.</p>

<h2>Selling to Other Provinces</h2>
<p>When selling to customers in other provinces, you generally charge the tax rate applicable in the buyer's province. For HST provinces (Ontario, Nova Scotia, etc.), this means charging 13-15% HST. For provinces with separate PST (BC, Saskatchewan, Manitoba, Quebec), the rules vary — in most cases, you're only required to collect PST if you have a physical presence or meet certain revenue thresholds in that province.</p>

<h2>Marketplace Facilitator Rules</h2>
<p>As of July 2021, online marketplaces like Amazon, Etsy, and eBay are required to collect and remit GST/HST on sales made through their platforms by third-party sellers. If you sell exclusively through these platforms, the marketplace handles the tax collection. However, you're still responsible for tracking this correctly in your books and for any sales through your own website.</p>

<h2>Cross-Border Sales (US and International)</h2>
<p>Exports from Canada are generally zero-rated for GST purposes, meaning you don't charge GST on sales to customers outside Canada. However, you must maintain documentation proving the goods were exported. You can still claim ITCs on expenses related to zero-rated sales.</p>

<h2>Record-Keeping for E-Commerce</h2>
<p>CRA requires you to keep detailed records of all e-commerce sales, including: customer location, amount charged, tax collected, shipping costs, and platform fees. Reconciling multiple sales channels monthly is critical to maintaining accurate books.</p>

<h2>Castle Bookkeeping for E-Commerce</h2>
<p>We work with Calgary-based e-commerce sellers across Shopify, Amazon, Etsy, and WooCommerce. We reconcile your sales channels, track inventory costs, ensure correct tax treatment, and file your GST returns. Book a free consultation to learn more.</p>
`
  },
  {
    title: 'How Much Does a Bookkeeper Cost in Calgary?',
    slug: 'how-much-does-a-bookkeeper-cost-in-calgary',
    excerpt: 'Bookkeeping costs in Calgary vary widely. Here is what to expect and what affects pricing.',
    body: `
<p>One of the first questions Calgary business owners ask when considering professional bookkeeping is: "How much will it cost?" The answer depends on several factors, but here's a realistic breakdown of what to expect in the Calgary market.</p>

<h2>Hourly vs Flat-Fee Pricing</h2>
<p>Some bookkeepers charge by the hour, typically $35–$75 per hour in Calgary. The problem with hourly billing is unpredictability — you don't know your monthly cost until you get the invoice, and there's an inherent incentive for the bookkeeper to take longer. Flat-fee pricing, where you pay a fixed monthly amount, provides budget certainty and aligns incentives.</p>

<h2>Typical Monthly Costs</h2>
<p>For a Calgary small business with straightforward needs (under 100 transactions per month), expect to pay:</p>
<ul>
  <li><strong>Freelance bookkeeper</strong> — $200–$400/month</li>
  <li><strong>Bookkeeping firm (flat fee)</strong> — $300–$600/month</li>
  <li><strong>Full-service firm (bookkeeping + payroll + GST)</strong> — $500–$1,000/month</li>
</ul>
<p>Businesses with higher transaction volumes, multiple entities, or complex needs (inventory, multi-currency, etc.) will pay more.</p>

<h2>What Affects the Price?</h2>
<ul>
  <li><strong>Transaction volume</strong> — more transactions means more work. A restaurant with 500+ transactions per month costs more than a consultant with 30.</li>
  <li><strong>Number of bank and credit-card accounts</strong> — each account requires separate reconciliation.</li>
  <li><strong>Payroll</strong> — processing payroll, T4s, and CRA remittances is typically an add-on.</li>
  <li><strong>GST filing</strong> — some firms include GST filing; others charge extra.</li>
  <li><strong>Catch-up work</strong> — if you're behind, there's usually a one-time catch-up fee before monthly service begins.</li>
</ul>

<h2>The Cost of NOT Having a Bookkeeper</h2>
<p>Consider what it costs to do your own books: your time (5–15 hours per month), the stress, the risk of errors, missed deductions, and CRA penalties. For most Calgary business owners, a $300–$500 monthly bookkeeping fee is one of the highest-ROI investments they make.</p>

<h2>Castle Bookkeeping Pricing</h2>
<p>Castle offers transparent flat-fee plans starting at $300/month for standard small businesses. Our plans include monthly bookkeeping, bank reconciliation, financial statements, and GST filing. Payroll and tax preparation are available as add-ons. No hidden fees, no surprises. Contact us for a custom quote.</p>
`
  },
  {
    title: 'Sole Proprietor vs Corporation: Tax Implications in Alberta',
    slug: 'sole-proprietor-vs-corporation-tax-implications-in-alberta',
    excerpt: 'Should you incorporate your Calgary business? Here are the tax implications of each structure in Alberta.',
    body: `
<p>One of the biggest decisions Calgary business owners face is whether to operate as a sole proprietor or incorporate. The right choice depends on your income level, growth plans, and personal financial situation. Here's a breakdown of the tax implications of each structure in Alberta.</p>

<h2>Sole Proprietorship: How It's Taxed</h2>
<p>As a sole proprietor, your business income flows directly to your personal tax return. You pay personal income tax on your net business income (revenue minus expenses) at your marginal rate. In Alberta, the combined federal-provincial marginal rates range from 25% on the first $55,867 to over 48% on income above $355,845.</p>

<h2>Corporation: How It's Taxed</h2>
<p>A corporation is a separate legal entity that files its own tax return. Active business income up to $500,000 is taxed at the small business rate of 11% (combined federal and Alberta). Income above $500,000 is taxed at 23%. When you withdraw money from the corporation (as salary or dividends), that withdrawal is taxed again on your personal return — this is called integration.</p>

<h2>When Incorporation Saves Tax</h2>
<p>Incorporation is most advantageous when your business earns more than you need to live on. The surplus stays in the corporation at the 11% rate rather than being taxed at your personal rate (which could be 30–48%). This creates a tax-deferral opportunity — not a permanent savings, but a significant timing advantage that lets your money compound at a lower tax cost.</p>

<h2>When Staying Sole Proprietor Makes Sense</h2>
<p>If you withdraw all of your business income for personal expenses, incorporation provides little tax benefit because integration ensures roughly the same total tax. Incorporation also adds costs: annual corporate tax return preparation ($1,000–$2,500), incorporation fees, and separate bookkeeping requirements.</p>

<h2>Other Considerations</h2>
<ul>
  <li><strong>Liability protection</strong> — a corporation provides limited liability, shielding your personal assets from business debts (with some exceptions).</li>
  <li><strong>CPP implications</strong> — sole proprietors pay both employee and employer CPP. Corporate owner-managers can structure compensation to optimise CPP contributions.</li>
  <li><strong>Income splitting</strong> — the Tax on Split Income (TOSI) rules have limited many income-splitting strategies, but some opportunities remain with proper planning.</li>
</ul>

<h2>Get Professional Guidance</h2>
<p>The sole proprietor versus corporation decision has long-term financial implications. Castle Bookkeeping can help you model both scenarios and connect you with a Calgary accountant who specialises in business structuring. Contact us for a free consultation.</p>
`
  },
  {
    title: 'Record Keeping Requirements for CRA Compliance',
    slug: 'record-keeping-requirements-for-cra-compliance',
    excerpt: 'CRA has specific rules about what records you must keep and for how long. Here is the complete guide.',
    body: `
<p>Every Canadian business is legally required to maintain adequate books and records. CRA can request to examine your records at any time, and failure to maintain them can result in penalties, denied deductions, and even prosecution in extreme cases. Here's what Calgary business owners need to know.</p>

<h2>What Records Must You Keep?</h2>
<p>CRA requires you to retain records that support the amounts reported on your tax returns and GST filings. This includes:</p>
<ul>
  <li>Sales invoices and receipts</li>
  <li>Purchase invoices and receipts</li>
  <li>Bank statements and deposit slips</li>
  <li>Credit-card statements</li>
  <li>General ledger and journal entries</li>
  <li>Contracts and agreements</li>
  <li>Payroll records (T4s, ROEs, timesheets)</li>
  <li>GST/HST returns and supporting calculations</li>
  <li>Year-end financial statements</li>
  <li>Corporate minutes and resolutions (for corporations)</li>
</ul>

<h2>How Long Must You Keep Records?</h2>
<p>The general rule is six years from the end of the tax year to which they relate. For example, records for the 2026 tax year must be kept until at least December 31, 2032. Some exceptions apply:</p>
<ul>
  <li>If you filed a return late, keep records for six years from the filing date.</li>
  <li>If you've filed an objection or appeal, keep records until the matter is resolved plus one year.</li>
  <li>Corporate records related to property (for capital gains calculations) should be kept indefinitely.</li>
</ul>

<h2>Digital Records</h2>
<p>CRA accepts electronic records, including scanned receipts, cloud-based accounting data, and electronic invoices. However, the records must be accessible and readable, and you must be able to provide them to CRA upon request. If you store records electronically, ensure you have reliable backups.</p>

<h2>Penalties for Inadequate Records</h2>
<p>If CRA determines your records are inadequate, consequences can include: denied expense claims, arbitrary income assessments (CRA estimates your income), penalties up to $2,500 for each failure, and in serious cases, prosecution under the Income Tax Act.</p>

<h2>Castle Keeps Your Records Organised</h2>
<p>Part of our bookkeeping service includes maintaining organised, CRA-compliant records. All transactions are properly documented, categorised, and stored in cloud-based accounting software with full audit trails. If CRA ever comes calling, your records will be ready. Contact us to learn more.</p>
`
  },
  {
    title: 'Year-End Bookkeeping Checklist for Calgary Businesses',
    slug: 'year-end-bookkeeping-checklist-for-calgary-businesses',
    excerpt: 'Use this checklist to close out your books properly and start the new year with clean financials.',
    body: `
<p>The end of your fiscal year is a critical time for your Calgary business's finances. Proper year-end procedures ensure accurate financial statements, smooth tax filing, and a clean start to the new year. Here's your complete checklist.</p>

<h2>Reconciliation</h2>
<ul>
  <li>Reconcile all bank accounts through the last day of the fiscal year</li>
  <li>Reconcile all credit-card accounts</li>
  <li>Reconcile any loan accounts and verify outstanding balances</li>
  <li>Reconcile accounts receivable — follow up on outstanding invoices</li>
  <li>Reconcile accounts payable — ensure all bills are recorded</li>
</ul>

<h2>Review and Adjust</h2>
<ul>
  <li>Review your chart of accounts for any needed cleanup</li>
  <li>Verify all transactions are categorised correctly</li>
  <li>Record any accrued expenses (bills received after year-end for the prior period)</li>
  <li>Record depreciation entries for fixed assets</li>
  <li>Write off any uncollectible receivables</li>
  <li>Review and adjust prepaid expenses</li>
  <li>Perform an inventory count if applicable</li>
</ul>

<h2>Payroll Year-End</h2>
<ul>
  <li>Process final payroll for the fiscal year</li>
  <li>Verify all source deductions were remitted correctly</li>
  <li>Prepare T4 slips for all employees (due February 28)</li>
  <li>Prepare T4A slips for contractors paid over $500</li>
  <li>Issue any outstanding ROEs</li>
</ul>

<h2>GST/HST</h2>
<ul>
  <li>File any outstanding GST returns</li>
  <li>Reconcile GST collected versus GST remitted for the year</li>
  <li>Review Input Tax Credits to ensure all eligible ITCs were claimed</li>
</ul>

<h2>Financial Statements</h2>
<ul>
  <li>Prepare year-end income statement (profit and loss)</li>
  <li>Prepare year-end balance sheet</li>
  <li>Compare actuals to budget and prior year</li>
  <li>Prepare any management reports needed for planning</li>
</ul>

<h2>Tax Preparation</h2>
<ul>
  <li>Organise all tax documents and receipts</li>
  <li>Deliver year-end financial package to your accountant</li>
  <li>Discuss any year-end tax planning opportunities (RRSP contributions, equipment purchases, etc.)</li>
</ul>

<h2>Let Castle Handle Year-End</h2>
<p>Year-end bookkeeping is detailed and time-sensitive. Castle Bookkeeping manages the entire year-end process for our monthly clients, ensuring nothing is missed and your accountant receives a clean, complete financial package. Reach out today to get started.</p>
`
  }
];

// ─── SEASONAL POSTS ────────────────────────────────────────────
const seasonalPosts = [
  {
    title: 'Tax Season 2026: What Calgary Business Owners Need to Know',
    slug: 'tax-season-2026-what-calgary-business-owners-need-to-know',
    excerpt: 'Key tax changes, deadlines, and tips for Calgary businesses filing in 2026.',
    body: `
<p>Tax season 2026 is here, and Calgary business owners need to be prepared. Whether you're a sole proprietor or incorporated, understanding this year's key deadlines, rule changes, and opportunities can save you money and stress.</p>

<h2>Key Deadlines</h2>
<ul>
  <li><strong>February 28, 2026</strong> — T4 and T4A filing deadline for employers</li>
  <li><strong>April 30, 2026</strong> — personal tax return deadline (and balance-owing deadline for self-employed)</li>
  <li><strong>June 15, 2026</strong> — self-employed filing deadline (but balance owing is still due April 30)</li>
  <li><strong>Six months after fiscal year-end</strong> — corporate tax return deadline</li>
</ul>

<h2>Notable Changes for 2026</h2>
<p>The federal government has continued its push toward digital reporting. CRA's online services are now the default filing method for most business returns. The basic personal amount has been indexed to inflation, reducing your tax slightly. CPP contribution rates and maximums have increased for 2026 — if you're on payroll, ensure your deduction tables are updated.</p>

<h2>Capital Gains Changes</h2>
<p>Keep an eye on the capital gains inclusion rate, which has been a moving target. If you sold business assets, investment properties, or shares in 2025, consult your accountant about the applicable inclusion rate for your situation.</p>

<h2>Maximize Your Deductions</h2>
<p>The best time to review your deductions was throughout the year; the second-best time is now. Common deductions Calgary business owners miss include: home-office expenses, vehicle mileage, professional development, and association memberships. Ensure your books capture all of these.</p>

<h2>RRSP Contributions</h2>
<p>If you have RRSP contribution room, contributions made by March 2, 2026 can be deducted on your 2025 tax return. This is one of the most effective tax-reduction strategies available to sole proprietors and individuals who take salary from their corporations.</p>

<h2>Get Your Books Tax-Ready</h2>
<p>If your books aren't up to date, there's still time — but don't wait. Castle Bookkeeping offers catch-up bookkeeping services to get you filing-ready. We can also prepare your personal and corporate tax returns or coordinate with your accountant. Contact us today for a free consultation.</p>
`
  },
  {
    title: 'Q1 GST Filing Guide for Alberta Businesses',
    slug: 'q1-gst-filing-guide-for-alberta-businesses',
    excerpt: 'A step-by-step guide to filing your Q1 2026 GST return correctly and on time.',
    body: `
<p>If your Calgary business files GST quarterly, your Q1 2026 return (covering January through March) is due by April 30, 2026. Here's a complete guide to filing accurately and on time.</p>

<h2>Step 1: Reconcile Your Sales</h2>
<p>Before preparing your GST return, ensure all revenue for January through March is recorded in your accounting software. Reconcile your bank deposits against your recorded sales to verify nothing is missing. Pay special attention to any cash transactions, which are easy to overlook.</p>

<h2>Step 2: Verify GST Collected</h2>
<p>Run a GST report in your accounting software for the Q1 period. Verify that 5% GST has been applied to all taxable sales. Common errors include: forgetting to charge GST on new revenue streams, incorrectly zero-rating domestic sales, or double-counting GST on returns and credits.</p>

<h2>Step 3: Calculate Input Tax Credits</h2>
<p>Input Tax Credits (ITCs) are the GST you paid on business purchases that you can claim back. Review your expenses for Q1 and ensure all GST paid is captured. Common ITC categories include: office supplies, professional fees, advertising, equipment purchases, and subcontractor invoices that include GST.</p>

<h2>Step 4: Calculate Net GST</h2>
<p>Your net GST is simple: GST collected minus ITCs claimed. If the result is positive, you owe CRA. If negative (meaning you paid more GST on purchases than you collected on sales), you'll receive a refund.</p>

<h2>Step 5: File and Remit</h2>
<p>File your GST return through CRA My Business Account or through your accounting software (QBO supports direct filing). If you owe a balance, remit payment by April 30 to avoid penalties and interest.</p>

<h2>Common Q1 Mistakes</h2>
<ul>
  <li>Forgetting to include cash sales</li>
  <li>Not claiming ITCs on year-end accounting fees (often invoiced in Q1)</li>
  <li>Missing ITCs on annual subscriptions renewed in January</li>
  <li>Incorrect treatment of bad debts (you can recover GST remitted on uncollectible invoices)</li>
</ul>

<h2>Let Castle File for You</h2>
<p>GST filing is included in all of Castle Bookkeeping's monthly plans. We calculate, prepare, and file your return so you never miss a deadline. Contact us to learn more.</p>
`
  },
  {
    title: 'Year-End Bookkeeping Checklist for 2026',
    slug: 'year-end-bookkeeping-checklist-for-2026',
    excerpt: 'Everything you need to close out your 2026 books and start 2027 on the right foot.',
    body: `
<p>As 2026 draws to a close, Calgary business owners need to wrap up their finances properly. A thorough year-end process ensures accurate financial statements, a smooth tax-filing experience, and a clean slate for the new year. Here is your complete 2026 year-end bookkeeping checklist.</p>

<h2>December Action Items</h2>
<ul>
  <li>Record all revenue through December 31 — don't let late-December invoices slip into January</li>
  <li>Enter all outstanding bills and expenses for December</li>
  <li>Process your final payroll for the year</li>
  <li>Make any planned year-end purchases (equipment, supplies) to capture 2026 deductions</li>
  <li>Review your RRSP contribution room if you're a sole proprietor (deadline is March 1, 2027)</li>
</ul>

<h2>Reconciliation Checklist</h2>
<ul>
  <li>Reconcile all bank accounts through December 31</li>
  <li>Reconcile all credit-card accounts through December 31</li>
  <li>Reconcile loan balances against lender statements</li>
  <li>Review accounts receivable — write off any uncollectible amounts</li>
  <li>Confirm accounts payable is complete — all December bills entered</li>
</ul>

<h2>Adjusting Entries</h2>
<ul>
  <li>Record depreciation for all capital assets</li>
  <li>Adjust prepaid expenses (insurance, rent paid in advance)</li>
  <li>Accrue any expenses incurred but not yet invoiced</li>
  <li>If applicable, perform a physical inventory count and adjust your records</li>
</ul>

<h2>Payroll and T4s</h2>
<ul>
  <li>Verify all 2026 payroll has been processed</li>
  <li>Confirm source deductions match CRA records</li>
  <li>Prepare T4 slips — due by February 28, 2027</li>
  <li>Prepare T4A slips for contractors if applicable</li>
</ul>

<h2>GST</h2>
<ul>
  <li>File any outstanding quarterly returns</li>
  <li>If you file annually, prepare your 2026 annual return (due March 31, 2027 for calendar year-end)</li>
  <li>Reconcile total GST collected against GST remitted for the year</li>
</ul>

<h2>Financial Reporting</h2>
<ul>
  <li>Generate year-end income statement and balance sheet</li>
  <li>Compare 2026 results to 2025 and to your budget</li>
  <li>Prepare your financial package for your accountant</li>
</ul>

<h2>Castle Makes Year-End Easy</h2>
<p>Castle Bookkeeping handles the entire year-end process for our clients. From final reconciliations to T4 preparation to assembling your tax-filing package, we ensure nothing falls through the cracks. Get in touch today.</p>
`
  },
  {
    title: "How Calgary Businesses Can Prepare for CRA's New Digital Reporting",
    slug: 'how-calgary-businesses-can-prepare-for-cra-new-digital-reporting',
    excerpt: "CRA is expanding its digital reporting requirements. Here is how to prepare your Calgary business.",
    body: `
<p>The Canada Revenue Agency has been steadily moving toward mandatory digital reporting for businesses. For Calgary small business owners, this shift means adapting your record-keeping practices to meet new electronic filing and documentation requirements.</p>

<h2>What's Changing?</h2>
<p>CRA has been phasing in mandatory electronic filing for various returns over the past several years. Corporate tax returns, GST returns, payroll information returns, and T4/T5 slips must now be filed electronically in most cases. The agency is also investing heavily in data-matching technology, cross-referencing information from banks, payment processors, and provincial registries against your filed returns.</p>

<h2>E-Invoicing on the Horizon</h2>
<p>Many countries have already implemented mandatory electronic invoicing (e-invoicing), and Canada is studying similar frameworks. While not yet mandated, CRA has signalled interest in real-time or near-real-time transaction reporting. Forward-thinking Calgary businesses should start using accounting software that can generate and receive standardised electronic invoices.</p>

<h2>Digital Record Keeping</h2>
<p>CRA already accepts digital records (including scanned receipts and cloud-stored documents), but the expectation is shifting from "accepted" to "expected." Shoebox record keeping is increasingly risky. Best practices include:</p>
<ul>
  <li>Using cloud accounting software (QuickBooks Online, Xero) as your primary bookkeeping system</li>
  <li>Scanning and digitally storing all paper receipts</li>
  <li>Using apps like Dext or Hubdoc to automatically capture and categorise receipts</li>
  <li>Maintaining digital backups of all financial records</li>
</ul>

<h2>Payment Processor Reporting</h2>
<p>CRA now receives data from payment processors (Square, Stripe, PayPal, etc.) showing how much money flows through your merchant accounts. If your reported revenue doesn't match your payment-processor data, expect questions. Ensure your bookkeeping reconciles all payment channels.</p>

<h2>How to Prepare</h2>
<ol>
  <li>Move to cloud-based accounting software if you haven't already</li>
  <li>Digitise your receipt and document storage</li>
  <li>Ensure your bookkeeper files all returns electronically</li>
  <li>Reconcile all payment channels (bank, credit card, payment processors, cash) monthly</li>
  <li>Keep your books current — retroactive catch-ups are harder to verify digitally</li>
</ol>

<h2>Stay Ahead with Castle Bookkeeping</h2>
<p>Castle Bookkeeping is fully digital. We use cloud-based software, electronic filing, and automated receipt capture to keep your books CRA-ready at all times. Contact us to modernise your bookkeeping setup.</p>
`
  },
  {
    title: 'Spring Cleaning Your Books: A Calgary Business Guide',
    slug: 'spring-cleaning-your-books-a-calgary-business-guide',
    excerpt: 'Spring is the perfect time to tidy up your financials and set your Calgary business up for success.',
    body: `
<p>Spring in Calgary means warmer weather, longer days, and — for savvy business owners — an opportunity to clean up your finances. Just as you'd spring-clean your home, your books deserve a thorough review to ensure everything is accurate, current, and ready for the rest of the year.</p>

<h2>1. Catch Up on Any Backlog</h2>
<p>If you fell behind during the busy winter months or the holiday rush, now is the time to get current. Categorise any unreconciled transactions, process outstanding invoices, and bring your bank reconciliations up to date. The longer you wait, the harder catch-up becomes.</p>

<h2>2. Review Your Chart of Accounts</h2>
<p>Over time, charts of accounts tend to accumulate redundant or poorly named categories. Spring is a great time to consolidate, rename, or reorganise your accounts so they accurately reflect your current business operations. A clean chart of accounts makes financial statements much more useful.</p>

<h2>3. Clean Up Accounts Receivable</h2>
<p>Review your outstanding invoices. Which are truly collectible and which should be written off? Follow up on overdue payments and consider implementing stricter payment terms going forward. Carrying stale receivables inflates your revenue picture and distorts your cash-flow projections.</p>

<h2>4. Review Recurring Expenses</h2>
<p>Audit your monthly subscriptions, software licences, and recurring charges. Business owners are often surprised to find they're still paying for services they no longer use. Cancelling unnecessary subscriptions can save hundreds or thousands of dollars annually.</p>

<h2>5. Verify Your Tax Filings</h2>
<p>Confirm that all required filings are up to date: Q1 GST return, payroll remittances, and any applicable corporate instalments. Check your CRA My Business Account for any outstanding amounts or notices you may have missed.</p>

<h2>6. Update Your Budget</h2>
<p>If you created a budget at the start of the year, now is the time to compare Q1 actuals against your plan. Adjust your forecast for the remaining three quarters based on actual performance and any changes in your business outlook.</p>

<h2>7. Back Up Your Data</h2>
<p>Ensure your accounting data is backed up. If you're using cloud software, verify your subscription is current. If you keep any records locally, create a backup and store it securely.</p>

<h2>Need Help with Your Spring Cleanup?</h2>
<p>Castle Bookkeeping offers one-time cleanup services as well as ongoing monthly plans. Whether you need a quick tune-up or a full overhaul, we can help get your Calgary business's finances in top shape. Contact us for a free consultation.</p>
`
  },
  {
    title: "Summer Business Slowdown? Time to Catch Up on Bookkeeping",
    slug: 'summer-business-slowdown-time-to-catch-up-on-bookkeeping',
    excerpt: 'Use the quieter summer months to get your financial house in order before the fall rush.',
    body: `
<p>For many Calgary businesses, summer brings a natural slowdown. Whether your clients are on vacation, projects are paused, or foot traffic dips, this quieter period is a golden opportunity to catch up on the bookkeeping tasks that got pushed aside during busier months.</p>

<h2>Why Summer Is the Best Time to Catch Up</h2>
<p>During peak business periods, bookkeeping is often the first thing that gets deprioritised. You're focused on serving customers, managing staff, and keeping operations running. By summer, you may have several months of unreconciled transactions, unfiled receipts, and outdated financial statements. The summer slowdown gives you breathing room to address it all.</p>

<h2>What to Tackle First</h2>
<ul>
  <li><strong>Bank reconciliations</strong> — bring every account up to date, starting with the oldest month first.</li>
  <li><strong>Receipt organisation</strong> — gather, scan, and file all paper receipts. Set up a digital receipt system going forward.</li>
  <li><strong>Accounts receivable</strong> — chase outstanding invoices. Summer is also a good time to review your invoicing process for improvements.</li>
  <li><strong>Mid-year review</strong> — with six months of data, you can assess how your business is tracking against your annual budget and make adjustments.</li>
</ul>

<h2>Prepare for the Fall Rush</h2>
<p>Calgary's business activity typically picks up in September. Getting your books in order now means you'll enter the busy fall season with clear financials, accurate cash-flow projections, and confidence in your numbers. You'll also be well-positioned for year-end planning conversations with your accountant.</p>

<h2>Set Up Systems for the Future</h2>
<p>Use this downtime to implement better bookkeeping habits. Connect your bank feeds to your accounting software, set up automated invoice reminders, and create a monthly close checklist. These small investments of time now will save hours every month going forward.</p>

<h2>Consider Outsourcing</h2>
<p>If you've been doing your own books and consistently falling behind, summer is the ideal time to transition to a professional bookkeeper. You'll start the fall with clean books and a system in place to stay current month after month.</p>

<h2>Castle's Summer Catch-Up Service</h2>
<p>Castle Bookkeeping offers catch-up packages specifically designed for businesses that have fallen behind. We'll bring your books current, set up efficient systems, and optionally transition you to a monthly plan. Call ${PHONE} or book a free consultation online.</p>
`
  },
  {
    title: 'Back to School: Bookkeeping Tips for Calgary Daycare Operators',
    slug: 'back-to-school-bookkeeping-tips-for-calgary-daycare-operators',
    excerpt: 'September is a busy time for daycares. Here are bookkeeping tips to manage the back-to-school rush.',
    body: `
<p>September is the busiest enrolment period for Calgary daycare operators. New families are signing up, subsidies are being processed, and staffing needs are shifting. Amid all this activity, it's crucial to keep your bookkeeping on track. Here are tips specifically for Calgary daycare operators navigating the back-to-school season.</p>

<h2>1. Track Enrolment Changes Carefully</h2>
<p>New enrolments, withdrawals, and schedule changes all affect your revenue. Update your billing records immediately when changes occur — don't wait until month-end. Each child's fee schedule, start date, and payment method should be documented clearly.</p>

<h2>2. Manage Government Subsidies Correctly</h2>
<p>Alberta's child care subsidy program means a significant portion of your revenue may come from the government rather than directly from parents. Track subsidy income separately from parent-paid fees in your accounting system. This makes it much easier to reconcile payments and report to the government.</p>

<h2>3. Staff Up — and Track the Costs</h2>
<p>Hiring seasonal or new staff to handle increased enrolment creates payroll obligations. Ensure new employees complete TD1 forms, that you're calculating source deductions correctly, and that payroll remittances are made on time. Remember: CRA penalties for payroll errors apply from day one.</p>

<h2>4. Track Supply Purchases</h2>
<p>Back-to-school often means stocking up on educational materials, art supplies, outdoor equipment, and cleaning products. Keep receipts for all purchases and categorise them correctly — these are deductible business expenses and also generate GST Input Tax Credits.</p>

<h2>5. Update Your Fee Schedule</h2>
<p>If you're raising rates for the new school year, ensure your billing system reflects the new amounts starting from the correct date. Communicate changes clearly to parents and update any direct-debit or pre-authorised payment arrangements.</p>

<h2>6. Review Your Insurance</h2>
<p>September is a good time to review your business insurance. Has your enrolment grown? Do you have new staff? Your coverage should reflect your current operations. The premiums are a deductible business expense.</p>

<h2>7. Plan for the Year Ahead</h2>
<p>With September marking the start of the "daycare year," use this time to create or update your annual budget. Forecast revenue based on current enrolment, plan for known expenses, and identify months where cash flow may be tight (like summer, when enrolment often drops).</p>

<h2>Bookkeeping Support for Daycares</h2>
<p>Castle Bookkeeping works with several Calgary daycare operators and understands the unique financial demands of the industry — from subsidy reconciliation to staff payroll. Contact us for a free consultation tailored to your daycare's needs.</p>
`
  },
  {
    title: 'Holiday Season Bookkeeping for Calgary Retailers',
    slug: 'holiday-season-bookkeeping-for-calgary-retailers',
    excerpt: 'The holiday season is the busiest time for retailers. Keep your books on track with these tips.',
    body: `
<p>The holiday season — from Black Friday through New Year's — is the most important sales period for many Calgary retailers. Transaction volumes spike, inventory turns over rapidly, and cash flow surges. But if your bookkeeping falls behind during this critical period, you'll start the new year with a mess to untangle. Here's how to stay on top of your books during the holiday rush.</p>

<h2>1. Reconcile Weekly, Not Monthly</h2>
<p>During high-volume periods, monthly reconciliation isn't frequent enough. Reconcile your bank accounts and POS system weekly so discrepancies are caught quickly. This is especially important if you have multiple registers or payment processors.</p>

<h2>2. Track Inventory in Real Time</h2>
<p>If you carry physical inventory, accurate tracking during the holiday season is essential. Inventory shrinkage, damage, and returns all need to be recorded promptly. A year-end inventory count will be much easier if your records have been maintained throughout the season.</p>

<h2>3. Manage Gift Cards and Store Credits</h2>
<p>Gift cards are a liability, not revenue, until they're redeemed. Record gift-card sales in a liability account and recognise revenue only when the card is used. Similarly, store credits issued for returns should be tracked accurately.</p>

<h2>4. Record All Returns and Exchanges</h2>
<p>Post-holiday returns can be significant. Process returns in your POS and accounting system promptly, including any GST adjustments. Don't let January returns create confusion in your December financial statements.</p>

<h2>5. Track Seasonal Staff Costs</h2>
<p>If you hired seasonal employees, ensure their payroll is processed correctly, including statutory holiday pay for Christmas Day, Boxing Day, and New Year's Day. Alberta's Employment Standards require overtime pay for hours worked on general holidays unless other arrangements are in place.</p>

<h2>6. Separate Holiday Marketing Spend</h2>
<p>Track holiday-specific marketing expenses (Black Friday ads, holiday decorations, promotional materials) in a sub-account or tagged category. This allows you to measure the ROI of your holiday marketing investment when you review your year-end numbers.</p>

<h2>7. Prepare for Year-End</h2>
<p>The holiday season runs right into year-end. Make sure your December books are closed promptly in January so you can move into tax preparation without delay. The last thing you want is to be reconciling December transactions in March.</p>

<h2>Holiday Support from Castle</h2>
<p>Castle Bookkeeping helps Calgary retailers manage the financial complexity of the holiday season. Our monthly plans include regular reconciliation, GST filing, and year-end preparation — so you can focus on your customers while we handle the books.</p>
`
  },
  {
    title: 'New Year Financial Reset for Calgary Small Businesses',
    slug: 'new-year-financial-reset-for-calgary-small-businesses',
    excerpt: 'Start the new year with clean books, clear goals, and a plan for financial success.',
    body: `
<p>A new year is a fresh start — and that applies to your business finances too. Whether last year was your best year yet or a challenging one, January is the perfect time to reset your financial systems, set goals, and establish the habits that will keep your Calgary business on track for the next twelve months.</p>

<h2>1. Close Out Last Year</h2>
<p>Before looking forward, look back. Ensure your previous year's books are fully reconciled and closed. Generate your year-end financial statements (income statement and balance sheet) and review them carefully. How did actual results compare to your budget? What surprised you?</p>

<h2>2. Set Financial Goals for the New Year</h2>
<p>Based on your year-end review, set specific, measurable financial goals for the coming year. Examples include: increase revenue by 15%, reduce operating expenses by 10%, improve gross margin by 3 percentage points, or build a cash reserve equal to three months of operating expenses.</p>

<h2>3. Create (or Update) Your Budget</h2>
<p>A budget is your financial roadmap. Start with your revenue forecast based on current clients, expected growth, and seasonal patterns. Then budget each expense category based on last year's actuals and your goals for the new year. Review your budget monthly against actual results.</p>

<h2>4. Review Your Pricing</h2>
<p>Costs increase annually — rent, supplies, insurance, wages. If you haven't raised your prices, your margins are shrinking. January is a natural time to implement price increases. Even a modest 3-5% increase can significantly improve your annual profitability.</p>

<h2>5. Audit Your Subscriptions and Recurring Costs</h2>
<p>Review every recurring charge on your bank and credit-card statements. Cancel services you no longer use, renegotiate contracts where possible, and ensure you're on the most cost-effective plans for the services you need.</p>

<h2>6. Set Up Better Systems</h2>
<p>If your bookkeeping was chaotic last year, now is the time to fix it. Set up automated bank feeds, implement a receipt-scanning app, create a monthly close checklist, and schedule recurring time for financial review. The goal is to build habits that keep you current all year.</p>

<h2>7. Schedule a Financial Check-In</h2>
<p>Put a recurring quarterly appointment in your calendar to review your financial statements, compare actuals to budget, and adjust your strategy. Financial awareness is one of the most important habits of successful business owners.</p>

<h2>Start Fresh with Castle</h2>
<p>Castle Bookkeeping helps Calgary businesses start the new year right. Whether you need catch-up bookkeeping from last year, a new monthly plan, or help setting up your budget, we're here to support you. Book your free consultation today.</p>
`
  },
  {
    title: "Alberta Budget 2026: What It Means for Your Small Business",
    slug: 'alberta-budget-2026-what-it-means-for-your-small-business',
    excerpt: 'A plain-language breakdown of how Alberta Budget 2026 affects Calgary small business owners.',
    body: `
<p>Every year, the Alberta government's budget brings changes that affect small business owners across Calgary. From tax rates to grant programs to regulatory changes, understanding the budget helps you plan your finances and take advantage of new opportunities. Here's a plain-language summary of what matters for your business.</p>

<h2>Small Business Tax Rate</h2>
<p>Alberta's small business tax rate remains at 2% on the first $500,000 of active business income — one of the lowest in Canada. Combined with the federal 9% rate, the total small business rate stays at 11%. There are no planned increases, which is welcome stability for Calgary entrepreneurs.</p>

<h2>Infrastructure and Construction Spending</h2>
<p>The budget includes significant infrastructure investment, including road construction, public transit expansion, and facility upgrades across Alberta. For Calgary contractors, electricians, plumbers, and construction companies, this translates to potential new government contract opportunities.</p>

<h2>Small Business Grants and Programs</h2>
<p>Alberta continues to fund various small business support programs, including innovation grants, export-development funding, and sector-specific support for technology and clean energy. Review the programs available through Alberta Innovates and the Business Link to see if your Calgary business qualifies.</p>

<h2>Employment and Training Incentives</h2>
<p>The budget includes funding for workforce training programs that can offset the cost of training new employees. If you're planning to hire in 2026, investigate available wage subsidies and apprenticeship incentives that can reduce your payroll costs.</p>

<h2>Health and Child Care</h2>
<p>Continued investment in health care and the child care subsidy program affects businesses in these sectors directly. If you operate a daycare, wellness clinic, or health-care practice, budget changes to subsidy rates and program funding will impact your revenue projections.</p>

<h2>Carbon Pricing</h2>
<p>The federal carbon pricing system continues to apply in Alberta. For businesses with significant fuel or energy costs — trucking companies, manufacturers, HVAC companies — this remains a meaningful expense. Track your carbon-related costs carefully for accurate financial reporting and to claim any available rebates.</p>

<h2>What This Means for Your Books</h2>
<p>Budget changes can affect your tax calculations, grant eligibility, payroll costs, and operating expenses. Keeping your books accurate and up to date ensures you can respond to these changes promptly and take advantage of any new programs or deductions.</p>

<h2>Stay Informed with Castle</h2>
<p>Castle Bookkeeping stays current on federal and provincial changes that affect Calgary small businesses. As part of our service, we proactively flag relevant changes and ensure your bookkeeping reflects the latest rules. Contact us for a free consultation.</p>
`
  }
];

// ─── ADDITIONAL POSTS ──────────────────────────────────────────
const additionalPosts = [
  {
    title: 'Rush Bookkeeping: When You Need Your Books Done Fast',
    slug: 'rush-bookkeeping-when-you-need-your-books-done-fast',
    excerpt: 'Deadlines don\'t wait. Learn when rush bookkeeping makes sense and how Castle delivers fast turnaround without sacrificing accuracy.',
    category: 'Guides',
    date: '2025-12-08',
    body: `
<p>Sometimes a deadline sneaks up on you. Maybe your accountant needs clean books by Friday, a lender is requesting financial statements for a loan application, or CRA has sent a review letter with a two-week response window. Whatever the reason, you need your books done fast.</p>

<h2>What Is Rush Bookkeeping?</h2>
<p>Rush bookkeeping is an accelerated catch-up service designed for businesses that need their financial records brought current on a tight timeline. Instead of the usual multi-week turnaround for catch-up work, rush bookkeeping compresses the process into days.</p>

<h2>When Does Rush Bookkeeping Make Sense?</h2>
<ul>
  <li><strong>Loan or mortgage applications</strong>. Lenders require up-to-date financial statements, and delays in your books can hold up funding.</li>
  <li><strong>CRA reviews or audits</strong>. When CRA requests documentation, the clock is ticking. Having clean, organised records ready quickly can make the difference between a smooth review and a costly reassessment.</li>
  <li><strong>Tax filing deadlines</strong>. If your fiscal year-end has passed and your books are months behind, rush bookkeeping gets you filing-ready before penalties accumulate.</li>
  <li><strong>Business sale or partnership changes</strong>. Buyers and new partners need accurate financials during due diligence.</li>
  <li><strong>Grant applications</strong>. Many government grants require current financial statements as part of the application package.</li>
</ul>

<h2>How Castle Handles Rush Work</h2>
<p>Castle Bookkeeping offers rush bookkeeping as a dedicated service. We assign a senior bookkeeper to your file, prioritise your work above our regular queue, and deliver clean, reconciled books within the agreed timeline. Rush turnarounds are typically 3 to 7 business days depending on the volume of transactions and how far behind your records are.</p>

<h2>What We Need From You</h2>
<p>To deliver rush bookkeeping on time, we need a few things upfront: access to your bank and credit-card statements (or online banking login), any receipts or invoices you have on hand, and access to your accounting software (QuickBooks Online, Xero, or similar). The faster we get access, the faster we deliver.</p>

<h2>Rush Pricing</h2>
<p>Rush bookkeeping is priced as a one-time project based on the number of months and transaction volume involved. A rush surcharge applies to reflect the accelerated timeline and dedicated resources. We provide a fixed quote before starting so there are no surprises.</p>

<h2>Don't Wait Until It's Too Late</h2>
<p>If you know a deadline is approaching, reach out today. The sooner we start, the smoother the process. Castle Bookkeeping has helped dozens of Calgary businesses meet tight deadlines with accurate, professionally prepared books.</p>
`,
    metaDesc: 'Need your books done fast? Castle Bookkeeping offers rush bookkeeping services in Calgary with 3-7 day turnaround. Loan applications, CRA reviews, tax deadlines.'
  },
  {
    title: 'Bookkeeping for Ranchers and Livestock Operations in Alberta',
    slug: 'bookkeeping-for-ranchers-and-livestock-operations-in-alberta',
    excerpt: 'Ranching in Alberta comes with unique bookkeeping challenges. From livestock inventory to feed costs, here is what you need to track.',
    category: 'Industries',
    date: '2025-12-04',
    body: `
<p>Alberta's ranching industry is a cornerstone of the provincial economy. Whether you run a cow-calf operation near Cochrane, a feedlot east of Calgary, or a mixed farming operation in southern Alberta, your bookkeeping needs are fundamentally different from a typical urban small business.</p>

<h2>Why Ranching Bookkeeping Is Different</h2>
<p>Ranchers deal with financial complexities that most bookkeepers rarely encounter. Livestock inventory changes constantly through births, deaths, purchases, and sales. Feed and input costs fluctuate with commodity markets. Revenue is highly seasonal, with the bulk of cattle sales often concentrated in a few months. And the tax rules for farming operations in Canada have their own set of provisions that general bookkeepers may not understand.</p>

<h2>Key Bookkeeping Challenges for Ranchers</h2>
<ul>
  <li><strong>Livestock inventory tracking</strong>. You need to track herd numbers by class (breeding stock, calves, yearlings, bulls) and account for births, deaths, purchases, and sales throughout the year.</li>
  <li><strong>Cash vs. accrual accounting</strong>. Most farms and ranches in Canada can use cash-basis accounting, which is simpler but requires careful management of year-end purchasing and sales timing for tax planning.</li>
  <li><strong>Feed and input costs</strong>. Hay, grain, mineral supplements, veterinary services, and fuel are major expenses that need proper categorisation for accurate profit analysis and tax filing.</li>
  <li><strong>Equipment depreciation</strong>. Tractors, ATVs, hay equipment, corrals, and other capital assets must be tracked and depreciated using the correct CCA classes.</li>
  <li><strong>Government program tracking</strong>. Programs like AgriStability, AgriInvest, and crop insurance all have financial reporting requirements that depend on accurate books.</li>
</ul>

<h2>Tax Advantages for Alberta Ranchers</h2>
<p>Canadian tax law provides several provisions specifically for farming operations. The lifetime capital gains exemption on qualified farm property can shelter over $1 million in gains. Cash-basis accounting allows strategic timing of income and expenses. Mandatory and optional inventory adjustments provide flexibility in managing taxable income year to year.</p>

<h2>What Castle Bookkeeping Offers Ranchers</h2>
<p>Castle Bookkeeping works with ranchers and livestock operators across Alberta. We understand the unique financial realities of agricultural operations and provide monthly bookkeeping, GST filing, payroll for ranch hands, and year-end preparation tailored to farming tax rules. Our flat-fee pricing means you know exactly what bookkeeping costs, even during busy calving or shipping seasons.</p>

<h2>Get Your Ranch Books in Order</h2>
<p>Whether you are starting a new operation or have years of records that need organising, Castle can help. Book a free consultation to discuss your ranch's bookkeeping needs.</p>
`,
    metaDesc: 'Bookkeeping for Alberta ranchers and livestock operations. Castle Bookkeeping handles livestock inventory, farm tax rules, GST filing, and payroll for ranches across Alberta.'
  },
  {
    title: 'Bookkeeping for Auto Body Shops in Calgary',
    slug: 'bookkeeping-for-auto-body-shops-in-calgary',
    excerpt: 'Auto body shops face unique bookkeeping challenges from insurance claims to parts inventory. Here is how to keep your shop\'s books clean.',
    category: 'Industries',
    date: '2025-09-22',
    body: `
<p>Running an auto body shop in Calgary means juggling insurance claims, parts inventory, labour tracking, and customer payments all at once. The financial side of a collision repair business is more complex than most people realise, and getting your bookkeeping right is essential for profitability and compliance.</p>

<h2>Bookkeeping Challenges for Auto Body Shops</h2>
<ul>
  <li><strong>Insurance claim tracking</strong>. A large portion of your revenue comes through insurance companies, each with different payment timelines, supplement processes, and approval workflows. Tracking what is billed, approved, and paid requires careful accounts receivable management.</li>
  <li><strong>Parts inventory and markup</strong>. You purchase parts from multiple suppliers, often with different markup structures for insurance versus customer-pay jobs. Tracking cost of goods sold accurately is critical for understanding your true margins.</li>
  <li><strong>Labour rate management</strong>. Insurance companies negotiate labour rates that may differ from your posted door rate. Tracking labour revenue by rate type helps you understand profitability across different job categories.</li>
  <li><strong>Sublet work</strong>. When you send work to specialty shops (glass, mechanical, upholstery), those sublet costs and revenues need proper tracking.</li>
  <li><strong>Customer deductibles and co-pays</strong>. Collecting deductibles and tracking partial payments from customers alongside insurance proceeds adds complexity to your receivables.</li>
</ul>

<h2>Common Financial Mistakes Auto Body Shops Make</h2>
<p>The most frequent mistake we see is failing to reconcile insurance receivables regularly. Insurance payments often arrive weeks after billing, sometimes with supplements or deductions that don't match the original invoice. Without monthly reconciliation, you can lose track of thousands in unpaid claims.</p>
<p>Another common issue is not separating material costs by job. When paint and supply costs are lumped together rather than allocated to specific repair orders, you lose visibility into per-job profitability.</p>

<h2>GST Considerations for Auto Body Shops</h2>
<p>Auto body shops must charge GST on all labour and parts, including insurance-paid work. The insurance company pays the GST as part of the claim, but you are responsible for collecting and remitting it correctly. Errors in GST calculation on insurance claims can lead to significant discrepancies at filing time.</p>

<h2>How Castle Bookkeeping Helps</h2>
<p>Castle Bookkeeping works with auto body shops across Calgary. We handle monthly bookkeeping, insurance receivable reconciliation, parts inventory tracking, payroll for your technicians and front office staff, and GST filing. Our flat-fee plans give you predictable costs so you can focus on running your shop.</p>

<h2>Get Started</h2>
<p>Book a free consultation with Castle Bookkeeping to learn how we can streamline your auto body shop's financial management.</p>
`,
    metaDesc: 'Bookkeeping for Calgary auto body shops. Castle Bookkeeping handles insurance claim tracking, parts inventory, payroll, and GST filing for collision repair businesses.'
  },
  {
    title: 'Alberta Farming Tax Rules: What Ranchers Need to Know',
    slug: 'alberta-farming-tax-rules-what-ranchers-need-to-know',
    excerpt: 'Farming tax rules in Alberta are different from standard business taxes. Here are the key provisions every rancher should understand.',
    category: 'Industries',
    date: '2025-08-10',
    body: `
<p>If you operate a farm or ranch in Alberta, your tax situation is governed by a unique set of rules within the Canadian Income Tax Act. Understanding these provisions can save you thousands of dollars annually and help you plan for the long-term financial health of your operation.</p>

<h2>Cash-Basis Accounting for Farms</h2>
<p>Unlike most businesses, which must use accrual accounting once they reach a certain size, most Canadian farms can use cash-basis accounting regardless of revenue. This means you report income when cash is received and expenses when cash is paid, giving you significant flexibility to manage taxable income year to year. For example, delaying a cattle sale until January or prepaying feed in December can shift income between tax years.</p>

<h2>Mandatory and Optional Inventory Adjustments</h2>
<p>Even under cash-basis accounting, CRA requires a mandatory inventory adjustment if your purchased inventory (feed, livestock bought for resale, etc.) exceeds your accounts payable at year-end. There is also an optional inventory adjustment that allows you to add a portion of inventory value to income, which can be useful for smoothing income across years or maximising RRSP contribution room.</p>

<h2>Lifetime Capital Gains Exemption</h2>
<p>One of the most valuable tax provisions for Alberta ranchers is the lifetime capital gains exemption (LCGE) on qualified farm property. As of 2025, this exemption can shelter over $1.25 million in capital gains on the sale of qualifying farm land, buildings, and quota. To qualify, the property must have been used in an active farming business, and there are specific use and ownership period requirements.</p>

<h2>Intergenerational Farm Transfers</h2>
<p>Recent changes to the Income Tax Act have made it easier and more tax-efficient to transfer a farm to the next generation. Rollover provisions allow you to transfer farm property to your children or grandchildren at cost, deferring any capital gains until they eventually sell. Combined with the LCGE, this can make succession planning very tax-efficient.</p>

<h2>AgriStability and AgriInvest</h2>
<p>Alberta ranchers can participate in federal-provincial risk management programs. AgriStability provides support when your farming margin drops significantly below your historical average. AgriInvest is a savings program where your deposits are matched by government contributions. Both programs require accurate financial records and timely filing.</p>

<h2>Key Deductions for Ranchers</h2>
<ul>
  <li><strong>Feed, seed, and fertiliser</strong>. Fully deductible in the year purchased under cash-basis accounting.</li>
  <li><strong>Veterinary and breeding fees</strong>. All vet bills, AI services, and breeding expenses are deductible.</li>
  <li><strong>Equipment and vehicle costs</strong>. Tractors, trucks, ATVs, and farm equipment are depreciated using CCA. The Accelerated Investment Incentive provides enhanced first-year deductions.</li>
  <li><strong>Fencing, corrals, and buildings</strong>. Capital improvements are depreciated; repairs and maintenance are fully deductible in the year incurred.</li>
  <li><strong>Property taxes on farm land</strong>. Fully deductible as a farming expense.</li>
</ul>

<h2>Get Expert Help</h2>
<p>Farming tax rules are complex and the stakes are high. Castle Bookkeeping works with Alberta ranchers to maintain accurate books, maximise deductions, and ensure compliance with CRA requirements. Book a free consultation to discuss your operation.</p>
`,
    metaDesc: 'Alberta farming tax rules explained for ranchers. Cash-basis accounting, capital gains exemption, intergenerational transfers, and key deductions. Castle Bookkeeping Calgary.'
  },
  {
    title: 'GST on Vehicle Trade Ins: What Calgary Auto Shops Get Wrong',
    slug: 'gst-on-vehicle-trade-ins-what-calgary-auto-shops-get-wrong',
    excerpt: 'GST on trade-in vehicles is one of the most misunderstood tax areas for auto shops. Here is how to handle it correctly.',
    category: 'Industries',
    date: '2025-07-21',
    body: `
<p>If your Calgary auto shop accepts vehicle trade-ins as part of a sale or repair transaction, the GST treatment can be surprisingly tricky. Getting it wrong means either overcharging your customers (and dealing with complaints) or undercharging GST and owing CRA the difference out of your own pocket.</p>

<h2>The Basic Rule</h2>
<p>When a customer trades in a vehicle as partial payment for a purchase, GST is calculated on the difference between the sale price of the new vehicle and the trade-in value. This is often called the "net amount" method. For example, if you sell a vehicle for $30,000 and accept a trade-in valued at $10,000, GST is charged on $20,000 (the net amount), resulting in $1,000 in GST rather than $1,500.</p>

<h2>Where Shops Go Wrong</h2>
<p>The most common mistake is applying this trade-in credit to the wrong type of transaction. The net-amount method applies when both the trade-in and the sale are taxable supplies. If the trade-in vehicle is from an individual (not a GST registrant), and you are reselling it, different rules may apply to your subsequent sale of that trade-in vehicle.</p>
<p>Another frequent error is applying the trade-in credit when the customer is trading in a vehicle that was used exclusively for personal use. In this case, the customer's trade-in is generally an exempt supply, and the GST calculation on the new vehicle sale may need to be handled differently depending on the specific circumstances.</p>

<h2>Trade-Ins from GST Registrants vs. Individuals</h2>
<p>When a GST-registered business trades in a vehicle, they charge you GST on the trade-in value, and you charge them GST on the sale price. The net effect is the same as the net-amount method, but the paperwork differs. You need to issue and receive proper invoices showing GST on both sides of the transaction.</p>
<p>When an individual (non-registrant) trades in a vehicle, they do not charge GST. You calculate GST on the net sale amount. However, when you later sell that trade-in vehicle, you must charge GST on the full sale price because you did not pay GST when you acquired it.</p>

<h2>Documentation Requirements</h2>
<p>CRA requires clear documentation of trade-in transactions, including the agreed trade-in value, the sale price of the new vehicle, the calculated GST, and whether the trade-in party is a GST registrant. Keep copies of all trade-in appraisals, purchase agreements, and invoices.</p>

<h2>Impact on Your Books</h2>
<p>Trade-in transactions need to be recorded correctly in your accounting system. The trade-in vehicle should be recorded as inventory at its appraised value, the sale should reflect the gross amounts, and GST should be calculated and recorded on the net amount. Many auto shop owners record only the net cash received, which creates GST discrepancies and inventory tracking problems.</p>

<h2>Avoid Costly Mistakes</h2>
<p>GST errors on trade-in transactions can accumulate quickly, especially for shops handling multiple trade-ins per month. A CRA audit that uncovers systematic GST errors can result in reassessments going back several years, plus interest and penalties.</p>

<p>Castle Bookkeeping works with Calgary auto shops and understands the GST complexities of vehicle transactions. We ensure your trade-in deals are recorded correctly, your GST filings are accurate, and your books are audit-ready. Book a free consultation to get your shop's bookkeeping on track.</p>
`,
    metaDesc: 'GST rules on vehicle trade-ins explained for Calgary auto shops. Common mistakes, documentation requirements, and how to record trade-ins correctly. Castle Bookkeeping.'
  }
];

// ─── BUILD ALL POSTS ───────────────────────────────────────────
const allPosts = [];

// Neighbourhood posts
neighbourhoods.forEach((n, i) => {
  allPosts.push({
    title: `Bookkeeping for Small Businesses in ${n}`,
    slug: slug(`bookkeeping-for-small-businesses-in-${n}`),
    excerpt: `Professional bookkeeping services for small businesses in ${n}. Flat-fee monthly plans, GST filing, and payroll.`,
    category: 'Neighbourhoods',
    date: randomDate(1, 3),
    body: neighbourhoodBody(n),
    metaDesc: `Looking for a bookkeeper in ${n}? Castle Bookkeeping offers flat-fee monthly bookkeeping, GST filing, payroll, and tax prep for ${n} small businesses. Free consultation.`
  });
});

// Industry posts
industries.forEach((ind, i) => {
  allPosts.push({
    title: `Bookkeeping for ${ind} in Calgary`,
    slug: slug(`bookkeeping-for-${ind}-in-calgary`),
    excerpt: `Specialised bookkeeping services for Calgary ${ind.toLowerCase()}. Flat-fee plans tailored to your industry.`,
    category: 'Industries',
    date: randomDate(1, 3),
    body: industryBody(ind),
    metaDesc: `Castle Bookkeeping provides flat-fee bookkeeping for Calgary ${ind.toLowerCase()}. Monthly bookkeeping, GST filing, payroll, and tax preparation. Free consultation.`
  });
});

// Problem posts
problemPosts.forEach(p => {
  allPosts.push({
    title: p.title,
    slug: p.slug,
    excerpt: p.excerpt,
    category: 'Guides',
    date: randomDate(1, 3),
    body: p.body,
    metaDesc: `${p.excerpt} Expert advice from Castle Bookkeeping Calgary.`
  });
});

// Seasonal posts
seasonalPosts.forEach(p => {
  allPosts.push({
    title: p.title,
    slug: p.slug,
    excerpt: p.excerpt,
    category: 'Seasonal',
    date: randomDate(1, 3),
    body: p.body,
    metaDesc: `${p.excerpt} Expert advice from Castle Bookkeeping Calgary.`
  });
});

// Additional posts
additionalPosts.forEach(p => {
  allPosts.push(p);
});

// Sort by date descending
allPosts.sort((a, b) => b.date.localeCompare(a.date));

// ─── HTML TEMPLATE ─────────────────────────────────────────────
function postHTML(post, photoUrl) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${post.title} | Castle Bookkeeping Calgary</title>
<meta name="description" content="${post.metaDesc}">
<meta name="robots" content="index, follow">
<link rel="canonical" href="${SITE_URL}/blog/${post.slug}.html">

<meta property="og:title" content="${post.title} | Castle Bookkeeping">
<meta property="og:description" content="${post.metaDesc}">
<meta property="og:type" content="article">
<meta property="og:url" content="${SITE_URL}/blog/${post.slug}.html">
<meta property="og:image" content="${photoUrl}">
<meta property="og:locale" content="en_CA">
<meta property="og:site_name" content="Castle Bookkeeping">

<link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><rect width='100' height='100' rx='18' fill='%23f9f7fa' stroke='%23ddd8e0' stroke-width='4'/><text x='50' y='68' text-anchor='middle' font-family='serif' font-size='52' font-weight='bold' fill='%232d2a33'>C</text></svg>">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=DM+Serif+Display&family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">

<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "${post.title}",
  "description": "${post.metaDesc}",
  "image": "${photoUrl}",
  "datePublished": "${post.date}",
  "dateModified": "${post.date}",
  "author": {
    "@type": "Organization",
    "name": "Castle Bookkeeping",
    "url": "${SITE_URL}"
  },
  "publisher": {
    "@type": "Organization",
    "name": "Castle Bookkeeping",
    "url": "${SITE_URL}"
  },
  "mainEntityOfPage": {
    "@type": "WebPage",
    "@id": "${SITE_URL}/blog/${post.slug}.html"
  }
}
</script>

<style>
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  :root {
    --dark: #2d2a33;
    --peach: #e8b5a1;
    --peach-light: #f2c4b3;
    --mauve-bg: #bfb3c4;
    --cream: #f9f7fa;
    --g100: #f0edf2;
    --g200: #ddd8e0;
    --g500: #8a8490;
    --g600: #6b6670;
    --g700: #4a4650;
    --white: #ffffff;
  }
  body {
    font-family: 'Inter', sans-serif;
    color: var(--dark);
    background: var(--white);
    line-height: 1.7;
    font-size: 17px;
  }
  h1, h2, h3, h4 { font-family: 'DM Serif Display', serif; font-weight: 400; }
  a { color: inherit; }

  /* NAV */
  .nav {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 1000;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 16px 40px;
    background: rgba(255,255,255,0.92);
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
    border-bottom: 1px solid rgba(221,216,224,0.5);
  }
  .nav-logo {
    font-family: 'DM Serif Display', serif;
    font-size: 22px;
    color: var(--dark);
    text-decoration: none;
  }
  .nav-links {
    display: flex;
    align-items: center;
    gap: 28px;
  }
  .nav-links a {
    color: var(--g600);
    text-decoration: none;
    font-size: 14px;
    font-weight: 500;
    transition: color 0.2s;
  }
  .nav-links a:hover { color: var(--dark); }
  .nav-phone {
    color: var(--dark);
    font-size: 13px;
    text-decoration: none;
    margin-left: 8px;
  }
  .btn-peach {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    padding: 10px 24px;
    border-radius: 50px;
    background: var(--peach);
    color: var(--dark);
    font-weight: 700;
    font-size: 13px;
    text-decoration: none;
    transition: all 0.3s;
    margin-left: 8px;
  }
  .btn-peach:hover { background: var(--peach-light); transform: translateY(-1px); }

  /* HAMBURGER */
  .nav-toggle { display: none; background: none; border: none; cursor: pointer; padding: 4px; }
  .nav-toggle span { display: block; width: 22px; height: 2px; background: var(--dark); margin: 5px 0; transition: 0.3s; }

  /* HERO */
  .hero {
    position: relative;
    width: 100%;
    min-height: 420px;
    display: flex;
    align-items: flex-end;
    justify-content: center;
    overflow: hidden;
    margin-top: 60px;
  }
  .hero-img {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  .hero-overlay {
    position: absolute;
    inset: 0;
    background: linear-gradient(to top, rgba(45,42,51,0.88) 0%, rgba(45,42,51,0.4) 50%, rgba(45,42,51,0.15) 100%);
  }
  .hero-content {
    position: relative;
    z-index: 2;
    text-align: center;
    padding: 40px 24px 48px;
    max-width: 760px;
  }
  .hero-content .category-pill {
    display: inline-block;
    padding: 5px 16px;
    border-radius: 50px;
    background: rgba(232,181,161,0.2);
    color: var(--peach);
    font-size: 12px;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    margin-bottom: 16px;
    border: 1px solid rgba(232,181,161,0.25);
  }
  .hero-content h1 {
    font-size: clamp(28px, 5vw, 44px);
    line-height: 1.2;
    color: #fff;
    margin-bottom: 12px;
  }
  .hero-content .date {
    color: rgba(255,255,255,0.6);
    font-size: 14px;
  }

  /* ARTICLE */
  .article-body {
    max-width: 760px;
    margin: 0 auto;
    padding: 48px 24px 32px;
  }
  .article-body p {
    margin-bottom: 20px;
    color: var(--g700);
    font-size: 17px;
    line-height: 1.8;
  }
  .article-body h2 {
    font-size: 26px;
    margin: 40px 0 16px;
    color: var(--dark);
  }
  .article-body h3 {
    font-size: 21px;
    margin: 32px 0 12px;
    color: var(--dark);
  }
  .article-body ul, .article-body ol {
    margin: 8px 0 20px 24px;
    color: var(--g700);
  }
  .article-body li {
    margin-bottom: 8px;
    line-height: 1.7;
  }
  .article-body strong {
    color: var(--dark);
    font-weight: 600;
  }
  .article-body a {
    color: var(--peach);
    text-decoration: underline;
    text-underline-offset: 2px;
  }

  /* FOOTER */
  .site-footer {
    background: var(--dark);
    color: rgba(255,255,255,0.55);
    padding: 64px 40px 32px;
    margin-top: 64px;
  }
  .footer-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 40px;
    max-width: 1100px;
    margin: 0 auto 48px;
  }
  .footer-col h4 {
    font-family: 'DM Serif Display', serif;
    font-size: 16px;
    color: #fff;
    margin-bottom: 16px;
    font-weight: 400;
  }
  .footer-col a {
    display: block;
    color: rgba(255,255,255,0.55);
    text-decoration: none;
    font-size: 13px;
    padding: 3px 0;
    transition: color 0.2s;
  }
  .footer-col a:hover { color: var(--peach); }
  .footer-bottom {
    text-align: center;
    padding-top: 32px;
    border-top: 1px solid rgba(255,255,255,0.08);
    font-size: 13px;
  }
  .footer-bottom a { color: var(--peach); text-decoration: none; }

  /* RESPONSIVE */
  @media (max-width: 768px) {
    .nav { padding: 14px 20px; }
    .nav-links { display: none; flex-direction: column; position: absolute; top: 100%; left: 0; right: 0; background: rgba(255,255,255,0.97); backdrop-filter: blur(20px); -webkit-backdrop-filter: blur(20px); padding: 20px; gap: 16px; border-bottom: 1px solid rgba(221,216,224,0.5); }
    .nav-links.open { display: flex; }
    .nav-toggle { display: block; }
    .btn-peach { margin-left: 0; }
    .nav-phone { margin-left: 0; }
    .hero { min-height: 340px; }
    .hero-content { padding: 32px 20px 36px; }
    .article-body { padding: 32px 20px 24px; }
    .footer-grid { grid-template-columns: repeat(2, 1fr); gap: 32px; }
  }
  @media (max-width: 480px) {
    .footer-grid { grid-template-columns: 1fr; gap: 28px; }
    .hero { min-height: 300px; }
  }
</style>
</head>
<body>

<nav class="nav">
  <a href="../index.html" class="nav-logo">Castle</a>
  <button class="nav-toggle" onclick="document.querySelector('.nav-links').classList.toggle('open')" aria-label="Menu">
    <span></span><span></span><span></span>
  </button>
  <div class="nav-links">
    <a href="../index.html#services">Services</a>
    <a href="../index.html#pricing">Pricing</a>
    <a href="../index.html#reviews">Reviews</a>
    <a href="../reports.html">Reports</a>
    <a href="../team.html">Team</a>
    <a href="index.html">Blog</a>
    <a href="tel:+15878720602" class="nav-phone">${PHONE}</a>
    <a href="../index.html#contact" class="btn-peach">Book a Call</a>
  </div>
</nav>

<header class="hero">
  <img class="hero-img" src="${photoUrl}" alt="" loading="eager">
  <div class="hero-overlay"></div>
  <div class="hero-content">
    <span class="category-pill">${post.category}</span>
    <h1>${post.title}</h1>
    <p class="date">${formatDate(post.date)}</p>
  </div>
</header>

<article class="article-body">
${post.body}

<div style="text-align:center;padding:48px 24px;background:var(--mauve-bg);border-radius:20px;margin-top:48px">
  <h3 style="font-family:'DM Serif Display',serif;font-size:28px;margin-bottom:12px">Ready to get your books in order?</h3>
  <p style="font-size:15px;color:var(--g700);margin-bottom:24px;max-width:400px;margin-left:auto;margin-right:auto">Book a free 15 minute consultation. No obligation.</p>
  <a href="../index.html#contact" style="display:inline-flex;align-items:center;gap:8px;padding:14px 32px;border-radius:50px;background:var(--peach);color:var(--dark);font-weight:700;font-size:14px;text-decoration:none;transition:all .3s">Book a Free Call</a>
</div>
</article>

<footer class="site-footer">
  <div class="footer-grid">
    <div class="footer-col">
      <h4>Services</h4>
      <a href="../index.html#services">Monthly Bookkeeping</a>
      <a href="../index.html#services">Tax Preparation</a>
      <a href="../index.html#services">Catch-Up Bookkeeping</a>
      <a href="../index.html#services">E-Commerce</a>
      <a href="../index.html#services">GST &amp; Payroll</a>
      <a href="../index.html#services">Rush Bookkeeping</a>
    </div>
    <div class="footer-col">
      <h4>Areas</h4>
      <a href="#">Calgary</a>
      <a href="#">Airdrie</a>
      <a href="#">Cochrane</a>
      <a href="#">Okotoks</a>
      <a href="#">Chestermere</a>
      <a href="#">Edmonton</a>
      <a href="#">Red Deer</a>
      <a href="#">All of Alberta</a>
    </div>
    <div class="footer-col">
      <h4>Company</h4>
      <a href="../team.html">Our Team</a>
      <a href="index.html">Blog</a>
      <a href="../reports.html">Sample Reports</a>
      <a href="../index.html#faq">FAQ</a>
      <a href="../privacy.html">Privacy &amp; Terms</a>
      <a href="../index.html#contact">Contact</a>
    </div>
    <div class="footer-col">
      <h4>Social</h4>
      <a href="https://facebook.com/bookwithcastle" target="_blank" rel="noopener">Facebook</a>
      <a href="https://linkedin.com/in/joeypineo/" target="_blank" rel="noopener">LinkedIn</a>
    </div>
  </div>
  <div class="footer-bottom">
    <p>&copy; 2026 Castle Bookkeeping &middot; Calgary, AB &middot; <a href="tel:+15878720602">${PHONE}</a></p>
  </div>
</footer>

</body>
</html>`;
}

// ─── INDEX PAGE ────────────────────────────────────────────────
function indexHTML(posts) {
  const cards = posts.map(p => `
      <a href="${p.slug}.html" class="card">
        <span class="card-category">${p.category}</span>
        <h3>${p.title}</h3>
        <p class="card-excerpt">${p.excerpt}</p>
        <p class="card-date">${formatDate(p.date)}</p>
      </a>`).join('\n');

  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Blog | Castle Bookkeeping Calgary — Bookkeeping Tips & Guides</title>
<meta name="description" content="Expert bookkeeping tips, tax guides, and financial advice for Calgary small businesses. Learn about GST filing, payroll, tax deductions, and more from Castle Bookkeeping.">
<meta name="robots" content="index, follow">
<link rel="canonical" href="${SITE_URL}/blog/">

<meta property="og:title" content="Blog | Castle Bookkeeping Calgary">
<meta property="og:description" content="Expert bookkeeping tips, tax guides, and financial advice for Calgary small businesses.">
<meta property="og:type" content="website">
<meta property="og:url" content="${SITE_URL}/blog/">
<meta property="og:locale" content="en_CA">
<meta property="og:site_name" content="Castle Bookkeeping">

<link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><rect width='100' height='100' rx='18' fill='%23f9f7fa' stroke='%23ddd8e0' stroke-width='4'/><text x='50' y='68' text-anchor='middle' font-family='serif' font-size='52' font-weight='bold' fill='%232d2a33'>C</text></svg>">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700;800&family=Fraunces:wght@700;800;900&display=swap" rel="stylesheet">

<style>
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  :root {
    --dark: #2d2a33;
    --peach: #e8b5a1;
    --mauve-bg: #bfb3c4;
    --white: #fff;
    --light-bg: #f9f7f4;
  }
  body {
    font-family: 'DM Sans', sans-serif;
    color: var(--dark);
    background: var(--white);
    line-height: 1.6;
    font-size: 17px;
  }
  h1, h2, h3 { font-family: 'Fraunces', serif; font-weight: 800; }

  nav {
    background: var(--dark);
    padding: 1rem 2rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  nav .logo {
    display: flex; align-items: center; gap: 0.6rem;
    text-decoration: none; color: var(--white);
    font-family: 'Fraunces', serif; font-weight: 800; font-size: 1.3rem;
  }
  nav .logo-icon {
    width: 38px; height: 38px;
    background: var(--peach); border-radius: 8px;
    display: flex; align-items: center; justify-content: center;
    font-family: 'Fraunces', serif; font-weight: 900; font-size: 1.2rem;
    color: var(--dark);
  }
  nav .nav-links { display: flex; gap: 1.5rem; }
  nav .nav-links a {
    color: var(--white); text-decoration: none; font-size: 0.95rem;
    font-weight: 500; opacity: 0.85; transition: opacity 0.2s;
  }
  nav .nav-links a:hover { opacity: 1; }

  .page-header {
    background: var(--light-bg);
    padding: 3rem 2rem 2rem;
    text-align: center;
  }
  .page-header h1 {
    font-size: clamp(1.8rem, 4vw, 2.6rem);
    margin-bottom: 0.5rem;
  }
  .page-header p { color: #666; max-width: 600px; margin: 0 auto; }

  /* FILTERS */
  .filters {
    display: flex; justify-content: center; gap: 0.5rem;
    flex-wrap: wrap; padding: 1.5rem 1rem 0;
  }
  .filters button {
    font-family: 'DM Sans', sans-serif;
    padding: 0.4rem 1rem; border-radius: 20px; border: 2px solid var(--mauve-bg);
    background: var(--white); color: var(--dark); cursor: pointer;
    font-size: 0.85rem; font-weight: 600; transition: all 0.2s;
  }
  .filters button:hover, .filters button.active {
    background: var(--dark); color: var(--white); border-color: var(--dark);
  }

  /* CARD GRID */
  .grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
    gap: 1.5rem;
    padding: 2rem;
    max-width: 1200px;
    margin: 0 auto;
  }
  .card {
    display: flex; flex-direction: column;
    background: var(--light-bg);
    border-radius: 12px;
    padding: 1.5rem;
    text-decoration: none;
    color: var(--dark);
    transition: transform 0.2s, box-shadow 0.2s;
  }
  .card:hover {
    transform: translateY(-3px);
    box-shadow: 0 8px 24px rgba(0,0,0,0.08);
  }
  .card-category {
    display: inline-block;
    align-self: flex-start;
    background: var(--mauve-bg);
    color: var(--dark);
    padding: 0.2rem 0.6rem;
    border-radius: 12px;
    font-size: 0.72rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    margin-bottom: 0.75rem;
  }
  .card h3 {
    font-size: 1.1rem;
    line-height: 1.3;
    margin-bottom: 0.5rem;
  }
  .card-excerpt {
    flex: 1;
    font-size: 0.9rem;
    color: #555;
    margin-bottom: 0.75rem;
  }
  .card-date {
    font-size: 0.8rem;
    color: #999;
  }

  footer {
    background: var(--dark);
    color: rgba(255,255,255,0.6);
    text-align: center;
    padding: 2rem 1rem;
    font-size: 0.85rem;
    margin-top: 2rem;
  }
  footer a { color: var(--peach); text-decoration: none; }
  footer a:hover { text-decoration: underline; }

  @media (max-width: 600px) {
    nav { padding: 0.75rem 1rem; }
    .grid { padding: 1rem; gap: 1rem; grid-template-columns: 1fr; }
  }
</style>
</head>
<body>

<nav>
  <a href="${SITE_URL}/" class="logo">
    <span class="logo-icon">C</span> Castle Bookkeeping
  </a>
  <div class="nav-links">
    <a href="${SITE_URL}/">Home</a>
    <a href="${SITE_URL}/blog/">Blog</a>
    <a href="${SITE_URL}/#contact">Contact</a>
  </div>
</nav>

<header class="page-header">
  <h1>Bookkeeping Tips &amp; Guides</h1>
  <p>Expert advice on bookkeeping, tax, payroll, and financial management for Calgary small businesses.</p>
</header>

<div class="filters">
  <button class="active" data-filter="all">All</button>
  <button data-filter="Neighbourhoods">Neighbourhoods</button>
  <button data-filter="Industries">Industries</button>
  <button data-filter="Guides">Guides</button>
  <button data-filter="Seasonal">Seasonal</button>
</div>

<div class="grid" id="grid">
${cards}
</div>

<footer>
  <p>&copy; 2026 Castle Bookkeeping &middot; Calgary, AB &middot; <a href="tel:+15878720602">${PHONE}</a> &middot; <a href="${SITE_URL}/">bookwithcastle.com</a></p>
</footer>

<script>
  document.querySelectorAll('.filters button').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.filters button').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const filter = btn.dataset.filter;
      document.querySelectorAll('.card').forEach(card => {
        const cat = card.querySelector('.card-category').textContent.trim();
        card.style.display = (filter === 'all' || cat === filter.toUpperCase()) ? '' : 'none';
      });
    });
  });
</script>

</body>
</html>`;
}

// ─── GENERATE FILES ────────────────────────────────────────────
console.log(`Generating ${allPosts.length} blog posts...`);

allPosts.forEach((post, i) => {
  const filePath = path.join(BLOG_DIR, `${post.slug}.html`);
  const photoUrl = getPhoto(post.category, post.title);
  fs.writeFileSync(filePath, postHTML(post, photoUrl), 'utf-8');
});

// Generate index
const indexPath = path.join(BLOG_DIR, 'index.html');
fs.writeFileSync(indexPath, indexHTML(allPosts), 'utf-8');

console.log(`Done! Generated ${allPosts.length} blog posts + index.html in ${BLOG_DIR}`);
console.log(`Categories: Neighbourhoods (${allPosts.filter(p=>p.category==='Neighbourhoods').length}), Industries (${allPosts.filter(p=>p.category==='Industries').length}), Guides (${allPosts.filter(p=>p.category==='Guides').length}), Seasonal (${allPosts.filter(p=>p.category==='Seasonal').length})`);
