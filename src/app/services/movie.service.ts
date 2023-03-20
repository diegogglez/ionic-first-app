import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  constructor(private http: HttpClient) { }

  getTopRatedMovies(): Observable<Object> {
    return this.http.get(`${environment.baseUrl}/movie/popular?api_key=${environment.apiKey}`);
  }

  getMovieDetails() {}
}
