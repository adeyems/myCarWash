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
    selectedSlot: any;
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
            { day: 0, time: '12:30 - 1:00' },
            { day: 1, time: '12:30 - 1:00' },
            { day: 2, time: '12:30 - 1:00' },
            { day: 3, time: '12:30 - 1:00' },
            { day: 4, time: '12:30 - 1:00' }
        ],
        i: [
            { day: 0, time: '1:00 - 1:30' },
            { day: 1, time: '1:00 - 1:30' },
            { day: 2, time: '1:00 - 1:30' },
            { day: 3, time: '1:00 - 1:30' },
            { day: 4, time: '1:00 - 1:30' }
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
        // this.customerId = JSON.parse(getString('userData'))['id'];
        this.dataService.getBookings().subscribe(response => {
            console.log('response: ', response);
        }, error => {
            console.log('error: ', error);
        });

        const monthFirstWeekDay = new Date(
            new Date().getFullYear(),
            new Date().getMonth(), 1).getDay();
        console.log(new Date().getFullYear(),'*****',new Date().getMonth(),'---',monthFirstWeekDay);
    }

    onSelectSlot(key: 'string', day: number, time: string) {
        let bookingObj = {
            bookedDay: day,
            timeSlot: time
        };
        this.selectedSlot = {
            key: key,
            value: bookingObj
        };
        //this.dataService.saveBooking(bookingObj);
    }

    onConfirmSlot() {
        if (!this.selectedSlot) {
            alert('Please select a time slot');
            return;
        }
        this.dataService.saveBooking(this.selectedSlot.value);
    }

    onLogout() {
        this.authService.logout();
    }

    getCustomerName() {
        return this.authService.user.pipe(

        )
    }
}
