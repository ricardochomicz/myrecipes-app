import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Ingredient } from "../../models";

@Injectable({
  providedIn: 'root'
})
export class IngredientsService {

  private apiUrl = 'http://localhost:5000/api/ingredients';

  constructor(private http: HttpClient) { }

  getIngredients(page: number = 1, limit: number = 10): Observable<{ data: Array<Ingredient>, currentPage: number, totalPages: number }> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('limit', limit.toString())

    return this.http.get<{ data: Array<Ingredient>, currentPage: number, totalPages: number }>(`${this.apiUrl}`, { params });
  }

  get(id: number): Observable<Ingredient> {
    return this.http.get<Ingredient>(`${this.apiUrl}/${id}`)
      .pipe(
        map(response => response)
      )
  }

  searchIngredients(term: string): Observable<any[]> {
    return this.http.get<any>(`${this.apiUrl}?search=${term}`).pipe(
      map(response => response.data)
    );
  }

  getIngredientsAutocomplete(query: string): Observable<Ingredient[]> {
    return this.http.get<Ingredient[]>(`${this.apiUrl}/autocomplete?search=${query}`);
  }


  create(data: Ingredient): Observable<Ingredient> {
    return this.http.post<{ data: Ingredient }>(this.apiUrl, data)
      .pipe(
        map(response => response.data)
      )
  }

  update(id: number, data: Ingredient): Observable<Ingredient> {
    return this.http.put<{ data: Ingredient }>(`${this.apiUrl}/${id}`, data)
      .pipe(
        map(response => response.data)
      )
  }


}
