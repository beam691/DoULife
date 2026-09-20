/* ============================================================
   js/streak.js — STREAK / STATISTICS page rendering
   ============================================================ */
const Streak = (() => {
  const $ = (s, r = document) => r.querySelector(s);
  const esc = s => String(s).replace(/[&<>"]/g, m => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[m]));

  function renderHero() {
    const host = $('#streakHero'); if (!host) return;
    const s = Store.get();
    const note =
      s.streak === 0 ? 'Complete one lesson today to light your first flame.' :
      s.longestStreak - s.streak > 0 ? `${s.longestStreak - s.streak} more days to beat your record.`
                                     : 'This is your best streak ever!';
    host.innerHTML = `
      <div class="flame ${s.streak === 0 ? 'is-empty' : ''}">🔥</div>
      <div class="streak-hero-txt">
        <div class="streak-cap">Current streak</div>
        <div class="streak-num">${s.streak}<span>${s.streak === 1 ? 'day' : 'days'}</span></div>
        <p class="streak-note">${note}</p>
      </div>`;
  }

  function renderStats() {
    const host = $('#stats'); if (!host) return;
    const sum = Store.summary();
    const items = [
      { ico: '🏆', val: sum.longestStreak, unit: 'days', lbl: 'Longest streak' },
      { ico: '📚', val: sum.learningDays,  unit: 'days', lbl: 'Total learning days' },
      { ico: '✦',  val: sum.totalXP,       unit: 'XP',   lbl: 'Total experience' },
      { ico: '⚡', val: Store.xpThisWeek(), unit: 'XP',   lbl: 'XP this week' }
    ];
    host.innerHTML = items.map(s => `
      <div class="stat ${s.val === 0 ? 'is-zero' : ''}">
        <div class="stat-ico">${s.ico}</div>
        <div class="stat-val">${s.val}<small>${s.unit}</small></div>
        <div class="stat-lbl">${s.lbl}</div>
      </div>`).join('');
  }

  function renderWeek() {
    const host = $('#week'); if (!host) return;
    const s = Store.get();
    const days = Store.weekDays();
    const any = days.some(d => s.learningDays.includes(d.key));
    const hint = $('#weekHint');
    if (hint) hint.textContent = any ? '' : 'No lessons logged this week yet.';
    host.innerHTML = days.map(d => {
      const done = s.learningDays.includes(d.key);
      const xp = s.xpByDay[d.key] || 0;
      return `
        <div>
          <div class="week-day">${d.label}</div>
          <div class="week-dot ${done ? 'on' : ''}">${done ? '🔥' : '○'}</div>
          <div class="week-xp">${xp ? '+' + xp : '—'}</div>
        </div>`;
    }).join('');
  }

  function renderCalendar() {
    const host = $('#calendar'); if (!host) return;
    const s = Store.get();
    const now = new Date();
    const y = now.getFullYear(), m = now.getMonth();
    const first = new Date(y, m, 1).getDay();
    const days = new Date(y, m + 1, 0).getDate();
    const today = now.getDate();
    const label = $('#calMonth');
    if (label) label.textContent = now.toLocaleString('en-US', { month: 'long', year: 'numeric' });

    const wd = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
    let html = wd.map(d => `<div class="cal-wd">${d}</div>`).join('');
    for (let i = 0; i < first; i++) html += `<div class="cal-cell empty"></div>`;
    for (let d = 1; d <= days; d++) {
      const key = Store.todayKey(new Date(y, m, d));
      const learned = s.learningDays.includes(key);
      let cls = '';
      if (d === today) cls = learned ? 'today learned-today' : 'today';
      else if (learned) cls = 'learned';
      else if (d < today && s.learningDays.length) cls = 'missed';
      html += `<div class="cal-cell ${cls}">${d}</div>`;
    }
    host.innerHTML = html;
    const chint = $('#calHint');
    if (chint) chint.textContent = s.learningDays.length ? '' : 'Your learning days will appear here.';
  }

  /* ความคืบหน้าแยกตามทักษะ */
  function renderProgress() {
    const host = $('#skillProgress'); if (!host) return;
    const sum = Store.summary();
    const totalWords = courseChapters.reduce((a, c) => a + c.wordCount, 0);
    const rows = [
      { lbl: 'Chapters',   done: sum.completedChapters, total: courseChapters.length },
      { lbl: 'Vocabulary', done: sum.wordsLearned,      total: totalWords },
      { lbl: 'Grammar',    done: sum.grammarDone,       total: grammarUnits.length },
      { lbl: 'Reading',    done: sum.readingDone,       total: readingUnits.length },
      { lbl: 'Exams passed', done: sum.examsPassed,     total: courseChapters.length }
    ];
    host.innerHTML = rows.map(r => {
      const pct = r.total ? Math.round((r.done / r.total) * 100) : 0;
      return `
        <div class="sp-row">
          <div class="sp-head"><span>${r.lbl}</span><b>${r.done} / ${r.total}</b></div>
          <div class="bar"><div class="bar-fill ${pct === 100 ? '' : 'blue'}" style="width:${pct}%"></div></div>
        </div>`;
    }).join('');
  }

  function renderMotivation() {
    const host = $('#motivation'); if (!host) return;
    const s = Store.get();
    const done = Store.weeklyCompleted();
    const goal = 7;
    const empty = done === 0 && s.streak === 0;
    const copy = empty
      ? { t: 'Start your first day.', b: 'Finish one lesson today and your streak begins at 1. A little every day beats one long session.' }
      : { t: "You're building a habit.", b: 'Keep learning a little every day — 10 minutes beats one long session.' };
    host.innerHTML = `
      <div class="motivate-top">
        <img class="mascot" src="${MASCOTS.mascotBag}" alt="">
        <div>
          <div class="motivate-t">${copy.t}</div>
          <p class="motivate-b">${copy.b}</p>
        </div>
      </div>
      <div class="goal-head"><span>Weekly goal</span><em>${done} / ${goal} days</em></div>
      <div class="bar"><div class="bar-fill" style="width:${(done / goal) * 100}%"></div></div>
      <div class="goal-pips">
        ${Array.from({ length: goal }, (_, i) => `<span class="pip ${i < done ? 'on' : ''}"></span>`).join('')}
      </div>
      ${empty ? `<button class="btn btn-primary" data-link="index.html" style="margin-top:16px">Start learning →</button>` : ''}`;
    Nav.bindLinks();
  }

  function renderAchievements() {
    const host = $('#achBoxStreak'); if (!host) return;
    const owned = Store.get().achievements;
    host.innerHTML = achievements.map(a => `
      <div class="ach ${owned.includes(a.id) ? 'on' : ''}">
        <span class="ach-ico">${a.icon}</span>
        <span class="ach-t">${esc(a.title)}</span>
        <span class="ach-d">${esc(a.desc)}</span>
      </div>`).join('');
  }

  function render() {
    if (!document.getElementById('streakHero')) return;
    renderHero(); renderStats(); renderWeek(); renderCalendar();
    renderProgress(); renderMotivation(); renderAchievements();
  }

  return { render };
})();
