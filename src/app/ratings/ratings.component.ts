import {Component, OnInit} from "@angular/core";
import {RouterExtensions} from "nativescript-angular";
import { AuthService } from "~/app/services/auth.service";
import {ActivatedRoute} from "@angular/router";
import { DataService } from "../services/data.service";
import * as moment from 'moment';

@Component({
    selector: "ns-bookings",
    moduleId: module.id,
    templateUrl: "./ratings.component.html",
    styleUrls: ["./ratings.component.css"]
})
export class RatingsComponent implements OnInit {
    isLoading = false;
    public currentUser: string;
    ratings;
    customers;
    ratingsDetails: any[] = [];
    loadCounter: number;
    currentTime;

    constructor(
        private router: RouterExtensions,
        private authService: AuthService,
        private activatedRoute: ActivatedRoute,
        protected dataService: DataService
    ) {
        this.activatedRoute.queryParams.subscribe( params => {
            this.currentUser = params["user"];
            // console.log(this.currentUser);
        });
    }

    ngOnInit() {
        this.loadCounter = 0;
        this.currentTime = moment().utc().valueOf();
        this.getRatings();
        this.getCustomers();
    }

    getRatings() {
        this.isLoading = true;
        this.dataService.fetchRatings().subscribe(res => {
            this.ratings = res;
            console.log('?????????????',this.ratings);
            this.isLoading = false;
            this.incrementLoadCounter();
        }, err => {
            this.isLoading = false;
            alert(err);
        })
    }

    getCustomers() {
        this.isLoading = true;
        this.dataService.fetchCustomers().subscribe(res => {
            this.customers = res;
            this.isLoading = false;
            this.incrementLoadCounter();
        }, err => {
            this.isLoading = false;
            alert(err);
        })
    }

    incrementLoadCounter() {
        this.loadCounter++;
        if (this.loadCounter == 2) {
            for (let ratingKey in this.ratings) {
                let ratingInfo: any[] = [];
                for (let key in this.ratings[ratingKey]) {
                    let fbks = {
                        ratingId: Object.keys(this.ratings[ratingKey][key])[0],
                        bookingId: key,
                        fbDate: moment(this.ratings[ratingKey][key][Object.keys(this.ratings[ratingKey][key])[0]].date, ["YYYY-M-D"]).format("dddd, MMMM Do YYYY"),
                        rating: this.ratings[ratingKey][key][Object.keys(this.ratings[ratingKey][key])[0]].rating
                    }
                    if (this.ratings[ratingKey][key][Object.keys(this.ratings[ratingKey][key])[0]].response) {
                        fbks['response'] = this.ratings[ratingKey][key][Object.keys(this.ratings[ratingKey][key])[0]].response.response;
                    }
                    ratingInfo.push(fbks);
                }
                this.ratingsDetails.push({
                    ratingInfo: ratingInfo,
                    customerInfo: {
                        customerId: ratingKey,
                        customerName: this.customers[ratingKey][Object.keys(this.customers[ratingKey])[0]].name,
                        customerSurname: this.customers[ratingKey][Object.keys(this.customers[ratingKey])[0]].surname,
                        customerEmail: this.customers[ratingKey][Object.keys(this.customers[ratingKey])[0]].email,
                        customerPhone: this.customers[ratingKey][Object.keys(this.customers[ratingKey])[0]].phone,
                    }
                });
            }
            console.log('??????????', this.ratingsDetails);
        }
    }

    onLogout() {
        this.authService.logout();
    }

}
