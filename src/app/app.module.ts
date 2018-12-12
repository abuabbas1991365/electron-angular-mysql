import * as $ from 'jquery';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule,FormsModule } from '@angular/forms';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import { AppRoutes } from './app.routing';
import { AppComponent } from './app.component';

import { FlexLayoutModule } from '@angular/flex-layout';
import { FullComponent } from './layouts/full/full.component';
import { AppHeaderComponent } from './layouts/full/header/header.component';
import { AppSidebarComponent } from './layouts/full/sidebar/sidebar.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DemoMaterialModule} from './demo-material-module';
import {UserService} from './user.service';
import { SharedModule } from './shared/shared.module';
import { SpinnerComponent } from './shared/spinner.component';
import { ExcelService } from './service/excel.service';
import { LoginComponent } from './login/login.component';
import { ElishCustomMaterialModule } from './shared/elish.material.module';
@NgModule({
  declarations: [
    AppComponent, 
    FullComponent,
    AppHeaderComponent,
    SpinnerComponent,
    AppSidebarComponent,
    LoginComponent  
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    DemoMaterialModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,  
    HttpClientModule,
    SharedModule,  
    AppRoutes,
    ElishCustomMaterialModule  
  ],
  providers: [ ExcelService, UserService,
  {
    provide: LocationStrategy,
    useClass: HashLocationStrategy,

  }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
