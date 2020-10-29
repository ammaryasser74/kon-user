import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { LocalStorageService } from 'angular-2-local-storage';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserService } from 'src/app/services/user/user.service';
import { BsModalRef } from 'ngx-bootstrap';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  form: FormGroup;
  loading: boolean;
  error: string;
  constructor(private formBuilder: FormBuilder,
    public localStorageService: LocalStorageService,
    public userService: UserService,
    private toastr: ToastrService,
    public myModel: BsModalRef,
    public router: Router,) { }

  ngOnInit() {
    this.initForm()
  }
  initForm() {
    this.form = this.formBuilder.group({
      first_name: [null, Validators.required],
      last_name: [null, Validators.required],
      phone: [null, Validators.required],
      email: [null, Validators.required],

      password: [null, Validators.required],
      gender: ['Male', Validators.required],
    });
  }
  save() {
    if (this.form.valid) {
      this.loading = true
      this.error=null;
      this.userService.Post(this.form.value).subscribe(res => {
        if (res.Success) {
          this.loading = false;
          this.toastr.success(res.Message);
          this.localStorageService.set('accessToken', res.Data.token);
          this.localStorageService.set('currentUser', res.Data);
          this.myModel.hide();
          if (res.Data.type == 'client') {
            this.router.navigate(['/user/portfolio']).then(e => {
              if (e) {
                window.location.reload();
              }
            });
          } else {
            this.router.navigate(['/user/portfolio-coach']).then(e => {
              if (e) {
                window.location.reload();
              }
            });
          }
        } else {
          this.error=res.Message
          this.loading=false
          // this.toastr.error(res.Message);
        }
      }
      );
    } else {
      for (const control in this.form.controls) {
        this.form.get(control).markAsDirty();
      }
    }
  }
}
