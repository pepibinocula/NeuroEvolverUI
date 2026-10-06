import { Component, input, model } from '@angular/core';
export interface NeTab { id: string; label: string; }
@Component({
  selector: 'ne-tabs',
  template: `<div role="tablist" (keydown)="key($event)">@for (t of tabs(); track t.id) {<button role="tab" [attr.aria-selected]="t.id === value()" [tabindex]="t.id === value() ? 0 : -1" (click)="value.set(t.id)">{{ t.label }}</button>}</div>`,
  styles: [`div{display:flex;gap:var(--s4);border-bottom:1px solid var(--rule)}
  button{background:none;border:0;border-bottom:2px solid transparent;color:var(--dim);font:500 var(--t0)/1 var(--font-ui);padding:12px 2px;cursor:pointer;margin-bottom:-1px}
  button[aria-selected=true]{color:var(--text);border-color:var(--mint)}`],
})
export class NeTabs {
  tabs = input.required<NeTab[]>(); value = model.required<string>();
  key(e: KeyboardEvent) {
    const t = this.tabs(), i = t.findIndex(x => x.id === this.value());
    if (e.key === 'ArrowRight') this.value.set(t[(i + 1) % t.length].id);
    if (e.key === 'ArrowLeft') this.value.set(t[(i + t.length - 1) % t.length].id);
  }
}
