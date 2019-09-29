import {Injectable, Injector} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse} from '@angular/common/http';
import {Observable, of} from 'rxjs';


@Injectable()
export class FakeBackendInterceptor implements HttpInterceptor {
  constructor(private injector: Injector) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    for (const element of urls) {
      if (request.url === element.url) {
        console.log('Loaded from json : ' + request.url);
        return of(new HttpResponse({status: 200, body: ((element.json) as any).default}));
      }
    }
    console.log('Loaded from http call :' + request.url);
    return next.handle(request);
  }
}

const users = [
  {
    "firstName": "Tony",
    "lastName": "Stark",
    "email": "ironman@marvel.com",
    "role": "Admin",
    "phone": "0404678900",
    "id": 1
  },
  {
    "firstName": "Peter",
    "lastName": "Parker",
    "email": "spiderman@marvel.com",
    "role": "Support",
    "phone": "0204678900",
    "id": 1
  }
];
const urls = [
  {
    url: 'https://mybackend.com/users',
    json: users
  }
];

