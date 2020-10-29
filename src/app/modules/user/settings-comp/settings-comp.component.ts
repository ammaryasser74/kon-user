import { Component, OnInit } from '@angular/core';
import { SettingService } from 'src/app/services/user/setting.service';

@Component({
  selector: 'app-settings-comp',
  templateUrl: './settings-comp.component.html',
  styleUrls: ['./settings-comp.component.css']
})
export class SettingsCompComponent implements OnInit {
  settings:any
  constructor( public settingService: SettingService,) { }

  ngOnInit() {
    this.settingService.GetList().subscribe(res=>{
      this.settings=res.Data;console.log(res.Data,"kk");
    })
  }

}
