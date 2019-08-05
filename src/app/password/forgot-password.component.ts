import {Component, ElementRef, OnInit, ViewChild, ViewContainerRef} from "@angular/core";
import {RouterExtensions} from "nativescript-angular";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {TextField} from "tns-core-modules/ui/text-field";
import {AuthService} from "~/app/services/auth.service";
import {ActivatedRoute} from "@angular/router";

@Component({
    selector: "Home",
    moduleId: module.id,
    templateUrl: "./forgot-password.component.html",
    styleUrls: ["./forgot-password.component.css"]
})
export class ForgotPasswordComponent implements OnInit {
    form: FormGroup;
    emailControlIsValid = true;
    isLoading = false;
    @ViewChild("emailEl", {static: false}) emailEl: ElementRef<TextField>;

    constructor(
        private router: RouterExtensions,
        private authService: AuthService
    ) {
    }

    ngOnInit() {
        this.form = new FormGroup({
            email: new FormControl(null, {
                updateOn: 'blur',
                validators: [Validators.required, Validators.email]
            }),
        });

        this.form.get('email').statusChanges.subscribe(status => {
            this.emailControlIsValid = status === 'VALID';
        });

    }

    onDone() {
        this.emailEl.nativeElement.focus();
    }

    delay(ms: number) {
        return new Promise( resolve => setTimeout(resolve, ms) );
    }
    async onSubmit() {
        this.emailEl.nativeElement.focus();

        if (!this.form.valid) {
            return;
        }

        this.form.reset();
        this.emailControlIsValid = true;
        this.isLoading = true;
        await this.delay(3000);
        this.isLoading = false;
        alert("Your password reset email sent successfully");

    }



}
