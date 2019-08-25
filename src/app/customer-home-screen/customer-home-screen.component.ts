import {Component, OnInit, ViewContainerRef} from "@angular/core";
import {RouterExtensions, ModalDialogOptions, ModalDialogService} from "nativescript-angular";
import { AuthService } from "~/app/services/auth.service";
import {ActivatedRoute} from "@angular/router";
import { DataService } from "../services/data.service";
import { UserRating } from "../modals/user-rating/user-rating.component";
import * as moment from 'moment';

@Component({
    selector: "Home",
    moduleId: module.id,
    templateUrl: "./customer-home-screen.component.html",
    styleUrls: ["./customer-home-screen.component.css"]
})
export class CustomerHomeScreenComponent implements OnInit {
    pageTitle: string;
    public currentUser: string;
    recentBooking: string;
    recentRating;

    constructor(
        private router: RouterExtensions,
        private authService: AuthService,
        private activatedRoute: ActivatedRoute,
        private vcRef: ViewContainerRef,
        protected dataService: DataService,
        protected modalDialog: ModalDialogService

    ) {
        this.activatedRoute.queryParams.subscribe( params => {
            this.currentUser = params["user"];
            console.log(this.currentUser);
        });
    }

    ngOnInit() {
        this.getUserRecentBooking();
        this.getUserRatings();
    }

    goToBrowseRelevantInfo() {
        this.router.navigate(["relevantInfo"]).then();
    }

    goToMakeBooking() {
        this.router.navigate(["customerBookingForm"]);
    }

    goToManageBooking() {
        this.router.navigate(["manage-booking"]);
    }

    goToProvideFeedback() {
        this.router.navigate(["customerFeedback"]);
    }

    goToProvideRating() {
        console.log(this.recentBooking);
        console.log(this.recentRating);
        if (!this.recentBooking && !this.recentRating) {
            alert(`No booking to rate!`);
            return;
        }
        if (this.recentRating) {
            alert('Your last booking has been rated!');
            return;
        }
        const options: ModalDialogOptions = {
            fullscreen: true,
            viewContainerRef: this.vcRef
        }
        this.modalDialog.showModal(UserRating, options).then(response => {
            if (response) {
                let ratingModel = {
                    rating: response,
                    date: moment().format("YYYY-M-D")
                };
                this.dataService.saveUserRating(this.recentBooking, ratingModel).subscribe(res => {
                    alert('Thank you for rating!');
                    this.getUserRatings();
                }, err => {
                    alert(err);
                });
            }
        });
    }

    getUserRecentBooking() {
        this.dataService.getBookings(1).subscribe(res => {
            this.recentBooking = Object.keys(res)[0];
        }, err => {
            alert(err);
        })
    }

    getUserRatings() {
        this.dataService.fetchUserRatings().subscribe(res => {
            this.recentRating = res[this.recentBooking];
        });
    }

    onLogout() {
        this.authService.logout();
    }
}
