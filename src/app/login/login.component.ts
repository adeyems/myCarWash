import { Component, OnInit } from "@angular/core";
import {NavigationExtras, Router} from "@angular/router";
import { RouterExtensions } from "nativescript-angular";
import {messageType} from "tns-core-modules/trace";
import error = messageType.error;

@Component({
    selector: "Home",
    moduleId: module.id,
    templateUrl: "./login.component.html",
    styleUrls: ["./login.component.css"]
})
export class LoginComponent implements OnInit {

    constructor(private routerExtensions: RouterExtensions) { }

    // tslint:disable-next-line:no-empty
    ngOnInit(): void {
    }

    goToCustomerLogin() {
        console.log("customer");
        this.routerExtensions.navigate(["customerLogin"]).then().catch( error => console.log(error));
    }

    goToManagementLogin() {
        console.log("management");
        this.routerExtensions.navigate(["managementLogin"]).catch( error => console.log(error));
    }
}
