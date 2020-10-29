import { Component, OnInit } from '@angular/core';
import { PartnerService } from 'src/app/services/user/partner.service';
import { environment } from 'src/environments/environment';
import { ServiceService } from 'src/app/services/user/services.service';
import { StartReservationComponent } from '../portfolio/start-reservation/start-reservation.component';
import { LoginComponent } from 'src/app/sharedModules/layouts/login/login.component';
import { UserService } from 'src/app/services/user/user.service';
import { ToastrService } from 'ngx-toastr';
import { BsModalService } from 'ngx-bootstrap';
import { Router } from '@angular/router';
@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.css']
})
export class ServicesComponent implements OnInit {
  partner:any
  service:any;
  constructor(private partnerService:PartnerService,
    private toastr: ToastrService,
    private modalService: BsModalService,
    private userService: UserService,
    private router: Router, 
    private serviceService: ServiceService,
    ) { }

  ngOnInit() {
    this.serviceService.GetList().subscribe(res=>{this.service=res.Data})
    this.partnerService.GetList().subscribe(res=>{
      res.Data.map(i=>i.img=environment.api_imges+i.img)
      this.partner=res.Data})
  }
  // quickReservation(id){
  //   if(this.userService.currentUser){
  //     if(this.userService.currentUser.type=='client'){
  //       this.modalService.show( StartReservationComponent, 
  //          {
  //           initialState:
  //             {isEdit:false,id:0,reserveID:id },
  //         class: 'modal-lg-width',
  //       });
  //     }
  //     else{
  //       this.toastr.error("please login as client")
  //     }
      
  //   }
  //   else{
  //      this.modalService.show(LoginComponent, {
  //        class: 'modal-lg-width',
  //      });
  //   }
  // }
  quickReservation(id){
    console.log(id);
    
    if(this.userService.currentUser){
      if(this.userService.currentUser.type=='client'){
        this.router.navigate(['/user/reservation/'+id+'/'+0]);
        // this.modalService.show( StartReservationComponent,  {
        //   initialState:
        //     {reserveID:id,id:0 },
        //   class: 'modal-lg-width',

        // });
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
}
