import { Component, computed, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { scan } from 'rxjs';
import { SimFrame, SimulationApi } from '../../core/api/simulation.api';
import { NeButton, NePanel, NeStat } from '../../shared/ui';

@Component({
  selector: 'ne-training', imports: [NeButton, NePanel, NeStat],
  template: `
  <h1>Еволюция<small class="num">пок. {{ g() }}</small></h1>
  <div class="stage">
    <ne-panel [flush]="true" title="Симулация" [meta]="'живот ' + life() + ' / 80 · 10 Hz'">
      <div class="vp">
        <svg viewBox="0 0 640 300" role="img" aria-label="Съществото се движи към дървото">
          <defs><radialGradient id="gl"><stop offset="0" stop-color="#2EF2C0" stop-opacity=".22"/><stop offset="1" stop-color="#2EF2C0" stop-opacity="0"/></radialGradient></defs>
          <ellipse cx="320" cy="250" rx="360" ry="90" fill="url(#gl)"/>
          <line x1="0" y1="244" x2="640" y2="244" stroke="var(--rule)"/>
          <g stroke="var(--magenta)" fill="none" stroke-width="3"><path d="M590 244V170"/><path d="M590 190l-22-18M590 176l24-20"/></g>
          <g [style.opacity]="life() > 70 ? .25 : 1">
            @for (s of segs(); track $index) {<line [attr.x1]="s.x" [attr.y1]="s.y" [attr.x2]="s.x - 6" y2="244" stroke="var(--mint)" stroke-width="2"/><circle [attr.cx]="s.x" [attr.cy]="s.y" [attr.r]="9 - $index" fill="var(--mint)"/>}
          </g>
        </svg>
        <form class="goal" (submit)="$event.preventDefault()"><label for="goal">Цел</label>
          <input id="goal" value="Иди до дървото и го удряй, докато се счупи"><button neButton>Старт</button></form>
        <ol class="plan" aria-label="Подзадачи">@for (t of plan(); track t[0]) {<li [class]="t[1]"><span></span>{{ t[0] }}</li>}</ol>
        <div class="strip" role="img" aria-label="Годност по поколения">@for (h of hist(); track h.generation) {<i [style.height.%]="h.best / 3.4" [class.now]="h.generation === g()"></i>}</div>
      </div>
    </ne-panel>
    <aside>
      <ne-panel title="Brain Flow" meta="3-4-2">
        <svg viewBox="0 0 240 130" aria-hidden="true">
          @for (e of edges; track $index) {<line [attr.x1]="e[0]" [attr.y1]="e[1]" [attr.x2]="e[2]" [attr.y2]="e[3]" stroke="var(--magenta)" [attr.stroke-opacity]="act($index) * .8"/>}
          @for (n of nodes; track $index) {<circle [attr.cx]="n[0]" [attr.cy]="n[1]" [attr.r]="4 + act($index) * 5" fill="var(--mint)" [attr.fill-opacity]=".4 + act($index) * .6"/>}
        </svg>
      </ne-panel>
      <div class="stats"><ne-stat label="Най-добра годност" [value]="f()?.best?.toFixed(1) ?? '0.0'" delta="+"/><ne-stat label="Видове" [value]="'' + (f()?.species ?? 0)"/></div>
      <div class="diag" [class.warn]="g() >= 5" role="status">
        <b>{{ g() >= 5 ? 'Съществото не може да плува' : 'Събиране на данни' }}</b>
        <p>{{ g() >= 5 ? 'Няма крайници, способни да задвижват във вода. Добавете мускули към долната част на тялото.' : 'Диагностиката се появява, когато еволюцията забави.' }}</p>
      </div>
    </aside>
  </div>`,
  styles: [`:host{display:grid;gap:20px}
  h1{margin:0;font:700 clamp(2rem,6vw,3.6rem)/1 var(--font-display);letter-spacing:-.03em;display:flex;gap:16px;align-items:baseline}h1 small{font:400 var(--t-1)/1 var(--font-data);color:var(--mint)}
  .stage{display:grid;grid-template-columns:minmax(0,1fr) 290px;gap:20px;align-items:start}
  .vp{position:relative;min-height:440px;background:var(--ground)}.vp>svg{display:block;width:100%;height:auto}
  .goal{position:absolute;top:14px;left:14px;right:14px;display:flex;gap:10px;align-items:center;background:rgba(5,14,19,.78);padding:8px 10px;backdrop-filter:blur(6px);clip-path:var(--cut)}
  .goal label{font:400 var(--t-1) var(--font-data);color:var(--dim)}.goal input{flex:1;min-width:0;background:none;border:0;border-bottom:1px solid var(--rule);color:var(--text);font:inherit;padding:6px 2px}.goal input:focus{outline:none;border-color:var(--magenta)}
  .plan{position:absolute;left:14px;top:68px;margin:0;padding:0;list-style:none;display:grid;gap:6px;font-size:var(--t-1);color:var(--dim)}
  .plan li{display:flex;gap:8px;align-items:center}.plan span{width:8px;height:8px;border:1px solid var(--dim);transform:rotate(45deg)}
  .plan .active{color:var(--text)}.plan .active span{background:var(--mint);border-color:var(--mint);box-shadow:0 0 8px var(--mint)}.plan .done{color:var(--mint)}.plan .done span{background:var(--mint);border-color:var(--mint)}
  .strip{position:absolute;left:0;right:0;bottom:0;height:88px;display:flex;align-items:flex-end;gap:3px;padding:0 14px 0;border-top:1px solid var(--rule)}
  .strip i{flex:1;background:var(--raised);transition:height .4s var(--ease)}.strip i.now{background:var(--mint)}
  aside{display:grid;gap:16px}.stats{display:grid;grid-template-columns:1fr 1fr;gap:12px;padding:4px 2px}
  .diag{border-left:2px solid var(--rule);padding:4px 0 4px 12px;transition:border-color .3s var(--ease)}.diag.warn{border-color:var(--warn)}.diag.warn b{color:var(--warn)}.diag p{margin:4px 0 0;color:var(--dim);font-size:var(--t-1)}
  @media(max-width:900px){.stage{grid-template-columns:1fr}.vp{min-height:380px}}`],
})
export class TrainingPage {
  private f$ = inject(SimulationApi).frames$;
  f = toSignal(this.f$);
  hist = toSignal(this.f$.pipe(scan((a: SimFrame[], f) => a.at(-1)?.generation === f.generation ? [...a.slice(0, -1), f] : [...a, f].slice(-40), [])), { initialValue: [] as SimFrame[] });
  g = computed(() => this.f()?.generation ?? 0);
  life = computed(() => (this.f()?.tick ?? 0) % 80);
  segs = computed(() => { const l = this.life(); return [0, 1, 2, 3, 4].map(i => ({ x: 50 + l * 6.4 - i * 20, y: 232 - Math.abs(Math.sin(l / 3 + i)) * 12 })); });
  plan = computed<[string, string][]>(() => { const g = this.g(); return [['Намери дървото', g >= 8 ? 'done' : 'active'], ['Достигни до него', g >= 8 ? 'active' : 'pending'], ['Удряй, докато се счупи', 'pending']]; });
  nodes = [[30, 25], [30, 65], [30, 105], [90, 20], [90, 55], [90, 90], [90, 120], [150, 45], [150, 85], [210, 45], [210, 85]];
  edges = [[30, 25, 90, 20], [30, 65, 90, 55], [30, 65, 90, 90], [30, 105, 90, 90], [30, 105, 90, 120], [90, 20, 210, 45], [90, 55, 150, 45], [90, 90, 150, 85], [90, 120, 150, 85], [150, 45, 210, 45], [150, 85, 210, 85]];
  act(i: number) { return .5 + .5 * Math.sin((this.f()?.tick ?? 0) / 4 + i * 1.3); }
}
