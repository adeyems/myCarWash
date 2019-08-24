import {Component, OnInit} from "@angular/core";
import {RouterExtensions} from "nativescript-angular";
import { AuthService } from "~/app/services/auth.service";
import {ActivatedRoute} from "@angular/router";
import { DataService } from "../services/data.service";
import * as moment from 'moment';

@Component({
    selector: "ns-customer-feedback",
    moduleId: module.id,
    templateUrl: "./customer-feedback.component.html",
    styleUrls: ["./customer-feedback.component.css"]
})
export class CustomerFeedbackComponent implements OnInit {
    isLoading = false;
    pageTitle: string;
    public currentUser: string;
    feedbackModel = {
        feedback: "",
        date: ""
    }
    recentBooking: string;
    recentFeedback;

    constructor(
        private router: RouterExtensions,
        private authService: AuthService,
        private activatedRoute: ActivatedRoute,
        protected dataService: DataService
    ) {
        this.activatedRoute.queryParams.subscribe( params => {
            this.currentUser = params["user"];
            console.log(this.currentUser);
        });
    }

    ngOnInit() {
        this.getUserRecentBooking();
        this.getUserFeedbacks();
    }

    getUserRecentBooking() {
        this.dataService.getBookings(1).subscribe(res => {
            this.recentBooking = Object.keys(res)[0];
        }, err => {
            alert(err);
        })
    }

    getUserFeedbacks() {
        this.dataService.fetchUserFeedbacks().subscribe(res => {
            this.recentFeedback = res[this.recentBooking];
            console.log(this.recentFeedback);
        })
    }

    submitFeedback() {
        this.feedbackModel.date = moment().format("YYYY-M-D");
        this.dataService.saveFeedback(this.recentBooking, this.feedbackModel).subscribe(res => {
            alert('Feedback sent successfully!');
            this.getUserFeedbacks();
        }, err => {
            alert(err);
        })
    }

    onLogout() {
        this.authService.logout();
    }

}
