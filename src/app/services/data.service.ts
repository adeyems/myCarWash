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

    fetchCustomers() {
        return this.http.get<any>(
            `${DataService.Config.FIREBASE_URL}/customers.json`
        )
    }

    getBookings(queryParams?: number) {
        return this.authService.user.pipe(
            take(1),
            switchMap(currentUser => {
                if (!currentUser || !currentUser.isAuth) {
                    return of(null);
                }
                if (queryParams) {
                    return this.http.get<any>(
                        `${DataService.Config.FIREBASE_URL}/bookings/${currentUser.id}.json?auth=${currentUser.token}&orderBy="$key"&limitToLast=${queryParams}`
                    )
                }
                return this.http.get<any>(
                    `${DataService.Config.FIREBASE_URL}/bookings/${currentUser.id}.json?auth=${currentUser.token}`
                )
            })
        );
    }

    getAllBookings() {
        return this.http.get<any>(
            `${DataService.Config.FIREBASE_URL}/bookings.json`
        )
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

            }));
    }

    deleteBooking(bookingId: string) {
        return this.authService.user.pipe(
            take(1),
            switchMap(
            currentUser => {
                if (!currentUser || !currentUser.isAuth) {
                    return of(null);
                }
                return this.http.delete(
                    `${DataService.Config.FIREBASE_URL}/bookings/${currentUser.id}/${bookingId}.json?auth=${currentUser.token}`
                )
            }));
    }

    getUserInfo(userType: 'customers' | 'managements') {
        return this.authService.user.pipe(
            take(1),
            switchMap(currentUser => {
                if (!currentUser || !currentUser.isAuth) {
                    return of(null);
                }
                return this.http.get<any>(
                    `${DataService.Config.FIREBASE_URL}/${userType}/${currentUser.id}.json?auth=${currentUser.token}`
                )
            })
        );
    }

    saveFeedback(bookingId: string, payload) {
        return this.authService.user.pipe(
            take(1),
            switchMap(
            currentUser => {
                if (!currentUser || !currentUser.isAuth) {
                    return of(null);
                }
                return this.http.post(
                    `${DataService.Config.FIREBASE_URL}/feedbacks/${currentUser.id}/${bookingId}.json?auth=${currentUser.token}`,
                    payload
                )

            }));
    }

    fetchUserFeedbacks() {
        return this.authService.user.pipe(
            take(1),
            switchMap(
            currentUser => {
                if (!currentUser || !currentUser.isAuth) {
                    return of(null);
                }
                return this.http.get(
                    `${DataService.Config.FIREBASE_URL}/feedbacks/${currentUser.id}.json?auth=${currentUser.token}`
                )

            }));
    }

    saveUserRating(bookingId: string, payload) {
        return this.authService.user.pipe(
            take(1),
            switchMap(
            currentUser => {
                if (!currentUser || !currentUser.isAuth) {
                    return of(null);
                }
                return this.http.post(
                    `${DataService.Config.FIREBASE_URL}/ratings/${currentUser.id}/${bookingId}.json?auth=${currentUser.token}`,
                    payload
                )

            }));
    }

    fetchUserRatings() {
        return this.authService.user.pipe(
            take(1),
            switchMap(
            currentUser => {
                if (!currentUser || !currentUser.isAuth) {
                    return of(null);
                }
                return this.http.get(
                    `${DataService.Config.FIREBASE_URL}/ratings/${currentUser.id}.json?auth=${currentUser.token}`
                )
            }));
    }

    fetchFeedbacks() {
        return this.http.get<any>(
            `${DataService.Config.FIREBASE_URL}/feedbacks.json`
        )
    }

    saveFeedbackReply(payload, customerId, bookingId, feedbackId) {
        return this.authService.user.pipe(
            take(1),
            switchMap(
            currentUser => {
                if (!currentUser || !currentUser.isAuth) {
                    return of(null);
                }
                payload['adminId'] = currentUser.id;
                return this.http.patch(`${DataService.Config.FIREBASE_URL}/feedbacks/${customerId}/${bookingId}/${feedbackId}/response.json?auth=${currentUser.token}`,
                payload);
            })
        );
    }

    fetchRatings() {
        return this.http.get<any>(
            `${DataService.Config.FIREBASE_URL}/ratings.json`
        )
    }

    saveProductInfo(payload) {
        return this.authService.user.pipe(
            take(1),
            switchMap(
                currentUser => {
                    if (!currentUser || !currentUser.isAuth) {
                        return of(null);
                    }
                    payload['addedBy'] = currentUser.id;
                    return this.http.post(`${DataService.Config.FIREBASE_URL}/products.json?auth=${currentUser.token}`,
                        payload);
                })
        );
    }

    fetchProducts() {
        return this.authService.user.pipe(
            take(1),
            switchMap(
                currentUser => {
                    if (!currentUser || !currentUser.isAuth) {
                        return of(null);
                    }
                    return this.http.get(`${DataService.Config.FIREBASE_URL}/products.json?auth=${currentUser.token}`);
                })
        );
    }

}
