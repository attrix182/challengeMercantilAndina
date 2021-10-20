import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApisService {

  constructor(private http: HttpClient) { }

  getProvincias(): Observable<any> {

    return this.http.get('https://apis.datos.gob.ar/georef/api/provincias');
  }

  getCiudades(idProvincia): Observable<any> {
    return this.http.get('https://apis.datos.gob.ar/georef/api/municipios?provincia=' + idProvincia);
  }

  verifyUser(nombre: string): Observable<any> {
    return this.http.get('https://servicios.qamercantilandina.com.ar/api_mock_frontend/v1/usuarios?nombre=' + nombre);
  }

}
