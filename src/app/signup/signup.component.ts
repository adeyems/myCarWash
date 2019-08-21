import {Component, ElementRef, OnInit, ViewChild, ViewContainerRef} from "@angular/core";
import {RouterExtensions} from "nativescript-angular";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {TextField} from "tns-core-modules/ui/text-field";
import { AuthService } from "~/app/services/auth.service";
import {ActivatedRoute} from "@angular/router";
import {PasswordValidator} from "~/app/shared/validator";

@Component({
    selector: "Home",
    moduleId: module.id,
    templateUrl: "./signup.component.html",
    styleUrls: ["./signup.component.css"]
})
export class SignupComponent implements OnInit {
    form: FormGroup;
    nameControlIsValid = true;
    surnameControlIsValid = true;
    phoneControlIsValid = true;
    emailControlIsValid = true;
    passwordControlIsValid = true;
    confirmPasswordControlIsValid = true;
    isLoading = false;
    phone = "+353";
    @ViewChild("nameEl", {static: false}) nameEl: ElementRef<TextField>;
    @ViewChild("surnameEl", {static: false}) surnameEl: ElementRef<TextField>;
    @ViewChild("phoneEl", {static: false}) phoneEl: ElementRef<TextField>;
    @ViewChild("emailEl", {static: false}) emailEl: ElementRef<TextField>;
    @ViewChild("passwordEl", {static: false}) passwordEl: ElementRef<TextField>;
    @ViewChild("confirmPasswordEl", {static: false}) confirmPasswordEl: ElementRef<TextField>;
    public currentUser: string;

    constructor(
        private router: RouterExtensions,
        private authService: AuthService,
        private activatedRoute: ActivatedRoute
    ) {
        this.activatedRoute.queryParams.subscribe( params => {
            this.currentUser = params["user"];
            console.log(this.currentUser);
        });
    }

    ngOnInit() {
        this.form = new FormGroup({
            name: new FormControl(null, {
                updateOn: 'blur',
                validators: [Validators.required, Validators.minLength(1)]
            }),
            surname: new FormControl(null, {
                updateOn: 'blur',
                validators: [Validators.required, Validators.minLength(1)]
            }),
            phone: new FormControl(null, {
                updateOn: 'blur',
                validators: [Validators.required, Validators.minLength(13), Validators.maxLength(14)]
            }),
            email: new FormControl(null, {
                updateOn: 'blur',
                validators: [Validators.required, Validators.email, Validators.pattern("(\\W|^)[\\w.+\\-]*@(gmail|yahoo|hotmail|outlook)\\.com(\\W|$)")]
            }),
            password: new FormControl(null, {
                updateOn: 'blur',
                validators: [Validators.required, Validators.minLength(8), Validators.pattern("^(?=.*\\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!~`^+=<>?;:{}/\\\\|[\\]@*#\\$%\\^&\\*\\-\\_]).{8,15}$")]
            }),
            confirmPassword: new FormControl(null, {
                updateOn: 'blur',
                validators: [Validators.required, Validators.minLength(8), PasswordValidator('password')]
            })
        });

        this.form.get('name').statusChanges.subscribe(status => {
            this.nameControlIsValid = status === 'VALID';
        });

        this.form.get('surname').statusChanges.subscribe(status => {
            this.surnameControlIsValid = status === 'VALID';
        });
        this.form.get('phone').statusChanges.subscribe(status => {
            this.phoneControlIsValid = status === 'VALID';
        });

        this.form.get('email').statusChanges.subscribe(status => {
            this.emailControlIsValid = status === 'VALID';
        });
        this.form.get('password').statusChanges.subscribe(status => {
            this.passwordControlIsValid = status === 'VALID';
        });
        this.form.get('confirmPassword').statusChanges.subscribe(status => {
            this.confirmPasswordControlIsValid = this.form.get("password").value === this.form.get("confirmPassword").value;
        });
    }

    onSubmit() {
        this.nameEl.nativeElement.focus();
        this.surnameEl.nativeElement.focus();
        this.phoneEl.nativeElement.focus();
        this.emailEl.nativeElement.focus();
        this.passwordEl.nativeElement.focus();
        this.passwordEl.nativeElement.dismissSoftInput();
        this.confirmPasswordEl.nativeElement.focus();
        this.confirmPasswordEl.nativeElement.dismissSoftInput();

        if (!this.form.valid) {
            return;
        }

        const name = this.form.get('name').value;
        const surname = this.form.get('surname').value;
        const phone = this.form.get('phone').value;
        const email = this.form.get('email').value;
        const password = this.form.get('password').value;
        const confirmPassword = this.form.get('confirmPassword').value;

        if (password !== confirmPassword ) {
            alert("Password and Confirm Password do not Match");
            return;
        }

        console.log(name, surname, phone, email, password, confirmPassword);
        this.form.reset();
        this.emailControlIsValid = true;
        this.passwordControlIsValid = true;
        this.isLoading = true;
        this.authService.signUp(name, surname, phone, email, password).subscribe(
            resData => {
                console.log(resData);
                this.isLoading = false;
                this.router.navigate(['patientLogin'], { clearHistory: true }).then();

            },
            err => {
                console.log(err);
                this.isLoading = false;
            }
        );
    }

    onDone() {
        this.nameEl.nativeElement.focus();
        this.surnameEl.nativeElement.focus();
        this.phoneEl.nativeElement.focus();
        this.emailEl.nativeElement.focus();
        this.passwordEl.nativeElement.focus();
        this.confirmPasswordEl.nativeElement.focus();
        this.confirmPasswordEl.nativeElement.dismissSoftInput();
        this.passwordEl.nativeElement.dismissSoftInput();
    }

    newUser(){
      /*  console.log("clicked");
        this.authService.createNewUser().subscribe(
            resData => {
                console.log(resData);
            });*/
    }

    checkPasswords(group: FormGroup) { // here we have the 'passwords' group
        let pass = group.controls.password.value;
        let confirmPass = group.controls.confirmPass.value;

        return pass === confirmPass ? null : { notSame: true }
    }
}
