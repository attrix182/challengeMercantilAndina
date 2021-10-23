import { ApisService } from './../../../services/apis.service';
import {
  Component,
  OnInit,
  EventEmitter,
  ViewChild,
  TemplateRef,
  Output,
  Input,
} from '@angular/core';

import { NgbRatingConfig } from '@ng-bootstrap/ng-bootstrap';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-form-coberturas',
  templateUrl: './form-coberturas.component.html',
  styleUrls: ['./form-coberturas.component.scss'],
})
export class FormCoberturasComponent implements OnInit {
  public coberturas: any;
  public puntaje: number;
  public coberturaClickeada: any;
  public coberturaSeleccionada: any;

  @Output() sendCobertura: EventEmitter<any> = new EventEmitter<any>();

  @Input() datosCoberturaEditar: any;

  @ViewChild('modalCobertura', { read: TemplateRef })
  modalCobertura: TemplateRef<any>;

  constructor(
    private apisSVC: ApisService,
    public stars: NgbRatingConfig,
    private modalService: NgbModal
  ) {
    stars.max = 5;
    stars.readonly = true;
  }

  ngOnInit(): void {
    this.getCoberturas();

    if (this.datosCoberturaEditar) {
      this.coberturaClickeada = this.datosCoberturaEditar;
      this.coberturaSeleccionada = this.datosCoberturaEditar;
    }
  }

  getCoberturas() {
    this.apisSVC.getCoberturas().subscribe(
      (data) => {
        this.coberturas = data;
        this.sortCoberturas();
      },
      (error) => {
        console.log(error);
      }
    );
  }

  sortCoberturas() {
    this.coberturas = this.coberturas.sort((a, b) => {
      if (a.puntaje > b.puntaje) {
        return -1;
      }
      if (a.puntaje < b.puntaje) {
        return 1;
      }
      return 0;
    });
  }

  openModalCobertura(cobertura) {
    this.coberturaClickeada = cobertura;
    this.modalService.open(this.modalCobertura);
  }

  elegirCobertura() {
    this.coberturaSeleccionada = this.coberturaClickeada;
    this.modalService.dismissAll();
  }

  nextStep() {
    this.sendCobertura.emit(this.coberturaSeleccionada);
  }
}
