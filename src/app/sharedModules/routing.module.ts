import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../services/user/auth.guard';

export const routes: Routes = [
  {
    path: 'user',
    loadChildren: 'src/app/modules/user/user.module#UserModule',
  },
  {
    path: 'Coache',
    loadChildren: 'src/app/modules/coache/coache.module#CoacheModule',
  },

  { path: '**', pathMatch: 'full', redirectTo: '/user/home' },
];
@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
