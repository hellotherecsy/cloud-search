import { Injectable } from '@angular/core';
import {Http, Response} from '@angular/http';
import {Observable} from 'rxjs/Rx';
 
import { GridOptions } from "ag-grid";

@Injectable()
export class RestService {

  http: Http;

  constructor(  http:Http) { 
    this.http = http;
  }

  getFoods( gridOptions: GridOptions ) {    
   
    this.http.get('http://localhost:7073/collector/hosts')
    .map((res:Response) => (
      res.json() //Convert response to JSON
      //OR
      //res.text() //Convert response to a string
  ))
    .subscribe(data => {
      console.log(data)
      //return data;
      //gridOptions.api.setRowData(data);
    }
  )

    
    //console.log("Foods");
    //http://localhost:7073/collector/hosts
    //return this.http.get('../assets/test.json').map((res:Response) => res.json());
  }

  getBooksAndMovies() {
    return Observable.forkJoin(
      this.http.get('/app/books.json').map((res:Response) => res.json()),
      this.http.get('/app/movies.json').map((res:Response) => res.json())
    );
  }

}
