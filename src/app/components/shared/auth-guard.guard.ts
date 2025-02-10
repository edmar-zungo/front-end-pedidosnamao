import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    
    // Verifica se o usuário está autenticado
    const isAuthenticated = this.isAuthenticated();

    if (isAuthenticated) {
      return true; // Permite o acesso à rota
    } else {
      // Redireciona para a página de login se não estiver autenticado
      this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
      return false;
    }
  }

    // Verifica se o usuário está autenticado
    isAuthenticated(): boolean {
      // Exemplo: Verifica se há um token no localStorage
      return !!localStorage.getItem('token');
    }
}