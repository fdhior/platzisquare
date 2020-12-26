import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { FireResult } from '../models/fireresult.model';
import { LugaresService } from '../services/lugares.service';
import { switchMap, map, debounceTime} from 'rxjs/operators';

@Component({
  selector: 'app-crear',
  templateUrl: './crear.component.html'
})
export class CrearComponent implements OnInit {

  lugar: any = {};

  id: any =  null;

  results$: Observable<any>;

  searchField: FormControl;

  constructor(
    private lugaresService: LugaresService,
    private route: ActivatedRoute,
    private http: HttpClient
  ) {

    this.lugar = new FireResult();

    this.id = this.route.snapshot.params.id;
    console.log(this.id);
    if(this.id !== 'new') {
      this.lugaresService.getLugar(this.id)
        .subscribe((lugar) => {
          console.log('Valor de lugar');
          console.log(lugar);
          this.lugar = lugar;
        });
    }
    /*const URL = 'https://maps.google.com/maps/api/geocode/json?key=AIzaSyBKqQKaSylCXUsLxeesfz8_z1REtdLw2J8';
    // const URL = 'https://maps.google.com/maps/api/geocode/json';
    this.searchField =  new FormControl();
    this.results$ = this.searchField.valueChanges.pipe(
      switchMap((query) => {
        return  this.http.get(`${URL}&address=${query}`);
      }),
      map(
        (response: any) => {
          return response;
      })
    ); */

    const URL = 'https://maps.google.com/maps/api/geocode/json?key=AIzaSyBKqQKaSylCXUsLxeesfz8_z1REtdLw2J8&address=';
    this.searchField = new FormControl()
    this.results$ = this.searchField.valueChanges
      .pipe(
        debounceTime(300), switchMap(query => this.http.get(`${URL}?address=${query}`))
        ,map((response: any) => {
        return response.results;
        })
      );

  }

  ngOnInit(): void {

  }

      // this.result$ = this.searchField.valueChanges.pipe(
      //   switchMap(query => this.http.get(`${URL}?address=${query}`)
      //   .map(response => response.json())
      //   .map(response => response.results)
      // );

    seleccionarDireccion(direccion) {
      console.log(direccion);
      this.lugar.calle = direccion.address_components[1].long_name + ' '
        + direccion.address_components[0].long_name;
      this.lugar.ciudad = direccion.address_components[4].long_name;
      this.lugar.pais = direccion.address_components[6].long_name;
    }


  guardarLugar() {
    var direccion = this.lugar.calle + ',' + this.lugar.ciudad + ',' + this.lugar.pais;
    this.lugaresService.obtenerGeoData(direccion)
      .subscribe((result: any) => {

        console.log('Valor de result.results[0].geometry.location.lat');
        console.log(result.results[0].geometry.location.lat);

        this.lugar.lat = result.results[0].geometry.location.lat;
        this.lugar.lng = result.results[0].geometry.location.lng;

        if(this.id !== 'new') {
          this.lugaresService.editarLugar(this.lugar);
          alert('Negocio editado con éxito!');
        } else {
          this.lugar.id = Date.now();
          this.lugaresService.gurdarLugar(this.lugar)
            .subscribe(resultado => {
              console.log(resultado);

            }) ;
          alert('Negocio guardado con éxito!');
        }
        this.lugar = null;
      });

  }

}
