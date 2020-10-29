import { Component, OnInit, Input } from '@angular/core';
import { ReservationService } from 'src/app/services/user/reservation.service';
import { HttpRequest, HttpClient, HttpEventType, HttpResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ToastrService } from 'ngx-toastr';
import { BsModalRef } from 'ngx-bootstrap';
@Component({
  selector: 'app-add-plan-comment',
  templateUrl: './add-plan-comment.component.html',
  styleUrls: ['./add-plan-comment.component.css']
})
export class AddPlanCommentComponent implements OnInit {
  @Input() type
  @Input() sessionID
  file:any;
  filepath:null;
  fileData=null;
  onClose: any;
  constructor(private ReservationService:ReservationService,
    public myModel: BsModalRef,
    private toastr: ToastrService,
    private http: HttpClient,) { }

  ngOnInit() {
    
  }
  onSelectFile(event) {
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]); // read file as data url
      this.fileData = <File>event.target.files[0];
      this.file=this.fileData
      reader.onload =(event:any) => {
          this.file=(event.target.result);
          this.uploadmyImage(this.fileData);
      }
}}
uploadmyImage(Data){
  const formData = new FormData();
  formData.append('file',Data);
  this.http.request(new HttpRequest('POST',`${environment.api_url}/UploadFile`,
  formData,{ reportProgress: true })).subscribe(
    event => {
      if (event.type === HttpEventType.Response) {
       if (event.body['Success']) {
       this.filepath=event.body['Data'].file;
        } else {
          this.toastr.error("something wrong upload again");
        }
      }
    },
  );
}
Save(){
  console.log();
  
  if(this.type==2){
    this.ReservationService.UploadActionComment({action_comment:this.filepath,id:this.sessionID}).subscribe(res => {
      if(res.Success){
          this.toastr.success(res.Message);
          this.myModel.hide();
              this.onClose();
      }
      else{
        this.toastr.success(res.Message)
      }
    });
  }
  else{
    this.ReservationService.UploadActionPlan({action_plan:this.filepath,id:this.sessionID}).subscribe(res => {
      if(res.Success){
          this.toastr.success(res.Message);
          this.myModel.hide();
              this.onClose();
      }
      else{
        this.toastr.success(res.Message)
      }
    });
  }
 
}
}
