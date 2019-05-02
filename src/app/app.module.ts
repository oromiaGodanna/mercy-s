import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';

import { NgZorroAntdModule, NZ_I18N, en_US } from 'ng-zorro-antd';
import { AppComponent } from './app.component';
import { DepartmentsComponent } from './departments/departments.component';
import { AllDepartmentsComponent } from './departments/all-departments/all-departments.component';
import { DepartmentsDetailComponent } from './departments/departments-detail/departments-detail.component';
import { DepartmentsFormComponent } from './departments/departments-form/departments-form.component';
import { DepartmentsListComponent } from './departments/departments-list/departments-list.component';
import { OrganizationsComponent } from './organizations/organizations.component';
import { OrganizationsDetailComponent } from './organizations/organizations-detail/organizations-detail.component';
import { OrganizationsFormComponent } from './organizations/organizations-form/organizations-form.component';
import { OrganizationsListComponent } from './organizations/organizations-list/organizations-list.component';

registerLocaleData(en);

@NgModule({
  declarations: [
    AppComponent,
    DepartmentsComponent,
    DepartmentsDetailComponent,
    DepartmentsFormComponent,
    DepartmentsListComponent,
    AllDepartmentsComponent,
    OrganizationsComponent,
    OrganizationsDetailComponent,
    OrganizationsFormComponent,
    OrganizationsListComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserAnimationsModule,
    BrowserModule,
    FormsModule,
    HttpClientModule,
    NgZorroAntdModule
  ],
  providers: [{ provide: NZ_I18N, useValue: en_US }],
  bootstrap: [AppComponent]
})
export class AppModule { }
