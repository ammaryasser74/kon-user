import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { TranslateModule } from '@ngx-translate/core';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './sharedModules/routing.module';
import { LocalStorageModule } from 'angular-2-local-storage';
import { ToastrModule } from 'ngx-toastr';
import { SocialLoginModule, AuthServiceConfig } from 'angularx-social-login';
import {
  GoogleLoginProvider,
  FacebookLoginProvider,
} from 'angularx-social-login';
import { DateInputsModule } from '@progress/kendo-angular-dateinputs';
import { AuthGuard } from './services/user/auth.guard';
import { UserService } from './services/user/user.service';
import { CartService } from './services/user/cart.service';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
const config = new AuthServiceConfig([
  {
    id: GoogleLoginProvider.PROVIDER_ID,
    provider: new GoogleLoginProvider(
      '481178497166-4s9hjboq7ea96u224amm7tkhb0563s42.apps.googleusercontent.com'
    ),
  },
  {
    id: FacebookLoginProvider.PROVIDER_ID,
    provider: new FacebookLoginProvider('2179781775454775'),
  },
]);

export function provideConfig() {
  return config;
}

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ToastrModule.forRoot({
      timeOut: 3000,
      // positionClass: 'toast-bottom-right',
    }), // ToastrModule added,
    TranslateModule.forRoot(),
    LocalStorageModule.forRoot({
      prefix: 'kon',
      storageType: 'localStorage',
    }),
    SocialLoginModule,
    DateInputsModule,

    ServiceWorkerModule.register('sw.js', {
      enabled: environment.production,
    }),
  ],
  providers: [AuthGuard, UserService, CartService],
  bootstrap: [AppComponent],
})
export class AppModule {}
