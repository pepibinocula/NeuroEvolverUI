import { Component, input } from '@angular/core';
@Component({
  selector: 'ne-card',
  template: `<div class="banner"><ng-content select="[banner]"/></div><div class="meta"><h4>{{ heading() }}</h4><p>{{ text() }}</p><ng-content/></div>`,
  styles: [`:host{display:grid;background:var(--panel);border:1px solid var(--rule);border-radius:var(--r);overflow:hidden;transition:border-color var(--dur) var(--ease)}
  :host:hover{border-color:var(--mint)}
  .banner{aspect-ratio:16/7;background:linear-gradient(135deg,rgba(46,242,192,.25),rgba(255,79,154,.25)),repeating-linear-gradient(135deg,var(--raised) 0 10px,var(--panel) 10px 20px)}
  .meta{padding:var(--s4);display:grid;gap:var(--s2)}h4{margin:0;font-size:var(--t1);font-weight:600}p{margin:0;color:var(--dim)}`],
})
export class NeCard { heading = input.required<string>(); text = input(''); }
