import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component } from '@angular/core';
import { LugaresService } from '../services/lugares.service';

@Component({
  selector: 'app-lugares',
  templateUrl: './lugares.component.html',
  styleUrls: ['./lugares.component.css'],
  animations: [
    trigger('contenedorAnimable', [
      state('inicial', style({
        opacity: 0,
        /* backgroundColor: 'green',
        transform: 'rotate3d(0,0,0,0deg)' */
      })),
      state('final', style({
        opacity: 1,
        /* backgroundColor: 'yellow',
        transform: 'rotate3d(5,10,20,30deg)' */
      })),
      transition('inicial => final', animate(2000)),
      transition('final => inicial', animate(1000))
    ])
  ]
})

export class LugaresComponent {
  title = 'Platzisquare';
  state = 'inicial';

  lat: number = 51.5007325;
  lng: number = -0.1268141;

  lugares: any = [];

  constructor(private lugaresService: LugaresService ) {

    // this.lugares =;

    this.lugaresService.getLugares()
      // .valueChanges()
      .subscribe((lugares) => {
        console.log('Valor de lugares');
        console.log(lugares);

        this.lugares = lugares;
        // this.lugares = Object.values(lugares);

        var me = this;
        me.lugares = Object.keys(me.lugares).map((key: any) => {
          return me.lugares[key]; });
        this.state = 'final';

        // const me = this;
        // me.lugares = Object.keys(me.lugares).map(key => {
        //   console.log('las key');
        //   console.log(me.lugares[key]); return me.lugares[key]; });


      }, error => {
        console.log(error);
        alert('Tenemos algo de dificultades, disculpe las molestias. Error: ' + error.statusText);
      });
  }

  animar() {
    this.state = (this.state === 'final') ? 'inicial' : 'final';
  }

  animacionInicia(e) {
    console.log('Inicia animación!');
    console.log(e);
  }

  animacionTermina(e) {
    console.log('Termina animación');
    console.log(e);
  }

}

/* a = 3;
b = 5;
listo = false;
nombre: string =''; */
/*setTimeout(() => {
  this.listo = true;
}, 3000); */

/* hacerAlgo() {
  alert('Haciendo algo');
} */
