import { Component, ViewEncapsulation, input } from '@angular/core';
@Component({
  selector: 'button[neButton]', template: '<ng-content/>', encapsulation: ViewEncapsulation.None,
  host: { '[class]': '"ne-btn ne-btn--" + variant()' },
  styles: [`.ne-btn{font:500 var(--t0)/1 var(--font-ui);padding:11px 18px;border-radius:0;clip-path:var(--cut);border:0;cursor:pointer;transition:background var(--dur) var(--ease),border-color var(--dur) var(--ease),box-shadow var(--dur) var(--ease)}
  .ne-btn--primary{background:var(--mint);color:#04241C}.ne-btn--primary:hover{background:#7dffe0}.ne-btn:active{transform:translateY(1px)}
  .ne-btn--secondary{background:transparent;color:var(--text);box-shadow:inset 0 0 0 1px var(--rule)}.ne-btn--secondary:hover{box-shadow:inset 0 0 0 1px var(--magenta)}
  .ne-btn--ghost{background:transparent;color:var(--dim)}.ne-btn--ghost:hover{color:var(--text);background:var(--raised)}
  .ne-btn--danger{background:transparent;color:var(--warn);box-shadow:inset 0 0 0 1px var(--warn)}
  .ne-btn:disabled{opacity:.4;cursor:not-allowed;box-shadow:none}`],
})
export class NeButton { variant = input<'primary' | 'secondary' | 'ghost' | 'danger'>('primary'); }
