import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { ChangeDetectionStrategy} from '@angular/core';
import { Subject } from 'rxjs';
import * as moment from 'moment-timezone';
import { CalendarEvent, CalendarEventAction ,CalendarView,} from 'angular-calendar';
import { PackagesService } from 'src/app/services/user/packages.service';
import { UserService } from 'src/app/services/user/user.service';
import { ReservationService } from 'src/app/services/user/reservation.service';

@Component({
  selector: 'app-calender',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './calender.component.html',
  styleUrls: ['./calender.component.css']
})
export class CalenderComponent implements OnInit {
  @Input() packageDetails: any;
  coachId;
  userId;
  eventClicked : boolean = false // indecate if evevnt is clicked or not 
  view: CalendarView = CalendarView.Month;
  CalendarView = CalendarView;
  viewDate: Date = new Date();
  actions: CalendarEventAction[] = [];
  refresh: Subject<any> = new Subject();
  events: CalendarEvent[] = [];
  avaliableTimes: any;
  activeDayIsOpen: boolean = true;

  constructor(private packagesService: PackagesService,
              public reservationService: ReservationService,
              private fb: FormBuilder,
              public userService: UserService ) {}
  form: FormGroup;
  ngOnInit() {
    this.userId = this.userService.currentUser.id;
    this.initForm();
    this.getAllEvent();
  }

  initForm(){
    this.form = this.fb.group({
      client_id: [this.userId, Validators.required],
      payment_method_id: [1, Validators.required],
      entity_id: [this.packageDetails.id, Validators.required],
      entity_type:["Package", Validators.required],
      times: this.fb.array([      
        this.fb.group({
        time_id: [null, Validators.required],
        date: [null, Validators.required],
        time_from: [null, Validators.required],
        time_to: [null, Validators.required]
      })]),
    })
  }

  get times() : FormArray {
    return this.form.get("times") as FormArray
  }

  addTimes() {
    let choiceTime = this.form.value.times[0].time_id
    let time = this.avaliableTimes[choiceTime];
    let currentFormGroup = this.times.at(this.times.length-1); //hold current formGroup that add to array
    currentFormGroup.get('date').setValue(time.date);
    currentFormGroup.get('time_from').setValue(time.time_from);
    currentFormGroup.get('time_to').setValue(time.time_to);
    console.log(time)
    console.log(this.form)
  }
  
  onSubmit() {
    if (this.form.valid) {
      this.reservationService.post(this.form.value).subscribe(res => {
        console.log(this.form.value);
        if (res.Success) {
        }
      });
    }
  }

  getAllEvent(){
    this.coachId = this.packageDetails.coach_id;
    this.packagesService.GetListTime(moment(this.viewDate).format('YYYY-MM-DD'), this.coachId).subscribe(res => {
      if(res.Success){
        res.Data.map(i => i.start = new Date(i.date));
        res.Data.map(i => i.end = new Date(i.date));
        this.events = res.Data;
        this.refresh.next();
      }
    })
  }

  dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }): void {
    this.avaliableTimes = this.events.filter(i => moment(i.start).format('YYYY-MM-DD') == moment(date).format('YYYY-MM-DD'));
    this.avaliableTimes.forEach(i => {
      if(i.date === moment(date).format('YYYY-MM-DD')){
        this.eventClicked = true
      }
    })
  }

  closeOpenMonthViewDay() {
    this.activeDayIsOpen = false;
  }

  //function to return list of session numbers avialable 
  repeteSession(sessionNumber: number): Array<number> { 
    return Array(sessionNumber); 
  }

}
