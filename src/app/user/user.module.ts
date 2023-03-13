
import { NgModule } from '@angular/core';
import { UserComponent } from './user.component';
import { CreateUserComponent } from './create-user/create-user.component';
import { AngularMaterialModule } from './../shared/angular-material.module';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

const routes = [
  { path: '', component: UserComponent },
]
@NgModule({
  declarations: [
    // UserComponent,
    // CreateUserComponent
  ],
  imports: [
    CommonModule,
    AngularMaterialModule,
    FormsModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule
  ],
  exports: [],
  providers: [],
}) export class UserModule { }
