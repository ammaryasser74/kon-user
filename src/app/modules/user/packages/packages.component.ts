import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { PackagesService } from 'src/app/services/user/packages.service';
import { SharedDataService } from 'src/app/services/user/shared-data.service';

@Component({
  selector: 'app-packages',
  templateUrl: './packages.component.html',
  styleUrls: ['./packages.component.css']
})
export class PackagesComponent implements OnInit {
  allPackages:[] ;
  packageDetail: {} ;
  totalRecords: string;
  pageNumber: number = 1;

  constructor(private packagesService: PackagesService) { }

  ngOnInit() {
    this.getAllPackages();
  }

  getAllPackages(){
    this.packagesService.GetList().subscribe(res => {
      if(res.Success && res.Data.length >= 1){
        this.allPackages = res.Data;
        this.totalRecords = res.Data.length;
        console.log(this.allPackages)
      }
    })
    
  }


}
