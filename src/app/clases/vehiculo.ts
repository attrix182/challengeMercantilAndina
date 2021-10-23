export class Vehiculo {
    marca:string;
    anio: number;
    modelo: string;
    version: any;
    marcaCompleta:any;
    versionCompleta:any;

    constructor(marca: any, anio: number, modelo: any, version: any) {
        this.marca = marca;
        this.anio = anio;
        this.modelo = modelo;
        this.version = version;
    }
}
