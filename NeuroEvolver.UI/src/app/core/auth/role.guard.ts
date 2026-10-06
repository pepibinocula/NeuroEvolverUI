import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Role } from '../models/contracts';
import { RoleService } from './role.service';
export const roleGuard: CanActivateFn = (route) =>
  inject(RoleService).can(route.data['roles'] as Role[] | undefined) || inject(Router).createUrlTree(['/gallery']);
