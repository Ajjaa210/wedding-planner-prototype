const categories = [
  "Outfits",
  "Jewellery",
  "Venue",
  "Decor",
  "Food",
  "Photography",
  "Makeup",
  "Planner",
];
const styles = ["Classic", "Contemporary", "Minimal", "Colourful", "Nature-led", "Cultural"];
const functions = ["Engagement", "Mehendi", "Haldi", "Wedding", "Reception", "Other"];

const vendors = [
  {
    id: "rang-studio",
    name: "Rang Studio",
    category: "Outfits",
    city: "Jaipur",
    styles: ["Colourful", "Cultural", "Classic"],
    tags: ["Made-to-measure", "Multi-function"],
    why: "A broad colour palette may work with the colourful, multi-function brief you described.",
    intro: "An illustrative outfit studio profile for exploring how a vendor page could present services and fit. This fictional profile has no real portfolio, pricing or availability.",
    art: "art-rose",
    initials: "R",
  },
  {
    id: "gulmohar-house",
    name: "Gulmohar House",
    category: "Venue",
    city: "Jaipur",
    styles: ["Nature-led", "Classic", "Cultural"],
    tags: ["Outdoor spaces", "Guest-size options"],
    why: "Outdoor spaces could suit a nature-led celebration; ask the venue about dates and guest capacity.",
    intro: "An illustrative venue profile with a sample service description. Venue location, capacity, facilities, price and availability are not verified.",
    art: "art-sage",
    initials: "G",
  },
  {
    id: "studio-saanjh",
    name: "Studio Saanjh",
    category: "Photography",
    city: "Jaipur",
    styles: ["Documentary", "Contemporary", "Colourful"],
    tags: ["Photo + film", "Multiple events"],
    why: "Coverage across multiple events may be relevant to your function list. Confirm the package and crew directly.",
    intro: "A fictional photography profile to test vendor discovery. No real images, package details, portfolio or booking availability are represented.",
    art: "art-blue",
    initials: "S",
  },
  {
    id: "mitti-mandir",
    name: "Mitti & Marigold",
    category: "Decor",
    city: "Jaipur",
    styles: ["Nature-led", "Minimal", "Colourful"],
    tags: ["Reusable details", "Floral styling"],
    why: "The nature-led styling tags align with your preferences; ask about materials and sourcing.",
    intro: "A fictional décor studio profile. Images, services, environmental claims, prices and availability would need validation before publication.",
    art: "art-gold",
    initials: "M",
  },
  {
    id: "the-saffron-table",
    name: "The Saffron Table",
    category: "Food",
    city: "Jaipur",
    styles: ["Cultural", "Contemporary", "Classic"],
    tags: ["Menu consultation", "Dietary requests"],
    why: "A menu consultation could help accommodate different family preferences and dietary needs.",
    intro: "A fictional caterer profile for testing inclusive discovery. Menu, food safety, dietary accommodation and pricing are not verified.",
    art: "art-purple",
    initials: "T",
  },
  {
    id: "aaina-adornment",
    name: "Aaina Adornment",
    category: "Jewellery",
    city: "Jaipur",
    styles: ["Classic", "Cultural", "Contemporary"],
    tags: ["Styling consultation", "Traditional + modern"],
    why: "The profile shows a mix of traditional and modern styling to support different personal tastes.",
    intro: "A fictional jewellery profile. Materials, authenticity, craft, pricing and availability must be confirmed before any real-world decision.",
    art: "art-gold",
    initials: "A",
  },
  {
    id: "gulabi-room",
    name: "The Gulabi Room",
    category: "Makeup",
    city: "Jaipur",
    styles: ["Minimal", "Classic", "Contemporary"],
    tags: ["Trial consultation", "Multiple functions"],
    why: "A trial consultation can help you discuss a look that feels comfortable across your celebrations.",
    intro: "A fictional beauty service profile. No artist credentials, hygiene practices, products, prices or availability are verified.",
    art: "art-rose",
    initials: "G",
  },
  {
    id: "saath-planning",
    name: "Saath Planning Co.",
    category: "Planner",
    city: "Jaipur",
    styles: ["Cultural", "Classic", "Contemporary"],
    tags: ["Function coordination", "Family collaboration"],
    why: "Coordination across functions may help when several people are sharing planning tasks.",
    intro: "A fictional planner profile for prototyping the enquiry flow. Experience, references, services, fees and availability are not verified.",
    art: "art-sage",
    initials: "S",
  },
];

const initialTasks = [
  { id: "functions", title: "List the functions you want to plan", meta: "Start with what matters most" },
  { id: "guest-list", title: "Create a first guest-count estimate", meta: "An estimate is enough to start" },
  { id: "budget", title: "Agree a comfortable overall budget", meta: "Leave room for priorities to change" },
  { id: "venue", title: "Shortlist a venue and confirm availability", meta: "Ask about capacity, access and inclusions" },
  { id: "photo", title: "Compare photography portfolios", meta: "Check coverage across your functions" },
  { id: "vendors", title: "Send your first vendor enquiries", meta: "Ask for current prices and terms" },
];

const state = {
  version: "v2",
  page: "home",
  vendorsPage: "results",
  selectedVendor: null,
  brief: load("shaadi-brief", null),
  matchPreferences: load("shaadi-match-preferences", null),
  favorites: new Set(load("shaadi-favorites", [])),
  tasks: load("shaadi-tasks", initialTasks.map((task) => ({ ...task, done: false }))),
  filters: { categories: new Set(), styles: new Set() },
  compare: new Set(),
};

const content = document.querySelector("#app-content");
const dialog = document.querySelector("#app-dialog");
const dialogContent = document.querySelector("#dialog-content");
const toastRegion = document.querySelector("#toast-region");

function load(key, fallback) {
  try {
    const saved = localStorage.getItem(key);
    return saved ? JSON.parse(saved) : fallback;
  } catch {
    return fallback;
  }
}

function persist(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    showToast("Your browser could not save this change. It will last only for this visit.");
  }
}

function escapeHtml(value = "") {
  return String(value).replace(/[&<>"']/g, (char) => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;",
  })[char]);
}

function showToast(message) {
  const toast = document.createElement("div");
  toast.className = "toast";
  toast.textContent = message;
  toastRegion.append(toast);
  window.setTimeout(() => toast.remove(), 3200);
}

function setPage(page) {
  if (page === "match" && state.version !== "v2") return;
  state.page = page;
  state.selectedVendor = null;
  state.vendorsPage = "results";
  render();
}

function updateNavigation() {
  const labels = { home: "Overview", discover: "Find vendors", match: "Find your match", shortlist: "My shortlist", planner: "Planning board" };
  document.body.classList.toggle("v1-mode", state.version === "v1");
  document.querySelector("#page-crumb").textContent = labels[state.page] || "Overview";
  document.querySelectorAll(".nav-item").forEach((item) => {
    item.classList.toggle("active", item.dataset.nav === state.page);
  });
  document.querySelectorAll("[data-v2-only]").forEach((item) => {
    item.hidden = state.version !== "v2";
  });
  document.querySelector("#shortlist-count").textContent = String(state.favorites.size);
  document.querySelectorAll("[data-version]").forEach((button) => {
    const selected = button.dataset.version === state.version;
    button.classList.toggle("selected", selected);
    button.setAttribute("aria-pressed", String(selected));
  });
}

function art(className, initials) {
  return `<div class="vendor-art ${className}" aria-hidden="true"><span class="vendor-art-mark">${escapeHtml(initials)}</span></div>`;
}

function vendorCard(vendor, options = {}) {
  const saved = state.favorites.has(vendor.id);
  const comparable = state.compare.has(vendor.id);
  const actions = options.hideActions ? "" : `
    <div class="vendor-actions">
      <button class="button secondary small" data-action="compare" data-id="${vendor.id}" aria-pressed="${comparable}">${comparable ? "Added" : "Compare"}</button>
      <button class="button small" data-action="profile" data-id="${vendor.id}">View profile</button>
    </div>`;
  return `<article class="vendor-card">
    ${art(vendor.art, vendor.initials)}
    <div class="vendor-main">
      <div class="vendor-topline">
        <div>
          <div class="vendor-type">${escapeHtml(vendor.category)}</div>
          <h3 class="vendor-name">${escapeHtml(vendor.name)}</h3>
          <div class="vendor-loc">Fictional profile · service area not verified</div>
        </div>
        <button class="save-button ${saved ? "saved" : ""}" data-action="save" data-id="${vendor.id}" aria-label="${saved ? "Remove" : "Save"} ${escapeHtml(vendor.name)}" aria-pressed="${saved}">${saved ? "♥" : "♡"}</button>
      </div>
      ${state.version === "v2" && state.brief ? `<div class="vendor-reason"><strong>Why it may fit</strong> · ${escapeHtml(vendor.why)}</div>` : ""}
      <div class="vendor-tags">${vendor.tags.map((tag) => `<span class="tag">${escapeHtml(tag)}</span>`).join("")}</div>
      <div class="vendor-footer">
        <span class="unverified-label">ⓘ Fictional · not verified</span>
        <span class="vendor-price">Price &amp; availability: ask</span>
        ${actions}
      </div>
    </div>
  </article>`;
}

function renderHome() {
  const brief = state.brief;
  const taskCount = state.tasks.filter((task) => task.done).length;
  const events = brief?.functions?.length ? brief.functions : ["Choose your functions"];
  return `<section class="hero">
    <div class="hero-copy">
      <div class="eyebrow">A little more organised, together</div>
      <h1>Make room for what makes your wedding <em>yours.</em></h1>
      <p class="lead">Bring your ideas, practical details and people together. Start with a brief, then explore options that feel right for you.</p>
      <button class="button" data-action="start-brief">${brief ? "Update your wedding brief" : "Build your wedding brief"} <span aria-hidden="true">→</span></button>
    </div>
    <div class="hero-art" aria-hidden="true"><span class="art-sun"></span><span class="art-arch"></span><span class="art-stem"></span></div>
  </section>
  <div class="stats-grid">
    <article class="stat-card"><span class="stat-icon">♡</span><span><strong class="stat-value">${state.favorites.size}</strong><small class="stat-label">Saved ideas</small></span></article>
    <article class="stat-card"><span class="stat-icon">☷</span><span><strong class="stat-value">${taskCount}<span style="font-size:13px;color:var(--muted)"> / ${state.tasks.length}</span></strong><small class="stat-label">Planning steps done</small></span></article>
    <article class="stat-card"><span class="stat-icon">✳</span><span><strong class="stat-value">${brief?.city ? escapeHtml(brief.city) : "Your pace"}</strong><small class="stat-label">${brief?.city ? "Wedding location" : "No rush to decide"}</small></span></article>
  </div>
  <div class="section-heading"><div><div class="eyebrow">Your planning space</div><h2>Start with the big picture</h2></div><button class="text-button" data-nav="planner">Open planning board →</button></div>
  <div class="two-column">
    <section class="panel">
      <div class="panel-title"><h3>Your wedding brief</h3><button class="text-button" data-action="start-brief">${brief ? "Edit details" : "Add details"}</button></div>
      ${brief ? `<div class="wedding-brief">
        ${brief.city ? `<span class="brief-pill">⌖ ${escapeHtml(brief.city)}</span>` : ""}
        ${brief.date ? `<span class="brief-pill">▦ ${escapeHtml(formatDate(brief.date))}</span>` : ""}
        ${brief.guestCount ? `<span class="brief-pill">♧ About ${escapeHtml(brief.guestCount)} guests</span>` : ""}
        ${brief.budget ? `<span class="brief-pill">₹ ${escapeHtml(brief.budget)}</span>` : ""}
        ${brief.styles?.map((style) => `<span class="brief-pill">${escapeHtml(style)}</span>`).join("") || ""}
        ${events.map((event) => `<span class="brief-pill">${escapeHtml(event)}</span>`).join("")}
      </div>` : `<p class="empty-hint">Add your location, functions, budget and preferences to make vendor discovery more useful. You choose what to share.</p>`}
    </section>
    <section class="panel">
      <div class="panel-title"><h3>One next step</h3><span class="tag">${taskCount} of ${state.tasks.length} done</span></div>
      <div class="task-preview">${state.tasks.filter((task) => !task.done).slice(0, 2).map((task) => `<label class="task-row"><input class="task-check" type="checkbox" data-task="${task.id}"><span>${escapeHtml(task.title)}</span></label>`).join("") || `<p class="empty-hint">You’ve checked off every starter task. Add your own next step on the planning board.</p>`}</div>
    </section>
  </div>
  <section class="step-card"><span class="step-number">01</span><span class="step-copy"><strong>Explore at your own pace</strong><span>Start with one category. Your shortlist stays here in this browser.</span></span><button class="button small" data-nav="discover">Browse vendors <span aria-hidden="true">→</span></button></section>`;
}

function renderBriefForm() {
  const brief = state.brief || {};
  const checks = (items, selected, name) => `<div class="choice-grid">${items.map((item) => `<label class="choice-chip"><input type="checkbox" name="${name}" value="${escapeHtml(item)}" ${selected?.includes(item) ? "checked" : ""}><span>${escapeHtml(item)}</span></label>`).join("")}</div>`;
  return `<div class="screen-header">
    <div><div class="eyebrow">Your brief · Step 1 of 2</div><h1>Tell us what matters to you</h1><p class="lead">A few details can help you focus your search. You can skip anything, change it later, and keep personal information private.</p></div>
    <button class="button secondary small" data-nav="home">Save &amp; come back</button>
  </div>
  <form id="brief-form" class="form-layout">
    <div class="form-panel">
      <section class="form-section">
        <h3>The practical details</h3>
        <div class="field-grid">
          <div class="field"><label for="city">Wedding city</label><input id="city" name="city" autocomplete="address-level2" placeholder="e.g. Jaipur" value="${escapeHtml(brief.city || "")}"><small>City is enough for this prototype; no exact address needed.</small></div>
          <div class="field"><label for="date">Date or date range</label><input id="date" name="date" type="date" value="${escapeHtml(brief.date || "")}"><small>Dates are planning information, not availability confirmation.</small></div>
          <div class="field"><label for="budget">Approximate total budget</label><select id="budget" name="budget">
            <option value="">Choose if you’re comfortable sharing</option>
            ${["Under ₹10 lakh", "₹10–25 lakh", "₹25–50 lakh", "₹50 lakh+", "Prefer not to say"].map((item) => `<option ${brief.budget === item ? "selected" : ""}>${item}</option>`).join("")}
          </select><small>Choose a range, or leave this blank.</small></div>
          <div class="field"><label for="guest-count">Approximate guest count</label><input id="guest-count" name="guestCount" type="number" min="1" max="10000" inputmode="numeric" placeholder="e.g. 150" value="${escapeHtml(brief.guestCount || "")}"></div>
        </div>
      </section>
      <section class="form-section"><h3>What feels like you?</h3><div class="field"><span class="field-label">Choose any styles that feel right</span>${checks(styles, brief.styles || [], "styles")}</div></section>
      <section class="form-section"><h3>What are you planning?</h3><div class="field"><span class="field-label">Wedding functions</span>${checks(functions, brief.functions || [], "functions")}</div></section>
      <section class="form-section"><h3>Where would you like help?</h3><div class="field"><span class="field-label">Select any services to explore first</span>${checks(categories, brief.categories || [], "categories")}</div></section>
      <div class="form-actions"><button type="button" class="button secondary" data-nav="home">Cancel</button><button type="submit" class="button">See suggested vendors <span aria-hidden="true">→</span></button></div>
    </div>
    <aside class="aside-note"><span class="note-icon">✳</span><h3>Your wedding, your way</h3><p>There is no single way to celebrate. Add traditions, family needs or personal preferences in your own words when you contact a vendor.</p><ul><li>Only share what you’re comfortable sharing.</li><li>All examples here are fictional.</li><li>Confirm real prices, details and availability directly.</li></ul></aside>
  </form>`;
}

function rankedMatches(preferences) {
  if (!preferences) return [];
  if (!preferences.city && !preferences.budget && !preferences.priorities &&
      !(preferences.categories || []).length && !(preferences.styles || []).length) return [];
  const selectedCategories = preferences.categories || [];
  const selectedStyles = preferences.styles || [];
  const priorities = String(preferences.priorities || "").toLowerCase();
  const city = String(preferences.city || "").trim().toLowerCase();

  return vendors.map((vendor) => {
    let score = 0;
    if (selectedCategories.includes(vendor.category)) score += 5;
    score += vendor.styles.filter((style) => selectedStyles.includes(style)).length * 3;
    if (city && String(vendor.city).toLowerCase().includes(city)) score += 2;
    if (priorities) {
      priorities.split(/[\s,]+/).filter((word) => word.length > 3).forEach((word) => {
        if ([vendor.category, ...vendor.styles, ...vendor.tags, vendor.intro].join(" ").toLowerCase().includes(word)) score += 1;
      });
    }
    return { vendor, score };
  }).sort((a, b) => b.score - a.score).slice(0, 3);
}

function renderFindMatch() {
  const prefs = state.matchPreferences || {};
  const matches = rankedMatches(prefs);
  const selectedCategories = prefs.categories || [];
  const selectedStyles = prefs.styles || [];

  return `<div class="match-screen">
    <section class="match-hero">
      <div class="match-hero-copy">
        <div class="eyebrow">Personalised discovery · V2</div>
        <h1>Find your match</h1>
        <p class="lead">Tell us what matters for your celebration. We’ll turn your preferences into a clearer shortlist of the most relevant example vendors.</p>
        <span class="match-live-pill"><span aria-hidden="true">✦</span> Preference-led matches</span>
      </div>
      <div class="match-orbit" aria-hidden="true">
        <span class="match-orbit-ring ring-one"></span>
        <span class="match-orbit-ring ring-two"></span>
        <span class="match-centre">Yours</span>
      </div>
    </section>

    <div class="match-layout">
      <section class="match-form-card">
        <div class="match-section-heading">
          <div><span class="match-step">01</span><h2>Describe your preference</h2></div>
          <span class="match-private">Private to this browser</span>
        </div>
        <form id="match-form">
          <div class="match-fields">
            <div class="field"><label for="match-city">Celebration city</label><input id="match-city" name="city" placeholder="e.g. Jaipur" value="${escapeHtml(prefs.city || "")}"></div>
            <div class="field"><label for="match-budget">Comfortable budget</label><select id="match-budget" name="budget"><option value="">Choose a range</option>${["Under ₹10 lakh", "₹10–25 lakh", "₹25–50 lakh", "₹50 lakh+", "Prefer not to say"].map((item) => `<option ${prefs.budget === item ? "selected" : ""}>${item}</option>`).join("")}</select></div>
            <div class="field full-width"><label for="match-priorities">What should your vendors understand?</label><textarea id="match-priorities" name="priorities" rows="4" maxlength="500" placeholder="e.g. Warm, intimate celebrations; traditional details, but an easy modern experience…">${escapeHtml(prefs.priorities || "")}</textarea><small>Share your preferences in your own words. Avoid personal or sensitive information.</small></div>
          </div>
          <div class="match-choice-section">
            <div><span class="field-label">Preferred style</span><small>Choose as many as feel right</small></div>
            <div class="choice-grid">${styles.map((style) => `<label class="choice-chip"><input type="checkbox" name="styles" value="${escapeHtml(style)}" ${selectedStyles.includes(style) ? "checked" : ""}><span>${escapeHtml(style)}</span></label>`).join("")}</div>
          </div>
          <div class="match-choice-section">
            <div><span class="field-label">Services you need</span><small>We’ll rank these first</small></div>
            <div class="choice-grid">${categories.map((category) => `<label class="choice-chip"><input type="checkbox" name="categories" value="${escapeHtml(category)}" ${selectedCategories.includes(category) ? "checked" : ""}><span>${escapeHtml(category)}</span></label>`).join("")}</div>
          </div>
          <div class="match-form-actions"><button class="button secondary" type="reset">Clear</button><button class="button" type="submit">Show my ideal matches <span aria-hidden="true">→</span></button></div>
        </form>
      </section>

      <aside class="match-results">
        <div class="match-section-heading">
          <div><span class="match-step warm">02</span><h2>Your ideal matches</h2></div>
          ${matches.length ? `<span class="tag">${matches.length} curated for you</span>` : ""}
        </div>
        ${matches.length ? `<div class="match-card-list">${matches.map(({ vendor, score }, index) => `
          <article class="match-card ${index === 0 ? "best-match" : ""}">
            <div class="match-rank">${index === 0 ? "Best fit" : `Match ${index + 1}`}</div>
            ${art(vendor.art, vendor.initials)}
            <div class="match-card-body">
              <div class="vendor-type">${escapeHtml(vendor.category)}</div>
              <h3>${escapeHtml(vendor.name)}</h3>
              <p>${escapeHtml(vendor.why)}</p>
              <div class="match-fit"><span>Preference fit</span><span class="match-fit-dots">${"●".repeat(Math.min(5, 1 + score))}${"○".repeat(Math.max(0, 5 - 1 - score))}</span></div>
              <div class="match-card-actions"><button class="text-button" data-action="profile" data-id="${vendor.id}">View profile →</button><button class="save-button ${state.favorites.has(vendor.id) ? "saved" : ""}" data-action="save" data-id="${vendor.id}" aria-label="Save ${escapeHtml(vendor.name)}">${state.favorites.has(vendor.id) ? "♥" : "♡"}</button></div>
            </div>
          </article>`).join("")}</div>` : `
          <div class="match-empty">
            <span class="match-empty-symbol">✦</span>
            <h3>Your shortlist starts here</h3>
            <p>Add a few preferences and discover the example vendors that best align with your celebration.</p>
          </div>`}
        <p class="match-disclaimer">Illustrative matches, not real recommendations. Availability, prices and credentials must be verified directly.</p>
      </aside>
    </div>
  </div>`;
}

function filteredVendors() {
  return vendors.filter((vendor) => {
    const categoryMatches = !state.filters.categories.size || state.filters.categories.has(vendor.category);
    const styleMatches = !state.filters.styles.size || vendor.styles.some((style) => state.filters.styles.has(style));
    const briefCategory = !state.brief?.categories?.length || state.page === "shortlist" || state.brief.categories.includes(vendor.category);
    return categoryMatches && styleMatches && briefCategory;
  });
}

function renderFilters() {
  return `<aside class="filters" aria-label="Filter vendors">
    <h3>Refine your list</h3>
    <div class="filter-group"><div class="filter-group-title">SERVICE</div>${categories.map((category) => `<label class="filter-option"><input type="checkbox" data-filter="category" value="${category}" ${state.filters.categories.has(category) ? "checked" : ""}>${category}</label>`).join("")}</div>
    <div class="filter-group"><div class="filter-group-title">STYLE</div>${styles.map((style) => `<label class="filter-option"><input type="checkbox" data-filter="style" value="${style}" ${state.filters.styles.has(style) ? "checked" : ""}>${style}</label>`).join("")}</div>
    <button class="text-button" data-action="clear-filters">Clear filters</button>
  </aside>`;
}

function renderResults() {
  const list = filteredVendors();
  const brief = state.brief;
  const resultContext = brief ? [brief.city, brief.date ? formatDate(brief.date) : "", ...(brief.functions || [])].filter(Boolean) : [];
  return `<div class="screen-header">
    <div><div class="eyebrow">Discover · For your celebration</div><h1>Find your kind of fit</h1><p class="lead">Explore illustrative profiles across wedding services. Use them to test the flow—not as real recommendations.</p></div>
    <button class="button secondary small" data-action="start-brief">Edit wedding brief</button>
  </div>
  ${state.version === "v1" ? `<div class="v1-banner"><strong>V1 · Starting point:</strong> A simple category directory. It does not use a wedding brief, explain fit, or clearly distinguish unverified details. Switch to V2 above to compare the improved experience.</div>` : `<div class="vendor-disclaimer"><span aria-hidden="true">ⓘ</span><span><strong>Demo profiles only.</strong> Names and descriptions are fictional. No ratings, prices, verification or availability are claimed. Ask real vendors for current information.</span></div>`}
  <div class="results-summary">${resultContext.map((item) => `<span class="brief-pill">${escapeHtml(item)}</span>`).join("") || `<span class="brief-pill">All cities · explore categories</span>`}${brief?.budget ? `<span class="brief-pill">${escapeHtml(brief.budget)}</span>` : ""}<span class="brief-pill">${list.length} example profiles</span></div>
  ${state.version === "v1" ? `<div class="v1-directory">${vendors.filter((vendor) => !state.filters.categories.size || state.filters.categories.has(vendor.category)).map((vendor) => `<article class="v1-card">${art(vendor.art, vendor.initials)}<div class="v1-card-body"><div class="vendor-type">${escapeHtml(vendor.category)}</div><h3>${escapeHtml(vendor.name)}</h3><p>${escapeHtml(vendor.city)} · contact for details</p><button class="button secondary small" data-action="profile" data-id="${vendor.id}">View details</button></div></article>`).join("")}</div>`
  : `<div class="results-layout">${renderFilters()}<div>
    <div class="vendor-list">${list.length ? list.map((vendor) => vendorCard(vendor)).join("") : `<div class="empty-state"><span class="empty-symbol">⌕</span><h3>No profiles match these filters</h3><p>Try clearing a service or style filter to see more examples.</p><button class="button secondary small" data-action="clear-filters">Clear filters</button></div>`}</div>
    ${state.compare.size ? `<div class="compare-tray"><span>${state.compare.size} profile${state.compare.size === 1 ? "" : "s"} selected for comparison</span><button class="button secondary small" data-action="open-compare">Compare options →</button></div>` : ""}
  </div></div>`}`;
}

function renderProfile(vendor) {
  return `<div class="screen-header">
    <div><button class="text-button" data-action="back-results">← Back to vendor list</button><div class="eyebrow">${escapeHtml(vendor.category)} · Illustrative profile</div><h1>${escapeHtml(vendor.name)}</h1><p class="lead">A sample vendor profile to help you test what information you may want before making contact.</p></div>
    <button class="save-button ${state.favorites.has(vendor.id) ? "saved" : ""}" data-action="save" data-id="${vendor.id}" aria-label="Save ${escapeHtml(vendor.name)}" aria-pressed="${state.favorites.has(vendor.id)}">${state.favorites.has(vendor.id) ? "♥" : "♡"}</button>
  </div>
  <div class="profile-layout"><div>
    <div class="profile-cover ${vendor.art}" role="img" aria-label="Decorative placeholder artwork for fictional ${escapeHtml(vendor.category.toLowerCase())} profile"></div>
    <section class="profile-body"><div class="vendor-disclaimer"><span>ⓘ</span><span><strong>Fictional example; not verified.</strong> This profile is not a real business. Do not rely on it for price, safety, credentials or availability.</span></div>
      <h2>About this service</h2><p>${escapeHtml(vendor.intro)}</p>
      <h3>Why it may fit your brief</h3><p>${escapeHtml(vendor.why)}</p>
      <h3>Questions to ask</h3><p>Confirm current availability, complete pricing and inclusions, references or portfolio, payment and cancellation terms, and any access or cultural requirements important to you.</p>
    </section>
  </div>
  <aside class="profile-aside"><div class="vendor-type">${escapeHtml(vendor.category)}</div><h3>Details to confirm</h3>
    <div class="profile-fact"><small>Location / service area</small><strong>Not verified</strong></div>
    <div class="profile-fact"><small>Price</small><strong>Ask directly</strong></div>
    <div class="profile-fact"><small>Availability</small><strong>Ask directly</strong></div>
    <div class="profile-fact"><small>Portfolio / credentials</small><strong>Not provided</strong></div>
    <button class="button full" data-action="enquire" data-id="${vendor.id}">Draft an enquiry</button>
    <button class="button secondary full" style="margin-top:8px" data-action="compare" data-id="${vendor.id}">${state.compare.has(vendor.id) ? "Remove from comparison" : "Add to comparison"}</button>
  </aside></div>`;
}

function renderDiscover() {
  if (state.vendorsPage === "profile" && state.selectedVendor) return renderProfile(state.selectedVendor);
  return renderResults();
}

function renderShortlist() {
  const saved = vendors.filter((vendor) => state.favorites.has(vendor.id));
  return `<div class="screen-header"><div><div class="eyebrow">Your saved ideas</div><h1>A shortlist that’s yours</h1><p class="lead">Keep options together while you decide. Saved profiles are stored in this browser only.</p></div><button class="button small" data-nav="discover">Explore vendors</button></div>
    <div class="vendor-disclaimer"><span>ⓘ</span><span>These are fictional prototype profiles. Verify any real vendor details and compare their current terms before deciding.</span></div>
    ${saved.length ? `<div class="vendor-list">${saved.map((vendor) => vendorCard(vendor)).join("")}</div>${state.compare.size ? `<div class="compare-tray"><span>${state.compare.size} profile${state.compare.size === 1 ? "" : "s"} selected</span><button class="button secondary small" data-action="open-compare">Compare options →</button></div>` : ""}` : `<div class="empty-state"><span class="empty-symbol">♡</span><h3>Your shortlist is ready when you are</h3><p>Save a profile using the heart button and it will appear here. There’s no need to decide right away.</p><button class="button" data-nav="discover">Browse example profiles</button></div>`}`;
}

function renderPlanner() {
  const done = state.tasks.filter((task) => task.done).length;
  const progress = state.tasks.length ? Math.round((done / state.tasks.length) * 100) : 0;
  return `<div class="screen-header"><div><div class="eyebrow">A flexible checklist</div><h1>Plan one thing at a time</h1><p class="lead">Keep useful reminders in one place. Move tasks at your own pace or add your own next step.</p></div></div>
  <div class="planner-grid"><section class="panel"><div class="panel-title"><h3>Your planning steps</h3><span class="tag">${done} / ${state.tasks.length} complete</span></div>
    <div class="progress-track" aria-label="${progress}% complete"><div class="progress-fill" style="width:${progress}%"></div></div>
    <div class="planner-list" style="margin-top:14px">${state.tasks.map((task) => `<div class="planner-task ${task.done ? "done" : ""}"><input type="checkbox" id="task-${escapeHtml(task.id)}" data-task="${escapeHtml(task.id)}" ${task.done ? "checked" : ""}><label for="task-${escapeHtml(task.id)}">${escapeHtml(task.title)}<small>${escapeHtml(task.meta || "Added by you")}</small></label><button class="text-button" aria-label="Remove ${escapeHtml(task.title)}" data-action="remove-task" data-id="${escapeHtml(task.id)}">×</button></div>`).join("") || `<p class="empty-hint">No tasks yet.</p>`}</div>
    <form class="add-task" id="add-task-form" style="display:flex;gap:7px;margin-top:12px"><label class="sr-only" for="new-task">Add a planning task</label><input id="new-task" name="task" required maxlength="90" placeholder="Add your own next step…" style="flex:1;min-width:0;padding:9px;border:1px solid var(--line);border-radius:7px;background:#fffefa;font-size:10px"><button class="button small" type="submit">Add task</button></form>
  </section><aside class="aside-note"><span class="note-icon">♡</span><h3>Keep your decisions human</h3><p>This board is a starter checklist, not a recommended schedule. Adapt it to your priorities, traditions and family arrangements.</p><button class="button secondary small" data-nav="shortlist">Open your shortlist</button></aside></div>`;
}

function render() {
  updateNavigation();
  if (state.page === "discover") content.innerHTML = state.vendorsPage === "profile" && state.selectedVendor ? renderProfile(state.selectedVendor) : renderResults();
  else if (state.page === "match" && state.version === "v2") content.innerHTML = renderFindMatch();
  else if (state.page === "shortlist") content.innerHTML = renderShortlist();
  else if (state.page === "planner") content.innerHTML = renderPlanner();
  else content.innerHTML = renderHome();
  content.focus({ preventScroll: true });
}

function openDialog(markup) {
  dialogContent.innerHTML = markup;
  dialog.showModal();
  dialog.querySelector(".close-button")?.focus();
}

function dialogHead(eyebrow, title) {
  return `<div class="dialog-head"><div><div class="eyebrow">${eyebrow}</div><h2 id="dialog-title">${title}</h2></div><button class="close-button" data-action="close-dialog" aria-label="Close dialog">×</button></div>`;
}

function showEnquiry(vendor) {
  openDialog(`<div class="dialog-inner">${dialogHead("A message to start a conversation", "Draft an enquiry")}
    <p class="dialog-copy">This stays on your device. The prototype does not send messages or contact a real vendor. Example profile: <strong>${escapeHtml(vendor.name)}</strong>.</p>
    <form id="enquiry-form"><div class="field-grid">
      <div class="field"><label for="enquiry-name">Your name</label><input id="enquiry-name" name="name" required autocomplete="name" placeholder="Name"></div>
      <div class="field"><label for="enquiry-email">Email (optional)</label><input id="enquiry-email" name="email" type="email" autocomplete="email" placeholder="name@example.com"></div>
      <div class="field full-width"><label for="enquiry-message">What would you like to ask?</label><textarea id="enquiry-message" name="message" rows="4" required>Hi, I’m planning a wedding${state.brief?.city ? ` in ${state.brief.city}` : ""}${state.brief?.date ? ` around ${formatDate(state.brief.date)}` : ""}. Could you share your current services, pricing, availability and next steps?</textarea></div>
    </div><div class="dialog-actions"><button class="button secondary" type="button" data-action="close-dialog">Cancel</button><button class="button" type="submit">Save draft on this device</button></div></form>
  </div>`);
}

function showComparison() {
  const compared = vendors.filter((vendor) => state.compare.has(vendor.id));
  if (!compared.length) return;
  openDialog(`<div class="dialog-inner">${dialogHead("Compare without committing", "Side-by-side notes")}
    <p class="dialog-copy">Example information only. Real prices, dates, quality and credentials are not available in this prototype.</p>
    <div class="compare-grid">${compared.map((vendor) => `<article class="compare-card"><div class="vendor-type">${escapeHtml(vendor.category)}</div><strong>${escapeHtml(vendor.name)}</strong><small>Fictional · not verified</small><p><b>Why it may fit</b><br>${escapeHtml(vendor.why)}</p><p><b>Price / date</b><br>Ask directly</p><p><b>Profile / credentials</b><br>Not provided</p><button class="text-button" data-action="save" data-id="${vendor.id}">${state.favorites.has(vendor.id) ? "♥ Saved" : "♡ Save to shortlist"}</button></article>`).join("")}</div>
    <div class="dialog-actions"><button class="button secondary" data-action="close-dialog">Done</button></div>
  </div>`);
}

function showPrototypeInfo() {
  openDialog(`<div class="dialog-inner">${dialogHead("About this prototype", "What this app does—and doesn’t")}
    <p class="dialog-copy"><strong>V2 demonstrates</strong> a wedding brief, service and style filters, sample fit explanations, fictional vendor profiles, a private shortlist, comparison, enquiry drafting and a flexible planning checklist.</p>
    <p class="dialog-copy"><strong>It does not</strong> use AI, a live vendor database, real ratings, pricing, availability, user accounts or message delivery. All sample vendor names and descriptions are fictional. Your brief, saves and tasks are stored only in this browser.</p>
    <p class="dialog-copy">Do not enter sensitive personal information. To compare the simpler directory baseline, use V1 / V2 at the top of the page.</p>
    <div class="dialog-actions"><button class="button" data-action="close-dialog">Got it</button></div>
  </div>`);
}

function formatDate(value) {
  if (!value) return "";
  const date = new Date(`${value}T12:00:00`);
  if (Number.isNaN(date.getTime())) return value;
  return new Intl.DateTimeFormat("en-IN", { day: "numeric", month: "short", year: "numeric" }).format(date);
}

function persistTasks() { persist("shaadi-tasks", state.tasks); }

document.addEventListener("click", (event) => {
  const nav = event.target.closest("[data-nav]");
  if (nav) {
    event.preventDefault();
    setPage(nav.dataset.nav);
    return;
  }
  const version = event.target.closest("[data-version]");
  if (version) {
    state.version = version.dataset.version;
    state.filters.categories.clear();
    state.filters.styles.clear();
    if (state.version === "v1" && state.page === "match") state.page = "discover";
    render();
    if (state.page === "discover") showToast(state.version === "v1" ? "V1 baseline: simple category browsing." : "V2: guided, explainable discovery with trust cues.");
    return;
  }
  const button = event.target.closest("[data-action]");
  if (!button) return;
  const { action, id } = button.dataset;
  if (action === "start-brief") { content.innerHTML = renderBriefForm(); content.focus(); document.querySelector("#page-crumb").textContent = "Wedding brief"; return; }
  if (action === "save") {
    if (state.favorites.has(id)) state.favorites.delete(id); else state.favorites.add(id);
    persist("shaadi-favorites", [...state.favorites]);
    render();
    if (dialog.open) showComparison();
    else showToast(state.favorites.has(id) ? "Saved to your shortlist on this device." : "Removed from your shortlist.");
    return;
  }
  if (action === "profile") {
    state.selectedVendor = vendors.find((vendor) => vendor.id === id);
    state.vendorsPage = "profile";
    state.page = "discover";
    render();
    return;
  }
  if (action === "back-results") { state.selectedVendor = null; state.vendorsPage = "results"; render(); return; }
  if (action === "compare") {
    if (state.compare.has(id)) state.compare.delete(id); else state.compare.add(id);
    render();
    showToast(state.compare.has(id) ? "Added to side-by-side comparison." : "Removed from comparison.");
    return;
  }
  if (action === "open-compare") { showComparison(); return; }
  if (action === "enquire") { const vendor = vendors.find((item) => item.id === id); if (vendor) showEnquiry(vendor); return; }
  if (action === "clear-filters") { state.filters.categories.clear(); state.filters.styles.clear(); render(); return; }
  if (action === "close-dialog") { dialog.close(); return; }
  if (action === "prototype-info") { showPrototypeInfo(); return; }
  if (action === "remove-task") {
    state.tasks = state.tasks.filter((task) => task.id !== id);
    persistTasks();
    render();
  }
});

document.addEventListener("change", (event) => {
  const checkbox = event.target;
  if (checkbox.matches("[data-filter]")) {
    const collection = checkbox.dataset.filter === "category" ? state.filters.categories : state.filters.styles;
    if (checkbox.checked) collection.add(checkbox.value); else collection.delete(checkbox.value);
    render();
    return;
  }
  if (checkbox.matches("[data-task]")) {
    const task = state.tasks.find((item) => item.id === checkbox.dataset.task);
    if (task) task.done = checkbox.checked;
    persistTasks();
    render();
  }
});

document.addEventListener("reset", (event) => {
  if (event.target.id !== "match-form") return;
  window.setTimeout(() => {
    state.matchPreferences = null;
    persist("shaadi-match-preferences", null);
    render();
  }, 0);
});

document.addEventListener("submit", (event) => {
  if (event.target.id === "brief-form") {
    event.preventDefault();
    const formData = new FormData(event.target);
    const brief = {
      city: String(formData.get("city") || "").trim(),
      date: String(formData.get("date") || ""),
      budget: String(formData.get("budget") || ""),
      guestCount: String(formData.get("guestCount") || ""),
      styles: formData.getAll("styles").map(String),
      functions: formData.getAll("functions").map(String),
      categories: formData.getAll("categories").map(String),
    };
    if (brief.guestCount && (Number(brief.guestCount) < 1 || Number(brief.guestCount) > 10000)) {
      showToast("Enter a guest estimate between 1 and 10,000.");
      return;
    }
    state.brief = brief;
    state.filters.categories.clear();
    state.filters.styles.clear();
    persist("shaadi-brief", brief);
    setPage("discover");
    showToast("Your brief is saved in this browser. Profiles are still fictional examples.");
  }
  if (event.target.id === "match-form") {
    event.preventDefault();
    const formData = new FormData(event.target);
    state.matchPreferences = {
      city: String(formData.get("city") || "").trim(),
      budget: String(formData.get("budget") || ""),
      priorities: String(formData.get("priorities") || "").trim(),
      styles: formData.getAll("styles").map(String),
      categories: formData.getAll("categories").map(String),
    };
    persist("shaadi-match-preferences", state.matchPreferences);
    render();
    showToast("Your ideal matches are refreshed.");
  }
  if (event.target.id === "enquiry-form") {
    event.preventDefault();
    const data = new FormData(event.target);
    const draft = { name: data.get("name"), email: data.get("email"), message: data.get("message"), savedAt: new Date().toISOString() };
    persist("shaadi-enquiry-draft", draft);
    dialog.close();
    showToast("Enquiry draft saved on this device only. It was not sent.");
  }
  if (event.target.id === "add-task-form") {
    event.preventDefault();
    const data = new FormData(event.target);
    const title = String(data.get("task") || "").trim();
    if (!title) return;
    state.tasks.push({ id: `custom-${Date.now()}`, title, meta: "Added by you", done: false });
    persistTasks();
    render();
    showToast("Added your planning step.");
  }
});

dialog.addEventListener("click", (event) => {
  if (event.target === dialog) dialog.close();
});

render();
