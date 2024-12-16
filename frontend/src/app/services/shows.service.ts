import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BASE_URL } from '../../utils/constants';
import { TShowsParams } from '../../utils/types';

@Injectable({
  providedIn: 'root',
})
export class ShowsService {
  constructor(private http: HttpClient) {}

  getAllShows(params: TShowsParams): Observable<any> {
    return this.http.get(`${BASE_URL}/shows`, {
      params,
    });
  }

  getSingleShow(id: string): Observable<any> {
    return this.http.get(`${BASE_URL}/shows/${id}`);
  }
}
