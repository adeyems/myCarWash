import {Component, ElementRef, OnInit, ViewChild, ViewContainerRef} from "@angular/core";
import {RouterExtensions} from "nativescript-angular";
import {of} from "rxjs";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {TextField} from "tns-core-modules/ui/text-field";
import { AuthService } from "~/app/services/auth.service";
import {ActivatedRoute} from "@angular/router";
import { getString } from "tns-core-modules/application-settings/application-settings";
import { DataService } from "../services/data.service";

@Component({
    selector: "Home",
    moduleId: module.id,
    templateUrl: "./customer-booking-form.component.html",
    styleUrls: ["./customer-booking-form.component.css"]
})
export class CustomerBookingFormComponent implements OnInit {
    isLoading = false;
    pageTitle: string;
    currentUser: string;
    customerFullName: string;
    currentBooking: any;
    selectedSlot: any;
    currentDayofTheWeek: number;
    timeRange = {
        a: [
            { day: 0, time: '9:00 - 9:30' },
            { day: 1, time: '9:00 - 9:30' },
            { day: 2, time: '9:00 - 9:30' },
            { day: 3, time: '9:00 - 9:30' },
            { day: 4, time: '9:00 - 9:30' }
        ],
        b: [
            { day: 0, time: '9:30 - 10:00' },
            { day: 1, time: '9:30 - 10:00' },
            { day: 2, time: '9:30 - 10:00' },
            { day: 3, time: '9:30 - 10:00' },
            { day: 4, time: '9:30 - 10:00' }
        ],
        c: [
            { day: 0, time: '10:00 - 10:30' },
            { day: 1, time: '10:00 - 10:30' },
            { day: 2, time: '10:00 - 10:30' },
            { day: 3, time: '10:00 - 10:30' },
            { day: 4, time: '10:00 - 10:30' }
        ],
        d: [
            { day: 0, time: '10:30 - 11:00' },
            { day: 1, time: '10:30 - 11:00' },
            { day: 2, time: '10:30 - 11:00' },
            { day: 3, time: '10:30 - 11:00' },
            { day: 4, time: '10:30 - 11:00' }
        ],
        e: [
            { day: 0, time: '11:00 - 11:30' },
            { day: 1, time: '11:00 - 11:30' },
            { day: 2, time: '11:00 - 11:30' },
            { day: 3, time: '11:00 - 11:30' },
            { day: 4, time: '11:00 - 11:30' }
        ],
        f: [
            { day: 0, time: '11:30 - 12:00' },
            { day: 1, time: '11:30 - 12:00' },
            { day: 2, time: '11:30 - 12:00' },
            { day: 3, time: '11:30 - 12:00' },
            { day: 4, time: '11:30 - 12:00' }
        ],
        g: [
            { day: 0, time: '12:00 - 12:30' },
            { day: 1, time: '12:00 - 12:30' },
            { day: 2, time: '12:00 - 12:30' },
            { day: 3, time: '12:00 - 12:30' },
            { day: 4, time: '12:00 - 12:30' }
        ],
        h: [
            { day: 0, time: '12:30 - 13:00' },
            { day: 1, time: '12:30 - 13:00' },
            { day: 2, time: '12:30 - 13:00' },
            { day: 3, time: '12:30 - 13:00' },
            { day: 4, time: '12:30 - 13:00' }
        ],
        i: [
            { day: 0, time: '13:00 - 13:30' },
            { day: 1, time: '13:00 - 13:30' },
            { day: 2, time: '13:00 - 13:30' },
            { day: 3, time: '13:00 - 13:30' },
            { day: 4, time: '13:00 - 13:30' }
        ],
        j: [
            { day: 0, time: '13:30 - 14:00' },
            { day: 1, time: '13:30 - 14:00' },
            { day: 2, time: '13:30 - 14:00' },
            { day: 3, time: '13:30 - 14:00' },
            { day: 4, time: '13:30 - 14:00' }
        ],
        k: [
            { day: 0, time: '14:00 - 14:30' },
            { day: 1, time: '14:00 - 14:30' },
            { day: 2, time: '14:00 - 14:30' },
            { day: 3, time: '14:00 - 14:30' },
            { day: 4, time: '14:00 - 14:30' }
        ],
        l: [
            { day: 0, time: '14:30 - 15:00' },
            { day: 1, time: '14:30 - 15:00' },
            { day: 2, time: '14:30 - 15:00' },
            { day: 3, time: '14:30 - 15:00' },
            { day: 4, time: '14:30 - 15:00' }
        ],
        m: [
            { day: 0, time: '15:00 - 15:30' },
            { day: 1, time: '15:00 - 15:30' },
            { day: 2, time: '15:00 - 15:30' },
            { day: 3, time: '15:00 - 15:30' },
            { day: 4, time: '15:00 - 15:30' }
        ],
        n: [
            { day: 0, time: '15:30 - 16:00' },
            { day: 1, time: '15:30 - 16:00' },
            { day: 2, time: '15:30 - 16:00' },
            { day: 3, time: '15:30 - 16:00' },
            { day: 4, time: '15:30 - 16:00' }
        ],
        o: [
            { day: 0, time: '16:00 - 16:30' },
            { day: 1, time: '16:00 - 16:30' },
            { day: 2, time: '16:00 - 16:30' },
            { day: 3, time: '16:00 - 16:30' },
            { day: 4, time: '16:00 - 16:30' }
        ],
        p: [
            { day: 0, time: '16:30 - 17:00' },
            { day: 1, time: '16:30 - 17:00' },
            { day: 2, time: '16:30 - 17:00' },
            { day: 3, time: '16:30 - 17:00' },
            { day: 4, time: '16:30 - 17:00' }
        ],
        q: [
            { day: 0, time: '17:00 - 17:30' },
            { day: 1, time: '17:00 - 17:30' },
            { day: 2, time: '17:00 - 17:30' },
            { day: 3, time: '17:00 - 17:30' },
            { day: 4, time: '17:00 - 17:30' }
        ],
        r: [
            { day: 0, time: '17:30 - 18:00' },
            { day: 1, time: '17:30 - 18:00' },
            { day: 2, time: '17:30 - 18:00' },
            { day: 3, time: '17:30 - 18:00' },
            { day: 4, time: '17:30 - 18:00' }
        ],
    };

    constructor(
        private router: RouterExtensions,
        private authService: AuthService,
        private activatedRoute: ActivatedRoute,
        private dataService: DataService
    ) {
        this.activatedRoute.queryParams.subscribe( params => {
            this.currentUser = params["user"];
            console.log(this.currentUser);
        });
    }

    ngOnInit() {
        this.dataService.getUserInfo('customers')
            .subscribe(res => {
                this.customerFullName = `${res[Object.keys(res)[0]].name} ${res[Object.keys(res)[0]].surname}`
            });
        this.dataService.getBookings().subscribe(response => {
            if (response) {
                this.currentBooking = response;
                this.selectedSlot = response[Object.keys(response)[0]];
            }

        }, error => {
        });

        let mon = new Date().getMonth();
        let date = new Date().getDate();
        let yr = new Date().getFullYear();
        let day = new Date(yr, mon, date).getDay();
        let start: number;
        let end: number;
        if (day > 0 && day < 6) {
            start = 0;
            end = 5;
        } else if(day == 0) {
            start = 1;
            end = 6;
        }
        for (let i = 0; i < 5; i++) {
            start = 2;
            end = 7;
        }
    }

    onSelectSlot(key: 'string', day: number, time: string) {
        if (this.currentBooking) {
            alert('You have a pending booking. Please go to manage booking to cancel!');
            return;
        }
        let bookedDate = `${new Date().getFullYear()}-${new Date().getMonth()}-${new Date().getDate()}`;
        let bookingObj = {
            bookedDate: bookedDate,
            bookedDay: day,
            timeSlot: time
        };
        this.selectedSlot = bookingObj;
    }

    onConfirmSlot() {
        if (!this.selectedSlot) {
            alert('Please select a time slot');
            return;
        }
        this.dataService.saveBooking(this.selectedSlot).subscribe(res => {
            alert('Slot Successfully Booked!');
            this.currentBooking = res;
        }, err => {
            alert(err);
        });
    }

    onLogout() {
        this.authService.logout();
    }
}
