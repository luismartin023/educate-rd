/* EDUCATE_RD — JS compartido v2
   Tema, modos de estudio, quizzes, flashcards, copiar código, scrollspy y labs */
(function () {
  const html = document.documentElement;
  const savedTheme = localStorage.getItem('educate_theme');
  if (savedTheme === 'dark' || savedTheme === 'light') {
    html.setAttribute('data-theme', savedTheme);
  }

  const themeBtn = document.getElementById('theme-toggle');
  function syncThemeIcon() {
    if (!themeBtn) return;
    const isDark = html.getAttribute('data-theme') === 'dark';
    themeBtn.textContent = isDark ? '☀' : '☾';
    themeBtn.title = isDark ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro';
  }
  syncThemeIcon();
  if (themeBtn) {
    themeBtn.addEventListener('click', () => {
      const next = html.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
      html.setAttribute('data-theme', next);
      localStorage.setItem('educate_theme', next);
      syncThemeIcon();
    });
  }

  /* ---------- Progreso en topbar ---------- */
  const progEl = document.getElementById('prog-text');
  function updateProg() {
    if (!progEl) return;
    const quizzes = document.querySelectorAll('.quiz');
    const done = document.querySelectorAll('.quiz.done').length;
    const fcs = document.querySelectorAll('.fc');
    const open = document.querySelectorAll('.fc.open').length;
    if (quizzes.length || fcs.length) {
      progEl.innerHTML = `<b>${done}/${quizzes.length}</b> casos · <b>${open}/${fcs.length}</b> tarjetas`;
    }
  }

  /* ---------- Quizzes ---------- */
  document.querySelectorAll('.quiz').forEach((q) => {
    const opts = q.querySelectorAll('.opt');
    opts.forEach((o) => {
      o.addEventListener('click', () => {
        if (q.classList.contains('done')) return;
        const ok = o.dataset.ok === '1';
        o.classList.add(ok ? 'right' : 'wrong');
        if (!ok) {
          const good = q.querySelector('.opt[data-ok="1"]');
          if (good) good.classList.add('right');
        }
        q.classList.add('done');
        updateProg();
      });
    });
    const rev = q.querySelector('.reveal');
    if (rev) {
      rev.addEventListener('click', () => {
        q.classList.add('done');
        updateProg();
      });
    }
  });

  const resetBtn = document.getElementById('reset-quiz');
  if (resetBtn) {
    resetBtn.addEventListener('click', () => {
      document.querySelectorAll('.quiz').forEach((q) => {
        q.classList.remove('done');
        q.querySelectorAll('.opt').forEach((o) => o.classList.remove('right', 'wrong'));
      });
      updateProg();
    });
  }

  /* ---------- Flashcards ---------- */
  document.querySelectorAll('.fc').forEach((c) => {
    c.addEventListener('click', () => {
      c.classList.toggle('open');
      updateProg();
    });
  });

  /* ---------- Modos de estudio ---------- */
  const modeBtns = document.querySelectorAll('.modebtn');
  function setMode(mode) {
    modeBtns.forEach((b) => b.classList.toggle('on', b.dataset.mode === mode));
    document.body.classList.toggle('panic', mode === 'panic');
    if (mode === 'sim') {
      const target = document.getElementById('casos');
      if (target) target.scrollIntoView({ behavior: 'smooth' });
    }
  }
  modeBtns.forEach((b) => b.addEventListener('click', () => setMode(b.dataset.mode)));
  const exitPanic = document.getElementById('exit-panic');
  if (exitPanic) exitPanic.addEventListener('click', () => setMode('full'));

  /* ---------- Copiar código ---------- */
  document.querySelectorAll('.codebox').forEach((box) => {
    const btn = box.querySelector('button.copy');
    const pre = box.querySelector('pre.code');
    if (!btn || !pre) return;
    btn.addEventListener('click', async () => {
      try {
        await navigator.clipboard.writeText(pre.innerText);
        const orig = btn.textContent;
        btn.textContent = 'Copiado';
        setTimeout(() => { btn.textContent = orig; }, 1200);
      } catch (_) {}
    });
  });

  /* ---------- Scrollspy en subnav ---------- */
  const navLinks = Array.from(document.querySelectorAll('.subnav a[href^="#"]'));
  if (navLinks.length) {
    const targets = navLinks
      .map((a) => ({ a, el: document.querySelector(a.getAttribute('href')) }))
      .filter((x) => x.el);
    window.addEventListener('scroll', () => {
      const y = window.scrollY + 130;
      let cur = targets[0];
      for (const item of targets) {
        if (item.el.offsetTop <= y) cur = item;
      }
      navLinks.forEach((a) => a.classList.remove('on'));
      if (cur) cur.a.classList.add('on');
    }, { passive: true });
  }

  /* ---------- Buscador en Hub ---------- */
  const hubSearch = document.getElementById('hub-search');
  const hubCards = document.querySelectorAll('#lista-guias .card');
  const hubChips = document.querySelectorAll('.hub-filter');
  let activeFilter = 'all';
  function filterHub() {
    const q = (hubSearch ? hubSearch.value : '').toLowerCase().trim();
    hubCards.forEach((c) => {
      const txt = c.textContent.toLowerCase();
      const st = c.dataset.status || 'all';
      const matchTxt = !q || txt.includes(q);
      const matchSt = activeFilter === 'all' || st === activeFilter;
      c.style.display = matchTxt && matchSt ? '' : 'none';
    });
  }
  if (hubSearch) hubSearch.addEventListener('input', filterHub);
  hubChips.forEach((ch) => {
    ch.addEventListener('click', () => {
      hubChips.forEach((x) => x.classList.remove('on'));
      ch.classList.add('on');
      activeFilter = ch.dataset.filter;
      filterHub();
    });
  });

  updateProg();
})();
