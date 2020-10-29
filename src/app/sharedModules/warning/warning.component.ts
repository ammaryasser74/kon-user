import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap';

@Component({
  selector: 'app-warning',
  templateUrl: './warning.component.html',
  styleUrls: ['./warning.component.css']
})
export class WarningComponent implements OnInit {

  onClose: any;
  boxObj: {msg?: string, yes?: string, no?: string} = {
    msg: 'Are you sure?', yes: 'Yes', no: 'No'
  };

  constructor(public warningModel: BsModalRef) { }

  ngOnInit() {
  }
}
