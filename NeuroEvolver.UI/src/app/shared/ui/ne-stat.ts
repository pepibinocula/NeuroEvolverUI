import { Component, input } from '@angular/core';
@Component({
  selector: 'ne-stat',
  template: `<span class="v">{{ value() }}</span><span class="l">{{ label() }}</span>@if (delta()) {<span class="d" [class.down]="delta()!.startsWith('−')">{{ delta() }}</span>}`,
  styles: [`:host{display:grid;gap:4px}.v{font:500 var(--t2)/1.1 var(--font-data);font-variant-numeric:tabular-nums;color:var(--mint)}
  .l{font-size:var(--t-1);color:var(--dim)}.d{font:400 var(--t-1)/1 var(--font-data);color:var(--magenta)}.d.down{color:var(--warn)}`],
})
export class NeStat { label = input.required<string>(); value = input.required<string>(); delta = input<string>(); }
