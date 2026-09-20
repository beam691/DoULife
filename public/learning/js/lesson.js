/* ============================================================
   js/lesson.js — LESSON PLAYER (overlay)
   ------------------------------------------------------------
   หน้าจอบทเรียนแบบเต็มจอ ใช้ร่วมกันทุกกิจกรรม:
     vocab | review | sentence | grammar | reading | exam | practice
   แยก UI ออกจาก engine: ตัวเล่นรู้แค่ "รายการ step" ที่ได้รับมา
   ============================================================ */
const Lesson = (() => {
  let root, session = null;

  /* ---------- utilities ---------- */
  const $  = (s, r = document) => r.querySelector(s);
  const el = (t, c, h) => { const n = document.createElement(t); if (c) n.className = c; if (h != null) n.innerHTML = h; return n; };
  const esc = s => String(s).replace(/[&<>"]/g, m => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[m]));
  const norm = s => String(s).trim().toLowerCase().replace(/\s+/g, ' ').replace(/[.,!?;]$/, '');

  function ensureRoot() {
    if (root) return root;
    root = el('div', 'lesson-root');
    root.setAttribute('role', 'dialog');
    root.setAttribute('aria-modal', 'true');
    document.body.appendChild(root);
    return root;
  }

  /* ---------- open / close ---------- */
  function open(cfg) {
    /* cfg: { type, chapterId, title, steps[], xpPerStep, onFinish } */
    session = Object.assign({
      i: 0, correct: 0, wrong: 0, xp: 0, results: [], answered: false,
      heartsOn: true, integrity: null
    }, cfg);
    ensureRoot();
    if (session.heartsOn) Hearts.start();   /* หัวใจ 5 ดวงต่อ 1 ยูนิต เริ่มใหม่ทุกครั้ง */
    document.body.classList.add('lesson-open');
    render();
  }

  function close(skipConfirm) {
    if (session && session.type === 'exam' && !skipConfirm) {
      if (!confirm('ออกจากการสอบตอนนี้ คะแนนจะไม่ถูกบันทึก ต้องการออกหรือไม่?')) return;
      ExamIntegrity.stop();
    }
    document.body.classList.remove('lesson-open');
    if (root) root.innerHTML = '';
    session = null;
    App.refresh();
  }

  /* ---------- top bar ---------- */
  function topBar() {
    const total = session.steps.length;
    const pct = Math.round((session.i / total) * 100);
    const hearts = session.heartsOn
      ? `<div class="l-hearts" aria-label="เหลือ ${Hearts.get()} หัวใจ">${
          Array.from({ length: 5 }, (_, k) => `<span class="heart ${k < Hearts.get() ? '' : 'off'}">♥</span>`).join('')
        }</div>` : '';
    return `
      <div class="l-top">
        <button class="l-back" id="lBack" aria-label="ออกจากบทเรียน">←</button>
        <div class="l-bar"><div class="l-bar-fill" style="width:${pct}%"></div></div>
        ${hearts}
      </div>
      <div class="l-meta">
        <span class="l-title">${esc(session.title)}</span>
        <span class="l-count">${Math.min(session.i + 1, total)} / ${total}</span>
      </div>`;
  }

  /* ---------- render current step ---------- */
  function render() {
    if (!session) return;
    if (session.i >= session.steps.length) return finish();
    const step = session.steps[session.i];
    session.answered = false;

    root.innerHTML = `
      <div class="l-shell">
        ${topBar()}
        <div class="l-body" id="lBody"></div>
        <div class="l-foot" id="lFoot"></div>
      </div>`;
    $('#lBack').onclick = () => close();

    const body = $('#lBody');
    const foot = $('#lFoot');
    body.classList.add('l-enter');

    switch (step.kind) {
      case 'card':    renderCard(step, body, foot); break;
      case 'choice':  renderChoice(step, body, foot); break;
      case 'type':    renderType(step, body, foot); break;
      case 'match':   renderMatch(step, body, foot); break;
      case 'passage': renderPassage(step, body, foot); break;
      case 'teach':   renderTeach(step, body, foot); break;
      case 'sentence':renderSentence(step, body, foot); break;
      default:        next();
    }
  }

  const nextBtn = (foot, label, fn, disabled) => {
    foot.innerHTML = `<button class="btn btn-primary" id="lNext" ${disabled ? 'disabled' : ''}>${label}</button>`;
    $('#lNext', foot).onclick = fn;
    return $('#lNext', foot);
  };

  /* ---------- 1. Vocabulary card ---------- */
  function renderCard(step, body, foot) {
    body.innerHTML = `
      <div class="v-card">
        <div class="v-index">Word ${step.index} / ${step.total}</div>
        <div class="v-en">${esc(step.word.en)}</div>
        <button class="v-audio" id="vAudio" aria-label="ฟังเสียงคำศัพท์">🔊 <span>Listen</span></button>
        <div class="v-th">${esc(step.word.th)}</div>
        <div class="v-ex">
          <span class="v-ex-lbl">Example</span>
          <p>${esc(step.word.ex)}</p>
        </div>
      </div>
      <img class="mascot v-mascot" src="${MASCOTS.mascotStudy}" alt="">`;

    /* ปุ่มเสียง: ใช้ Web Speech API ที่มีในเบราว์เซอร์ ไม่ต้องพึ่ง service ภายนอก */
    $('#vAudio', body).onclick = () => speak(step.word.en);

    foot.innerHTML = `
      <div class="v-actions">
        <button class="btn btn-ghost" id="vPractice">Need practice</button>
        <button class="btn btn-primary" id="vKnow">I know this</button>
      </div>`;
    $('#vPractice', foot).onclick = () => { SRS.grade(step.word.id, step.word.en, false); next(); };
    $('#vKnow', foot).onclick     = () => { SRS.grade(step.word.id, step.word.en, true);  next(); };
  }

  function speak(text) {
    try {
      if (!('speechSynthesis' in window)) return;
      window.speechSynthesis.cancel();
      const u = new SpeechSynthesisUtterance(text);
      u.lang = 'en-US'; u.rate = 0.85;
      window.speechSynthesis.speak(u);
    } catch (e) {}
  }

  /* ---------- 2. Multiple choice ---------- */
  function renderChoice(step, body, foot) {
    body.innerHTML = `
      <div class="q-head">${esc(step.title || 'เลือกคำตอบที่ถูกต้อง')}</div>
      <div class="q-prompt">${esc(step.prompt)}</div>
      <div class="q-choices" role="group">
        ${step.choices.map((c, i) =>
          `<button class="q-choice" data-i="${i}">${esc(c)}</button>`).join('')}
      </div>`;
    nextBtn(foot, 'Check', () => {}, true);

    let picked = null;
    body.querySelectorAll('.q-choice').forEach(b => {
      b.onclick = () => {
        if (session.answered) return;
        body.querySelectorAll('.q-choice').forEach(x => x.classList.remove('sel'));
        b.classList.add('sel');
        picked = +b.dataset.i;
        const n = $('#lNext', foot); n.disabled = false;
        n.onclick = () => grade();
      };
    });

    function grade() {
      if (session.answered) return;
      session.answered = true;
      const ok = picked === step.answer;
      body.querySelectorAll('.q-choice').forEach((x, i) => {
        x.disabled = true;
        if (i === step.answer) x.classList.add('right');
        else if (i === picked) x.classList.add('wrong');
      });
      record(step, ok);
      feedback(ok, ok ? '' : `เฉลย: ${esc(step.choices[step.answer])}`, step.exp, foot);
    }
  }

  /* ---------- 3. Type the answer ---------- */
  function renderType(step, body, foot) {
    body.innerHTML = `
      <div class="q-head">${esc(step.title)}</div>
      <div class="q-prompt">${esc(step.prompt)}</div>
      <label class="sr-only" for="tIn">พิมพ์คำตอบภาษาอังกฤษ</label>
      <input class="q-input" id="tIn" type="text" autocomplete="off" autocapitalize="off"
             spellcheck="false" placeholder="พิมพ์คำภาษาอังกฤษ…">`;
    const input = $('#tIn', body);
    const btn = nextBtn(foot, 'Check', () => grade(), true);
    input.oninput = () => { btn.disabled = !input.value.trim(); };
    input.onkeydown = e => { if (e.key === 'Enter' && input.value.trim()) grade(); };
    setTimeout(() => input.focus(), 60);

    function grade() {
      if (session.answered) return;
      session.answered = true;
      const ok = norm(input.value) === norm(step.answer);
      input.disabled = true;
      input.classList.add(ok ? 'right' : 'wrong');
      record(step, ok);
      feedback(ok, ok ? '' : `เฉลย: ${esc(step.answer)}`, step.exp, foot);
    }
  }

  /* ---------- 4. Matching ---------- */
  function renderMatch(step, body, foot) {
    const left  = shuffle(step.pairs);
    const right = shuffle(step.pairs);
    body.innerHTML = `
      <div class="q-head">${esc(step.title)}</div>
      <div class="m-grid">
        <div class="m-col">${left.map(p => `<button class="m-item" data-side="l" data-id="${p.wordId}">${esc(p.en)}</button>`).join('')}</div>
        <div class="m-col">${right.map(p => `<button class="m-item" data-side="r" data-id="${p.wordId}">${esc(p.th)}</button>`).join('')}</div>
      </div>`;
    nextBtn(foot, 'Continue', () => {}, true);

    let sel = null, done = 0, missed = 0;
    body.querySelectorAll('.m-item').forEach(b => {
      b.onclick = () => {
        if (b.classList.contains('ok')) return;
        if (!sel) { sel = b; b.classList.add('sel'); return; }
        if (sel === b) { sel.classList.remove('sel'); sel = null; return; }
        if (sel.dataset.side === b.dataset.side) { sel.classList.remove('sel'); sel = b; b.classList.add('sel'); return; }
        const pair = step.pairs.find(p => p.wordId === b.dataset.id);
        if (sel.dataset.id === b.dataset.id) {
          sel.classList.remove('sel'); sel.classList.add('ok'); b.classList.add('ok');
          SRS.grade(pair.wordId, pair.en, true);
          done++; sel = null;
          if (done === step.pairs.length) {
            session.correct++;
            session.results.push({ correct: missed === 0, section: step.section });
            const n = $('#lNext', foot); n.disabled = false;
            n.onclick = () => next();
            feedback(true, '', 'จับคู่ครบทุกคำแล้ว', foot);
          }
        } else {
          missed++;
          b.classList.add('shake'); sel.classList.remove('sel');
          const wrongPair = step.pairs.find(p => p.wordId === sel.dataset.id);
          if (wrongPair) SRS.grade(wrongPair.wordId, wrongPair.en, false);
          if (session.heartsOn) Hearts.lose();
          setTimeout(() => b.classList.remove('shake'), 400);
          sel = null;
          updateHearts();
          if (heartsRanOut()) return showHeartsEmpty();
        }
      };
    });
  }

  /* ---------- 5. Reading passage ---------- */
  function renderPassage(step, body, foot) {
    body.innerHTML = `
      <div class="r-head">
        <span class="r-tag">Reading</span>
        <span class="r-focus">${esc(step.focus)}</span>
      </div>
      <h2 class="r-title">${esc(step.unitTitle)}</h2>
      <div class="r-passage">${step.passage.replace(/___\((\d)\)/g, '<mark class="r-blank">___($1)</mark>')}</div>
      <p class="r-note">อ่านให้เข้าใจก่อน แล้วกด Start questions</p>`;
    nextBtn(foot, 'Start questions', () => next());
  }

  /* ---------- 6. Grammar teaching card ---------- */
  function renderTeach(step, body, foot) {
    const g = step.unit;
    body.innerHTML = `
      <div class="t-card">
        <div class="t-eyebrow">Grammar · Unit ${g.id}</div>
        <h2 class="t-title">${esc(g.title)}</h2>
        <p class="t-thai">${esc(g.thaiTitle)}</p>
        <p class="t-exp">${esc(g.explanation)}</p>
        <div class="t-block">
          <span class="t-lbl">Structures</span>
          <ul>${g.structures.map(s => `<li><code>${esc(s)}</code></li>`).join('')}</ul>
        </div>
        <div class="t-block">
          <span class="t-lbl">Examples</span>
          <ul>${g.examples.map(s => `<li>${esc(s)}</li>`).join('')}</ul>
        </div>
        <div class="t-block">
          <span class="t-lbl">Keywords</span>
          <div class="t-chips">${g.keywords.map(k => `<span class="t-chip">${esc(k)}</span>`).join('')}</div>
        </div>
        ${g.commonMistakes.map(m => `
          <div class="t-mistake">
            <div class="t-wrong">✗ ${esc(m.wrong)}</div>
            <div class="t-right">✓ ${esc(m.right)}</div>
            <p>${esc(m.why)}</p>
          </div>`).join('')}
      </div>`;
    nextBtn(foot, 'Continue', () => next());
  }

  /* ---------- 7. Sentence practice ---------- */
  function renderSentence(step, body, foot) {
    const t = step.task;
    body.innerHTML = `
      <div class="s-head">
        <span class="s-tag">Sentence Practice</span>
        <span class="s-skill">${esc(t.targetSkill)}</span>
      </div>
      <div class="s-word">
        <span class="s-word-en">${esc(t.vocabulary)}</span>
        <span class="s-word-th">${esc(t.vocabularyTh)}</span>
      </div>
      <p class="s-prompt">${esc(t.prompt)}</p>
      <p class="s-hint">💡 ${esc(t.hint)}</p>
      <label class="sr-only" for="sIn">เขียนประโยคภาษาอังกฤษ</label>
      <textarea class="s-input" id="sIn" rows="3" placeholder="เขียนประโยคของคุณที่นี่…"></textarea>`;
    const input = $('#sIn', body);
    const btn = nextBtn(foot, 'Submit', () => grade(), true);
    input.oninput = () => { btn.disabled = input.value.trim().length < 3; };
    setTimeout(() => input.focus(), 60);

    function grade() {
      if (session.answered) return;
      session.answered = true;
      const ans = input.value.trim();
      const fb = checkSentence(ans, t);
      input.disabled = true;

      body.insertAdjacentHTML('beforeend', `
        <div class="s-result">
          <div class="s-block">
            <span class="s-lbl">Your sentence</span>
            <p class="s-your">${esc(ans)}</p>
          </div>
          <div class="s-block">
            <span class="s-lbl">Vocabulary usage</span>
            <p class="${fb.usedWord ? 'ok' : 'bad'}">${fb.usedWord ? '✓ ใช้คำศัพท์ที่กำหนดแล้ว' : `✗ ยังไม่พบคำว่า "${esc(t.vocabulary)}" ในประโยค`}</p>
          </div>
          <div class="s-block">
            <span class="s-lbl">Grammar feedback</span>
            <ul class="s-notes">${fb.notes.map(n => `<li class="${n.ok ? 'ok' : 'bad'}">${n.ok ? '✓' : '✗'} ${esc(n.text)}</li>`).join('')}</ul>
          </div>
          <div class="s-block s-model">
            <span class="s-lbl">Model answer</span>
            <p>${esc(t.exampleAnswer)}</p>
          </div>
        </div>`);
      body.querySelector('.s-result').scrollIntoView({ behavior: 'smooth', block: 'nearest' });

      const s = Store.get();
      s.sentences[t.id] = { answer: ans, at: Date.now() };
      s.sentenceCount++;
      Store.save();

      session.correct++;
      session.results.push({ correct: true, section: 'sentence' });
      nextBtn(foot, session.i === session.steps.length - 1 ? 'Finish' : 'Continue', () => next());
    }
  }

  /* ตรวจประโยคแบบ rule-based (ไม่มี backend/AI) — ให้ feedback ที่เป็นประโยชน์จริง */
  function checkSentence(text, task) {
    const notes = [];
    const t = text.trim();
    const lower = t.toLowerCase();
    const usedWord = lower.includes(task.vocabulary.toLowerCase().split(' ')[0]);

    notes.push({ ok: /^[A-Z]/.test(t), text: /^[A-Z]/.test(t) ? 'ขึ้นต้นประโยคด้วยตัวพิมพ์ใหญ่แล้ว' : 'ประโยคภาษาอังกฤษควรขึ้นต้นด้วยตัวพิมพ์ใหญ่' });
    notes.push({ ok: /[.!?]$/.test(t), text: /[.!?]$/.test(t) ? 'จบประโยคด้วยเครื่องหมายวรรคตอนแล้ว' : 'ควรปิดท้ายประโยคด้วย . ! หรือ ?' });

    const words = t.split(/\s+/).filter(Boolean);
    notes.push({ ok: words.length >= 4, text: words.length >= 4 ? `ความยาว ${words.length} คำ กำลังดี` : 'ประโยคสั้นไป ลองขยายให้ได้อย่างน้อย 4 คำ' });

    const hasVerb = /\b(is|am|are|was|were|be|been|have|has|had|do|does|did|will|would|can|could|should|must|may|might|go|goes|went|make|makes|made|use|uses|used|learn|learns|learned|study|studies|studied|like|likes|liked|need|needs|want|wants|see|saw|think|thinks|feel|feels|get|gets|got|take|takes|took|give|gives|read|reads|write|writes|wrote|know|knows|knew|help|helps|come|comes|say|says|said|find|finds|found|work|works|worked|live|lives|lived|remember|remembers|build|builds|built)\b|\w+(ed|ing|s)\b/i.test(lower);
    notes.push({ ok: hasVerb, text: hasVerb ? 'พบคำกริยาในประโยค' : 'ยังไม่เห็นคำกริยาชัดเจน ประโยคต้องมีกริยาเสมอ' });

    /* ตรวจ grammar ตาม unit ของบท */
    const g = task.grammarUnit;
    if (g === 2)  notes.push({ ok: /\b(am|is|are)\s+\w+ing\b/i.test(lower), text: 'Present Continuous ต้องมี am/is/are + V-ing' });
    if (g === 3)  notes.push({ ok: /\b(ed|went|took|saw|made|had|was|were|got|came|said|wrote|read|learned)\b/i.test(lower), text: 'Past Simple ควรใช้กริยาช่อง 2' });
    if (g === 5)  notes.push({ ok: /\b(have|has)\s+\w+/i.test(lower), text: 'Present Perfect ต้องมี have/has + V3' });
    if (g === 6)  notes.push({ ok: /\bhad\s+\w+/i.test(lower), text: 'Past Perfect ต้องมี had + V3' });
    if (g === 7)  notes.push({ ok: /\b(will|going to|am|is|are)\b/i.test(lower), text: 'ประโยคอนาคตควรมี will หรือ be going to' });
    if (g === 8)  notes.push({ ok: /\b(is|am|are|was|were|been|be)\s+\w+(ed|en|t)\b/i.test(lower), text: 'Passive Voice ต้องมี verb to be + V3' });
    if (g === 9)  notes.push({ ok: /\bif\b/i.test(lower), text: 'ประโยคเงื่อนไขควรมี if' });
    if (g === 10) notes.push({ ok: /\b\w+ing\b|\bto\s+\w+/i.test(lower), text: 'ลองใช้ V-ing หรือ to + V1 ตามกริยาหลัก' });
    if (g === 11) notes.push({ ok: /\b(who|which|whose|that|whom)\b/i.test(lower), text: 'Relative Clause ควรมี who/which/whose/that' });
    if (g === 12) notes.push({ ok: /\b(said|told|explained|added)\b/i.test(lower), text: 'Reported Speech ควรมี said/told' });
    if (g === 13) notes.push({ ok: /\b(can|could|may|might|must|should|will|would)\b/i.test(lower), text: 'ควรมี modal verb เช่น can/should/must' });
    if (g === 14) notes.push({ ok: /\b(than|the most|the best|er\b)/i.test(lower), text: 'การเปรียบเทียบควรมี than หรือ the most' });
    if (g === 16) notes.push({ ok: /\b(in|on|at|to|for|with|by|about|of)\b/i.test(lower), text: 'ลองใส่คำบุพบทให้ถูกคู่' });
    if (g === 18) notes.push({ ok: /\b(because|although|however|therefore|since)\b/i.test(lower), text: 'ลองใช้คำเชื่อม เช่น because/although/therefore' });

    if (/\balthough\b[^.]*\bbut\b/i.test(lower))
      notes.push({ ok: false, text: 'ห้ามใช้ although กับ but พร้อมกันในประโยคเดียว' });
    if (/\b(doesn't|does not)\s+\w+s\b/i.test(lower))
      notes.push({ ok: false, text: 'หลัง does/doesn\'t ต้องใช้กริยาช่อง 1 (ไม่เติม s)' });
    if (/\bi\s/.test(t) && !/\bI\s/.test(t))
      notes.push({ ok: false, text: 'สรรพนาม I ต้องเป็นตัวพิมพ์ใหญ่เสมอ' });

    return { usedWord, notes };
  }

  /* ---------- feedback bar ---------- */
  function feedback(ok, answerLine, exp, foot) {
    updateHearts();
    const last = session.i === session.steps.length - 1;
    foot.innerHTML = `
      <div class="fb ${ok ? 'fb-ok' : 'fb-no'}">
        <div class="fb-row">
          <img class="mascot fb-mascot" src="${ok ? MASCOTS.mascotCheer : MASCOTS.mascotStudy}" alt="">
          <div>
            <div class="fb-title">${ok ? '✓ ถูกต้อง!' : '✗ ยังไม่ถูก'}</div>
            ${answerLine ? `<div class="fb-ans">${answerLine}</div>` : ''}
            ${exp ? `<div class="fb-exp">${esc(exp)}</div>` : ''}
          </div>
        </div>
        <button class="btn ${ok ? 'btn-primary' : 'btn-dark'}" id="lNext">${last ? 'Finish' : 'Continue'}</button>
      </div>`;
    $('#lNext', foot).onclick = () => next();
    $('#lNext', foot).focus();
  }

  function updateHearts() {
    const box = root && root.querySelector('.l-hearts');
    if (!box || !session.heartsOn) return;
    const h = Hearts.get();
    box.innerHTML = Array.from({ length: Hearts.MAX }, (_, k) => `<span class="heart ${k < h ? '' : 'off'}">♥</span>`).join('');
  }

  /* หัวใจหมด = จบยูนิตนี้ทันที (ยูนิตนี้ไม่ผ่าน) แต่ยังกลับไปเรียน/ทบทวนต่อได้ */
  function heartsRanOut() {
    return session && session.heartsOn && Hearts.empty();
  }

  /* ---------- record answer ---------- */
  function record(step, ok) {
    if (ok) session.correct++; else session.wrong++;
    session.results.push({ correct: ok, section: step.section || session.type, prompt: step.prompt, wordId: step.wordId });
    if (step.wordId) SRS.grade(step.wordId, step.en, ok);
    if (!ok && session.heartsOn && step.kind !== 'sentence') Hearts.lose();
    if (ok && session.type === 'practice') Hearts.reward();
  }

  function next() {
    if (heartsRanOut()) return showHeartsEmpty();
    session.i++;
    render();
  }

  /* ---------- hearts empty screen (จบยูนิต) ---------- */
  function showHeartsEmpty() {
    const answered = session.results.length;
    const correct  = session.results.filter(r => r.correct).length;
    const isExam   = session.type === 'exam';
    const chapterId = session.chapterId;
    const stepKey   = session.stepKey;

    /* ยูนิตนี้ไม่ถูกบันทึกว่าผ่าน — ต้องกลับมาทำใหม่ */
    if (isExam) ExamIntegrity.stop();

    root.innerHTML = `
      <div class="l-shell">
        <div class="done-wrap hearts-out">
          <img class="mascot done-mascot" src="${MASCOTS.mascotStudy}" alt="">
          <div class="ho-hearts">${Array.from({ length: Hearts.MAX }, () => '<span class="heart off">♥</span>').join('')}</div>
          <h2 class="done-title">หัวใจหมดแล้ว</h2>
          <p class="done-sub">${isExam
            ? 'ตอบผิดครบ 5 ครั้งในการสอบนี้ ยังไม่บันทึกคะแนน — ทบทวนก่อนแล้วค่อยสอบใหม่ได้'
            : 'ตอบผิดครบ 5 ครั้งในยูนิตนี้ ต้องทำยูนิตนี้ใหม่อีกครั้ง'}</p>
          <p class="ho-stat">ทำไปแล้ว ${answered} ข้อ · ถูก ${correct} ข้อ</p>
          <p class="ho-note">หัวใจนับแยกในแต่ละยูนิต เริ่มยูนิตใหม่จะได้ครบ 5 ดวงเสมอ</p>
          <div class="ex-actions">
            <button class="btn btn-primary" id="hoRetry">เริ่มยูนิตนี้ใหม่</button>
            <button class="btn btn-ghost" id="hoPractice">ทบทวนคำที่ผิด</button>
            <button class="btn btn-ghost" id="hoBack">กลับไปหน้าหลัก</button>
          </div>
        </div>
      </div>`;

    $('#hoRetry').onclick = () => {
      close(true);
      if (chapterId && stepKey) App.startStep(chapterId, stepKey);
    };
    $('#hoPractice').onclick = () => { close(true); App.startWeakPractice(); };
    $('#hoBack').onclick     = () => close(true);
  }

  /* ---------- finish ---------- */
  function finish() {
    const total = session.results.length || session.steps.length;
    const correct = session.results.filter(r => r.correct).length;
    const pct = total ? Math.round((correct / total) * 100) : 100;

    if (session.type === 'exam') return finishExam(correct, total, pct);

    const xp = session.xpPerStep || 10;
    Store.addXP(xp);
    if (session.chapterId && session.stepKey) Store.completeStep(session.chapterId, session.stepKey);
    if (session.onComplete) session.onComplete({ correct, total, pct });
    const unlocked = Store.checkAchievements();

    root.innerHTML = `
      <div class="l-shell">
        <div class="done-wrap">
          <img class="mascot done-mascot" src="${MASCOTS.mascotCheer}" alt="">
          <h2 class="done-title">${esc(session.doneTitle || 'Lesson complete!')}</h2>
          <p class="done-sub">${session.type === 'vocab'
            ? `เรียนคำศัพท์ ${session.steps.length} คำในรอบนี้`
            : `${correct} / ${total} ถูกต้อง · ${pct}%`}</p>
          <div class="done-xp">+${xp} XP</div>
          ${Store.dailyGoalMet() ? `<div class="done-goal">✓ Daily Goal Complete</div>` : ''}
          ${unlocked.map(a => `<div class="done-ach">${a.icon} ปลดล็อก: ${esc(a.title)}</div>`).join('')}
          <button class="btn btn-primary" id="doneBtn">Continue</button>
        </div>
      </div>`;
    $('#doneBtn').onclick = () => close(true);
  }

  function finishExam(correct, total, pct) {
    const res = ExamEngine.score(session.results);
    const integrity = ExamIntegrity.stop();
    const ch = Store.chapter(session.chapterId);
    const best = Math.max(ch.examScore || 0, res.pct);
    ch.examScore = best;
    Store.save();

    let xp = 0, unlocked = [];
    if (res.passed) {
      xp = 50;
      Store.addXP(xp);
      Store.completeStep(session.chapterId, 'exam');
      ch.complete = true;
      Store.save();
      unlocked = Store.checkAchievements();
    }

    const weak = SRS.weakWords(5);
    const sec = res.bySection;
    const line = (k, label) => sec[k] ? `<div class="ex-line"><span>${label}</span><b>${sec[k].correct}/${sec[k].total}</b></div>` : '';

    root.innerHTML = `
      <div class="l-shell">
        <div class="done-wrap exam-done">
          <img class="mascot done-mascot" src="${res.passed ? MASCOTS.mascotCheer : MASCOTS.mascotStudy}" alt="">
          <div class="ex-eyebrow">Exam complete</div>
          <div class="ex-score ${res.passed ? 'pass' : 'fail'}">${res.pct}%</div>
          <div class="ex-verdict ${res.passed ? 'pass' : 'fail'}">${res.passed ? 'PASS ✓' : 'ยังไม่ผ่าน'}</div>
          <p class="ex-need">${res.passed ? 'บทถัดไปปลดล็อกแล้ว' : `ต้องได้ ${ExamEngine.PASS}% ขึ้นไปจึงจะผ่าน`}</p>

          <div class="ex-grid">
            <div class="ex-line"><span>Correct</span><b>${res.correct}</b></div>
            <div class="ex-line"><span>Incorrect</span><b>${res.incorrect}</b></div>
            ${line('vocabulary', 'Vocabulary')}
            ${line('grammar', 'Grammar')}
            ${line('reading', 'Reading')}
          </div>

          ${res.passed ? `<div class="done-xp">+${xp} XP</div>` : ''}
          ${unlocked.map(a => `<div class="done-ach">${a.icon} ปลดล็อก: ${esc(a.title)}</div>`).join('')}

          ${!res.passed && weak.length ? `
            <div class="ex-weak">
              <span class="s-lbl">คำที่ควรทบทวน</span>
              ${weak.map(w => `<div class="ex-weak-row"><span>${esc(w.en)}</span><b>${w.correct}/${w.attempts}</b></div>`).join('')}
            </div>` : ''}

          <div class="ex-integrity">
            <span class="s-lbl">Exam Integrity</span>
            <div class="ex-line"><span>Tab switches</span><b>${integrity.tabSwitches}</b></div>
            <div class="ex-line"><span>Fullscreen</span><b>${integrity.fullscreenUsed ? 'Used' : 'Not used'}</b></div>
            <p class="ex-note">ระบบบันทึกเฉพาะสัญญาณที่เบราว์เซอร์รองรับ ไม่สามารถตรวจจับการแคปหน้าจอของระบบปฏิบัติการหรืออุปกรณ์เครื่องอื่นได้</p>
          </div>

          <div class="ex-actions">
            ${res.passed
              ? `<button class="btn btn-primary" id="exNext">เรียนบทถัดไป</button>`
              : `<button class="btn btn-primary" id="exRetry">ลองสอบใหม่</button>
                 <button class="btn btn-ghost" id="exReview">ทบทวนคำที่ผิด</button>
                 <button class="btn btn-ghost" id="exBack">กลับไปฝึก</button>`}
          </div>
        </div>
      </div>`;

    const s = Store.get();
    s.examIntegrityLog.push({ chapter: session.chapterId, ...integrity, pct: res.pct, at: Date.now() });
    Store.save();

    if (res.passed) $('#exNext').onclick = () => close(true);
    else {
      $('#exRetry').onclick  = () => { const c = session.chapterId; close(true); App.startExam(c); };
      $('#exReview').onclick = () => { close(true); App.startWeakPractice(); };
      $('#exBack').onclick   = () => close(true);
    }
  }

  /* read-only accessor ของ step ปัจจุบัน — ใช้โดย UI ภายนอกและชุดทดสอบ */
  const currentStep = () => (session ? session.steps[session.i] : null);

  return { open, close, speak, checkSentence, currentStep };
})();
