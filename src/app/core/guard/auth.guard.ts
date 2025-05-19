import { inject } from '@angular/core'
import { CanActivateFn, Router } from '@angular/router'
import { AuthService } from '../service/auth.service'

export const authGuard: CanActivateFn = (route, state) => {
  return inject(AuthService).isloggedIn
    ? true
    : inject(Router).createUrlTree(['/login'])
}

export const outGuard: CanActivateFn = (route, state) => {
  return inject(AuthService).isloggedIn
    ? inject(Router).createUrlTree(['/dashboard'])
    : true
}
