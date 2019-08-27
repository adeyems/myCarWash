import {Component, OnInit, ViewContainerRef} from "@angular/core";
import {RouterExtensions, ModalDialogOptions, ModalDialogService} from "nativescript-angular";
import { AuthService } from "~/app/services/auth.service";
import {ActivatedRoute} from "@angular/router";
import { DataService } from "../services/data.service";
import * as moment from 'moment';
import { FeedbackReply } from "../modals/feedback-reply/feedback-reply.component";

@Component({
    selector: "ns-feedbacks",
    moduleId: module.id,
    templateUrl: "./feedbacks.component.html",
    styleUrls: ["./feedbacks.component.css"]
})
export class FeedbacksComponent implements OnInit {
    isLoading = false;
    public currentUser: string;
    adminId: string;
    feedbacks;
    customers;
    feedbackDetails: any[] = [];
    loadCounter: number;

    constructor(
        private router: RouterExtensions,
        private authService: AuthService,
        private activatedRoute: ActivatedRoute,
        protected dataService: DataService,
        private vcRef: ViewContainerRef,
        protected modalDialog: ModalDialogService
    ) {
        this.activatedRoute.queryParams.subscribe( params => {
            this.currentUser = params["user"];
            // console.log(this.currentUser);
        });
    }

    ngOnInit() {
        this.loadCounter = 0;
        this.getFeedbacks();
        this.getCustomers();
    }

    getFeedbacks() {
        this.isLoading = true;
        this.dataService.fetchFeedbacks().subscribe(res => {
            this.feedbacks = res;
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
            for (let feedbackKey in this.feedbacks) {
                let feedbackInfo: any[] = [];
                for (let key in this.feedbacks[feedbackKey]) {
                    let fbks = {
                        feedbackId: Object.keys(this.feedbacks[feedbackKey][key])[0],
                        bookingId: key,
                        fbDate: moment(this.feedbacks[feedbackKey][key][Object.keys(this.feedbacks[feedbackKey][key])[0]].date, ["YYYY-M-D"]).format("dddd, MMMM Do YYYY"),
                        feedback: this.feedbacks[feedbackKey][key][Object.keys(this.feedbacks[feedbackKey][key])[0]].feedback
                    }
                    if (this.feedbacks[feedbackKey][key][Object.keys(this.feedbacks[feedbackKey][key])[0]].response) {
                        fbks['response'] = this.feedbacks[feedbackKey][key][Object.keys(this.feedbacks[feedbackKey][key])[0]].response.response;
                    }
                    feedbackInfo.push(fbks);
                }
                this.feedbackDetails.push({
                    feedbackInfo: feedbackInfo,
                    customerInfo: {
                        customerId: feedbackKey,
                        customerName: this.customers[feedbackKey][Object.keys(this.customers[feedbackKey])[0]].name,
                        customerSurname: this.customers[feedbackKey][Object.keys(this.customers[feedbackKey])[0]].surname,
                        customerEmail: this.customers[feedbackKey][Object.keys(this.customers[feedbackKey])[0]].email,
                        customerPhone: this.customers[feedbackKey][Object.keys(this.customers[feedbackKey])[0]].phone,
                    }
                })
            }
        }
        console.log('>>>>>>>>>>',this.feedbackDetails);
    }

    onReplyFeedback(customerInfo, feedbackInfo) {
        const options: ModalDialogOptions = {
            fullscreen: true,
            viewContainerRef: this.vcRef,
            context: {
                customerInfo: customerInfo,
                feedbackInfo: feedbackInfo
            }
        }

        this.modalDialog.showModal(FeedbackReply, options).then(response => {
            if (response) {
                let payload = {
                    response: response,
                    createdOn: moment().format("YYYY-M-D")
                };
                this.dataService.saveFeedbackReply(payload, customerInfo.customerId, feedbackInfo.bookingId, feedbackInfo.feedbackId)
                    .subscribe(res => {
                        alert('Response submitted successfully!');
                        this.loadCounter = 0;
                        this.feedbackDetails = [];
                        this.getFeedbacks();
                        this.getCustomers();
                    }, err => {
                        alert(err);
                    });
            }
        });
    }

    onLogout() {
        this.authService.logout();
    }

}
