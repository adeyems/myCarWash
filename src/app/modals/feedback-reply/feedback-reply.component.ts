import { Component, OnInit } from '@angular/core';
import { ModalDialogParams } from 'nativescript-angular/modal-dialog';
import {AuthService} from "~/app/services/auth.service";

@Component({
  selector: 'ns-feedback-reply',
  templateUrl: './feedback-reply.component.html',
  styleUrls: ['./feedback-reply.component.css']
})
export class FeedbackReply implements OnInit {
    feedbackResponse: string = "";
    customerInfo;
    feedbackInfo;

    constructor(
        private modalParams: ModalDialogParams,
        private authService: AuthService
    ) { }

    ngOnInit() {
        this.customerInfo = this.modalParams.context.customerInfo;
        this.feedbackInfo = this.modalParams.context.feedbackInfo;
    }

    onReply() {
        this.closeModal(this.feedbackResponse);
    }

    closeModal(closeModalValue?) {
        this.modalParams.closeCallback(closeModalValue);
    }

    onLogout() {
        this.authService.logout();
    }
}
