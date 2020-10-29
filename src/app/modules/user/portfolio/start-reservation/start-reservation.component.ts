import { Component, OnInit, Input } from '@angular/core';
import { ServiceService } from 'src/app/services/user/services.service';
import { LanguageService } from 'src/app/services/language.service';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { UserService } from 'src/app/services/user/user.service';
import { ReservationService } from 'src/app/services/user/reservation.service';
import { ClientService } from 'src/app/services/user/client.service';
import { AddChildComponent } from './add-child/add-child.component';
import * as moment from 'moment-timezone';
@Component({
  selector: 'app-start-reservation',
  templateUrl: './start-reservation.component.html',
  styleUrls: ['./start-reservation.component.css']
})
export class StartReservationComponent implements OnInit {
  addEditaddressModel: BsModalRef;
  service:any;
  session:any;
  onClose: any;
  coaches:any
  form: FormGroup;
  avaliableTime:any
  today = new Date();
  NoTime:boolean
  @Input() isEdit:boolean
  @Input() id
  @Input() reserveID
  
  clientData:any=null
  constructor( 
            private serviceService: ServiceService,
            public myModel: BsModalRef,
            private formBuilder: FormBuilder,
            public userService: UserService,
            public reservationService:ReservationService,
            public clientService:ClientService,
            public languageService: LanguageService,
            private modalService: BsModalService,
            private toastr: ToastrService,
            ) { }

  ngOnInit() {
    this.getDataClient()
    this.initForm();
    if(this.reserveID!=0){
      this.form.get('serviceID').setValue(this.reserveID)
    }
    if(this.id!=0){
     this.form.get('coach_id').setValue(this.id.coach_id)
     this.form.get('id').setValue(this.id.id)
    }

    this.serviceService.GetList().subscribe(res=>{
    this.service=res.Data;
    })
  }
  getDataClient(){
    this.clientService.GetByID(this.userService.currentUser.id).subscribe(res=>{this.clientData=res.Data;
      console.log(res.Data,",kik,");})
  }

  addChild(){
    this.addEditaddressModel = this.modalService.show(AddChildComponent, { initialState:
      {clientID: this.userService.currentUser.client.id, }, class: '' });
      this.addEditaddressModel.content.onClose  = (res) => {
        this.getDataClient()
      };
  }
  initForm() {
    this.form = this.formBuilder.group({
      id:[0],
      client_id:this.userService.currentUser.client.id,
      payment_method_id: [1, Validators.required],
      coach_id: [null, Validators.required],
      entity_id:[null, Validators.required],
      entity_type:'Session',
      timeID:[null,Validators.required],
      type:[null, Validators.required],
      total_price:[null, Validators.required],
      date:[null, Validators.required],
      time_from:[null, Validators.required],
      time_to:[null, Validators.required],
      serviceID:[null, Validators.required],
      offline_price:[null, Validators.required],
      online_price:[null, Validators.required],
      child_id:[null],
      foryou:[1]
    })
     this.form.get('date').setValue(this.today)
    this.form.get('serviceID').valueChanges.subscribe(serviceID=>{
      this.serviceService.Session(serviceID).subscribe(res=>{
        this.session=res.Data
        this.form.get('entity_id').setValue(null)
      })   
    })

    this.form.get('entity_id').valueChanges.subscribe(entityid=>{ 
      if(entityid!=null){
        this.coaches=this.session.find(i=>i.id==entityid).coaches;
        console.log(this.coaches,"ll=");
        
      }
     
    })

    this.form.get('date').valueChanges.subscribe(date=>{
      if(this.form.value.coach_id){
 
        this.reservationService.Time({date:moment(this.form.value.date).format('YYYY-MM-DD'),coach_id:this.form.value.coach_id}).
        subscribe(res=>{
          if(res.Data){
            this.NoTime=false
            this.avaliableTime=res.Data;
          }
          else{
            this.avaliableTime=[]
            this.NoTime=true
          }
        

        }) 
      }
    })

    this.form.get('coach_id').valueChanges.subscribe(coach=>{
      if(coach){

        if(this.id==0){
          this.form.get('online_price').setValue(this.coaches.find(i=>i.id==coach).pivot.online_price)
          this.form.get('offline_price').setValue(this.coaches.find(i=>i.id==coach).pivot.offline_price)
        }
      
        this.reservationService.Time({date:this.form.value.date,coach_id:this.form.value.coach_id}).
        subscribe(res=>{this.avaliableTime=res.Data;
        }) 
      }
    })

  }

  update(){
    this.reservationService.UpdateTime(this.form.value).subscribe(res=>{
      this.toastr.success(res.Message)
    })
  }
  save() {
    if(this.form.value.online_price==this.form.value.total_price)
    {
      this.form.get('type').setValue('online')
    }
    else{
      this.form.get('type').setValue('offline')
    }
    let time= this.avaliableTime.find(i=>i.id==this.form.value.timeID)
    this.form.get('time_from').setValue(time.time_from)
    this.form.get('time_to').setValue(time.time_to)
    if (this.form.valid) {
        this.reservationService.post(this.form.value).subscribe(
          res => {
             if (res.Success) {
               this.toastr.success(res.Message);
               this.myModel.hide();
               this.onClose()
              } else {this.toastr.error(res.Message); }
          });
    } else {
      for (const control in this.form.controls) {
        this.form.get(control).markAsDirty();
      }
    }
  }

}
