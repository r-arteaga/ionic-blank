import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Recipe } from '../util/model';

const API_URL: string = 'https://api.npoint.io/09a2effb020c36a8588a'

@Injectable({
    providedIn: 'root'
})
export class ApiService {

    private http = inject(HttpClient)

    pull() {
        return this.http.get<Recipe[]>(API_URL);
    }

    push(recipes: Recipe[]) {
        return this.http.post<Recipe[]>(API_URL, recipes);
    }
}