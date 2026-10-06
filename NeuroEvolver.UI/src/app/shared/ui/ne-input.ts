import { Component, input, model } from '@angular/core';
@Component({
  selector: 'ne-input',
  template: `<label><span>{{ label() }}</span><input [class.mono]="mono()" [value]="value()" [placeholder]="placeholder()" [attr.aria-invalid]="error() ? true : null" (input)="value.set($any($event.target).value)">@if (error()) {<em>{{ error() }}</em>}</label>`,
  styles: [`label{display:grid;gap:8px;font-size:var(--t-1);color:var(--dim)}
  input{font:400 var(--t0)/1.4 var(--font-ui);color:var(--text);background:var(--ground);border:1px solid var(--rule);border-radius:var(--r);padding:10px 12px;width:100%}
  input:hover{border-color:var(--dim)}input:focus{border-color:var(--magenta);outline:none;box-shadow:0 0 0 1px var(--magenta)}
  input.mono{font-family:var(--font-data)}input[aria-invalid=true]{border-color:var(--warn)}em{color:var(--warn);font-style:normal}`],
})
export class NeInput { label = input.required<string>(); value = model(''); placeholder = input(''); error = input(''); mono = input(false); }
