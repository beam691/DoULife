const Profile = (() => {
  const PROFILE_KEY = 'englishUserProfile:';
  const MAX_AVATAR_BYTES = 2 * 1024 * 1024;
  const esc = value => String(value || '').replace(/[&<>"']/g, char => ({ '&':'&amp;', '<':'&lt;', '>':'&gt;', '"':'&quot;', "'":'&#39;' }[char]));
  const user = () => { try { return JSON.parse(localStorage.getItem('englishAuthUser') || '{}'); } catch { return {}; } };
  const key = () => PROFILE_KEY + user().id;
  const defaultName = () => user().user_metadata?.full_name || user().email?.split('@')[0] || 'Learner';
  const loadProfile = () => { try { return JSON.parse(localStorage.getItem(key()) || '{}'); } catch { return {}; } };
  const saveProfile = profile => localStorage.setItem(key(), JSON.stringify(profile));
  const level = xp => Math.max(1, Math.floor(xp / 100) + 1);
  const nextLevelXP = xp => level(xp) * 100;
  const formatDate = value => value ? new Intl.DateTimeFormat('en-US', { dateStyle: 'medium' }).format(new Date(value)) : '—';

  function avatar(profile, className = 'profile-avatar') {
    return profile.avatar
      ? `<img class="${className}" src="${profile.avatar}" alt="Profile picture">`
      : `<img class="${className}" src="${MASCOTS.mascotStudy}" alt="Default profile mascot">`;
  }

  function calendar(days) {
    const today = new Date();
    const cells = [];
    for (let index = 34; index >= 0; index--) {
      const date = new Date(today); date.setDate(today.getDate() - index);
      const id = Store.todayKey(date);
      cells.push(`<span class="activity-cell ${days.includes(id) ? 'active' : ''}" title="${id}"></span>`);
    }
    return cells.join('');
  }

  function achievementCards(owned) {
    return achievements.map(item => `<div class="profile-achievement ${owned.includes(item.id) ? 'unlocked' : ''}">
      <span>${owned.includes(item.id) ? item.icon : '🔒'}</span><div><b>${esc(item.title)}</b><small>${esc(item.desc)}</small></div>
    </div>`).join('');
  }

  function render() {
    const host = document.getElementById('profilePage');
    if (!host) return;
    const currentUser = user();
    if (!currentUser.id) { host.innerHTML = '<section class="card profile-empty">Please sign in to view your profile.</section>'; return; }
    Store.load();
    const profile = loadProfile();
    const summary = Store.summary();
    const displayName = profile.displayName || defaultName();
    const username = profile.username || currentUser.email?.split('@')[0] || 'learner';
    const current = Store.currentChapter();
    const chapter = Store.chapter(current.id);
    const completeSteps = CHAPTER_STEPS.filter(step => chapter.steps[step.key]).length;
    const overall = Math.round((summary.completedChapters / courseChapters.length) * 100);
    const currentLevel = level(summary.totalXP);
    const xpTarget = nextLevelXP(summary.totalXP);
    const xpStart = (currentLevel - 1) * 100;
    const xpPercent = Math.round(((summary.totalXP - xpStart) / (xpTarget - xpStart)) * 100);

    host.innerHTML = `
      <section class="profile-hero">
        <div class="profile-hero-top"><span class="profile-kicker">YOUR LEARNING PROFILE</span><button class="profile-edit" id="editProfile">Edit profile</button></div>
        <div class="profile-ident">${avatar(profile)}<div><h1>${esc(displayName)}</h1><p>@${esc(username)}</p><span class="profile-level">Level ${currentLevel} · ${summary.totalXP} XP</span></div></div>
        <div class="profile-quick"><div><b>🔥 ${summary.streak}</b><span>Current streak</span></div><div><b>📚 ${summary.learningDays}</b><span>Learning days</span></div><div><b>🏆 ${summary.completedChapters}</b><span>Chapters done</span></div></div>
      </section>
      <section class="section"><div class="section-head"><h2 class="section-title">Learning progress</h2><span class="section-sub">Real activity</span></div>
        <div class="card profile-progress"><div class="progress-line"><span>Current chapter</span><b>${esc(current.title)}</b></div><div class="progress-line"><span>Current lesson</span><b>${completeSteps}/${CHAPTER_STEPS.length} steps</b></div><div class="bar"><div class="bar-fill" style="width:${overall}%"></div></div><small>${summary.completedChapters} / ${courseChapters.length} chapters · ${overall}% overall</small><div class="progress-line xp-line"><span>Level ${currentLevel}</span><b>${summary.totalXP} / ${xpTarget} XP</b></div><div class="bar"><div class="bar-fill blue" style="width:${xpPercent}%"></div></div></div>
      </section>
      <section class="section"><div class="section-head"><h2 class="section-title">Learning activity</h2><span class="section-sub">Last 35 days</span></div><div class="card"><div class="activity-calendar">${calendar(Store.get().learningDays)}</div><p class="profile-note">Only days with completed learning activity are highlighted.</p></div></section>
      <section class="section"><div class="section-head"><h2 class="section-title">Statistics</h2><span class="section-sub">From your progress</span></div><div class="profile-stats"><div><b>${summary.longestStreak}</b><span>Longest streak</span></div><div><b>${summary.examsPassed}</b><span>Exams passed</span></div><div><b>${summary.readingDone}</b><span>Readings done</span></div><div><b>${summary.wordsLearned}</b><span>Words learned</span></div></div></section>
      <section class="section"><div class="section-head"><h2 class="section-title">Achievements</h2><span class="section-sub">${Store.get().achievements.length} unlocked</span></div><div class="profile-achievements">${achievementCards(Store.get().achievements)}</div></section>
      <section class="section"><div class="section-head"><h2 class="section-title">Account</h2><span class="section-sub">Private</span></div><div class="card account-list"><div><span>Email</span><b>${esc(currentUser.email || '—')}</b></div><div><span>UID</span><b class="uid-value">${esc(currentUser.id)}</b><button id="copyUid">Copy UID</button></div><div><span>Member since</span><b>${formatDate(currentUser.created_at)}</b></div></div></section>
      <section class="section"><div class="section-head"><h2 class="section-title">Friends</h2><span class="section-sub">Coming soon</span></div><div class="card profile-friends"><p>Share your UID with friends. Friend requests will be added when the backend supports them.</p><button class="btn btn-ghost" id="addFriend" disabled>Add Friend · Coming soon</button></div></section>
      <button class="profile-logout" id="logout">Log out</button>`;

    document.getElementById('editProfile').onclick = () => openEditor(profile);
    document.getElementById('copyUid').onclick = async () => { try { await navigator.clipboard.writeText(currentUser.id); const button = document.getElementById('copyUid'); button.textContent = 'Copied'; setTimeout(() => { button.textContent = 'Copy UID'; }, 1600); } catch { } };
    document.getElementById('logout').onclick = () => parent.postMessage({ type: 'english-logout' }, window.location.origin);
    Nav.mount();
  }

  function openEditor(profile) {
    const draft = { ...profile };
    const wrap = document.createElement('div'); wrap.className = 'modal-wrap';
    wrap.innerHTML = `<div class="modal profile-editor" role="dialog" aria-modal="true"><h2>Edit profile</h2><div class="avatar-editor" id="avatarPreview">${avatar(draft, 'profile-avatar large')}</div><label class="avatar-upload">Choose photo<input id="avatarFile" type="file" accept="image/png,image/jpeg,image/webp"></label><small>PNG, JPG, or WEBP · max 2 MB</small><label>Display name<input id="displayName" maxlength="40" value="${esc(draft.displayName || defaultName())}"></label><label>Username<input id="username" maxlength="24" value="${esc(draft.username || user().email?.split('@')[0] || '')}"></label><p class="profile-form-error" id="profileError"></p><div class="modal-actions"><button class="btn btn-ghost" id="cancelEdit">Cancel</button><button class="btn btn-primary" id="saveEdit">Save</button></div></div>`;
    document.body.appendChild(wrap);
    const close = () => wrap.remove();
    wrap.querySelector('#cancelEdit').onclick = close;
    wrap.querySelector('#avatarFile').onchange = event => {
      const file = event.target.files[0]; const error = wrap.querySelector('#profileError');
      if (!file) return;
      if (!['image/jpeg', 'image/png', 'image/webp'].includes(file.type) || file.size > MAX_AVATAR_BYTES) { error.textContent = 'Use a PNG, JPG, or WEBP image under 2 MB.'; event.target.value = ''; return; }
      const reader = new FileReader(); reader.onload = () => { draft.avatar = reader.result; wrap.querySelector('#avatarPreview').innerHTML = avatar(draft, 'profile-avatar large'); }; reader.readAsDataURL(file);
    };
    wrap.querySelector('#saveEdit').onclick = () => {
      const displayName = wrap.querySelector('#displayName').value.trim(); const username = wrap.querySelector('#username').value.trim(); const error = wrap.querySelector('#profileError');
      if (displayName.length < 2 || !/^[a-zA-Z0-9._-]{3,24}$/.test(username)) { error.textContent = 'Use a display name of at least 2 characters and a 3–24 character username (letters, numbers, . _ -).'; return; }
      saveProfile({ ...draft, displayName, username }); Store.get().user.name = displayName; Store.save(); close(); render();
    };
  }
  return { render };
})();
document.addEventListener('DOMContentLoaded', Profile.render);
