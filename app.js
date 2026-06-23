const STORAGE_KEY = "buxizhou-v1";
const DRAFT_KEY = "buxizhou-note-draft";
const BACKUP_META_KEY = "buxizhou-backup-meta";
const RECENT_COLLAPSED_KEY = "buxizhou-recent-collapsed";
const LAST_SYNC_KEY = "buxizhou-last-sync";
const CLOUD_UPLOAD_CONFIRMED_KEY = "buxizhou-cloud-upload-confirmed";
const DB_NAME = "buxizhou-diary";
const DB_VERSION = 1;
const DB_STORE = "documents";
const DB_STATE_ID = "state";
const DATA_VERSION = 5;
const MAX_NOTE_IMAGE_SIZE = 960;
const PHOTO_JPEG_QUALITY = 0.72;
const BACKUP_REMINDER_DAYS = 7;
const BACKUP_REMINDER_NOTES = 10;
const REMINDER_HOUR = 22;
const REMINDER_MINUTE = 30;
const CLOUD_CONFIG = window.BUXIZHOU_CLOUD || {};
const SUPABASE_URL = CLOUD_CONFIG.supabaseUrl || "";
const SUPABASE_ANON_KEY = CLOUD_CONFIG.supabaseAnonKey || "";
const SUPABASE_TABLES = {
  notes: "diary_notes",
  todos: "diary_todos"
};
const TODO_COLORS = ["#ff8aa1", "#ffd166", "#7bdff2", "#b8f2c2", "#cdb4db", "#f6bd60"];
const NO_DUE_SORT_VALUE = Number.MAX_SAFE_INTEGER;

const feed = {
  quotes: [
    { text: "行到水穷处，坐看云起时。", source: "王维《终南别业》" },
    { text: "采菊东篱下，悠然见南山。", source: "陶渊明《饮酒》" },
    { text: "山中何所有，岭上多白云。", source: "陶弘景《诏问山中何所有赋诗以答》" },
    { text: "人生天地间，忽如远行客。", source: "《古诗十九首》" },
    { text: "落霞与孤鹜齐飞，秋水共长天一色。", source: "王勃《滕王阁序》" },
    { text: "疏影横斜水清浅，暗香浮动月黄昏。", source: "林逋《山园小梅》" },
    { text: "明月松间照，清泉石上流。", source: "王维《山居秋暝》" },
    { text: "海日生残夜，江春入旧年。", source: "王湾《次北固山下》" },
    { text: "野旷天低树，江清月近人。", source: "孟浩然《宿建德江》" },
    { text: "星垂平野阔，月涌大江流。", source: "杜甫《旅夜书怀》" },
    { text: "白日依山尽，黄河入海流。", source: "王之涣《登鹳雀楼》" },
    { text: "春水碧于天，画船听雨眠。", source: "韦庄《菩萨蛮》" },
    { text: "春潮带雨晚来急，野渡无人舟自横。", source: "韦应物《滁州西涧》" },
    { text: "自在飞花轻似梦，无边丝雨细如愁。", source: "秦观《浣溪沙》" },
    { text: "山气日夕佳，飞鸟相与还。", source: "陶渊明《饮酒》" },
    { text: "大漠孤烟直，长河落日圆。", source: "王维《使至塞上》" },
    { text: "江流天地外，山色有无中。", source: "王维《汉江临泛》" },
    { text: "梨花院落溶溶月，柳絮池塘淡淡风。", source: "晏殊《无题》" },
    { text: "绿杨烟外晓寒轻，红杏枝头春意闹。", source: "宋祁《玉楼春》" },
    { text: "独立小桥风满袖，平林新月人归后。", source: "冯延巳《鹊踏枝》" },
    { text: "水晶帘动微风起，满架蔷薇一院香。", source: "高骈《山亭夏日》" },
    { text: "人闲桂花落，夜静春山空。", source: "王维《鸟鸣涧》" },
    { text: "荷风送香气，竹露滴清响。", source: "孟浩然《夏日南亭怀辛大》" },
    { text: "天阶夜色凉如水，卧看牵牛织女星。", source: "杜牧《秋夕》" },
    { text: "沾衣欲湿杏花雨，吹面不寒杨柳风。", source: "志南《绝句》" },
    { text: "柴门闻犬吠，风雪夜归人。", source: "刘长卿《逢雪宿芙蓉山主人》" },
    { text: "浮云游子意，落日故人情。", source: "李白《送友人》" },
    { text: "云青青兮欲雨，水澹澹兮生烟。", source: "李白《梦游天姥吟留别》" },
    { text: "溪云初起日沉阁，山雨欲来风满楼。", source: "许浑《咸阳城东楼》" },
    { text: "小楼一夜听春雨，深巷明朝卖杏花。", source: "陆游《临安春雨初霁》" },
    { text: "树深时见鹿，溪午不闻钟。", source: "李白《访戴天山道士不遇》" },
    { text: "看取莲花净，应知不染心。", source: "孟浩然《题大禹寺义公禅房》" },
    { text: "晚来天欲雪，能饮一杯无。", source: "白居易《问刘十九》" },
    { text: "庭院深深深几许，杨柳堆烟，帘幕无重数。", source: "欧阳修《蝶恋花》" },
    { text: "一年好景君须记，最是橙黄橘绿时。", source: "苏轼《赠刘景文》" },
    { text: "竹杖芒鞋轻胜马，谁怕？一蓑烟雨任平生。", source: "苏轼《定风波》" },
    { text: "试问岭南应不好，却道：此心安处是吾乡。", source: "苏轼《定风波》" },
    { text: "众鸟高飞尽，孤云独去闲。", source: "李白《独坐敬亭山》" },
    { text: "欲买桂花同载酒，终不似，少年游。", source: "刘过《唐多令》" },
    { text: "流光容易把人抛，红了樱桃，绿了芭蕉。", source: "蒋捷《一剪梅》" }
  ],
  photos: [
    {
      title: "Forest morning",
      source: "Unsplash",
      image: "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&crop=entropy&w=1440&h=2560&q=92&dpr=2",
      position: "center center"
    },
    {
      title: "Mountain mist",
      source: "Pexels",
      image: "https://images.pexels.com/photos/2662116/pexels-photo-2662116.jpeg?auto=compress&cs=tinysrgb&fit=crop&w=1440&h=2560&dpr=2",
      position: "center center"
    },
    {
      title: "Sea afterglow",
      source: "Unsplash",
      image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&crop=entropy&w=1440&h=2560&q=92&dpr=2",
      position: "center bottom"
    },
    {
      title: "Lake quiet",
      source: "Unsplash",
      image: "https://images.unsplash.com/photo-1470770903676-69b98201ea1c?auto=format&fit=crop&crop=entropy&w=1440&h=2560&q=92&dpr=2",
      position: "center center"
    },
    {
      title: "Forest path",
      source: "Unsplash",
      image: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&crop=entropy&w=1440&h=2560&q=92&dpr=2",
      position: "center center"
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
            createdAt: normalizeDate(note.createdAt),
            updatedAt: normalizeDate(note.updatedAt || note.createdAt),
            deletedAt: note.deletedAt ? normalizeDate(note.deletedAt) : "",
            imageData: typeof note.imageData === "string" ? note.imageData : "",
            imageName: typeof note.imageName === "string" ? note.imageName : ""
          }))
          .filter((note) => note.deletedAt || note.text || note.imageData)
      : [],
    todos: Array.isArray(input.todos)
      ? input.todos
          .map((todo) => ({
            id: todo.id || createId(),
            title: String(todo.title || "").trim(),
            due: todo.due || "",
            scope: todo.scope === "week" ? "week" : "today",
            done: Boolean(todo.done),
            createdAt: normalizeDate(todo.createdAt),
            updatedAt: normalizeDate(todo.updatedAt || todo.createdAt),
            deletedAt: todo.deletedAt ? normalizeDate(todo.deletedAt) : ""
          }))
          .filter((todo) => todo.deletedAt || todo.title)
      : []
  };
}

function normalizeDate(value) {
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? new Date().toISOString() : date.toISOString();
}

function getLocalDayKey(date = new Date()) {
  return `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;
}

const els = {
  timeText: document.querySelector("#timeText"),
  todayText: document.querySelector("#todayText"),
  photoBackdrop: document.querySelector("#photoBackdrop"),
  photoTitle: document.querySelector("#photoTitle"),
  photoSource: document.querySelector("#photoSource"),
  quoteText: document.querySelector("#quoteText"),
  quoteSource: document.querySelector("#quoteSource"),
  noteInput: document.querySelector("#noteInput"),
  photoInput: document.querySelector("#photoInput"),
  addPhotoButton: document.querySelector("#addPhotoButton"),
  photoPreview: document.querySelector("#photoPreview"),
  photoPreviewImage: document.querySelector("#photoPreviewImage"),
  removePhotoButton: document.querySelector("#removePhotoButton"),
  saveNoteButton: document.querySelector("#saveNoteButton"),
  saveStatus: document.querySelector("#saveStatus"),
  recentNotes: document.querySelector("#recentNotes"),
  recentSummary: document.querySelector("#recentSummary"),
  recentToggleButton: document.querySelector("#recentToggleButton"),
  memoryPanel: document.querySelector("#memoryPanel"),
  memoryList: document.querySelector("#memoryList"),
  exportButtonFooter: document.querySelector("#exportButtonFooter"),
  importButton: document.querySelector("#importButton"),
  importFile: document.querySelector("#importFile"),
  backupStatus: document.querySelector("#backupStatus"),
  storageStatus: document.querySelector("#storageStatus"),
  cloudAuth: document.querySelector("#cloudAuth"),
  cloudActions: document.querySelector("#cloudActions"),
  cloudHelp: document.querySelector("#cloudHelp"),
  syncStatus: document.querySelector("#syncStatus"),
  syncEmail: document.querySelector("#syncEmail"),
  sendLoginButton: document.querySelector("#sendLoginButton"),
  syncNowButton: document.querySelector("#syncNowButton"),
  uploadLocalButton: document.querySelector("#uploadLocalButton"),
  logoutButton: document.querySelector("#logoutButton"),
  calendarReminderButton: document.querySelector("#calendarReminderButton"),
  clearDoneButton: document.querySelector("#clearDoneButton"),
  todayTodos: document.querySelector("#todayTodos"),
  weekTodos: document.querySelector("#weekTodos")
};

let state = createEmptyState();
let pendingPhoto = null;
let currentTodoDayKey = getLocalDayKey();
let recentCollapsed = localStorage.getItem(RECENT_COLLAPSED_KEY) === "true";
let supabaseClient = null;
let syncUser = null;
let syncReady = false;

function openDiaryDb() {
  return new Promise((resolve, reject) => {
    if (!("indexedDB" in window)) {
      reject(new Error("IndexedDB unavailable"));
      return;
    }

    const request = indexedDB.open(DB_NAME, DB_VERSION);
    request.addEventListener("upgradeneeded", () => {
      const db = request.result;
      if (!db.objectStoreNames.contains(DB_STORE)) {
        db.createObjectStore(DB_STORE, { keyPath: "id" });
      }
    });
    request.addEventListener("success", () => resolve(request.result));
    request.addEventListener("error", () => reject(request.error || new Error("Open database failed")));
  });
}

function readStateFromIndexedDb() {
  return openDiaryDb().then(
    (db) =>
      new Promise((resolve, reject) => {
        const transaction = db.transaction(DB_STORE, "readonly");
        const store = transaction.objectStore(DB_STORE);
        const request = store.get(DB_STATE_ID);
        request.addEventListener("success", () => {
          db.close();
          resolve(request.result?.value || null);
        });
        request.addEventListener("error", () => {
          db.close();
          reject(request.error || new Error("Read database failed"));
        });
      })
  );
}

function writeStateToIndexedDb(nextState) {
  return openDiaryDb().then(
    (db) =>
      new Promise((resolve, reject) => {
        const transaction = db.transaction(DB_STORE, "readwrite");
        const store = transaction.objectStore(DB_STORE);
        store.put({
          id: DB_STATE_ID,
          value: nextState,
          savedAt: new Date().toISOString()
        });
        transaction.addEventListener("complete", () => {
          db.close();
          resolve();
        });
        transaction.addEventListener("error", () => {
          db.close();
          reject(transaction.error || new Error("Write database failed"));
        });
      })
  );
}

function loadLegacyState() {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) return createEmptyState();

  try {
    return normalizeState(JSON.parse(raw));
  } catch {
    return createEmptyState();
  }
}

async function loadState() {
  try {
    const indexedState = await readStateFromIndexedDb();
    if (indexedState) return normalizeState(indexedState);
  } catch {
    // Fall back to the old localStorage copy below.
  }

  const legacyState = loadLegacyState();
  if (legacyState.notes.length || legacyState.todos.length) {
    try {
      await writeStateToIndexedDb(legacyState);
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      // Keep the old localStorage data if migration cannot complete.
    }
  }
  return legacyState;
}

async function saveState() {
  state.version = DATA_VERSION;
  try {
    await writeStateToIndexedDb(state);
    localStorage.removeItem(STORAGE_KEY);
    return true;
  } catch {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
      return true;
    } catch {
      return false;
    }
  }
}

function activeNotes() {
  return state.notes.filter((note) => !note.deletedAt);
}

function activeTodos() {
  return state.todos.filter((todo) => !todo.deletedAt);
}

function markUpdated(item) {
  item.updatedAt = new Date().toISOString();
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

function formatShortDateTime(value) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "";
  return new Intl.DateTimeFormat("zh-CN", {
    month: "numeric",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit"
  }).format(date);
}

function getTodoTime(todo) {
  if (!todo.due) return NO_DUE_SORT_VALUE;
  const date = new Date(todo.due);
  return Number.isNaN(date.getTime()) ? NO_DUE_SORT_VALUE : date.getTime();
}

function isSameLocalDay(value, target = new Date()) {
  if (!value) return false;
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return false;

  return (
    date.getFullYear() === target.getFullYear() &&
    date.getMonth() === target.getMonth() &&
    date.getDate() === target.getDate()
  );
}

function compareTodos(a, b) {
  if (a.done !== b.done) return a.done ? 1 : -1;

  const timeA = getTodoTime(a);
  const timeB = getTodoTime(b);
  if (timeA !== timeB) return timeA - timeB;

  return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
}

function syncTodoScopesByDate() {
  let changed = false;

  activeTodos().forEach((todo) => {
    if (todo.scope === "week" && isSameLocalDay(todo.due)) {
      todo.scope = "today";
      markUpdated(todo);
      changed = true;
    }
  });

  if (changed) {
    void saveState().then(() => {
      renderStorageSummary();
      return syncIfReady();
    });
  }
}

function refreshTodosAfterDayChange() {
  const nextDayKey = getLocalDayKey();
  if (nextDayKey === currentTodoDayKey) return;

  currentTodoDayKey = nextDayKey;
  renderTodos();
}

function renderFeed() {
  const quote = feed.quotes[dailyIndex(feed.quotes.length, 1)];
  const photo = feed.photos[dailyIndex(feed.photos.length, 4)];

  els.quoteText.textContent = quote.text;
  els.quoteSource.textContent = quote.source;
  els.photoTitle.textContent = photo.title;
  els.photoSource.textContent = photo.source;
  els.photoBackdrop.style.backgroundImage = `url("${photo.image}")`;
  els.photoBackdrop.style.backgroundPosition = photo.position || "center center";
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
  remove.addEventListener("click", async () => {
    const previousDeletedAt = note.deletedAt;
    const deletedAt = new Date().toISOString();
    note.deletedAt = deletedAt;
    note.updatedAt = deletedAt;
    if (!(await saveState())) {
      note.deletedAt = previousDeletedAt;
      els.saveStatus.textContent = "删除失败，稍后再试";
      return;
    }
    renderNotes();
    renderStorageSummary();
    void syncIfReady();
  });

  const text = document.createElement("p");
  text.textContent = note.text;

  header.append(time, remove);
  article.append(header);

  if (note.imageData) {
    const image = document.createElement("img");
    image.className = "note-photo";
    image.src = note.imageData;
    image.alt = note.imageName || "记录照片";
    article.append(image);
  }

  if (note.text) {
    article.append(text);
  }

  return article;
}

function renderNotes() {
  const notes = activeNotes();
  els.recentNotes.innerHTML = "";
  els.recentToggleButton.textContent = recentCollapsed ? "展开" : "收起";
  els.recentToggleButton.setAttribute("aria-expanded", String(!recentCollapsed));
  els.recentNotes.classList.toggle("hidden", recentCollapsed);
  els.recentSummary.classList.toggle("hidden", !recentCollapsed);

  if (!notes.length) {
    els.recentNotes.textContent = "还没有记录。";
    els.recentNotes.classList.add("empty-state");
    els.recentSummary.textContent = "还没有记录。";
  } else {
    els.recentNotes.classList.remove("empty-state");
    const latest = notes[0];
    const summaryText = latest.text || (latest.imageData ? "一张照片记录" : "最近有记录");
    els.recentSummary.textContent = `${notes.length} 条记录，最新：${summaryText.slice(0, 32)}`;
    notes.slice(0, 5).forEach((note) => {
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

  const memories = activeNotes().filter((note) => {
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

async function saveNote() {
  const text = els.noteInput.value.trim();
  if (!text && !pendingPhoto) {
    els.saveStatus.textContent = "还没写内容";
    return;
  }

  const now = new Date().toISOString();
  state.notes.unshift({
    id: createId(),
    text,
    createdAt: now,
    updatedAt: now,
    deletedAt: "",
    imageData: pendingPhoto?.dataUrl || "",
    imageName: pendingPhoto?.name || ""
  });

  if (!(await saveState())) {
    state.notes.shift();
    els.saveStatus.textContent = "保存失败，照片太大";
    return;
  }

  localStorage.removeItem(DRAFT_KEY);
  els.noteInput.value = "";
  clearPendingPhoto();
  els.saveStatus.textContent = "已保存";
  renderNotes();
  renderStorageSummary();
  void syncIfReady();
  window.setTimeout(() => {
    els.saveStatus.textContent = "";
  }, 1600);
}

function clearPendingPhoto() {
  pendingPhoto = null;
  els.photoInput.value = "";
  els.photoPreviewImage.removeAttribute("src");
  els.photoPreview.classList.add("hidden");
}

function setPendingPhoto(photo) {
  pendingPhoto = photo;
  els.photoPreviewImage.src = photo.dataUrl;
  els.photoPreview.classList.remove("hidden");
}

function handlePhotoInput(event) {
  const [file] = event.target.files;
  if (!file) return;

  if (!file.type.startsWith("image/")) {
    els.saveStatus.textContent = "请选择照片";
    return;
  }

  els.saveStatus.textContent = "正在处理照片";
  compressImage(file)
    .then((dataUrl) => {
      setPendingPhoto({ dataUrl, name: file.name });
      els.saveStatus.textContent = "照片已添加";
      window.setTimeout(() => {
        if (els.saveStatus.textContent === "照片已添加") els.saveStatus.textContent = "";
      }, 1400);
    })
    .catch(() => {
      els.saveStatus.textContent = "照片添加失败";
      els.photoInput.value = "";
    });
}

function compressImage(file) {
  return new Promise((resolve, reject) => {
    const image = new Image();
    const objectUrl = URL.createObjectURL(file);

    image.addEventListener("load", () => {
      const scale = Math.min(1, MAX_NOTE_IMAGE_SIZE / Math.max(image.width, image.height));
      const width = Math.max(1, Math.round(image.width * scale));
      const height = Math.max(1, Math.round(image.height * scale));
      const canvas = document.createElement("canvas");
      canvas.width = width;
      canvas.height = height;
      const context = canvas.getContext("2d");

      if (!context) {
        URL.revokeObjectURL(objectUrl);
        reject(new Error("Canvas unavailable"));
        return;
      }

      context.drawImage(image, 0, 0, width, height);
      URL.revokeObjectURL(objectUrl);
      resolve(canvas.toDataURL("image/jpeg", PHOTO_JPEG_QUALITY));
    });

    image.addEventListener("error", () => {
      URL.revokeObjectURL(objectUrl);
      reject(new Error("Image load failed"));
    });

    image.src = objectUrl;
  });
}

function saveNoteFromKeyboard(event) {
  if ((event.metaKey || event.ctrlKey) && event.key === "Enter") {
    event.preventDefault();
    void saveNote();
  }
}

function renderTodos() {
  syncTodoScopesByDate();
  renderTodoList("today", els.todayTodos);
  renderTodoList("week", els.weekTodos);
}

function renderTodoList(scope, container) {
  const todos = activeTodos().filter((todo) => todo.scope === scope).sort(compareTodos);
  container.innerHTML = "";

  if (!todos.length) {
    const empty = document.createElement("p");
    empty.className = "empty-state";
    empty.textContent = "暂无任务。";
    container.append(empty);
    return;
  }

  todos.forEach((todo, index) => {
    const item = document.createElement("article");
    item.className = `todo-item${todo.done ? " done" : ""}`;
    item.style.setProperty("--todo-color", TODO_COLORS[index % TODO_COLORS.length]);
    item.style.setProperty("--todo-order", index);

    const checkbox = document.createElement("input");
    checkbox.className = "todo-check";
    checkbox.type = "checkbox";
    checkbox.checked = todo.done;
    checkbox.setAttribute("aria-label", "标记完成");
    checkbox.addEventListener("change", async () => {
      const previousDone = todo.done;
      todo.done = checkbox.checked;
      markUpdated(todo);
      if (!(await saveState())) {
        todo.done = previousDone;
      }
      renderTodos();
      renderStorageSummary();
      void syncIfReady();
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
    remove.addEventListener("click", async () => {
      const previousDeletedAt = todo.deletedAt;
      const deletedAt = new Date().toISOString();
      todo.deletedAt = deletedAt;
      todo.updatedAt = deletedAt;
      if (!(await saveState())) {
        todo.deletedAt = previousDeletedAt;
      }
      renderTodos();
      renderStorageSummary();
      void syncIfReady();
    });

    item.append(checkbox, content, remove);
    container.append(item);
  });
}

async function addTodo(event) {
  event.preventDefault();
  const form = event.currentTarget;
  const data = new FormData(form);
  const title = String(data.get("title") || "").trim();
  const due = String(data.get("due") || "");
  const scope = form.dataset.scope;

  if (!title) return;

  const now = new Date().toISOString();
  state.todos.unshift({
    id: createId(),
    title,
    due,
    scope,
    done: false,
    createdAt: now,
    updatedAt: now,
    deletedAt: ""
  });
  if (!(await saveState())) {
    state.todos.shift();
    return;
  }
  form.reset();
  renderTodos();
  renderStorageSummary();
  void syncIfReady();
}

function getBackupMeta() {
  try {
    return JSON.parse(localStorage.getItem(BACKUP_META_KEY) || "null");
  } catch {
    return null;
  }
}

function getStateSize() {
  return new Blob([JSON.stringify(state)]).size;
}

function formatBytes(bytes) {
  if (!bytes) return "0 KB";
  if (bytes < 1024 * 1024) return `${Math.max(1, Math.round(bytes / 1024))} KB`;
  return `${(bytes / 1024 / 1024).toFixed(1)} MB`;
}

async function getQuotaText() {
  if (!navigator.storage?.estimate) return "";
  try {
    const estimate = await navigator.storage.estimate();
    if (!estimate.quota || !estimate.usage) return "";
    return `，浏览器已用 ${formatBytes(estimate.usage)}`;
  } catch {
    return "";
  }
}

async function renderStorageSummary() {
  if (!els.storageStatus) return;

  const notes = activeNotes();
  const noteCount = notes.length;
  const photoCount = notes.filter((note) => note.imageData).length;
  const backupMeta = getBackupMeta();
  const quotaText = await getQuotaText();
  const sizeText = formatBytes(getStateSize());
  let backupText = "建议先导出一次备份";

  if (backupMeta?.exportedAt) {
    const backupTime = new Date(backupMeta.exportedAt).getTime();
    const daysSinceBackup = Number.isNaN(backupTime)
      ? BACKUP_REMINDER_DAYS + 1
      : Math.floor((Date.now() - backupTime) / 86400000);
    const notesSinceBackup = Math.max(0, noteCount - Number(backupMeta.noteCount || 0));
    backupText =
      daysSinceBackup >= BACKUP_REMINDER_DAYS || notesSinceBackup >= BACKUP_REMINDER_NOTES
        ? "建议导出备份"
        : "备份状态良好";
  }

  els.storageStatus.textContent = `已存 ${noteCount} 条记录、${photoCount} 张照片，约 ${sizeText}${quotaText}。${backupText}。`;
}

function cloudConfigured() {
  return Boolean(SUPABASE_URL && SUPABASE_ANON_KEY);
}

function cloudUploadConfirmed() {
  return syncUser && localStorage.getItem(CLOUD_UPLOAD_CONFIRMED_KEY) === syncUser.id;
}

function getLatestTimestamp(item) {
  return new Date(item.updatedAt || item.deletedAt || item.createdAt || 0).getTime() || 0;
}

function mergeItems(localItems, cloudItems) {
  const merged = new Map();
  [...localItems, ...cloudItems].forEach((item) => {
    const current = merged.get(item.id);
    if (!current || getLatestTimestamp(item) >= getLatestTimestamp(current)) {
      merged.set(item.id, item);
    }
  });
  return [...merged.values()].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
}

function noteToCloudRow(note) {
  return {
    id: note.id,
    user_id: syncUser.id,
    body: note.text,
    image_data: note.imageData,
    image_name: note.imageName,
    created_at: note.createdAt,
    updated_at: note.updatedAt || note.createdAt,
    deleted_at: note.deletedAt || null
  };
}

function todoToCloudRow(todo) {
  return {
    id: todo.id,
    user_id: syncUser.id,
    title: todo.title,
    due: todo.due || null,
    scope: todo.scope,
    done: todo.done,
    created_at: todo.createdAt,
    updated_at: todo.updatedAt || todo.createdAt,
    deleted_at: todo.deletedAt || null
  };
}

function noteFromCloudRow(row) {
  return {
    id: row.id,
    text: row.body || "",
    imageData: row.image_data || "",
    imageName: row.image_name || "",
    createdAt: normalizeDate(row.created_at),
    updatedAt: normalizeDate(row.updated_at || row.created_at),
    deletedAt: row.deleted_at ? normalizeDate(row.deleted_at) : ""
  };
}

function todoFromCloudRow(row) {
  return {
    id: row.id,
    title: row.title || "",
    due: row.due || "",
    scope: row.scope === "week" ? "week" : "today",
    done: Boolean(row.done),
    createdAt: normalizeDate(row.created_at),
    updatedAt: normalizeDate(row.updated_at || row.created_at),
    deletedAt: row.deleted_at ? normalizeDate(row.deleted_at) : ""
  };
}

function renderCloudPanel() {
  if (!els.cloudHelp) return;

  if (!cloudConfigured()) {
    els.cloudAuth.classList.add("hidden");
    els.cloudActions.classList.add("hidden");
    els.syncStatus.textContent = "未配置";
    els.cloudHelp.textContent = "云同步需要先配置 Supabase。未配置前仍会继续本地保存。";
    return;
  }

  els.cloudAuth.classList.toggle("hidden", Boolean(syncUser));
  els.cloudActions.classList.toggle("hidden", !syncUser);

  if (!syncUser) {
    els.syncStatus.textContent = "未登录";
    els.cloudHelp.textContent = "输入邮箱后，会收到一封登录邮件。登录后可手动上传本机记录。";
    return;
  }

  const lastSync = localStorage.getItem(LAST_SYNC_KEY);
  els.syncStatus.textContent = cloudUploadConfirmed() ? "已登录" : "待确认";
  els.cloudHelp.textContent = cloudUploadConfirmed()
    ? `已登录 ${syncUser.email || ""}${lastSync ? `，上次同步 ${formatShortDateTime(lastSync)}` : ""}。`
    : "已登录。请点“上传本机记录”，确认把这台设备上的旧记录同步到云端。";
}

async function initCloudSync() {
  renderCloudPanel();
  if (!cloudConfigured()) return;

  try {
    const { createClient } = await import("https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm");
    supabaseClient = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
      auth: {
        autoRefreshToken: true,
        detectSessionInUrl: true,
        persistSession: true
      }
    });
    const { data } = await supabaseClient.auth.getSession();
    syncUser = data.session?.user || null;
    syncReady = Boolean(syncUser);
    supabaseClient.auth.onAuthStateChange((_event, session) => {
      syncUser = session?.user || null;
      syncReady = Boolean(syncUser);
      renderCloudPanel();
      if (syncReady) void pullCloudIntoLocal();
    });
    renderCloudPanel();
    if (syncReady) await pullCloudIntoLocal();
  } catch {
    syncReady = false;
    els.syncStatus.textContent = "连接失败";
    els.cloudHelp.textContent = "云同步组件加载失败，本地保存不受影响。";
  }
}

async function sendLoginEmail() {
  if (!supabaseClient) return;
  const email = els.syncEmail.value.trim();
  if (!email) {
    els.syncStatus.textContent = "请输入邮箱";
    return;
  }

  els.syncStatus.textContent = "发送中";
  const { error } = await supabaseClient.auth.signInWithOtp({
    email,
    options: {
      emailRedirectTo: window.location.href
    }
  });
  els.syncStatus.textContent = error ? "发送失败" : "请查收邮件";
  if (!error) els.cloudHelp.textContent = "打开邮件里的登录链接后，再回到不系舟。";
}

async function logoutCloud() {
  if (!supabaseClient) return;
  await supabaseClient.auth.signOut();
  syncUser = null;
  syncReady = false;
  renderCloudPanel();
}

async function fetchCloudState() {
  const [{ data: noteRows, error: noteError }, { data: todoRows, error: todoError }] = await Promise.all([
    supabaseClient.from(SUPABASE_TABLES.notes).select("*").eq("user_id", syncUser.id),
    supabaseClient.from(SUPABASE_TABLES.todos).select("*").eq("user_id", syncUser.id)
  ]);
  if (noteError || todoError) throw noteError || todoError;
  return normalizeState({
    notes: (noteRows || []).map(noteFromCloudRow),
    todos: (todoRows || []).map(todoFromCloudRow)
  });
}

async function pushStateToCloud() {
  const noteRows = state.notes.map(noteToCloudRow);
  const todoRows = state.todos.map(todoToCloudRow);
  const requests = [];
  if (noteRows.length) requests.push(supabaseClient.from(SUPABASE_TABLES.notes).upsert(noteRows, { onConflict: "user_id,id" }));
  if (todoRows.length) requests.push(supabaseClient.from(SUPABASE_TABLES.todos).upsert(todoRows, { onConflict: "user_id,id" }));
  const results = await Promise.all(requests);
  const failed = results.find((result) => result.error);
  if (failed) throw failed.error;
}

async function pullCloudIntoLocal() {
  if (!syncReady) return;
  try {
    const cloudState = await fetchCloudState();
    state = normalizeState({
      notes: mergeItems(state.notes, cloudState.notes),
      todos: mergeItems(state.todos, cloudState.todos)
    });
    await saveState();
    renderNotes();
    renderTodos();
    renderStorageSummary();
    renderCloudPanel();
  } catch {
    els.syncStatus.textContent = "同步失败";
  }
}

async function syncWithCloud({ confirmUpload = false } = {}) {
  if (!syncReady) return;
  if (confirmUpload) {
    localStorage.setItem(CLOUD_UPLOAD_CONFIRMED_KEY, syncUser.id);
  }
  if (!cloudUploadConfirmed()) {
    renderCloudPanel();
    return;
  }

  try {
    els.syncStatus.textContent = "同步中";
    const cloudState = await fetchCloudState();
    state = normalizeState({
      notes: mergeItems(state.notes, cloudState.notes),
      todos: mergeItems(state.todos, cloudState.todos)
    });
    await saveState();
    await pushStateToCloud();
    localStorage.setItem(LAST_SYNC_KEY, new Date().toISOString());
    renderNotes();
    renderTodos();
    renderStorageSummary();
    els.syncStatus.textContent = "已同步";
    renderCloudPanel();
  } catch {
    els.syncStatus.textContent = "同步失败";
  }
}

function syncIfReady() {
  if (!syncReady || !cloudUploadConfirmed()) return Promise.resolve();
  return syncWithCloud();
}

function padDatePart(value) {
  return String(value).padStart(2, "0");
}

function formatIcsLocalDateTime(date) {
  return `${date.getFullYear()}${padDatePart(date.getMonth() + 1)}${padDatePart(date.getDate())}T${padDatePart(date.getHours())}${padDatePart(date.getMinutes())}00`;
}

function formatIcsUtcDateTime(date) {
  return date.toISOString().replace(/[-:]/g, "").replace(/\.\d{3}Z$/, "Z");
}

function getNextReminderDate() {
  const next = new Date();
  next.setHours(REMINDER_HOUR, REMINDER_MINUTE, 0, 0);
  if (next.getTime() <= Date.now()) {
    next.setDate(next.getDate() + 1);
  }
  return next;
}

function downloadCalendarReminder() {
  const start = getNextReminderDate();
  const end = new Date(start.getTime() + 10 * 60 * 1000);
  const appUrl = window.location.href.split("#")[0];
  const lines = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Buxizhou//Diary Reminder//ZH-CN",
    "CALSCALE:GREGORIAN",
    "METHOD:PUBLISH",
    "BEGIN:VEVENT",
    "UID:buxizhou-diary-reminder@buxizhou",
    `DTSTAMP:${formatIcsUtcDateTime(new Date())}`,
    `DTSTART;TZID=Asia/Shanghai:${formatIcsLocalDateTime(start)}`,
    `DTEND;TZID=Asia/Shanghai:${formatIcsLocalDateTime(end)}`,
    "RRULE:FREQ=DAILY",
    "SUMMARY:写不系舟",
    `DESCRIPTION:打开不系舟写几句今天的记录。\\n${appUrl}`,
    "END:VEVENT",
    "END:VCALENDAR"
  ];
  const blob = new Blob([lines.join("\r\n")], { type: "text/calendar;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = "buxizhou-daily-reminder.ics";
  link.click();
  URL.revokeObjectURL(url);
}

function exportBackup() {
  const exportedAt = new Date().toISOString();
  const payload = {
    product: "不系舟",
    version: DATA_VERSION,
    exportedAt,
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
  localStorage.setItem(
    BACKUP_META_KEY,
    JSON.stringify({
      exportedAt,
      noteCount: activeNotes().length
    })
  );
  els.backupStatus.textContent = "已导出";
  renderStorageSummary();
}

function importBackup(file) {
  const reader = new FileReader();

  reader.addEventListener("load", async () => {
    try {
      const parsed = JSON.parse(String(reader.result));
      const nextState = parsed.data || parsed;

      if (!Array.isArray(nextState.notes) || !Array.isArray(nextState.todos)) {
        throw new Error("Invalid backup");
      }

      const previousState = state;
      state = normalizeState(nextState);
      if (!(await saveState())) {
        state = previousState;
        els.backupStatus.textContent = "导入失败，空间不够";
        return;
      }
      renderNotes();
      renderTodos();
      els.backupStatus.textContent = "已导入，建议导出一次新备份";
      renderStorageSummary();
      void syncIfReady();
    } catch {
      els.backupStatus.textContent = "导入失败";
    }
  });

  reader.readAsText(file);
}

async function clearDoneTodos() {
  const previousTodos = state.todos.map((todo) => ({ ...todo }));
  const deletedAt = new Date().toISOString();
  state.todos.forEach((todo) => {
    if (todo.done && !todo.deletedAt) {
      todo.deletedAt = deletedAt;
      todo.updatedAt = deletedAt;
    }
  });
  if (!(await saveState())) {
    state.todos = previousTodos;
  }
  renderTodos();
  renderStorageSummary();
  void syncIfReady();
}

function bindEvents() {
  els.saveNoteButton.addEventListener("click", saveNote);
  els.noteInput.addEventListener("keydown", saveNoteFromKeyboard);
  els.noteInput.addEventListener("input", () => {
    localStorage.setItem(DRAFT_KEY, els.noteInput.value);
  });
  els.addPhotoButton.addEventListener("click", () => els.photoInput.click());
  els.photoInput.addEventListener("change", handlePhotoInput);
  els.removePhotoButton.addEventListener("click", clearPendingPhoto);
  els.recentToggleButton.addEventListener("click", () => {
    recentCollapsed = !recentCollapsed;
    localStorage.setItem(RECENT_COLLAPSED_KEY, String(recentCollapsed));
    renderNotes();
  });
  els.exportButtonFooter.addEventListener("click", exportBackup);
  els.importButton.addEventListener("click", () => els.importFile.click());
  els.importFile.addEventListener("change", (event) => {
    const [file] = event.target.files;
    if (file) importBackup(file);
    event.target.value = "";
  });
  els.clearDoneButton.addEventListener("click", clearDoneTodos);
  els.sendLoginButton.addEventListener("click", sendLoginEmail);
  els.syncNowButton.addEventListener("click", () => void syncWithCloud());
  els.uploadLocalButton.addEventListener("click", () => void syncWithCloud({ confirmUpload: true }));
  els.logoutButton.addEventListener("click", logoutCloud);
  els.calendarReminderButton.addEventListener("click", downloadCalendarReminder);

  document.querySelectorAll(".todo-form").forEach((form) => {
    form.addEventListener("submit", addTodo);
  });
}

async function initApp() {
  state = await loadState();
  renderClock();
  renderFeed();
  els.noteInput.value = localStorage.getItem(DRAFT_KEY) || "";
  renderNotes();
  renderTodos();
  renderStorageSummary();
  bindEvents();
  void initCloudSync();
  window.setInterval(renderClock, 1000);
  window.setInterval(refreshTodosAfterDayChange, 60000);
}

void initApp();
