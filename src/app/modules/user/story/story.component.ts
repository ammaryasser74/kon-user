import { Component, OnInit } from '@angular/core';
import { SettingService } from 'src/app/services/user/setting.service';
import { StoryService } from 'src/app/services/user/story.service';
import { LanguageService } from 'src/app/services/language.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-story',
  templateUrl: './story.component.html',
  styleUrls: ['./story.component.css']
})
export class StoryComponent implements OnInit {
  settings:any
  story:any;
  constructor(public settingService: SettingService,
  public storyService:StoryService,
  public languageService:LanguageService) { }
  ngOnInit() {
    this.settingService.GetList().subscribe(res=>{this.settings=res.Data})
    this.storyService.GetList().subscribe(res=>{
      res.Data.map(i=>i.img=environment.api_imges+i.img)
      this.story=res.Data})
  }
}
