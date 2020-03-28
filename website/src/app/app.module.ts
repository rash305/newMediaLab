import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { CategoriesComponent } from './modules/categories/categories.component';
import {RouterModule, Routes} from '@angular/router';
import { LearnComponent } from './modules/learn/learn.component';
import { SearchComponent } from './modules/search/search.component';
import { SettingsComponent } from './modules/settings/settings.component';

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
    SettingsComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(
      appRoutes, {
        useHash: false
      }
    )
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
