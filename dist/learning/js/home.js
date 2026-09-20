/* ============================================================
   js/home.js — HOME / LEARNING PATH rendering
   ------------------------------------------------------------
   แยกเป็นฟังก์ชันย่อยตาม component ที่จะแปลงเป็น React ภายหลัง
   ============================================================ */
const Home = (() => {
  const $  = (s, r = document) => r.querySelector(s);
  const el = (t, c, h) => { const n = document.createElement(t); if (c) n.className = c; if (h != null) n.innerHTML = h; return n; };
  const esc = s => String(s).replace(/[&<>"]/g, m => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[m]));

  const CAT_CLASS = { foundation: 'vocabulary', vocabulary: 'vocabulary' };

  function greeting() {
    const h = new Date().getHours();
    return h < 12 ? 'Good morning' : h < 18 ? 'Good afternoon' : 'Good evening';
  }

  /* ---------- header ---------- */
  function renderHeader() {
    const host = $('#header'); if (!host) return;
    const s = Store.get();
    const sum = Store.summary();
    let account = {}, profile = {};
    try { account = JSON.parse(localStorage.getItem('englishAuthUser') || '{}'); profile = JSON.parse(localStorage.getItem('englishUserProfile:' + account.id) || '{}'); } catch (e) {}
    const displayName = profile.displayName || s.user.name || account.user_metadata?.full_name || account.email?.split('@')[0] || '';
    const profileImage = profile.avatar || MASCOTS.mascotStudy;
    const isNew = sum.totalXP === 0 && sum.learningDays === 0;
    host.innerHTML = `
      <div class="topbar-row">
        <button class="avatar-wrap profile-shortcut" data-link="profile.html" aria-label="Open your profile"><img class="mascot" src="${profileImage}" alt="Your profile picture"></button>
        <div>
          <div class="hello-eyebrow">${greeting()} 👋</div>
          <h1 class="hello-title">${displayName ? 'Hi ' + esc(displayName) + '!' : 'Welcome!'}</h1>
          <p class="hello-sub">${isNew ? "Let's start your first lesson." : 'Ready to continue learning?'}</p>
        </div>
      </div>
      <div class="chip-row">
        <button class="chip chip-streak" data-link="streak.html" aria-label="ดูสถิติการเรียน">
          <span class="chip-ico">🔥</span>
          <span>
            <span class="chip-val">${s.streak} day streak</span><br>
            <span class="chip-lbl">${s.streak === 0 ? 'Start today' : 'Tap to see stats'}</span>
          </span>
          <span class="chip-go">›</span>
        </button>
        <div class="chip chip-xp">
          <span class="chip-ico">✦</span>
          <span>
            <span class="chip-val">XP ${s.totalXP}</span><br>
            <span class="chip-lbl">${Store.xpToday() > 0 ? '+' + Store.xpToday() + ' today' : 'Earn XP today'}</span>
          </span>
        </div>
      </div>`;
  }

  /* ---------- daily goal ---------- */
  function renderDailyGoal() {
    const host = $('#dailyGoal'); if (!host) return;
    const s = Store.get();
    const done = Store.xpToday();
    const pct = Math.min(100, Math.round((done / s.dailyGoal) * 100));
    const met = Store.dailyGoalMet();
    host.innerHTML = `
      <div class="dg-row">
        <div>
          <div class="dg-title">${met ? '✓ Daily Goal Complete' : 'Daily goal'}</div>
          <div class="dg-sub">${done} / ${s.dailyGoal} XP today</div>
        </div>
        <label class="dg-select">
          <span class="sr-only">เลือกเป้าหมายรายวัน</span>
          <select id="goalSel">
            ${DAILY_GOAL_OPTIONS.map(g => `<option value="${g}" ${g === s.dailyGoal ? 'selected' : ''}>${g} XP</option>`).join('')}
          </select>
        </label>
      </div>
      <div class="bar"><div class="bar-fill ${met ? '' : 'blue'}" style="width:${pct}%"></div></div>`;
    $('#goalSel', host).onchange = e => { Store.get().dailyGoal = +e.target.value; Store.save(); render(); };
  }

  /* ---------- continue card ---------- */
  function renderContinue() {
    const host = $('#continue'); if (!host) return;
    const ch = Store.currentChapter();
    const step = Store.nextStep(ch.id);
    const c = Store.chapter(ch.id);
    const doneCount = CHAPTER_STEPS.filter(s => c.steps[s.key]).length;
    const pct = Math.round((doneCount / CHAPTER_STEPS.length) * 100);
    const fresh = doneCount === 0;

    host.innerHTML = `
      <div class="cc-eyebrow">${fresh ? 'Start here' : 'Continue learning'}</div>
      <div class="cc-main">
        <div class="cc-text">
          <h2 class="cc-title">${esc(step ? step.label : 'Chapter complete')}</h2>
          <p class="cc-meta">${ch.icon} ${esc(ch.title)}</p>
          <p class="cc-meta cc-grammar">Grammar: ${esc(ch.grammarTitle)}</p>
        </div>
        <img class="mascot cc-mascot" src="${MASCOTS.mascotBag}" alt="">
      </div>
      <div class="cc-prog-head"><span>${doneCount} of ${CHAPTER_STEPS.length} steps</span><b>${pct}%</b></div>
      <div class="bar"><div class="bar-fill" style="width:${pct}%"></div></div>
      <button class="btn btn-primary" id="cta">${fresh ? 'Start Learning →' : 'Continue Learning →'}</button>`;
    $('#cta', host).onclick = () => App.continueLearning();
  }

  /* ---------- review / weak words ---------- */
  function renderReview() {
    const host = $('#reviewBox'); if (!host) return;
    const weak = SRS.weakWords(6);
    const due = SRS.dueWords(20);
    const sum = Store.summary();

    if (!sum.wordsLearned) {
      host.innerHTML = `
        <div class="rv-empty">
          <img class="mascot" src="${MASCOTS.mascotStudy}" alt="">
          <div>
            <div class="rv-empty-t">ยังไม่มีคำให้ทบทวน</div>
            <div class="rv-empty-s">เริ่มบทเรียนแรกเพื่อสร้างคลังคำศัพท์ของคุณ</div>
          </div>
        </div>`;
      return;
    }

    host.innerHTML = `
      <div class="rv-actions">
        <button class="rv-btn" id="rvDue">
          <span class="rv-ico">🔁</span>
          <span><b>ทบทวนตามกำหนด</b><small>${due.length} คำถึงกำหนดแล้ว</small></span>
        </button>
        <button class="rv-btn" id="rvWeak">
          <span class="rv-ico">🎯</span>
          <span><b>ฝึกคำที่อ่อน</b><small>${weak.length} คำควรทบทวน</small></span>
        </button>
      </div>
      ${weak.length ? `
        <div class="rv-list">
          <div class="rv-list-t">คำที่ควรทบทวน</div>
          ${weak.map(w => `
            <button class="rv-word" data-word="${esc(w.wordId)}">
              <span class="rv-word-en">${esc(w.en)}</span>
              <span class="rv-word-score">${w.correct}/${w.attempts}</span>
              <span class="rv-word-bar"><i style="width:${Math.round(w.mastery * 100)}%"></i></span>
            </button>`).join('')}
        </div>` : ''}
      <div class="rv-stats">
        <div><b>${sum.wordsLearned}</b><span>คำที่เรียนแล้ว</span></div>
        <div><b>${sum.wordsMastered}</b><span>คำที่แม่นแล้ว</span></div>
      </div>`;

    $('#rvDue', host).onclick = () => App.startDueReview();
    $('#rvWeak', host).onclick = () => App.startWeakPractice();
    host.querySelectorAll('.rv-word').forEach(b =>
      b.onclick = () => App.startWordPractice(b.dataset.word));
  }

  /* ---------- achievements ---------- */
  function renderAchievements() {
    const host = $('#achBox'); if (!host) return;
    const owned = Store.get().achievements;
    host.innerHTML = achievements.map(a => `
      <div class="ach ${owned.includes(a.id) ? 'on' : ''}" title="${esc(a.desc)}">
        <span class="ach-ico">${a.icon}</span>
        <span class="ach-t">${esc(a.title)}</span>
        <span class="ach-d">${esc(a.desc)}</span>
      </div>`).join('');
  }

  /* ---------- learning map ---------- */
  const X_PATTERN = ['left', 'center', 'right', 'center'];

  function chapterNode(ch, i) {
    const st = Store.chapterStatus(ch.id);
    const c = Store.chapter(ch.id);
    const done = CHAPTER_STEPS.filter(s => c.steps[s.key]).length;
    const face = st === 'mastered' ? '★' : st === 'completed' ? '✓' : st === 'locked' ? '🔒' : ch.icon;
    const sub =
      st === 'locked' ? `${ch.wordCount} words` :
      st === 'completed' || st === 'mastered' ? `Exam ${c.examScore}%` :
      `${done}/${CHAPTER_STEPS.length} steps`;
    const cta = (st === 'current' || st === 'available')
      ? `<span class="node-now">${done ? 'Continue' : 'Start'}</span>` : '';
    return `
      <div class="node-row pos-${X_PATTERN[i % X_PATTERN.length]}">
        <div class="node ${st} n-vocabulary" data-chapter="${ch.id}">
          <button class="node-btn" aria-label="บทที่ ${i + 1}: ${esc(ch.title)} (${st})">
            <div class="node-face">${face}</div>
            <div class="node-cap">Chapter ${i + 1}</div>
            <div class="node-title">${esc(ch.title)}</div>
            <div class="node-pct">${sub}</div>
            ${cta}
          </button>
        </div>
      </div>`;
  }

  function drawTrail(group, items) {
    const svg = group.querySelector('.trail');
    const nodes = [...group.querySelectorAll('.node-row')];
    if (nodes.length < 2) { svg.innerHTML = ''; return; }
    const gb = group.getBoundingClientRect();
    let done = '', todo = '';
    for (let i = 0; i < nodes.length - 1; i++) {
      const a = nodes[i].querySelector('.node').getBoundingClientRect();
      const b = nodes[i + 1].querySelector('.node').getBoundingClientRect();
      const ax = a.left - gb.left + a.width / 2, bx = b.left - gb.left + b.width / 2;
      const ay = a.bottom - gb.top + 6, by = b.top - gb.top - 4;
      if (by - ay < 6) continue;
      const k = Math.min((by - ay) * 0.5, 34);
      const d = `M ${ax} ${ay} C ${ax} ${ay + k}, ${bx} ${by - k}, ${bx} ${by}`;
      if (Store.chapterStatus(items[i].id).match(/completed|mastered/)) done += d + ' ';
      else todo += d + ' ';
    }
    svg.innerHTML = `<path class="todo" d="${todo}"></path><path class="done" d="${done}"></path>`;
  }

  function renderMap() {
    const host = $('#map'); if (!host) return;
    host.innerHTML = '';

    const cur = Store.currentChapter();
    const counter = $('#mapCount');
    if (counter) counter.textContent = `Chapter ${courseChapters.findIndex(c => c.id === cur.id) + 1} of ${courseChapters.length}`;

    host.appendChild(el('div', 'stage-banner', `
      <div class="stage-flag">🚩</div>
      <div>
        <div class="stage-label">Start</div>
        <div class="stage-sub">Foundation → Vocabulary → Grammar → Reading → Exam</div>
      </div>`));

    const group = el('div', 'node-group');
    group.innerHTML = `<svg class="trail" aria-hidden="true"></svg>` +
      courseChapters.map(chapterNode).join('');
    host.appendChild(group);

    /* มาสคอตยืนข้างบทปัจจุบัน */
    const curIdx = courseChapters.findIndex(c => c.id === cur.id);
    const row = group.querySelectorAll('.node-row')[curIdx];
    if (row) {
      const m = el('img', 'mascot path-mascot');
      m.src = MASCOTS.mascotCheer; m.alt = '';
      row.classList.add('has-mascot');
      row.appendChild(m);
    }

    drawTrail(group, courseChapters);
    if (!renderMap._bound) {
      window.addEventListener('resize', () => {
        const g = $('#map .node-group');
        if (g) drawTrail(g, courseChapters);
      });
      renderMap._bound = true;
    }

    host.querySelectorAll('.node').forEach(n =>
      n.onclick = () => openChapter(n.dataset.chapter));

    const words = courseChapters.reduce((s, c) => s + c.wordCount, 0);
    host.appendChild(el('div', 'map-goal', `
      <img class="mascot" src="${MASCOTS.mascotStudy}" alt="">
      <div>
        <div class="map-goal-t">${courseChapters.length} chapters · ${words} words · 36 reading units</div>
        <div class="map-goal-s">Vocabulary → Grammar → Sentence → Reading → Exam</div>
      </div>`));
  }

  /* ---------- chapter detail sheet ---------- */
  function openChapter(chapterId) {
    const ch = courseChapters.find(c => c.id === chapterId);
    const st = Store.chapterStatus(chapterId);
    if (st === 'locked') return Toast.show('🔒 ต้องเรียนบทก่อนหน้าให้จบก่อน');
    const c = Store.chapter(chapterId);

    const wrap = el('div', 'modal-wrap');
    wrap.innerHTML = `
      <div class="sheet" role="dialog" aria-modal="true" aria-label="รายละเอียดบทเรียน">
        <div class="sheet-grab"></div>
        <div class="sheet-head">
          <span class="sheet-icon">${ch.icon}</span>
          <div>
            <h2 class="sheet-title">${esc(ch.title)}</h2>
            <p class="sheet-sub">${esc(ch.titleEn)} · ${ch.wordCount} words</p>
            <p class="sheet-sub">Grammar: ${esc(ch.grammarTitle)} (${esc(ch.grammarThai)})</p>
          </div>
        </div>
        <div class="steps">
          ${CHAPTER_STEPS.map((s, i) => {
            const done = !!c.steps[s.key];
            const unlocked = Store.stepUnlocked(chapterId, s.key);
            const state = done ? 'done' : unlocked ? 'open' : 'lock';
            return `
              <button class="step ${state}" data-step="${s.key}">
                <span class="step-ico">${done ? '✓' : unlocked ? s.icon : '🔒'}</span>
                <span class="step-label">${s.label}</span>
                <span class="step-xp">${done ? 'เสร็จแล้ว' : '+' + s.xp + ' XP'}</span>
              </button>`;
          }).join('')}
        </div>
        ${c.complete ? `
          <div class="chapter-done">
            🎉 Chapter Complete! · Exam ${c.examScore}%
          </div>` : ''}
        <button class="btn btn-ghost" id="sheetClose">ปิด</button>
      </div>`;
    document.body.appendChild(wrap);
    const close = () => wrap.remove();
    wrap.querySelector('#sheetClose').onclick = close;
    wrap.onclick = e => { if (e.target === wrap) close(); };
    wrap.querySelectorAll('.step').forEach(b => b.onclick = () => {
      close();
      App.startStep(chapterId, b.dataset.step);
    });
  }

  function render() {
    if (!document.getElementById('map')) return;
    renderHeader();
    renderDailyGoal();
    renderContinue();
    renderReview();
    renderMap();
    renderAchievements();
    Nav.bindLinks();
  }

  return { render, openChapter };
})();

/* ---------- shared navigation ---------- */
const Nav = {
  bindLinks() {
    document.querySelectorAll('[data-link]').forEach(b => {
      if (b.dataset.bound) return;
      b.dataset.bound = '1';
      b.addEventListener('click', () => { window.location.href = b.getAttribute('data-link'); });
    });
  },
  mount() {
    const here = location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('[data-nav]').forEach(btn => {
      const t = btn.getAttribute('data-nav');
      btn.classList.toggle('active', t === here);
      btn.addEventListener('click', () => { if (t !== here) window.location.href = t; });
    });
    Nav.bindLinks();
  }
};
