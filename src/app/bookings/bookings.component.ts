import {Component, OnInit} from "@angular/core";
import {RouterExtensions} from "nativescript-angular";
import { AuthService } from "~/app/services/auth.service";
import {ActivatedRoute} from "@angular/router";
import { DataService } from "../services/data.service";
import * as moment from 'moment';

@Component({
    selector: "ns-bookings",
    moduleId: module.id,
    templateUrl: "./bookings.component.html",
    styleUrls: ["./bookings.component.css"]
})
export class BookingsComponent implements OnInit {
    isLoading = false;
    public currentUser: string;
    bookings;
    customers;
    bookingsDetails: any[] = [];
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
        this.getBookings();
        this.getCustomers();
    }

    getBookings() {
        this.isLoading = true;
        this.dataService.getAllBookings().subscribe(res => {
            this.bookings = res;
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
            for (let bookingsKey in this.bookings) {
                for (let key in this.bookings[bookingsKey]) {
                    // let bookingDate = moment(`${this.bookings[bookingsKey][key].bookedDate}`, ["YYYY-M-D"]).utc().valueOf();
                    // if (bookingDate >= this.currentTime) {
                        this.bookingsDetails.push({
                            id: key,
                            bookedDate: moment(this.bookings[bookingsKey][key].bookedDate, ["YYYY-M-D"]).format("dddd, MMMM Do YYYY"),
                            bookedDay: this.bookings[bookingsKey][key].bookedDay,
                            timeSlot: this.bookings[bookingsKey][key].timeSlot,
                            customerName: this.customers[bookingsKey][Object.keys(this.customers[bookingsKey])[0]].name,
                            customerSurname: this.customers[bookingsKey][Object.keys(this.customers[bookingsKey])[0]].surname,
                            customerEmail: this.customers[bookingsKey][Object.keys(this.customers[bookingsKey])[0]].email,
                            customerPhone: this.customers[bookingsKey][Object.keys(this.customers[bookingsKey])[0]].phone,
                        })
                    // }
                }
            }
        }
    }

    onLogout() {
        this.authService.logout();
    }

}
