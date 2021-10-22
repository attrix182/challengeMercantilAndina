export class Vehiculo {
    marca: any;
    anio: number;
    modelo: string;
    version: string;

    constructor(marca: any, anio: number, modelo: string, version: string) {
        this.marca = marca;
        this.anio = anio;
        this.modelo = modelo;
        this.version = version;
    }
}
