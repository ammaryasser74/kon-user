import { Component, OnInit} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CoursesService } from 'src/app/services/user/courses.service';

@Component({
  selector: 'app-coursedetails',
  templateUrl: './coursedetails.component.html',
  styleUrls: ['./coursedetails.component.css']
})
export class CoursedetailsComponent implements OnInit {
  allRelatedCourses: [];
  courseDetail: object;
  courseId: any;

  constructor(private courseSevice: CoursesService,private routeActive: ActivatedRoute) { }

  ngOnInit() {
    this.courseId = this.routeActive.snapshot.params.id;
    this.getCourseDetails();
    this.getRelatedCourses();
  }

  getRelatedCourses(){
    this.courseSevice.GetList().subscribe(res => {
      this.allRelatedCourses = res.Data.slice(0,3);
      console.log(this.allRelatedCourses);
    });
  }

  getCourseDetails(){
    this.courseSevice.getById(this.courseId).subscribe(res => {
      if(res.Success && res.Data){
        this.courseDetail = res.Data;
      }
    })
  }

  ngDoCheck(){
    if(this.courseId !== this.routeActive.snapshot.params.id ){
      this.courseId = this.routeActive.snapshot.params.id;
      this.getCourseDetails();
    }
  }
}
