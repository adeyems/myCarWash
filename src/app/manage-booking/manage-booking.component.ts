import {Component, OnInit, ViewContainerRef} from "@angular/core";
import {RouterExtensions} from "nativescript-angular";
import { AuthService } from "~/app/services/auth.service";
import {ActivatedRoute} from "@angular/router";
import { DataService } from "../services/data.service";

@Component({
    selector: "Home",
    moduleId: module.id,
    templateUrl: "./manage-booking.component.html",
    styleUrls: ["./manage-booking.component.css"]
})
export class ManageBookingComponent implements OnInit {
    isLoading = false;
    pageTitle: string;
    public currentUser: string;
    timeRange = {
        first: '9:00 - 9:30',
        second: '9:30 - 10:00',
        third: '10:00 - 10:30',
        fourth: '10:30 - 11:00',
        fifth: '11:00 - 11:30',
        sixth: '11:30 - 12:00',
        seventh: '12:00 - 12:30',
        eight: '12:30 - 1:00',
        ninth: '1:00 - 1:30',
    }

    constructor(
        private router: RouterExtensions,
        private authService: AuthService,
        private activatedRoute: ActivatedRoute,
        private dataService: DataService
    ) {
        this.activatedRoute.queryParams.subscribe( params => {
            this.currentUser = params["user"];
            console.log('user: ',this.currentUser);
        });
    }

    ngOnInit() {

    }


    onLogout() {
        this.authService.logout();
    }
}
