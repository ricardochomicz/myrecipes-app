import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { Recipe } from '../../models';

@Injectable({
  providedIn: 'root'
})
export class RecipesService {

  private apiUrl = 'http://localhost:5000/api/recipes';

  constructor(private http: HttpClient) { }

  list(page: number = 1, limit: number = 10): Observable<{ data: Array<Recipe>, currentPage: number, totalPages: number }> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('limit', limit.toString());

    return this.http.get<{ data: Array<Recipe>, currentPage: number, totalPages: number }>(`${this.apiUrl}`, { params });
  }

  get(id: number): Observable<Recipe> {
    return this.http.get<Recipe>(`${this.apiUrl}/${id}`)
      .pipe(
        map(response => response)
      )
  }


  create(data: Recipe): Observable<Recipe> {
    return this.http.post<{ data: Recipe }>(this.apiUrl, data)
      .pipe(
        map(response => response.data)
      )
  }

  update(id: number, data: Recipe): Observable<Recipe> {
    return this.http.put<{ data: Recipe }>(`${this.apiUrl}/${id}`, data)
      .pipe(
        map(response => response.data)
      )
  }

  updateRating(recipeId: number, newRating: number): Observable<Recipe> {
    const data = { rating: newRating };

    return this.http.put<{ data: Recipe }>(`${this.apiUrl}/${recipeId}/rating`, data)
      .pipe(
        map(response => response.data)
      );
  }

}
