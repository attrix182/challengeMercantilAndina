import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-form-final',
  templateUrl: './form-final.component.html',
  styleUrls: ['./form-final.component.scss']
})
export class FormFinalComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  nuevoAsegurado() {
    location.reload();
  }



}
