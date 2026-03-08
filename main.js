let curGarden = 'front';

function switchTab(garden, btn) {
  curGarden = garden;
  document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  document.querySelectorAll('.garden-view').forEach(v => v.classList.remove('active'));
  document.getElementById('view-' + garden).classList.add('active');
  clearInfo();
  buildLegend(garden);
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

function buildLegend(garden) {
  const seen = new Set();
  let html = `<div class="legend-title">Legend</div>`;
  for (const [id, p] of Object.entries(DATA[garden])) {
    const key = id + p.name;
    if (!seen.has(key)) {
      seen.add(key);
      html += `
        <div class="legend-item" onclick="pick('${garden}',${id})">
          <div class="legend-dot"
               style="background:${p.color};opacity:${p.unknown?0.65:1}"></div>
          <span>${id}. ${p.name}</span>
        </div>`;
    }
  }
  document.getElementById('legend').innerHTML = html;
}

document.addEventListener('DOMContentLoaded', () => {
  buildLegend('front');
});
