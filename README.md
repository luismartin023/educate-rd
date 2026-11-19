# EDUCATE_RD

Sistema de guías de estudio de la UCE. Cada guía destila lo que cae en el
examen — patrones, trampas y casos reales resueltos — en dos formatos que
se complementan:

- **`index.html`** — guía interactiva: plan de estudio, código para
  memorizar, trampas marcadas, casos del profesor como quiz y tarjetas.
- **`*.pdf`** — refuerzo denso (≈5 páginas): tablas completas, todo el
  código y respuestas rápidas para repasar en papel o teléfono.

Sitio publicado con GitHub Pages en:
`https://luismartin023.github.io/<repo>/`

## Estructura

```
EDUCATE_RD/
├── index.html                  ← hub: lista de materias y guías
├── assets/
│   ├── css/educate.css         ← sistema visual compartido
│   ├── js/educate.js           ← quiz, tarjetas, progreso
│   └── media/                  ← logo-mark.png, favicon.ico, apple-touch-icon.png
└── materias/
    └── isw-131-algoritmos/
        └── examen-2/
            ├── index.html              ← guía interactiva
            ├── guia-isw131-examen2.pdf ← PDF de refuerzo
            └── _pdf_guia.html          ← fuente del PDF
```

## Agregar una guía nueva

1. Crear `materias/<materia>/<examen>/`.
2. Copiar una guía existente como base y reemplazar el contenido
   (mantener los componentes: `.quiz`, `.fc`, `.trap`, `.key`, `.tip`).
3. El PDF: editar `_pdf_guia.html` y exportar con Chrome headless:
   ```
   chrome --headless --no-pdf-header-footer \
     --print-to-pdf="guia-<materia>-<examen>.pdf" "_pdf_guia.html"
   ```
4. Agregar la tarjeta en el `index.html` del hub (bloque `#lista-guias`).

## Convenciones

- Sin frameworks: HTML + CSS + JS puro. Carga directo en GitHub Pages
  y cualquiera puede editarlo.
- Las guías comparten `assets/css/educate.css` y `assets/js/educate.js`
  por ruta relativa (`../../../assets/...`).
- Componentes del sistema visual: `card`, `quiz` (con `.opt[data-ok]`),
  `fc` (flashcard), `trap`/`key`/`tip` (callouts), `tbl` (tablas).
- Contenido destilado, no documentación: si algo no puede caer en el
  examen, no va en la guía.
