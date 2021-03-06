import {Component, ElementRef, OnInit, ViewChild, ViewContainerRef} from "@angular/core";
import {RouterExtensions} from "nativescript-angular";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {TextField} from "tns-core-modules/ui/text-field";
import {AuthService} from "~/app/services/auth.service";
import {ActivatedRoute} from "@angular/router";

@Component({
    selector: "Home",
    moduleId: module.id,
    templateUrl: "./customer-login.component.html",
    styleUrls: ["./customer-login.component.css"]
})
export class CustomerLoginComponent implements OnInit {
    form: FormGroup;
    emailControlIsValid = true;
    passwordControlIsValid = true;
    isLoading = false;
    @ViewChild("passwordEl", {static: false}) passwordEl: ElementRef<TextField>;
    @ViewChild("emailEl", {static: false}) emailEl: ElementRef<TextField>;
    pageTitle: string;
    public currentUser: string;

    constructor(
        private router: RouterExtensions,
        private authService: AuthService,
    ) {
    }

    ngOnInit() {
        this.form = new FormGroup({
            email: new FormControl(null, {
                updateOn: 'blur',
                validators: [Validators.required, Validators.email]
            }),
            password: new FormControl(null, {
                updateOn: 'blur',
                validators: [Validators.required, Validators.minLength(8)]
            })
        });


        this.form.get('email').statusChanges.subscribe(status => {
            this.emailControlIsValid = status === 'VALID';
        });

        this.form.get('password').statusChanges.subscribe(status => {
            this.passwordControlIsValid = status === 'VALID';
        });
    }

    onDone() {
        this.emailEl.nativeElement.focus();
        this.passwordEl.nativeElement.focus();
        this.passwordEl.nativeElement.dismissSoftInput();
    }

    onSubmit() {
        this.emailEl.nativeElement.focus();
        this.passwordEl.nativeElement.focus();
        this.passwordEl.nativeElement.dismissSoftInput();

        if (!this.form.valid) {
            return;
        }

        const email = this.form.get('email').value;
        const password = this.form.get('password').value;

        this.form.reset();
        this.emailControlIsValid = true;
        this.passwordControlIsValid = true;
        this.isLoading = true;
        this.authService.checkUserType('customers').subscribe(response => {
            const keys = Object.keys(response);
            this.authService.login(email, password, keys).subscribe(
                resData => {
                    this.isLoading = false;
                    if (keys.indexOf(resData.localId) > -1) {
                        this.router.navigate(['customerHome'], { clearHistory: true }).then();
                    } else {
                        alert('User not recognized!!!');
                    }
                },
                err => {
                    console.log(err);
                    this.isLoading = false;
                }
            )
        });
    }

    goToSignUp() {
        this.router.navigate(["customerSignup"]).then()
    }

    goToForgotPassword() {
        this.router.navigate(["forgotPassword"]).then()
    }
}
