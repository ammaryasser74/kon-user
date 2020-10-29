import { Component, OnInit, Input } from '@angular/core';
import { ReservationService } from 'src/app/services/user/reservation.service';
import { LanguageService } from 'src/app/services/language.service';
import { UserService } from 'src/app/services/user/user.service';
import { LoginComponent } from 'src/app/sharedModules/layouts/login/login.component';
import { ToastrService } from 'ngx-toastr';
import { BsModalService, BsModalRef } from 'ngx-bootstrap';

@Component({
  selector: 'app-book-ticket',
  templateUrl: './book-ticket.component.html',
  styleUrls: ['./book-ticket.component.css']
})
export class BookTicketComponent implements OnInit {
@Input() Data
numberTicket:number
total:number
  constructor(public languageService: LanguageService,
    private reservationService:ReservationService,
    private toastr: ToastrService,
    public myModel: BsModalRef,
    private modalService: BsModalService,
    private userService: UserService,) { }

  ngOnInit() {
    console.log(this.Data);
    
  }
  gettotal(){
this.total=this.Data.price*this.numberTicket
  }
  bookTicket(ID){
    if(this.userService.currentUser){
      const asd={payment_method_id: 1,entity_id:ID,entity_type:'Event',no_of_ticket:this.numberTicket,client_id:this.userService.currentUser.client.id}
     this.reservationService.post(asd).subscribe(
       res => {
          if (res.Success) {
            this.toastr.success(res.Message); 
            this.myModel.hide()
           } else {this.toastr.error(res.Message); }
       });
    }
    else{
      
       this.modalService.show(LoginComponent, {
         class: 'modal-lg-width',
       });
    }
   }
}
