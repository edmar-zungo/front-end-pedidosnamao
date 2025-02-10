import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { ExposeTokenService } from './expose-token.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private authService: ExposeTokenService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    // URLs que não precisam de token
    const excludedUrls = ['/login', '/register']; // Ajuste conforme suas rotas

    // Verifica se a URL da requisição está na lista de exceções
    if (excludedUrls.some(url => request.url.includes(url))) {
      return next.handle(request); // Passa a requisição sem modificar
    }

    // Obtém o token do usuário
    const token = this.authService.getToken();

    // Se o token existir, adiciona-o ao cabeçalho da requisição
    if (token) {
      const clonedRequest = request.clone({
        setHeaders: {
          Authorization: `Bearer ${token}` // Adiciona o token no cabeçalho Authorization
        }
      });

      // Passa a requisição modificada para o próximo handler
      return next.handle(clonedRequest);
    }

    // Se não houver token, passa a requisição original
    return next.handle(request);
  }
}