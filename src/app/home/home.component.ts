import { Component, OnInit } from "@angular/core";
import {NavigationExtras, Router} from "@angular/router";
import { RouterExtensions } from "nativescript-angular";

@Component({
    selector: "Home",
    moduleId: module.id,
    templateUrl: "./home.component.html"
})
export class HomeComponent implements OnInit {

    constructor(private routerExtensions: RouterExtensions) { }

    // tslint:disable-next-line:no-empty
    ngOnInit(): void {
    }

    goToPatientLogin() {
        const navigationExtras: NavigationExtras = {
            queryParams: {
                "user": "Patient",
            }
        };
        this.routerExtensions.navigate(["login"], navigationExtras).then();
    }

    goToMedicalPractitionerLogin() {
        const navigationExtras: NavigationExtras = {
            queryParams: {
                "user": "Medical Practitioner",
            }
        };
        this.routerExtensions.navigate(["login"], navigationExtras).then();
    }
}
