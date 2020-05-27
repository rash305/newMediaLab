import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {CategoriesComponent} from './shared/signs/components/category/categories.component';
import {RouterModule, Routes} from '@angular/router';
import {LearnComponent} from './modules/learn/learn.component';
import {SearchComponent} from './modules/dictionary/public-dictionary/search/search.component';
import {CreateAccountComponent} from './modules/settings/account/create/create-account.component';
import {LoginAccountComponent} from './modules/settings/account/login/login-account.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {HttpErrorHandler} from './common/network/http-error-handler.service';
import {SignsComponent} from './shared/signs/components/signs/signs.component';
import {SettingsPopupComponent} from './modules/settings/popup/settings-popup.component';
import {SquareOverviewTileComponent} from './shared/signs/components/square-overview-tile/square-overview-tile.component';
import {FormsModule} from '@angular/forms';
import {SettingsStartComponent} from './modules/settings/start/settings-start.component';
import { AccountComponent } from './modules/settings/account/account.component';
import { HelpComponent } from './modules/settings/help/help.component';
import { ChangeAccountComponent } from './modules/settings/account/change/change-account.component';
import { ForgotPwComponent } from './modules/settings/account/login/forgot-pw/forgot-pw.component';
import { ForgotPwCodeComponent } from './modules/settings/account/login/forgot-pw-code/forgot-pw-code.component';
import { ForgotPwNewComponent } from './modules/settings/account/login/forgot-pw-new/forgot-pw-new.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ToastrModule} from 'ngx-toastr';
import { NotLoggedInComponent } from './modules/add-sign/not-logged-in/not-logged-in.component';
import { AddSignComponent } from './modules/add-sign/add-sign/add-sign.component';
import { PersonalDictionaryComponent } from './modules/dictionary/personal-dictionary/personal-dictionary.component';
import { LogoutAccountComponent } from './modules/settings/account/logout/logout-account.component';
import { SignDetailsComponent } from './shared/signs/components/sign-details/sign-details.component';
import {NetworkErrorInterceptor} from './common/network/network-error-interceptor';
import {JwtAuthInterceptor} from './common/network/jwt-auth-interceptor';
import { SignOfDayComponent } from './modules/learn/sign-of-day/sign-of-day.component';
import { QuizQuestionComponent } from './modules/learn/quiz-question/quiz-question.component';
import { QuizResultsComponent } from './modules/learn/quiz-results/quiz-results.component';
import { PublicDictionaryComponent } from './modules/dictionary/public-dictionary/public-dictionary.component';
import { BackButtonComponent } from './shared/general/component/back-button/back-button.component';

const appRoutes: Routes = [
  {
    path: 'home',
    component: CategoriesComponent,
  },
  {
    path: 'personal',
    component: PersonalDictionaryComponent,
  },
  {
    path: 'signs/details/:id',
    component: SignDetailsComponent
  },
  {
    path: 'categories/:id',
    component: SignsComponent
  },
  {
    path: 'learn',
    component: LearnComponent,
  },
  {
    path: 'learn/sign-of-day/:id',
    component: SignOfDayComponent,
  },
  {
    path: 'learn/quiz-question/:id',
    component: QuizQuestionComponent,
  },
  {
    path: 'learn/quiz-results',
    component: QuizResultsComponent,
  },
  {
    path: 'dictionary',
    component: PublicDictionaryComponent,
  },
  {
    path: 'add-sign-not-logged-in',
    component: NotLoggedInComponent,
  },
  {
    path: 'add-sign',
    component: AddSignComponent,
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
    SettingsPopupComponent,
    SettingsStartComponent,
    CreateAccountComponent,
    LoginAccountComponent,
    SignsComponent,
    SquareOverviewTileComponent,
    PublicDictionaryComponent,
    AccountComponent,
    HelpComponent,
    ChangeAccountComponent,
    ForgotPwComponent,
    ForgotPwCodeComponent,
    ForgotPwNewComponent,
    NotLoggedInComponent,
    AddSignComponent,
    LogoutAccountComponent,
    PersonalDictionaryComponent,
    SignDetailsComponent,
    SignOfDayComponent,
    QuizQuestionComponent,
    QuizResultsComponent,
    BackButtonComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    HttpClientModule,
    RouterModule.forRoot(
      appRoutes, {
        useHash: false
      }
    ),
    FormsModule
  ],
  providers: [
    HttpClientModule,
    HttpErrorHandler,
    { provide: HTTP_INTERCEPTORS, useClass: JwtAuthInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: NetworkErrorInterceptor, multi: true },
  ],
bootstrap: [AppComponent]
})
export class AppModule {
}
