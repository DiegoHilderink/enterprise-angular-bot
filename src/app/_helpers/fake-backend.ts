import { Injectable } from '@angular/core';
import { HttpRequest, HttpResponse, HttpHandler, HttpEvent, HttpInterceptor, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { delay, mergeMap, materialize, dematerialize } from 'rxjs/operators';

import { User, Role } from '../_models';

const users: User[] = [
    { id: 1,  password: 'admin', firstName: 'Admin', lastName: 'User', phone: 699766721, email: 'admin@email.com',role: Role.Admin, empresa: '' },
    { id: 2,  password: 'rentel', firstName: 'Rentel-wifi', lastName: 'User', phone: 699766721, email: 'rentel@email.com', role: Role.Empresa, empresa: 'Rentel-wifi' },
    { id: 3,  password: 'rentel', firstName: 'Rentel-comunicaciones', lastName: 'User', phone: 699766721, email: 'rentel_conf@email.com', role: Role.Empresa, empresa: 'Rentel-comunicaciones' },
    { id: 4,  password: 'rentel', firstName: 'Empresa 4', lastName: 'User', phone: 699766721, email: 'emp4@email.com', role: Role.Empresa, empresa: '' },
    { id: 5,  password: 'rentel', firstName: 'Empresa 5', lastName: 'User', phone: 699766721, email: 'emp5@email.com', role: Role.Empresa, empresa: '' },
    { id: 6,  password: 'user', firstName: 'User', lastName: 'user', phone: 699766721, email: 'user1@email.com', role: Role.User, empresa: 'Rentel-wifi' },
    { id: 7,  password: 'user', firstName: 'Normal', lastName: 'User', phone: 699766721, email: 'user2@email.com', role: Role.User, empresa: 'Rentel-wifi' },
    { id: 8,  password: 'user', firstName: 'Normal', lastName: 'User', phone: 699766721, email: 'user3@email.com', role: Role.User, empresa: 'Rentel-wifi' },
    { id: 9,  password: 'user', firstName: 'Normal', lastName: 'User', phone: 699766721, email: 'user4@email.com', role: Role.User, empresa: 'Rentel-wifi' },
    { id: 10, password: 'user', firstName: 'Normal', lastName: 'User', phone: 699766721, email: 'user5@email.com', role: Role.User, empresa: 'Rentel-wifi' }
];

@Injectable()
export class FakeBackendInterceptor implements HttpInterceptor {
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const { url, method, headers, body } = request;

        // wrap in delayed observable to simulate server api call
        return of(null)
            .pipe(mergeMap(handleRoute))
            .pipe(materialize()) // call materialize and dematerialize to ensure delay even if an error is thrown (https://github.com/Reactive-Extensions/RxJS/issues/648)
            .pipe(delay(500))
            .pipe(dematerialize());

        function handleRoute() {
            switch (true) {
                case url.endsWith('/users/authenticate') && method === 'POST':
                    return authenticate();
                case url.endsWith('/users') && method === 'GET':
                    return getUsers();
                case url.match(/\/users\/\d+$/) && method === 'GET':
                    return getUserById();
                case url.match('\/emp\/.+') && method === 'GET':
                    console.log('existo')
                    return getUserByEmpresa();
                default:
                    // pass through any requests not handled above
                    return next.handle(request);
            }

        }

        // route functions

        function authenticate() {
            const { email, password } = body;
            const user = users.find(x => x.email === email && x.password === password);
            if (!user) return error('Username or password is incorrect');
            return ok({
                id: user.id,
                email: user.email,
                firstName: user.firstName,
                lastName: user.lastName,
                role: user.role,
                token: `fake-jwt-token.${user.id}`,
                empresa: user.empresa
            });
        }

        function getUsers() {
            if (!isAdmin()) return unauthorized();
            return ok(users);
        }

        function getUserById() {
            if (!isLoggedIn()) return unauthorized();

            // only admins can access other user records
            if (!isAdmin() && currentUser().id !== idFromUrl()) return unauthorized();

            const user = users.find(x => x.id === idFromUrl());
            return ok(user);
        }

        function getUserByEmpresa() {
            if (!isLoggedIn()) {
                console.log('2oD')
                return unauthorized();
            }
            
            // only admins can access other user records
            if ((!isAdmin() || !isEmpresa()) && currentUser().empresa !== empFromUrl()) {
                console.log('2oD')
                return unauthorized();
            }

            var user = [];
            users.forEach(k => {
                if (k.empresa === empFromUrl()){
                    user.push(k)
                }
            });
            return ok(user);
        }

        // helper functions

        function ok(body) {
            return of(new HttpResponse({ status: 200, body }));
        }

        function unauthorized() {
            return throwError({ status: 401, error: { message: 'unauthorized' } });
        }

        function error(message) {
            return throwError({ status: 400, error: { message } });
        }

        function isLoggedIn() {
            const authHeader = headers.get('Authorization') || '';
            return authHeader.startsWith('Bearer fake-jwt-token');
        }

        function isAdmin() {
            return isLoggedIn() && currentUser().role === Role.Admin;
        }

        function isEmpresa() {
            return isLoggedIn() && currentUser().role === Role.Empresa;
        }

        function currentUser() {
            if (!isLoggedIn()) return;
            const id = parseInt(headers.get('Authorization').split('.')[1]);
            return users.find(x => x.id === id);
        }

        function idFromUrl() {
            const urlParts = url.split('/');
            return parseInt(urlParts[urlParts.length - 1]);
        }

        function empFromUrl() {
            const urlParts = url.split('/');
            return urlParts[urlParts.length - 1];
        }

        /**Registro de usuarios 
         * function singIn(){
         * } */
    }
}

export const fakeBackendProvider = {
    // use fake backend in place of Http service for backend-less development
    provide: HTTP_INTERCEPTORS,
    useClass: FakeBackendInterceptor,
    multi: true
};