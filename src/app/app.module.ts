import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule} from '@angular/forms';

import { AppComponent } from './app.component';

import { Routing } from './app.routing';
import { LoginComponent} from './views/user/login/login.component';
import { ProfileComponent } from './views/user/profile/profile.component';
import { RegisterComponent } from './views/user/register/register.component';
import {UserService} from './services/user.service.client';
import { PageListComponent } from './views/page/page-list/page-list.component';
import { PageNewComponent } from './views/page/page-new/page-new.component';
import { WidgetChooserComponent } from './views/widget/widget-chooser/widget-chooser.component';
import { WidgetEditComponent } from './views/widget/widget-edit/widget-edit.component';
import { WidgetListComponent } from './views/widget/widget-list/widget-list.component';
import { WidgetHeaderComponent } from './views/widget/widget-edit/widget-header/widget-header.component';
import { WidgetImageComponent } from './views/widget/widget-edit/widget-image/widget-image.component';
import { WidgetYoutubeComponent } from './views/widget/widget-edit/widget-youtube/widget-youtube.component';
import { PageEditComponent } from './views/page/page-edit/page-edit.component';
import { WebsiteListComponent } from './views/website/website-list/website-list.component';
import { WebsiteNewComponent } from './views/website/website-new/website-new.component';
import { WebsiteEditComponent } from './views/website/website-edit/website-edit.component';
import {WebsiteService} from './services/website.service.client';
import {PageService} from './services/page.service.client';
import {WidgetService} from './services/widget.service.client';
import { WidgetNewComponent } from './views/widget/widget-chooser/widget-new/widget-new.component';
import { NewImageComponent } from './views/widget/widget-chooser/widget-new/new-image/new-image.component';
import { NewHeaderComponent } from './views/widget/widget-chooser/widget-new/new-header/new-header.component';
import { NewYoutubeComponent } from './views/widget/widget-chooser/widget-new/new-youtube/new-youtube.component';
import {HttpModule} from '@angular/http';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ProfileComponent,
    RegisterComponent,
    PageListComponent,
    PageNewComponent,
    WidgetChooserComponent,
    WidgetEditComponent,
    WidgetListComponent,
    WidgetHeaderComponent,
    WidgetImageComponent,
    WidgetYoutubeComponent,
    PageEditComponent,
    WebsiteListComponent,
    WebsiteNewComponent,
    WebsiteEditComponent,
    WidgetNewComponent,
    NewImageComponent,
    NewHeaderComponent,
    NewYoutubeComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    Routing,
    HttpModule
  ],
  providers: [UserService, WebsiteService, PageService, WidgetService],
  bootstrap: [AppComponent]
})
export class AppModule { }
