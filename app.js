const NATURES = [
  "指定なし", "いじっぱり", "ひかえめ", "ようき", "おくびょう", "わんぱく",
  "ずぶとい", "しんちょう", "おだやか", "むじゃき", "せっかち", "ゆうかん",
  "ゆうかん","れいせい", "のんき", "なまいき"
];
function toHiragana(str) {
  return str.replace(/[\u30A1-\u30F6]/g, function(match) {
    return String.fromCharCode(match.charCodeAt(0) - 0x60);
  });
}
const STORAGE_KEY = "pokemon-party-builder:v1";
const emptySlot = () => ({
  pokemon: "",
  nature: "指定なし",
  ability: "",
  item: "",
  tera: "指定なし",
  moves: ["", "", "", ""],
  evs: { h: 0, a: 0, b: 0, c: 0, d: 0, s: 0 }
});

let state = {
  currentId: null,
  partyName: "",
  slots: Array.from({ length: 6 }, emptySlot),
  saved: []
};

const $ = (selector, root = document) => root.querySelector(selector);
const $$ = (selector, root = document) => Array.from(root.querySelectorAll(selector));

function getPokemonData() {
  if (typeof baseStats === "undefined") return [];

  return Object.entries(baseStats).map(([name, data]) => ({
    name,
    types: data.types || [],
    stats: [data.h, data.a, data.b, data.c, data.d, data.s]
  }));
}

function getMoveNames() {
  if (typeof moves !== "undefined") return Object.keys(moves);
  return [];
}

function getAbilityNames() {
  if (typeof abilities !== "undefined") return Object.keys(abilities);
  return [];
}

function getItemNames() {
  if (typeof items !== "undefined") return Object.keys(items);
  return [];
}

function init() {
  loadSaved();
  hydrateOptions();
  renderSlots();
  renderSavedList();
  renderTypeMatrix();
  bindGlobalEvents();
}

function hydrateOptions() {
  fillDatalist("pokemonOptions", getPokemonData().map((pokemon) => pokemon.name));
  fillDatalist("moveOptions", getMoveNames());
  fillDatalist("abilityOptions", getAbilityNames());
  fillDatalist("itemOptions", getItemNames());
}

function fillDatalist(id, values) {
  const list = document.getElementById(id);
  list.innerHTML = values.map((value) => `<option value="${escapeHtml(value)}"></option>`).join("");
}

function bindGlobalEvents() {
  $("#partyName").addEventListener("input", (event) => {
    state.partyName = event.target.value;
    markDirty();
  });
  $("#savePartyBtn").addEventListener("click", saveCurrentParty);
  $("#newPartyBtn").addEventListener("click", newParty);
}

function renderSlots() {
  $("#partyName").value = state.partyName;
  const container = $("#slots");
  const template = $("#slotTemplate");
  container.innerHTML = "";

  state.slots.forEach((slot, index) => {
    const node = template.content.firstElementChild.cloneNode(true);
    $(".slot-title", node).textContent = `Slot ${index + 1}`;
    $(".pokemon-input", node).value = slot.pokemon;
    $(".ability-input", node).value = slot.ability;
    $(".item-input", node).value = slot.item;
    fillSelect($(".nature-input", node), NATURES, slot.nature);
    fillSelect($(".tera-input", node), ["指定なし", ...TYPES], slot.tera);

    $$(".move-input", node).forEach((input, moveIndex) => {
      input.value = slot.moves[moveIndex] || "";
      input.addEventListener("input", () => updateSlot(index, { moves: readMoves(node) }));
    });

    $$(".ev-input", node).forEach((input) => {
      input.value = slot.evs[input.dataset.stat] || 0;
      input.addEventListener("input", () => updateSlot(index, { evs: readEvs(node) }));
    });

    setupPokemonAutocomplete(node, index);
    $(".nature-input", node).addEventListener("change", (event) => updateSlot(index, { nature: event.target.value }));
    $(".ability-input", node).addEventListener("input", (event) => updateSlot(index, { ability: event.target.value }));
    $(".item-input", node).addEventListener("input", (event) => updateSlot(index, { item: event.target.value }));
    $(".tera-input", node).addEventListener("change", (event) => updateSlot(index, { tera: event.target.value }));
    $(".clear-slot", node).addEventListener("click", () => {
      state.slots[index] = emptySlot();
      renderSlots();
      updateComputed();
      markDirty();
    });

    updateSlotSummary(node, slot);
    container.appendChild(node);
  });

  updateComputed();
}

function fillSelect(select, values, selected) {
  select.innerHTML = values.map((value) => {
    const isSelected = value === selected ? " selected" : "";
    return `<option value="${escapeHtml(value)}"${isSelected}>${escapeHtml(value)}</option>`;
  }).join("");
}

function setupPokemonAutocomplete(node, index) {
  const input = $(".pokemon-input", node);
  const list = $(".autocomplete-list", node);
  let activeIndex = -1;
  let currentMatches = [];

  const close = () => {
    list.classList.remove("open");
    list.innerHTML = "";
    activeIndex = -1;
    currentMatches = [];
  };

  const choose = (name) => {
    input.value = name;
    updateSlot(index, { pokemon: name });
    close();
  };

  const render = () => {
    const query = input.value.trim();
    currentMatches = findPokemonMatches(query);
    activeIndex = currentMatches.length ? 0 : -1;

    if (!query || currentMatches.length === 0) {
      close();
      return;
    }

    list.innerHTML = currentMatches.map((pokemon, optionIndex) => {
      const typeText = pokemon.types.length ? pokemon.types.join(" / ") : "タイプ未設定";
      const activeClass = optionIndex === activeIndex ? " active" : "";
      return `<button class="autocomplete-option${activeClass}" type="button" data-name="${escapeHtml(pokemon.name)}" role="option">
        <strong>${escapeHtml(pokemon.name)}</strong>
        <span>${escapeHtml(typeText)}</span>
      </button>`;
    }).join("");

    list.classList.add("open");
  };

  input.addEventListener("input", () => {
    updateSlot(index, { pokemon: input.value });
    render();
  });

  input.addEventListener("focus", render);
  input.addEventListener("blur", () => window.setTimeout(close, 120));

  input.addEventListener("keydown", (event) => {
    if (!list.classList.contains("open")) return;

    if (event.key === "ArrowDown" || event.key === "ArrowUp") {
      event.preventDefault();
      const direction = event.key === "ArrowDown" ? 1 : -1;
      activeIndex = (activeIndex + direction + currentMatches.length) % currentMatches.length;
      $$(".autocomplete-option", list).forEach((option, optionIndex) => {
        option.classList.toggle("active", optionIndex === activeIndex);
      });
    }

    if (event.key === "Enter" && activeIndex >= 0) {
      event.preventDefault();
      choose(currentMatches[activeIndex].name);
    }

    if (event.key === "Escape") {
      close();
    }
  });

  list.addEventListener("mousedown", (event) => event.preventDefault());
  list.addEventListener("click", (event) => {
    const option = event.target.closest(".autocomplete-option");
    if (option) choose(option.dataset.name);
  });
}

function findPokemonMatches(query) {
  const normalizedQuery = normalizeSearchText(query);
  if (!normalizedQuery) return [];

  return getPokemonData()
    .filter((pokemon) => normalizeSearchText(pokemon.name).includes(normalizedQuery));
}

function normalizeSearchText(value) {
  return String(value)
    .normalize("NFKC")
    .toLowerCase()
    .replace(/[\u30a1-\u30f6]/g, (char) => String.fromCharCode(char.charCodeAt(0) - 0x60))
    .replace(/\s+/g, "");
}

function updateSlot(index, patch) {
  state.slots[index] = { ...state.slots[index], ...patch };
  const slotNode = $$(".slot") [index];
  updateSlotSummary(slotNode, state.slots[index]);
  updateComputed();
  markDirty();
}

function updateSlotSummary(node, slot) {
  const pokemon = findPokemon(slot.pokemon);
  const total = Object.values(slot.evs).reduce((sum, value) => sum + Number(value || 0), 0);
  const totalOutput = $(".ev-total", node);
  totalOutput.textContent = `${total} / 32`;
  totalOutput.classList.toggle("over", total > 32);

  $(".type-pills", node).innerHTML = pokemon
    ? pokemon.types.map((type) => `<span class="pill">${escapeHtml(type)}</span>`).join("")
    : '<span class="empty">ポケモンを選択してください</span>';

  $(".base-stats", node).textContent = pokemon
    ? `H${pokemon.stats[0]} A${pokemon.stats[1]} B${pokemon.stats[2]} C${pokemon.stats[3]} D${pokemon.stats[4]} S${pokemon.stats[5]}`
    : "";
}

function readMoves(node) {
  return $$(".move-input", node).map((input) => input.value.trim());
}

function readEvs(node) {
  return Object.fromEntries($$(".ev-input", node).map((input) => [
    input.dataset.stat,
    clampEv(input.value)
  ]));
}

function clampEv(value) {
  const number = Number(value || 0);
  if (Number.isNaN(number)) return 0;
  return Math.max(0, Math.min(252, number));
}

function updateComputed() {
  const selected = state.slots.filter((slot) => findPokemon(slot.pokemon));
  $("#slotCount").textContent = `${selected.length} / 6`;
  renderTypeMatrix();
}

function findPokemon(name) {
  return getPokemonData().find((pokemon) => pokemon.name === name.trim());
}

function renderTypeMatrix() {
  const selected = state.slots.map((slot) => findPokemon(slot.pokemon)).filter(Boolean);
  const container = $("#typeMatrix");

  if (selected.length === 0) {
    $("#coverageSummary").textContent = "未選択";
    container.innerHTML = TYPES.map((type) => typeCell(type, "-", "")).join("");
    return;
  }

  const rows = TYPES.map((attackType) => {
    const multipliers = selected.map((pokemon) => defensiveMultiplier(attackType, pokemon.types));
    const count4 = multipliers.filter(v => v === 4).length;
const count2 = multipliers.filter(v => v === 2).length;
const count1 = multipliers.filter(v => v === 1).length;
const count05 = multipliers.filter(v => v === 0.5).length;
const count025 = multipliers.filter(v => v === 0.25).length;
const count0 = multipliers.filter(v => v === 0).length;
return `
<div class="type-cell">
    <div class="type-name">${attackType}</div>
    <div>4倍：${count4}体</div>
    <div>2倍：${count2}体</div>
    <div>等倍：${count1}体</div>
    <div>半減：${count05 + count025}体</div>
    <div>無効：${count0}体</div>
</div>
`;
  });

  const danger = rows.filter((row) => row.weakCount >= Math.ceil(selected.length / 2)).length;
  $("#coverageSummary").textContent = danger ? `要注意 ${danger}タイプ` : "大きな偏りなし";
  container.innerHTML = rows.map((row) => {
    const label = row.max >= 4 ? "4x" : row.max >= 2 ? "2x" : row.min === 0 ? "0x" : row.min <= 0.5 ? "1/2x" : "1x";
    const className = row.max >= 4 ? "weak4" : row.max >= 2 ? "weak2" : row.min === 0 ? "immune" : row.min <= 0.5 ? "resist" : "";
    return typeCell(row.type, label, className);
  }).join("");
}

function defensiveMultiplier(attackType, defendTypes) {
  return defendTypes.reduce((value, defendType) => value * (EFFECTIVENESS[attackType]?.[defendType] ?? 1), 1);
}

function typeCell(type, value, className) {
  return `<div class="type-cell ${className}">
    <span class="type-name">${escapeHtml(type)}</span>
    <span class="type-value">${escapeHtml(value)}</span>
  </div>`;
}

function saveCurrentParty() {
  const name = state.partyName.trim() || "無題のパーティ";
  const now = new Date().toISOString();
  const party = {
    id: state.currentId || makeId(),
    name,
    slots: structuredClone(state.slots),
    updatedAt: now
  };

  const existingIndex = state.saved.findIndex((item) => item.id === party.id);
  if (existingIndex >= 0) {
    state.saved[existingIndex] = party;
  } else {
    state.saved.unshift(party);
  }

  state.currentId = party.id;
  state.partyName = name;
  persist();
  renderSavedList();
  $("#partyName").value = name;
  $("#saveState").textContent = "保存済み";
}

function newParty() {
  state.currentId = null;
  state.partyName = "";
  state.slots = Array.from({ length: 6 }, emptySlot);
  $("#saveState").textContent = "未保存";
  renderSlots();
}

function loadParty(id) {
  const party = state.saved.find((item) => item.id === id);
  if (!party) return;
  state.currentId = party.id;
  state.partyName = party.name;
  state.slots = structuredClone(party.slots);
  $("#saveState").textContent = "保存済み";
  renderSlots();
}

function duplicateParty(id) {
  const party = state.saved.find((item) => item.id === id);
  if (!party) return;
  state.saved.unshift({
    ...structuredClone(party),
    id: makeId(),
    name: `${party.name} コピー`,
    updatedAt: new Date().toISOString()
  });
  persist();
  renderSavedList();
}

function deleteParty(id) {
  const party = state.saved.find((item) => item.id === id);
  if (!party || !confirm(`「${party.name}」を削除しますか？`)) return;
  state.saved = state.saved.filter((item) => item.id !== id);
  if (state.currentId === id) newParty();
  persist();
  renderSavedList();
}

function renderSavedList() {
  $("#partyCount").textContent = `${state.saved.length}件`;
  const container = $("#partyList");

  if (state.saved.length === 0) {
    container.innerHTML = '<p class="empty">保存したパーティがここに表示されます。</p>';
    return;
  }

  container.innerHTML = state.saved.map((party) => {
    const names = party.slots.map((slot) => slot.pokemon).filter(Boolean).join(" / ") || "未登録";
    const date = new Date(party.updatedAt).toLocaleString("ja-JP", { dateStyle: "short", timeStyle: "short" });
    return `<article class="party-card">
      <strong>${escapeHtml(party.name)}</strong>
      <p>${escapeHtml(names)}<br>${escapeHtml(date)}</p>
      <div class="card-actions">
        <button data-action="load" data-id="${party.id}">読込</button>
        <button data-action="edit" data-id="${party.id}">編集</button>
        <button data-action="copy" data-id="${party.id}">複製</button>
        <button data-action="delete" data-id="${party.id}">削除</button>
      </div>
    </article>`;
  }).join("");

  $$("button", container).forEach((button) => {
    button.addEventListener("click", () => {
      const id = button.dataset.id;
      if (button.dataset.action === "copy") duplicateParty(id);
      if (button.dataset.action === "delete") deleteParty(id);
      if (button.dataset.action === "load" || button.dataset.action === "edit") loadParty(id);
    });
  });
}

function markDirty() {
  $("#saveState").textContent = "編集中";
}

function loadSaved() {
  try {
    state.saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
  } catch {
    state.saved = [];
  }
}

function persist() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state.saved));
}

function makeId() {
  if (globalThis.crypto?.randomUUID) return globalThis.crypto.randomUUID();
  return `party-${Date.now()}-${Math.random().toString(36).slice(2)}`;
}

function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, (char) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#039;"
  })[char]);
}

init();
