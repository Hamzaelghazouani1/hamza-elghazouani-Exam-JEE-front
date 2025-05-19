import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { LocalStorageService } from './local-storage.service';
import { environment } from '../../../environments/environment.development';
import { JwtHelperService } from '@auth0/angular-jwt'

@Injectable({
  providedIn: 'root'
})
export class AuthService {
 private http = inject(HttpClient)
  private router = inject(Router)
  private storage = inject(LocalStorageService)

  isloggedIn: boolean = false
  loggedUser: any

  helper = new JwtHelperService()

  login(email: String, password: String) {
    return this.http.post(
      `${environment.apiUrl}/login`,
      {
        email: email,
        password: password,
      }
    )
  }

  loadToken(token: any) {
    this.checkToken(token)
  }

  logout() {
    this.loggedUser = undefined
    this.isloggedIn = false
    this.storage.removeData('token')
    this.router.navigate(['/login'])
  }

  checkToken(token: any): boolean {
    if (token != undefined) {
      if (token.access_token) {
        const decodedToken = this.helper.decodeToken(token.access_token);
        if (
          decodedToken.exp &&
          decodedToken.exp >= parseInt(Date.now() / 1000 + '')
        ) {
          this.storage.saveData('role', decodedToken.roles[0])
          this.storage.saveData('token', token)
          this.isloggedIn = true
          return true
        }
        console.warn('expired token')
      } else {
        console.error('invalid token')
        console.log(token)
      }
    }
    this.isloggedIn = false
    return false
  }

  getUserToken(token: any): any {
    if (token != undefined) {
      if (token.access_token) {
        const decoded = this.helper.decodeToken(token.access_token);
        console.log(decoded);
        if (decoded) {
          this.storage.user.set(decoded);
        }
        return decoded
      }
    }
    return undefined
  }
}
