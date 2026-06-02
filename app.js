const STORAGE_KEY = "buxizhou-v1";
const DRAFT_KEY = "buxizhou-note-draft";
const DATA_VERSION = 3;
const MAX_NOTE_IMAGE_SIZE = 1280;
const TODO_COLORS = ["#ff8aa1", "#ffd166", "#7bdff2", "#b8f2c2", "#cdb4db", "#f6bd60"];

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
            createdAt: normalizeDate(note.createdAt),
            imageData: typeof note.imageData === "string" ? note.imageData : "",
            imageName: typeof note.imageName === "string" ? note.imageName : ""
          }))
          .filter((note) => note.text || note.imageData)
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
  noteInput: document.querySelector("#noteInput"),
  photoInput: document.querySelector("#photoInput"),
  addPhotoButton: document.querySelector("#addPhotoButton"),
  photoPreview: document.querySelector("#photoPreview"),
  photoPreviewImage: document.querySelector("#photoPreviewImage"),
  removePhotoButton: document.querySelector("#removePhotoButton"),
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
let pendingPhoto = null;

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
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    return true;
  } catch {
    return false;
  }
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
  const photo = feed.photos[dailyIndex(feed.photos.length, 4)];

  els.quoteText.textContent = quote.text;
  els.quoteSource.textContent = quote.source;
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
  if (!text && !pendingPhoto) {
    els.saveStatus.textContent = "还没写内容";
    return;
  }

  state.notes.unshift({
    id: createId(),
    text,
    createdAt: new Date().toISOString(),
    imageData: pendingPhoto?.dataUrl || "",
    imageName: pendingPhoto?.name || ""
  });

  if (!saveState()) {
    state.notes.shift();
    els.saveStatus.textContent = "保存失败，照片太大";
    return;
  }

  localStorage.removeItem(DRAFT_KEY);
  els.noteInput.value = "";
  clearPendingPhoto();
  els.saveStatus.textContent = "已保存";
  renderNotes();
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
      resolve(canvas.toDataURL("image/jpeg", 0.82));
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

  todos.forEach((todo, index) => {
    const item = document.createElement("article");
    item.className = `todo-item${todo.done ? " done" : ""}`;
    item.style.setProperty("--todo-color", TODO_COLORS[index % TODO_COLORS.length]);

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

      const previousState = state;
      state = normalizeState(nextState);
      if (!saveState()) {
        state = previousState;
        els.backupStatus.textContent = "导入失败，空间不够";
        return;
      }
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
  els.addPhotoButton.addEventListener("click", () => els.photoInput.click());
  els.photoInput.addEventListener("change", handlePhotoInput);
  els.removePhotoButton.addEventListener("click", clearPendingPhoto);
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
