import { Component, OnInit } from '@angular/core';
import { CoursesService } from 'src/app/services/user/courses.service';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css']
})
export class CoursesComponent implements OnInit {
  allCourses:[] ;
  totalRecords: string;
  pageNumber: number = 1;
  constructor(private courseSevice: CoursesService) { }

  ngOnInit() {
    this.getAllCourses()
  }
  getAllCourses(){
    this.courseSevice.GetList().subscribe(res => {
          console.log(res);
      if(res.Success && res.Data.length >= 1){
        this.allCourses = res.Data;
        this.totalRecords = res.Data.length;
        console.log(this.allCourses);
      }
    });
  }
}
