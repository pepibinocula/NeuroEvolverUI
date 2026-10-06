import { Routes } from '@angular/router';
import { Shell } from './layout/shell';
import { roleGuard } from './core/auth/role.guard';

const page = () => import('./features/placeholder/placeholder.page').then(m => m.PlaceholderPage);
export const routes: Routes = [{
  path: '', component: Shell, children: [
    { path: '', pathMatch: 'full', redirectTo: 'gallery' },
    { path: 'gallery', loadComponent: page, data: { title: 'Галерия на среди', week: 'седмица 2', note: 'Карти с банер, оценка и бутон за докладване. Данните идват от EnvironmentApi.' } },
    { path: 'admin', loadComponent: page, canActivate: [roleGuard], data: { roles: ['admin'], title: 'Опашка за модерация', week: 'седмица 2', note: 'Чакащи среди с одобряване и отхвърляне, плюс списък с доклади.' } },
    { path: 'dev/submit', loadComponent: page, canActivate: [roleGuard], data: { roles: ['dev'], title: 'Подаване на среда', week: 'седмица 2', note: 'Име, описание, банер и файл с данни за средата.' } },
    { path: 'training', loadComponent: () => import('./features/training/training.page').then(m => m.TrainingPage) },
    { path: 'designer', loadComponent: page, data: { title: 'Дизайнер на същества', week: 'седмица 3', note: 'Палитра с части, панел със свойства и лента с инструменти.' } },
    { path: 'learn', loadComponent: page, data: { title: 'Учи', week: 'седмица 3', note: 'Странична навигация, съдържание и стъпков урок.' } },
    { path: 'styleguide', canActivate: [roleGuard], data: { roles: ['dev'] }, loadComponent: () => import('./features/style-guide/style-guide.page').then(m => m.StyleGuidePage) },
  ],
}, { path: '**', redirectTo: 'gallery' }];
