import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FileUploadModule} from 'ng2-file-upload';

import {AppComponent} from './app.component';
import {CategoriesComponent} from './shared/signs/components/category/categories.component';
import {RouterModule, Routes} from '@angular/router';
import {LearnComponent} from './modules/learn/learn.component';
import {SearchComponent} from './modules/dictionary/public-dictionary/search/search.component';
import {CreateAccountComponent} from './modules/settings/account/create/create-account.component';
import {LoginAccountComponent} from './modules/settings/account/login/login-account.component';
import {HTTP_INTERCEPTORS, HttpClient, HttpClientModule} from '@angular/common/http';
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
import { QuizQuestionComponent } from './modules/learn/quiz/quiz-question/quiz-question.component';
import { QuizResultsComponent } from './modules/learn/quiz/quiz-results/quiz-results.component';
import { PublicDictionaryComponent } from './modules/dictionary/public-dictionary/public-dictionary.component';
import { BackButtonComponent } from './shared/general/component/back-button/back-button.component';
import { QuizComponent } from './modules/learn/quiz/quiz.component';
import { DeletePopupComponent } from './modules/dictionary/personal-dictionary/delete-popup/delete-popup.component';
import { ConfirmChangeComponent } from './modules/settings/account/change/confirm-change/confirm-change.component';
import { ForgotPwConfirmComponent } from './modules/settings/account/login/forgot-pw-confirm/forgot-pw-confirm.component';
import { AddSignConfirmComponent } from './modules/add-sign/add-sign/add-sign-confirm/add-sign-confirm.component';
import { VideoUploadComponent } from './shared/general/component/video-upload/video-upload.component';
import { DomSanitizerPipe } from './common/html/pipes/dom-sanitizer.pipe';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import { PixabayDisclaimerComponent } from './common/disclaimer/pixabay-disclaimer/pixabay-disclaimer.component';
import { SignRouterComponent } from './modules/add-sign/add-sign/sign-router/sign-router.component';
import {LanguageInterceptor} from './common/network/language-interceptor';

const appRoutes: Routes = [
  {
    path: '',
    component: PersonalDictionaryComponent,
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
    path: 'learn/sign-of-day/:category-id/:sign-id',
    component: SignOfDayComponent,
  },
  {
    path: 'learn/quiz',
    component: QuizComponent,
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
    path: 'sign-router',
    component: SignRouterComponent,
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
    BackButtonComponent,
    QuizComponent,
    DeletePopupComponent,
    ConfirmChangeComponent,
    ForgotPwConfirmComponent,
    AddSignConfirmComponent,
    VideoUploadComponent,
    DomSanitizerPipe,
    PixabayDisclaimerComponent,
    SignRouterComponent,
  ],
  imports: [
    BrowserModule,
    FileUploadModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    HttpClientModule,
    RouterModule.forRoot(
      appRoutes, {
        useHash: false
      }
    ),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    FormsModule
  ],
  providers: [
    HttpClientModule,
    HttpErrorHandler,
    { provide: HTTP_INTERCEPTORS, useClass: JwtAuthInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: NetworkErrorInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: LanguageInterceptor, multi: true },
  ],
bootstrap: [AppComponent]
})
export class AppModule {
}

export function HttpLoaderFactory(http: HttpClient) {
  // Find more implementation stuff at:
  // https://www.codeandweb.com/babeledit/tutorials/how-to-translate-your-angular8-app-with-ngx-translate
  return new TranslateHttpLoader(http);
}
