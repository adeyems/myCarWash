import {Component, OnInit} from "@angular/core";
import {RouterExtensions} from "nativescript-angular";
import { AuthService } from "~/app/services/auth.service";
import {ActivatedRoute} from "@angular/router";
import { DataService } from "../services/data.service";
import * as moment from 'moment';
import { openFilePicker } from 'nativescript-simple-filepicker';
const firebase = require("nativescript-plugin-firebase");

@Component({
    selector: "ns-customer-feedback",
    moduleId: module.id,
    templateUrl: "./upload-products.component.html",
    styleUrls: ["./upload-products.component.css"]
})
export class UploadProductsComponent implements OnInit {
    isLoading = false;
    pageTitle: string;
    public currentUser: string;
    productModel = {
        title: "",
        description: ""
    }
    filePath: string;
    uploadPercentage: number = 0;
    isUploading: boolean = false;

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
        firebase.init({
            // Optionally pass in properties for database, authentication and cloud messaging,
            // see their respective docs.
        }).then(
            () => {
                console.log("firebase.init done");
            },
            error => {
                console.log(`firebase.init error: ${error}`);
            }
        );
    }

    onChooseFile() {
        openFilePicker({

        }).then((data) => {
            const filePath = data.files[0];
            this.filePath = filePath;
        });
    }

    uploadFileToFirebaseStorage(filePath: string, fileName: string) {
        this.isUploading = true;
        firebase.storage.uploadFile({
            remoteFullPath: `uploads/products-images/${fileName}.png`,
            localFullPath: filePath,
            // get notified of file upload progress
            onProgress: (status) => {
                this.uploadPercentage = status.percentageCompleted;
            }
        }).then((uploadedFile) => {
                this.isUploading = false;
                this.getUploadedFileUrl(fileName);
            },
            (error) => {
                this.isUploading = false;
                alert(error);
            }
        );
    }

    saveProduct() {
        this.productModel['date'] = moment();
        this.dataService.saveProductInfo(this.productModel).subscribe(res => {
            alert('Product uploaded successfully!');
            this.productModel.title = '';
            this.productModel.description = '';
            this.filePath = undefined;
            this.uploadPercentage = 0;
        }, err => {
            alert(err);
        })
    }

    getUploadedFileUrl(fileName: string) {
        firebase.storage.getDownloadUrl({
            remoteFullPath: `uploads/products-images/${fileName}.png`,
        }).then(url => {
            this.productModel['imagePath'] = url;
                this.saveProduct();
            }, error => {
                alert(error);
            }
        );
    }

    onSave() {
        if (this.productModel.title == '' || this.productModel.description == '') {
            alert('Title or description cannot be empty!');
            return;
        }
        if (!this.filePath) {
            alert('Please select a file!');
            return;
        }
        this.uploadFileToFirebaseStorage(this.filePath, this.productModel.title);
    }

    onLogout() {
        this.authService.logout();
    }

}
