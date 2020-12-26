import { Component } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { LugaresService } from '../services/lugares.service';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html'
})

export class DetalleComponent {

  id = null;

  lugar: any = {};

  constructor(
    private route: ActivatedRoute,
    private lugaresService: LugaresService
  ) {
    console.log(this.route.snapshot.params.id);
    // this.route.queryParams.subscribe((params: Params) => {
    //   console.log(params.action2);
    //   console.log(params.referer);
    // });
    this.id = this.route.snapshot.params.id;
    this.lugar = this.lugaresService.buscarLugar(this.id);
  }

}
