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
  file: any;
  filepath: null;
  fileData = null;
  onClose: any;
  title: string
  loading:boolean;
  FileUploaded:boolean= true;
  constructor(private ReservationService: ReservationService,
    public myModel: BsModalRef,
    private toastr: ToastrService,
    private http: HttpClient,) { 
      console.log(this.myModel.content);
      
    }

  ngOnInit() {
    setTimeout(() => {
      // console.log("myModel", this.myModel.content);
      if (this.myModel.content && this.myModel.content.type) {
        let titles ={1:"Add Action Plan" , 2: " Add Comment"}
        this.title = titles[this.myModel.content.type]
      }
    }, 10);
    

  }
  onSelectFile(event) {
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]); // read file as data url
      this.fileData = <File>event.target.files[0];
      this.file = this.fileData
      reader.onload = (event: any) => {
        this.file = (event.target.result);
        this.uploadmyImage(this.fileData);
      }
    }
  }
  uploadmyImage(Data) {
    const formData = new FormData();
    formData.append('file', Data);
    this.FileUploaded=false
    this.http.request(new HttpRequest('POST', `${environment.api_url}/UploadFile`,
      formData, { reportProgress: true })).subscribe(
        event => {
          if (event.type === HttpEventType.Response) {
            if (event.body['Success']) {
              this.filepath = event.body['Data'].file;
              this.FileUploaded = true
            } else {
              this.FileUploaded = true
              this.toastr.error("something wrong upload again");
            }
          }
        },
      );
  }
  Save() {
    this.loading=true
    if (this.type == 2) {
      this.ReservationService.UploadActionComment({ action_comment: this.filepath, id: this.sessionID }).subscribe(res => {
        if (res.Success) {
          this.loading=false;
          this.toastr.success(res.Message);
          this.myModel.hide();
          this.onClose();
          
        }
        else {
          this.loading=false;
          this.toastr.success(res.Message)
        }
      });
    }
    else {
      this.ReservationService.UploadActionPlan({ action_plan: this.filepath, id: this.sessionID }).subscribe(res => {
        if (res.Success) {
          this.toastr.success(res.Message);
          this.myModel.hide();
          this.onClose();
          this.loading=false
        }
        else {
          this.toastr.success(res.Message)
          this.loading=false
        }
      });
    }

  }
}
