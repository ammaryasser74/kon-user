import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/services/user/categories.service';
import { LanguageService } from 'src/app/services/language.service';
import { CityService } from 'src/app/services/user/city.service';

import { BsModalService } from 'ngx-bootstrap';
import { SettingService } from 'src/app/services/user/setting.service';
import { ToastrService } from 'ngx-toastr';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { StarRatingComponent } from 'ng-starrating';
import { CartService } from 'src/app/services/user/cart.service';
import { UserService } from 'src/app/services/user/user.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { SubLayoutService } from 'src/app/services/sub-layout.service';
import { environment } from 'src/environments/environment';
import { ServiceService } from 'src/app/services/user/services.service';
import { EventService } from 'src/app/services/user/event.service';
import { PartnerService } from 'src/app/services/user/partner.service';
import { SignUpComponent } from 'src/app/sharedModules/layouts/sign-up/sign-up.component';
import { LoginComponent } from 'src/app/sharedModules/layouts/login/login.component';
import { ReservationService } from 'src/app/services/user/reservation.service';
import { StartReservationComponent } from '../portfolio/start-reservation/start-reservation.component';
import { BookTicketComponent } from './book-ticket/book-ticket.component';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  service:any;
  event:any
  partner:any
  settings:any
  loading: boolean;
  myURL:any
  form: FormGroup;
  slideConfig =
 {slidesToShow: 3, slidesToScroll: 3, autoplay: true,
 autoplaySpeed: 3500, dots: false, infinite: true,
 arrows: true ,
 responsive: [
  { breakpoint: 1600, settings: { slidesToShow: 3, slidesToScroll: 3, } },
  { breakpoint: 1000, settings: { slidesToShow: 3, slidesToScroll: 3, } },
  { breakpoint: 600, settings: { slidesToShow: 1, slidesToScroll: 1, } } ]
};
categories: any;
userID: any = null;
cities: any;
brands: any;
currentUser:boolean
loadingtwo = false;
newMeal: any[] = [];
myOrderParam: any;
popularMeal: any[] = [];
subLayoutEvent: Subscription;
  constructor(
    private serviceService: ServiceService,
              public languageService: LanguageService,
              private modalService: BsModalService,
              public settingService: SettingService,
              public eventService:EventService,
              private toastr: ToastrService,
              private formBuilder: FormBuilder,
              public reservationService:ReservationService,
              private userService: UserService,
              private partnerService:PartnerService,
              private router: Router, ) { }
    slickInit(e) {
    }

   ngOnInit() {
     
     if(this.userService.currentUser){
       this.currentUser=true
     }
     else{
       this.currentUser=false
     }
    this.myURL=environment.api_imges
    this.settingService.GetList().subscribe(res=>{this.settings=res.Data})
    this.serviceService.GetList().subscribe(res=>{this.service=res.Data})
    this.eventService.eventnotClosed().subscribe(res=>{this.event=res.Data;
    })
    this.partnerService.GetList().subscribe(res=>{
      res.Data.map(i=>i.img=i.img?environment.api_imges+i.img:null)
      this.partner=res.Data})
  }
  quickReservation(id){

    if(this.userService.currentUser){
      if(this.userService.currentUser.type=='client'){
        this.router.navigate(['/user/reservation/'+id+'/'+0]);
      }
      else{
        this.toastr.error("please login as client")
      }
    }
    else{
       this.modalService.show(LoginComponent, {
         class: 'modal-lg-width',
       });
    }
  }

  bookTicket(row){
    if(this.userService.currentUser){
      if(this.userService.currentUser.type=='client'){
        this.modalService.show( BookTicketComponent,  {
          initialState:
            {Data:row,},
          class: 'modal-lg-width',

        });
      }
      else{
        this.toastr.error("please login as client")
      }
    }
    else{
       this.modalService.show(LoginComponent, {
         class: 'modal-lg-width',
       });
    }
  }

  signUp() {
    this.modalService.show(SignUpComponent, {
      class: 'modal-lg-width',
    });
  }
}



