# Challenge de Mercantil Andina

Este proyecto es un reto propuesto por la compañía de seguros Mercantil andina para el puesto de Frontend developer Angular.

Consiste en un formulario guiado por pasos para dar de alta a un asegurado, para lo cual se debe pedir varios datos, validarlos y guardarlos.

Durante su desarrollo fue vital entender como funcionan las consultas a apis externas y como comunicar datos entre componentes.

![Captura de pantalla 2021-10-21 220815](https://user-images.githubusercontent.com/44885834/138377266-e1d46109-07fd-4daa-b43c-f6089a4fc899.jpg)



## Tecnologias y bibliotecas utilizadas

1. Angular CLI 12.2.7
2. Bootstrapt 4.6.0
3. ng-bootstrap 10.0.0
4. Animate.css 4.1.1
5. FontAwesome 5.8.2
6. SweetAlert2 11.1.9


## Ejecutar proyecto

Hay dos opciones:
1. Online. El proyecto esta deployado en Netlify: https://challenge-ma-sinisterraluciano.netlify.app/
2. Localmente. Debera seguir los siguiente pasos:
  - npm i
  - ng serve
  - Acceder a localhost:4200 desde su navegador

## Guia del desarrollo

![files](https://user-images.githubusercontent.com/44885834/138568231-1773f7e0-65d7-4b2a-8a60-bdd1de2f5878.jpg)

En primer lugar se creo un componente padre con lazy loading llamado home dentro de la carpeta /pages, el cual sera la vista de la pagina principal.

Luego encontramos la carperta /components, donde en primer lugar esta los componentes navbar y wizard, wizard sera el encargado de contener los distintos pasos del alta de asegurado.

Dentro de esta misma carpera se encuantra otro directorio llamado /altaAsegurado donde estan los distintos formularios para los 4 pasos del alta y una pantalla de "exito".

Cada formulario sigue la misma linea de diseño, las validaciones se han hecho con la biblioteca de angular/forms, utilizando los validadores que nos ofrece.

Tambien encontramos la carpeta /pipes, donde he creado algunos pipes de utilidad para formatear mensajes y textos de una forma mas clara.

Por ultimo tenemos la carpeta /services donde se encuentra el apis.service, el cual mediante el HttpClientModule realiza peticiones get a los distintos endpoints de las apis necesarias para completar los datos en los formularios, tambien encontramos alert.service el cual contiene un metodo de SweetAlert el cual recibe un mensaje, un tipo de mensaje y duracion.
