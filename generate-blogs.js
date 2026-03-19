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
  else if (t.includes('construct') || t.includes('contractor') || t.includes('plumb') || t.includes('electric') || t.includes('hvac') || t.includes('landscap') || t.includes('roof') || t.includes('fenc') || t.includes('demol') || t.includes('floor') || t.includes('deck') || t.includes('paint') || t.includes('pressure wash') || t.includes('window clean') || t.includes('snow remov')) key = 'construction';
  else if (t.includes('auto') || t.includes('repair') || t.includes('tire') || t.includes('vehicle') || t.includes('tow') || t.includes('mechanic')) key = 'automotive';
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
  'Auburn Bay': { desc: 'a lake community in southeast Calgary with a resort-style lifestyle', biz: 'wellness clinics, real estate agents, cleaning services, and food entrepreneurs', charm: 'Auburn House community centre, private lake access, and rapid neighbourhood growth' },
  'Bridlewood': { desc: 'a well-established family community in Calgary\'s deep south', biz: 'home-based businesses, tutoring services, cleaning companies, and trades contractors', charm: 'proximity to Spruce Meadows, quiet residential streets, and excellent schools' },
  'Cougar Ridge': { desc: 'an upscale west Calgary community with mountain views', biz: 'consultants, home-based professionals, real estate agents, and wellness practitioners', charm: 'proximity to Canada Olympic Park, newer homes, and easy access to the Trans-Canada Highway' },
  'Chaparral': { desc: 'a lake community in southeast Calgary with a family-friendly atmosphere', biz: 'daycares, landscapers, cleaning services, and home renovation contractors', charm: 'Chaparral Lake, valley pathways, and a close-knit homeowners association community' },
  'Dalhousie': { desc: 'an established northwest Calgary neighbourhood with a strong sense of community', biz: 'dental offices, hair salons, restaurants, and trades professionals', charm: 'the Dalhousie LRT station, Nose Hill Park proximity, and a mix of long-time and new residents' },
  'Evergreen': { desc: 'a family-oriented southwest community at the edge of the city', biz: 'daycare operators, pet services, landscaping companies, and home-based sellers', charm: 'Fish Creek Park access, the Evergreen community centre, and newer residential development' },
  'Harvest Hills': { desc: 'a well-established neighbourhood in Calgary\'s far north', biz: 'cleaning companies, tutoring centres, ethnic restaurants, and accounting practices', charm: 'Country Hills golf course proximity, diverse population, and established commercial areas' },
  'Riverbend': { desc: 'a mature southeast community nestled along the Bow River', biz: 'medical clinics, insurance brokers, financial advisors, and home-based businesses', charm: 'river access, Carburn Park, and mature tree-lined streets' },
  'Rocky Ridge': { desc: 'a newer northwest community with mountain views and modern amenities', biz: 'home-based tech workers, trades contractors, fitness trainers, and pet groomers', charm: 'Royal Oak shopping proximity, mountain vistas, and family-friendly parks' },
  'Springbank Hill': { desc: 'an affluent west Calgary community with expansive properties', biz: 'consultants, real estate agents, wellness clinics, and professional services', charm: 'mountain views, Aspen Landing shopping centre, and proximity to the western city limits' },
  'New Brighton': { desc: 'a growing southeast lake community with a young, active population', biz: 'home-based businesses, daycares, landscapers, and mobile service providers', charm: 'New Brighton Lake, community events, and a rapidly growing commercial area' },
  'Arbour Lake': { desc: 'a popular northwest lake community with excellent amenities', biz: 'home-based professionals, tutoring services, cleaning companies, and pet services', charm: 'Arbour Lake itself, the community clubhouse, and Crowfoot shopping proximity' },
  'Somerset': { desc: 'a family-friendly community in Calgary\'s deep south', biz: 'daycares, tutoring centres, home renovation contractors, and cleaning services', charm: 'the Somerset-Bridlewood LRT station, Shawnessy shopping access, and quiet residential streets' },
  'Midnapore': { desc: 'a mature south Calgary community with established amenities', biz: 'dental offices, restaurants, hair salons, and trades contractors', charm: 'the Midnapore Lake, Fish Creek Park, and a strong community association' },
  'Strathcona Park': { desc: 'a quiet, established southwest neighbourhood near the Glenmore Reservoir', biz: 'home-based professionals, consultants, wellness practitioners, and financial advisors', charm: 'Glenmore Reservoir pathways, mature trees, and a peaceful residential atmosphere' },
  'Parkland': { desc: 'a southeast Calgary community with convenient access to major routes', biz: 'trades contractors, cleaning companies, food businesses, and home-based entrepreneurs', charm: 'proximity to Deerfoot Trail, community green spaces, and family-oriented living' },
  'Sundance': { desc: 'a lake community in south Calgary with strong family values', biz: 'daycares, landscapers, pet services, and home-based businesses', charm: 'Sundance Lake, Fish Creek Park access, and a well-maintained community feel' },
  'Edgemont': { desc: 'a large northwest community known for its excellent schools', biz: 'tutoring centres, dental offices, restaurants, and home-based professionals', charm: 'Nose Hill Park proximity, top-rated schools, and established commercial areas along Shaganappi Trail' },
  'Hamptons': { desc: 'an exclusive northwest community built around a golf course', biz: 'consultants, financial advisors, real estate agents, and wellness professionals', charm: 'the Hamptons Golf Club, upscale homes, and a strong sense of community' },
  'Scenic Acres': { desc: 'a well-established northwest community surrounded by natural beauty', biz: 'home-based businesses, trades contractors, tutoring services, and pet groomers', charm: 'proximity to Bowmont Park, scenic walking paths, and a friendly neighbourhood vibe' },
  'Woodlands': { desc: 'a southwest community in Calgary offering family-friendly living', biz: 'cleaning companies, daycares, home renovation contractors, and mobile services', charm: 'green spaces, community playgrounds, and easy access to Woodbine shopping' },
  'Thorncliffe': { desc: 'a centrally located north Calgary neighbourhood with great connectivity', biz: 'auto repair shops, restaurants, convenience stores, and trades companies', charm: 'Deerfoot Trail access, proximity to downtown, and a diverse resident population' },
  'Deer Ridge': { desc: 'a mature south Calgary community with established infrastructure', biz: 'dental offices, hair salons, restaurants, and insurance brokers', charm: 'Deer Ridge shopping centre, Fish Creek Park, and well-maintained residential streets' },
  'Braeside': { desc: 'a quiet, mature neighbourhood in southwest Calgary', biz: 'home-based professionals, trades contractors, tutoring services, and cleaning companies', charm: 'proximity to Braeside shopping, Southland Leisure Centre, and tree-lined streets' },
  'Haysboro': { desc: 'a central south Calgary community experiencing exciting redevelopment', biz: 'cafes, restaurants, home-based businesses, and professional services', charm: 'the Heritage LRT station, Chinook Centre proximity, and an evolving mix of old and new' },
  'Cedarbrae': { desc: 'a family-friendly community in south Calgary with good amenities', biz: 'daycares, tutoring centres, cleaning services, and trades contractors', charm: 'community gardens, local shopping, and proximity to both Fish Creek Park and the Southcentre Mall' },
  'Beddington Heights': { desc: 'an established north Calgary community with convenient transit access', biz: 'restaurants, auto services, retail stores, and home-based businesses', charm: 'Beddington Trail shopping, LRT access, and a diverse neighbourhood population' },
  'Oakridge': { desc: 'a mature south Calgary neighbourhood with central location', biz: 'medical clinics, restaurants, retail shops, and home-based professionals', charm: 'Southcentre Mall proximity, well-established parks, and easy access to major routes' },
  'Altadore': { desc: 'one of Calgary\'s most sought-after inner-city neighbourhoods', biz: 'cafes, boutiques, yoga studios, and professional services', charm: 'River Park and Sandy Beach access, trendy Marda Loop shops, and stunning infill homes' },
  'Renfrew': { desc: 'a revitalizing inner-city neighbourhood east of Centre Street', biz: 'breweries, creative agencies, trades companies, and food businesses', charm: 'proximity to Bridgeland and the Edmonton Trail corridor, plus a growing arts scene' },
  'Capitol Hill': { desc: 'a vibrant inner-city neighbourhood in northwest Calgary', biz: 'cafes, restaurants, creative studios, and professional services', charm: 'Confederation Park, SAIT proximity, and a mix of character homes and modern infills' }
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
  'E-Commerce Sellers': { pain: 'multi-platform sales tracking, shipping costs, inventory valuation, and cross-border transactions', tip: 'Reconcile each sales channel (Shopify, Amazon, Etsy) monthly so marketplace fees and refunds are accurately captured.', deduction: 'shipping supplies, platform fees, product inventory, and warehouse or storage costs' },
  'Moving Companies': { pain: 'seasonal demand fluctuations, vehicle maintenance costs, worker injury liability, and job-based pricing complexity', tip: 'Track revenue and costs per job to identify which types of moves (local, long-distance, commercial) are most profitable.', deduction: 'vehicle fuel and maintenance, packing supplies, insurance premiums, and equipment depreciation' },
  'Event Planners': { pain: 'project-based revenue, vendor deposit tracking, variable timelines, and client retainer management', tip: 'Record client deposits as a liability and recognise revenue only as event milestones are delivered — this keeps your financials accurate.', deduction: 'event supplies, venue deposits, subcontractor payments, and marketing costs' },
  'Tutoring Centres': { pain: 'session-based billing, multiple tutor payments, cancellation tracking, and material costs', tip: 'Track revenue per subject and per tutor to identify your most profitable service lines and allocate resources accordingly.', deduction: 'educational materials, software subscriptions, facility rent, and advertising costs' },
  'Physiotherapists': { pain: 'insurance direct billing, treatment plan tracking, clinic overhead allocation, and mixed payment methods', tip: 'Reconcile insurance reimbursements weekly to catch underpayments early and keep your accounts receivable healthy.', deduction: 'physiotherapy equipment, continuing education, clinic rent, and professional liability insurance' },
  'Gyms and Fitness Studios': { pain: 'membership revenue recognition, high equipment costs, seasonal membership fluctuations, and class-based billing', tip: 'Recognise membership revenue monthly rather than upfront to get an accurate picture of your recurring revenue stream.', deduction: 'fitness equipment depreciation, facility rent, instructor wages, and marketing costs' },
  'Bakeries': { pain: 'perishable inventory management, ingredient cost fluctuations, wholesale versus retail revenue splits, and custom order tracking', tip: 'Track ingredient costs as a percentage of revenue weekly — bakery margins are tight and raw material price changes need immediate attention.', deduction: 'baking equipment, ingredient inventory, packaging supplies, and delivery vehicle costs' },
  'IT Consultants': { pain: 'project milestone billing, recurring retainer management, software licence tracking, and subcontractor payments', tip: 'Separate project revenue from recurring retainer revenue in your chart of accounts for clearer cash-flow forecasting.', deduction: 'hardware and software, home office expenses, professional certifications, and subcontractor fees' },
  'Dayhomes': { pain: 'government subsidy tracking, parent billing cycles, food expense management, and home-business tax implications', tip: 'Maintain a dedicated business bank account and calculate your home-business-use percentage accurately for CRA compliance.', deduction: 'food and supplies, home-use portion of rent and utilities, educational materials, and liability insurance' },
  'Painting Companies': { pain: 'job-based costing, paint and supply inventory, seasonal demand, and subcontractor management', tip: 'Track material costs per job to ensure your quoting accurately reflects real supply expenses — paint costs vary significantly by project scope.', deduction: 'paint and supplies, vehicle expenses, equipment depreciation, and advertising costs' },
  'Courier Services': { pain: 'per-delivery revenue tracking, vehicle maintenance, fuel costs, and independent contractor classification', tip: 'Use GPS mileage tracking to maximise your vehicle expense deductions and maintain CRA-compliant records.', deduction: 'vehicle fuel and maintenance, insurance, cell phone, and delivery supplies' },
  'Optometrists': { pain: 'insurance billing complexity, frame and lens inventory management, clinic overhead, and associate compensation', tip: 'Run monthly inventory counts on frames and lenses — optical inventory ties up significant capital and shrinkage directly impacts margins.', deduction: 'optical equipment, frame inventory, continuing education, and clinic rent' },
  'Roofing Companies': { pain: 'weather-dependent scheduling, material cost volatility, progress billing, and warranty reserve tracking', tip: 'Set aside a warranty reserve (typically 2-5% of revenue) for callbacks — this smooths out unexpected repair costs throughout the year.', deduction: 'roofing materials, vehicle and equipment costs, safety gear, and WCB premiums' },
  'Fencing Companies': { pain: 'seasonal demand concentration, material cost management, job-based pricing, and deposit tracking', tip: 'Collect deposits and track them as liabilities until the job is complete — this gives you an accurate picture of earned versus unearned revenue.', deduction: 'fencing materials, vehicle expenses, equipment depreciation, and advertising costs' },
  'Catering Companies': { pain: 'event-based revenue spikes, perishable inventory, staff scheduling complexity, and deposit management', tip: 'Track food costs as a percentage of event revenue for each booking to maintain consistent margins across different event types.', deduction: 'food inventory, kitchen equipment, catering supplies, and delivery vehicle costs' },
  'Dog Walkers and Pet Sitters': { pain: 'session-based billing, irregular schedules, vehicle mileage tracking, and insurance requirements', tip: 'Use scheduling software that integrates with your accounting system to automatically track revenue per client and per service type.', deduction: 'vehicle mileage, pet supplies, insurance premiums, and marketing costs' },
  'Window Cleaning Companies': { pain: 'seasonal revenue concentration, equipment costs, liability insurance, and recurring client management', tip: 'Build recurring commercial contracts to smooth out seasonal revenue — commercial window cleaning provides steadier cash flow than residential.', deduction: 'cleaning equipment, vehicle expenses, insurance premiums, and safety gear' },
  'Graphic Designers': { pain: 'project-based billing, scope creep management, software subscription costs, and subcontractor payments', tip: 'Track time per project even on fixed-fee work — this data helps you price future projects more accurately and identify scope-creep patterns.', deduction: 'software subscriptions, hardware depreciation, home office expenses, and professional development' },
  'Snow Removal Companies': { pain: 'highly seasonal revenue, equipment maintenance during off-season, contract-based billing, and weather-dependent scheduling', tip: 'Spread annual equipment maintenance costs evenly across all months rather than expensing them in summer — this gives a truer picture of monthly profitability.', deduction: 'snow removal equipment, vehicle costs, salt and sand supplies, and insurance premiums' },
  'Music Teachers': { pain: 'session-based revenue, cancellation policies, instrument and material costs, and home-studio deductions', tip: 'Track cancellations and no-shows separately from delivered lessons to understand your true revenue per teaching hour.', deduction: 'instruments, sheet music, home studio expenses, and professional development courses' },
  'Demolition Companies': { pain: 'project-based revenue, disposal and tipping fees, heavy equipment costs, and environmental compliance expenses', tip: 'Track disposal and tipping fees per project — these costs vary significantly and directly impact job profitability.', deduction: 'heavy equipment depreciation, disposal fees, vehicle costs, and safety equipment' },
  'Flooring Companies': { pain: 'material cost management, job-based pricing, installation crew payroll, and warranty tracking', tip: 'Track material waste rates per job type — hardwood, tile, and carpet all have different typical waste percentages that should be built into quotes.', deduction: 'flooring materials, tools, vehicle expenses, and showroom rent' },
  'Interior Designers': { pain: 'project milestone billing, product markup tracking, vendor commission management, and retainer accounting', tip: 'Separate design-fee revenue from product-sales revenue in your chart of accounts — the margin structures are very different and need distinct tracking.', deduction: 'design software, sample materials, travel expenses, and professional memberships' },
  'Pest Control Companies': { pain: 'seasonal demand, chemical inventory tracking, licensing fees, and recurring service-contract management', tip: 'Build a base of recurring service contracts to provide steady revenue through slower seasons — track recurring versus one-time revenue separately.', deduction: 'chemical supplies, vehicle expenses, licensing fees, and protective equipment' },
  'Tow Truck Companies': { pain: '24/7 operations, vehicle maintenance costs, insurance complexity, and dispatch-based revenue tracking', tip: 'Track revenue per call type (roadside assistance, accident tow, impound) to understand which services drive the most profit per dispatch.', deduction: 'tow truck maintenance and depreciation, fuel, insurance premiums, and dispatch system costs' },
  'Personal Trainers': { pain: 'session-pack billing, cancellation management, certification costs, and mixed online and in-person revenue', tip: 'Track prepaid session packages as a liability and recognise revenue per delivered session — this prevents overstating income from unused packages.', deduction: 'fitness equipment, certification courses, gym rental fees, and marketing expenses' },
  'Deck Builders': { pain: 'seasonal demand, material cost fluctuations, permit fees, and progress billing on larger projects', tip: 'Get material quotes locked in before providing a fixed price to customers — lumber prices can shift significantly between quote and build dates.', deduction: 'lumber and building materials, tools, vehicle expenses, and permit fees' },
  'Mobile Mechanics': { pain: 'on-site service logistics, parts inventory management, vehicle mileage tracking, and invoicing on the go', tip: 'Use a mobile invoicing app that integrates with your accounting software so every job is billed and recorded in real time.', deduction: 'tools, parts inventory, service vehicle costs, and diagnostic equipment' },
  'Pressure Washing Companies': { pain: 'seasonal demand, equipment maintenance, chemical supply costs, and recurring residential contract management', tip: 'Bundle services (house wash, driveway, deck) into packages to increase average revenue per visit and simplify billing.', deduction: 'pressure washing equipment, cleaning chemicals, vehicle costs, and marketing expenses' }
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

// ─── SCHEDULED POSTS (Mar 19 – Jun 16, 2026) ──────────────────
const scheduledPosts = [
  // ── March 19–31 ──
  {
    title: 'How to Track Mileage for CRA: A Calgary Business Guide',
    slug: 'how-to-track-mileage-for-cra-a-calgary-business-guide',
    excerpt: 'Learn the CRA-approved methods for tracking business mileage and maximising your vehicle expense deductions.',
    category: 'Guides',
    date: '2026-03-19',
    body: `
<p>If you use a vehicle for your Calgary business, tracking your mileage correctly is one of the most important things you can do to maximise your tax deductions. CRA requires a detailed log to support any vehicle expense claim, and failing to keep one can result in your entire deduction being denied during an audit.</p>

<h2>Why Mileage Tracking Matters</h2>
<p>Vehicle expenses — including fuel, insurance, maintenance, lease payments or depreciation, and parking — are only deductible to the extent the vehicle is used for business purposes. If your vehicle is 60% business use, you can deduct 60% of eligible costs. But CRA won't accept a guess. You need a contemporaneous log showing each business trip.</p>

<h2>What CRA Requires in a Mileage Log</h2>
<p>For each business trip, your log should record:</p>
<ul>
  <li>The date of the trip</li>
  <li>The destination (client name or business purpose)</li>
  <li>The number of kilometres driven</li>
  <li>The business purpose of the trip</li>
</ul>
<p>At the end of the year, you need your total kilometres driven (business and personal) to calculate your business-use percentage.</p>

<h2>Manual vs. App-Based Tracking</h2>
<p>You can keep a paper logbook, but most Calgary business owners find a mileage-tracking app much more practical. Apps like MileIQ, Driversnote, or QuickBooks mileage tracking use your phone's GPS to automatically record trips. You simply classify each trip as business or personal. This dramatically reduces the effort involved and produces a CRA-compliant log.</p>

<h2>The Simplified Method</h2>
<p>CRA allows a simplified logbook method where you keep a detailed log for one representative three-month period and use that percentage for the full year, provided your driving pattern is consistent. This can reduce the ongoing tracking burden, but the initial three-month log must be thorough.</p>

<h2>Common Mistakes Calgary Business Owners Make</h2>
<ul>
  <li><strong>Not logging commuting trips</strong>. Driving from home to your regular workplace is personal, not business. Only trips to client sites, secondary locations, or business errands qualify.</li>
  <li><strong>Reconstructing logs after the fact</strong>. CRA specifically looks for "contemporaneous" records — logs created at the time of the trip, not recreated months later from memory.</li>
  <li><strong>Claiming 100% business use</strong>. Unless you have a dedicated business vehicle that is never used personally, claiming 100% is a red flag that invites audit scrutiny.</li>
</ul>

<h2>How Castle Bookkeeping Can Help</h2>
<p>We help Calgary business owners set up mileage tracking systems, calculate their business-use percentage, and claim the correct vehicle deductions on their tax returns. If you've been guessing on mileage, let's get it right. Book a free consultation today.</p>
`
  },
  {
    title: 'Bookkeeping for Small Businesses in Bridlewood',
    slug: 'bookkeeping-for-small-businesses-in-bridlewood',
    excerpt: 'Professional bookkeeping services for small businesses in Bridlewood. Flat-fee monthly plans, GST filing, and payroll.',
    category: 'Neighbourhoods',
    date: '2026-03-20',
    body: neighbourhoodBody('Bridlewood'),
    metaDesc: 'Looking for a bookkeeper in Bridlewood? Castle Bookkeeping offers flat-fee monthly bookkeeping, GST filing, payroll, and tax prep for Bridlewood small businesses. Free consultation.'
  },
  {
    title: 'Why Your Calgary Business Needs Monthly Reconciliation',
    slug: 'why-your-calgary-business-needs-monthly-reconciliation',
    excerpt: 'Monthly bank reconciliation is the foundation of accurate bookkeeping. Here is why Calgary businesses cannot afford to skip it.',
    category: 'Guides',
    date: '2026-03-21',
    body: `
<p>Bank reconciliation is the process of matching your accounting records against your actual bank and credit card statements to ensure every transaction is accounted for. It sounds simple, but it is one of the most skipped bookkeeping tasks among Calgary small business owners — and skipping it has real consequences.</p>

<h2>What Can Go Wrong Without Reconciliation</h2>
<p>When you don't reconcile monthly, errors compound. Duplicate entries, missed transactions, incorrect categorisations, and bank fees that were never recorded all accumulate silently. By the time you discover the problem — often during tax season or a CRA review — untangling months of discrepancies is expensive and time-consuming.</p>

<h2>What Monthly Reconciliation Catches</h2>
<ul>
  <li><strong>Missing transactions</strong>. Cash deposits, automatic payments, and bank fees that didn't make it into your books.</li>
  <li><strong>Duplicate entries</strong>. Transactions recorded twice through bank feeds or manual entry.</li>
  <li><strong>Fraudulent charges</strong>. Unauthorised transactions on your business accounts that go unnoticed for months.</li>
  <li><strong>Timing differences</strong>. Cheques issued but not yet cashed, or deposits in transit.</li>
</ul>

<h2>How Reconciliation Works</h2>
<p>The process involves comparing your bank statement line by line against your accounting software. Each transaction in your books should match a transaction on your statement. Any differences are investigated and corrected. At the end, your book balance should match your bank balance exactly.</p>

<h2>How Long Does It Take?</h2>
<p>For a typical Calgary small business with one or two bank accounts and a credit card, monthly reconciliation takes 30 to 60 minutes if done consistently. If you fall behind, the time required grows exponentially as errors compound and memory fades.</p>

<h2>Let Castle Handle Your Reconciliation</h2>
<p>Monthly reconciliation is included in every Castle Bookkeeping plan. We reconcile all your accounts every month, catch discrepancies early, and deliver clean financial statements you can trust. Contact us for a free consultation.</p>
`
  },
  {
    title: 'Bookkeeping for Moving Companies in Calgary',
    slug: 'bookkeeping-for-moving-companies-in-calgary',
    excerpt: 'Specialised bookkeeping services for Calgary moving companies. Flat-fee plans tailored to your industry.',
    category: 'Industries',
    date: '2026-03-22',
    body: industryBody('Moving Companies'),
    metaDesc: 'Castle Bookkeeping provides flat-fee bookkeeping for Calgary moving companies. Monthly bookkeeping, GST filing, payroll, and tax preparation. Free consultation.'
  },
  {
    title: 'Top 5 Bookkeeping Mistakes Calgary Startups Make',
    slug: 'top-5-bookkeeping-mistakes-calgary-startups-make',
    excerpt: 'New to business in Calgary? Avoid these five common bookkeeping mistakes that trip up startups.',
    category: 'Guides',
    date: '2026-03-23',
    body: `
<p>Starting a business in Calgary is exciting, but the financial side can be daunting. Many new entrepreneurs make bookkeeping mistakes early on that become expensive problems down the road. Here are the five most common mistakes we see — and how to avoid them.</p>

<h2>1. Mixing Personal and Business Finances</h2>
<p>This is the number one mistake Calgary startups make. Using your personal bank account for business transactions makes bookkeeping exponentially harder, creates GST tracking nightmares, and is a major red flag in a CRA audit. Open a dedicated business bank account from day one, and run every business transaction through it.</p>

<h2>2. Not Tracking Expenses From the Start</h2>
<p>Many startup founders focus entirely on revenue and forget to track expenses carefully. Those receipts from your first month — office supplies, domain registrations, business cards, software subscriptions — are all deductible. But if you don't record them, you lose the deduction. Start tracking expenses from your very first business purchase.</p>

<h2>3. Ignoring GST Obligations</h2>
<p>Once your revenue exceeds $30,000 over four consecutive calendar quarters, you must register for GST. Many Calgary startups blow past this threshold without registering, then face retroactive GST liability plus penalties. Track your revenue carefully and register before you hit the threshold.</p>

<h2>4. DIY Bookkeeping in Spreadsheets</h2>
<p>Spreadsheets are fine for the first few weeks, but they don't scale. They lack bank-feed integration, automated categorisation, GST tracking, and proper reporting. The longer you wait to move to proper accounting software like QuickBooks or Xero, the more painful the migration will be.</p>

<h2>5. Waiting Until Tax Season to Organise</h2>
<p>The worst time to organise your books is when your tax return is due. Scrambling to reconstruct a year of financial records leads to errors, missed deductions, and late filing penalties. Monthly bookkeeping takes far less total time than an annual catch-up project.</p>

<h2>Start Right With Castle</h2>
<p>Castle Bookkeeping offers startup-friendly monthly plans that keep your books clean from day one. We set up your accounting software correctly, categorise your transactions, file your GST, and deliver monthly financial statements so you always know where your business stands. Book a free consultation today.</p>
`
  },
  {
    title: 'Bookkeeping for Small Businesses in Cougar Ridge',
    slug: 'bookkeeping-for-small-businesses-in-cougar-ridge',
    excerpt: 'Professional bookkeeping services for small businesses in Cougar Ridge. Flat-fee monthly plans, GST filing, and payroll.',
    category: 'Neighbourhoods',
    date: '2026-03-24',
    body: neighbourhoodBody('Cougar Ridge'),
    metaDesc: 'Looking for a bookkeeper in Cougar Ridge? Castle Bookkeeping offers flat-fee monthly bookkeeping, GST filing, payroll, and tax prep for Cougar Ridge small businesses. Free consultation.'
  },
  {
    title: 'How to Prepare for a CRA Audit in Alberta',
    slug: 'how-to-prepare-for-a-cra-audit-in-alberta',
    excerpt: 'A CRA audit does not have to be terrifying. Here is how Alberta business owners can prepare and what to expect.',
    category: 'Guides',
    date: '2026-03-25',
    body: `
<p>Receiving a CRA audit letter can cause immediate anxiety, but with proper preparation, the process is manageable. Thousands of Canadian businesses are audited every year, and most audits are routine reviews rather than adversarial investigations. Here is what Calgary business owners need to know.</p>

<h2>Why Businesses Get Audited</h2>
<p>CRA selects businesses for audit through several mechanisms: random selection, industry benchmarking (your numbers differ significantly from industry averages), information matching (discrepancies between filings), repeated late filings, or tips and leads. Being selected doesn't mean you've done anything wrong — it means CRA wants to verify your records.</p>

<h2>What to Do When You Receive an Audit Notice</h2>
<ol>
  <li><strong>Don't panic</strong>. Read the letter carefully. It will specify the tax years under review and the areas CRA wants to examine.</li>
  <li><strong>Contact your bookkeeper and accountant immediately</strong>. They can help you prepare and may represent you during the audit.</li>
  <li><strong>Gather the requested documents</strong>. CRA will specify what they want to see — typically bank statements, receipts, invoices, and financial statements for the periods in question.</li>
  <li><strong>Respond within the deadline</strong>. Ignoring the letter or missing the response deadline makes things significantly worse.</li>
</ol>

<h2>What CRA Examines</h2>
<p>Common areas of focus include: revenue completeness (did you report all income?), expense legitimacy (are claimed deductions supported by receipts?), GST compliance (was GST collected and remitted correctly?), payroll accuracy (were source deductions calculated and remitted properly?), and record-keeping quality (are your books organised and accessible?).</p>

<h2>How to Prepare Your Records</h2>
<ul>
  <li>Ensure all bank accounts are reconciled for the audit period</li>
  <li>Organise receipts and invoices by category and date</li>
  <li>Prepare a summary of major transactions or unusual items</li>
  <li>Have your financial statements and tax returns readily available</li>
  <li>Document your business-use calculations (vehicle, home office)</li>
</ul>

<h2>Your Best Defence Is Clean Books</h2>
<p>Businesses with well-maintained, professionally prepared books have little to fear from a CRA audit. When every transaction is properly recorded, categorised, and supported by documentation, the audit process is straightforward. Castle Bookkeeping keeps your records CRA-ready year-round. Contact us for a free consultation.</p>
`
  },
  {
    title: 'Bookkeeping for Event Planners in Calgary',
    slug: 'bookkeeping-for-event-planners-in-calgary',
    excerpt: 'Specialised bookkeeping services for Calgary event planners. Flat-fee plans tailored to your industry.',
    category: 'Industries',
    date: '2026-03-26',
    body: industryBody('Event Planners'),
    metaDesc: 'Castle Bookkeeping provides flat-fee bookkeeping for Calgary event planners. Monthly bookkeeping, GST filing, payroll, and tax preparation. Free consultation.'
  },
  {
    title: 'Understanding PST Exemptions for Alberta Businesses',
    slug: 'understanding-pst-exemptions-for-alberta-businesses',
    excerpt: 'Alberta has no PST, but what does that mean when you sell to other provinces? Here is what Calgary businesses need to know.',
    category: 'Guides',
    date: '2026-03-27',
    body: `
<p>One of Alberta's greatest advantages for small businesses is the absence of a Provincial Sales Tax (PST). While other provinces charge between 6% and 10% PST on top of the federal 5% GST, Alberta businesses only collect 5% GST on taxable goods and services. But the situation gets more complex when you sell across provincial lines.</p>

<h2>Alberta's Tax Advantage</h2>
<p>Alberta is one of only three Canadian jurisdictions without PST (along with the territories). This means lower costs for consumers and simpler tax compliance for businesses. A Calgary restaurant, for example, charges only 5% GST rather than the 13% HST charged in Ontario. This price advantage can be significant for businesses serving consumers.</p>

<h2>When Provincial Sales Tax Applies to Alberta Businesses</h2>
<p>If your Calgary business sells goods or services to customers in provinces with PST or HST, you may be required to collect those provincial taxes. The rules vary by province:</p>
<ul>
  <li><strong>HST provinces</strong> (Ontario, Nova Scotia, New Brunswick, Newfoundland, PEI): You charge HST at the applicable rate (13-15%) on sales delivered to customers in these provinces.</li>
  <li><strong>BC, Saskatchewan, Manitoba</strong>: These provinces have separate PST. Generally, you only need to collect their PST if you have a physical presence or meet certain registration thresholds in that province.</li>
  <li><strong>Quebec</strong>: QST has its own registration requirements for out-of-province sellers exceeding $30,000 in annual sales to Quebec customers.</li>
</ul>

<h2>E-Commerce Complications</h2>
<p>For Calgary businesses selling online, the place-of-supply rules determine which tax applies. Generally, the tax rate is based on the delivery destination, not your location. If you ship a product from Calgary to a customer in Toronto, HST at 13% applies — not Alberta's 5% GST alone.</p>

<h2>How This Affects Your Bookkeeping</h2>
<p>Multi-province sales require your accounting system to track which tax rates were applied to which sales. Your GST return needs to accurately reflect only the federal portion, while provincial taxes may require separate filings. This is where proper bookkeeping software and professional support become essential.</p>

<h2>Castle Bookkeeping Can Help</h2>
<p>We help Calgary businesses navigate multi-province tax obligations, set up proper tax codes in their accounting software, and file all required returns. If you sell across provincial lines, contact us for a free consultation to ensure your compliance is solid.</p>
`
  },
  {
    title: 'Bookkeeping for Small Businesses in Chaparral',
    slug: 'bookkeeping-for-small-businesses-in-chaparral',
    excerpt: 'Professional bookkeeping services for small businesses in Chaparral. Flat-fee monthly plans, GST filing, and payroll.',
    category: 'Neighbourhoods',
    date: '2026-03-28',
    body: neighbourhoodBody('Chaparral'),
    metaDesc: 'Looking for a bookkeeper in Chaparral? Castle Bookkeeping offers flat-fee monthly bookkeeping, GST filing, payroll, and tax prep for Chaparral small businesses. Free consultation.'
  },
  {
    title: 'Bookkeeping for Tutoring Centres in Calgary',
    slug: 'bookkeeping-for-tutoring-centres-in-calgary',
    excerpt: 'Specialised bookkeeping services for Calgary tutoring centres. Flat-fee plans tailored to your industry.',
    category: 'Industries',
    date: '2026-03-29',
    body: industryBody('Tutoring Centres'),
    metaDesc: 'Castle Bookkeeping provides flat-fee bookkeeping for Calgary tutoring centres. Monthly bookkeeping, GST filing, payroll, and tax preparation. Free consultation.'
  },
  {
    title: 'How to Choose Between QuickBooks and Xero in 2026',
    slug: 'how-to-choose-between-quickbooks-and-xero-in-2026',
    excerpt: 'An updated comparison of QuickBooks Online and Xero for Canadian small businesses in 2026.',
    category: 'Guides',
    date: '2026-03-30',
    body: `
<p>Choosing the right accounting software is one of the first decisions a Calgary small business owner needs to make. QuickBooks Online (QBO) and Xero remain the two leading cloud platforms in Canada, and in 2026, both have evolved considerably. Here is an honest, updated comparison.</p>

<h2>QuickBooks Online in 2026</h2>
<p>QBO continues to dominate the Canadian small business market. Key strengths include native Canadian payroll integration, direct CRA filing for GST returns, the widest bank-feed coverage for Canadian financial institutions, and the largest ecosystem of accountants and bookkeepers familiar with the platform. Pricing starts around $23/month for Simple Start.</p>

<h2>Xero in 2026</h2>
<p>Xero has made significant strides in the Canadian market. Its interface remains cleaner and more intuitive than QBO. Key improvements include better Canadian bank-feed coverage, improved multi-currency handling, and a growing ecosystem of Canadian advisors. However, Xero still lacks native Canadian payroll — you need a third-party integration like Wagepoint or Humi.</p>

<h2>Head-to-Head Comparison</h2>
<ul>
  <li><strong>Ease of use</strong>: Xero wins. Its interface is more modern and less cluttered.</li>
  <li><strong>Canadian payroll</strong>: QBO wins. Integrated payroll with T4s and CRA remittances built in.</li>
  <li><strong>GST filing</strong>: QBO wins. Direct electronic filing to CRA from within the platform.</li>
  <li><strong>Bank feeds</strong>: Tie. Both cover major Canadian banks well in 2026.</li>
  <li><strong>Invoicing</strong>: Tie. Both offer professional invoicing with online payment options.</li>
  <li><strong>Accountant ecosystem</strong>: QBO wins in Canada. More bookkeepers and accountants are QBO-certified.</li>
  <li><strong>Multi-currency</strong>: Xero wins. Better native multi-currency support across all plan levels.</li>
  <li><strong>Pricing</strong>: Comparable. Xero starts slightly lower, but QBO's payroll integration can save money overall.</li>
</ul>

<h2>Our Recommendation for Calgary Businesses</h2>
<p>For most Calgary small businesses, we still recommend QuickBooks Online. The integrated payroll, direct CRA filing, and larger Canadian advisor network make it the more practical choice. If you are already on Xero and happy with it, there is no compelling reason to switch — but if you are starting fresh, QBO gives you the most complete Canadian solution.</p>

<h2>We Work With Both</h2>
<p>Castle Bookkeeping is certified in both QuickBooks Online and Xero. Whichever platform you choose, we can set it up, configure it for your business, and manage your ongoing bookkeeping. Contact us for a free consultation.</p>
`
  },
  {
    title: 'Bookkeeping for Small Businesses in Dalhousie',
    slug: 'bookkeeping-for-small-businesses-in-dalhousie',
    excerpt: 'Professional bookkeeping services for small businesses in Dalhousie. Flat-fee monthly plans, GST filing, and payroll.',
    category: 'Neighbourhoods',
    date: '2026-03-31',
    body: neighbourhoodBody('Dalhousie'),
    metaDesc: 'Looking for a bookkeeper in Dalhousie? Castle Bookkeeping offers flat-fee monthly bookkeeping, GST filing, payroll, and tax prep for Dalhousie small businesses. Free consultation.'
  },

  // ── April 1–30 ──
  {
    title: 'Spring Tax Prep Checklist for Calgary Business Owners',
    slug: 'spring-tax-prep-checklist-for-calgary-business-owners',
    excerpt: 'A practical spring checklist to ensure your Calgary business is ready for tax filing season.',
    category: 'Seasonal',
    date: '2026-04-01',
    body: `
<p>Spring means tax season for Calgary business owners. Whether you file your own returns or work with an accountant, being prepared makes the process faster, cheaper, and less stressful. Here is your spring tax-prep checklist for 2026.</p>

<h2>1. Confirm Your Books Are Current Through Year-End</h2>
<p>Your bookkeeping for the prior fiscal year should be fully complete: all transactions categorised, all bank and credit-card accounts reconciled, and year-end adjustments recorded. If you are behind, prioritise catching up now — your accountant cannot file accurate returns from incomplete records.</p>

<h2>2. Gather All Tax Slips and Documents</h2>
<p>Collect T3, T4, T4A, T5, and RRSP contribution slips. For business returns, assemble your income statement, balance sheet, and details of any capital asset purchases or disposals during the year. Having everything in one place before you start saves significant time.</p>

<h2>3. Review Your Deductions</h2>
<p>Walk through your expense accounts and ensure all legitimate deductions are captured. Commonly missed deductions include: professional memberships, home office expenses, vehicle mileage, conference and training costs, and bank fees. Each missed deduction costs you real tax dollars.</p>

<h2>4. Reconcile Your GST</h2>
<p>If you file GST annually, reconcile total GST collected against total GST remitted for the year. If you file quarterly, verify all four quarters were filed and the totals are consistent with your annual revenue.</p>

<h2>5. Check Your CRA Account</h2>
<p>Log in to CRA My Business Account and review your account status. Look for any outstanding balances, missed filings, or notices you may not have seen. Addressing these before filing your current return avoids complications.</p>

<h2>6. Coordinate With Your Accountant Early</h2>
<p>Accountants are busiest between March and June. Delivering clean, organised records early means your return gets filed sooner, and you avoid the last-minute rush that often leads to errors or extensions.</p>

<h2>7. Plan for Balance Owing</h2>
<p>If you expect to owe tax, plan for the payment now. Personal tax balances are due April 30 regardless of your filing deadline. Corporate tax is due two or three months after year-end depending on your structure.</p>

<h2>Castle Makes Tax Prep Simple</h2>
<p>Castle Bookkeeping clients receive a complete, tax-ready financial package every year. Our monthly bookkeeping ensures your records are always current, so tax season is just a handoff — not a scramble. Contact us for a free consultation.</p>
`
  },
  {
    title: 'Bookkeeping for Physiotherapists in Calgary',
    slug: 'bookkeeping-for-physiotherapists-in-calgary',
    excerpt: 'Specialised bookkeeping services for Calgary physiotherapists. Flat-fee plans tailored to your industry.',
    category: 'Industries',
    date: '2026-04-02',
    body: industryBody('Physiotherapists'),
    metaDesc: 'Castle Bookkeeping provides flat-fee bookkeeping for Calgary physiotherapists. Monthly bookkeeping, GST filing, payroll, and tax preparation. Free consultation.'
  },
  {
    title: 'Bookkeeping for Small Businesses in Evergreen',
    slug: 'bookkeeping-for-small-businesses-in-evergreen',
    excerpt: 'Professional bookkeeping services for small businesses in Evergreen. Flat-fee monthly plans, GST filing, and payroll.',
    category: 'Neighbourhoods',
    date: '2026-04-03',
    body: neighbourhoodBody('Evergreen'),
    metaDesc: 'Looking for a bookkeeper in Evergreen? Castle Bookkeeping offers flat-fee monthly bookkeeping, GST filing, payroll, and tax prep for Evergreen small businesses. Free consultation.'
  },
  {
    title: 'How to Separate Personal and Business Expenses',
    slug: 'how-to-separate-personal-and-business-expenses',
    excerpt: 'Mixing personal and business finances is the most common bookkeeping mistake. Here is how to fix it.',
    category: 'Guides',
    date: '2026-04-04',
    body: `
<p>One of the most common issues we see with Calgary small businesses is the commingling of personal and business finances. It seems harmless at first — using your personal credit card for a business purchase, depositing a client cheque into your personal account — but it creates serious bookkeeping, tax, and legal problems over time.</p>

<h2>Why Separation Matters</h2>
<p>CRA expects clear separation between personal and business finances. When expenses are mixed, it becomes nearly impossible to accurately determine which costs are deductible, which GST credits you can claim, and what your true business income is. In an audit, commingled finances are one of the most common reasons deductions get denied.</p>

<h2>Step 1: Open a Business Bank Account</h2>
<p>This is the single most important step. Every business transaction — income and expenses — should flow through a dedicated business account. Most Canadian banks offer small business chequing accounts with reasonable fees. Choose one and commit to using it exclusively for business.</p>

<h2>Step 2: Get a Business Credit Card</h2>
<p>A dedicated business credit card simplifies expense tracking enormously. All business purchases go on one card, making categorisation straightforward. Many business cards also offer rewards or cash back on business spending categories.</p>

<h2>Step 3: Pay Yourself a Consistent Amount</h2>
<p>Rather than withdrawing money from the business account whenever you need it, set up a regular owner's draw or salary payment. Transfer a fixed amount to your personal account on a set schedule. This creates clean records and helps with personal budgeting too.</p>

<h2>Step 4: Stop Using Personal Accounts for Business</h2>
<p>If you've been using personal accounts for business, draw a line in the sand. Going forward, every business transaction goes through business accounts only. For the historical period, you or your bookkeeper will need to go through personal statements and identify business transactions — this is tedious but necessary.</p>

<h2>Step 5: Handle Reimbursements Properly</h2>
<p>Sometimes using a personal card for a business purchase is unavoidable. When it happens, reimburse yourself from the business account promptly and document the transaction. This creates a clear paper trail.</p>

<h2>Castle Can Help You Get Organised</h2>
<p>If your personal and business finances are tangled, Castle Bookkeeping can help you untangle them. We'll review your accounts, identify business transactions, set up proper separation going forward, and bring your books current. Contact us for a free consultation.</p>
`
  },
  {
    title: 'Bookkeeping for Gyms and Fitness Studios in Calgary',
    slug: 'bookkeeping-for-gyms-and-fitness-studios-in-calgary',
    excerpt: 'Specialised bookkeeping services for Calgary gyms and fitness studios. Flat-fee plans tailored to your industry.',
    category: 'Industries',
    date: '2026-04-05',
    body: industryBody('Gyms and Fitness Studios'),
    metaDesc: 'Castle Bookkeeping provides flat-fee bookkeeping for Calgary gyms and fitness studios. Monthly bookkeeping, GST filing, payroll, and tax preparation. Free consultation.'
  },
  {
    title: 'Bookkeeping for Small Businesses in Harvest Hills',
    slug: 'bookkeeping-for-small-businesses-in-harvest-hills',
    excerpt: 'Professional bookkeeping services for small businesses in Harvest Hills. Flat-fee monthly plans, GST filing, and payroll.',
    category: 'Neighbourhoods',
    date: '2026-04-06',
    body: neighbourhoodBody('Harvest Hills'),
    metaDesc: 'Looking for a bookkeeper in Harvest Hills? Castle Bookkeeping offers flat-fee monthly bookkeeping, GST filing, payroll, and tax prep for Harvest Hills small businesses. Free consultation.'
  },
  {
    title: 'What Calgary Business Owners Need to Know About Source Deductions',
    slug: 'what-calgary-business-owners-need-to-know-about-source-deductions',
    excerpt: 'Source deductions are one of the highest-risk areas of payroll. Here is what every Calgary employer must understand.',
    category: 'Guides',
    date: '2026-04-07',
    body: `
<p>The moment you hire your first employee in Calgary, you take on a critical legal obligation: deducting income tax, Canada Pension Plan (CPP) contributions, and Employment Insurance (EI) premiums from their pay and remitting those amounts to CRA. Getting source deductions wrong is one of the most penalised mistakes a business owner can make.</p>

<h2>What Are Source Deductions?</h2>
<p>Source deductions are amounts you withhold from your employees' paycheques on behalf of CRA. They include federal and provincial income tax (based on the employee's TD1 form and pay level), CPP contributions (both the employee portion and a matching employer portion), and EI premiums (the employee portion plus the employer portion, which is 1.4 times the employee amount).</p>

<h2>How to Calculate Them</h2>
<p>CRA provides online payroll calculators and payroll deduction tables that tell you exactly how much to withhold based on an employee's pay period, province, and TD1 claim codes. Most payroll software (including QuickBooks Online Payroll) automates these calculations. Manual calculation is possible but risky due to the complexity of the tax tables.</p>

<h2>When to Remit</h2>
<p>Your remittance frequency depends on your average monthly withholding amount. New employers with small payrolls typically remit monthly, due by the 15th of the following month. Larger employers may need to remit semi-monthly or even within three business days of each pay run. CRA will notify you of your remittance schedule.</p>

<h2>Penalties for Errors</h2>
<p>CRA takes payroll compliance very seriously. Penalties for late remittance range from 3% (1-3 days late) to 10% (more than 7 days late), and 20% for repeat offenders in the same year. Unlike most tax penalties, payroll penalties can be assessed against directors personally — meaning your personal assets are at risk.</p>

<h2>Year-End Obligations</h2>
<p>By February 28 each year, you must file T4 information returns and provide T4 slips to all employees. When an employee leaves, you must issue a Record of Employment (ROE) within five calendar days.</p>

<h2>Castle Handles Payroll Right</h2>
<p>Castle Bookkeeping's payroll service handles all source deduction calculations, CRA remittances, T4 preparation, and ROE filing. We ensure you stay compliant and avoid costly penalties. Contact us for a free consultation.</p>
`
  },
  {
    title: 'Bookkeeping for Bakeries in Calgary',
    slug: 'bookkeeping-for-bakeries-in-calgary',
    excerpt: 'Specialised bookkeeping services for Calgary bakeries. Flat-fee plans tailored to your industry.',
    category: 'Industries',
    date: '2026-04-08',
    body: industryBody('Bakeries'),
    metaDesc: 'Castle Bookkeeping provides flat-fee bookkeeping for Calgary bakeries. Monthly bookkeeping, GST filing, payroll, and tax preparation. Free consultation.'
  },
  {
    title: 'Bookkeeping for Small Businesses in Riverbend',
    slug: 'bookkeeping-for-small-businesses-in-riverbend',
    excerpt: 'Professional bookkeeping services for small businesses in Riverbend. Flat-fee monthly plans, GST filing, and payroll.',
    category: 'Neighbourhoods',
    date: '2026-04-09',
    body: neighbourhoodBody('Riverbend'),
    metaDesc: 'Looking for a bookkeeper in Riverbend? Castle Bookkeeping offers flat-fee monthly bookkeeping, GST filing, payroll, and tax prep for Riverbend small businesses. Free consultation.'
  },
  {
    title: 'How to Read a Profit and Loss Statement',
    slug: 'how-to-read-a-profit-and-loss-statement',
    excerpt: 'Your profit and loss statement is the most important report your business produces. Here is how to read it.',
    category: 'Guides',
    date: '2026-04-10',
    body: `
<p>A Profit and Loss statement (also called an income statement or P&L) summarises your business's revenue, expenses, and profit over a specific period. It is the single most important financial report for understanding how your Calgary business is actually performing.</p>

<h2>The Basic Structure</h2>
<p>A P&L has three main sections:</p>
<ul>
  <li><strong>Revenue</strong> (top line): All income your business earned during the period — sales, service fees, commissions, etc.</li>
  <li><strong>Expenses</strong>: All costs incurred to operate the business — rent, wages, supplies, marketing, insurance, etc.</li>
  <li><strong>Net Profit</strong> (bottom line): Revenue minus expenses. This is what your business actually earned (or lost).</li>
</ul>

<h2>Key Line Items to Watch</h2>
<p><strong>Gross Profit</strong> is your revenue minus the direct cost of goods or services sold (COGS). This tells you how much money you make before overhead. If gross profit is shrinking, your pricing or direct costs need attention.</p>
<p><strong>Operating Expenses</strong> are the ongoing costs of running the business that aren't directly tied to producing your product or service — rent, utilities, office supplies, marketing, and insurance. These should be relatively stable month to month.</p>
<p><strong>Net Profit</strong> is what remains after all expenses. This is the truest measure of your business's financial health. A positive net profit means you're making money; a negative number means you're losing it.</p>

<h2>Percentages Matter More Than Dollars</h2>
<p>Smart business owners look at each expense category as a percentage of revenue. If your rent is 15% of revenue and industry average is 10%, that's a red flag. Percentages also let you compare performance across months and years regardless of revenue changes.</p>

<h2>Monthly Comparison Is Key</h2>
<p>A single month's P&L tells you something, but comparing month-over-month and year-over-year tells you much more. Look for trends: Is revenue growing? Are certain expense categories creeping up? Is your profit margin improving or declining?</p>

<h2>Castle Delivers Clear Financial Reports</h2>
<p>Every Castle Bookkeeping client receives a monthly P&L with their financial package. We present it clearly so you can make informed business decisions. Contact us for a free consultation.</p>
`
  },
  {
    title: 'Bookkeeping for IT Consultants in Calgary',
    slug: 'bookkeeping-for-it-consultants-in-calgary',
    excerpt: 'Specialised bookkeeping services for Calgary IT consultants. Flat-fee plans tailored to your industry.',
    category: 'Industries',
    date: '2026-04-11',
    body: industryBody('IT Consultants'),
    metaDesc: 'Castle Bookkeeping provides flat-fee bookkeeping for Calgary IT consultants. Monthly bookkeeping, GST filing, payroll, and tax preparation. Free consultation.'
  },
  {
    title: 'Bookkeeping for Small Businesses in Rocky Ridge',
    slug: 'bookkeeping-for-small-businesses-in-rocky-ridge',
    excerpt: 'Professional bookkeeping services for small businesses in Rocky Ridge. Flat-fee monthly plans, GST filing, and payroll.',
    category: 'Neighbourhoods',
    date: '2026-04-12',
    body: neighbourhoodBody('Rocky Ridge'),
    metaDesc: 'Looking for a bookkeeper in Rocky Ridge? Castle Bookkeeping offers flat-fee monthly bookkeeping, GST filing, payroll, and tax prep for Rocky Ridge small businesses. Free consultation.'
  },
  {
    title: 'Cash vs Accrual Accounting: Which Is Right for Your Calgary Business',
    slug: 'cash-vs-accrual-accounting-which-is-right-for-your-calgary-business',
    excerpt: 'Understanding the difference between cash and accrual accounting is essential for choosing the right method for your business.',
    category: 'Guides',
    date: '2026-04-13',
    body: `
<p>Every Calgary business must choose an accounting method: cash basis or accrual basis. This choice affects how you recognise revenue and expenses, how your financial statements look, and how you file your taxes. Here is a plain-language explanation of each method and which one might be right for your business.</p>

<h2>Cash-Basis Accounting</h2>
<p>Under cash-basis accounting, you record revenue when you actually receive payment and expenses when you actually pay them. If you invoice a client in December but they don't pay until January, the revenue is recorded in January. This method is simpler and gives you a clear picture of cash flow.</p>

<h2>Accrual-Basis Accounting</h2>
<p>Under accrual-basis accounting, you record revenue when it's earned (when the work is done or the product is delivered) and expenses when they're incurred (when you receive the bill), regardless of when money actually changes hands. This gives a more accurate picture of profitability but is more complex.</p>

<h2>Which Method Should You Choose?</h2>
<p>For most Calgary small businesses — sole proprietors, partnerships, and small corporations — cash-basis accounting is simpler and perfectly acceptable for CRA. However, there are situations where accrual is required or preferable:</p>
<ul>
  <li>Corporations with revenue over $1 million may be required to use accrual</li>
  <li>Businesses with significant accounts receivable or payable benefit from accrual's more accurate profit picture</li>
  <li>Businesses seeking financing often need accrual-based financial statements</li>
</ul>

<h2>Tax Implications</h2>
<p>Your accounting method affects the timing of income and expenses on your tax return. Cash basis lets you defer income by delaying invoicing or accelerate deductions by prepaying expenses before year-end. Accrual basis provides less flexibility for tax timing but gives a truer picture of annual profitability.</p>

<h2>Can You Switch?</h2>
<p>Yes, but switching accounting methods requires CRA approval and careful transition adjustments. It's best to choose the right method from the start. Consult with your bookkeeper or accountant before making a change.</p>

<h2>Castle Can Advise</h2>
<p>Castle Bookkeeping helps Calgary business owners choose and implement the right accounting method for their situation. Contact us for a free consultation to discuss what works best for your business.</p>
`
  },
  {
    title: 'Bookkeeping for Dayhomes in Calgary',
    slug: 'bookkeeping-for-dayhomes-in-calgary',
    excerpt: 'Specialised bookkeeping services for Calgary dayhomes. Flat-fee plans tailored to your industry.',
    category: 'Industries',
    date: '2026-04-14',
    body: industryBody('Dayhomes'),
    metaDesc: 'Castle Bookkeeping provides flat-fee bookkeeping for Calgary dayhomes. Monthly bookkeeping, GST filing, payroll, and tax preparation. Free consultation.'
  },
  {
    title: 'Bookkeeping for Small Businesses in Springbank Hill',
    slug: 'bookkeeping-for-small-businesses-in-springbank-hill',
    excerpt: 'Professional bookkeeping services for small businesses in Springbank Hill. Flat-fee monthly plans, GST filing, and payroll.',
    category: 'Neighbourhoods',
    date: '2026-04-15',
    body: neighbourhoodBody('Springbank Hill'),
    metaDesc: 'Looking for a bookkeeper in Springbank Hill? Castle Bookkeeping offers flat-fee monthly bookkeeping, GST filing, payroll, and tax prep for Springbank Hill small businesses. Free consultation.'
  },
  {
    title: 'Tax Benefits of Incorporating Your Calgary Business',
    slug: 'tax-benefits-of-incorporating-your-calgary-business',
    excerpt: 'Incorporation can save Calgary business owners significant tax dollars. Here is when it makes sense.',
    category: 'Guides',
    date: '2026-04-16',
    body: `
<p>Many Calgary business owners start as sole proprietors for simplicity, but as income grows, incorporation often becomes the smarter structure. Alberta's combined small business tax rate of 11% — one of the lowest in Canada — makes incorporation particularly attractive for Calgary entrepreneurs.</p>

<h2>The Core Tax Benefit: Deferral</h2>
<p>As a sole proprietor, every dollar of business income is taxed at your personal marginal rate, which can exceed 48% in Alberta at higher income levels. An incorporated business pays just 11% on the first $500,000 of active business income. The difference — potentially 37 percentage points — stays in your corporation to reinvest, save, or invest.</p>

<h2>When Incorporation Saves Money</h2>
<p>Incorporation is most beneficial when your business earns more than you need to withdraw for personal expenses. The surplus stays in the corporation at 11% rather than being taxed at your personal rate. If you need every dollar the business earns for personal expenses, the benefit is minimal because you'll pay personal tax when you withdraw it anyway.</p>

<h2>The $80,000 Rule of Thumb</h2>
<p>A common guideline is that incorporation starts making sense when your net business income consistently exceeds $80,000 to $100,000 per year. Below that threshold, the costs of incorporation (annual corporate tax returns, legal setup fees, and separate bookkeeping) may outweigh the tax benefits.</p>

<h2>Additional Benefits of Incorporation</h2>
<ul>
  <li><strong>Limited liability</strong>. A corporation is a separate legal entity, shielding your personal assets from most business liabilities.</li>
  <li><strong>Income splitting opportunities</strong>. While TOSI rules have restricted many strategies, some opportunities remain with proper planning.</li>
  <li><strong>Lifetime capital gains exemption</strong>. Qualifying shares of a small business corporation may be eligible for over $1 million in capital gains exemptions upon sale.</li>
  <li><strong>Credibility</strong>. Some clients and partners prefer working with incorporated businesses.</li>
</ul>

<h2>Costs to Consider</h2>
<p>Incorporation adds complexity: annual corporate tax return preparation ($1,000–$2,500), separate bookkeeping for the corporation, legal incorporation fees ($1,000–$2,000), and annual Alberta corporate registry filing ($50). These costs need to be weighed against the tax benefits.</p>

<h2>Get Professional Advice</h2>
<p>The incorporation decision has long-term implications. Castle Bookkeeping can help you model the financial impact and connect you with a Calgary accountant who specialises in business structuring. Contact us for a free consultation.</p>
`
  },
  {
    title: 'Bookkeeping for Painting Companies in Calgary',
    slug: 'bookkeeping-for-painting-companies-in-calgary',
    excerpt: 'Specialised bookkeeping services for Calgary painting companies. Flat-fee plans tailored to your industry.',
    category: 'Industries',
    date: '2026-04-17',
    body: industryBody('Painting Companies'),
    metaDesc: 'Castle Bookkeeping provides flat-fee bookkeeping for Calgary painting companies. Monthly bookkeeping, GST filing, payroll, and tax preparation. Free consultation.'
  },
  {
    title: 'Bookkeeping for Small Businesses in New Brighton',
    slug: 'bookkeeping-for-small-businesses-in-new-brighton',
    excerpt: 'Professional bookkeeping services for small businesses in New Brighton. Flat-fee monthly plans, GST filing, and payroll.',
    category: 'Neighbourhoods',
    date: '2026-04-18',
    body: neighbourhoodBody('New Brighton'),
    metaDesc: 'Looking for a bookkeeper in New Brighton? Castle Bookkeeping offers flat-fee monthly bookkeeping, GST filing, payroll, and tax prep for New Brighton small businesses. Free consultation.'
  },
  {
    title: 'How to Calculate Your Break Even Point',
    slug: 'how-to-calculate-your-break-even-point',
    excerpt: 'Understanding your break-even point helps you price correctly and make smarter business decisions.',
    category: 'Guides',
    date: '2026-04-19',
    body: `
<p>Your break-even point is the level of revenue at which your Calgary business covers all its costs — no profit, no loss. Knowing this number is fundamental for pricing decisions, budgeting, and understanding how much runway you have in a slow month.</p>

<h2>The Formula</h2>
<p>Break-even point = Fixed Costs / (1 - Variable Cost Percentage)</p>
<p>Let's break that down:</p>
<ul>
  <li><strong>Fixed costs</strong> are expenses that stay the same regardless of revenue: rent, insurance, loan payments, base salaries, and software subscriptions.</li>
  <li><strong>Variable costs</strong> are expenses that change with revenue: materials, commissions, shipping, and credit-card processing fees.</li>
  <li><strong>Variable cost percentage</strong> is your total variable costs divided by total revenue.</li>
</ul>

<h2>An Example</h2>
<p>Suppose your Calgary business has $8,000/month in fixed costs and variable costs equal 40% of revenue. Your break-even calculation is: $8,000 / (1 - 0.40) = $8,000 / 0.60 = $13,333 per month. You need to generate at least $13,333 in monthly revenue to cover all costs.</p>

<h2>Why Break-Even Matters</h2>
<p>Knowing your break-even point helps you in several ways: set minimum revenue targets, price products and services to ensure profitability, evaluate the impact of adding fixed costs (like hiring or renting a larger space), and understand how much of a downturn your business can survive.</p>

<h2>Break-Even Per Product or Service</h2>
<p>For businesses with multiple products or services, calculating break-even by offering helps you identify which lines contribute the most to covering fixed costs and which may actually be dragging profitability down.</p>

<h2>Track It Monthly</h2>
<p>Your break-even point isn't static. As fixed costs change (new hires, rent increases) and variable cost percentages shift (supplier price changes), your break-even moves. Recalculating it monthly as part of your financial review keeps you informed.</p>

<h2>Castle Helps You Understand Your Numbers</h2>
<p>Castle Bookkeeping doesn't just record transactions — we help Calgary business owners understand their financial statements and make better decisions. Contact us for a free consultation.</p>
`
  },
  {
    title: 'Bookkeeping for Courier Services in Calgary',
    slug: 'bookkeeping-for-courier-services-in-calgary',
    excerpt: 'Specialised bookkeeping services for Calgary courier services. Flat-fee plans tailored to your industry.',
    category: 'Industries',
    date: '2026-04-20',
    body: industryBody('Courier Services'),
    metaDesc: 'Castle Bookkeeping provides flat-fee bookkeeping for Calgary courier services. Monthly bookkeeping, GST filing, payroll, and tax preparation. Free consultation.'
  },
  {
    title: 'Bookkeeping for Small Businesses in Arbour Lake',
    slug: 'bookkeeping-for-small-businesses-in-arbour-lake',
    excerpt: 'Professional bookkeeping services for small businesses in Arbour Lake. Flat-fee monthly plans, GST filing, and payroll.',
    category: 'Neighbourhoods',
    date: '2026-04-21',
    body: neighbourhoodBody('Arbour Lake'),
    metaDesc: 'Looking for a bookkeeper in Arbour Lake? Castle Bookkeeping offers flat-fee monthly bookkeeping, GST filing, payroll, and tax prep for Arbour Lake small businesses. Free consultation.'
  },
  {
    title: 'Understanding T4 and T5 Slips for Calgary Employers',
    slug: 'understanding-t4-and-t5-slips-for-calgary-employers',
    excerpt: 'T4 and T5 slips are critical year-end obligations. Here is what Calgary employers need to know about preparing and filing them.',
    category: 'Guides',
    date: '2026-04-22',
    body: `
<p>If your Calgary business has employees or pays certain types of income, you have year-end reporting obligations to CRA. The two most common information returns are T4 slips (for employment income) and T5 slips (for investment income). Here is what you need to know.</p>

<h2>T4 Slips: Employment Income</h2>
<p>You must prepare a T4 slip for every employee to whom you paid employment income during the calendar year. The T4 reports the employee's total earnings, income tax deducted, CPP contributions, EI premiums, and other relevant amounts. T4 slips must be filed with CRA and provided to employees by February 28 of the following year.</p>

<h2>What Goes on a T4</h2>
<ul>
  <li>Box 14: Total employment income</li>
  <li>Box 16: Employee CPP contributions</li>
  <li>Box 18: Employee EI premiums</li>
  <li>Box 22: Income tax deducted</li>
  <li>Box 40: Taxable benefits (company vehicle, health spending account, etc.)</li>
  <li>Box 44: Union dues (if applicable)</li>
</ul>

<h2>T5 Slips: Investment Income</h2>
<p>T5 slips report investment income paid to shareholders or investors. If your corporation paid dividends to shareholders during the year, you must issue T5 slips. The T5 reports the actual amount of dividends paid, the taxable amount (grossed up), and the associated dividend tax credit. T5 slips are also due by February 28.</p>

<h2>T4A Slips: Contract Payments</h2>
<p>While not T4 or T5, it's worth mentioning T4A slips. If your business paid fees, commissions, or other amounts to self-employed contractors, you may need to issue T4A slips for amounts over $500. This is an area many Calgary businesses overlook.</p>

<h2>Penalties for Late or Incorrect Filing</h2>
<p>CRA charges penalties for late T4 and T5 filing: $100 for the first day, then $25 per day up to a maximum of $2,500. Filing incorrect information can also result in penalties. Given these stakes, accuracy and timeliness are essential.</p>

<h2>Let Castle Handle Your Year-End</h2>
<p>Castle Bookkeeping prepares and files T4, T5, and T4A slips for our payroll clients. We ensure all amounts are correct, slips are delivered to recipients on time, and filings are submitted to CRA before the deadline. Contact us for a free consultation.</p>
`
  },
  {
    title: 'Bookkeeping for Optometrists in Calgary',
    slug: 'bookkeeping-for-optometrists-in-calgary',
    excerpt: 'Specialised bookkeeping services for Calgary optometrists. Flat-fee plans tailored to your industry.',
    category: 'Industries',
    date: '2026-04-23',
    body: industryBody('Optometrists'),
    metaDesc: 'Castle Bookkeeping provides flat-fee bookkeeping for Calgary optometrists. Monthly bookkeeping, GST filing, payroll, and tax preparation. Free consultation.'
  },
  {
    title: 'Bookkeeping for Small Businesses in Somerset',
    slug: 'bookkeeping-for-small-businesses-in-somerset',
    excerpt: 'Professional bookkeeping services for small businesses in Somerset. Flat-fee monthly plans, GST filing, and payroll.',
    category: 'Neighbourhoods',
    date: '2026-04-24',
    body: neighbourhoodBody('Somerset'),
    metaDesc: 'Looking for a bookkeeper in Somerset? Castle Bookkeeping offers flat-fee monthly bookkeeping, GST filing, payroll, and tax prep for Somerset small businesses. Free consultation.'
  },
  {
    title: 'How to Set Up Payroll for Your First Employee in Alberta',
    slug: 'how-to-set-up-payroll-for-your-first-employee-in-alberta',
    excerpt: 'Hiring your first employee is exciting but comes with payroll obligations. Here is a step-by-step setup guide.',
    category: 'Guides',
    date: '2026-04-25',
    body: `
<p>Hiring your first employee is a major milestone for your Calgary business — but it also triggers a set of legal obligations around payroll. Getting the setup right from the start saves headaches and avoids CRA penalties down the road. Here is your step-by-step guide.</p>

<h2>Step 1: Register for a Payroll Account with CRA</h2>
<p>Before your first pay run, you need a payroll program account with CRA. You can register online through CRA Business Registration Online or by calling CRA's business enquiries line. CRA will assign you a payroll account number and tell you your remittance frequency.</p>

<h2>Step 2: Collect Employee Information</h2>
<p>Have your new employee complete a TD1 (federal) and TD1AB (Alberta provincial) Personal Tax Credits Return form. These forms determine how much income tax to withhold from their pay. Also collect their Social Insurance Number (SIN), full legal name, address, and banking information for direct deposit.</p>

<h2>Step 3: Determine Pay Frequency and Structure</h2>
<p>Decide how often you'll pay (weekly, bi-weekly, semi-monthly, or monthly) and whether the employee is salaried or hourly. Alberta's minimum wage is $15.00 per hour as of 2026. Ensure your pay rate complies with Employment Standards.</p>

<h2>Step 4: Set Up Payroll Software</h2>
<p>Use payroll software that handles Canadian source deduction calculations. QuickBooks Online Payroll is a popular choice for Calgary small businesses — it calculates deductions, generates pay stubs, handles direct deposit, and prepares T4s. Other options include Wagepoint, Humi, and ADP.</p>

<h2>Step 5: Run Your First Payroll</h2>
<p>For each pay period, calculate gross pay, then deduct federal and provincial income tax, CPP (employee and employer portions), and EI (employee and employer portions). The net amount is what the employee receives. The deductions plus employer contributions are what you remit to CRA.</p>

<h2>Step 6: Remit to CRA</h2>
<p>Remit source deductions by your assigned due date (typically the 15th of the following month for new, small employers). Late remittances attract penalties from 3% to 20% depending on how late and whether it's a repeat offence.</p>

<h2>Step 7: Keep Records</h2>
<p>Maintain payroll records for at least six years: pay stubs, TD1 forms, time records, and remittance confirmations. These are essential for T4 preparation and CRA audits.</p>

<h2>Castle Makes Payroll Simple</h2>
<p>Setting up and running payroll correctly is one of the most compliance-sensitive tasks a business owner faces. Castle Bookkeeping handles payroll setup, ongoing processing, CRA remittances, and year-end T4s for Calgary small businesses. Contact us for a free consultation.</p>
`
  },
  {
    title: 'Bookkeeping for Roofing Companies in Calgary',
    slug: 'bookkeeping-for-roofing-companies-in-calgary',
    excerpt: 'Specialised bookkeeping services for Calgary roofing companies. Flat-fee plans tailored to your industry.',
    category: 'Industries',
    date: '2026-04-26',
    body: industryBody('Roofing Companies'),
    metaDesc: 'Castle Bookkeeping provides flat-fee bookkeeping for Calgary roofing companies. Monthly bookkeeping, GST filing, payroll, and tax preparation. Free consultation.'
  },
  {
    title: 'Bookkeeping for Small Businesses in Midnapore',
    slug: 'bookkeeping-for-small-businesses-in-midnapore',
    excerpt: 'Professional bookkeeping services for small businesses in Midnapore. Flat-fee monthly plans, GST filing, and payroll.',
    category: 'Neighbourhoods',
    date: '2026-04-27',
    body: neighbourhoodBody('Midnapore'),
    metaDesc: 'Looking for a bookkeeper in Midnapore? Castle Bookkeeping offers flat-fee monthly bookkeeping, GST filing, payroll, and tax prep for Midnapore small businesses. Free consultation.'
  },
  {
    title: 'Q2 Tax Planning Tips for Calgary Small Businesses',
    slug: 'q2-tax-planning-tips-for-calgary-small-businesses',
    excerpt: 'Smart tax planning in Q2 sets you up for a better year-end. Here are actionable tips for Calgary businesses.',
    category: 'Seasonal',
    date: '2026-04-28',
    body: `
<p>The second quarter (April through June) is an ideal time for Calgary business owners to take stock of their financial year so far and make strategic tax-planning moves. With the first quarter's data in hand, you have enough information to project your annual income and take proactive steps to minimise your tax burden.</p>

<h2>1. Review Your Q1 Financial Statements</h2>
<p>Pull your income statement for January through March and compare it to the same period last year and to your budget. Are revenues on track? Are any expense categories trending higher than expected? This review gives you the baseline for projecting your full-year income and tax liability.</p>

<h2>2. Estimate Your Annual Tax Liability</h2>
<p>Based on Q1 results, project your expected annual income. For sole proprietors, estimate your personal tax. For corporations, estimate your corporate tax. If the number is higher than expected, you have nine months to take action: accelerate deductible expenses, make planned capital purchases, or increase RRSP contributions.</p>

<h2>3. Make Planned Capital Purchases Now</h2>
<p>If you've been considering equipment, vehicle, or technology purchases, buying earlier in the year maximises your Capital Cost Allowance (CCA) claim. The Accelerated Investment Incentive allows enhanced first-year depreciation, and purchasing in Q2 gives you more months of use in the current tax year.</p>

<h2>4. Review Your Corporate Structure</h2>
<p>If you're a sole proprietor with growing income, Q2 is a good time to evaluate whether incorporation would save you tax in the current or following year. Alberta's 11% combined small business rate compared to personal rates of up to 48% creates significant deferral opportunities.</p>

<h2>5. Catch Up on Any Missed Filings</h2>
<p>Use Q2 to ensure all Q1 obligations are current: GST return filed, payroll remittances made, and any corporate instalments paid. Being current on all filings is the foundation of effective tax planning.</p>

<h2>6. Set Aside Funds for Tax Payments</h2>
<p>If you are making quarterly tax instalments, ensure your next instalment amount reflects your current income trajectory. Underpaying instalments results in interest charges from CRA.</p>

<h2>Plan Proactively With Castle</h2>
<p>Castle Bookkeeping provides monthly financial statements that make tax planning straightforward. When your numbers are current, you can make informed decisions rather than reacting at year-end. Contact us for a free consultation.</p>
`
  },
  {
    title: 'Bookkeeping for Fencing Companies in Calgary',
    slug: 'bookkeeping-for-fencing-companies-in-calgary',
    excerpt: 'Specialised bookkeeping services for Calgary fencing companies. Flat-fee plans tailored to your industry.',
    category: 'Industries',
    date: '2026-04-29',
    body: industryBody('Fencing Companies'),
    metaDesc: 'Castle Bookkeeping provides flat-fee bookkeeping for Calgary fencing companies. Monthly bookkeeping, GST filing, payroll, and tax preparation. Free consultation.'
  },
  {
    title: 'Bookkeeping for Small Businesses in Strathcona Park',
    slug: 'bookkeeping-for-small-businesses-in-strathcona-park',
    excerpt: 'Professional bookkeeping services for small businesses in Strathcona Park. Flat-fee monthly plans, GST filing, and payroll.',
    category: 'Neighbourhoods',
    date: '2026-04-30',
    body: neighbourhoodBody('Strathcona Park'),
    metaDesc: 'Looking for a bookkeeper in Strathcona Park? Castle Bookkeeping offers flat-fee monthly bookkeeping, GST filing, payroll, and tax prep for Strathcona Park small businesses. Free consultation.'
  },

  // ── May 1–31 ──
  {
    title: 'Bookkeeping for Small Businesses in Parkland',
    slug: 'bookkeeping-for-small-businesses-in-parkland',
    excerpt: 'Professional bookkeeping services for small businesses in Parkland. Flat-fee monthly plans, GST filing, and payroll.',
    category: 'Neighbourhoods',
    date: '2026-05-01',
    body: neighbourhoodBody('Parkland'),
    metaDesc: 'Looking for a bookkeeper in Parkland? Castle Bookkeeping offers flat-fee monthly bookkeeping, GST filing, payroll, and tax prep for Parkland small businesses. Free consultation.'
  },
  {
    title: 'How to Track Inventory for Your Calgary Retail Business',
    slug: 'how-to-track-inventory-for-your-calgary-retail-business',
    excerpt: 'Proper inventory tracking protects your margins and keeps your books accurate. Here is how to do it right.',
    category: 'Guides',
    date: '2026-05-02',
    body: `
<p>For Calgary retail businesses, inventory is often your largest asset and your biggest expense. Tracking it accurately is essential for understanding your true profitability, managing cash flow, and filing correct tax returns. Yet many small retailers rely on rough estimates or outdated methods that leave money on the table.</p>

<h2>Why Inventory Tracking Matters</h2>
<p>Without accurate inventory records, you cannot calculate your true cost of goods sold (COGS), which means your profit and loss statement is unreliable. You may also miss shrinkage (theft, damage, spoilage), over-order slow-moving products, or run out of your best sellers. From a tax perspective, your year-end inventory value directly affects your taxable income.</p>

<h2>Perpetual vs. Periodic Inventory</h2>
<p>There are two main approaches. Perpetual inventory tracking updates your records in real time as items are bought and sold — this is ideal and is supported by most modern POS systems. Periodic inventory relies on physical counts at set intervals (monthly, quarterly, annually) to calculate COGS. Perpetual is more accurate; periodic is simpler but less reliable.</p>

<h2>Setting Up Inventory in Your Accounting Software</h2>
<p>QuickBooks Online and Xero both support inventory tracking. Set up each product with its cost price, selling price, and reorder point. Connect your POS system so sales automatically reduce inventory quantities. Reconcile your software inventory against physical counts regularly.</p>

<h2>The Physical Count</h2>
<p>Even with perpetual tracking, you need periodic physical counts to catch discrepancies. Schedule a full count at least annually (ideally at your fiscal year-end) and spot-check high-value or high-volume items monthly. Document your counts — CRA may request this documentation during an audit.</p>

<h2>FIFO vs. Average Cost</h2>
<p>CRA allows several inventory valuation methods. FIFO (First In, First Out) assumes the oldest inventory is sold first. Average cost calculates a weighted average cost per unit. Both are acceptable; choose one and apply it consistently. Switching methods requires CRA notification.</p>

<h2>Castle Helps Retailers Track Inventory</h2>
<p>Castle Bookkeeping works with Calgary retailers to set up inventory tracking systems, reconcile inventory records, and ensure COGS is calculated accurately on financial statements. Contact us for a free consultation.</p>
`
  },
  {
    title: 'Bookkeeping for Catering Companies in Calgary',
    slug: 'bookkeeping-for-catering-companies-in-calgary',
    excerpt: 'Specialised bookkeeping services for Calgary catering companies. Flat-fee plans tailored to your industry.',
    category: 'Industries',
    date: '2026-05-03',
    body: industryBody('Catering Companies'),
    metaDesc: 'Castle Bookkeeping provides flat-fee bookkeeping for Calgary catering companies. Monthly bookkeeping, GST filing, payroll, and tax preparation. Free consultation.'
  },
  {
    title: 'Bookkeeping for Small Businesses in Sundance',
    slug: 'bookkeeping-for-small-businesses-in-sundance',
    excerpt: 'Professional bookkeeping services for small businesses in Sundance. Flat-fee monthly plans, GST filing, and payroll.',
    category: 'Neighbourhoods',
    date: '2026-05-04',
    body: neighbourhoodBody('Sundance'),
    metaDesc: 'Looking for a bookkeeper in Sundance? Castle Bookkeeping offers flat-fee monthly bookkeeping, GST filing, payroll, and tax prep for Sundance small businesses. Free consultation.'
  },
  {
    title: 'What Is a T2 Corporate Tax Return and When Is It Due',
    slug: 'what-is-a-t2-corporate-tax-return-and-when-is-it-due',
    excerpt: 'If your Calgary business is incorporated, you need to file a T2 return. Here is what you need to know.',
    category: 'Guides',
    date: '2026-05-05',
    body: `
<p>Every corporation in Canada — including your Calgary incorporated business — must file a T2 Corporate Income Tax Return with CRA every year, even if the corporation had no income or was inactive. Here is a straightforward guide to what the T2 is, when it's due, and what's involved.</p>

<h2>What Is a T2 Return?</h2>
<p>The T2 is the annual income tax return for corporations. It reports the corporation's income, deductions, and tax owing for the fiscal year. Unlike personal tax returns, which always cover the calendar year, a T2 covers your corporation's fiscal year — which can end on any date you choose when incorporating.</p>

<h2>When Is the T2 Due?</h2>
<p>Your T2 return is due six months after the end of your fiscal year. If your fiscal year ends December 31, 2025, your T2 is due June 30, 2026. If your year ends March 31, 2026, it's due September 30, 2026. However, any tax balance owing is due two or three months after year-end (depending on your corporation's size), regardless of the filing deadline.</p>

<h2>What's Included in the T2?</h2>
<p>The T2 package includes the main return plus various schedules. Key components include: Schedule 1 (net income reconciliation), Schedule 8 (Capital Cost Allowance), Schedule 50 (shareholder information), and financial statements. Most T2s must be filed electronically, and professional tax software is typically required to prepare them.</p>

<h2>Penalties for Late Filing</h2>
<p>If you file late and owe tax, CRA charges a penalty of 5% of the unpaid tax plus 1% per month for up to 12 months. If you've been penalised for late filing in a recent year, the penalty doubles to 10% plus 2% per month. These penalties add up quickly.</p>

<h2>Can You Prepare Your Own T2?</h2>
<p>Technically yes, but the T2 is significantly more complex than a personal return. Most Calgary business owners have their accountant prepare the T2 using the financial statements provided by their bookkeeper. Accurate, complete bookkeeping is the foundation of an accurate T2.</p>

<h2>Castle Prepares Your Financial Package</h2>
<p>Castle Bookkeeping prepares the complete year-end financial package your accountant needs to file your T2: income statement, balance sheet, and all supporting schedules. We ensure your records are clean and tax-ready. Contact us for a free consultation.</p>
`
  },
  {
    title: 'Bookkeeping for Dog Walkers and Pet Sitters in Calgary',
    slug: 'bookkeeping-for-dog-walkers-and-pet-sitters-in-calgary',
    excerpt: 'Specialised bookkeeping services for Calgary dog walkers and pet sitters. Flat-fee plans tailored to your industry.',
    category: 'Industries',
    date: '2026-05-06',
    body: industryBody('Dog Walkers and Pet Sitters'),
    metaDesc: 'Castle Bookkeeping provides flat-fee bookkeeping for Calgary dog walkers and pet sitters. Monthly bookkeeping, GST filing, payroll, and tax preparation. Free consultation.'
  },
  {
    title: 'Bookkeeping for Small Businesses in Edgemont',
    slug: 'bookkeeping-for-small-businesses-in-edgemont',
    excerpt: 'Professional bookkeeping services for small businesses in Edgemont. Flat-fee monthly plans, GST filing, and payroll.',
    category: 'Neighbourhoods',
    date: '2026-05-07',
    body: neighbourhoodBody('Edgemont'),
    metaDesc: 'Looking for a bookkeeper in Edgemont? Castle Bookkeeping offers flat-fee monthly bookkeeping, GST filing, payroll, and tax prep for Edgemont small businesses. Free consultation.'
  },
  {
    title: 'How to Handle Multi Currency Transactions in QuickBooks',
    slug: 'how-to-handle-multi-currency-transactions-in-quickbooks',
    excerpt: 'If your Calgary business deals in USD or other currencies, here is how to handle multi-currency in QuickBooks Online.',
    category: 'Guides',
    date: '2026-05-08',
    body: `
<p>Many Calgary businesses transact in multiple currencies — purchasing from US suppliers, invoicing international clients, or receiving payments through platforms that settle in USD. QuickBooks Online has multi-currency features, but they require careful setup and ongoing management to keep your books accurate.</p>

<h2>Enabling Multi-Currency</h2>
<p>In QBO, multi-currency is a one-way switch — once enabled, it cannot be turned off. Before enabling it, ensure you actually need it. If you only have occasional foreign transactions, it may be simpler to record them manually in CAD using the exchange rate at the time of the transaction. If you regularly transact in other currencies, enabling multi-currency is the right move.</p>

<h2>How It Works</h2>
<p>Once enabled, you can assign currencies to customers, vendors, and bank accounts. QBO automatically uses the exchange rate for the transaction date. When you receive payment on a USD invoice, QBO calculates the exchange gain or loss based on the rate difference between the invoice date and the payment date.</p>

<h2>Exchange Gains and Losses</h2>
<p>Currency fluctuations create gains or losses that affect your bottom line. If you invoice a US client for $1,000 USD when the rate is 1.35, your expected CAD revenue is $1,350. If they pay when the rate is 1.38, you receive $1,380 — a $30 exchange gain. The reverse creates a loss. QBO tracks these automatically in an Exchange Gain/Loss account.</p>

<h2>Bank Account Reconciliation</h2>
<p>If you have a USD bank account, set it up in QBO as a USD account. Reconcile it in USD against your USD bank statement. QBO will handle the CAD conversion for reporting purposes. Do not try to reconcile a USD bank account in CAD — the exchange rate differences will make reconciliation impossible.</p>

<h2>Common Mistakes</h2>
<ul>
  <li>Entering USD transactions in a CAD account at the converted amount — this bypasses QBO's exchange tracking</li>
  <li>Not reconciling the exchange gain/loss account regularly</li>
  <li>Using incorrect exchange rates for year-end revaluation of foreign-currency balances</li>
</ul>

<h2>Castle Handles Multi-Currency Bookkeeping</h2>
<p>Multi-currency bookkeeping adds complexity that requires careful attention. Castle Bookkeeping manages multi-currency setups, reconciliation, and exchange gain/loss tracking for Calgary businesses with international transactions. Contact us for a free consultation.</p>
`
  },
  {
    title: 'Bookkeeping for Window Cleaning Companies in Calgary',
    slug: 'bookkeeping-for-window-cleaning-companies-in-calgary',
    excerpt: 'Specialised bookkeeping services for Calgary window cleaning companies. Flat-fee plans tailored to your industry.',
    category: 'Industries',
    date: '2026-05-09',
    body: industryBody('Window Cleaning Companies'),
    metaDesc: 'Castle Bookkeeping provides flat-fee bookkeeping for Calgary window cleaning companies. Monthly bookkeeping, GST filing, payroll, and tax preparation. Free consultation.'
  },
  {
    title: 'Bookkeeping for Small Businesses in Hamptons',
    slug: 'bookkeeping-for-small-businesses-in-hamptons',
    excerpt: 'Professional bookkeeping services for small businesses in Hamptons. Flat-fee monthly plans, GST filing, and payroll.',
    category: 'Neighbourhoods',
    date: '2026-05-10',
    body: neighbourhoodBody('Hamptons'),
    metaDesc: 'Looking for a bookkeeper in Hamptons? Castle Bookkeeping offers flat-fee monthly bookkeeping, GST filing, payroll, and tax prep for Hamptons small businesses. Free consultation.'
  },
  {
    title: 'Summer Staffing and Payroll Tips for Calgary Businesses',
    slug: 'summer-staffing-and-payroll-tips-for-calgary-businesses',
    excerpt: 'Hiring summer staff? Here is how to handle seasonal payroll correctly and stay CRA compliant.',
    category: 'Seasonal',
    date: '2026-05-11',
    body: `
<p>Summer is hiring season for many Calgary businesses. Restaurants, landscaping companies, camps, retailers, and tourism operators all bring on seasonal staff to handle increased demand. Hiring temporary employees comes with the same payroll obligations as permanent hires, and getting the setup right avoids CRA problems down the road.</p>

<h2>Employee vs. Contractor: Get the Classification Right</h2>
<p>Before you hire, determine whether your summer worker is an employee or an independent contractor. CRA uses several tests: do you control how, when, and where the work is done? Does the worker provide their own tools? Can they hire their own helpers? Do they bear financial risk? If you control the work, they're likely an employee. Misclassifying employees as contractors is one of the most penalised mistakes by CRA.</p>

<h2>Setting Up New Employees</h2>
<p>For each new summer hire, collect their SIN, have them complete TD1 and TD1AB forms, and set up their payroll in your system. Even if they'll only work for a few months, all standard deductions apply: income tax, CPP (if they're 18 or older), and EI.</p>

<h2>Students and Payroll</h2>
<p>Student employees are treated the same as other employees for payroll purposes. However, many students earn below the basic personal amount threshold and may not have income tax deducted from their paycheques (depending on their TD1 elections). CPP and EI deductions still apply once they meet the minimum thresholds.</p>

<h2>Alberta Employment Standards for Summer Workers</h2>
<p>Alberta's Employment Standards apply to all employees, including seasonal workers. Key requirements include: minimum wage ($15.00/hour), overtime after 8 hours per day or 44 hours per week, statutory holiday pay for Canada Day and any holidays during their employment, and proper termination notice or pay in lieu.</p>

<h2>End of Season Obligations</h2>
<p>When your summer staff finishes, issue ROEs within five calendar days. At year-end, include them on your T4 summary even if they only worked a few weeks. All source deductions collected must be accounted for.</p>

<h2>Castle Handles Seasonal Payroll</h2>
<p>Castle Bookkeeping helps Calgary businesses set up and manage seasonal payroll, ensuring new hires are processed correctly, deductions are accurate, and year-end reporting is complete. Contact us for a free consultation.</p>
`
  },
  {
    title: 'Bookkeeping for Graphic Designers in Calgary',
    slug: 'bookkeeping-for-graphic-designers-in-calgary',
    excerpt: 'Specialised bookkeeping services for Calgary graphic designers. Flat-fee plans tailored to your industry.',
    category: 'Industries',
    date: '2026-05-12',
    body: industryBody('Graphic Designers'),
    metaDesc: 'Castle Bookkeeping provides flat-fee bookkeeping for Calgary graphic designers. Monthly bookkeeping, GST filing, payroll, and tax preparation. Free consultation.'
  },
  {
    title: 'Bookkeeping for Small Businesses in Scenic Acres',
    slug: 'bookkeeping-for-small-businesses-in-scenic-acres',
    excerpt: 'Professional bookkeeping services for small businesses in Scenic Acres. Flat-fee monthly plans, GST filing, and payroll.',
    category: 'Neighbourhoods',
    date: '2026-05-13',
    body: neighbourhoodBody('Scenic Acres'),
    metaDesc: 'Looking for a bookkeeper in Scenic Acres? Castle Bookkeeping offers flat-fee monthly bookkeeping, GST filing, payroll, and tax prep for Scenic Acres small businesses. Free consultation.'
  },
  {
    title: 'How to Manage Accounts Receivable in a Small Business',
    slug: 'how-to-manage-accounts-receivable-in-a-small-business',
    excerpt: 'Getting paid on time is essential for cash flow. Here is how Calgary small businesses can manage receivables effectively.',
    category: 'Guides',
    date: '2026-05-14',
    body: `
<p>Accounts receivable — the money customers owe you — is one of the most critical areas of small business financial management. For Calgary businesses that invoice clients rather than collecting payment at the point of sale, managing receivables effectively is the difference between healthy cash flow and constant stress.</p>

<h2>Set Clear Payment Terms</h2>
<p>Your payment terms should be clearly stated on every invoice. Common terms include Net 15 (due in 15 days), Net 30 (due in 30 days), or Due on Receipt. Shorter terms generally mean faster payment, but you need to be realistic about your industry's norms. Whatever terms you choose, communicate them upfront and apply them consistently.</p>

<h2>Invoice Promptly</h2>
<p>The faster you send an invoice, the faster you get paid. Waiting weeks to invoice after completing work delays your payment cycle and signals to clients that payment isn't urgent. Invoice the same day the work is completed or the product is delivered.</p>

<h2>Run an Aging Report Weekly</h2>
<p>An aging report categorises your outstanding invoices by how overdue they are: current, 1-30 days, 31-60 days, 61-90 days, and over 90 days. Review this report weekly. Invoices that are 30+ days overdue need immediate follow-up. Invoices over 90 days may become uncollectible.</p>

<h2>Follow Up Systematically</h2>
<p>Have a consistent follow-up process. Send a friendly reminder at 7 days past due. Follow up by phone at 14 days. Send a formal notice at 30 days. At 60+ days, consider whether the debt is collectible or should be written off. Accounting software can automate reminder emails.</p>

<h2>Offer Multiple Payment Methods</h2>
<p>The easier you make it to pay, the faster payment arrives. Accept credit cards, e-transfer, and online payments through your invoicing software. The small processing fee is worth the faster collection.</p>

<h2>Know When to Write Off</h2>
<p>If a client cannot or will not pay, write off the invoice as a bad debt. You can deduct bad debts on your tax return and recover the GST you remitted on the original invoice. Carrying stale receivables inflates your books and gives you a false picture of your financial position.</p>

<h2>Castle Manages Your Receivables</h2>
<p>Castle Bookkeeping tracks accounts receivable for our clients, runs aging reports, and flags overdue invoices for follow-up. Clean receivables management is part of our monthly bookkeeping service. Contact us for a free consultation.</p>
`
  },
  {
    title: 'Bookkeeping for Snow Removal Companies in Calgary',
    slug: 'bookkeeping-for-snow-removal-companies-in-calgary',
    excerpt: 'Specialised bookkeeping services for Calgary snow removal companies. Flat-fee plans tailored to your industry.',
    category: 'Industries',
    date: '2026-05-15',
    body: industryBody('Snow Removal Companies'),
    metaDesc: 'Castle Bookkeeping provides flat-fee bookkeeping for Calgary snow removal companies. Monthly bookkeeping, GST filing, payroll, and tax preparation. Free consultation.'
  },
  {
    title: 'Bookkeeping for Small Businesses in Woodlands',
    slug: 'bookkeeping-for-small-businesses-in-woodlands',
    excerpt: 'Professional bookkeeping services for small businesses in Woodlands. Flat-fee monthly plans, GST filing, and payroll.',
    category: 'Neighbourhoods',
    date: '2026-05-16',
    body: neighbourhoodBody('Woodlands'),
    metaDesc: 'Looking for a bookkeeper in Woodlands? Castle Bookkeeping offers flat-fee monthly bookkeeping, GST filing, payroll, and tax prep for Woodlands small businesses. Free consultation.'
  },
  {
    title: 'When Should Your Calgary Business Register for GST',
    slug: 'when-should-your-calgary-business-register-for-gst',
    excerpt: 'GST registration is mandatory at $30,000 in revenue, but should you register sooner? Here is what to consider.',
    category: 'Guides',
    date: '2026-05-17',
    body: `
<p>In Canada, businesses that earn more than $30,000 in worldwide taxable revenue over four consecutive calendar quarters must register for and collect GST. But what if you haven't hit that threshold yet? Should you register voluntarily? Here is what Calgary business owners need to consider.</p>

<h2>The Mandatory Registration Threshold</h2>
<p>Once your total worldwide revenue from taxable supplies exceeds $30,000 in any four consecutive calendar quarters, you are no longer a "small supplier" and must register for GST. You then have 29 days to register and must begin collecting GST immediately. Note: the threshold is based on revenue, not profit.</p>

<h2>When Voluntary Registration Makes Sense</h2>
<p>Even if you're below $30,000, voluntary GST registration can be beneficial in several situations:</p>
<ul>
  <li><strong>You have significant startup expenses</strong>. If you're spending heavily on equipment, renovation, or inventory before your revenue ramps up, registering lets you claim Input Tax Credits (ITCs) on the GST you're paying — money back in your pocket.</li>
  <li><strong>Your clients are other businesses</strong>. B2B clients expect to see GST on your invoices. Not having a GST number can make your business appear less established or professional.</li>
  <li><strong>You're approaching the threshold</strong>. If you're close to $30,000, registering proactively avoids the scramble of retroactive registration and potential penalties.</li>
</ul>

<h2>When Staying Unregistered Makes Sense</h2>
<p>If your customers are primarily consumers (not businesses) and your revenue is well below $30,000, staying unregistered keeps things simple. You don't charge GST, so your prices are effectively 5% lower than registered competitors — a small advantage in price-sensitive markets.</p>

<h2>How to Register</h2>
<p>Register online through CRA Business Registration Online or by calling CRA's business enquiries line. You'll receive a GST/HST account number. Choose your filing frequency (annual, quarterly, or monthly) based on your revenue level and preferences.</p>

<h2>Common Mistakes</h2>
<ul>
  <li>Not tracking revenue against the $30,000 threshold</li>
  <li>Exceeding the threshold without registering — CRA can assess retroactive GST on sales that should have included tax</li>
  <li>Registering but not collecting GST — you are personally liable for the GST even if you didn't charge it</li>
</ul>

<h2>Castle Can Guide You</h2>
<p>Castle Bookkeeping helps Calgary businesses determine when to register, handles the registration process, sets up GST tracking in your accounting software, and files your returns. Contact us for a free consultation.</p>
`
  },
  {
    title: 'Bookkeeping for Music Teachers in Calgary',
    slug: 'bookkeeping-for-music-teachers-in-calgary',
    excerpt: 'Specialised bookkeeping services for Calgary music teachers. Flat-fee plans tailored to your industry.',
    category: 'Industries',
    date: '2026-05-18',
    body: industryBody('Music Teachers'),
    metaDesc: 'Castle Bookkeeping provides flat-fee bookkeeping for Calgary music teachers. Monthly bookkeeping, GST filing, payroll, and tax preparation. Free consultation.'
  },
  {
    title: 'Bookkeeping for Small Businesses in Thorncliffe',
    slug: 'bookkeeping-for-small-businesses-in-thorncliffe',
    excerpt: 'Professional bookkeeping services for small businesses in Thorncliffe. Flat-fee monthly plans, GST filing, and payroll.',
    category: 'Neighbourhoods',
    date: '2026-05-19',
    body: neighbourhoodBody('Thorncliffe'),
    metaDesc: 'Looking for a bookkeeper in Thorncliffe? Castle Bookkeeping offers flat-fee monthly bookkeeping, GST filing, payroll, and tax prep for Thorncliffe small businesses. Free consultation.'
  },
  {
    title: 'How CRA Determines If You Are Self Employed',
    slug: 'how-cra-determines-if-you-are-self-employed',
    excerpt: 'Employee vs self-employed is not always clear. Here is how CRA makes the determination and why it matters.',
    category: 'Guides',
    date: '2026-05-20',
    body: `
<p>One of the most consequential questions in Canadian tax law is whether a worker is an employee or self-employed. The distinction affects CPP contributions, EI eligibility, tax deductions, GST obligations, and potential CRA penalties. Here is how CRA makes the determination.</p>

<h2>Why It Matters</h2>
<p>If a worker is an employee, the business must deduct income tax, CPP, and EI from their pay and remit employer contributions. If the worker is self-employed, no deductions are made — the worker handles their own taxes. Misclassifying an employee as self-employed means the business owes retroactive CPP, EI, and penalties, potentially for multiple years.</p>

<h2>CRA's Tests</h2>
<p>CRA examines the overall working relationship using several factors:</p>
<ul>
  <li><strong>Control</strong>. Does the business control how, when, and where the work is done? More control = employee.</li>
  <li><strong>Tools and equipment</strong>. Does the business provide the tools? If yes, that points to employment. Self-employed workers typically provide their own.</li>
  <li><strong>Financial risk</strong>. Can the worker profit or lose money on the engagement? Self-employed workers bear financial risk; employees do not.</li>
  <li><strong>Integration</strong>. Is the worker integrated into the business's operations, or are they providing an independent service?</li>
  <li><strong>Intent</strong>. What did both parties intend? A written contract helps, but CRA looks at the reality of the relationship, not just the paperwork.</li>
</ul>

<h2>Common Calgary Scenarios</h2>
<p>A plumber who works set hours at your shop using your tools? Likely an employee. A web designer who works from home, sets their own hours, has multiple clients, and uses their own equipment? Likely self-employed. A delivery driver who works exclusively for your company and follows your routes? Probably an employee despite being called a "contractor."</p>

<h2>Consequences of Getting It Wrong</h2>
<p>If CRA reclassifies a contractor as an employee, the business owes both the employer and employee portions of CPP and EI for the entire period of misclassification, plus interest and penalties. The amounts can be substantial, especially if multiple workers are involved.</p>

<h2>Protect Your Business</h2>
<p>Castle Bookkeeping helps Calgary business owners evaluate their worker classifications and set up proper payroll or contractor payment structures. If you're unsure about the status of your workers, contact us for a free consultation before CRA decides for you.</p>
`
  },
  {
    title: 'Bookkeeping for Demolition Companies in Calgary',
    slug: 'bookkeeping-for-demolition-companies-in-calgary',
    excerpt: 'Specialised bookkeeping services for Calgary demolition companies. Flat-fee plans tailored to your industry.',
    category: 'Industries',
    date: '2026-05-21',
    body: industryBody('Demolition Companies'),
    metaDesc: 'Castle Bookkeeping provides flat-fee bookkeeping for Calgary demolition companies. Monthly bookkeeping, GST filing, payroll, and tax preparation. Free consultation.'
  },
  {
    title: 'Bookkeeping for Small Businesses in Deer Ridge',
    slug: 'bookkeeping-for-small-businesses-in-deer-ridge',
    excerpt: 'Professional bookkeeping services for small businesses in Deer Ridge. Flat-fee monthly plans, GST filing, and payroll.',
    category: 'Neighbourhoods',
    date: '2026-05-22',
    body: neighbourhoodBody('Deer Ridge'),
    metaDesc: 'Looking for a bookkeeper in Deer Ridge? Castle Bookkeeping offers flat-fee monthly bookkeeping, GST filing, payroll, and tax prep for Deer Ridge small businesses. Free consultation.'
  },
  {
    title: 'Understanding the Home Office Deduction in Alberta',
    slug: 'understanding-the-home-office-deduction-in-alberta',
    excerpt: 'Working from home? You may be eligible for significant tax deductions. Here is how the home office deduction works.',
    category: 'Guides',
    date: '2026-05-23',
    body: `
<p>Thousands of Calgary business owners operate from a home office — freelancers, consultants, trades contractors, and online sellers who use a dedicated space in their home for business. If this describes you, you may be eligible for a valuable tax deduction that reduces your taxable income.</p>

<h2>Who Qualifies?</h2>
<p>To claim the home office deduction, one of two conditions must be met: your home office must be your principal place of business (where you do most of your work), or you must use the space exclusively and regularly to meet clients or customers. A bedroom that doubles as an office on evenings and weekends does not qualify unless it meets one of these tests.</p>

<h2>What You Can Deduct</h2>
<p>Eligible expenses include a proportionate share of:</p>
<ul>
  <li>Rent (if you rent your home)</li>
  <li>Mortgage interest (not principal — and only if you're self-employed, not incorporated)</li>
  <li>Property taxes</li>
  <li>Home insurance</li>
  <li>Utilities (heat, electricity, water)</li>
  <li>Internet (the business-use portion)</li>
  <li>Maintenance and minor repairs</li>
</ul>

<h2>Calculating the Business-Use Percentage</h2>
<p>The most common method is to divide the area of your home office by the total area of your home. If your office is 150 square feet and your home is 1,500 square feet, your business-use percentage is 10%. Apply this percentage to all eligible expenses.</p>

<h2>Self-Employed vs. Incorporated</h2>
<p>If you're a sole proprietor, you claim the home office deduction on your T2125 (Statement of Business Activities) as part of your personal tax return. If you're incorporated, you can either charge the corporation a reasonable rent for the use of your home office (which creates rental income for you personally) or have the corporation reimburse you for the expenses. The tax treatment differs, so consult your accountant.</p>

<h2>Documentation Requirements</h2>
<p>Keep records of all home expenses, your office measurements, and your calculation methodology. CRA can request this documentation at any time. Photos of your dedicated office space can also be helpful evidence in an audit.</p>

<h2>Castle Calculates Your Deduction</h2>
<p>Castle Bookkeeping helps Calgary business owners calculate their home office deduction accurately, ensuring they claim every eligible dollar while maintaining CRA compliance. Contact us for a free consultation.</p>
`
  },
  {
    title: 'Bookkeeping for Flooring Companies in Calgary',
    slug: 'bookkeeping-for-flooring-companies-in-calgary',
    excerpt: 'Specialised bookkeeping services for Calgary flooring companies. Flat-fee plans tailored to your industry.',
    category: 'Industries',
    date: '2026-05-24',
    body: industryBody('Flooring Companies'),
    metaDesc: 'Castle Bookkeeping provides flat-fee bookkeeping for Calgary flooring companies. Monthly bookkeeping, GST filing, payroll, and tax preparation. Free consultation.'
  },
  {
    title: 'Bookkeeping for Small Businesses in Braeside',
    slug: 'bookkeeping-for-small-businesses-in-braeside',
    excerpt: 'Professional bookkeeping services for small businesses in Braeside. Flat-fee monthly plans, GST filing, and payroll.',
    category: 'Neighbourhoods',
    date: '2026-05-25',
    body: neighbourhoodBody('Braeside'),
    metaDesc: 'Looking for a bookkeeper in Braeside? Castle Bookkeeping offers flat-fee monthly bookkeeping, GST filing, payroll, and tax prep for Braeside small businesses. Free consultation.'
  },
  {
    title: 'What Calgary Business Owners Should Know About EI Premiums',
    slug: 'what-calgary-business-owners-should-know-about-ei-premiums',
    excerpt: 'EI premiums are a payroll obligation with specific rules. Here is what Calgary employers need to understand.',
    category: 'Guides',
    date: '2026-05-26',
    body: `
<p>Employment Insurance (EI) premiums are a mandatory payroll deduction for virtually all employees in Canada. As a Calgary employer, understanding EI rules is essential because errors in EI calculations or remittances can result in CRA penalties and unexpected costs.</p>

<h2>How EI Premiums Work</h2>
<p>Employees pay EI premiums on insurable earnings up to an annual maximum. For 2026, the employee premium rate is 1.64% of insurable earnings up to the maximum insurable earnings (approximately $65,000). Once an employee hits the annual maximum contribution, no further EI deductions are taken for the rest of the year.</p>

<h2>The Employer's Obligation</h2>
<p>Employers must contribute 1.4 times the employee's EI premium. So for every $1.64 the employee pays, the employer pays $2.30. This employer portion is an additional cost of employment beyond the employee's salary and must be remitted to CRA along with the employee deductions.</p>

<h2>Who Is Exempt?</h2>
<p>Some workers are exempt from EI premiums: shareholders who control more than 40% of the corporation's voting shares (owner-managers), and workers in certain specific exempt roles. However, determining exemptions incorrectly can result in penalties, so err on the side of deducting unless you've confirmed the exemption with CRA.</p>

<h2>EI and Self-Employment</h2>
<p>Self-employed individuals are not required to pay EI premiums (and are not eligible for regular EI benefits). However, they can opt in to the EI Special Benefits program, which provides maternity, parental, sickness, and compassionate care benefits. The opt-in is voluntary and requires registration with Service Canada.</p>

<h2>Year-End Reconciliation</h2>
<p>At year-end, verify that total EI premiums deducted from each employee match the expected amounts based on their insurable earnings. Over-deductions must be refunded to the employee. Under-deductions may result in a CRA assessment to the employer.</p>

<h2>Castle Handles EI Compliance</h2>
<p>Castle Bookkeeping calculates EI premiums accurately for every pay run, ensures employer contributions are included in CRA remittances, and reconciles annual totals for T4 preparation. Contact us for a free consultation.</p>
`
  },
  {
    title: 'Bookkeeping for Interior Designers in Calgary',
    slug: 'bookkeeping-for-interior-designers-in-calgary',
    excerpt: 'Specialised bookkeeping services for Calgary interior designers. Flat-fee plans tailored to your industry.',
    category: 'Industries',
    date: '2026-05-27',
    body: industryBody('Interior Designers'),
    metaDesc: 'Castle Bookkeeping provides flat-fee bookkeeping for Calgary interior designers. Monthly bookkeeping, GST filing, payroll, and tax preparation. Free consultation.'
  },
  {
    title: 'Bookkeeping for Small Businesses in Haysboro',
    slug: 'bookkeeping-for-small-businesses-in-haysboro',
    excerpt: 'Professional bookkeeping services for small businesses in Haysboro. Flat-fee monthly plans, GST filing, and payroll.',
    category: 'Neighbourhoods',
    date: '2026-05-28',
    body: neighbourhoodBody('Haysboro'),
    metaDesc: 'Looking for a bookkeeper in Haysboro? Castle Bookkeeping offers flat-fee monthly bookkeeping, GST filing, payroll, and tax prep for Haysboro small businesses. Free consultation.'
  },
  {
    title: 'How to Reconcile Your Credit Card Statement Monthly',
    slug: 'how-to-reconcile-your-credit-card-statement-monthly',
    excerpt: 'Credit card reconciliation is just as important as bank reconciliation. Here is how to do it efficiently.',
    category: 'Guides',
    date: '2026-05-29',
    body: `
<p>Many Calgary business owners reconcile their bank accounts but neglect their credit card accounts. This is a costly oversight. Credit cards often carry more transactions than bank accounts, and unreconciled credit card statements lead to missed expenses, incorrect categorisations, and GST tracking errors.</p>

<h2>Why Credit Card Reconciliation Matters</h2>
<p>Your business credit card is likely used for subscriptions, supplies, travel, fuel, meals, and online purchases. If these transactions aren't reconciled against your credit card statement, you risk: double-counting transactions, missing transactions that didn't feed into your accounting software, incorrect expense categorisation, and understating your actual business expenses.</p>

<h2>Step-by-Step Reconciliation</h2>
<ol>
  <li><strong>Download your statement</strong>. Get the official credit card statement for the month from your card issuer.</li>
  <li><strong>Match transactions</strong>. Go line by line and match each statement transaction to the corresponding entry in your accounting software.</li>
  <li><strong>Investigate discrepancies</strong>. Missing transactions need to be added. Extra transactions in your books may be duplicates that need removal. Different amounts may indicate returns, fees, or errors.</li>
  <li><strong>Verify categories</strong>. As you review each transaction, confirm it's categorised correctly. Fuel should be in fuel, not office supplies.</li>
  <li><strong>Reconcile the balance</strong>. At the end, your accounting software balance should match your credit card statement balance exactly.</li>
</ol>

<h2>Common Issues</h2>
<ul>
  <li><strong>Pending transactions</strong>. Some transactions may appear in your accounting software but not on your statement (or vice versa) due to timing. These are normal and will clear next month.</li>
  <li><strong>Returns and credits</strong>. Ensure returns are matched to the original purchase and both are categorised consistently.</li>
  <li><strong>Annual fees and interest</strong>. Don't forget to record credit card annual fees and any interest charges as business expenses.</li>
</ul>

<h2>How Often Should You Reconcile?</h2>
<p>Monthly, at minimum. If your card has high transaction volume, consider reconciling bi-weekly to keep the task manageable.</p>

<h2>Castle Reconciles Every Account</h2>
<p>Every Castle Bookkeeping plan includes full reconciliation of all bank and credit card accounts, every month. Nothing slips through the cracks. Contact us for a free consultation.</p>
`
  },
  {
    title: 'Bookkeeping for Pest Control Companies in Calgary',
    slug: 'bookkeeping-for-pest-control-companies-in-calgary',
    excerpt: 'Specialised bookkeeping services for Calgary pest control companies. Flat-fee plans tailored to your industry.',
    category: 'Industries',
    date: '2026-05-30',
    body: industryBody('Pest Control Companies'),
    metaDesc: 'Castle Bookkeeping provides flat-fee bookkeeping for Calgary pest control companies. Monthly bookkeeping, GST filing, payroll, and tax preparation. Free consultation.'
  },
  {
    title: 'Bookkeeping for Small Businesses in Cedarbrae',
    slug: 'bookkeeping-for-small-businesses-in-cedarbrae',
    excerpt: 'Professional bookkeeping services for small businesses in Cedarbrae. Flat-fee monthly plans, GST filing, and payroll.',
    category: 'Neighbourhoods',
    date: '2026-05-31',
    body: neighbourhoodBody('Cedarbrae'),
    metaDesc: 'Looking for a bookkeeper in Cedarbrae? Castle Bookkeeping offers flat-fee monthly bookkeeping, GST filing, payroll, and tax prep for Cedarbrae small businesses. Free consultation.'
  },

  // ── June 1–16 ──
  {
    title: 'Summer Business Bookkeeping Checklist for Calgary',
    slug: 'summer-business-bookkeeping-checklist-for-calgary',
    excerpt: 'Keep your books on track this summer with this essential checklist for Calgary business owners.',
    category: 'Seasonal',
    date: '2026-06-01',
    body: `
<p>Summer in Calgary means longer days, warmer weather, and for many business owners, a shift in operations — whether you're ramping up for peak season or slowing down while clients vacation. Either way, your bookkeeping needs attention. Here is your summer checklist.</p>

<h2>1. Close Out Q2 Properly</h2>
<p>By early June, your Q1 and Q2 books should be fully reconciled and current. If you file GST quarterly, your Q2 return (April through June) will be due by July 31. Having clean books makes filing straightforward and ensures you capture all Input Tax Credits.</p>

<h2>2. Conduct a Mid-Year Financial Review</h2>
<p>With six months of data, you have enough information to assess your annual trajectory. Compare year-to-date revenue and expenses to your budget. Are you on track? Are any expense categories growing faster than expected? This is your opportunity to adjust course before year-end.</p>

<h2>3. Review Accounts Receivable</h2>
<p>Summer is notorious for delayed payments as clients go on vacation. Review your aging report, follow up on overdue invoices before your contacts disappear for August, and consider tightening payment terms if late payments are a recurring problem.</p>

<h2>4. Manage Seasonal Staffing</h2>
<p>If you've hired summer staff, ensure payroll is set up correctly with proper source deductions. If staff are leaving, process their final pay including any vacation pay owing and issue ROEs within five calendar days.</p>

<h2>5. Back Up Your Records</h2>
<p>Before anyone on your team goes on vacation, ensure all financial records are backed up and accessible. If you use cloud accounting software, verify your subscription is current. If you store any records locally, create a fresh backup.</p>

<h2>6. Plan for Fall</h2>
<p>September arrives fast. If you're planning any major purchases, hires, or changes for fall, start the financial planning now. Create a Q3/Q4 budget and identify any financing needs early.</p>

<h2>7. Don't Let Books Slide</h2>
<p>The biggest summer bookkeeping risk is simply falling behind. Vacation schedules, outdoor activities, and reduced urgency can push bookkeeping to the bottom of the list. Commit to maintaining your monthly routine.</p>

<h2>Castle Keeps You Current All Summer</h2>
<p>Castle Bookkeeping maintains your books on schedule regardless of the season. Our monthly service ensures nothing falls behind during the summer months. Contact us for a free consultation.</p>
`
  },
  {
    title: 'Bookkeeping for Tow Truck Companies in Calgary',
    slug: 'bookkeeping-for-tow-truck-companies-in-calgary',
    excerpt: 'Specialised bookkeeping services for Calgary tow truck companies. Flat-fee plans tailored to your industry.',
    category: 'Industries',
    date: '2026-06-02',
    body: industryBody('Tow Truck Companies'),
    metaDesc: 'Castle Bookkeeping provides flat-fee bookkeeping for Calgary tow truck companies. Monthly bookkeeping, GST filing, payroll, and tax preparation. Free consultation.'
  },
  {
    title: 'Bookkeeping for Small Businesses in Beddington Heights',
    slug: 'bookkeeping-for-small-businesses-in-beddington-heights',
    excerpt: 'Professional bookkeeping services for small businesses in Beddington Heights. Flat-fee monthly plans, GST filing, and payroll.',
    category: 'Neighbourhoods',
    date: '2026-06-03',
    body: neighbourhoodBody('Beddington Heights'),
    metaDesc: 'Looking for a bookkeeper in Beddington Heights? Castle Bookkeeping offers flat-fee monthly bookkeeping, GST filing, payroll, and tax prep for Beddington Heights small businesses. Free consultation.'
  },
  {
    title: 'How to Read a Balance Sheet for Non Accountants',
    slug: 'how-to-read-a-balance-sheet-for-non-accountants',
    excerpt: 'A balance sheet tells you what your business owns, owes, and is worth. Here is how to read one in plain language.',
    category: 'Guides',
    date: '2026-06-04',
    body: `
<p>A balance sheet is one of the three core financial statements every business produces, alongside the profit and loss statement and the cash flow statement. While many Calgary business owners understand their P&L, the balance sheet often feels more confusing. Here is a plain-language guide.</p>

<h2>The Basic Equation</h2>
<p>A balance sheet is built on one fundamental equation: Assets = Liabilities + Equity. Everything your business owns (assets) was paid for either by borrowing (liabilities) or by the owners (equity). The two sides always balance — hence the name.</p>

<h2>Assets: What You Own</h2>
<p>Assets are divided into current assets (things you can convert to cash within a year) and long-term assets (things with a longer useful life).</p>
<ul>
  <li><strong>Current assets</strong>: Cash in the bank, accounts receivable (money customers owe you), inventory, and prepaid expenses.</li>
  <li><strong>Long-term assets</strong>: Equipment, vehicles, furniture, and property — shown at their purchase cost minus accumulated depreciation.</li>
</ul>

<h2>Liabilities: What You Owe</h2>
<p>Liabilities are also divided into current (due within a year) and long-term.</p>
<ul>
  <li><strong>Current liabilities</strong>: Accounts payable (bills you owe), credit card balances, the current portion of loans, GST owing, and payroll liabilities.</li>
  <li><strong>Long-term liabilities</strong>: Business loans, vehicle financing, and any other debts due beyond one year.</li>
</ul>

<h2>Equity: What's Left Over</h2>
<p>Equity represents the owners' stake in the business. For a corporation, this includes share capital and retained earnings (accumulated profits that haven't been distributed). For a sole proprietor, it's the owner's equity account plus current-year earnings minus draws.</p>

<h2>Key Ratios to Watch</h2>
<ul>
  <li><strong>Current ratio</strong> (current assets / current liabilities): Above 1.5 is generally healthy. Below 1.0 means you may struggle to pay short-term obligations.</li>
  <li><strong>Debt-to-equity ratio</strong> (total liabilities / total equity): Lower is generally better. A high ratio means heavy reliance on borrowed money.</li>
</ul>

<h2>Castle Delivers Clear Financial Statements</h2>
<p>Every Castle Bookkeeping client receives a monthly balance sheet along with their P&L. We present it clearly and explain any significant changes month to month. Contact us for a free consultation.</p>
`
  },
  {
    title: 'Bookkeeping for Personal Trainers in Calgary',
    slug: 'bookkeeping-for-personal-trainers-in-calgary',
    excerpt: 'Specialised bookkeeping services for Calgary personal trainers. Flat-fee plans tailored to your industry.',
    category: 'Industries',
    date: '2026-06-05',
    body: industryBody('Personal Trainers'),
    metaDesc: 'Castle Bookkeeping provides flat-fee bookkeeping for Calgary personal trainers. Monthly bookkeeping, GST filing, payroll, and tax preparation. Free consultation.'
  },
  {
    title: 'Bookkeeping for Small Businesses in Oakridge',
    slug: 'bookkeeping-for-small-businesses-in-oakridge',
    excerpt: 'Professional bookkeeping services for small businesses in Oakridge. Flat-fee monthly plans, GST filing, and payroll.',
    category: 'Neighbourhoods',
    date: '2026-06-06',
    body: neighbourhoodBody('Oakridge'),
    metaDesc: 'Looking for a bookkeeper in Oakridge? Castle Bookkeeping offers flat-fee monthly bookkeeping, GST filing, payroll, and tax prep for Oakridge small businesses. Free consultation.'
  },
  {
    title: 'Understanding Depreciation for Calgary Small Businesses',
    slug: 'understanding-depreciation-for-calgary-small-businesses',
    excerpt: 'Depreciation affects your taxes and your financial statements. Here is how it works for Calgary businesses.',
    category: 'Guides',
    date: '2026-06-07',
    body: `
<p>When your Calgary business buys a significant asset — equipment, a vehicle, furniture, or technology — you can't deduct the full cost in the year of purchase. Instead, the cost is spread over the asset's useful life through depreciation (called Capital Cost Allowance or CCA for tax purposes in Canada). Understanding how this works is important for both your financial statements and your tax planning.</p>

<h2>CCA: How It Works for Tax</h2>
<p>CRA assigns each type of asset to a CCA class with a prescribed depreciation rate. Common classes for Calgary small businesses include:</p>
<ul>
  <li><strong>Class 8 (20%)</strong>: Office furniture, equipment, and machinery not in another class</li>
  <li><strong>Class 10 (30%)</strong>: Motor vehicles (under $37,000), general-purpose electronic equipment</li>
  <li><strong>Class 10.1 (30%)</strong>: Passenger vehicles over the prescribed cost limit</li>
  <li><strong>Class 50 (55%)</strong>: Computer hardware and systems software</li>
  <li><strong>Class 1 (4%)</strong>: Buildings</li>
</ul>

<h2>The Accelerated Investment Incentive</h2>
<p>The federal government's Accelerated Investment Incentive (AII) allows businesses to claim a larger CCA deduction in the first year an asset is put in use. Instead of the standard half-year rule (which limits the first year to half the normal rate), the AII provides enhanced first-year deductions. This can significantly reduce your tax bill in the year you make major purchases.</p>

<h2>Depreciation for Financial Statements</h2>
<p>For your internal financial statements (not tax returns), depreciation is typically calculated using the straight-line method — spreading the cost evenly over the asset's estimated useful life. This gives a more consistent picture of expenses month to month. CCA for tax purposes and depreciation for financial statements are calculated separately and may differ.</p>

<h2>When to Buy for Maximum Tax Benefit</h2>
<p>Purchasing capital assets earlier in your fiscal year maximises the CCA claim for that year. An asset purchased in month one gives you twelve months of depreciation; one purchased in month twelve gives you one month. Timing capital purchases is a simple but effective tax planning strategy.</p>

<h2>Castle Tracks Your Assets</h2>
<p>Castle Bookkeeping maintains fixed asset registers for our clients, calculates both book depreciation and CCA, and ensures capital purchases are properly recorded and depreciated. Contact us for a free consultation.</p>
`
  },
  {
    title: 'Bookkeeping for Deck Builders in Calgary',
    slug: 'bookkeeping-for-deck-builders-in-calgary',
    excerpt: 'Specialised bookkeeping services for Calgary deck builders. Flat-fee plans tailored to your industry.',
    category: 'Industries',
    date: '2026-06-08',
    body: industryBody('Deck Builders'),
    metaDesc: 'Castle Bookkeeping provides flat-fee bookkeeping for Calgary deck builders. Monthly bookkeeping, GST filing, payroll, and tax preparation. Free consultation.'
  },
  {
    title: 'Bookkeeping for Small Businesses in Altadore',
    slug: 'bookkeeping-for-small-businesses-in-altadore',
    excerpt: 'Professional bookkeeping services for small businesses in Altadore. Flat-fee monthly plans, GST filing, and payroll.',
    category: 'Neighbourhoods',
    date: '2026-06-09',
    body: neighbourhoodBody('Altadore'),
    metaDesc: 'Looking for a bookkeeper in Altadore? Castle Bookkeeping offers flat-fee monthly bookkeeping, GST filing, payroll, and tax prep for Altadore small businesses. Free consultation.'
  },
  {
    title: 'How to Budget for Seasonal Revenue Fluctuations',
    slug: 'how-to-budget-for-seasonal-revenue-fluctuations',
    excerpt: 'Most Calgary businesses have seasonal revenue patterns. Here is how to budget for the ups and downs.',
    category: 'Guides',
    date: '2026-06-10',
    body: `
<p>Most Calgary businesses experience seasonal revenue fluctuations. Landscapers boom in summer and slow in winter. Retailers peak in November and December. Accountants are swamped from February through June. Construction winds down in the coldest months. If you don't plan for these patterns, cash flow problems are inevitable.</p>

<h2>Step 1: Identify Your Revenue Pattern</h2>
<p>Look at 12 to 24 months of historical revenue data. Plot it by month. The pattern will be obvious: which months are your strongest, which are your weakest, and how big is the gap between them? This is the foundation of your seasonal budget.</p>

<h2>Step 2: Calculate Your Monthly Fixed Costs</h2>
<p>List every expense that stays the same regardless of revenue: rent, insurance, loan payments, software subscriptions, base salaries, and phone/internet. These costs don't go away in your slow months — they need to be covered year-round.</p>

<h2>Step 3: Build a Month-by-Month Budget</h2>
<p>Using your revenue pattern and fixed costs, create a month-by-month budget for the full year. For each month, project revenue, subtract variable costs (those that rise and fall with revenue), subtract fixed costs, and calculate the expected surplus or deficit.</p>

<h2>Step 4: Set Aside Cash in Good Months</h2>
<p>The key to surviving seasonal dips is setting aside cash during your peak months. If your analysis shows that November through February are typically cash-negative, calculate the total deficit for those months and save that amount during your peak months. A separate savings account for this purpose helps you avoid spending the reserve.</p>

<h2>Step 5: Control Discretionary Spending</h2>
<p>In slow months, reduce discretionary spending: pause non-essential marketing, delay equipment purchases, and minimise overtime. This isn't about being cheap — it's about matching expenses to revenue reality.</p>

<h2>Step 6: Consider a Line of Credit</h2>
<p>A business line of credit provides a safety net for seasonal cash flow gaps. Apply for it during your strong months when your financials look best — not when you're already in a cash crunch. Use it only to bridge temporary gaps, not to fund ongoing losses.</p>

<h2>Castle Helps You Plan</h2>
<p>Castle Bookkeeping provides monthly financial statements that make seasonal patterns visible and actionable. We can help you build a seasonal budget and track your performance against it. Contact us for a free consultation.</p>
`
  },
  {
    title: 'Bookkeeping for Mobile Mechanics in Calgary',
    slug: 'bookkeeping-for-mobile-mechanics-in-calgary',
    excerpt: 'Specialised bookkeeping services for Calgary mobile mechanics. Flat-fee plans tailored to your industry.',
    category: 'Industries',
    date: '2026-06-11',
    body: industryBody('Mobile Mechanics'),
    metaDesc: 'Castle Bookkeeping provides flat-fee bookkeeping for Calgary mobile mechanics. Monthly bookkeeping, GST filing, payroll, and tax preparation. Free consultation.'
  },
  {
    title: 'Bookkeeping for Small Businesses in Renfrew',
    slug: 'bookkeeping-for-small-businesses-in-renfrew',
    excerpt: 'Professional bookkeeping services for small businesses in Renfrew. Flat-fee monthly plans, GST filing, and payroll.',
    category: 'Neighbourhoods',
    date: '2026-06-12',
    body: neighbourhoodBody('Renfrew'),
    metaDesc: 'Looking for a bookkeeper in Renfrew? Castle Bookkeeping offers flat-fee monthly bookkeeping, GST filing, payroll, and tax prep for Renfrew small businesses. Free consultation.'
  },
  {
    title: 'What Calgary Freelancers Need to Know About Taxes',
    slug: 'what-calgary-freelancers-need-to-know-about-taxes',
    excerpt: 'Freelancing in Calgary? Here is a complete guide to your tax obligations and how to minimise what you owe.',
    category: 'Guides',
    date: '2026-06-13',
    body: `
<p>Freelancing in Calgary offers flexibility and independence, but it also comes with tax responsibilities that employees never have to think about. As a freelancer, you are responsible for tracking your own income, paying your own taxes, and filing your own returns. Here is everything you need to know.</p>

<h2>You Are Self-Employed</h2>
<p>In CRA's eyes, freelancers are self-employed individuals operating a business. You report your freelance income on a T2125 (Statement of Business or Professional Activities) as part of your personal tax return. Even if you freelance part-time alongside a regular job, you must report all freelance income.</p>

<h2>Income Tax</h2>
<p>Unlike employees, no one withholds income tax from your freelance payments. You're responsible for calculating and paying it yourself. Alberta's combined federal-provincial marginal tax rates range from 25% on the first $55,867 to over 48% on income above $355,845. Set aside 25-30% of your freelance income for taxes as a general rule.</p>

<h2>CPP Contributions</h2>
<p>As a self-employed freelancer, you pay both the employee and employer portions of CPP — effectively double what an employee pays. For 2026, this totals approximately 11.9% on net self-employment income between $3,500 and the annual maximum. This is a significant expense that many new freelancers don't anticipate.</p>

<h2>GST Registration</h2>
<p>Once your freelance revenue exceeds $30,000 over four consecutive calendar quarters, you must register for GST and begin charging 5% on your services. Even below that threshold, voluntary registration can be beneficial if you have significant business expenses (you can claim back the GST you pay through Input Tax Credits).</p>

<h2>Deductible Expenses</h2>
<p>Freelancers can deduct all reasonable business expenses from their income before calculating tax. Common deductions include: home office (proportionate share of rent, utilities, and internet), computer and software, professional development, business travel, marketing and advertising, professional memberships, and bank fees.</p>

<h2>Quarterly Instalments</h2>
<p>If your net tax owing exceeds $3,000 in two consecutive years, CRA will require you to pay quarterly tax instalments. These are due March 15, June 15, September 15, and December 15.</p>

<h2>Castle Supports Calgary Freelancers</h2>
<p>Castle Bookkeeping works with freelancers across Calgary, handling monthly bookkeeping, GST filing, expense tracking, and tax preparation. We ensure you claim every deduction and stay CRA compliant. Contact us for a free consultation.</p>
`
  },
  {
    title: 'Bookkeeping for Pressure Washing Companies in Calgary',
    slug: 'bookkeeping-for-pressure-washing-companies-in-calgary',
    excerpt: 'Specialised bookkeeping services for Calgary pressure washing companies. Flat-fee plans tailored to your industry.',
    category: 'Industries',
    date: '2026-06-14',
    body: industryBody('Pressure Washing Companies'),
    metaDesc: 'Castle Bookkeeping provides flat-fee bookkeeping for Calgary pressure washing companies. Monthly bookkeeping, GST filing, payroll, and tax preparation. Free consultation.'
  },
  {
    title: 'Bookkeeping for Small Businesses in Capitol Hill',
    slug: 'bookkeeping-for-small-businesses-in-capitol-hill',
    excerpt: 'Professional bookkeeping services for small businesses in Capitol Hill. Flat-fee monthly plans, GST filing, and payroll.',
    category: 'Neighbourhoods',
    date: '2026-06-15',
    body: neighbourhoodBody('Capitol Hill'),
    metaDesc: 'Looking for a bookkeeper in Capitol Hill? Castle Bookkeeping offers flat-fee monthly bookkeeping, GST filing, payroll, and tax prep for Capitol Hill small businesses. Free consultation.'
  },
  {
    title: 'Mid Year Financial Review: What to Check in June',
    slug: 'mid-year-financial-review-what-to-check-in-june',
    excerpt: 'June is the perfect time for a mid-year financial review. Here is what every Calgary business owner should check.',
    category: 'Seasonal',
    date: '2026-06-16',
    body: `
<p>June marks the halfway point of the year, making it the ideal time for Calgary business owners to step back and assess their financial performance. A thorough mid-year review helps you catch problems early, capitalise on opportunities, and adjust your strategy for the second half of the year.</p>

<h2>1. Review Your Year-to-Date P&L</h2>
<p>Pull your income statement for January through May (or through June if your books are current). Compare revenue and expenses to the same period last year and to your annual budget. Are you ahead or behind on revenue? Are any expense categories growing faster than expected?</p>

<h2>2. Check Your Cash Position</h2>
<p>Look at your current bank balance and compare it to the same time last year. Factor in any seasonal patterns — if summer is typically slow, ensure you have enough cash to cover operating expenses through the lean months. If cash is tighter than expected, identify the cause and take action now.</p>

<h2>3. Review Accounts Receivable</h2>
<p>Run an aging report. How much is overdue? Has the average collection time increased? Follow up on all invoices over 30 days and consider writing off anything truly uncollectible. Stale receivables distort your financial picture.</p>

<h2>4. Assess Your Tax Position</h2>
<p>Based on your year-to-date income, estimate your annual tax liability. Are you on track with quarterly instalments? If your income is higher than expected, you may need to increase instalments to avoid interest. If lower, you may be overpaying.</p>

<h2>5. Review Major Expenses</h2>
<p>Look at your five to ten largest expense categories. Are any significantly different from budget or from last year? Common mid-year surprises include: insurance premium increases, subscription creep, higher-than-expected contractor costs, and unplanned equipment expenses.</p>

<h2>6. Update Your Forecast</h2>
<p>Based on your mid-year review, update your revenue and expense forecast for the remaining six months. A realistic forecast helps you make better decisions about hiring, spending, and investment for the rest of the year.</p>

<h2>7. Verify Tax Filings Are Current</h2>
<p>Confirm all Q1 and Q2 GST returns are filed, all payroll remittances are current, and any corporate tax instalments are up to date. Being current on all filings reduces stress and avoids penalties.</p>

<h2>Castle Provides the Data You Need</h2>
<p>Castle Bookkeeping delivers monthly financial statements that make mid-year reviews straightforward. When your books are current, you can make informed decisions instead of guessing. Contact us for a free consultation.</p>
`
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

// Scheduled posts (pre-dated, Mar 19 – Jun 16 2026)
scheduledPosts.forEach(p => {
  if (!p.metaDesc) p.metaDesc = `${p.excerpt} Expert advice from Castle Bookkeeping Calgary.`;
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

<link rel="icon" type="image/svg+xml" href="../favicon.svg">
<link rel="icon" type="image/png" sizes="32x32" href="../favicon-32x32.png">
<link rel="apple-touch-icon" sizes="180x180" href="../apple-touch-icon.png">
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
    display: flex;
    flex-direction: column;
    text-decoration: none;
    transition: opacity .2s;
    flex-shrink: 0;
    line-height: 1;
  }
  .nav-logo:hover { opacity: .7; }
  .nav-logo-main {
    font-family: 'DM Serif Display', serif;
    font-size: 22px;
    color: var(--dark);
  }
  .nav-logo-sub {
    font-family: 'Inter', sans-serif;
    font-size: 8px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: .16em;
    color: #8a8490;
    margin-top: 1px;
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
  <a href="../index.html" class="nav-logo"><span class="nav-logo-main">Castle</span><span class="nav-logo-sub">Bookkeeping</span></a>
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

<link rel="icon" type="image/svg+xml" href="../favicon.svg">
<link rel="icon" type="image/png" sizes="32x32" href="../favicon-32x32.png">
<link rel="apple-touch-icon" sizes="180x180" href="../apple-touch-icon.png">
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
