import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { Vehiculo } from './vehiculo.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<Vehiculo>;

@Injectable()
export class VehiculoService {

    private resourceUrl =  SERVER_API_URL + 'api/vehiculos';

    constructor(private http: HttpClient) { }

    create(vehiculo: Vehiculo): Observable<EntityResponseType> {
        const copy = this.convert(vehiculo);
        return this.http.post<Vehiculo>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(vehiculo: Vehiculo): Observable<EntityResponseType> {
        const copy = this.convert(vehiculo);
        return this.http.put<Vehiculo>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<Vehiculo>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<Vehiculo[]>> {
        const options = createRequestOption(req);
        return this.http.get<Vehiculo[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<Vehiculo[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: Vehiculo = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<Vehiculo[]>): HttpResponse<Vehiculo[]> {
        const jsonResponse: Vehiculo[] = res.body;
        const body: Vehiculo[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to Vehiculo.
     */
    private convertItemFromServer(vehiculo: Vehiculo): Vehiculo {
        const copy: Vehiculo = Object.assign({}, vehiculo);
        return copy;
    }

    /**
     * Convert a Vehiculo to a JSON which can be sent to the server.
     */
    private convert(vehiculo: Vehiculo): Vehiculo {
        const copy: Vehiculo = Object.assign({}, vehiculo);
        return copy;
    }
}
