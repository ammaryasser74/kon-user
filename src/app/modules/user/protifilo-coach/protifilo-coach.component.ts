import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { UserService } from 'src/app/services/user/user.service';
import { CoachService } from 'src/app/services/user/coaches.service';
import { LanguageService } from 'src/app/services/language.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { AddPlanCommentComponent } from './add-plan-comment/add-plan-comment.component';
import { Router } from '@angular/router';
@Component({
  selector: 'app-protifilo-coach',
  templateUrl: './protifilo-coach.component.html',
  styleUrls: ['./protifilo-coach.component.css']
})
export class ProtifiloCoachComponent implements OnInit {
  Data: any
  Reservation
  URL: any
  tab = 1
  date = new Date()
  addEditaddressModel: BsModalRef;
  constructor(public userService: UserService,
    private router: Router,
    public languageService: LanguageService,
    private modalService: BsModalService,
    public coachService: CoachService) { }

  ngOnInit() {
    if (this.userService.currentUser.type == 'coach') {
      this.URL = environment.api_imges
      this.getData()
      this.reservation()
    }
    else {
      this.router.navigate(['/user/home']);
    }


  }
  getData() {



    this.coachService.GetByID(this.userService.currentUser.id).subscribe(res => {
      res.Data.avatar = res.Data.avatar ? environment.api_imges + res.Data.avatar : null
      this.Data = res.Data
    })




  }
  addPlanComment(type, sessionID) {
    this.addEditaddressModel = this.modalService.show(AddPlanCommentComponent, {
      initialState:
        { type: type, sessionID: sessionID }, class: ''
    });
    this.addEditaddressModel.content.onClose = (res) => {
      this.getData()
      this.reservation()
    };

  }
  Export(path) {
    window.open(`${environment.api_imges}${path}`);
  }
  reservation(type = null) {
    if (type == 1) {
      this.coachService.Reservation({ id: this.userService.currentUser.id, date: new Date() }).subscribe(res => {
      this.Reservation = res.Data;
      })
    }
    else if (type == 2) {
      var tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      this.coachService.Reservation({ id: this.userService.currentUser.id, date: tomorrow }).subscribe(res => {
      this.Reservation = res.Data;
      })
    }
    else {
      this.coachService.Reservation({ id: this.userService.currentUser.id, date: this.date }).subscribe(res => {
      this.Reservation = res.Data;
      })
    }

  }

}
