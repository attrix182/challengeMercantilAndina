import { Vehiculo } from './../../../clases/vehiculo';
import { Asegurado } from './../../../clases/asegurado';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import Swal, { SweetAlertIcon } from 'sweetalert2';

@Component({
  selector: 'app-form-resumen',
  templateUrl: './form-resumen.component.html',
  styleUrls: ['./form-resumen.component.scss']
})
export class FormResumenComponent implements OnInit {

  @Input() datosPersonalesAsegurado: Asegurado;

  @Input() datosVehiculoAsegurado: Vehiculo;

  @Input() datosCoberturaAsegurado: any;

  @Output() editVehiculo: EventEmitter<number> = new EventEmitter<number>();


  public marcas: any[] = [];

  public enviando: boolean = false;

  constructor() { }

  ngOnInit() {}

  editarDatosPersonales() {
    this.editVehiculo.emit(1);
  }

  editarVehiculo() {
    this.editVehiculo.emit(2);
  }

  editarCobertura() {
    this.editVehiculo.emit(3);
  }

  enviarDatos() {
    console.log('Enviar datos');
    this.enviando = true;
    setTimeout(() => {
      this.enviando = false
      this.alert('success', 'Alta enviada con exito!');
      setTimeout(() => {
      location.reload();
      }, 1500);

    }, 2000);
  }



  alert(icon: SweetAlertIcon, text: string) {
    const Toast = Swal.mixin({
      toast: true,
      position: 'top',
      showConfirmButton: false,
      timer: 1500,
      timerProgressBar: true,

      didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer);
        toast.addEventListener('mouseleave', Swal.resumeTimer);
      },
    });

    Toast.fire({
      icon: icon,
      title: text,
    });
  }

}
  

