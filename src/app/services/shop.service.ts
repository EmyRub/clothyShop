import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Product } from '../interfaces/shop.interface';

@Injectable({
  providedIn: 'root'
})
export class ShopService {

  // Guarda la busqueda del cliente
  private _shopHistory: string[] = [];
  private url_Api: string = 'https://api.escuelajs.co/api/v1';

  constructor(private http: HttpClient) { }

  // Evita que fuera del servicio hagan una modificación en el arreglo
  get shopHistory() {
    return [...this._shopHistory];
  }

  searchQuery(query: string): void {
    query = query.trim().toLowerCase();
    this._shopHistory.unshift(query);
  }

  getProducts(limit: number) {

    const params = new HttpParams()
      .set('offset', 0)
      .set('limit', limit)

    return this.http.get<Product>(`${this.url_Api}/products`, { params })

  }
}
