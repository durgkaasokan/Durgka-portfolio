/* Project details and image paths. Add pictures in the images/ folder. */
const cases = {
  mining: {
    kicker: 'PREDICTIVE ANALYTICS · JUNE 2026',
    title: 'Digital Mining Twin',
    intro: 'A project exploring how telemetry, geospatial information and predictive analytics can make mining operations easier to monitor and understand.',
    images: [
      {src:'images/mining_dashboard.png', caption:'Digital Mining Twin Dashboard'},
      {src:'images/mining_architecture.png', caption:'System Architecture'},
    ],
    bullets: [
      'Developed a Python data-processing workflow and SQL star schema for asset telemetry and geospatial data.',
      'Trained a Random Forest predictive workflow using scikit-learn and integrated explainability features.',
      'Built interactive monitoring views with Plotly and Python web technologies.',
      'Connected equipment inefficiencies to an AUD $99K revenue-leakage audit.',
      'Investigated SQL consistency, database locking and API reliability.'
    ]
  },
  bi: {
    kicker:'BUSINESS INTELLIGENCE · GRAD CAREERS',
    title:'Power BI Insights Suite',
    intro:'Four reporting dashboards designed to help stakeholders understand performance across different business functions.',
    images: [
      {src:'images/Sales Insights.png', caption:'Sales insights report'},
    ],
    bullets:[
      'Developed HR, Sales, Finance and Customer Segmentation dashboards with multiple interactive visuals.',
      'Cleaned and transformed source Excel data in Power Query.',
      'Designed DAX KPI measures for attrition, customer ranking, regional sales, margins and customer segments.',
      'Validated reports against original source data and investigated discrepancies.'
    ]
  },
  hailo: {
    kicker:'BUSINESS ANALYSIS · PRODUCT DELIVERY',
    title:'Hailo Platform Improvements',
    intro:'Using structured requirements, user feedback and Agile collaboration to improve the platform experience.',
    images:[
      {src:'images/Hailo_logo.png',caption:'Hailo Logo'},
    ],
    bullets:[
      'Delivered 15 user stories and 40+ acceptance criteria across six epics in the Monash industry project.',
      'Supported sprint planning, UAT, accessibility validation and issue tracking in Jira.',
      'Analysed 60+ monthly incidents and more than 100 feedback entries in the subsequent Hailo role.',
      'Contributed to work associated with 20% fewer repeat issues and 15% improvement in task completion outcomes.'
    ]
  },
  anaplan: {
    kicker:'ENTERPRISE PLANNING · MODEL BUILDING',
    title:'Anaplan Model Building',
    intro:'Planning-model training focused on how structured data flows from source systems into accessible business planning experiences.',
    images:[
      {src:'images/Anaplan Certificate.png',caption:'Anaplan Completion Certificate'},
    ],
    bullets:[
      'Worked with Anaplan model-building concepts, modules, lists and dimensional structures.',
      'Explored Level 2 Polaris supply-chain model activities, source-model connections and data hub imports.',
      'Practised planning formulas, imports, model organisation and UX reporting.',
      'Completed Anaplan Professional Model Builder certification.'
    ]
  }
};

const dialog = document.querySelector('#caseDialog');
const content = document.querySelector('#dialogContent');

if (dialog && content) {
  document.querySelectorAll('[data-modal]').forEach(button => {
    button.addEventListener('click', () => {
      const project = cases[button.dataset.modal];
      if (!project) return;
      const galleryHTML = project.images.map(image => `
        <figure class="case-image-card">
          <img src="${image.src}" alt="${image.caption}">
          <div class="image-placeholder" hidden><span>📷</span><p>Add this image to your images folder:<br><strong>${image.src}</strong></p></div>
          <figcaption>${image.caption}</figcaption>
        </figure>`).join('');
      content.innerHTML = `
        <div class="dialog-kicker">${project.kicker}</div>
        <h2 id="dialog-title" class="dialog-title">${project.title}</h2>
        <p class="dialog-desc">${project.intro}</p>
        <h3>Project Gallery</h3>
        <div class="case-gallery">${galleryHTML}</div>
        <h3>What I worked on</h3>
        <ul class="dialog-list">${project.bullets.map(item => `<li>${item}</li>`).join('')}</ul>`;
      content.querySelectorAll('.case-image-card').forEach(card => {
        const img = card.querySelector('img');
        const placeholder = card.querySelector('.image-placeholder');
        const showPlaceholder = () => { img.hidden = true; placeholder.hidden = false; };
        img.addEventListener('error', showPlaceholder);
        if (img.complete && img.naturalWidth === 0) showPlaceholder();
      });
      dialog.showModal();
      document.body.classList.add('modal-open');
    });
  });
  const closeDialog = () => { if(dialog.open) dialog.close(); document.body.classList.remove('modal-open'); };
  document.querySelector('#closeDialog')?.addEventListener('click', closeDialog);
  dialog.addEventListener('click', event => { if(event.target === dialog) closeDialog(); });
  dialog.addEventListener('close', () => document.body.classList.remove('modal-open'));
}

document.querySelectorAll('.filter').forEach(button => button.addEventListener('click', () => {
  document.querySelectorAll('.filter').forEach(filter => {
    const active = filter === button;
    filter.classList.toggle('active', active);
    filter.setAttribute('aria-pressed', String(active));
  });
  document.querySelectorAll('.project').forEach(project => {
    project.hidden = button.dataset.filter !== 'all' && project.dataset.category !== button.dataset.filter;
  });
}));

const menu = document.querySelector('.menu-toggle');
const nav = document.querySelector('#nav');
if (menu && nav) {
  menu.addEventListener('click', () => {
    const open = nav.classList.toggle('open');
    menu.setAttribute('aria-expanded', String(open));
    menu.textContent = open ? '✕' : '☰';
  });
  nav.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
    nav.classList.remove('open');
    menu.setAttribute('aria-expanded', 'false');
    menu.textContent = '☰';
  }));
}
let toastTimer;
document.querySelectorAll('[data-link-placeholder]').forEach(link => link.addEventListener('click', event => {
  event.preventDefault();
  const toast = document.querySelector('#toast');
  if (!toast) return;
  toast.textContent = `Add your ${link.dataset.linkPlaceholder} profile URL in index.html to activate this link.`;
  toast.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove('show'), 3500);
}));
const year = document.querySelector('#year');
if (year) year.textContent = new Date().getFullYear();
