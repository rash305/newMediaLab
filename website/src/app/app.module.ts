import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { CategoriesComponent } from './modules/dictionary/category/categories.component';
import {RouterModule, Routes} from '@angular/router';
import { LearnComponent } from './modules/learn/learn.component';
import { SearchComponent } from './modules/search/search.component';
import { CreateAccountComponent } from './modules/settings/account/create/create-account.component';
import { HttpClientModule } from '@angular/common/http';
import {HttpErrorHandler} from './common/network/http-error-handler.service';
import { SignsComponent } from './modules/dictionary/signs/signs.component';
import { SettingsPopupComponent } from './modules/settings/popup/settings-popup.component';
const appRoutes: Routes = [
  {
    path: 'home',
    component: CategoriesComponent,
  },
  {
    path: 'categories',
    component: CategoriesComponent,
  },
  {
    path: 'learn',
    component: LearnComponent,
  },
  {
    path: 'search',
    component: SearchComponent,
  },
  {
    path: 'settings',
    component: SettingsPopupComponent,
  },
  {
    path: '',
    redirectTo: '',
    pathMatch: 'full'
  }
];

@NgModule({
  declarations: [
    AppComponent,
    CategoriesComponent,
    LearnComponent,
    SearchComponent,
    CreateAccountComponent,
    SignsComponent,
    SettingsPopupComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(
      appRoutes, {
        useHash: false
      }
    )
  ],
  providers: [
    HttpClientModule,
    HttpErrorHandler],
  bootstrap: [AppComponent]
})
export class AppModule { }
