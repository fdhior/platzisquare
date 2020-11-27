import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Platzisquare';
  lugares: any = [
    {plan: 'pagado', cercania: 1, distancia: 1, active: true, nombre: 'Floreria La Gadenía'},
    {plan: 'gratuito', cercania: 1, distancia: 1.8, active: true, nombre: 'Donas la pasadita'},
    {plan: 'gratuito', cercania: 2, distancia: 5, active: true, nombre: 'Veterinaria Huellitas Felices'},
    {plan: 'gratuito', cercania: 3, distancia: 10, active: false, nombre: 'Sushi Sushiroll'},
    {plan: 'pagado', cercania: 3, distancia: 35, active: true, nombre: 'Hotel la Gracia'},
    {plan: 'gratuito', cercania: 3, distancia: 120, active: false, nombre: 'Zapatería el Clavo'}
  ];

  lat: number = 51.5007325;
  lng: number = -0.1268141;


  /* a = 3;
  b = 5;
  listo = false;
  nombre: string =''; */

  constructor() {
    /*setTimeout(() => {
      this.listo = true;
    }, 3000); */
  }

  /* hacerAlgo() {
    alert('Haciendo algo');
  } */
}
