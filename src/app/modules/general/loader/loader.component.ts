import {Component, OnInit, Input, OnChanges, SimpleChanges, AfterContentInit} from '@angular/core';
import {NgxSpinnerService} from 'ngx-spinner';

@Component({
    selector: 'app-loader',
    templateUrl: './loader.component.html',
    styleUrls: ['./loader.component.css']
})
export class LoaderComponent implements OnInit, AfterContentInit , OnChanges {
    @Input() show: boolean;

    constructor(private spinner: NgxSpinnerService) {
    }

    ngOnInit() {
    }

    ngAfterContentInit() {
        this.showSpinner();
    }

    ngOnChanges(changes: SimpleChanges) {
        console.log(changes);
        this.show = changes.show.currentValue;
        console.log(this.show , 'showoooo 1')
        this.showSpinner();
    }

    showSpinner() {
        console.log(this.show , 'showoooo')
        if (this.show) {
            this.spinner.show();
        } else {
            this.spinner.hide();
        }
    }
}
