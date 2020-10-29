import {Component, OnInit} from '@angular/core';
import {UserService} from 'src/app/services/user/user.service';
import {ClientService} from 'src/app/services/user/client.service';
import {environment} from 'src/environments/environment';
import {CompleteProfileComponent} from './complete-profile/complete-profile.component';
import {BsModalRef, BsModalService} from 'ngx-bootstrap';
import {Router} from '@angular/router';
import {ReservationService} from 'src/app/services/user/reservation.service';
import {ToastrService} from 'ngx-toastr';
import {LoginComponent} from 'src/app/sharedModules/layouts/login/login.component';

@Component({
    selector: 'app-portfolio',
    templateUrl: './portfolio.component.html',
    styleUrls: ['./portfolio.component.css']
})
export class PortfolioComponent implements OnInit {
    clientData: any
    addEditaddressModel: BsModalRef;
    Reservation: any;
    upcoming: any
    URL: any
    tab = 1

    constructor(public userService: UserService,
                private modalService: BsModalService,
                private router: Router,
                private toaster: ToastrService,
                public reservationService: ReservationService,
                public clientService: ClientService) {
    }

    ngOnInit() {
        if (this.userService.currentUser.type == 'client') {
            this.URL = environment.api_imges
            this.getDataClient()
        }
        else {
            this.router.navigate(['/user/home']);
        }
    }

    update(row) {
        if (this.userService.currentUser) {
            if (this.userService.currentUser.type == 'client') {
                this.router.navigate(['/user/reservation/' + row.entity.service_id + '/' + row.id]);
            } else {
                // this.toastr.error("please login as client")
            }
        } else {
            this.modalService.show(LoginComponent, {
                class: 'modal-lg-width',
            });
        }
        // this.addEditaddressModel = this.modalService.show(StartReservationComponent, {
        //   initialState:
        //     { myDatat: this.clientData,isEdit:true,id:row }, class: ''
        // });
        // this.addEditaddressModel.content.onClose = (res) => {
        //   this.getDataClient()
        // };
    }

    cancel(id) {
        this.reservationService.UpdateStatus(id).subscribe(res => {
            if (res.Success == true) {
                this.toaster.success(res.Message)
                this.getDataClient()
            }
            else {
                this.toaster.error(res.Message)
            }

        })

    }

    getDataClient() {
        this.clientService.GetByID(this.userService.currentUser.id).subscribe(res => {
            if (res.Data.avatar != null) {
                res.Data.avatar = environment.api_imges + res.Data.avatar

                this.clientData = res.Data
            }
            else {
                this.clientData = res.Data
            }
        })
        this.clientService.Reservation(this.userService.currentUser.id).subscribe(res => {


            res.Data.invoices.map(invoice => {
                invoice.NetTotal = invoice.total_price - ((2 * invoice.total_price) / 100)

            })
            res.Data.upcome.map(item => {
                const oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
                const firstDate: any = new Date();
                const secondDate: any = new Date(item.date);
                const diffDays = Math.round(Math.abs((firstDate - secondDate) / oneDay));
                if (diffDays < 3) {
                    item.can = false
                }
                else {
                    item.can = true
                }
            })
            this.Reservation = res.Data;
            if (res.Data.upcome.length > 0) {
                this.upcoming = res.Data.upcome[0]
            }
        })
    }

    changeSession(id) {
        this.upcoming = this.Reservation.upcome.find(i => i.id === id);
    }

    showProfile() {
        this.addEditaddressModel = this.modalService.show(CompleteProfileComponent, {
            initialState:
                {myDatat: this.clientData,}, class: '',
            backdrop: 'static'
        });
        this.addEditaddressModel.content.onClose = (res) => {
            this.getDataClient()
        };
    }

    Export(path) {
        window.open(`${environment.api_imges}${path}`);
    }

    startReservation() {

        if (this.userService.currentUser) {
            if (this.userService.currentUser.type == 'client') {
                this.router.navigate(['/user/reservation/' + 0 + '/' + 0]);
            }
            else {
                // this.toastr.error("please login as client")
            }
        }
        else {
            this.modalService.show(LoginComponent, {
                class: 'modal-lg-width',
            });
        }
        // this.addEditaddressModel = this.modalService.show(StartReservationComponent, {
        //   initialState:
        //     { myDatat: this.clientData,isEdit:false,id:0,reserveID:0 }, class: ''
        // });
        // this.addEditaddressModel.content.onClose = (res) => {
        //   this.getDataClient()
        // };
    }
}

