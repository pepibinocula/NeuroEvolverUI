import { Component, signal } from '@angular/core';
import { NeButton, NeCard, NeInput, NePanel, NeStat, NeTabs, NeTab } from '../../shared/ui';

@Component({
  selector: 'ne-style-guide', imports: [NeButton, NeCard, NeInput, NePanel, NeStat, NeTabs],
  template: `
  <section class="hero">
    <svg viewBox="0 0 320 180" aria-hidden="true">
      @for (e of edges; track $index) {<line [attr.x1]="e[0]" [attr.y1]="e[1]" [attr.x2]="e[2]" [attr.y2]="e[3]" [style.animation-delay.s]="$index * .18"/>}
      @for (n of nodes; track $index) {<circle [attr.cx]="n[0]" [attr.cy]="n[1]" r="6" [class.hot]="n[2]"/>}
    </svg>
    <div><h1>Стилов наръчник</h1><p>Цветове, шрифтове и компоненти на NeuroEvolver.UI. Всичко чете от променливи, затова страниците наследяват една и съща идентичност.</p></div>
  </section>

  <h2>Цветове</h2>
  <div class="grid">
    @for (c of colors; track c[0]) {<div class="sw"><div [style.background]="'var(--' + c[0] + ')'"></div><span><b>{{ c[0] }}</b> {{ c[1] }}<br>{{ c[2] }}</span></div>}
  </div>

  <h2>Показатели</h2>
  <ne-panel title="Обучение" meta="сесия 7f3a"><div class="grid">
    <ne-stat label="Поколение" value="0142"/><ne-stat label="Най-добра годност" value="318.42" delta="+12.60"/>
    <ne-stat label="Видове" value="7" delta="−2"/><ne-stat label="Възли в мозъка" value="34"/></div></ne-panel>

  <h2>Бутони</h2>
  <div class="row"><button neButton>Стартирай обучение</button><button neButton variant="secondary">Запази същество</button>
    <button neButton variant="ghost">Отказ</button><button neButton variant="danger">Отхвърли среда</button><button neButton disabled>Стартирай обучение</button></div>

  <h2>Полета</h2>
  <div class="grid"><ne-input label="Име на средата" [(value)]="name"/><ne-input label="Цел" placeholder="Иди до дървото и го удряй, докато се счупи"/>
    <ne-input label="Начално число" value="0x7F3A21" [mono]="true"/><ne-input label="Банер" value="banner.bmp" error="Използвайте PNG или JPG до 2 МБ."/></div>

  <h2>Карти</h2>
  <div class="grid"><ne-card heading="Заледен хребет" text="Хлъзгав склон с дърво на върха."><span class="num rt">4.6 оценка · 128 опита</span></ne-card>
    <ne-card heading="Наводнена пещера" text="Изходът се достига само с плуване."><span class="num rt">4.1 оценка · 54 опита</span></ne-card></div>

  <h2>Табове</h2>
  <ne-tabs [tabs]="tabs" [(value)]="tab"/>
  <p class="dim">@switch (tab()) { @case ('f') {Най-добра и средна годност за всяко поколение.} @case ('s') {Видове, групирани по сходство на геномите.} @default {Няма блокиращи проблеми в тази сесия.} }</p>`,
  styles: [`:host{display:grid;gap:24px}h2{margin:16px 0 0;font-size:var(--t1);padding-bottom:8px;border-bottom:1px solid var(--rule)}
  h1{margin:0 0 8px;font-size:2rem;line-height:1.1;font-family:var(--font-display);font-weight:700;letter-spacing:-.02em}
  .hero{display:grid;grid-template-columns:minmax(0,320px) 1fr;gap:32px;align-items:center}.hero p{color:var(--dim);max-width:56ch;margin:0}
  svg line{stroke:var(--rule);stroke-width:1.5;stroke-dasharray:6 8;animation:flow 2.4s linear infinite}
  svg circle{fill:var(--mint)}svg circle.hot{fill:var(--magenta);filter:drop-shadow(0 0 6px var(--magenta))}
  @keyframes flow{to{stroke-dashoffset:-28;stroke:var(--mint)}}
  .grid{display:grid;gap:16px;grid-template-columns:repeat(auto-fit,minmax(200px,1fr))}.row{display:flex;flex-wrap:wrap;gap:12px}
  .sw{border:1px solid var(--rule);border-radius:var(--r);overflow:hidden;font:var(--t-1)/1.4 var(--font-data);color:var(--dim)}
  .sw div{height:56px}.sw span{display:block;padding:8px 12px}.sw b{color:var(--text);font-weight:500}.rt{color:var(--magenta);font-size:var(--t-1)}.dim{color:var(--dim);margin:0}
  @media(max-width:700px){.hero{grid-template-columns:1fr}}`],
})
export class StyleGuidePage {
  name = signal('Заледен хребет'); tab = signal('f');
  tabs: NeTab[] = [{ id: 'f', label: 'Годност' }, { id: 's', label: 'Видове' }, { id: 'd', label: 'Диагностика' }];
  colors = [['ground', '#06202A', 'фон'], ['panel', '#0C2D3A', 'повърхности'], ['rule', '#1F5468', 'линии'], ['mint', '#2EF2C0', 'действие, живо състояние'], ['magenta', '#FF4F9A', 'данни, избор, фокус'], ['warn', '#FFC24B', 'само грешки']];
  nodes = [[30, 40, 0], [30, 90, 0], [30, 140, 0], [110, 25, 0], [110, 70, 1], [110, 115, 0], [110, 155, 0], [200, 55, 0], [200, 105, 1], [200, 150, 0], [290, 70, 0], [290, 130, 1]];
  edges = [[30, 40, 110, 70], [30, 90, 110, 70], [30, 90, 110, 115], [30, 140, 110, 115], [110, 70, 200, 55], [110, 70, 200, 105], [110, 115, 200, 105], [110, 115, 200, 150], [200, 105, 290, 70], [200, 105, 290, 130], [200, 55, 290, 70]];
}
