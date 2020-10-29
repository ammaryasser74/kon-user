import { Component, OnInit, OnDestroy, Inject } from '@angular/core';
import { LoginComponent } from '../login/login.component';
import { StarRatingComponent } from 'ng-starrating';
import { BsModalService } from 'ngx-bootstrap/modal';
import { SignUpComponent } from '../sign-up/sign-up.component';
import { Subscription } from 'rxjs';
import { LanguageService } from '../../../services/language.service';
import { TranslateService } from '@ngx-translate/core';
import { SettingService } from 'src/app/services/user/setting.service';
import { ToastrService } from 'ngx-toastr';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { UserService } from 'src/app/services/user/user.service';
import { LocalStorageService } from 'angular-2-local-storage';
import { CartService } from 'src/app/services/user/cart.service';
import { RatingModule } from 'ng-starrating';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { ServiceService } from 'src/app/services/user/services.service';
import {DOCUMENT} from '@angular/common';

declare var require: any;
@Component({
  selector: 'app-layout-user',
  templateUrl: './layout-user.component.html',
  styleUrls: ['./layout-user.component.css'],
})
export class LayoutUserComponent implements OnInit {


  myUrl: any;

  subLayoutEvent: Subscription;
  cusines: any;
  loadingdata: boolean;
  brands: any;
  Total = 0;
  myCart: any;
  mydir: any;
  settings;
  form: FormGroup;
  isLogin = false;
  isChief = false;
  nav = 1;
  footnav = 1;
  loading: any = false;
  aside = 1;
  myasideclass: any;
  service:any
  isOpen = false;
  listNotification:[];
  constructor(
    @Inject(DOCUMENT) private document: Document,
    private modalService: BsModalService,
    public languageService: LanguageService,
    public translateService: TranslateService,
    public settingService: SettingService,
    private router: Router,
    private toastr: ToastrService,
    private formBuilder: FormBuilder,
    public userService: UserService,
    public cartService: CartService,
    private serviceService:ServiceService,
    public localStorageService: LocalStorageService
  ) {}

  openNav() {
    this.document.getElementById("mySidenav").style.width = "100%";
  }

  closeNav() {
    this.document.getElementById("mySidenav").style.width = "0";
  }

  ngOnInit() {
   
    this.serviceService.GetList().subscribe(res=>{this.service=res.Data})
    // this.userService.checkmyToken();
    this.myUrl = environment.api_imges;
    this.aside = 1;
    this.isOpen = false;
    this.nav = 1;
    this.footnav = 1;
    if (!this.userService.currentUser) {
      this.isLogin = false;
      this.isChief = false;
    } else {
      this.isLogin = true;
      if (this.userService.currentUser.type == 'customer') {
        this.cartService.updateCard();
        this.isChief = false;
      } else {
        this.isChief = true;
      }
    }

    this.loadingdata = true;
    this.initForm();


      this.settingService.GetList().subscribe(res => {
        this.settings = res.Data;
     
      });
   

    this.translateService.setDefaultLang(
      this.languageService.getLanguageOrDefault()
    );
    if (this.languageService.getLanguageOrDefault() === 'ar') {

      require('style-loader!src/assets/css/style-rtl.css');
    } else {

      require('style-loader!src/assets/css/style.css');
    }
  }

  getFromLocalStorage(key: string) {
    return this.localStorageService.get(key) as any;
  }

  initForm() {
    this.form = this.formBuilder.group({
      email: [null, Validators.required],
    });
  }
  login() {
    this.modalService.show(LoginComponent, {
      class: 'modal-lg-width',
    });
  }
  signUp() {
    this.modalService.show(SignUpComponent, {
      class: 'modal-lg-width',
    });
  }
  logout() {
    this.userService.LogOut();
  }

  toggleMenu() {
    this.isOpen = !this.isOpen;
  }

  closeMenu() {
    this.isOpen = false;
  }

 
  subscribe() {
    if (this.form.valid) {
      this.settingService.GetList().subscribe(res => {
        if (res.Success) {
          this.toastr.success(res.Message);
          this.form.reset();
        } else {
          this.toastr.error(res.Message);
        }
      });
    } else {
      for (const control in this.form.controls) {
        this.form.get(control).markAsDirty();
      }
    }
  }
}
