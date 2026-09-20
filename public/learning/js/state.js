/* ============================================================
   js/state.js — PROGRESS STATE + LOCALSTORAGE PERSISTENCE
   ------------------------------------------------------------
   เก็บ state ทั้งหมดไว้ที่เดียว ทุก engine อ่าน/เขียนผ่านที่นี่
   ภายหลังเปลี่ยน save()/load() ไปใช้ API จริงได้โดยไม่แตะส่วนอื่น
   ============================================================ */
const Store = (() => {
  const userId = () => {
    try { return JSON.parse(localStorage.getItem('englishAuthUser') || '{}').id || 'guest'; }
    catch (e) { return 'guest'; }
  };
  const storageKey = () => `englishLearningProgress:${userId()}`;
  const VERSION = 1;

  const todayKey = (d = new Date()) =>
    `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;

  function blank() {
    return {
      version: VERSION,
      user: { name: '' },
      /* --- XP / goal --- */
      totalXP: 0,
      dailyGoal: 20,
      xpByDay: {},                 // { '2026-09-20': 40 }
      /* --- streak --- */
      streak: 0,
      longestStreak: 0,
      learningDays: [],            // ['2026-09-20', ...]
      lastActiveDay: null,
      /* --- progress --- */
      chapters: {},                // { vocab_01: { steps:{vocab:true,...}, examScore:82, complete:true } }
      words: {},                   // spaced repetition per word
      grammarQuiz: {},             // { 1: {best: 3, done:true} }
      reading: {},                 // { reading_01A: {score:4, done:true} }
      sentences: {},               // { taskId: {answer, at} }
      sentenceCount: 0,
      achievements: [],            // unlocked ids
      examIntegrityLog: []         // [{chapter, tabSwitches, fullscreen, at}]
    };
  }

  let state = blank();

  function load() {
    try {
      const raw = localStorage.getItem(storageKey());
      if (raw) {
        const parsed = JSON.parse(raw);
        if (parsed && parsed.version === VERSION) state = Object.assign(blank(), parsed);
      }
    } catch (e) { /* corrupt storage -> เริ่มใหม่แบบเงียบ ๆ */ }
    return state;
  }

  function save() {
    try { localStorage.setItem(storageKey(), JSON.stringify(state)); } catch (e) {}
  }

  function reset() { state = blank(); save(); }

  const get = () => state;

  /* ---------- XP ---------- */
  function addXP(amount) {
    const t = todayKey();
    state.totalXP += amount;
    state.xpByDay[t] = (state.xpByDay[t] || 0) + amount;
    markLearningDay();
    save();
    return state.totalXP;
  }
  const xpToday = () => state.xpByDay[todayKey()] || 0;
  const dailyGoalMet = () => xpToday() >= state.dailyGoal;

  function xpThisWeek() {
    return weekDays().reduce((sum, d) => sum + (state.xpByDay[d.key] || 0), 0);
  }

  /* ---------- streak ---------- */
  function markLearningDay() {
    const t = todayKey();
    if (state.learningDays.includes(t)) return false;
    const y = new Date(); y.setDate(y.getDate() - 1);
    state.streak = state.lastActiveDay === todayKey(y) ? state.streak + 1 : 1;
    state.longestStreak = Math.max(state.longestStreak, state.streak);
    state.learningDays.push(t);
    state.lastActiveDay = t;
    save();
    return true;                   // true = streak เพิ่งเพิ่ม (ใช้โชว์ celebration)
  }

  /* สัปดาห์ปัจจุบัน เริ่มวันจันทร์ */
  function weekDays() {
    const now = new Date();
    const dow = (now.getDay() + 6) % 7;      // 0 = Monday
    const mon = new Date(now); mon.setDate(now.getDate() - dow);
    const names = ['Mon','Tue','Wed','Thu','Fri','Sat','Sun'];
    return names.map((n, i) => {
      const d = new Date(mon); d.setDate(mon.getDate() + i);
      return { label: n, key: todayKey(d), date: d, isFuture: d > now && todayKey(d) !== todayKey() };
    });
  }
  const weeklyCompleted = () => weekDays().filter(d => state.learningDays.includes(d.key)).length;

  /* ---------- chapters ---------- */
  function chapter(id) {
    if (!state.chapters[id]) state.chapters[id] = { steps: {}, examScore: 0, complete: false };
    return state.chapters[id];
  }
  function completeStep(chapterId, stepKey) {
    const c = chapter(chapterId);
    const isNew = !c.steps[stepKey];
    c.steps[stepKey] = true;
    save();
    return isNew;
  }
  const stepDone = (chapterId, stepKey) => !!chapter(chapterId).steps[stepKey];

  /* บทถัดไปปลดล็อกเมื่อบทก่อนหน้า complete แล้วเท่านั้น */
  function chapterStatus(chapterId) {
    const idx = courseChapters.findIndex(c => c.id === chapterId);
    const c = chapter(chapterId);
    if (c.complete) return c.examScore >= 95 ? 'mastered' : 'completed';
    if (idx === 0) return Object.keys(c.steps).length ? 'current' : 'current';
    const prev = state.chapters[courseChapters[idx - 1].id];
    if (!prev || !prev.complete) return 'locked';
    return Object.keys(c.steps).length ? 'current' : 'available';
  }

  /* ขั้นถัดไปที่ควรทำในบทนั้น */
  function nextStep(chapterId) {
    const c = chapter(chapterId);
    return CHAPTER_STEPS.find(s => !c.steps[s.key]) || null;
  }
  /* ขั้นที่ล็อกอยู่: ต้องทำเรียงลำดับ */
  function stepUnlocked(chapterId, stepKey) {
    const c = chapter(chapterId);
    const i = CHAPTER_STEPS.findIndex(s => s.key === stepKey);
    if (i <= 0) return true;
    return !!c.steps[CHAPTER_STEPS[i - 1].key];
  }

  function currentChapter() {
    return courseChapters.find(c => {
      const st = chapterStatus(c.id);
      return st === 'current' || st === 'available';
    }) || courseChapters[courseChapters.length - 1];
  }

  /* ---------- summary (ใช้กับ achievements / stats) ---------- */
  function summary() {
    const words = Object.values(state.words);
    return {
      streak: state.streak,
      longestStreak: state.longestStreak,
      totalXP: state.totalXP,
      learningDays: state.learningDays.length,
      completedChapters: Object.values(state.chapters).filter(c => c.complete).length,
      wordsLearned: words.length,
      wordsMastered: words.filter(w => w.mastery >= 0.8 && w.attempts >= 3).length,
      grammarDone: Object.values(state.grammarQuiz).filter(g => g.done).length,
      readingDone: Object.values(state.reading).filter(r => r.done).length,
      sentencesDone: state.sentenceCount,
      examsPassed: Object.values(state.chapters).filter(c => c.examScore >= 80).length
    };
  }

  /* ---------- achievements ---------- */
  function checkAchievements() {
    const s = summary();
    const unlocked = [];
    achievements.forEach(a => {
      if (!state.achievements.includes(a.id) && a.check(s)) {
        state.achievements.push(a.id);
        unlocked.push(a);
      }
    });
    if (unlocked.length) save();
    return unlocked;
  }

  return {
    load, save, reset, get, todayKey,
    addXP, xpToday, dailyGoalMet, xpThisWeek,
    markLearningDay, weekDays, weeklyCompleted,
    chapter, completeStep, stepDone, chapterStatus, nextStep, stepUnlocked, currentChapter,
    summary, checkAchievements
  };
})();
