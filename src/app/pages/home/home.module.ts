
import { WizardComponent } from './../../components/wizard/wizard.component';

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { NavbarSharedModuleModule } from 'src/app/shared/navbar-shared-module/navbar-shared-module.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    HomeComponent,
    WizardComponent

  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    NavbarSharedModuleModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class HomeModule { }
