import { Component, input } from '@angular/core';
/** Хронологичен журнал на сесията: идентичност, състояние, време. */
@Component({
  selector: 'ne-masthead',
  template: `<ng-content/><div class="ledger num">
  <span>сесия <b>{{ run() }}</b></span>@if (live()) {<span class="live"><i></i>обучение</span>}
  <span>поколение <b>{{ gen() }}</b></span><span>тик <b>{{ tick() }}</b></span><span>време <b>{{ time() }}</b></span></div>`,
  styles: [`:host{display:flex;flex-wrap:wrap;gap:12px 24px;align-items:center;justify-content:space-between;padding:12px 24px;background:rgba(12,45,58,.85);backdrop-filter:blur(8px);border-bottom:1px solid var(--rule);position:sticky;top:env(safe-area-inset-top,0);z-index:5}
  .ledger{display:flex;flex-wrap:wrap;gap:8px 24px;font:400 var(--t-1)/1.3 var(--font-data);color:var(--dim)}
  b{color:var(--text);font-weight:500;display:inline-block;min-width:5ch;text-align:right}
  .live{display:inline-flex;gap:8px;align-items:center;color:var(--mint)}.live i{width:8px;height:8px;border-radius:50%;background:var(--mint);box-shadow:0 0 10px var(--mint);animation:p 1.6s ease-in-out infinite}
  @keyframes p{50%{opacity:.3}}`],
})
export class NeMasthead { run = input('—'); gen = input('0000'); tick = input('00000'); time = input('00:00'); live = input(false); }
