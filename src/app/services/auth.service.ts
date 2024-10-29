import { inject, Injectable } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from '@angular/fire/auth';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private _auth: Auth = inject(Auth);
  private _router: Router = inject(Router);

  public login(email: string, password: string) {
    return signInWithEmailAndPassword(this._auth, email, password).then(() => this._router.navigate(['/']));
  }

  public signUp(email: string, password: string) {
    return createUserWithEmailAndPassword(this._auth, email, password).then(() => this._router.navigate(['/']));
  }

  public async logout() {
    return this._auth.signOut().then(()=>this._router.navigate(['/login']));
  }
}
