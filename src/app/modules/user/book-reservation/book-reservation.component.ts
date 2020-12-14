import {
    ChangeDetectionStrategy,
    Component,
    Input,
    OnInit,
    TemplateRef,
    ViewChild,
    ViewEncapsulation,
} from '@angular/core';
import { Subject } from 'rxjs';
import { CalendarEvent, CalendarView, } from 'angular-calendar';
import { ServiceService } from 'src/app/services/user/services.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user/user.service';
import { ReservationService } from 'src/app/services/user/reservation.service';
import { ClientService } from 'src/app/services/user/client.service';
import { LanguageService } from 'src/app/services/language.service';
import { ToastrService } from 'ngx-toastr';
import { AddChildComponent } from '../portfolio/start-reservation/add-child/add-child.component';
import * as moment from 'moment-timezone';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { NgxSpinnerService } from "ngx-spinner";


@Component({
    selector: 'mwl-demo-component',
    changeDetection: ChangeDetectionStrategy.OnPush,
    styleUrls: ['book-reservation.component.css'],
    templateUrl: 'book-reservation.component.html',
    encapsulation: ViewEncapsulation.None
})
export class BookReservationComponent implements OnInit {
    @ViewChild('modalContent', { static: true }) modalContent: TemplateRef<any>;
    addEditaddressModel: BsModalRef;
    myURL: any
    service: any;
    viewTimes: boolean
    @Input() id
    loading: boolean
    session: any;
    onClose: any;
    coaches: any
    form: FormGroup;
    avaliableTime: any
    today = new Date();
    NoTime: boolean
    view: CalendarView = CalendarView.Month;
    clientData: any = null
    isEdit: boolean
    loadmycalender: boolean
    CalendarView = CalendarView;
    myData: any
    @Input() reserveID;
    viewDate: Date = new Date();
    refresh: Subject<any> = new Subject();
    events: CalendarEvent[] = [];
    activeDayIsOpen: boolean = false;
    showLoader: boolean = false;
    reservation: any;
    coach_id: any;
    constructor(private serviceService: ServiceService,
        private formBuilder: FormBuilder,
        private activeRoute: ActivatedRoute,
        public userService: UserService,
        public reservationService: ReservationService,
        public clientService: ClientService,
        public languageService: LanguageService,
        private modalService: BsModalService,
        private router: Router,
        private spinner: NgxSpinnerService,
        private toastr: ToastrService) {
    }

    dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }): void {
        this.viewTimes = true
        this.avaliableTime = this.myData.filter(i => moment(i.start).format('YYYY-MM-DD') == moment(date).format('YYYY-MM-DD'));
        this.form.get('date').setValue(moment(date).format('YYYY-MM-DD'))
    }

    ngOnInit() {
        setTimeout(() => {
            window.scroll(0, 0);
        }, 100);

        this.myURL = environment.api_imges
        this.reserveID = this.router.url.split('/')[3]; //+this.activeRoute.snapshot.paramMap.get('id')
        this.id = this.router.url.split('/')[4];
        if (this.id != 0) {
            this.spinner.show();
        }

        this.getDataClient();
        this.initForm();

        this.serviceService.GetList().subscribe(res => {
            this.service = res.Data;
            const index = this.service.findIndex((service) => service.id === parseInt(this.reserveID));
            if (index !== -1) {
                this.form.patchValue({
                    serviceID: this.service[index].id
                });
            }
            if (this.id != 0) {
                this.isEdit = true;
                this.serviceService.Session(this.reserveID).subscribe(res2 => {
                    this.session = res2.Data;
                    this.reservationService.GetByID(this.id)
                        .subscribe((res) => {
                            res.Data.service_id = res.Data.entity.service_id;
                            res.Data.entity_id = res.Data.entity.id;
                            this.form.patchValue(res.Data);
                            this.reservation = res.Data;
                            this.form.get('total_price').setValue(this.coaches.find(i => i.id == res.Data.coach_id).pivot.price)
                            // this.form.get('offline_price').setValue(this.coaches.find(i => i.id == res.Data.coach_id).pivot.offline_price)
                            this.form.disable();
                            this.form.get('timeID').enable();
                            this.form.get('date').enable();
                            this.form.get('time_from').enable();
                            this.form.get('time_to').enable();
                            this.form.get('id').enable();
                            this.getTime();
                        }, err => {
                            this.spinner.hide();
                        });
                });
                // this.form.get('coach_id').setValue(this.id.coach_id)
                // this.form.get('id').setValue(this.id.id)
            }
        });
    }


    closeOpenMonthViewDay() {
        this.spinner.show();
        this.getTime();
        this.activeDayIsOpen = true;
    }

    getDataClient() {
        this.clientService.GetByID(this.userService.currentUser.id)
            .subscribe(res => {
                this.clientData = res.Data;
            });
    }

    addChild() {
        this.addEditaddressModel = this.modalService.show(AddChildComponent, {
            initialState:
                { clientID: this.userService.currentUser.client.id }, class: ''
        });
        this.addEditaddressModel.content.onClose = (res) => {
            this.getDataClient();
        };
    }

    initForm() {
        this.form = this.formBuilder.group({
            id: [0],
            client_id: this.userService.currentUser.client.id,
            payment_method_id: [1, Validators.required],
            coach_id: [null, Validators.required],
            entity_id: [null, Validators.required],
            entity_type: 'Session',
            timeID: [null, Validators.required],
            type: [null, Validators.required],
            total_price: [null, Validators.required],
            date: [null, Validators.required],
            time_from: [null, Validators.required],
            time_to: [null, Validators.required],
            serviceID: [null, Validators.required],
            offline_price: [0],
            online_price: [0],
            child_id: [null],
            foryou: [1]
        })

        this.form.get('serviceID').valueChanges.subscribe(serviceID => {
            this.serviceService.Session(serviceID).subscribe(res => {
                this.session = res.Data;
                if (!this.isEdit) {
                    this.form.get('entity_id').setValue(null)
                }
            });
        });

        this.form.get('entity_id').valueChanges.subscribe(entityid => {
            if (entityid != null) {
                this.coaches = this.session.find(i => i.id == entityid).coaches;
                this.coaches.map(i => i.avater = this.myURL + i.user.avater);
            }
        });
        this.form.get('coach_id').valueChanges.subscribe(coach => {
            if (coach) {
                this.spinner.show();
                if (this.id == 0) {
                    this.form.get('total_price').setValue(this.coaches.find(i => i.id == coach).pivot.price)
                }
                this.getTime();
            }
        });
    }

    getTime() {
        this.loadmycalender = true;
        if (this.form.value.coach_id) this.coach_id = this.form.value.coach_id
        this.reservationService.GetListTime(moment(this.viewDate).format('YYYY-MM-DD'), this.coach_id)
            .subscribe(response => {
                this.loadmycalender = false;
                response.Data.map(i => i.start = new Date(i.date));
                response.Data.map(i => i.end = new Date(i.date));
                this.myData = response.Data;
                this.refresh.next();
                this.spinner.hide();
            }, err => {
                this.spinner.hide();
                console.log(this.showLoader, 'errrr');
            });
    }

    update() {
        this.form.get('id').setValue(this.id)
        if (this.form.value.timeID === null) {
            this.toast();
            return;
        }
        this.spinner.show();
        this.reservationService.UpdateTime(this.form.value).subscribe(res => {
            this.toastr.success(res.Message);
            this.spinner.hide();
            this.router.navigate(['/user/home']);
        }, err => {
            this.spinner.hide();
        });
    }

    toast() {
        this.toastr.error('required');
    }

    save() {
        if (this.form.value.timeID === null) {
            this.toast();
            return;
        }
        this.spinner.show();
        let time = this.avaliableTime[this.form.value.timeID];
        this.form.get('time_from').setValue(time.time_from);
        this.form.get('time_to').setValue(time.time_to);
        if (this.form.valid) {
            this.reservationService.post(this.form.value).subscribe(
                res => {
                    console.log(this.form.value);
                    if (res.Success) {
                        this.toastr.success(res.Message);
                        this.spinner.hide();
                        this.router.navigate(['/user/home']);
                    } else {
                        this.spinner.hide();
                        this.toastr.error(res.Message);
                    }
                }, err => {
                    this.spinner.hide();
                });
        } else {
            for (const control in this.form.controls) {
                this.form.get(control).markAsDirty();
            }
        }
    }
}
