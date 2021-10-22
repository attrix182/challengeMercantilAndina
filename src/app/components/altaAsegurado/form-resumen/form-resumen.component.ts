import { Vehiculo } from './../../../clases/vehiculo';
import { Asegurado } from './../../../clases/asegurado';
import { Component, Input, OnInit } from '@angular/core';
import { ApisService } from 'src/app/services/apis.service';
import { ThrowStmt } from '@angular/compiler';

@Component({
  selector: 'app-form-resumen',
  templateUrl: './form-resumen.component.html',
  styleUrls: ['./form-resumen.component.scss']
})
export class FormResumenComponent implements OnInit {

  @Input() datosPersonalesAsegurado: Asegurado;

  @Input() datosVehiculoAsegurado: Vehiculo;

  @Input() datosCoberturaAsegurado: any;

  public marcas: any[] = [];



  constructor(private apisSVC: ApisService) {

  }





  ngOnInit() {


  }



}
