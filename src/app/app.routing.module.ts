import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {RouteUrls} from './app-routing.config';
import {NotAuthenticatedGuard} from './core/guards/not-authenticated.guard';
import {AuthenticatedGuard} from './core/guards/authenticated.guard';
import {RootResolverGuard} from './core/guards/root-resolver.guard';
import {ErrorComponent} from './shared/error/error.component';

const appRoutes: Routes = [
  {
    path: RouteUrls.LOGIN,
    canLoad: [NotAuthenticatedGuard],
    canActivate: [NotAuthenticatedGuard],
    loadChildren: () => import('src/app/features/login/login.module').then(m => m.LoginModule)
  },
  {
    path: RouteUrls.CHAT,
    canLoad: [AuthenticatedGuard],
    canActivate: [AuthenticatedGuard],
    loadChildren: () => import('src/app/features/chat/chat.module').then(m => m.ChatModule)
  },
  {path: '**', component: ErrorComponent, canActivate: [RootResolverGuard]},
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
