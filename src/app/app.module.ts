import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';

import { NZ_I18N, en_US, NgZorroAntdModule } from 'ng-zorro-antd';
import { AppComponent } from './app.component';
import { DepartmentsModule } from './departments/departments.module';
import { OrganizationsModule } from './organizations/organizations.module';

registerLocaleData(en);

@NgModule({
  declarations: [
    AppComponent,
   
  ],
  imports: [
    DepartmentsModule,
    OrganizationsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    NgZorroAntdModule,
    BrowserModule,
    HttpClientModule,
  ],
  providers: [{ provide: NZ_I18N, useValue: en_US }],
  bootstrap: [AppComponent]
})
export class AppModule { }
