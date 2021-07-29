import { HttpClient, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { CookieService } from "ngx-cookie-service";
import { Observable } from "rxjs";

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(
    private cookieService: CookieService,
  ) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

      const userToken: string = this.cookieService.get('auth-token')
      console.log('from interceptor',userToken)
      if (userToken) {
        const modifiedReq = req.clone({
          headers: req.headers.set('Authorization', userToken),
        });
        return next.handle(modifiedReq);
      }
  }
}
