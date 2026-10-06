import { Injectable } from '@angular/core';
import { Observable, interval, map, share } from 'rxjs';

export interface SimFrame { tick: number; generation: number; best: number; mean: number; species: number; }
/** Договор за потока от симулацията. Реалната реализация ще е SignalR. */
export abstract class SimulationApi { abstract frames$: Observable<SimFrame>; }
@Injectable()
export class MockSimulationApi extends SimulationApi {
  frames$ = interval(100).pipe(map(tick => {
    const g = Math.floor(tick / 20), best = 320 * (1 - Math.exp(-g / 8)) + Math.sin(g * 1.7) * 6;
    return { tick, generation: g, best: Math.max(0, best), mean: Math.max(0, best * .62 + Math.cos(g * 1.3) * 5), species: 3 + Math.round(4 * Math.abs(Math.sin(g / 4))) };
  }), share());
}
