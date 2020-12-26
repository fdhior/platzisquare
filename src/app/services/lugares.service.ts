import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { AngularFireDatabase } from 'angularfire2/database';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LugaresService {

  API_ENDPOINT = 'https://platzisquare-186aa.firebaseio.com';

  lugares: any = [
    { id: '1', plan: 'pagado', cercania: 1, distancia: 1, active: true, nombre: 'Floreria La Gadenía', description: 'Descripción de este más adelante tendremos más información' },
    { id: '2', plan: 'gratuito', cercania: 1, distancia: 1.8, active: true, nombre: 'Donas la pasadita', description: 'Descripción de este más adelante tendremos más información' },
    { id: '3', plan: 'gratuito', cercania: 2, distancia: 5, active: true, nombre: 'Veterinaria Huellitas Felices', description: 'Descripción de este más adelante tendremos más información' },
    { id: '4', plan: 'gratuito', cercania: 3, distancia: 10, active: false, nombre: 'Sushi Sushiroll', description: 'Descripción de este más adelante tendremos más información' },
    { id: '5', plan: 'pagado', cercania: 3, distancia: 35, active: true, nombre: 'Hotel la Gracia', description: 'Descripción de este más adelante tendremos más información' },
    { id: '6', plan: 'gratuito', cercania: 3, distancia: 120, active: false, nombre: 'Zapatería el Clavo', description: 'Descripción de este más adelante tendremos más información' }
  ];

  constructor(
    private afDB: AngularFireDatabase,
    private afS: AngularFirestore,
    private http: HttpClient
  ) { }

  public getLugares() {
    // return this.afDB.list('lugares/');
    return this.http.get(this.API_ENDPOINT + '/.json')
    .pipe (
      map((resultado: any)  => {
        console.log('Valor de resultado');
        console.log(resultado);

        const data = resultado.lugares;
        return data;
      })
    );
  }

  public buscarLugar(id) {
    return this.lugares.filter((lugar) => lugar.id = id)[0] || null;
  }

  public gurdarLugar(lugar) {
    console.log(lugar);
    // this.afDB.database.ref('lugares/' + lugar.id).set(lugar);
    const httpHeaders = new HttpHeaders({'Content-Type':'application/json'});
    return this.http.post(this.API_ENDPOINT + '/lugares.json', lugar, {headers: httpHeaders});

  }

  public editarLugar(lugar) {
    console.log(lugar);
    this.afDB.database.ref('lugares/' + lugar.id).set(lugar);
  }

  public obtenerGeoData(direccion) {
    // return this.http.get('http://maps.google.com/maps/api/geocode/json?address=' + direccion);
    return this.http.get(
      'https://maps.googleapis.com/maps/api/geocode/json?key=AIzaSyBKqQKaSylCXUsLxeesfz8_z1REtdLw2J8&address='
      + direccion);
  }

  public getLugar(id) {
    console.log('Solicitando datos del Negocio: ', id);
    return this.afDB.object('lugares/' + id).valueChanges();

  }

}
