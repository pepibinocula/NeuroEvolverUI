import { Component, input } from '@angular/core';
/** Панел с мерници по ъглите. Само за симулационни платна и Brain Flow. */
@Component({
  selector: 'ne-panel', host: { '[class.flush]': 'flush()' },
  template: `@if (title()) {<div class="cap"><span>{{ title() }}</span><span>{{ meta() }}</span></div>}<div class="body"><ng-content/></div>`,
  styles: [`:host{display:block;position:relative;background:var(--panel);border:1px solid var(--rule);color:var(--magenta)}
  :host::before{content:"";position:absolute;inset:-1px;pointer-events:none;background:
   linear-gradient(currentColor,currentColor) 0 0/14px 2px,linear-gradient(currentColor,currentColor) 0 0/2px 14px,
   linear-gradient(currentColor,currentColor) 100% 0/14px 2px,linear-gradient(currentColor,currentColor) 100% 0/2px 14px,
   linear-gradient(currentColor,currentColor) 0 100%/14px 2px,linear-gradient(currentColor,currentColor) 0 100%/2px 14px,
   linear-gradient(currentColor,currentColor) 100% 100%/14px 2px,linear-gradient(currentColor,currentColor) 100% 100%/2px 14px;background-repeat:no-repeat}
  :host.flush .body{padding:0}.cap{display:flex;justify-content:space-between;padding:8px 16px;border-bottom:1px solid var(--rule);color:var(--dim);font:400 var(--t-1)/1 var(--font-data)}
  .body{color:var(--text);padding:var(--s5)}`],
})
export class NePanel { title = input(''); meta = input(''); flush = input(false); }
