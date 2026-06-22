const TYPES = [
  "ノーマル", "ほのお", "みず", "でんき", "くさ", "こおり",
  "かくとう", "どく", "じめん", "ひこう", "エスパー", "むし",
  "いわ", "ゴースト", "ドラゴン", "あく", "はがね", "フェアリー"
];

const NATURES = [
  "指定なし", "いじっぱり", "ひかえめ", "ようき", "おくびょう", "わんぱく",
  "ずぶとい", "しんちょう", "おだやか", "むじゃき", "せっかち", "ゆうかん",
  "れいせい", "のんき", "なまいき"
];

const POKEMON = [
  { name: "ガブリアス", types: ["ドラゴン", "じめん"], stats: [108, 130, 95, 80, 85, 102] },
  { name: "ガチグマ", types: ["じめん", "ノーマル"], stats: [130, 140, 105, 45, 80, 50] },
  { name: "ガオガエン", types: ["ほのお", "あく"], stats: [95, 115, 90, 80, 90, 60] },
  { name: "カイリュー", types: ["ドラゴン", "ひこう"], stats: [91, 134, 95, 100, 100, 80] },
  { name: "サーフゴー", types: ["はがね", "ゴースト"], stats: [87, 60, 95, 133, 91, 84] },
  { name: "ハバタクカミ", types: ["ゴースト", "フェアリー"], stats: [55, 55, 55, 135, 135, 135] },
  { name: "テツノツツミ", types: ["こおり", "みず"], stats: [56, 80, 114, 124, 60, 136] },
  { name: "パオジアン", types: ["あく", "こおり"], stats: [80, 120, 80, 90, 65, 135] },
  { name: "ディンルー", types: ["あく", "じめん"], stats: [155, 110, 125, 55, 80, 45] },
  { name: "イーユイ", types: ["あく", "ほのお"], stats: [55, 80, 80, 135, 120, 100] },
  { name: "オーガポン", types: ["くさ"], stats: [80, 120, 84, 60, 96, 110] },
  { name: "オーガポン(かまど)", types: ["くさ", "ほのお"], stats: [80, 120, 84, 60, 96, 110] },
  { name: "ウーラオス(いちげき)", types: ["かくとう", "あく"], stats: [100, 130, 100, 63, 60, 97] },
  { name: "ウーラオス(れんげき)", types: ["かくとう", "みず"], stats: [100, 130, 100, 63, 60, 97] },
  { name: "ランドロス(れいじゅう)", types: ["じめん", "ひこう"], stats: [89, 145, 90, 105, 80, 91] },
  { name: "霊獣ボルトロス", types: ["でんき", "ひこう"], stats: [79, 105, 70, 145, 80, 101] },
  { name: "モロバレル", types: ["くさ", "どく"], stats: [114, 85, 70, 85, 80, 30] },
  { name: "ドドゲザン", types: ["あく", "はがね"], stats: [100, 135, 120, 60, 85, 50] },
  { name: "ミミッキュ", types: ["ゴースト", "フェアリー"], stats: [55, 90, 80, 50, 105, 96] },
  { name: "ドラパルト", types: ["ドラゴン", "ゴースト"], stats: [88, 120, 75, 100, 75, 142] },
  { name: "セグレイブ", types: ["ドラゴン", "こおり"], stats: [115, 145, 92, 75, 86, 87] },
  { name: "キョジオーン", types: ["いわ"], stats: [100, 100, 130, 45, 90, 35] },
  { name: "ヘイラッシャ", types: ["みず"], stats: [150, 100, 115, 65, 65, 35] },
  { name: "マスカーニャ", types: ["くさ", "あく"], stats: [76, 110, 70, 81, 70, 123] },
  { name: "ラウドボーン", types: ["ほのお", "ゴースト"], stats: [104, 75, 100, 110, 75, 66] },
  { name: "ウェーニバル", types: ["みず", "かくとう"], stats: [85, 120, 80, 85, 75, 85] },
  { name: "ピカチュウ", types: ["でんき"], stats: [35, 55, 40, 50, 50, 90] },
  { name: "リザードン", types: ["ほのお", "ひこう"], stats: [78, 84, 78, 109, 85, 100] },
  { name: "カメックス", types: ["みず"], stats: [79, 83, 100, 85, 105, 78] },
  { name: "フシギバナ", types: ["くさ", "どく"], stats: [80, 82, 83, 100, 100, 80] },
  { name: "バンギラス", types: ["いわ", "あく"], stats: [100, 134, 110, 95, 100, 61] },
  { name: "メタグロス", types: ["はがね", "エスパー"], stats: [80, 135, 130, 95, 90, 70] }
];

const MOVES = [
  "じしん", "げきりん", "スケイルショット", "アイアンヘッド", "テラバースト",
  "シャドーボール", "ゴールドラッシュ", "ムーンフォース", "マジカルフレイム",
  "ふいうち", "つららおとし", "せいなるつるぎ", "すいりゅうれんだ",
  "あんこくきょうだ", "インファイト", "とんぼがえり", "フレアドライブ",
  "はたきおとす", "すてゼリフ", "りゅうのまい", "しんそく", "エアスラッシュ",
  "10まんボルト", "ボルトチェンジ", "ハイドロポンプ", "なみのり", "アクアジェット",
  "リーフストーム", "ウッドホーン", "キノコのほうし", "みがわり", "まもる",
  "ステルスロック", "どくどく", "でんじは", "おにび", "トリック", "わるだくみ",
  "めいそう", "つるぎのまい", "じこさいせい", "ねむる"
];

const ABILITIES = [
  "指定なし", "いかく", "マルチスケイル", "てんねん", "こだいかっせい",
  "クォークチャージ", "おうごんのからだ", "ばけのかわ", "ふかしのこぶし",
  "どくげしょう", "きよめのしお", "しんりょく", "もうか", "げきりゅう",
  "ようりょくそ", "すなおこし", "プレッシャー"
];

const ITEMS = [
  "指定なし", "こだわりスカーフ", "こだわりハチマキ", "こだわりメガネ",
  "いのちのたま", "きあいのタスキ", "とつげきチョッキ", "たべのこし",
  "オボンのみ", "ラムのみ", "ブーストエナジー", "ゴツゴツメット",
  "あつぞこブーツ", "クリアチャーム", "じゃくてんほけん", "ひかりのねんど"
];

const EFFECTIVENESS = {
  "ノーマル": { "いわ": 0.5, "ゴースト": 0, "はがね": 0.5 },
  "ほのお": { "ほのお": 0.5, "みず": 0.5, "くさ": 2, "こおり": 2, "むし": 2, "いわ": 0.5, "ドラゴン": 0.5, "はがね": 2 },
  "みず": { "ほのお": 2, "みず": 0.5, "くさ": 0.5, "じめん": 2, "いわ": 2, "ドラゴン": 0.5 },
  "でんき": { "みず": 2, "でんき": 0.5, "くさ": 0.5, "じめん": 0, "ひこう": 2, "ドラゴン": 0.5 },
  "くさ": { "ほのお": 0.5, "みず": 2, "くさ": 0.5, "どく": 0.5, "じめん": 2, "ひこう": 0.5, "むし": 0.5, "いわ": 2, "ドラゴン": 0.5, "はがね": 0.5 },
  "こおり": { "ほのお": 0.5, "みず": 0.5, "くさ": 2, "こおり": 0.5, "じめん": 2, "ひこう": 2, "ドラゴン": 2, "はがね": 0.5 },
  "かくとう": { "ノーマル": 2, "こおり": 2, "どく": 0.5, "ひこう": 0.5, "エスパー": 0.5, "むし": 0.5, "いわ": 2, "ゴースト": 0, "あく": 2, "はがね": 2, "フェアリー": 0.5 },
  "どく": { "くさ": 2, "どく": 0.5, "じめん": 0.5, "いわ": 0.5, "ゴースト": 0.5, "はがね": 0, "フェアリー": 2 },
  "じめん": { "ほのお": 2, "でんき": 2, "くさ": 0.5, "どく": 2, "ひこう": 0, "むし": 0.5, "いわ": 2, "はがね": 2 },
  "ひこう": { "でんき": 0.5, "くさ": 2, "かくとう": 2, "むし": 2, "いわ": 0.5, "はがね": 0.5 },
  "エスパー": { "かくとう": 2, "どく": 2, "エスパー": 0.5, "あく": 0, "はがね": 0.5 },
  "むし": { "ほのお": 0.5, "くさ": 2, "かくとう": 0.5, "どく": 0.5, "ひこう": 0.5, "エスパー": 2, "ゴースト": 0.5, "あく": 2, "はがね": 0.5, "フェアリー": 0.5 },
  "いわ": { "ほのお": 2, "こおり": 2, "かくとう": 0.5, "じめん": 0.5, "ひこう": 2, "むし": 2, "はがね": 0.5 },
  "ゴースト": { "ノーマル": 0, "エスパー": 2, "ゴースト": 2, "あく": 0.5 },
  "ドラゴン": { "ドラゴン": 2, "はがね": 0.5, "フェアリー": 0 },
  "あく": { "かくとう": 0.5, "エスパー": 2, "ゴースト": 2, "あく": 0.5, "フェアリー": 0.5 },
  "はがね": { "ほのお": 0.5, "みず": 0.5, "でんき": 0.5, "こおり": 2, "いわ": 2, "はがね": 0.5, "フェアリー": 2 },
  "フェアリー": { "ほのお": 0.5, "かくとう": 2, "どく": 0.5, "ドラゴン": 2, "あく": 2, "はがね": 0.5 }
};

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
  if (typeof baseStats === "undefined") return POKEMON;

  return Object.entries(baseStats).map(([name, data]) => ({
    name,
    types: data.types || [],
    stats: [data.h, data.a, data.b, data.c, data.d, data.s]
  }));
}

function getMoveNames() {
  if (typeof moves !== "undefined") return Object.keys(moves);
  return MOVES;
}

function getAbilityNames() {
  if (typeof abilities !== "undefined") return Object.keys(abilities);
  return ABILITIES;
}

function getItemNames() {
  if (typeof items !== "undefined") return Object.keys(items);
  return ITEMS;
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
  totalOutput.textContent = `${total} / 508`;
  totalOutput.classList.toggle("over", total > 508);

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
    return {
      type: attackType,
      max: Math.max(...multipliers),
      min: Math.min(...multipliers),
      weakCount: multipliers.filter((value) => value > 1).length
    };
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
