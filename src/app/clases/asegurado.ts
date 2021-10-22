export class Asegurado {
    dni: number;
    apellido: string;
    nombre: string;
    email: string;
    celular: number;
    telefono: number;
    provincia: string;
    ciudad: string;
    domicilio: string;
    fechaNacimiento: any;
    usuario: string;
    contrasena: string;

    constructor(dni: number, nombre: string, apellido: string, email: string, telefono: number, celular: number, provincia: string, ciudad: string, domicilio: string, fechaNacimiento: Date, usuario: string, contrasena: string) {
        this.dni = dni;
        this.nombre = nombre;
        this.apellido = apellido;
        this.email = email;
        this.telefono = telefono;
        this.celular = celular;
        this.provincia = provincia;
        this.ciudad = ciudad;
        this.domicilio = domicilio;
        this.fechaNacimiento = fechaNacimiento;
        this.usuario = usuario;
        this.contrasena = contrasena;
    }

}
