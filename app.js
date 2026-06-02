const STORAGE_KEY = "buxizhou-v1";
const DRAFT_KEY = "buxizhou-note-draft";
const DATA_VERSION = 2;

const feed = {
  quotes: [
    { text: "行到水穷处，坐看云起时。", source: "王维《终南别业》" },
    { text: "采菊东篱下，悠然见南山。", source: "陶渊明《饮酒》" },
    { text: "山中何所有，岭上多白云。", source: "陶弘景《诏问山中何所有赋诗以答》" },
    { text: "人生天地间，忽如远行客。", source: "《古诗十九首》" },
    { text: "落霞与孤鹜齐飞，秋水共长天一色。", source: "王勃《滕王阁序》" }
  ],
  music: [
    { title: "山丘", artist: "李宗盛" },
    { title: "我用什么把你留住", artist: "福禄寿FloruitShow" },
    { title: "春光乍泄", artist: "黄耀明" },
    { title: "Mystery of Love", artist: "Sufjan Stevens" },
    { title: "Sweet Disposition", artist: "The Temper Trap" }
  ],
  photos: [
    {
      title: "Forest morning",
      source: "Unsplash",
      image: "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&crop=entropy&w=1440&h=2560&q=92&dpr=2"
    },
    {
      title: "Mountain mist",
      source: "Pexels",
      image: "https://images.pexels.com/photos/2662116/pexels-photo-2662116.jpeg?auto=compress&cs=tinysrgb&fit=crop&w=1440&h=2560&dpr=2"
    },
    {
      title: "Sea afterglow",
      source: "Unsplash",
      image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&crop=entropy&w=1440&h=2560&q=92&dpr=2"
    },
    {
      title: "Window light",
      source: "Unsplash",
      image: "https://images.unsplash.com/photo-1494438639946-1ebd1d20bf85?auto=format&fit=crop&crop=entropy&w=1440&h=2560&q=92&dpr=2"
    },
    {
      title: "Northern light",
      source: "Pexels",
      image: "https://images.pexels.com/photos/3408744/pexels-photo-3408744.jpeg?auto=compress&cs=tinysrgb&fit=crop&w=1440&h=2560&dpr=2"
    }
  ]
};

function createEmptyState() {
  return {
    version: DATA_VERSION,
    notes: [],
    todos: []
  };
}

function createId() {
  if (window.crypto?.randomUUID) return window.crypto.randomUUID();
  return `id-${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

function normalizeState(input = {}) {
  return {
    version: DATA_VERSION,
    notes: Array.isArray(input.notes)
      ? input.notes
          .map((note) => ({
            id: note.id || createId(),
            text: String(note.text || "").trim(),
            createdAt: normalizeDate(note.createdAt)
          }))
          .filter((note) => note.text)
      : [],
    todos: Array.isArray(input.todos)
      ? input.todos
          .map((todo) => ({
            id: todo.id || createId(),
            title: String(todo.title || "").trim(),
            due: todo.due || "",
            scope: todo.scope === "week" ? "week" : "today",
            done: Boolean(todo.done),
            createdAt: normalizeDate(todo.createdAt)
          }))
          .filter((todo) => todo.title)
      : []
  };
}

function normalizeDate(value) {
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? new Date().toISOString() : date.toISOString();
}

const els = {
  timeText: document.querySelector("#timeText"),
  todayText: document.querySelector("#todayText"),
  photoBackdrop: document.querySelector("#photoBackdrop"),
  photoTitle: document.querySelector("#photoTitle"),
  photoSource: document.querySelector("#photoSource"),
  quoteText: document.querySelector("#quoteText"),
  quoteSource: document.querySelector("#quoteSource"),
  musicTitle: document.querySelector("#musicTitle"),
  musicArtist: document.querySelector("#musicArtist"),
  musicLink: document.querySelector("#musicLink"),
  noteInput: document.querySelector("#noteInput"),
  saveNoteButton: document.querySelector("#saveNoteButton"),
  saveStatus: document.querySelector("#saveStatus"),
  recentNotes: document.querySelector("#recentNotes"),
  memoryPanel: document.querySelector("#memoryPanel"),
  memoryList: document.querySelector("#memoryList"),
  exportButtonFooter: document.querySelector("#exportButtonFooter"),
  importButton: document.querySelector("#importButton"),
  importFile: document.querySelector("#importFile"),
  backupStatus: document.querySelector("#backupStatus"),
  clearDoneButton: document.querySelector("#clearDoneButton"),
  todayTodos: document.querySelector("#todayTodos"),
  weekTodos: document.querySelector("#weekTodos")
};

let state = loadState();

function loadState() {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) return createEmptyState();

  try {
    return normalizeState(JSON.parse(raw));
  } catch {
    return createEmptyState();
  }
}

function saveState() {
  state.version = DATA_VERSION;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function dailyIndex(length, offset = 0) {
  const now = new Date();
  const start = new Date(now.getFullYear(), 0, 0);
  const dayOfYear = Math.floor((now - start) / 86400000);
  return (dayOfYear + offset) % length;
}

function renderClock() {
  const now = new Date();
  els.timeText.textContent = new Intl.DateTimeFormat("zh-CN", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false
  }).format(now);
  els.todayText.textContent = formatDate(now);
}

function formatDate(date = new Date()) {
  const solar = new Intl.DateTimeFormat("zh-CN", {
    month: "long",
    day: "numeric",
    weekday: "short"
  }).format(date);
  const lunarParts = new Intl.DateTimeFormat("zh-CN-u-ca-chinese", {
    month: "long",
    day: "numeric"
  }).formatToParts(date);
  const lunarMonth = lunarParts.find((part) => part.type === "month")?.value || "";
  const lunarDay = Number(lunarParts.find((part) => part.type === "day")?.value || "");

  return `${solar} · ${lunarMonth}${formatLunarDay(lunarDay)}`;
}

function formatLunarDay(day) {
  const days = [
    "",
    "初一",
    "初二",
    "初三",
    "初四",
    "初五",
    "初六",
    "初七",
    "初八",
    "初九",
    "初十",
    "十一",
    "十二",
    "十三",
    "十四",
    "十五",
    "十六",
    "十七",
    "十八",
    "十九",
    "二十",
    "廿一",
    "廿二",
    "廿三",
    "廿四",
    "廿五",
    "廿六",
    "廿七",
    "廿八",
    "廿九",
    "三十"
  ];

  return days[day] || "";
}

function formatDateTime(value) {
  if (!value) return "未设置时间";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "未设置时间";

  return new Intl.DateTimeFormat("zh-CN", {
    month: "numeric",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit"
  }).format(date);
}

function renderFeed() {
  const quote = feed.quotes[dailyIndex(feed.quotes.length, 1)];
  const music = feed.music[dailyIndex(feed.music.length, 2)];
  const photo = feed.photos[dailyIndex(feed.photos.length, 4)];

  els.quoteText.textContent = quote.text;
  els.quoteSource.textContent = quote.source;
  els.musicTitle.textContent = music.title;
  els.musicArtist.textContent = music.artist;
  els.musicLink.href = `https://music.163.com/#/search/m/?s=${encodeURIComponent(`${music.title} ${music.artist}`)}`;
  els.photoTitle.textContent = photo.title;
  els.photoSource.textContent = photo.source;
  els.photoBackdrop.style.backgroundImage = `url("${photo.image}")`;
}

function createNoteCard(note) {
  const article = document.createElement("article");
  article.className = "note-card";

  const header = document.createElement("div");
  header.className = "note-card-header";

  const time = document.createElement("time");
  time.dateTime = note.createdAt;
  time.textContent = new Intl.DateTimeFormat("zh-CN", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit"
  }).format(new Date(note.createdAt));

  const remove = document.createElement("button");
  remove.className = "note-delete-button";
  remove.type = "button";
  remove.textContent = "删除";
  remove.setAttribute("aria-label", "删除记录");
  remove.addEventListener("click", () => {
    state.notes = state.notes.filter((item) => item.id !== note.id);
    saveState();
    renderNotes();
  });

  const text = document.createElement("p");
  text.textContent = note.text;

  header.append(time, remove);
  article.append(header, text);
  return article;
}

function renderNotes() {
  els.recentNotes.innerHTML = "";

  if (!state.notes.length) {
    els.recentNotes.textContent = "还没有记录。";
    els.recentNotes.classList.add("empty-state");
  } else {
    els.recentNotes.classList.remove("empty-state");
    state.notes.slice(0, 5).forEach((note) => {
      els.recentNotes.append(createNoteCard(note));
    });
  }

  renderMemories();
}

function renderMemories() {
  const now = new Date();
  const currentYear = now.getFullYear();
  const month = now.getMonth();
  const date = now.getDate();

  const memories = state.notes.filter((note) => {
    const created = new Date(note.createdAt);
    return (
      created.getFullYear() < currentYear &&
      created.getMonth() === month &&
      created.getDate() === date
    );
  });

  els.memoryList.innerHTML = "";
  if (!memories.length) {
    els.memoryPanel.classList.add("hidden");
    return;
  }

  els.memoryPanel.classList.remove("hidden");
  memories.forEach((note) => {
    els.memoryList.append(createNoteCard(note));
  });
}

function saveNote() {
  const text = els.noteInput.value.trim();
  if (!text) {
    els.saveStatus.textContent = "还没写内容";
    return;
  }

  state.notes.unshift({
    id: createId(),
    text,
    createdAt: new Date().toISOString()
  });
  saveState();
  localStorage.removeItem(DRAFT_KEY);
  els.noteInput.value = "";
  els.saveStatus.textContent = "已保存";
  renderNotes();
  window.setTimeout(() => {
    els.saveStatus.textContent = "";
  }, 1600);
}

function saveNoteFromKeyboard(event) {
  if ((event.metaKey || event.ctrlKey) && event.key === "Enter") {
    event.preventDefault();
    saveNote();
  }
}

function renderTodos() {
  renderTodoList("today", els.todayTodos);
  renderTodoList("week", els.weekTodos);
}

function renderTodoList(scope, container) {
  const todos = state.todos.filter((todo) => todo.scope === scope);
  container.innerHTML = "";

  if (!todos.length) {
    const empty = document.createElement("p");
    empty.className = "empty-state";
    empty.textContent = "暂无任务。";
    container.append(empty);
    return;
  }

  todos.forEach((todo) => {
    const item = document.createElement("article");
    item.className = `todo-item${todo.done ? " done" : ""}`;

    const checkbox = document.createElement("input");
    checkbox.className = "todo-check";
    checkbox.type = "checkbox";
    checkbox.checked = todo.done;
    checkbox.setAttribute("aria-label", "标记完成");
    checkbox.addEventListener("change", () => {
      todo.done = checkbox.checked;
      saveState();
      renderTodos();
    });

    const content = document.createElement("div");

    const title = document.createElement("p");
    title.className = "todo-title";
    title.textContent = todo.title;

    const meta = document.createElement("p");
    meta.className = "todo-meta";
    meta.textContent = formatDateTime(todo.due);

    content.append(title, meta);

    const remove = document.createElement("button");
    remove.className = "delete-button";
    remove.type = "button";
    remove.textContent = "×";
    remove.setAttribute("aria-label", "删除任务");
    remove.addEventListener("click", () => {
      state.todos = state.todos.filter((itemToKeep) => itemToKeep.id !== todo.id);
      saveState();
      renderTodos();
    });

    item.append(checkbox, content, remove);
    container.append(item);
  });
}

function addTodo(event) {
  event.preventDefault();
  const form = event.currentTarget;
  const data = new FormData(form);
  const title = String(data.get("title") || "").trim();
  const due = String(data.get("due") || "");
  const scope = form.dataset.scope;

  if (!title) return;

  state.todos.unshift({
    id: createId(),
    title,
    due,
    scope,
    done: false,
    createdAt: new Date().toISOString()
  });
  saveState();
  form.reset();
  renderTodos();
}

function exportBackup() {
  const payload = {
    product: "不系舟",
    version: DATA_VERSION,
    exportedAt: new Date().toISOString(),
    data: state
  };
  const blob = new Blob([JSON.stringify(payload, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  const stamp = new Date().toISOString().slice(0, 10);
  link.href = url;
  link.download = `buxizhou-backup-${stamp}.json`;
  link.click();
  URL.revokeObjectURL(url);
}

function importBackup(file) {
  const reader = new FileReader();

  reader.addEventListener("load", () => {
    try {
      const parsed = JSON.parse(String(reader.result));
      const nextState = parsed.data || parsed;

      if (!Array.isArray(nextState.notes) || !Array.isArray(nextState.todos)) {
        throw new Error("Invalid backup");
      }

      state = normalizeState(nextState);
      saveState();
      renderNotes();
      renderTodos();
      els.backupStatus.textContent = "已导入";
    } catch {
      els.backupStatus.textContent = "导入失败";
    }
  });

  reader.readAsText(file);
}

function clearDoneTodos() {
  state.todos = state.todos.filter((todo) => !todo.done);
  saveState();
  renderTodos();
}

function bindEvents() {
  els.saveNoteButton.addEventListener("click", saveNote);
  els.noteInput.addEventListener("keydown", saveNoteFromKeyboard);
  els.noteInput.addEventListener("input", () => {
    localStorage.setItem(DRAFT_KEY, els.noteInput.value);
  });
  els.exportButtonFooter.addEventListener("click", exportBackup);
  els.importButton.addEventListener("click", () => els.importFile.click());
  els.importFile.addEventListener("change", (event) => {
    const [file] = event.target.files;
    if (file) importBackup(file);
    event.target.value = "";
  });
  els.clearDoneButton.addEventListener("click", clearDoneTodos);

  document.querySelectorAll(".todo-form").forEach((form) => {
    form.addEventListener("submit", addTodo);
  });
}

renderClock();
renderFeed();
els.noteInput.value = localStorage.getItem(DRAFT_KEY) || "";
renderNotes();
renderTodos();
bindEvents();
window.setInterval(renderClock, 1000);
