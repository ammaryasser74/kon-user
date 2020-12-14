import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { PackagesService } from 'src/app/services/user/packages.service';


@Component({
  selector: 'app-packagedetails',
  templateUrl: './packagedetails.component.html',
  styleUrls: ['./packagedetails.component.css']
})
export class PackagedetailsComponent implements OnInit {
  packageDetail: object;
  packageId: any;
  coachId: any;

  constructor(private packagesService: PackagesService,private routeActive: ActivatedRoute) { }

  ngOnInit() {
    this.packageId = this.routeActive.snapshot.params.id;
    this.getPackageDetails()
  }

  getPackageDetails(){
    this.packagesService.getById(this.packageId).subscribe(res => {
      if(res.Success && res.Data){
        this.packageDetail = res.Data;
        this.coachId = res.Data.coach_id;
        console.log(this.packageDetail)
      }
    })
  }
}
