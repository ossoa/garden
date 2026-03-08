let curGarden = 'front';

function switchTab(garden, btn, updateHash = true) {
  curGarden = garden;
  document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
  if (btn) {
    btn.classList.add('active');
  } else {
    document.querySelectorAll('.tab-btn').forEach(b => {
      if (b.textContent.toLowerCase().includes(garden)) b.classList.add('active');
    });
  }
  document.querySelectorAll('.garden-view').forEach(v => v.classList.remove('active'));
  document.getElementById('view-' + garden).classList.add('active');
  clearInfo();
  buildLegend(garden);
  
  if (updateHash) {
    window.location.hash = garden;
  }
}

function getGardenFromHash() {
  const hash = window.location.hash.slice(1);
  return (hash === 'front' || hash === 'back') ? hash : 'front';
}

function pick(garden, id) {
  document.querySelectorAll('.pm').forEach(el => el.classList.remove('lit'));
  document.querySelectorAll(`.pm[data-g="${garden}"][data-id="${id}"]`)
          .forEach(el => el.classList.add('lit'));
  renderCard(garden, id);
}

function renderCard(garden, id) {
  const p = DATA[garden][id];
  const plStr = p.pl ? `<span class="name-it">${p.pl}</span>`
                     : `<span class="name-none">not identified yet</span>`;
  const seStr = p.se ? `<span class="name-it">${p.se}</span>`
                     : `<span class="name-none">not identified yet</span>`;
  const enStr = p.unknown ? `<span class="name-none">—</span>` : p.name;

  const unknownBlock = p.unknown
    ? `<div class="unknown-note">This plant has not been identified yet.<br>Its name will be updated once known.</div>`
    : '';

  document.getElementById('info-card').innerHTML = `
    <div class="plant-header">
      <div class="badge" style="background:${p.unknown ? '#8e8e8e' : p.color}">${id}</div>
      <div class="plant-name${p.unknown ? ' is-unknown' : ''}">${p.name}</div>
    </div>
    <div class="names-block">
      <div class="name-row"><span class="lang">EN</span>${enStr}</div>
      <div class="name-row"><span class="lang">PL</span>${plStr}</div>
      <div class="name-row"><span class="lang">SE</span>${seStr}</div>
    </div>
    <div class="meta-label">Type</div>
    <div class="meta-val">${p.type}</div>
    <div class="meta-label">Notes</div>
    <div class="meta-val">${p.desc}</div>
    ${unknownBlock}
  `;
}

function clearInfo() {
  document.querySelectorAll('.pm').forEach(el => el.classList.remove('lit'));
  document.getElementById('info-card').innerHTML =
    `<div class="info-empty">Click on a plant<br>to see its details</div>`;
}

function getPlantIcon(shape, foliage, accent, isUnknown) {
  const opacity = isUnknown ? 0.7 : 1;
  const w = 24, h = 20;
  
  const shapes = {
    shrub: `
      <svg width="${w}" height="${h}" viewBox="0 0 24 20">
        <ellipse cx="12" cy="12" rx="10" ry="7" fill="${foliage}" opacity="${opacity}"/>
        <ellipse cx="8" cy="10" rx="5" ry="4" fill="${foliage}" opacity="${opacity}"/>
        <ellipse cx="16" cy="10" rx="5" ry="4" fill="${foliage}" opacity="${opacity}"/>
        <circle cx="8" cy="9" r="2.5" fill="${accent}" opacity="${opacity}"/>
        <circle cx="14" cy="8" r="2" fill="${accent}" opacity="${opacity}"/>
        <circle cx="11" cy="12" r="2" fill="${accent}" opacity="${opacity}"/>
      </svg>`,
    
    tree: `
      <svg width="${w}" height="${h}" viewBox="0 0 24 20">
        <rect x="10" y="14" width="4" height="6" fill="#8b5a2b" opacity="${opacity}"/>
        <ellipse cx="12" cy="9" rx="9" ry="8" fill="${foliage}" opacity="${opacity}"/>
        <ellipse cx="8" cy="7" rx="4" ry="3.5" fill="${accent}" opacity="${opacity * 0.9}"/>
        <ellipse cx="14" cy="6" rx="3.5" ry="3" fill="${accent}" opacity="${opacity * 0.9}"/>
        <ellipse cx="11" cy="10" rx="3" ry="2.5" fill="${accent}" opacity="${opacity * 0.9}"/>
      </svg>`,
    
    climber: `
      <svg width="${w}" height="${h}" viewBox="0 0 24 20">
        <path d="M12 2 Q8 5, 12 8 Q16 11, 12 14 Q8 17, 12 20" 
              stroke="${foliage}" stroke-width="3" fill="none" opacity="${opacity}"/>
        <path d="M9 4 l-2 -2 l1.5 0.5 l0.5 -1.5 l0.5 1.5 l1.5 -0.5 z" fill="${foliage}" opacity="${opacity}"/>
        <path d="M15 10 l-2 -2 l1.5 0.5 l0.5 -1.5 l0.5 1.5 l1.5 -0.5 z" fill="${foliage}" opacity="${opacity}"/>
        <path d="M9 16 l-2 -2 l1.5 0.5 l0.5 -1.5 l0.5 1.5 l1.5 -0.5 z" fill="${foliage}" opacity="${opacity}"/>
        <circle cx="14" cy="5" r="2" fill="${accent}" opacity="${opacity}"/>
        <circle cx="10" cy="12" r="2" fill="${accent}" opacity="${opacity}"/>
        <circle cx="14" cy="17" r="2" fill="${accent}" opacity="${opacity}"/>
      </svg>`,
    
    hedge: `
      <svg width="${w}" height="${h}" viewBox="0 0 24 20">
        <rect x="4" y="3" width="16" height="17" rx="3" ry="3" fill="${foliage}" opacity="${opacity}"/>
        <ellipse cx="8" cy="6" rx="3" ry="2.5" fill="${accent}" opacity="${opacity * 0.8}"/>
        <ellipse cx="16" cy="6" rx="3" ry="2.5" fill="${accent}" opacity="${opacity * 0.8}"/>
        <ellipse cx="12" cy="10" rx="3" ry="2.5" fill="${accent}" opacity="${opacity * 0.8}"/>
        <ellipse cx="8" cy="14" rx="3" ry="2.5" fill="${accent}" opacity="${opacity * 0.8}"/>
        <ellipse cx="16" cy="14" rx="3" ry="2.5" fill="${accent}" opacity="${opacity * 0.8}"/>
      </svg>`,
    
    potted: `
      <svg width="${w}" height="${h}" viewBox="0 0 24 20">
        <rect x="6" y="13" width="12" height="7" rx="1" fill="#8b5a2b" stroke="#6b4423" stroke-width="0.5"/>
        <rect x="7" y="14" width="10" height="2" fill="#5a4030"/>
        <circle cx="12" cy="8" r="6" fill="${foliage}" opacity="${opacity}"/>
        <circle cx="9" cy="6" rx="3" ry="2.5" fill="${accent}" opacity="${opacity * 0.9}"/>
        <circle cx="15" cy="7" rx="2.5" ry="2" fill="${accent}" opacity="${opacity * 0.9}"/>
        <circle cx="12" cy="10" rx="2" ry="1.5" fill="${accent}" opacity="${opacity * 0.9}"/>
      </svg>`,
    
    grass: `
      <svg width="${w}" height="${h}" viewBox="0 0 24 20">
        <path d="M6 20 Q5 12, 4 6" stroke="${foliage}" stroke-width="2" fill="none" opacity="${opacity}"/>
        <path d="M10 20 Q9 10, 8 3" stroke="${foliage}" stroke-width="2" fill="none" opacity="${opacity}"/>
        <path d="M14 20 Q14 10, 15 2" stroke="${foliage}" stroke-width="2" fill="none" opacity="${opacity}"/>
        <path d="M18 20 Q18 12, 20 5" stroke="${foliage}" stroke-width="2" fill="none" opacity="${opacity}"/>
        <circle cx="5" cy="5" r="2" fill="${accent}" opacity="${opacity}"/>
        <circle cx="14" cy="3" r="2" fill="${accent}" opacity="${opacity}"/>
        <circle cx="19" cy="6" r="2" fill="${accent}" opacity="${opacity}"/>
      </svg>`
  };
  
  return shapes[shape] || shapes.shrub;
}

function buildLegend(garden) {
  const seen = new Set();
  let html = `<div class="legend-title">Legend</div>`;
  for (const [id, p] of Object.entries(DATA[garden])) {
    const key = id + p.name;
    if (!seen.has(key)) {
      seen.add(key);
      const icon = getPlantIcon(p.shape, p.foliage, p.accent, p.unknown);
      html += `
        <div class="legend-item" onclick="pick('${garden}',${id})">
          <div class="legend-icon">${icon}</div>
          <span>${id}. ${p.name}</span>
        </div>`;
    }
  }
  document.getElementById('legend').innerHTML = html;
}

document.addEventListener('DOMContentLoaded', () => {
  const initialGarden = getGardenFromHash();
  switchTab(initialGarden, null, false);
});

window.addEventListener('hashchange', () => {
  const garden = getGardenFromHash();
  switchTab(garden, null, false);
});
