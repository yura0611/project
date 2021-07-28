import { HttpClient, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs/internal/Observable";

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const userToken = req.headers.get('x-auth-token')
    console.log(userToken)
    const modifiedReq = req.clone({
      headers: req.headers.set('Authorization', `${userToken}`),
    });
    return next.handle(req);
  }
}
