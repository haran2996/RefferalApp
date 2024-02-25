import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AuthService } from "../services/auth.service";

@Component({
  selector: "app-sign-up",
  templateUrl: "./sign-up.component.html",
  styleUrl: "./sign-up.component.css",
})
export class SignUpComponent implements OnInit {
  signupForm!: FormGroup;
  disableButton: boolean = false;
  signupStatus: string = "NotSignedUp";
  signupErrorMessage!: string;
  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
  ) {}
  ngOnInit(): void {
    this.signupForm = this.formBuilder.group({
      email: ["", [Validators.required, Validators.email]],
      password: ["", [Validators.required, Validators.minLength(8)]],
      cnfpassword: ["", Validators.required],
      fname: ["", [Validators.required, Validators.pattern(/^[a-zA-Z]+$/)]],
      lname: ["", [Validators.required, Validators.pattern(/^[a-zA-Z]+$/)]],
    });
  }
  handleSignup() {
    const { email, fname, lname, password } = this.signupForm.value;
    this.authService
      .signupUser({
        email,
        fname,
        lname,
        password,
      })
      .subscribe({
        next: (res) => {
          console.log("Signup successful", res);
          this.signupStatus = "SignedUp";
          this.signupForm.reset();
        },
        error: (err) => {
          console.log("API errored", err);
          this.signupStatus = "ErrorSignup";
          this.signupErrorMessage = "Couldn't sign up!!  Please try again";
        },
      });
  }
}
