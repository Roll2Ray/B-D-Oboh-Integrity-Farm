/* =========================================================
   B. D. Oboh Integrity Farm — site behaviour (vanilla JS)
   Structure: CONFIG + DATA at top (edit these to change content),
   then small single-purpose modules, then init().
   ========================================================= */
(function () {
  'use strict';

  /* ---------------------------------------------------------
     1. CONFIG — verified details supplied by the farm.
        Anything not supplied is shown as a clear placeholder.
     --------------------------------------------------------- */
   const CONFIG = {
  name: 'B. D. Oboh Integrity Farm',

  owner: {
    name: 'Hon. Benjamin D. Oboh',
    role: 'CEO / Managing Director'
  },

  established: 2021,

  phones: ['+2348033784145', '+2348058282279'],

  whatsapp: '2348033784145',

  email: 'obenworld@gmail.com',

  facebook: 'https://www.facebook.com/share/1JoMmYNkvd/',

  farmAddress: 'Along Delta State/Otefe Forest Reserve Road, Oghara, Ethiope West LGA, Delta State, Nigeria.',

  officeAddress: 'No. 1, Hon. Benjamin Oboh Street, Ogharefe, Oghara, Ethiope West LGA, Delta State, Nigeria.',

  heroStats: [
    { value: 150, suffix: '', label: 'Acres of Farmland' },
    { value: 12, suffix: '', label: 'Team Members' },
    { value: 5, suffix: '', label: 'Product Lines' },
    { sinceYear: 2021, suffix: '+', label: 'Years of Farming' }
  ],

  communityStats: [
    { value: 12, suffix: '', label: 'Direct Jobs', note: 'Verified' },
    { value: 150, suffix: '', label: 'Acres Under Management', note: 'Verified' },
    { value: null, label: 'Farmers Supported', note: '[To be confirmed]' },
    { value: null, label: 'Training Sessions', note: '[To be confirmed]' }
  ],

  sustainabilityMeters: [
    { label: 'Water Efficiency', value: 85 },
    { label: 'Renewable Energy Adoption', value: 70 },
    { label: 'Waste Recycling', value: 75 }
  ],

  carouselInterval: 6000,
  searchDebounce: 200
};
  /* ---------------------------------------------------------
     2. DATA — products, operations, projects, news, gallery…
     --------------------------------------------------------- */
  const IMG = 'assets/images/';

  const PRODUCTS = [
    {
      id: 'tubers', name: 'Fresh Cassava Tubers', category: 'fresh', categoryLabel: 'Fresh Cassava',
      img: IMG + 'cassava-pile.jpg', pos: 'object-center',
      short: 'Freshly harvested cassava tubers from our Otefe farm, ready for processing or resale.',
      long: 'Freshly harvested from our fields in Otefe, Oghara. Ideal for garri, fufu and flour producers, food processors and bulk buyers who need dependable fresh supply.',
      points: ['Harvested fresh and supplied in bulk', 'Suitable for garri, fufu, flour and starch production', 'Quantities and delivery arranged with our sales team'],
      units: ['Tonne(s)', 'Truckload(s)']
    },
    {
      id: 'garri', name: 'Garri', category: 'processed', categoryLabel: 'Processed Products',
      img: IMG + 'garri-hand.jpg', pos: 'object-center',
      short: 'Processed from fresh cassava — a Nigerian staple, graded and packed for local and international markets.',
      long: 'Our garri is processed from fresh cassava grown on our own farm and packed for retail and wholesale customers across local and international markets.',
      points: ['Processed from our own fresh cassava', 'Packed for wholesale and retail customers', 'Pack sizes and pricing confirmed on enquiry'],
      units: ['Bag(s)', 'Kg']
    },
    {
      id: 'flour', name: 'Cassava Flour', category: 'processed', categoryLabel: 'Processed Products',
      img: IMG + 'cassava-flour-bowl.jpg', pos: 'object-center',
      short: 'Fine, naturally gluten-free cassava flour for bakers, food manufacturers and households.',
      long: 'A fine cassava flour made from fresh tubers — a versatile ingredient for baking, food manufacturing and traditional cooking.',
      points: ['Made from fresh cassava tubers', 'Versatile for baking and food manufacturing', 'Bulk and retail quantities on request'],
      units: ['Bag(s)', 'Kg']
    },
    {
      id: 'fufu', name: 'Fufu', category: 'processed', categoryLabel: 'Processed Products',
      img: IMG + 'fufu-amala.jpg', pos: 'object-left-top',
      short: 'Smooth, ready-to-prepare fufu — a favourite swallow served with Nigerian soups and stews.',
      long: 'Smooth fufu processed from fresh cassava, prepared for customers who want quality, convenience and authentic taste.',
      points: ['Processed from fresh cassava', 'Smooth, consistent texture', 'Available for local and bulk orders'],
      units: ['Bag(s)', 'Kg']
    },
    {
      id: 'amala', name: 'White Amala', category: 'processed', categoryLabel: 'Processed Products',
      img: IMG + 'products-packs.jpg', pos: 'object-right-bottom',
      short: 'White amala (cassava-based) for a light, smooth swallow, packaged for easy storage.',
      long: 'White amala made from cassava and packaged for convenient storage and sale — a staple for households, restaurants and distributors.',
      points: ['Cassava-based white amala', 'Packaged for storage and distribution', 'Wholesale and retail enquiries welcome'],
      units: ['Bag(s)', 'Kg']
    }
  ];

  const OPERATIONS = [
    {
      id: 'cultivation', icon: 'fa-seedling', title: 'Cassava Cultivation', img: IMG + 'cassava-field-worker.jpg',
      short: 'Commercial cassava farming across our 150-acre farm in Otefe, Oghara.',
      body: [
        'Cassava is the heart of everything we do. Our team of 12 cultivates and tends cassava on a 150-acre farm in Otefe, Oghara, Ethiope West, Delta State.',
        'Careful field management from planting to harvest supports healthy, consistent yields of tubers for sale and for our own processing line.'
      ]
    },
    {
      id: 'tubers', icon: 'fa-truck', title: 'Fresh Tuber Sales', img: IMG + 'cassava-pile.jpg',
      short: 'Freshly harvested cassava tubers available to processors and bulk buyers.',
      body: [
        'Alongside our processed range, we sell fresh cassava tubers to buyers who need reliable raw material.',
        'Contact our team to discuss quantities, harvest timing and delivery arrangements.'
      ]
    },
    {
      id: 'processing', icon: 'fa-industry', title: 'Agro-Processing', img: IMG + 'processing-line.jpg',
      short: 'Converting fresh cassava into garri, cassava flour, fufu and white amala.',
      body: [
        'Our agro-processing operation turns fresh cassava into garri, cassava flour, fufu and white amala in commercial quantities.',
        'Hygiene and consistency guide our processing: workers wear protective clothing, and products move from washing through grating and drying to packing.'
      ]
    },
    {
      id: 'garri', icon: 'fa-bowl-food', title: 'Garri Production', img: IMG + 'garri-hand.jpg',
      short: 'Quality garri processed from our own fresh cassava.',
      body: [
        'Garri is one of our core products — processed from fresh cassava grown on our own farm, then packed for local and international markets.'
      ]
    },
    {
      id: 'flour-fufu', icon: 'fa-wheat-awn', title: 'Flour, Fufu & Amala', img: IMG + 'fufu-amala.jpg',
      short: 'Cassava flour, fufu and white amala for homes, restaurants and distributors.',
      body: [
        'Beyond garri, we produce cassava flour, fufu and white amala — staples that serve households, restaurants, retailers and food businesses.'
      ]
    },
    {
      id: 'distribution', icon: 'fa-box-open', title: 'Packaging & Distribution', img: IMG + 'packs-warehouse.jpg',
      short: 'Branded packaging and supply to local and international markets.',
      body: [
        'Our products are packed under the B. D. Oboh Integrity Farm brand and supplied to local and international markets.',
        'For distribution and export enquiries, reach our team by phone, WhatsApp or email.'
      ]
    }
  ];

  const PROJECTS = [
    { id: 'p-cassava', category: 'cultivation', categoryLabel: 'Cultivation', title: 'Cassava Production Project', img: IMG + 'cassava-harvest.jpg',
      short: 'Commercial cassava cultivation across our 150-acre farm in Otefe.',
      body: ['Our flagship project: large-scale cassava cultivation that feeds both our processing line and our fresh tuber sales.', 'Project details such as yields and planting calendar: [to be confirmed by farm management].'] },
    { id: 'p-garri', category: 'processing', categoryLabel: 'Processing', title: 'Garri Processing Line', img: IMG + 'garri-hand.jpg',
      short: 'Commercial-scale garri processing from fresh cassava.',
      body: ['A dedicated line converting fresh cassava into packed garri for local and international markets.', 'Capacity figures: [to be confirmed by farm management].'] },
    { id: 'p-flour', category: 'processing', categoryLabel: 'Processing', title: 'Cassava Flour Production', img: IMG + 'cassava-flour-bowl.jpg',
      short: 'Fine cassava flour for bakers, manufacturers and households.',
      body: ['Production of cassava flour from fresh tubers for bakery, food manufacturing and household use.'] },
    { id: 'p-fufu', category: 'processing', categoryLabel: 'Processing', title: 'Fufu & White Amala Production', img: IMG + 'fufu-amala.jpg',
      short: 'Smooth fufu and white amala prepared for retail and bulk customers.',
      body: ['Processing and packaging of fufu and white amala, two staples with steady demand in Nigerian homes and restaurants.'] },
    { id: 'p-tubers', category: 'supply', categoryLabel: 'Supply', title: 'Fresh Tuber Supply', img: IMG + 'cassava-pile.jpg',
      short: 'Supplying freshly harvested cassava tubers to buyers.',
      body: ['Supply of fresh cassava tubers to processors and bulk buyers, arranged around harvest schedules.'] },
    { id: 'p-markets', category: 'supply', categoryLabel: 'Supply', title: 'Local & International Market Supply', img: IMG + 'garri-sacks.jpg',
      short: 'Packed products supplied to local and international markets.',
      body: ['Packaging and distribution of our processed products to customers in Nigeria and beyond.', 'Export destinations and certifications: [to be confirmed by farm management].'] }
  ];

  // Sample editorial content — clearly labelled "Demo" on the page.
  const NEWS = [
    { id: 'n1', category: 'Farming', date: '2026-09-02', title: 'Modern Farming Techniques Transform Crop Production', img: IMG + 'cassava-field-worker.jpg',
      short: 'How better land preparation, spacing and crop care are helping cassava growers raise productivity.',
      body: ['Across Nigeria, cassava farmers are turning to improved planting material, better spacing and timely weeding to get more from every hectare.',
        'Good land preparation is the foundation: well-drained, loosened soil lets tubers develop fully, while clean planting stems give crops a strong start.',
        'Simple record-keeping — planting dates, inputs and harvest weights — helps farms spot what works and plan each season with confidence.'] },
    { id: 'n2', category: 'Technology', date: '2026-08-18', title: 'How Technology Is Changing Nigerian Agriculture', img: IMG + 'processing-line.jpg',
      short: 'From mechanised grating to mobile-phone market access, technology is reshaping the cassava value chain.',
      body: ['Mechanised washing, grating and drying equipment lets processors turn large volumes of fresh cassava into consistent, hygienic products.',
        'Mobile phones and messaging apps are also changing how farms reach customers — from quick quotes to order confirmations by WhatsApp.',
        'As tools become more affordable, even mid-sized farms can adopt practices once limited to large agribusinesses.'] },
    { id: 'n3', category: 'Sustainability', date: '2026-07-29', title: 'The Future of Sustainable Farming in Nigeria', img: IMG + 'mixed-crop-plot.jpg',
      short: 'Soil care, crop diversity and waste reuse are central to farming that lasts for generations.',
      body: ['Sustainable farming protects the soil that every future harvest depends on. Practices such as crop rotation, mulching and returning organic matter keep land productive.',
        'Cassava peels and other by-products can be reused as animal feed or compost, turning waste into value.',
        'Farms that look after their land, water and neighbours build the trust that long-term business depends on.'] },
    { id: 'n4', category: 'Community', date: '2026-07-10', title: 'Youth and the Next Generation of Nigerian Farmers', img: IMG + 'cassava-harvest.jpg',
      short: 'Why agriculture offers real opportunity for young Nigerians — in the field and along the value chain.',
      body: ['Agriculture is more than planting and harvesting. Processing, packaging, logistics, marketing and bookkeeping all create careers connected to food.',
        'Young people bring energy, digital skills and fresh ideas — valuable assets as farms modernise.',
        'Mentorship and practical training help new farmers turn enthusiasm into skills and steady income.'] }
  ];

  const GALLERY = [
    { src: IMG + 'cassava-harvest.jpg', alt: 'Freshly harvested cassava tubers piled in front of a green cassava field', cap: 'Cassava harvest' },
    { src: IMG + 'cassava-field-worker.jpg', alt: 'Farm worker tending rows of healthy cassava plants', cap: 'Tending the cassava fields' },
    { src: IMG + 'processing-line.jpg', alt: 'Worker in protective clothing at a cassava processing line', cap: 'Agro-processing line' },
    { src: IMG + 'garri-hand.jpg', alt: 'A hand lifting freshly processed garri', cap: 'Freshly processed garri' },
    { src: IMG + 'mixed-crop-plot.jpg', alt: 'Cassava and maize growing together on a farm plot', cap: 'Mixed crop plot' },
    { src: IMG + 'packs-warehouse.jpg', alt: 'Branded packs of garri, cassava flour and white amala in a warehouse', cap: 'Branded packaging' },
    { src: IMG + 'cassava-pile.jpg', alt: 'Pile of harvested cassava tubers beside cassava plants', cap: 'Harvested tubers' },
    { src: IMG + 'garri-sacks.jpg', alt: 'Sacks of garri stacked on pallets at a Nigerian market', cap: 'Garri ready for market' },
    { src: IMG + 'cassava-flour-bowl.jpg', alt: 'Bowl of cassava flour beside sliced cassava tubers', cap: 'Cassava flour' },
    { src: IMG + 'fufu-amala.jpg', alt: 'Fufu and amala served with stew', cap: 'Fufu & amala' },
    { src: IMG + 'products-packs.jpg', alt: 'B. D. Oboh Integrity Farm garri, cassava flour and white amala packs', cap: 'Our product range' }
  ];

  const TESTIMONIALS = [
    { quote: 'Working with the farm has given local farmers access to better agricultural knowledge and opportunities.', name: 'Sample Name', role: 'Local Farmer', location: 'Delta State' },
    { quote: 'Consistent quality and clear communication make ordering simple for our business.', name: 'Sample Name', role: 'Retail Partner', location: 'Warri' },
    { quote: 'Fresh tubers arrive on schedule, and the team is easy to reach whenever we need them.', name: 'Sample Name', role: 'Food Processor', location: 'Nigeria' }
  ];

  const SUSTAINABILITY = [
    { icon: 'fa-leaf', title: 'Sustainable Farming', text: 'Responsible agricultural practices that protect soil and natural resources.' },
    { icon: 'fa-droplet', title: 'Water Conservation', text: 'Efficient water use and responsible water management.' },
    { icon: 'fa-solar-panel', title: 'Renewable Energy', text: 'Exploring solar-powered systems for selected farm operations.' },
    { icon: 'fa-layer-group', title: 'Soil Management', text: 'Crop rotation, organic matter management and soil conservation.' },
    { icon: 'fa-recycle', title: 'Waste Management', text: 'Responsible handling and reuse of agricultural by-products.' },
    { icon: 'fa-tree', title: 'Biodiversity', text: 'Respect for surrounding ecosystems and responsible land management.' }
  ];

  const COMMUNITY = [
    { icon: 'fa-briefcase', title: 'Employment', text: 'Steady jobs for our team of 12 and opportunities along the supply chain.' },
    { icon: 'fa-chalkboard-user', title: 'Farmer Training', text: 'Sharing practical know-how with neighbouring farmers.' },
    { icon: 'fa-user-graduate', title: 'Youth Programmes', text: 'Encouraging young people to see a future in agriculture.' },
    { icon: 'fa-screwdriver-wrench', title: 'Skills Development', text: 'On-the-job skills in farming, processing and packaging.' },
    { icon: 'fa-basket-shopping', title: 'Local Sourcing', text: 'Prioritising local labour, suppliers and markets.' },
    { icon: 'fa-road', title: 'Community Infrastructure', text: 'Supporting access and facilities that benefit host communities.' },
    { icon: 'fa-book-open', title: 'Educational Support', text: 'Backing learning opportunities for local people.' }
  ];

  /* ---------------------------------------------------------
     3. UTILITIES
     --------------------------------------------------------- */
  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));
  const escapeHTML = (s) => String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const debounce = (fn, wait) => { let t; return (...a) => { clearTimeout(t); t = setTimeout(() => fn(...a), wait); }; };
  const toIntlPhone = (p) => '+234' + p.replace(/^0/, '');
  const formatDate = (iso) => new Date(iso + 'T00:00:00').toLocaleDateString('en-NG', { year: 'numeric', month: 'long', day: 'numeric' });
  const waLink = (text) => `https://wa.me/${CONFIG.whatsapp}?text=${encodeURIComponent(text)}`;
  const storage = {
    get(k, fallback) { try { const v = localStorage.getItem(k); return v === null ? fallback : v; } catch (e) { return fallback; } },
    set(k, v) { try { localStorage.setItem(k, v); } catch (e) { /* storage unavailable */ } }
  };
  const imgTag = (src, alt, cls = '', w = 800, h = 600) =>
    `<img src="${src}" alt="${escapeHTML(alt)}" width="${w}" height="${h}" loading="lazy" decoding="async" class="${cls}">`;

  /* ---------------------------------------------------------
     4. TOAST
     --------------------------------------------------------- */
  const Toast = {
    show(message, type = 'success', ms = 4200) {
      const region = $('#toast-region');
      if (!region) return;
      const icon = { success: 'fa-circle-check', error: 'fa-circle-exclamation', info: 'fa-circle-info' }[type] || 'fa-circle-info';
      const el = document.createElement('div');
      el.className = `toast ${type}`;
      el.setAttribute('role', type === 'error' ? 'alert' : 'status');
      el.innerHTML = `<i class="fa-solid ${icon} mt-0.5" aria-hidden="true"></i><p class="text-sm leading-snug">${escapeHTML(message)}</p>`;
      region.appendChild(el);
      setTimeout(() => { el.classList.add('leaving'); setTimeout(() => el.remove(), 320); }, ms);
    }
  };

  /* ---------------------------------------------------------
     5. OVERLAY MANAGER — shared open/close, focus + ESC handling
     --------------------------------------------------------- */
  const Overlay = {
    stack: [],
    lastFocus: new Map(),
    open(el, focusSel) {
      if (!el) return;
      this.lastFocus.set(el, document.activeElement);
      el.classList.add('open');
      el.setAttribute('aria-hidden', 'false');
      this.stack.push(el);
      document.body.style.overflow = 'hidden';
      const target = focusSel ? $(focusSel, el) : $('button, [href], input, select, textarea', el);
      if (target) setTimeout(() => target.focus({ preventScroll: true }), 30);
    },
    close(el) {
      if (!el || !el.classList.contains('open')) return;
      el.classList.remove('open');
      el.setAttribute('aria-hidden', 'true');
      this.stack = this.stack.filter((x) => x !== el);
      if (!this.stack.length) document.body.style.overflow = '';
      const prev = this.lastFocus.get(el);
      if (prev && prev.focus) prev.focus({ preventScroll: true });
    },
    closeTop() { const top = this.stack[this.stack.length - 1]; if (top) { this.close(top); return true; } return false; },
    init() {
      document.addEventListener('keydown', (e) => { if (e.key === 'Escape') this.closeTop(); });
      $$('.overlay').forEach((ov) => {
        ov.addEventListener('mousedown', (e) => { if (e.target === ov) this.close(ov); });
        $$('[data-close]', ov).forEach((b) => b.addEventListener('click', () => this.close(ov)));
      });
    }
  };

  /* ---------------------------------------------------------
     6. THEME (dark mode + localStorage)
     --------------------------------------------------------- */
  const Theme = {
    key: 'bdo-theme',
    apply(mode) {
      document.documentElement.classList.toggle('dark', mode === 'dark');
      const btn = $('#theme-toggle');
      if (btn) {
        btn.setAttribute('aria-pressed', String(mode === 'dark'));
        btn.setAttribute('aria-label', mode === 'dark' ? 'Switch to light mode' : 'Switch to dark mode');
        $('i', btn).className = mode === 'dark' ? 'fa-solid fa-sun' : 'fa-solid fa-moon';
      }
      const meta = $('meta[name="theme-color"]');
      if (meta) meta.setAttribute('content', mode === 'dark' ? '#0b1f13' : '#14321f');
    },
    current() { return document.documentElement.classList.contains('dark') ? 'dark' : 'light'; },
    init() {
      const saved = storage.get(this.key, null);
      const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
      this.apply(saved || (prefersDark ? 'dark' : 'light'));
      const btn = $('#theme-toggle');
      if (btn) btn.addEventListener('click', () => {
        const next = this.current() === 'dark' ? 'light' : 'dark';
        this.apply(next); storage.set(this.key, next);
      });
    }
  };

  /* ---------------------------------------------------------
     7. NAVIGATION (sticky state, mobile menu, active link)
     --------------------------------------------------------- */
  const Nav = {
    init() {
      const header = $('#site-header');
      const toggle = $('#menu-toggle');
      const menu = $('#mobile-menu');

      const onScroll = () => header.classList.toggle('is-scrolled', window.scrollY > 40);
      onScroll();
      window.addEventListener('scroll', onScroll, { passive: true });

      const setMenu = (open) => {
        menu.classList.toggle('open', open);
        toggle.setAttribute('aria-expanded', String(open));
        menu.setAttribute('aria-hidden', String(!open));
        if (open) header.classList.add('is-scrolled'); else onScroll();
      };
      toggle.addEventListener('click', (e) => { e.stopPropagation(); setMenu(!menu.classList.contains('open')); });
      $$('a, button', menu).forEach((a) => a.addEventListener('click', () => setMenu(false)));
      document.addEventListener('click', (e) => { if (menu.classList.contains('open') && !menu.contains(e.target) && !toggle.contains(e.target)) setMenu(false); });
      document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && menu.classList.contains('open')) { setMenu(false); toggle.focus(); } });
      window.addEventListener('resize', debounce(() => { if (window.innerWidth >= 1280) setMenu(false); }, 150));

      // Active link highlighting
      const links = $$('[data-nav]');
      const sections = links.map((l) => $(l.getAttribute('href'))).filter(Boolean);
      const uniq = Array.from(new Set(sections));
      const setActive = (id) => links.forEach((l) => {
        const on = l.getAttribute('href') === '#' + id;
        l.classList.toggle('active', on);
        if (on) l.setAttribute('aria-current', 'true'); else l.removeAttribute('aria-current');
      });
      if ('IntersectionObserver' in window) {
        const io = new IntersectionObserver((entries) => {
          entries.forEach((en) => { if (en.isIntersecting) setActive(en.target.id); });
        }, { rootMargin: '-45% 0px -50% 0px', threshold: 0 });
        uniq.forEach((s) => io.observe(s));
      }
    }
  };

  /* ---------------------------------------------------------
     8. SCROLL REVEAL + COUNTERS + PROGRESS (IntersectionObserver)
     --------------------------------------------------------- */
  const Reveal = {
    io: null,
    init() {
      if (!('IntersectionObserver' in window)) { $$('.reveal').forEach((el) => el.classList.add('is-visible')); return; }
      this.io = new IntersectionObserver((entries, obs) => {
        entries.forEach((en) => { if (en.isIntersecting) { const t = en.target; t.classList.add('is-visible'); obs.unobserve(t); setTimeout(() => t.classList.add('revealed'), 1500); } });
      }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
      this.observe(document);
    },
    observe(root) {
      $$('.reveal:not(.is-visible)', root).forEach((el, i) => {
        if (!el.style.getPropertyValue('--d')) {
          const sibs = el.parentElement ? Array.from(el.parentElement.children).filter((c) => c.classList.contains('reveal')) : [];
          const idx = sibs.length > 1 ? sibs.indexOf(el) : (i % 4);
          el.style.setProperty('--d', Math.min(idx, 6) * 90 + 'ms');
        }
        if (this.io) this.io.observe(el); else el.classList.add('is-visible');
      });
    }
  };

  const Counters = {
    animate(el) {
      const target = parseFloat(el.dataset.target);
      const suffix = el.dataset.suffix || '';
      if (!isFinite(target)) return;
      const reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      const dur = reduce ? 0 : 1800;
      const start = performance.now();
      const step = (now) => {
        const p = dur ? Math.min((now - start) / dur, 1) : 1;
        const eased = 1 - Math.pow(1 - p, 3);
        el.textContent = Math.round(target * eased).toLocaleString('en-NG') + suffix;
        if (p < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    },
    render(container, stats, variant) {
      if (!container) return;
      container.innerHTML = stats.map((s) => {
        const value = s.sinceYear ? Math.max(new Date().getFullYear() - s.sinceYear, 1) : s.value;
        const isNum = value !== null && value !== undefined;
        const num = isNum
          ? `<span class="counter font-display text-3xl sm:text-4xl font-bold" data-target="${value}" data-suffix="${s.suffix || ''}">0${s.suffix || ''}</span>`
          : `<span class="font-display text-3xl sm:text-4xl font-bold opacity-60" aria-label="To be confirmed">—</span>`;
        const note = s.note ? `<span class="block text-[11px] mt-1 uppercase tracking-wider opacity-70">${escapeHTML(s.note)}</span>` : '';
        const cls = variant === 'hero' ? 'glass text-white' : 'bg-white dark:bg-forest-900 text-forest-800 dark:text-cream-100 shadow-sm border border-forest-100 dark:border-forest-800';
        return `<div class="${cls} rounded-2xl px-4 py-5 text-center reveal reveal-scale">${num}<span class="block text-xs sm:text-sm mt-1 ${variant === 'hero' ? 'text-cream-100/90' : 'opacity-80'}">${escapeHTML(s.label)}</span>${note}</div>`;
      }).join('');
    },
    init() {
      this.render($('#hero-stats'), CONFIG.heroStats, 'hero');
      this.render($('#community-stats'), CONFIG.communityStats, 'community');
      const run = (root) => $$('.counter', root).forEach((el) => this.animate(el));
      const groups = $$('#hero-stats, #community-stats');
      if (!('IntersectionObserver' in window)) { groups.forEach(run); return; }
      const io = new IntersectionObserver((entries, obs) => {
        entries.forEach((en) => { if (en.isIntersecting) { run(en.target); obs.unobserve(en.target); } });
      }, { threshold: 0.35 });
      groups.forEach((g) => io.observe(g));
    }
  };

  const Progress = {
    init() {
      const wrap = $('#sustain-meters');
      if (!wrap) return;
      wrap.innerHTML = CONFIG.sustainabilityMeters.map((m, i) => `
        <div>
          <div class="flex justify-between text-sm font-semibold mb-2"><span id="meter-label-${i}">${escapeHTML(m.label)}</span><span class="meter-val">0%</span></div>
          <div class="progress-track" role="progressbar" aria-labelledby="meter-label-${i}" aria-valuemin="0" aria-valuemax="100" aria-valuenow="${m.value}">
            <div class="progress-fill" data-value="${m.value}"></div>
          </div>
        </div>`).join('');
      const fill = () => $$('.progress-fill', wrap).forEach((bar) => {
        const v = bar.dataset.value;
        bar.style.width = v + '%';
        const label = bar.closest('.progress-track').parentElement.querySelector('.meter-val');
        const goal = Number(v);
        let n = 0;
        const t = setInterval(() => { n = Math.min(n + 2, goal); label.textContent = n + '%'; if (n >= goal) clearInterval(t); }, 28);
      });
      if (!('IntersectionObserver' in window)) { fill(); return; }
      const io = new IntersectionObserver((e, o) => { if (e[0].isIntersecting) { fill(); o.disconnect(); } }, { threshold: 0.4 });
      io.observe(wrap);
    }
  };

  /* ---------------------------------------------------------
     9. RENDERERS — build sections from DATA
     --------------------------------------------------------- */
  const Render = {
    operations() {
      $('#operations-grid').innerHTML = OPERATIONS.map((o, i) => `
        <article class="card group flex flex-col reveal" style="--d:${(i % 3) * 90}ms">
          <div class="zoom-wrap relative aspect-[4/3]">
            ${imgTag(o.img, o.title + ' at B. D. Oboh Integrity Farm', 'w-full h-full object-cover', 640, 480)}
            <span class="absolute -bottom-6 left-6 w-14 h-14 rounded-2xl bg-forest-700 text-white flex items-center justify-center text-2xl shadow-lg ring-4 ring-white dark:ring-forest-900 transition-transform duration-300 group-hover:-translate-y-1 group-hover:bg-leaf-600" aria-hidden="true"><i class="fa-solid ${o.icon}"></i></span>
          </div>
          <div class="p-6 pt-10 flex flex-col flex-1">
            <h3 class="text-xl font-bold mb-2">${escapeHTML(o.title)}</h3>
            <p class="text-sm leading-relaxed opacity-80 flex-1">${escapeHTML(o.short)}</p>
            <button type="button" class="btn btn-outline-dark btn-sm mt-5 self-start" data-open-op="${o.id}">Learn More <i class="fa-solid fa-arrow-right text-xs" aria-hidden="true"></i></button>
          </div>
        </article>`).join('');
    },
    products() {
      $('#product-grid').innerHTML = PRODUCTS.map((p) => `
        <article class="card flex flex-col filter-item" data-category="${p.category}">
          <div class="zoom-wrap aspect-[4/3]">${imgTag(p.img, p.name + ' from B. D. Oboh Integrity Farm', 'w-full h-full object-cover ' + p.pos, 640, 480)}</div>
          <div class="p-6 flex flex-col flex-1">
            <span class="text-xs font-bold uppercase tracking-wider text-leaf-600 dark:text-leaf-400">${escapeHTML(p.categoryLabel)}</span>
            <h3 class="text-xl font-bold mt-1 mb-2">${escapeHTML(p.name)}</h3>
            <p class="text-sm leading-relaxed opacity-80 flex-1">${escapeHTML(p.short)}</p>
            <button type="button" class="btn btn-primary btn-sm mt-5 self-start" data-open-product="${p.id}">View Product <i class="fa-solid fa-eye text-xs" aria-hidden="true"></i></button>
          </div>
        </article>`).join('');
    },
    projects() {
      $('#project-grid').innerHTML = PROJECTS.map((p) => `
        <article class="card group filter-item relative" data-category="${p.category}">
          <button type="button" class="block w-full text-left" data-open-project="${p.id}" aria-label="Open project: ${escapeHTML(p.title)}">
            <div class="zoom-wrap relative aspect-[16/11]">
              ${imgTag(p.img, p.title, 'w-full h-full object-cover', 640, 440)}
              <div class="absolute inset-0 bg-gradient-to-t from-forest-950/85 via-forest-950/10 to-transparent"></div>
              <span class="absolute top-4 left-4 badge-demo !bg-white/90 !text-forest-800">${escapeHTML(p.categoryLabel)}</span>
              <div class="absolute bottom-4 left-5 right-5 text-white">
                <h3 class="text-lg font-bold leading-snug">${escapeHTML(p.title)}</h3>
                <p class="text-sm opacity-90 mt-1 line-clamp-3">${escapeHTML(p.short)}</p>
              </div>
            </div>
          </button>
        </article>`).join('');
    },
    gallery() {
      $('#gallery-grid').innerHTML = GALLERY.map((g, i) => `
        <button type="button" class="gallery-item reveal reveal-scale" data-index="${i}" aria-label="Open image: ${escapeHTML(g.cap)}">
          ${imgTag(g.src, g.alt, '', 640, 480)}
          <span class="cap">${escapeHTML(g.cap)}</span>
        </button>`).join('');
    },
    news() {
      $('#news-grid').innerHTML = NEWS.map((n, i) => `
        <article class="card flex flex-col reveal" style="--d:${(i % 4) * 80}ms">
          <div class="zoom-wrap aspect-[16/10]">${imgTag(n.img, n.title, 'w-full h-full object-cover', 640, 400)}</div>
          <div class="p-5 flex flex-col flex-1">
            <div class="flex items-center justify-between gap-2 text-xs mb-3">
              <span class="font-bold uppercase tracking-wider text-leaf-600 dark:text-leaf-400">${escapeHTML(n.category)}</span>
              <time datetime="${n.date}" class="opacity-70">${formatDate(n.date)}</time>
            </div>
            <h3 class="text-lg font-bold leading-snug mb-2">${escapeHTML(n.title)}</h3>
            <p class="text-sm opacity-80 leading-relaxed flex-1">${escapeHTML(n.short)}</p>
            <div class="flex items-center justify-between mt-5">
              <button type="button" class="btn btn-outline-dark btn-sm" data-open-news="${n.id}">Read More</button>
              <span class="badge-demo">Demo</span>
            </div>
          </div>
        </article>`).join('');
    },
    sustainability() {
      $('#sustain-grid').innerHTML = SUSTAINABILITY.map((s, i) => `
        <div class="rounded-2xl p-6 bg-white/5 border border-white/10 hover:bg-white/10 transition-colors reveal" style="--d:${(i % 3) * 90}ms">
          <span class="w-12 h-12 rounded-xl bg-leaf-500/20 text-leaf-400 flex items-center justify-center text-xl mb-4" aria-hidden="true"><i class="fa-solid ${s.icon}"></i></span>
          <h3 class="text-lg font-bold mb-1">${escapeHTML(s.title)}</h3>
          <p class="text-sm text-cream-100/75 leading-relaxed">${escapeHTML(s.text)}</p>
        </div>`).join('');
    },
    community() {
      $('#community-grid').innerHTML = COMMUNITY.map((c, i) => `
        <li class="flex gap-4 items-start reveal" style="--d:${(i % 4) * 70}ms">
          <span class="shrink-0 w-11 h-11 rounded-xl bg-leaf-500/15 text-leaf-600 dark:text-leaf-400 flex items-center justify-center" aria-hidden="true"><i class="fa-solid ${c.icon}"></i></span>
          <div><h3 class="font-bold font-sans text-base">${escapeHTML(c.title)}</h3><p class="text-sm opacity-80 leading-relaxed">${escapeHTML(c.text)}</p></div>
        </li>`).join('');
    },
    all() {
      this.operations(); this.products(); this.projects(); this.gallery();
      this.news(); this.sustainability(); this.community();
    }
  };

  /* ---------------------------------------------------------
     10. FILTERS (products + projects)
     --------------------------------------------------------- */
  const Filters = {
    setup(barSel, gridSel, emptySel) {
      const bar = $(barSel), grid = $(gridSel), empty = $(emptySel);
      if (!bar || !grid) return;
      bar.addEventListener('click', (e) => {
        const btn = e.target.closest('[data-filter]');
        if (!btn) return;
        $$('[data-filter]', bar).forEach((b) => b.setAttribute('aria-pressed', String(b === btn)));
        const f = btn.dataset.filter;
        let shown = 0;
        $$('.filter-item', grid).forEach((item) => {
          const match = f === 'all' || item.dataset.category === f;
          item.hidden = !match;
          if (match) { shown++; item.style.animation = 'none'; void item.offsetWidth; item.style.animation = ''; }
        });
        if (empty) empty.hidden = shown !== 0;
      });
    },
    init() {
      this.setup('#product-filters', '#product-grid', '#product-empty');
      this.setup('#project-filters', '#project-grid', '#project-empty');
    }
  };

  /* ---------------------------------------------------------
     11. DETAIL MODAL (operations, projects, news)
     --------------------------------------------------------- */
  const Detail = {
    el: null,
    open({ img, alt, tag, title, meta, body, demo, ctaText }) {
      const el = this.el;
      const image = $('#detail-img', el);
      image.src = img; image.alt = alt || title;
      $('#detail-tag', el).textContent = tag || '';
      $('#detail-title', el).textContent = title;
      $('#detail-meta', el).textContent = meta || '';
      $('#detail-demo', el).hidden = !demo;
      $('#detail-body', el).innerHTML = body.map((p) => `<p>${escapeHTML(p)}</p>`).join('');
      $('#detail-cta', el).href = waLink(ctaText || `Hello ${CONFIG.name}, I'd like to know more about: ${title}`);
      Overlay.open(el, '.modal-close');
      $('.modal-panel', el).scrollTop = 0;
    },
    byId(list, id) { return list.find((x) => x.id === id); },
    openOp(id) { const o = this.byId(OPERATIONS, id); if (o) this.open({ img: o.img, tag: 'Farm Operation', title: o.title, body: o.body }); },
    openProject(id) { const p = this.byId(PROJECTS, id); if (p) this.open({ img: p.img, tag: 'Project · ' + p.categoryLabel, title: p.title, body: p.body }); },
    openNews(id) { const n = this.byId(NEWS, id); if (n) this.open({ img: n.img, tag: n.category, title: n.title, meta: formatDate(n.date) + ' · ' + CONFIG.name, body: n.body, demo: true, ctaText: `Hello ${CONFIG.name}, I read your article "${n.title}" and have a question.` }); },
    init() {
      this.el = $('#detail-modal');
      document.addEventListener('click', (e) => {
        const op = e.target.closest('[data-open-op]'); if (op) return this.openOp(op.dataset.openOp);
        const pr = e.target.closest('[data-open-project]'); if (pr) return this.openProject(pr.dataset.openProject);
        const nw = e.target.closest('[data-open-news]'); if (nw) return this.openNews(nw.dataset.openNews);
      });
    }
  };

  /* ---------------------------------------------------------
     12. LIGHTBOX
     --------------------------------------------------------- */
  const Lightbox = {
    index: 0, el: null,
    show(i) {
      this.index = (i + GALLERY.length) % GALLERY.length;
      const g = GALLERY[this.index];
      const img = $('#lightbox-img', this.el);
      img.classList.add('opacity-0');
      const swap = () => { img.src = g.src; img.alt = g.alt; img.classList.remove('opacity-0'); };
      setTimeout(swap, 120);
      $('#lightbox-cap', this.el).textContent = g.cap;
      $('#lightbox-count', this.el).textContent = `${this.index + 1} / ${GALLERY.length}`;
    },
    open(i) { this.show(i); Overlay.open(this.el, '#lightbox-close'); },
    init() {
      this.el = $('#lightbox');
      $('#gallery-grid').addEventListener('click', (e) => { const b = e.target.closest('[data-index]'); if (b) this.open(Number(b.dataset.index)); });
      $('#lightbox-prev').addEventListener('click', () => this.show(this.index - 1));
      $('#lightbox-next').addEventListener('click', () => this.show(this.index + 1));
      document.addEventListener('keydown', (e) => {
        if (!this.el.classList.contains('open')) return;
        if (e.key === 'ArrowLeft') this.show(this.index - 1);
        if (e.key === 'ArrowRight') this.show(this.index + 1);
      });
      // touch swipe
      let x0 = null;
      this.el.addEventListener('touchstart', (e) => { x0 = e.touches[0].clientX; }, { passive: true });
      this.el.addEventListener('touchend', (e) => {
        if (x0 === null) return;
        const dx = e.changedTouches[0].clientX - x0;
        if (Math.abs(dx) > 50) this.show(this.index + (dx < 0 ? 1 : -1));
        x0 = null;
      }, { passive: true });
    }
  };

  /* ---------------------------------------------------------
     13. ORDER SYSTEM (product modal + order drawer + WhatsApp/email)
     --------------------------------------------------------- */
  const Order = {
    key: 'bdo-order',
    items: [],
    currentProduct: null,
    load() { try { this.items = JSON.parse(storage.get(this.key, '[]')) || []; } catch (e) { this.items = []; } this.items = this.items.filter((i) => PRODUCTS.some((p) => p.id === i.id)); },
    save() { storage.set(this.key, JSON.stringify(this.items)); this.updateBadge(); },
    updateBadge() {
      const n = this.items.length;
      $$('.cart-count').forEach((b) => { b.textContent = n; b.hidden = n === 0; b.classList.remove('bump'); if (n) { void b.offsetWidth; b.classList.add('bump'); } });
    },
    openProduct(id) {
      const p = PRODUCTS.find((x) => x.id === id);
      if (!p) return;
      this.currentProduct = p;
      const m = $('#product-modal');
      const img = $('#product-img', m); img.src = p.img; img.alt = p.name; img.className = 'w-full h-full object-cover ' + p.pos;
      $('#product-cat', m).textContent = p.categoryLabel;
      $('#product-name', m).textContent = p.name;
      $('#product-desc', m).textContent = p.long;
      $('#product-points', m).innerHTML = p.points.map((t) => `<li class="flex gap-2"><i class="fa-solid fa-check text-leaf-600 mt-1" aria-hidden="true"></i><span>${escapeHTML(t)}</span></li>`).join('');
      $('#product-unit', m).innerHTML = p.units.map((u) => `<option>${escapeHTML(u)}</option>`).join('');
      $('#product-qty', m).value = 1;
      $('#product-wa', m).href = waLink(`Hello ${CONFIG.name}, I'd like to enquire about: ${p.name}.`);
      Overlay.open(m, '.modal-close');
    },
    addCurrent() {
      const p = this.currentProduct; if (!p) return;
      const qty = Math.max(1, Math.min(9999, parseInt($('#product-qty').value, 10) || 1));
      const unit = $('#product-unit').value;
      const existing = this.items.find((i) => i.id === p.id && i.unit === unit);
      if (existing) existing.qty = Math.min(9999, existing.qty + qty); else this.items.push({ id: p.id, qty, unit });
      this.save(); this.renderDrawer();
      Overlay.close($('#product-modal'));
      Toast.show(`${p.name} added to your order list.`, 'success');
    },
    renderDrawer() {
      const list = $('#order-items'), empty = $('#order-empty'), form = $('#order-form');
      empty.hidden = this.items.length > 0;
      form.hidden = this.items.length === 0;
      list.innerHTML = this.items.map((it, i) => {
        const p = PRODUCTS.find((x) => x.id === it.id);
        return `<li class="flex items-center gap-3 py-3 border-b border-forest-100 dark:border-forest-800">
          ${imgTag(p.img, p.name, 'w-14 h-14 rounded-lg object-cover ' + p.pos, 112, 112)}
          <div class="flex-1 min-w-0">
            <p class="font-semibold text-sm truncate">${escapeHTML(p.name)}</p>
            <p class="text-xs opacity-70">${it.qty} ${escapeHTML(it.unit)}</p>
          </div>
          <div class="flex items-center gap-1">
            <button type="button" class="icon-btn !w-8 !h-8" data-order-dec="${i}" aria-label="Decrease quantity of ${escapeHTML(p.name)}"><i class="fa-solid fa-minus text-xs" aria-hidden="true"></i></button>
            <button type="button" class="icon-btn !w-8 !h-8" data-order-inc="${i}" aria-label="Increase quantity of ${escapeHTML(p.name)}"><i class="fa-solid fa-plus text-xs" aria-hidden="true"></i></button>
            <button type="button" class="icon-btn !w-8 !h-8 text-red-600" data-order-rm="${i}" aria-label="Remove ${escapeHTML(p.name)}"><i class="fa-solid fa-trash text-xs" aria-hidden="true"></i></button>
          </div>
        </li>`;
      }).join('');
    },
    message() {
      const name = ($('#order-name').value || '').trim();
      const phone = ($('#order-phone').value || '').trim();
      const note = ($('#order-note').value || '').trim();
      const lines = this.items.map((it, i) => `${i + 1}. ${PRODUCTS.find((p) => p.id === it.id).name} — ${it.qty} ${it.unit}`);
      const details = [name && `Name: ${name}`, phone && `Phone: ${phone}`, note && `Note: ${note}`].filter(Boolean);
      return [`Hello ${CONFIG.name}, I'd like to place an order enquiry:`, '', ...lines, '', ...details, '', 'Please confirm availability, pack sizes, price and delivery. Thank you.'].join('\n');
    },
    validate() {
      const name = $('#order-name'), err = $('#order-name-err');
      const ok = name.value.trim().length >= 2;
      name.classList.toggle('invalid', !ok);
      err.textContent = ok ? '' : 'Please enter your name so we know who to reply to.';
      if (!ok) name.focus();
      return ok;
    },
    init() {
      this.load(); this.updateBadge(); this.renderDrawer();
      const drawer = $('#order-drawer');
      document.addEventListener('click', (e) => {
        const op = e.target.closest('[data-open-product]'); if (op) return this.openProduct(op.dataset.openProduct);
        if (e.target.closest('[data-open-order]')) { this.renderDrawer(); return Overlay.open(drawer, '[data-close]'); }
        const inc = e.target.closest('[data-order-inc]'), dec = e.target.closest('[data-order-dec]'), rm = e.target.closest('[data-order-rm]');
        if (inc) { const it = this.items[+inc.dataset.orderInc]; it.qty = Math.min(9999, it.qty + 1); }
        else if (dec) { const it = this.items[+dec.dataset.orderDec]; it.qty = Math.max(1, it.qty - 1); }
        else if (rm) { this.items.splice(+rm.dataset.orderRm, 1); }
        else return;
        this.save(); this.renderDrawer();
      });
      $('#product-add').addEventListener('click', () => this.addCurrent());
      $('#order-wa').addEventListener('click', () => { if (this.validate()) { window.open(waLink(this.message()), '_blank', 'noopener'); Toast.show('Opening WhatsApp with your order enquiry…', 'info'); } });
      $('#order-mail').addEventListener('click', () => {
        if (!this.validate()) return;
        window.location.href = `mailto:${CONFIG.email}?subject=${encodeURIComponent('Order enquiry — ' + CONFIG.name)}&body=${encodeURIComponent(this.message())}`;
      });
      $('#order-clear').addEventListener('click', () => { this.items = []; this.save(); this.renderDrawer(); Toast.show('Order list cleared.', 'info'); });
      $('#order-form').addEventListener('submit', (e) => e.preventDefault());
    }
  };

  /* ---------------------------------------------------------
     14. SEARCH (debounced, global)
     --------------------------------------------------------- */
  const Search = {
    el: null, input: null, results: null, cursor: -1,
    index() {
      return [
        ...PRODUCTS.map((p) => ({ type: 'Product', title: p.name, text: p.short + ' ' + p.categoryLabel, icon: 'fa-bag-shopping', action: { kind: 'product', id: p.id } })),
        ...OPERATIONS.map((o) => ({ type: 'Operation', title: o.title, text: o.short, icon: o.icon, action: { kind: 'op', id: o.id } })),
        ...PROJECTS.map((p) => ({ type: 'Project', title: p.title, text: p.short + ' ' + p.categoryLabel, icon: 'fa-diagram-project', action: { kind: 'project', id: p.id } })),
        ...NEWS.map((n) => ({ type: 'News', title: n.title, text: n.short + ' ' + n.category, icon: 'fa-newspaper', action: { kind: 'news', id: n.id } }))
      ];
    },
    highlight(text, terms) {
      let out = escapeHTML(text);
      terms.forEach((t) => { if (t.length > 1) out = out.replace(new RegExp('(' + t.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + ')', 'gi'), '<mark class="hl">$1</mark>'); });
      return out;
    },
    run(q) {
      const terms = q.toLowerCase().split(/\s+/).filter(Boolean);
      const box = this.results;
      if (!terms.length) { box.innerHTML = '<p class="text-sm opacity-70 px-2 py-6 text-center">Start typing to search products, operations, projects and news.</p>'; return; }
      const hits = this.data.filter((d) => { const hay = (d.title + ' ' + d.text).toLowerCase(); return terms.every((t) => hay.includes(t)); });
      if (!hits.length) {
        box.innerHTML = `<div class="text-center py-10"><i class="fa-regular fa-face-frown text-3xl opacity-50 mb-3" aria-hidden="true"></i><p class="font-semibold">No results found</p><p class="text-sm opacity-70 mt-1">Nothing matched “${escapeHTML(q)}”. Try “garri”, “cassava” or “flour”.</p></div>`;
        return;
      }
      box.innerHTML = `<p class="text-xs uppercase tracking-wider opacity-60 px-2 mb-2" aria-live="polite">${hits.length} result${hits.length > 1 ? 's' : ''}</p><ul role="list">` + hits.map((h, i) => `
        <li><button type="button" class="search-hit w-full text-left flex gap-3 items-start p-3 rounded-xl hover:bg-forest-50 dark:hover:bg-forest-800 focus:bg-forest-50 dark:focus:bg-forest-800" data-hit="${i}">
          <span class="w-10 h-10 rounded-lg bg-leaf-500/15 text-leaf-600 dark:text-leaf-400 flex items-center justify-center shrink-0" aria-hidden="true"><i class="fa-solid ${h.icon}"></i></span>
          <span class="min-w-0"><span class="block text-xs font-bold uppercase tracking-wider text-leaf-600 dark:text-leaf-400">${h.type}</span>
          <span class="block font-semibold">${this.highlight(h.title, terms)}</span>
          <span class="block text-sm opacity-70 line-clamp-3">${this.highlight(h.text.slice(0, 140), terms)}</span></span>
        </button></li>`).join('') + '</ul>';
      this.hits = hits; this.cursor = -1;
    },
    go(hit) {
      Overlay.close(this.el);
      const a = hit.action;
      const sections = { product: '#products', op: '#operations', project: '#projects', news: '#news' };
      const target = $(sections[a.kind]);
      if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setTimeout(() => {
        if (a.kind === 'product') Order.openProduct(a.id);
        if (a.kind === 'op') Detail.openOp(a.id);
        if (a.kind === 'project') Detail.openProject(a.id);
        if (a.kind === 'news') Detail.openNews(a.id);
      }, 450);
    },
    init() {
      this.el = $('#search-overlay'); this.input = $('#search-input'); this.results = $('#search-results');
      this.data = this.index();
      const open = () => { Overlay.open(this.el, '#search-input'); this.run(this.input.value); };
      $$('[data-open-search]').forEach((b) => b.addEventListener('click', open));
      this.input.addEventListener('input', debounce(() => this.run(this.input.value.trim()), CONFIG.searchDebounce));
      this.results.addEventListener('click', (e) => { const b = e.target.closest('[data-hit]'); if (b) this.go(this.hits[+b.dataset.hit]); });
      this.input.addEventListener('keydown', (e) => {
        const btns = $$('.search-hit', this.results);
        if (e.key === 'ArrowDown' && btns.length) { e.preventDefault(); this.cursor = (this.cursor + 1) % btns.length; btns[this.cursor].focus(); }
        if (e.key === 'Enter' && btns.length) { e.preventDefault(); btns[0].click(); }
      });
      this.results.addEventListener('keydown', (e) => {
        const btns = $$('.search-hit', this.results); if (!btns.length) return;
        if (e.key === 'ArrowDown') { e.preventDefault(); this.cursor = Math.min(this.cursor + 1, btns.length - 1); btns[this.cursor].focus(); }
        if (e.key === 'ArrowUp') { e.preventDefault(); this.cursor = this.cursor - 1; if (this.cursor < 0) { this.cursor = -1; this.input.focus(); } else btns[this.cursor].focus(); }
      });
      document.addEventListener('keydown', (e) => {
        const tag = (document.activeElement && document.activeElement.tagName) || '';
        if ((e.key === 'k' && (e.ctrlKey || e.metaKey)) || (e.key === '/' && !/INPUT|TEXTAREA|SELECT/.test(tag))) { e.preventDefault(); open(); }
      });
    }
  };

  /* ---------------------------------------------------------
     15. TESTIMONIAL CAROUSEL
     --------------------------------------------------------- */
  const Carousel = {
    i: 0, timer: null,
    initials(n) { return n.split(/\s+/).map((w) => w[0]).slice(0, 2).join('').toUpperCase(); },
    init() {
      const track = $('#carousel-track'), dots = $('#carousel-dots'), root = $('#carousel');
      if (!track) return;
      track.innerHTML = TESTIMONIALS.map((t, i) => `
        <figure class="carousel-slide" role="group" aria-roledescription="slide" aria-label="${i + 1} of ${TESTIMONIALS.length}">
          <div class="max-w-3xl mx-auto text-center bg-white dark:bg-forest-900 rounded-3xl shadow-lg px-6 sm:px-12 py-10 border border-forest-100 dark:border-forest-800">
            <i class="fa-solid fa-quote-left text-3xl text-gold mb-5" style="color:#d4a72c" aria-hidden="true"></i>
            <blockquote class="font-display text-xl sm:text-2xl leading-relaxed">“${escapeHTML(t.quote)}”</blockquote>
            <figcaption class="mt-7 flex flex-col items-center gap-2">
              <span class="w-14 h-14 rounded-full bg-forest-700 text-white font-bold flex items-center justify-center text-lg" aria-hidden="true">${this.initials(t.name)}</span>
              <span class="font-bold">${escapeHTML(t.name)}</span>
              <span class="text-sm opacity-70">${escapeHTML(t.role)} · ${escapeHTML(t.location)}</span>
              <span class="badge-demo mt-1">Demonstration content</span>
            </figcaption>
          </div>
        </figure>`).join('');
      dots.innerHTML = TESTIMONIALS.map((_, i) => `<button type="button" class="dot" data-dot="${i}" aria-label="Go to testimonial ${i + 1}"></button>`).join('');
      const go = (n) => {
        this.i = (n + TESTIMONIALS.length) % TESTIMONIALS.length;
        track.style.transform = `translateX(-${this.i * 100}%)`;
        $$('.dot', dots).forEach((d, k) => d.setAttribute('aria-current', String(k === this.i)));
        $$('.carousel-slide', track).forEach((s, k) => s.setAttribute('aria-hidden', String(k !== this.i)));
      };
      const start = () => { stop(); this.timer = setInterval(() => go(this.i + 1), CONFIG.carouselInterval); };
      const stop = () => { clearInterval(this.timer); };
      $('#carousel-prev').addEventListener('click', () => { go(this.i - 1); start(); });
      $('#carousel-next').addEventListener('click', () => { go(this.i + 1); start(); });
      dots.addEventListener('click', (e) => { const d = e.target.closest('[data-dot]'); if (d) { go(+d.dataset.dot); start(); } });
      root.addEventListener('mouseenter', stop); root.addEventListener('mouseleave', start);
      root.addEventListener('focusin', stop); root.addEventListener('focusout', start);
      root.addEventListener('keydown', (e) => { if (e.key === 'ArrowLeft') { go(this.i - 1); } if (e.key === 'ArrowRight') { go(this.i + 1); } });
      let x0 = null;
      root.addEventListener('touchstart', (e) => { x0 = e.touches[0].clientX; stop(); }, { passive: true });
      root.addEventListener('touchend', (e) => { if (x0 !== null) { const dx = e.changedTouches[0].clientX - x0; if (Math.abs(dx) > 45) go(this.i + (dx < 0 ? 1 : -1)); x0 = null; } start(); }, { passive: true });
      document.addEventListener('visibilitychange', () => { document.hidden ? stop() : start(); });
      go(0); start();
    }
  };

  /* ---------------------------------------------------------
     16. CONTACT FORM (validation, no backend)
     --------------------------------------------------------- */
  const ContactForm = {
    rules: {
      name: (v) => v.trim().length >= 2 || 'Please tell us your full name.',
      email: (v) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim()) || 'Please enter a valid email address, e.g. name@example.com.',
      phone: (v) => /^(\+?234|0)[789][01]\d{8}$/.test(v.replace(/[\s-]/g, '')) || 'Please enter a valid Nigerian number, e.g. 08033784145.',
      subject: (v) => v.trim().length >= 3 || 'Please add a short subject.',
      message: (v) => v.trim().length >= 10 || 'Your message should be at least 10 characters.'
    },
    check(field) {
      const input = $('#c-' + field), err = $('#c-' + field + '-err');
      const res = this.rules[field](input.value);
      const ok = res === true;
      input.classList.toggle('invalid', !ok);
      input.setAttribute('aria-invalid', String(!ok));
      err.textContent = ok ? '' : res;
      return ok;
    },
    init() {
      const form = $('#contact-form');
      if (!form) return;
      Object.keys(this.rules).forEach((f) => {
        const input = $('#c-' + f);
        input.addEventListener('blur', () => { if (input.value) this.check(f); });
        input.addEventListener('input', () => { if (input.classList.contains('invalid')) this.check(f); });
      });
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        const results = Object.keys(this.rules).map((f) => this.check(f));
        if (results.every(Boolean)) {
          form.reset();
          Toast.show('Thank you! Your message has been received.', 'success', 5200);
        } else {
          const firstBad = Object.keys(this.rules).find((f) => $('#c-' + f).classList.contains('invalid'));
          if (firstBad) $('#c-' + firstBad).focus();
          Toast.show('Please fix the highlighted fields and try again.', 'error');
        }
      });
      $('#contact-wa').addEventListener('click', () => {
        const results = Object.keys(this.rules).map((f) => this.check(f));
        if (!results.every(Boolean)) { Toast.show('Please complete the form first.', 'error'); return; }
        const v = (f) => $('#c-' + f).value.trim();
        window.open(waLink(`Hello ${CONFIG.name},\n\nName: ${v('name')}\nEmail: ${v('email')}\nPhone: ${v('phone')}\nSubject: ${v('subject')}\n\n${v('message')}`), '_blank', 'noopener');
      });
    }
  };

  /* ---------------------------------------------------------
     17. BACK-TO-TOP, CONTACT LINKS, FOOTER YEAR
     --------------------------------------------------------- */
  const Extras = {
    init() {
      const btn = $('#back-to-top');
      const toggle = () => btn.classList.toggle('show', window.scrollY > 600);
      toggle(); window.addEventListener('scroll', toggle, { passive: true });
      btn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

      // Contact details come from CONFIG so there is one place to edit.
      $$('[data-phone]').forEach((el) => { const p = CONFIG.phones[+el.dataset.phone]; el.textContent = p; el.href = 'tel:' + toIntlPhone(p); });
      $$('[data-email]').forEach((el) => { el.textContent = CONFIG.email; el.href = 'mailto:' + CONFIG.email; });
      // Farm Address
$$('[data-address]').forEach((el) => {
  el.textContent = CONFIG.farmAddress;
});

// Office Address
$$('[data-office-address]').forEach((el) => {
  el.textContent = CONFIG.officeAddress;
});
      $$('[data-whatsapp]').forEach((el) => { el.href = waLink(`Hello ${CONFIG.name}, I'd like to make an enquiry.`); });
      $$('[data-facebook]').forEach((el) => { el.href = CONFIG.facebook; });
      $$('[data-year]').forEach((el) => { el.textContent = new Date().getFullYear(); });

      // Disabled social icons (no official link supplied yet)
      $$('[data-social-pending]').forEach((el) => el.addEventListener('click', (e) => { e.preventDefault(); Toast.show(`${el.dataset.socialPending} page coming soon. Follow us on Facebook for now.`, 'info'); }));

      // Smooth-scroll for in-page links that point to missing targets should not throw
      $$('a[href^="#"]').forEach((a) => {
        const id = a.getAttribute('href');
        if (id.length > 1 && !$(id)) a.addEventListener('click', (e) => e.preventDefault());
      });
    }
  };


  /* ---------------------------------------------------------
     17b. MOTION — loader, parallax, leaves, rotator, tilt…
          Each effect is its own small function and is skipped
          when the visitor prefers reduced motion.
     --------------------------------------------------------- */
  const Motion = {
    reduce: !!(window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches),
    finePointer: !!(window.matchMedia && window.matchMedia('(hover: hover) and (pointer: fine)').matches),

    preloader() {
      const el = $('#preloader');
      if (!el) return;
      const t0 = performance.now();
      const hide = () => {
        const wait = this.reduce ? 0 : Math.max(0, 800 - (performance.now() - t0));
        setTimeout(() => { el.classList.add('hide'); document.body.classList.add('is-loaded'); setTimeout(() => el.remove(), 700); }, wait);
      };
      if (document.readyState === 'complete') hide(); else window.addEventListener('load', hide, { once: true });
    },

    scrollProgress() {
      const bar = $('#scroll-progress');
      if (!bar) return;
      let ticking = false;
      const update = () => {
        const max = document.documentElement.scrollHeight - window.innerHeight;
        bar.style.transform = `scaleX(${max > 0 ? Math.min(window.scrollY / max, 1) : 0})`;
        ticking = false;
      };
      window.addEventListener('scroll', () => { if (!ticking) { ticking = true; requestAnimationFrame(update); } }, { passive: true });
      update();
    },

    parallax() {
      const wrap = $('#hero-parallax');
      if (!wrap || this.reduce) return;
      let ticking = false;
      const update = () => {
        const y = window.scrollY;
        if (y < window.innerHeight * 1.3) wrap.style.transform = `translate3d(0, ${(y * 0.22).toFixed(1)}px, 0)`;
        ticking = false;
      };
      window.addEventListener('scroll', () => { if (!ticking) { ticking = true; requestAnimationFrame(update); } }, { passive: true });
    },

    leaves() {
      const box = $('#hero-leaves');
      if (!box || this.reduce) return;
      const LEAF = '<svg viewBox="0 0 24 24" width="100%" height="100%" fill="currentColor" aria-hidden="true"><path d="M20 3C10 3 4 8 4 15c0 1.6.5 3 1.3 4.2C6 15 9 11 14 9c-4 3-6.5 6.5-7.3 11C8 20.6 9.4 21 11 21c7 0 10-7 9-18z"/></svg>';
      const count = window.innerWidth < 640 ? 7 : 14;
      const rand = (a, b) => a + Math.random() * (b - a);
      const frag = document.createDocumentFragment();
      for (let i = 0; i < count; i++) {
        const s = document.createElement('span');
        s.className = 'leaf';
        const size = rand(14, 30);
        s.style.cssText = `left:${rand(0, 98).toFixed(1)}%;width:${size.toFixed(0)}px;height:${size.toFixed(0)}px;` +
          `color:${i % 3 === 0 ? '#d4a72c' : '#7bc74d'};opacity:${rand(0.18, 0.4).toFixed(2)};` +
          `animation-duration:${rand(13, 24).toFixed(1)}s;animation-delay:-${rand(0, 22).toFixed(1)}s;--drift:${rand(-110, 110).toFixed(0)}px`;
        s.innerHTML = LEAF;
        frag.appendChild(s);
      }
      box.appendChild(frag);
      if ('IntersectionObserver' in window) {
        new IntersectionObserver((e) => box.classList.toggle('paused', !e[0].isIntersecting), { threshold: 0 }).observe($('#home'));
      }
    },

    rotator() {
      const el = $('#word-rotator');
      if (!el) return;
      const words = ['Cassava', 'Garri', 'Cassava Flour', 'Fufu', 'White Amala'];
      let i = 0;
      setInterval(() => {
        if (document.hidden) return;
        el.classList.add('out');
        setTimeout(() => {
          i = (i + 1) % words.length;
          el.textContent = words[i];
          el.classList.add('pre'); el.classList.remove('out');
          void el.offsetWidth;
          el.classList.remove('pre');
        }, 360);
      }, 2600);
    },

    tilt() {
      if (this.reduce || !this.finePointer) return;
      let current = null;
      const reset = (c) => { if (!c) return; c.style.setProperty('--rx', '0deg'); c.style.setProperty('--ry', '0deg'); c.classList.remove('tilting'); };
      document.addEventListener('pointermove', (e) => {
        const card = e.target.closest ? e.target.closest('.card') : null;
        if (current && current !== card) reset(current);
        current = card;
        if (!card) return;
        const r = card.getBoundingClientRect();
        const px = (e.clientX - r.left) / r.width - 0.5;
        const py = (e.clientY - r.top) / r.height - 0.5;
        card.classList.add('tilting');
        card.style.setProperty('--rx', (-py * 5).toFixed(2) + 'deg');
        card.style.setProperty('--ry', (px * 6).toFixed(2) + 'deg');
      }, { passive: true });
      window.addEventListener('blur', () => { reset(current); current = null; });
    },

    ripple() {
      if (this.reduce) return;
      document.addEventListener('click', (e) => {
        const btn = e.target.closest ? e.target.closest('.btn') : null;
        if (!btn) return;
        const r = btn.getBoundingClientRect();
        const d = Math.max(r.width, r.height) * 2;
        const x = e.clientX ? e.clientX - r.left : r.width / 2;
        const y = e.clientY ? e.clientY - r.top : r.height / 2;
        const s = document.createElement('span');
        s.className = 'ripple';
        s.style.cssText = `width:${d}px;height:${d}px;left:${x - d / 2}px;top:${y - d / 2}px`;
        btn.appendChild(s);
        setTimeout(() => s.remove(), 700);
      });
    },

    timeline() {
      const tl = $('.timeline');
      if (!tl) return;
      if (!('IntersectionObserver' in window)) { tl.classList.add('is-drawn'); return; }
      new IntersectionObserver((e, o) => { if (e[0].isIntersecting) { tl.classList.add('is-drawn'); o.disconnect(); } }, { threshold: 0.25 }).observe(tl);
    },

    themeSpin() {
      const btn = $('#theme-toggle');
      if (!btn || this.reduce) return;
      btn.addEventListener('click', () => {
        const icon = $('i', btn);
        icon.classList.remove('spin'); void icon.offsetWidth; icon.classList.add('spin');
      });
    },

    init() {
      this.preloader(); this.scrollProgress(); this.parallax(); this.leaves(); this.rotator();
      this.tilt(); this.ripple(); this.timeline(); this.themeSpin();
    }
  };

  /* ---------------------------------------------------------

  
     18. INIT
     --------------------------------------------------------- */
function AddressInit() {
  const farmAddress = document.querySelector('[data-farm-address]');
  const officeAddress = document.querySelector('[data-office-address]');

  if (farmAddress) {
    farmAddress.textContent = CONFIG.farmAddress;
  }

  if (officeAddress) {
    officeAddress.textContent = CONFIG.officeAddress;
  }
}
  
  function init() {
  document.documentElement.classList.remove('no-js');

  Theme.init();
  Render.all();
  AddressInit();
  Overlay.init();
  Nav.init();
  Counters.init();
  Progress.init();
  Filters.init();
  Detail.init();
  Lightbox.init();
  Order.init();
  Search.init();
  Carousel.init();
  ContactForm.init();
  Extras.init();
  Reveal.init();
  Motion.init();
  
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();

