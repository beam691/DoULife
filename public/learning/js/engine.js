/* ============================================================
   js/engine.js — LEARNING ENGINES
   ------------------------------------------------------------
   SRS      : spaced repetition + mastery ต่อคำ
   QuizGen  : สร้างคำถามจากข้อมูลคอร์สจริงเท่านั้น
   Hearts   : ระบบหัวใจ
   Exam     : สร้างข้อสอบ + ตัดเกรด 80%
   Integrity: สัญญาณจากเบราว์เซอร์เท่านั้น
   ============================================================ */

/* ---------- helpers ---------- */
const shuffle = arr => {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; }
  return a;
};
const sample = (arr, n) => shuffle(arr).slice(0, n);
const wordsOf = chapterId => (vocabularyChapters.find(c => c.id === chapterId) || { words: [] }).words;
const allWords = () => vocabularyChapters.flatMap(c => c.words.map(w => ({ ...w, chapterId: c.id })));

/* ============================================================
   SRS — Spaced Repetition
   ============================================================ */
const SRS = (() => {
  const DAY = 86400000;
  const INTERVALS = [0, 1, 2, 4, 7, 14, 30];   // วัน ตามระดับความจำ

  function rec(wordId, en) {
    const s = Store.get();
    if (!s.words[wordId]) {
      s.words[wordId] = {
        wordId, en, attempts: 0, correct: 0, incorrect: 0,
        mastery: 0, level: 0, lastSeen: 0, nextReview: 0, difficulty: 'new'
      };
    }
    return s.words[wordId];
  }

  function grade(wordId, en, isCorrect) {
    const r = rec(wordId, en);
    r.attempts++;
    if (isCorrect) { r.correct++; r.level = Math.min(r.level + 1, INTERVALS.length - 1); }
    else           { r.incorrect++; r.level = Math.max(0, r.level - 2); }
    r.mastery = r.attempts ? +(r.correct / r.attempts).toFixed(2) : 0;
    r.lastSeen = Date.now();
    r.nextReview = Date.now() + INTERVALS[r.level] * DAY;
    r.difficulty = r.mastery >= 0.8 ? 'easy' : r.mastery >= 0.5 ? 'medium' : 'hard';
    Store.save();
    return r;
  }

  /* น้ำหนักสำหรับสุ่มคำถาม: ผิดบ่อย/ถึงกำหนดทบทวน = โอกาสออกมากขึ้น */
  function weight(wordId) {
    const r = Store.get().words[wordId];
    if (!r) return 3;                              // ยังไม่เคยเจอ
    let w = 1 + (1 - r.mastery) * 4;               // ยิ่ง mastery ต่ำ ยิ่งหนัก
    if (r.nextReview && Date.now() >= r.nextReview) w += 2;   // ถึงกำหนดทบทวน
    if (r.incorrect > r.correct) w += 2;
    return w;
  }

  /* เลือกคำตามน้ำหนัก (adaptive) โดยไม่ซ้ำ */
  function pick(words, n) {
    const pool = words.slice();
    const out = [];
    while (out.length < Math.min(n, words.length) && pool.length) {
      const weights = pool.map(w => weight(w.id));
      let roll = Math.random() * weights.reduce((a, b) => a + b, 0);
      let idx = 0;
      while (roll > weights[idx] && idx < pool.length - 1) { roll -= weights[idx]; idx++; }
      out.push(pool.splice(idx, 1)[0]);
    }
    return out;
  }

  /* คำที่ควรทบทวน — เรียงจากแย่สุด */
  function weakWords(limit = 12) {
    return Object.values(Store.get().words)
      .filter(r => r.attempts >= 2 && r.mastery < 0.7)
      .sort((a, b) => a.mastery - b.mastery || b.incorrect - a.incorrect)
      .slice(0, limit);
  }

  /* คำที่ถึงกำหนดกลับมาทบทวน (คำที่ mastered แล้วก็กลับมาได้) */
  function dueWords(limit = 20) {
    const now = Date.now();
    return Object.values(Store.get().words)
      .filter(r => r.nextReview && now >= r.nextReview)
      .sort((a, b) => a.nextReview - b.nextReview)
      .slice(0, limit);
  }

  return { rec, grade, weight, pick, weakWords, dueWords };
})();

/* ============================================================
   QuizGen — สร้างคำถามจากคำศัพท์จริงเท่านั้น
   ============================================================ */
const QuizGen = (() => {
  /* ตัวลวง: ดึงจากบทเดียวกันก่อน ถ้าไม่พอจึงดึงจากบทที่เรียนผ่านแล้ว */
  function distractors(word, scope, field, n = 3) {
    let pool = scope.filter(w => w.en !== word.en && w[field] !== word[field]);
    if (pool.length < n) {
      const extra = allWords().filter(w => w.en !== word.en && !pool.some(p => p.en === w.en));
      pool = pool.concat(extra);
    }
    return sample(pool, n).map(w => w[field]);
  }

  /* ---- แบบคำถามต่าง ๆ ---- */
  function en2th(word, scope) {
    const opts = shuffle([word.th, ...distractors(word, scope, 'th')]);
    return { kind: 'choice', wordId: word.id, en: word.en,
      title: 'เลือกความหมายที่ถูกต้อง', prompt: word.en,
      choices: opts, answer: opts.indexOf(word.th),
      exp: `${word.en} = ${word.th}` };
  }
  function th2en(word, scope) {
    const opts = shuffle([word.en, ...distractors(word, scope, 'en')]);
    return { kind: 'choice', wordId: word.id, en: word.en,
      title: 'เลือกคำภาษาอังกฤษที่ถูกต้อง', prompt: word.th,
      choices: opts, answer: opts.indexOf(word.en),
      exp: `${word.th} = ${word.en}` };
  }
  function context(word, scope) {
    /* เจาะช่องว่างจากประโยคตัวอย่างของคำนั้นจริง ๆ */
    const re = new RegExp(word.en.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'i');
    if (!re.test(word.ex)) return en2th(word, scope);
    const blanked = word.ex.replace(re, '______');
    const opts = shuffle([word.en, ...distractors(word, scope, 'en')]);
    return { kind: 'choice', wordId: word.id, en: word.en,
      title: 'เติมคำลงในช่องว่าง', prompt: blanked,
      choices: opts, answer: opts.indexOf(word.en),
      exp: `${word.ex} (${word.en} = ${word.th})` };
  }
  function spell(word) {
    return { kind: 'type', wordId: word.id, en: word.en,
      title: 'พิมพ์คำภาษาอังกฤษให้ถูกต้อง', prompt: word.th,
      answer: word.en, exp: `${word.th} = ${word.en}` };
  }
  function match(words) {
    const pick4 = sample(words, Math.min(4, words.length));
    return { kind: 'match', title: 'จับคู่คำศัพท์กับความหมาย',
      pairs: pick4.map(w => ({ wordId: w.id, en: w.en, th: w.th })) };
  }

  const BUILDERS = { en2th, th2en, context, spell };

  /* สร้างชุดคำถามของ Review รอบหนึ่ง ๆ */
  function buildReview(chapterId, reviewKey, count = 8) {
    const scope = wordsOf(chapterId);
    const modes = REVIEW_MODES[reviewKey] || ['en2th'];
    const picked = SRS.pick(scope, Math.min(count, scope.length));
    const qs = [];
    if (modes.includes('match') && scope.length >= 4) qs.push(match(scope));
    picked.forEach((w, i) => {
      const m = modes.filter(x => x !== 'match')[i % modes.filter(x => x !== 'match').length] || 'en2th';
      qs.push(BUILDERS[m](w, scope));
    });
    return qs.slice(0, count);
  }

  /* ฝึกเฉพาะคำที่อ่อน */
  function buildWeakPractice(limit = 8) {
    const weak = SRS.weakWords(limit);
    const lookup = allWords();
    const scope = lookup;
    return weak.map((r, i) => {
      const w = lookup.find(x => x.id === r.wordId);
      if (!w) return null;
      const m = ['en2th', 'th2en', 'context'][i % 3];
      return BUILDERS[m](w, scope);
    }).filter(Boolean);
  }

  /* ฝึกคำเดียวแบบเจาะลึก */
  function buildSingleWord(wordId) {
    const w = allWords().find(x => x.id === wordId);
    if (!w) return [];
    const scope = wordsOf(w.chapterId);
    return [en2th(w, scope), context(w, scope), th2en(w, scope), spell(w)];
  }

  return { buildReview, buildWeakPractice, buildSingleWord, en2th, th2en, context, spell };
})();

/* ============================================================
   Hearts — ระบบหัวใจ (ไม่บล็อกการเรียน/ทบทวน)
   ============================================================ */
const Hearts = (() => {
  const MAX = 5;
  let n = MAX;          /* หัวใจของ "ยูนิตปัจจุบัน" เท่านั้น ไม่ใช่ pool รวมทั้งบท */
  return {
    MAX,
    /* เริ่มยูนิตใหม่ = ได้หัวใจครบ 5 ดวงเสมอ */
    start()  { n = MAX; return n; },
    get()    { return n; },
    lose()   { n = Math.max(0, n - 1); return n; },
    reward() { if (n < MAX) n++; return n; },
    empty()  { return n === 0; }
  };
})();

/* ============================================================
   ExamEngine — ข้อสอบประจำบท (ผ่าน 80%)
   ============================================================ */
const ExamEngine = (() => {
  const PASS = 80;

  /* ข้อสอบ = คำศัพท์ + ไวยากรณ์ของบท + คำถามจาก reading ของบท */
  function build(chapterId) {
    const ch = courseChapters.find(c => c.id === chapterId);
    const scope = wordsOf(chapterId);
    const vocabCount = Math.min(10, scope.length);
    const qs = [];

    /* 1) คำศัพท์ — สลับรูปแบบ */
    SRS.pick(scope, vocabCount).forEach((w, i) => {
      const m = ['en2th', 'th2en', 'context'][i % 3];
      const q = QuizGen[m](w, scope);
      qs.push({ ...q, section: 'vocabulary' });
    });

    /* 2) ไวยากรณ์ — จาก unit ของบท + unit เก่าที่เรียนผ่านแล้ว (recycling) */
    const gUnits = ch.recycledGrammar.map(id => grammarUnits.find(g => g.id === id)).filter(Boolean);
    const gPool = gUnits.flatMap(g => g.quiz.map(q => ({ ...q, unit: g.title })));
    sample(gPool, Math.min(3, gPool.length)).forEach(q => {
      qs.push({ kind: 'choice', section: 'grammar', title: `Grammar · ${q.unit}`,
        prompt: q.q, choices: q.choices, answer: q.a, exp: q.exp });
    });

    /* 3) การอ่าน — คำถามจาก reading unit ของบทนี้ */
    [ch.readingA, ch.readingB].forEach(rid => {
      const ru = readingUnits.find(r => r.id === rid);
      if (!ru) return;
      const i = Math.floor(Math.random() * ru.questions.length);
      const q = ru.questions[i];
      qs.push({ kind: 'choice', section: 'reading', title: `Reading · ${ru.grammarFocus}`,
        prompt: q.q, choices: q.choices, answer: ru.answerKey[i], exp: q.exp });
    });

    return shuffle(qs);
  }

  function score(results) {
    const total = results.length;
    const correct = results.filter(r => r.correct).length;
    const pct = total ? Math.round((correct / total) * 100) : 0;
    const bySection = {};
    results.forEach(r => {
      const s = r.section || 'vocabulary';
      bySection[s] = bySection[s] || { correct: 0, total: 0 };
      bySection[s].total++;
      if (r.correct) bySection[s].correct++;
    });
    return { total, correct, incorrect: total - correct, pct, passed: pct >= PASS, bySection, PASS };
  }

  return { build, score, PASS };
})();

/* ============================================================
   ExamIntegrity — ใช้เฉพาะสัญญาณที่เบราว์เซอร์รองรับจริง
   หมายเหตุ: เว็บแอปทั่วไปตรวจ screenshot ของระบบปฏิบัติการ
   หรืออุปกรณ์เครื่องอื่นไม่ได้ จึงไม่อ้างว่าป้องกันการทุจริตได้ทั้งหมด
   ============================================================ */
const ExamIntegrity = (() => {
  let data = null, onWarn = null, bound = false;

  const onVis  = () => { if (document.hidden) bump(); };
  const onBlur = () => bump();
  const onFs   = () => { if (document.fullscreenElement) data.fullscreenUsed = true; };

  function bump() {
    if (!data) return;
    data.tabSwitches++;
    data.warnings++;
    if (onWarn) onWarn(data);
  }

  function start(warnCb) {
    data = { tabSwitches: 0, warnings: 0, fullscreenUsed: !!document.fullscreenElement };
    onWarn = warnCb;
    if (!bound) {
      document.addEventListener('visibilitychange', onVis);
      window.addEventListener('blur', onBlur);
      document.addEventListener('fullscreenchange', onFs);
      bound = true;
    }
    return data;
  }
  function stop() {
    if (bound) {
      document.removeEventListener('visibilitychange', onVis);
      window.removeEventListener('blur', onBlur);
      document.removeEventListener('fullscreenchange', onFs);
      bound = false;
    }
    const out = data; data = null; onWarn = null;
    return out || { tabSwitches: 0, warnings: 0, fullscreenUsed: false };
  }
  const current = () => data || { tabSwitches: 0, warnings: 0, fullscreenUsed: false };

  return { start, stop, current };
})();
