import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { NgZorroAntdModule, NZ_I18N, en_US } from 'ng-zorro-antd';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
import { DepartmentsComponent } from './departments/departments.component';
import { DepartmentsFormComponent } from './departments/departments-form/departments-form.component';
import { DepartmentsDetailComponent } from './departments/departments-detail/departments-detail.component';
import { DepartmentsListComponent } from './departments/departments-list/departments-list.component';
import { AllDepartmentsComponent } from './departments/all-departments/all-departments.component';
import { OrganizationsComponent } from './organizations/organizations.component';
import { OrganizationsFormComponent } from './organizations/organizations-form/organizations-form.component';
import { OrganizationsListComponent } from './organizations/organizations-list/organizations-list.component';
import { OrganizationsDetailComponent } from './organizations/organizations-detail/organizations-detail.component';

registerLocaleData(en);

@NgModule({
  declarations: [
    AppComponent,
    DepartmentsComponent,
    DepartmentsFormComponent,
    DepartmentsDetailComponent,
    DepartmentsListComponent,
    AllDepartmentsComponent,
    OrganizationsComponent,
    OrganizationsFormComponent,
    OrganizationsListComponent,
    OrganizationsDetailComponent
  ],
  imports: [
    BrowserModule,
    NgZorroAntdModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule
  ],
  providers: [{ provide: NZ_I18N, useValue: en_US }],
  bootstrap: [AppComponent]
})
export class AppModule { }
