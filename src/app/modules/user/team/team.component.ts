import { Component, OnInit } from '@angular/core';
import { CoachService } from 'src/app/services/user/coaches.service';
import { environment } from 'src/environments/environment';
import { LanguageService } from 'src/app/services/language.service';
import { PartnerService } from 'src/app/services/user/partner.service';
import { SettingService } from 'src/app/services/user/setting.service';

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.css']
})
export class TeamComponent implements OnInit {
coaches:any;
myURL:any
partner:any
settings:any
  constructor(public coachService:CoachService,
    public settingService: SettingService,
    private partnerService:PartnerService,
    public languageService:LanguageService) { }

  ngOnInit() {
    this.settingService.GetList().subscribe(res=>{this.settings=res.Data})
    this.partnerService.GetList().subscribe(res=>{
      res.Data.map(i=>i.img=environment.api_imges+i.img)
      this.partner=res.Data})
    this.myURL=environment.api_imges
    this.coachService.GetList().subscribe(res=>{
      this.coaches=res.Data});
  }

}
