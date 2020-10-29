import { Component, OnInit } from '@angular/core';
import { StarRatingComponent } from 'ng-starrating';
import { LocalStorageService } from 'angular-2-local-storage';
import { UserService } from 'src/app/services/user/user.service';

import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';

import { Subscription, interval } from 'rxjs';
@Component({
  selector: 'app-chief-layout',
  templateUrl: './chief-layout.component.html',
  styleUrls: ['./chief-layout.component.css'],
})
export class ChiefLayoutComponent implements OnInit {
  myavatar: any;
  Data: any;
  listNotification:[]
  tabactive: string;
  refresher: Subscription;
  constructor(
    public userService: UserService,
    private activeRoute: ActivatedRoute,
    private toastr: ToastrService,
    private router: Router,
    public localStorageService: LocalStorageService
  ) {}

  ngOnInit() {

  }

  logout() {
    this.userService.LogOut();
  }

}
