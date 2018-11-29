import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { PrecioServicio } from './precio-servicio.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<PrecioServicio>;

@Injectable()
export class PrecioServicioService {

    private resourceUrl =  SERVER_API_URL + 'api/precio-servicios';

    constructor(private http: HttpClient) { }

    create(precioServicio: PrecioServicio): Observable<EntityResponseType> {
        const copy = this.convert(precioServicio);
        return this.http.post<PrecioServicio>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(precioServicio: PrecioServicio): Observable<EntityResponseType> {
        const copy = this.convert(precioServicio);
        return this.http.put<PrecioServicio>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<PrecioServicio>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<PrecioServicio[]>> {
        const options = createRequestOption(req);
        return this.http.get<PrecioServicio[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<PrecioServicio[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: PrecioServicio = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<PrecioServicio[]>): HttpResponse<PrecioServicio[]> {
        const jsonResponse: PrecioServicio[] = res.body;
        const body: PrecioServicio[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to PrecioServicio.
     */
    private convertItemFromServer(precioServicio: PrecioServicio): PrecioServicio {
        const copy: PrecioServicio = Object.assign({}, precioServicio);
        return copy;
    }

    /**
     * Convert a PrecioServicio to a JSON which can be sent to the server.
     */
    private convert(precioServicio: PrecioServicio): PrecioServicio {
        const copy: PrecioServicio = Object.assign({}, precioServicio);
        return copy;
    }
}
