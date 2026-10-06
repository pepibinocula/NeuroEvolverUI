import { Injectable } from '@angular/core';
import { Observable, of, delay } from 'rxjs';
import { EnvironmentSummary } from '../models/contracts';

/** Всяко извикване към бекенда минава през този договор. Подменя се с HttpEnvironmentApi. */
export abstract class EnvironmentApi {
  abstract list(): Observable<EnvironmentSummary[]>;
}
@Injectable()
export class MockEnvironmentApi extends EnvironmentApi {
  list() {
    return of<EnvironmentSummary[]>([
      { id: 'e1', name: 'Заледен хребет', description: 'Хлъзгав склон с дърво на върха.', rating: 4.6, runs: 128, status: 'published' },
      { id: 'e2', name: 'Наводнена пещера', description: 'Изходът се достига само с плуване.', rating: 4.1, runs: 54, status: 'published' },
    ]).pipe(delay(250));
  }
}
