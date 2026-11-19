/* EDUCATE_RD — interactividad compartida
   - .quiz con .opt[data-ok="1"]  → clic marca bien/mal y muestra .why
   - .quiz con .reveal            → botón muestra .sol (predecir salida)
   - .fc                          → clic abre/cierra la tarjeta
   - .prog                        → cuenta quizzes resueltos + flashcards abiertas
*/
(function () {
  const prog = document.querySelector('.prog span');
  function updateProg() {
    if (!prog) return;
    const done = document.querySelectorAll('.quiz.done').length;
    const total = document.querySelectorAll('.quiz').length;
    const open = document.querySelectorAll('.fc.open').length;
    const ftotal = document.querySelectorAll('.fc').length;
    prog.innerHTML = `<b>${done}/${total}</b> ejercicios · <b>${open}/${ftotal}</b> tarjetas`;
  }

  document.querySelectorAll('.quiz').forEach((q) => {
    const opts = q.querySelectorAll('.opt');
    if (opts.length) {
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
    }
    const rev = q.querySelector('.reveal');
    if (rev) {
      rev.addEventListener('click', () => {
        q.classList.add('done');
        updateProg();
      });
    }
  });

  document.querySelectorAll('.fc').forEach((c) => {
    c.addEventListener('click', () => {
      c.classList.toggle('open');
      updateProg();
    });
  });

  updateProg();
})();
