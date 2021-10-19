export class Vehiculo {
    marca: string;
    anio: number;
    modelo: string;
    version: string;

    constructor(marca: string, anio: number, modelo: string, version: string) {
        this.marca = marca;
        this.anio = anio;
        this.modelo = modelo;
        this.version = version;
    }
}
