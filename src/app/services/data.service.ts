import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { catchError, take, switchMap, tap } from "rxjs/operators";
import { throwError, of } from "rxjs";
import { alert } from "tns-core-modules/ui/dialogs/dialogs";
import { AuthService } from "./auth.service";

@Injectable({ providedIn: 'root' })
export class DataService {

    static Config = {
        SIGNUP_URL: "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCJPkyI8QTDGOCgkYdaKC4OBg5HaCSlbzI",
        SIGNIN_URL: "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCJPkyI8QTDGOCgkYdaKC4OBg5HaCSlbzI",
        FIREBASE_API_KEY: "AIzaSyCJPkyI8QTDGOCgkYdaKC4OBg5HaCSlbzI",
        FIREBASE_URL:"https://mycarwash-4cf24.firebaseio.com"
    };

    constructor(
        private http: HttpClient,
        private authService: AuthService
    ) {}

    getBookings() {
        return this.authService.user.pipe(
            take(1),
            switchMap(currentUser => {
                if (!currentUser || !currentUser.isAuth) {
                    return of(null);
                }
                return this.http.get<any>(
                    `${DataService.Config.FIREBASE_URL}/bookings/${currentUser.id}.json?auth=${currentUser.token}`
                )
            })
        );
    }

    saveBooking(bookingObj) {
        return this.authService.user.pipe(
            take(1),
            switchMap(
            currentUser => {
                if (!currentUser || !currentUser.isAuth) {
                    return of(null);
                }
                return this.http.post(
                    `${DataService.Config.FIREBASE_URL}/bookings/${currentUser.id}.json?auth=${currentUser.token}`,
                    bookingObj
                )

            }))
            .subscribe();
    }


}
