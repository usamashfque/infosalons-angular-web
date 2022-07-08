import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Signin } from 'src/app/models/signin.model';
import { Signup } from 'src/app/models/signup.model';
import { AccountService } from 'src/app/services/account.service';
import { CommonService } from 'src/app/services/common.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {

  user: any;
  loginForm: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.pattern(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/)]),
    password: new FormControl('', [Validators.required, Validators.minLength(8), Validators.maxLength(30)])
  });

  submitted = false;
  isLoading = false;
  isAuthenticated = false;
  error = false;


  //admin@fbs.com
  //admin12345

  constructor(
    private router: Router,
    private _snackBar: MatSnackBar,
    private accountService: AccountService,
    private commonService: CommonService,
  ) { }

  ngOnInit(): void {

    var _signInUser = JSON.parse(localStorage.getItem('signinuserinfo') || 'null');

    if (!!_signInUser) {
      this.router.navigateByUrl('admin/invoices');
    }
    this.isAuthenticated = true;
  }

  get f() {
    return this.loginForm.controls;
  }

  onSubmit() {
    this.submitted = true;
    if (this.loginForm.invalid) {
      return;
    }

    this.isLoading = true;
    this.submitted = false;

    var _data: Signin = {
      email: this.loginForm.value.email,
      password: this.loginForm.value.password
    };


    this.accountService.signin(_data).then((response: any) => {
      console.log(response)
      if (!!response?.token) {
        localStorage.setItem('signinuserinfo', JSON.stringify(response));
        localStorage.setItem('_access_token', response?.token);
        this.router.navigateByUrl("admin/invoices");
        this._snackBar.open("Sign in successfully", "Dismiss", this.commonService.snackConfig);
      } else {
        this.error = true;
        this._snackBar.open("Sign in Failed!", "Dismiss", this.commonService.snackConfig);
      }
      this.isLoading = false;
    }, (response) => {
      this.isLoading = false;
      this._snackBar.open("Sign in Failed!", "Dismiss", this.commonService.snackConfig);
    }).catch((response) => {
      this.isLoading = false;
      this._snackBar.open("Sign in Failed!", "Dismiss", this.commonService.snackConfig);
    });


  }

}
