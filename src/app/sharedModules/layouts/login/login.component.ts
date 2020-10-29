
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ContactUsService } from 'src/app/services/user/contactus.service';
import { HttpClient } from '@angular/common/http';

import { ToastrService } from 'ngx-toastr';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';

import { UserService } from 'src/app/services/user/user.service';
import { SwPush } from '@angular/service-worker';
import { Router } from '@angular/router';
import { LocalStorageService } from 'angular-2-local-storage';

import { CartService } from 'src/app/services/user/cart.service';
import { SignUpComponent } from '../sign-up/sign-up.component';
import { ForgetPasswordComponent } from 'src/app/modules/user/forget-password/forget-password.component';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  swRegistration;
  form: FormGroup;
  myDataforcard: any = [];
  myOrderParam: any;
  loading = false;
  URLrouters: any[] = this.router.url.split('/');
  constructor(private formBuilder: FormBuilder,
              public  contactUsService: ContactUsService,
              private http: HttpClient,
              private toastr: ToastrService,
              public myModel: BsModalRef,
              private modalService: BsModalService,
              public userService: UserService,
              private cartService: CartService,
              private swPush: SwPush,
              private router: Router,
              private localStorageService: LocalStorageService, ) { }

  ngOnInit() {
    this.initForm();
    this.form.reset();
  }
  initForm() {
    this.form = this.formBuilder.group({
      LoginField: [null, Validators.required],
      Password: [null, Validators.required],
    });
  }
  signUp() {
    this.modalService.show(SignUpComponent, {
      class: 'modal-lg-width'});
  }
  newUser(){
    this.myModel.hide()
    this.modalService.show(SignUpComponent, {
      class: 'modal-lg-width'});
  }
  forgetPassword(){
    this.myModel.hide();
    this.modalService.show(ForgetPasswordComponent);
  }
  login() {
    if (this.form.valid) {
      this.loading = true;
      this.userService.Login(this.form.value).subscribe(
       res => {
        this.loading = false;
        if (res.Success) {
          if (res.Data.type=='admin'){
            this.toastr.error('Cannot enter as admin');
           }
            
           else if (res.Data.type == 'client') {
            this.localStorageService.set('accessToken', res.Data.token);
            this.localStorageService.set('currentUser', res.Data);
            this.myModel.hide();
             this.router.navigate(['/user/portfolio']);
           } 
            
           else {
            this.localStorageService.set('accessToken', res.Data.token);
            this.localStorageService.set('currentUser', res.Data);
            this.myModel.hide();
            this.router.navigate(['/user/portfolio-coach']);
           }
          } else {this.toastr.error(res.Message); }
       });
    } else {
      for (const control in this.form.controls) {
        this.form.get(control).markAsDirty();
      }
    }
  }
}

