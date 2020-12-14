import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutUserComponent } from 'src/app/sharedModules/layouts/layout-user/layout-user.component';
import { HomeComponent } from './home/home.component';
import { Route } from '@angular/router';

import { ContactusComponent } from './contactus/contactus.component';
import { HelpComponent } from './help/help.component';
import { PrivacyComponent } from './privacy/privacy.component';
import { TermsComponent } from './terms/terms.component';
import { ShoppingComponent } from './shopping/shopping.component';
import { ContinuShoppingComponent } from './continu-shopping/continu-shopping.component';


import { ResetMyPasswordComponent } from './reset-my-password/reset-mypassword.component';
import { TeamComponent } from './team/team.component';
import { StoryComponent } from './story/story.component';
import { PortfolioComponent } from './portfolio/portfolio.component';
import { ProtifiloCoachComponent } from './protifilo-coach/protifilo-coach.component';
import { ServicesComponent } from './services/services.component';
import { BookReservationComponent } from './book-reservation/book-reservation.component';
import { PackagesComponent } from './packages/packages.component';
import { CoursesComponent } from './courses/courses.component';
import { PackagedetailsComponent } from './packages/packagedetails/packagedetails.component';
import { CoursedetailsComponent } from './courses/coursedetails/coursedetails.component';

export const UserRouting: Route[] = [

  {
    path: '',
    component: LayoutUserComponent,
    children: [
      { path: 'reset-password/:id', component: ResetMyPasswordComponent },
      { path: 'home', component: HomeComponent },
      { path: 'contact-us', component: ContactusComponent },
      { path: 'help', component: HelpComponent },
      { path: 'privacy', component: PrivacyComponent },
      { path: 'terms', component: TermsComponent },
      { path: 'reservation/:reserveID/:id', component: BookReservationComponent },
      { path: 'continu-shopping', component: ContinuShoppingComponent },
      { path: 'shopping', component: ShoppingComponent },
      { path: 'team', component: TeamComponent },
      { path: 'story', component: StoryComponent },
      { path: 'portfolio', component: PortfolioComponent },
      { path: 'portfolio-coach', component: ProtifiloCoachComponent },
      { path: 'services', component: ServicesComponent },
      { path: 'courses', component: CoursesComponent },
      { path: 'course/:id', component: CoursedetailsComponent },
      { path: 'packages', component: PackagesComponent },
      { path: 'package/:id', component: PackagedetailsComponent },
    ],
  },
];
