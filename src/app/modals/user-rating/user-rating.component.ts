import { Component, OnInit } from '@angular/core';
import { ModalDialogParams } from 'nativescript-angular/modal-dialog';
import {AuthService} from "~/app/services/auth.service";

@Component({
  selector: 'ns-user-rating',
  templateUrl: './user-rating.component.html',
  styleUrls: ['./user-rating.component.css']
})
export class UserRating implements OnInit {
    rating: number = 0;
    constructor(
        private modalParams: ModalDialogParams,
        private authService: AuthService
    ) { }

    ngOnInit() {

    }
    onSelectRating(ratingVal: number) {
        this.rating = ratingVal;
    }
    submitRating() {
        this.modalParams.closeCallback(this.rating);
    }

    closeModal(closeModalValue?) {
        this.modalParams.closeCallback(closeModalValue);
    }

    onLogout() {
        this.authService.logout();
    }
}
