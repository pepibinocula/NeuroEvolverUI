import { Injectable, signal } from '@angular/core';
import { Role } from '../models/contracts';
export const ROLE_LABEL: Record<Role, string> = { user: 'Потребител', admin: 'Администратор', dev: 'Разработчик' };
@Injectable({ providedIn: 'root' })
export class RoleService {
  readonly role = signal<Role>('user');
  set(r: Role) { this.role.set(r); }
  can(allowed?: Role[]) { return !allowed || allowed.includes(this.role()); }
}
