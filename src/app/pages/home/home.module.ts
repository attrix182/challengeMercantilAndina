import { FormResumenComponent } from './../../components/altaAsegurado/form-resumen/form-resumen.component';
import { FormatearGranizoPipe } from './../../pipes/formatear-granizo.pipe';
import { FormatearDescripcionPipe } from './../../pipes/formatear-descripcion.pipe';

import { WizardComponent } from './../../components/wizard/wizard.component';

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { NavbarSharedModuleModule } from 'src/app/shared/navbar-shared-module/navbar-shared-module.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormDatosPersonalesComponent } from 'src/app/components/altaAsegurado/form-datos-personales/form-datos-personales.component';
import { FormDatosVehiculoComponent } from 'src/app/components/altaAsegurado/form-datos-vehiculo/form-datos-vehiculo.component';
import { FormCoberturasComponent } from 'src/app/components/altaAsegurado/form-coberturas/form-coberturas.component';

import { NgbModule } from "@ng-bootstrap/ng-bootstrap";

import { FormatearTituloPipe } from 'src/app/pipes/formatear-titulo.pipe';

@NgModule({
  declarations: [
    HomeComponent,
    WizardComponent,
    FormDatosPersonalesComponent,
    FormDatosVehiculoComponent,
    FormCoberturasComponent,
    FormResumenComponent,
    FormatearTituloPipe,
    FormatearDescripcionPipe,
    FormatearGranizoPipe

  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    NavbarSharedModuleModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule
  ]
})
export class HomeModule { }
