import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {catchError, switchMap, take, tap} from 'rxjs/operators';
import { throwError, BehaviorSubject, of } from 'rxjs';
import { alert } from 'tns-core-modules/ui/dialogs';
import { RouterExtensions } from 'nativescript-angular/router';

import {
    setString,
    getString,
    hasKey,
    remove
} from 'tns-core-modules/application-settings';

import { UserModel} from "~/app/models/user.model";
import { ManagementModel} from "~/app/models/management.model";
import {VerticalAlignment} from "tns-core-modules/ui/enums";
import stretch = VerticalAlignment.stretch;
import {error} from "tns-core-modules/trace";
import {CustomerModel} from "~/app/models/customer.model";

interface AuthResponseData {
    kind: string;
    idToken: string;
    email: string;
    refreshToken: string;
    expiresIn: string;
    localId: string;
    registered?: boolean;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
    private _user = new BehaviorSubject<UserModel>(null);
    private tokenExpirationTimer: number;
    private currentUser = "customer";

    constructor(
        private http: HttpClient,
        private router: RouterExtensions
    ) {}

    static Config = {
        SIGNUP_URL: "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCJPkyI8QTDGOCgkYdaKC4OBg5HaCSlbzI",
        SIGNIN_URL: "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCJPkyI8QTDGOCgkYdaKC4OBg5HaCSlbzI",
        FIREBASE_API_KEY: "AIzaSyCJPkyI8QTDGOCgkYdaKC4OBg5HaCSlbzI",
        FIREBASE_URL:"https://mycarwash-4cf24.firebaseio.com"
    };
    get user() {
        return this._user.asObservable();
    }

    signUp(name: string, surname: string, phone: string, email: string, password: string) {
        return this.http
            .post<AuthResponseData>(
                AuthService.Config.SIGNUP_URL,
                {  email, password, returnSecureToken: true }
            )
            .pipe(
                catchError(errorRes => {
                    console.log(errorRes);
                    AuthService.handleError(errorRes.error.error.message);
                    return throwError(errorRes);
                }),
                tap(resData => {
                    if (resData && resData.idToken) {
                        alert("Your Account was created successfully").catch();
                        // this.router.navigate(['patientLogin']);
                        return this.createNewUser(name, surname, phone, email, resData)
                            .subscribe( resData => {
                                console.log(resData);
                                alert("Your Account was created successfully").catch();
                            })
                    }
                })
            );
    }

    login(email: string, password: string, users?: string[]) {
        return this.http
            .post<AuthResponseData>(
                AuthService.Config.SIGNIN_URL,
                { email: email, password: password, returnSecureToken: true }
            )
            .pipe(
                catchError(errorRes => {
                    AuthService.handleError(errorRes.error.error.message);
                    return throwError(errorRes);
                }),
                tap(resData => {
                    if (resData && resData.idToken) {
                        console.log(resData);
                        // alert("Welcome").catch();
                        if (users.indexOf(resData.localId) > -1) {
                            this.handleLogin(email, resData.idToken, resData.localId, 3600)
                        }
                    }
                })
            );
    }

    checkUserType(userType: 'customers' | 'managements') {
        return this.http.get(`${AuthService.Config.FIREBASE_URL}/${userType}.json`)
        .pipe(
            catchError(errorRes => {
                AuthService.handleError(errorRes.error.error.message);
                return throwError(errorRes);
            })
        );
    }

    logout() {
        this._user.next(null);
        remove('userData');
        if (this.tokenExpirationTimer) {
            clearTimeout(this.tokenExpirationTimer);
        }
        this.router.navigate([''], { clearHistory: true }).catch(error => console.log(error));
    }

    autoLogin() {
        if (!hasKey('userData')) {
            return of(false);
        }
        const userData: {
            email: string;
            id: string;
            _token: string;
            _tokenExpirationDate: string;
        } = JSON.parse(getString('userData'));

        const loadedUser = new UserModel(
            userData.email,
            userData.id,
            userData._token,
            new Date(userData._tokenExpirationDate)
        );

        if (loadedUser.isAuth) {
            this._user.next(loadedUser);
            this.autoLogout(loadedUser.timeToExpiry);
            return of(true);
        }
        return of(false);
    }
    autoLogout(expiryDuration: number) {
        this.tokenExpirationTimer = setTimeout(() => this.logout(), expiryDuration);
    }

    private handleLogin(
        email: string,
        token: string,
        userId: string,
        expiresIn: number
    ) {
        const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);
        const user = new UserModel(userId, email, token, expirationDate);
        setString('userData', JSON.stringify(user));
        this.autoLogout(user.timeToExpiry);
        this._user.next(user);
    }

    private static handleError(errorMessage: string) {
        switch (errorMessage) {
            case 'EMAIL_EXISTS':
                alert('This email address exists already!').catch( error => console.log(error));
                break;
            case 'INVALID_PASSWORD':
                alert('Your password is invalid!').catch( error => console.log(error));
                break;
            default:
                alert('Authentication failed, check your credentials.').catch( error => console.log(error));
        }
    }

    public createNewUser(name, surname, phone, email, resData) {
       // const newPatient = new CustomerModel("wqdewfretgryhtuyrtgerfedasw", "name", "surname", "phone", "email", new Date());
        const newCustomer = new CustomerModel(resData.localId, name, surname, phone, email, new Date());
        return this.http.post(
            `${AuthService.Config.FIREBASE_URL}/customers/${resData.localId}.json`, newCustomer
        ).pipe(
            catchError(errorRes => {
                console.log(errorRes);
                AuthService.handleError(errorRes.error.error.message);
                return throwError(errorRes);
            }),
            tap(resData => {
                if (resData ) {
                    console.log(resData);
                   return resData;
                }
            })
        );
    }
}
