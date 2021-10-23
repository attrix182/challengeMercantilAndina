export class Asegurado {
    dni: number;
    apellido: string;
    nombre: string;
    email: string;
    celular: number;
    telefono: number;
    provincia: any;
    ciudad: any;
    domicilio: string;
    fechaNacimiento: any;
    usuario: string;
    contrasena: string;
    provinciaCompleta: any;
    ciudadCompleta: any;

    constructor(
        dni: number,
        nombre: string,
        apellido: string,
        email: string,
        telefono: number,
        celular: number,
        provincia: any,
        ciudad: any,
        domicilio: string,
        fechaNacimiento: Date,
        usuario: string,
        contrasena: string,
        provinciaCompleta: any,
        ciudadCompleta: any
    ) {
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
        this.provinciaCompleta = provinciaCompleta;
        this.ciudadCompleta = ciudadCompleta;
    }
}
