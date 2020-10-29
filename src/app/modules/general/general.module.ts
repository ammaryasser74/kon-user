import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {LoaderComponent} from './loader/loader.component';
import {NgxSpinnerModule, NgxSpinnerService} from 'ngx-spinner';

@NgModule({
    imports: [
        CommonModule,
        NgxSpinnerModule
    ],
    declarations: [
        LoaderComponent
    ],
    exports: [LoaderComponent],
    providers: [
        NgxSpinnerService
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
    entryComponents: [],
})
export class GeneralModule {
}

