import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NePanel } from '../../shared/ui';
@Component({
  selector: 'ne-placeholder-page', imports: [NePanel],
  template: `<ne-panel [title]="d['title']" [meta]="d['week']"><p>{{ d['note'] }}</p></ne-panel>`,
  styles: [`p{margin:0;color:var(--dim);max-width:62ch}`],
})
export class PlaceholderPage { d = inject(ActivatedRoute).snapshot.data; }
