
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { LayoutUserComponent } from './layout-user/layout-user.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { LoginComponent } from './login/login.component';
import { LanguageService } from 'src/app/services/language.service';
import {HttpClient} from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserService } from 'src/app/services/user/user.service';

import { BsDatepickerModule, RatingModule } from 'ngx-bootstrap';
import { AuthServiceConfig, AuthService } from 'angularx-social-login';
import { provideConfig } from 'src/app/app.module';
import { ChiefLayoutComponent } from './chief-layout/chief-layout.component';
import { SharedModule } from '../shared.module';
import { VerficationCodeComponent } from './verfication-code/verfication-code.component';


export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, 'src/assets/i18n/layout/', '.json');
}
@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule,
    RatingModule,
    BsDatepickerModule.forRoot(),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    BsDropdownModule.forRoot(),

  ],
  declarations: [
    LayoutUserComponent,
    SignUpComponent,
    LoginComponent,
    ChiefLayoutComponent,
    VerficationCodeComponent

  ],
  entryComponents: [
    SignUpComponent,
    LoginComponent,
    VerficationCodeComponent
  ],
  exports: [
    LayoutUserComponent, ChiefLayoutComponent,
    FormsModule, RatingModule
  ],
  providers: [
    LanguageService,
    UserService,
    AuthService,
    {
      provide: AuthServiceConfig,
      useFactory: provideConfig
    }
  ],
})
export class LayoutsModule { }

