
import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { LocalStorageService } from 'angular-2-local-storage';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserService } from 'src/app/services/user/user.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { ClientService } from 'src/app/services/user/client.service';
import { CityService } from 'src/app/services/user/city.service';
import { CountryService } from 'src/app/services/user/country.service';
import { LanguageService } from 'src/app/services/language.service';
import { JobService } from 'src/app/services/user/job.service';
import { HttpRequest, HttpClient, HttpEventType, HttpResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ResetPasswordComponent } from '../reset-password/reset-password.component';
import * as moment from 'moment-timezone';
@Component({
  selector: 'app-complete-profile',
  templateUrl: './complete-profile.component.html',
  styleUrls: ['./complete-profile.component.css']
})
export class CompleteProfileComponent implements OnInit {
  addEditaddressModel: BsModalRef;
  @Input() myDatat;
  onClose: any;
  form: FormGroup;
  jobs: any;
  fileData = null;
  myavatar: any;
  martial_status: any;
  cities: any;
  country: any
  loading: boolean
  dataLoaded: boolean;
  constructor(private formBuilder: FormBuilder,
    public localStorageService: LocalStorageService,
    private jobService: JobService,
    public userService: UserService,
    public languageService: LanguageService,
    public clientService: ClientService,
    private modalService: BsModalService,
    private http: HttpClient,
    private cityService: CityService,
    private countryService: CountryService,
    private toastr: ToastrService,
    public myModel: BsModalRef,
    public router: Router,) { }

  ngOnInit() {

    console.log(this.myDatat, "lllllllllllll")
    this.myDatat.martial_status = this.myDatat.client.martial_status
    this.myDatat.job = this.myDatat.client.job
    // this.myDatat.age=this.myDatat.age
    this.myDatat.birthdate = this.myDatat.client.birthdate
    this.myavatar = environment.api_imges + this.myDatat.avater

    this.countryService.GetList().subscribe(res => {
      this.country = res.Data;
      this.cityService.GetList(this.myDatat.country_id).subscribe(res => {
        this.cities = res.Data
        this.form.patchValue(this.myDatat)
        this.dataLoaded = true;
        // this.form.get('country_id').valueChanges.subscribe(countryID => {
        //   this.form.get('city_id').reset()
        //   this.cities = []
        //   this.cityService.GetList(this.myDatat.country_id).subscribe(res => { this.cities = res.Data })
        // })

      })
    })

    this.martial_status =
      [
        { name: this.languageService.getLanguageOrDefault() == 'ar' ? 'اعزب' : "Single", value: 'single' },
        { name: this.languageService.getLanguageOrDefault() == 'ar' ? 'متزوج' : "Married", value: 'married' },
        { name: this.languageService.getLanguageOrDefault() == 'ar' ? 'مطلق' : "Divorced", value: 'divorced' }]
    this.initForm()

  }
  initForm() {
    this.form = this.formBuilder.group({
      id: [null],
      type: 'client',
      avatar: null,
      first_name: [null, Validators.required],
      last_name: [null, Validators.required],
      phone: [null, Validators.required],
      email: [null, Validators.required],
      job: [null, Validators.required],
      birthdate: [null],
      age: [null],
      gender: ['Male', Validators.required],
      country_id: [null, Validators.required],
      martial_status: [null, Validators.required],
      city_id: [null, Validators.required],
    })

  }
  onChangeCountry(e) {
    this.form.get('city_id').reset()
    this.cities = []
    this.cityService.GetList(e).subscribe(res => { this.cities = res.Data })
  }
  onSelectFile(event) {
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]); // read file as data url
      this.fileData = <File>event.target.files[0];
      this.myavatar = this.fileData
      reader.onload = (event: any) => {
        this.myavatar = (event.target.result);
        this.uploadmyImage(this.fileData);
      }
    }
  }
  uploadmyImage(Data) {
    const formData = new FormData();
    formData.append('img', Data);
    this.http.request(new HttpRequest('POST', `${environment.api_url}/UploadImage`,
      formData,
      { reportProgress: true }
    )
    ).subscribe(event => {
      if (event.type === HttpEventType.Response) {
        if (event.body['Success']) {
          this.form.get('avatar').setValue(event.body['Data'].image);
          this.saveavatar()
          this.myavatar = environment.api_imges + event.body['Data'].tempUrl
        } else {
          this.toastr.error('something wrong upload again');
        }
      }
    });
  }
  changePassword() {
    this.myModel.hide()
    this.addEditaddressModel = this.modalService.show(ResetPasswordComponent, {
      initialState:
        { userID: this.userService.currentUser.id, }, class: ''
    });
    this.addEditaddressModel.content.onClose = (res) => {
      // this.getDataClient()
    };
  }

  saveavatar() {
    this.clientService.SaveAvater({ UserID: this.userService.currentUser.id, avater: this.form.value.avatar }).subscribe(res => { this.toastr.success(res.Message) })
  }
  save() {
    if (this.form.valid) {
      this.loading = true;
      this.form.value.birthdate = moment(this.form.value.birthdate).format('YYYY-MM-DD')
      this.clientService.Update(this.form.value).subscribe(res => {
        if (res.Success) {
          this.loading = false;
          this.toastr.success(res.Message);
          this.localStorageService.set('currentUser', res.Data);
          this.myModel.hide();
          this.onClose()
        } else {
          this.toastr.error(res.Message);
          this.loading = false;
        }
      });
    } else {
      for (const control in this.form.controls) {
        this.form.get(control).markAsDirty();
      }
    }
  }
}
