import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {UserRouting} from './user-routing.module';
import {ContactusComponent} from './contactus/contactus.component';
import {HomeComponent} from './home/home.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {RouterModule} from '@angular/router';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {SharedModule} from 'src/app/sharedModules/shared.module';
import {PrivacyComponent} from './privacy/privacy.component';
import {TermsComponent} from './terms/terms.component';
import {HelpComponent} from './help/help.component';
import {CategoryService} from 'src/app/services/user/categories.service';
import {LanguageService} from 'src/app/services/language.service';
import {CityService} from 'src/app/services/user/city.service';
import {SettingService} from 'src/app/services/user/setting.service';
import {ContactUsService} from 'src/app/services/user/contactus.service';

import {ResetPasswordComponent} from './portfolio/reset-password/reset-password.component';

import {EventService} from 'src/app/services/user/event.service';

import {RatingModule} from 'ng-starrating';

import {ShoppingComponent} from './shopping/shopping.component';
import {CartService} from 'src/app/services/user/cart.service';
import {AuthServiceConfig} from 'angularx-social-login';
// import { provideConfig } from 'src/app/app.module';
import {Ng5SliderModule} from 'ng5-slider';
import {NgSelectModule} from '@ng-select/ng-select';

import {ContinuShoppingComponent} from './continu-shopping/continu-shopping.component';
import {OrderService} from 'src/app/services/user/order.service';
import {PaymentMethodService} from 'src/app/services/user/paymentmethod.service';

import {WarningComponent} from 'src/app/sharedModules/warning/warning.component';


import {WeekelyDealsService} from 'src/app/services/user/weekely-deals.service';


import {LayoutsModule} from 'src/app/sharedModules/layouts/layouts.module';
import {ResetMyPasswordComponent} from './reset-my-password/reset-mypassword.component';
import {AuthGuard} from 'src/app/services/user/auth.guard';
import {TeamComponent} from './team/team.component';
import {StoryComponent} from './story/story.component';
import {ServiceService} from 'src/app/services/user/services.service';
import {PartnerService} from 'src/app/services/user/partner.service';
import {StoryService} from 'src/app/services/user/story.service';
import {CoachService} from 'src/app/services/user/coaches.service';
import {PortfolioComponent} from './portfolio/portfolio.component';
import {ClientService} from 'src/app/services/user/client.service';
import {CompleteProfileComponent} from './portfolio/complete-profile/complete-profile.component';
import {CountryService} from 'src/app/services/user/country.service';
import {JobService} from 'src/app/services/user/job.service';
import {SettingsCompComponent} from './settings-comp/settings-comp.component';
import {ProtifiloCoachComponent} from './protifilo-coach/protifilo-coach.component';
import {AddPlanCommentComponent} from './protifilo-coach/add-plan-comment/add-plan-comment.component';
import {ReservationService} from 'src/app/services/user/reservation.service';
import {StartReservationComponent} from './portfolio/start-reservation/start-reservation.component';
import {ServicesComponent} from './services/services.component';
import {ForgetPasswordComponent} from './forget-password/forget-password.component';
import {AddChildComponent} from './portfolio/start-reservation/add-child/add-child.component';
import {ChildService} from 'src/app/services/user/children.service';
import {CalendarModule, DateAdapter} from 'angular-calendar';
import {adapterFactory} from 'angular-calendar/date-adapters/date-fns';
import {OwlDateTimeModule, OwlNativeDateTimeModule} from 'ng-pick-datetime';
import {BookReservationComponent} from './book-reservation/book-reservation.component';
import {BookTicketComponent} from './home/book-ticket/book-ticket.component';
import {GeneralModule} from "../general/general.module";
import {NgxSpinnerModule, NgxSpinnerService} from "ngx-spinner";

export function HttpLoaderFactory(http: HttpClient) {
    return new TranslateHttpLoader(http, 'assets/i18n/user/', '.json');
}

@NgModule({
    imports: [
        CommonModule,
        SharedModule,
        ReactiveFormsModule,
        LayoutsModule,
        FormsModule,
        RatingModule,
        NgSelectModule,
        Ng5SliderModule,
        OwlDateTimeModule,
        OwlNativeDateTimeModule,
        CalendarModule.forRoot({
            provide: DateAdapter,
            useFactory: adapterFactory,
        }),
        RouterModule.forChild(UserRouting),
        TranslateModule.forRoot({
            loader: {

                provide: TranslateLoader,
                useFactory: HttpLoaderFactory,
                deps: [HttpClient],
            },
        }),
        NgxSpinnerModule
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
    entryComponents: [
        ResetPasswordComponent,
        CompleteProfileComponent,
        WarningComponent,
        StartReservationComponent,
        AddPlanCommentComponent,
        ForgetPasswordComponent,
        AddChildComponent,
        BookTicketComponent

    ],
    declarations: [

        HomeComponent,
        ForgetPasswordComponent,
        ContactusComponent,
        PrivacyComponent,
        TermsComponent,
        HelpComponent,
        ResetPasswordComponent,
        BookReservationComponent,
        ShoppingComponent,
        ContinuShoppingComponent,
        ResetMyPasswordComponent,
        TeamComponent,
        StoryComponent,
        PortfolioComponent,
        CompleteProfileComponent,
        SettingsCompComponent,
        ProtifiloCoachComponent,
        AddPlanCommentComponent,
        StartReservationComponent,
        ServicesComponent,
        AddChildComponent,
        BookTicketComponent,
    ],

    providers: [
        CategoryService,
        LanguageService,
        ReservationService,
        StoryService,
        CityService,
        SettingService,
        ContactUsService,
        ServiceService,
        AuthGuard,
        EventService,
        PartnerService,
        OrderService,
        JobService,
        PaymentMethodService,
        WeekelyDealsService,
        CoachService,
        ClientService,
        CountryService,
        ChildService,
        CartService,
        NgxSpinnerService,
        {
            provide: AuthServiceConfig,
            // useFactory: provideConfig,
        },
    ],
})
export class UserModule {
}
