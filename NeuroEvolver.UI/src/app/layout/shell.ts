import { Component, computed, inject, signal } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { RoleService, ROLE_LABEL } from '../core/auth/role.service';
import { Role } from '../core/models/contracts';
import { NeMasthead } from '../shared/ui';

interface Item { path: string; label: string; no: string; roles?: Role[]; }
const NAV: Item[] = [
  { path: 'gallery', label: 'Галерия', no: '01' }, { path: 'designer', label: 'Дизайнер', no: '02' },
  { path: 'training', label: 'Обучение', no: '03' }, { path: 'learn', label: 'Учи', no: '04' },
  { path: 'admin', label: 'Модерация', no: '··', roles: ['admin'] }, { path: 'dev/submit', label: 'Нова среда', no: '··', roles: ['dev'] },
  { path: 'styleguide', label: 'Стилове', no: '··', roles: ['dev'] },
];
@Component({
  selector: 'ne-shell', imports: [RouterOutlet, RouterLink, RouterLinkActive, NeMasthead],
  host: { '(window:keydown)': 'gk($event)' },
  template: `
  <aside class="rail"><a class="logo" routerLink="/gallery" aria-label="NeuroEvolver">N</a>
    <nav aria-label="Основна навигация">@for (n of nav(); track n.path) {<a [routerLink]="n.path" routerLinkActive="on"><span class="no num">{{ n.no }}</span><span class="tx">{{ n.label }}</span></a>}</nav>
    <label class="role"><span class="tx">Роля</span><select [value]="roles.role()" (change)="roles.set($any($event.target).value)">@for (r of all; track r) {<option [value]="r">{{ label[r] }}</option>}</select></label></aside>
  <div class="col">
    <ne-masthead run="7f3a" gen="0000" tick="00000" time="00:00" [live]="true"><strong>NeuroEvolver</strong>
      <button class="k" (click)="show()">Команди <kbd>Ctrl K</kbd></button></ne-masthead>
    <main><router-outlet/></main></div>
  @if (open()) {<div class="scrim" (click)="open.set(false)"><div class="pal" role="dialog" aria-label="Команди" (click)="$event.stopPropagation()">
    <input id="pq" placeholder="Къде да отидем?" [value]="q()" (input)="q.set($any($event.target).value); i.set(0)" (keydown)="pk($event)">
    <ul>@for (n of hits(); track n.path; let k = $index) {<li [class.sel]="k === i()" (click)="go(n)">{{ n.label }}<span class="num">{{ n.path }}</span></li>} @empty {<li class="none">Няма съвпадения</li>}</ul></div></div>}`,
  styles: [`:host{display:block}
  .rail{position:fixed;inset:0 auto 0 0;width:76px;z-index:20;background:var(--ground);border-right:1px solid var(--rule);display:flex;flex-direction:column;padding:16px 0;overflow:hidden;transition:width .22s var(--ease)}
  .rail:hover,.rail:focus-within{width:220px}
  .logo{font:700 1.4rem/1 var(--font-display);color:var(--mint);padding:8px 26px 28px;text-decoration:none}
  nav{display:grid;gap:2px;flex:1;align-content:start}nav a{display:flex;gap:16px;align-items:center;padding:12px 22px;color:var(--dim);text-decoration:none;white-space:nowrap;border-left:2px solid transparent}
  nav a:hover{color:var(--text);background:var(--panel)}nav a.on{color:var(--text);border-color:var(--mint)}.no{font-size:var(--t-1);width:28px;color:var(--mint)}
  .tx{opacity:0;transition:opacity .15s}.rail:hover .tx,.rail:focus-within .tx{opacity:1}
  .role{padding:12px 16px;display:grid;gap:6px;font-size:var(--t-1);color:var(--dim);white-space:nowrap}select{background:var(--panel);color:var(--text);border:1px solid var(--rule);padding:6px;font:inherit}
  .col{margin-left:76px}strong{font:700 .95rem var(--font-display);letter-spacing:-.01em}
  .k{background:none;border:0;color:var(--dim);font:inherit;font-size:var(--t-1);cursor:pointer;margin-left:16px}.k:hover{color:var(--text)}
  kbd{font:400 .7rem var(--font-data);border:1px solid var(--rule);padding:2px 6px;margin-left:6px}
  main{max-width:1180px;margin:0 auto;padding:40px 28px 96px}
  .scrim{position:fixed;inset:0;z-index:50;background:rgba(2,8,11,.7);display:grid;justify-items:center;align-content:start;padding-top:14vh}
  .pal{width:min(520px,92vw);background:var(--panel);border:1px solid var(--rule);clip-path:var(--cut);animation:in .16s var(--ease)}
  .pal input{width:100%;background:none;border:0;border-bottom:1px solid var(--rule);color:var(--text);font:400 1.1rem var(--font-ui);padding:16px 18px}.pal input:focus{outline:none;border-color:var(--magenta)}
  ul{list-style:none;margin:0;padding:6px}li{display:flex;justify-content:space-between;padding:10px 12px;cursor:pointer;color:var(--dim)}li.sel,li:hover{background:var(--raised);color:var(--text)}li span{font-size:var(--t-1)}
  @keyframes in{from{opacity:0;transform:translateY(-6px)}}
  @media(max-width:760px){.rail,.rail:hover,.rail:focus-within{inset:auto 0 0 0;width:auto;height:64px;flex-direction:row;padding:0;border-right:0;border-top:1px solid var(--rule)}
    .logo,.role{display:none}nav{display:flex;flex:1;justify-content:space-around}nav a{flex-direction:column;gap:2px;padding:8px;border-left:0;font-size:.65rem}.tx{opacity:1}
    .col{margin-left:0;padding-bottom:72px}main{padding:24px 16px}}`],
})
export class Shell {
  roles = inject(RoleService); router = inject(Router); label = ROLE_LABEL; all: Role[] = ['user', 'admin', 'dev'];
  nav = computed(() => NAV.filter(n => this.roles.can(n.roles)));
  open = signal(false); q = signal(''); i = signal(0);
  hits = computed(() => this.nav().filter(n => n.label.toLowerCase().includes(this.q().toLowerCase())));
  show() { this.q.set(''); this.i.set(0); this.open.set(true); setTimeout(() => document.getElementById('pq')?.focus()); }
  go(n: Item) { this.open.set(false); this.router.navigateByUrl('/' + n.path); }
  gk(e: KeyboardEvent) { if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') { e.preventDefault(); this.show(); } }
  pk(e: KeyboardEvent) {
    const h = this.hits();
    if (e.key === 'Escape') this.open.set(false);
    if (e.key === 'ArrowDown') { e.preventDefault(); this.i.set((this.i() + 1) % Math.max(h.length, 1)); }
    if (e.key === 'ArrowUp') { e.preventDefault(); this.i.set((this.i() + h.length - 1) % Math.max(h.length, 1)); }
    if (e.key === 'Enter' && h[this.i()]) this.go(h[this.i()]);
  }
}
