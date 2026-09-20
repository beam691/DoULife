/* ============================================================
   js/app.js — APP CONTROLLER (navigation + activity launchers)
   ------------------------------------------------------------
   ประกอบ engine + data เป็นกิจกรรมแต่ละแบบ แล้วส่งให้ Lesson เล่น
   ทุกปุ่มบนหน้าจอเรียกผ่านที่นี่ ไม่มีปุ่มที่กดแล้วไม่ทำงาน
   ============================================================ */
const App = (() => {
  const chOf = id => courseChapters.find(c => c.id === id);

  /* ---------- 1. Vocabulary ---------- */
  function startVocab(chapterId) {
    const words = (vocabularyChapters.find(c => c.id === chapterId) || {}).words || [];
    /* แบ่งเป็น chunk ไม่เกิน 10 คำต่อรอบ และเริ่มจากคำที่ยังไม่รู้ */
    const seen = Store.get().words;
    const fresh = words.filter(w => !seen[w.id]);
    const chunk = (fresh.length ? fresh : words).slice(0, 10);
    const steps = chunk.map((w, i) => ({ kind: 'card', word: w, index: i + 1, total: chunk.length }));
    Lesson.open({
      type: 'vocab', chapterId, stepKey: 'vocab',
      title: `Vocabulary · ${chOf(chapterId).title}`,
      steps, xpPerStep: 5, heartsOn: false,
      doneTitle: 'Vocabulary complete!',
      onComplete: () => {
        /* ปิด step vocab เมื่อเห็นคำครบทั้งบทแล้วเท่านั้น */
        const all = words.every(w => Store.get().words[w.id]);
        if (!all) Store.chapter(chapterId).steps.vocab = false, Store.save();
      }
    });
  }

  /* ---------- 2. Review 1–5 ---------- */
  function startReview(chapterId, reviewKey) {
    const steps = QuizGen.buildReview(chapterId, reviewKey, 8);
    if (!steps.length) return Toast.show('บทนี้ยังไม่มีคำศัพท์ให้ทบทวน');
    const n = reviewKey.replace('review', '');
    Lesson.open({
      type: 'review', chapterId, stepKey: reviewKey,
      title: `Review ${n} · ${chOf(chapterId).title}`,
      steps, xpPerStep: 10, heartsOn: true,
      doneTitle: `Review ${n} complete!`
    });
  }

  /* ---------- 3. Sentence Practice (+ grammar teaching) ---------- */
  function startSentence(chapterId) {
    const ch = chOf(chapterId);
    const unit = grammarUnits.find(g => g.id === ch.grammarUnitId);
    const tasks = buildSentenceTasks(chapterId);
    const steps = [
      { kind: 'teach', unit },
      ...unit.quiz.map(q => ({ kind: 'choice', section: 'grammar',
        title: `Grammar · ${unit.title}`, prompt: q.q, choices: q.choices, answer: q.a, exp: q.exp })),
      ...tasks.map(t => ({ kind: 'sentence', task: t }))
    ];
    Lesson.open({
      type: 'sentence', chapterId, stepKey: 'sentence',
      title: `Sentence Practice · ${unit.title}`,
      steps, xpPerStep: 15, heartsOn: true,
      doneTitle: 'Sentence practice complete!',
      onComplete: () => {
        const s = Store.get();
        s.grammarQuiz[unit.id] = { done: true, at: Date.now() };
        Store.save();
      }
    });
  }

  /* ---------- 4. Reading A / B ---------- */
  function startReading(chapterId, which) {
    const ch = chOf(chapterId);
    const unitId = which === 'reading1' ? ch.readingA : ch.readingB;
    const ru = readingUnits.find(r => r.id === unitId);
    const steps = [
      { kind: 'passage', passage: ru.passage, focus: ru.grammarFocus, unitTitle: ru.title },
      ...ru.questions.map((q, i) => ({
        kind: 'choice', section: q.type === 'comprehension' ? 'comprehension' : 'grammar',
        title: q.type === 'comprehension' ? 'Comprehension' : `Grammar · ${ru.grammarFocus}`,
        prompt: q.q, choices: q.choices, answer: ru.answerKey[i], exp: q.exp
      }))
    ];
    Lesson.open({
      type: 'reading', chapterId, stepKey: which,
      title: ru.title, steps, xpPerStep: 20, heartsOn: true,
      doneTitle: 'Reading complete!',
      onComplete: ({ correct, total }) => {
        const s = Store.get();
        s.reading[ru.id] = { done: true, score: correct, total, at: Date.now() };
        Store.save();
      }
    });
  }

  /* ---------- 5. Chapter Exam ---------- */
  function startExam(chapterId) {
    const ch = chOf(chapterId);
    ExamModal.open(ch, () => {
      const qs = ExamEngine.build(chapterId);
      ExamIntegrity.start(d => Toast.show(`⚠️ กรุณาอยู่ในหน้าสอบจนกว่าจะทำเสร็จ (บันทึกแล้ว ${d.tabSwitches} ครั้ง)`));
      Lesson.open({
        type: 'exam', chapterId, stepKey: 'exam',
        title: `Exam · ${ch.title}`,
        steps: qs, xpPerStep: 50, heartsOn: true
      });
    });
  }

  /* ---------- 6. Weak-word practice (ไม่เสียหัวใจ + ได้หัวใจคืน) ---------- */
  function startWeakPractice() {
    const steps = QuizGen.buildWeakPractice(8);
    if (!steps.length) return Toast.show('ยังไม่มีคำที่ต้องทบทวน — เรียนเพิ่มอีกนิดนะ');
    Lesson.open({
      type: 'practice', title: 'ทบทวนคำที่ควรฝึก',
      steps, xpPerStep: 10, heartsOn: false,
      doneTitle: 'ทบทวนเสร็จแล้ว!'
    });
  }

  function startWordPractice(wordId) {
    const steps = QuizGen.buildSingleWord(wordId);
    if (!steps.length) return;
    Lesson.open({
      type: 'practice', title: 'ฝึกคำนี้',
      steps, xpPerStep: 5, heartsOn: false,
      doneTitle: 'ฝึกคำนี้เสร็จแล้ว!'
    });
  }

  /* ---------- 7. Due review (spaced repetition) ---------- */
  function startDueReview() {
    const due = SRS.dueWords(10);
    if (!due.length) return Toast.show('ยังไม่มีคำที่ถึงกำหนดทบทวนวันนี้');
    const lookup = vocabularyChapters.flatMap(c => c.words.map(w => ({ ...w, chapterId: c.id })));
    const steps = due.map((r, i) => {
      const w = lookup.find(x => x.id === r.wordId);
      if (!w) return null;
      const scope = (vocabularyChapters.find(c => c.id === w.chapterId) || {}).words || [];
      return [QuizGen.en2th, QuizGen.context, QuizGen.th2en][i % 3](w, scope);
    }).filter(Boolean);
    Lesson.open({
      type: 'practice', title: 'ทบทวนตามกำหนด',
      steps, xpPerStep: 10, heartsOn: false,
      doneTitle: 'ทบทวนตามกำหนดเสร็จแล้ว!'
    });
  }

  /* ---------- step dispatcher ---------- */
  function startStep(chapterId, stepKey) {
    if (Store.chapterStatus(chapterId) === 'locked')
      return Toast.show('🔒 ต้องเรียนบทก่อนหน้าให้จบก่อน');
    if (!Store.stepUnlocked(chapterId, stepKey)) {
      const i = CHAPTER_STEPS.findIndex(s => s.key === stepKey);
      return Toast.show(`🔒 ต้องทำ ${CHAPTER_STEPS[i - 1].label} ให้เสร็จก่อน`);
    }
    if (stepKey === 'vocab')            return startVocab(chapterId);
    if (stepKey.startsWith('review'))   return startReview(chapterId, stepKey);
    if (stepKey === 'sentence')         return startSentence(chapterId);
    if (stepKey === 'reading1' || stepKey === 'reading2') return startReading(chapterId, stepKey);
    if (stepKey === 'exam')             return startExam(chapterId);
  }

  /* ---------- continue = ขั้นถัดไปของบทปัจจุบัน ---------- */
  function continueLearning() {
    const ch = Store.currentChapter();
    const step = Store.nextStep(ch.id);
    if (!step) return Toast.show('เรียนครบทุกบทแล้ว เก่งมาก!');
    startStep(ch.id, step.key);
  }

  function refresh() {
    if (typeof Home !== 'undefined' && Home.render) Home.render();
    if (typeof Streak !== 'undefined' && Streak.render) Streak.render();
  }

  return {
    startStep, startVocab, startReview, startSentence, startReading, startExam,
    startWeakPractice, startWordPractice, startDueReview, continueLearning, refresh
  };
})();

/* ============================================================
   Toast — feedback สั้น ๆ
   ============================================================ */
const Toast = (() => {
  let node, timer;
  function show(msg) {
    if (!node) {
      node = document.createElement('div');
      node.className = 'toast';
      node.innerHTML = `<img class="mascot" src="${MASCOTS.mascotCheer}" alt=""><span></span>`;
      document.body.appendChild(node);
    }
    node.querySelector('span').textContent = msg;
    node.classList.add('show');
    clearTimeout(timer);
    timer = setTimeout(() => node.classList.remove('show'), 2600);
  }
  return { show };
})();

/* ============================================================
   ExamModal — หน้าจอชี้แจงก่อนเริ่มสอบ
   ============================================================ */
const ExamModal = (() => {
  function open(ch, onStart) {
    const wrap = document.createElement('div');
    wrap.className = 'modal-wrap';
    wrap.innerHTML = `
      <div class="modal" role="dialog" aria-modal="true" aria-label="เริ่มการสอบ">
        <img class="mascot modal-mascot" src="${MASCOTS.mascotBag}" alt="">
        <h2 class="modal-title">บททดสอบกำลังจะเริ่ม</h2>
        <p class="modal-sub">${ch.title}</p>
        <ul class="modal-rules">
          <li>ตอบอย่างรอบคอบ ทำได้ครั้งละหนึ่งข้อ</li>
          <li>อยู่ในหน้าสอบจนกว่าจะทำเสร็จ</li>
          <li>ระบบบันทึกการสลับแท็บ (ไม่ตัดสิทธิ์ทันที)</li>
          <li>เกณฑ์ผ่าน ${ExamEngine.PASS}%</li>
        </ul>
        <label class="modal-check">
          <input type="checkbox" id="fsChk"> เข้าสู่โหมดเต็มหน้าจอ
        </label>
        <div class="modal-actions">
          <button class="btn btn-ghost" id="mCancel">ยกเลิก</button>
          <button class="btn btn-primary" id="mStart">เริ่มสอบ</button>
        </div>
      </div>`;
    document.body.appendChild(wrap);
    const close = () => wrap.remove();
    wrap.querySelector('#mCancel').onclick = close;
    wrap.onclick = e => { if (e.target === wrap) close(); };
    wrap.querySelector('#mStart').onclick = async () => {
      if (wrap.querySelector('#fsChk').checked && document.documentElement.requestFullscreen) {
        try { await document.documentElement.requestFullscreen(); } catch (e) {}
      }
      close();
      onStart();
    };
  }
  return { open };
})();
