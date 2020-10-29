
import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap';
import { LanguageService } from 'src/app/services/language.service';
import { ChildService } from 'src/app/services/user/children.service';
import { ToastrService } from 'ngx-toastr';
import { CountryService } from 'src/app/services/user/country.service';
import * as moment from 'moment-timezone';

@Component({
  selector: 'app-add-child',
  templateUrl: './add-child.component.html',
  styleUrls: ['./add-child.component.css']
})
export class AddChildComponent implements OnInit {
  form: FormGroup;
  jobs:any;
  country:any;
  cities:any;
  onClose: any;
  id:number;
  Data:any;
  today = new Date();
  @Input() clientID
  martial_status:any;
  showJobName:boolean=false
  loading:boolean
  constructor(private formBuilder: FormBuilder, 
    public languageService:LanguageService,
    public myModel: BsModalRef,
    private toastr: ToastrService,
    private childService:ChildService,
    ) { }
    ngOnInit() {
       this.initForm();
       if(this.Data){
         this.form.patchValue(this.Data)
       }
     }
     initForm() {
       this.form = this.formBuilder.group({
         id: [0],
         name: [null,Validators.required],
         gender: [""],
         age:[null],
         birthdate:[null],
         client_id:this.clientID
       });
     }

     save() {
       if (this.form.valid) {
         this.loading=true 
        this.form.value.birthdate=moment(this.form.value.birthdate).format('YYYY-MM-DD')
         if (this.form.value.id == 0) {
           this.childService.Post(this.form.value).subscribe(
             res => {
               if (res.Success) {
                 this.toastr.success(res.Message,"Sucess");
                 this.loading=false 
                 this.myModel.hide();
                 this.onClose();
               } else {
                 this.toastr.error(res.Message,"Sucess");
                 this.loading=false 
               }
             }
           );
         } else if (this.form.value.id > 0 && this.form.dirty) {
           this.childService.Update(this.form.value).subscribe(
             res => {
               if (res.Success) {
                 this.toastr.success(res.Message);
                 this.myModel.hide();
                 this.onClose();
               } else {
                 this.toastr.error(res.Message[0]);
               }
             }
           );
         }
       }
       else {
         for (let control in this.form.controls) {
           this.form.get(control).markAsDirty();
         }
       }
     }
}

