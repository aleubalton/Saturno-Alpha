import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { TipoDeServicio } from './tipo-de-servicio.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<TipoDeServicio>;

@Injectable()
export class TipoDeServicioService {

    private resourceUrl =  SERVER_API_URL + 'api/tipo-de-servicios';

    constructor(private http: HttpClient) { }

    create(tipoDeServicio: TipoDeServicio): Observable<EntityResponseType> {
        const copy = this.convert(tipoDeServicio);
        return this.http.post<TipoDeServicio>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(tipoDeServicio: TipoDeServicio): Observable<EntityResponseType> {
        const copy = this.convert(tipoDeServicio);
        return this.http.put<TipoDeServicio>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<TipoDeServicio>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<TipoDeServicio[]>> {
        const options = createRequestOption(req);
        return this.http.get<TipoDeServicio[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<TipoDeServicio[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: TipoDeServicio = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<TipoDeServicio[]>): HttpResponse<TipoDeServicio[]> {
        const jsonResponse: TipoDeServicio[] = res.body;
        const body: TipoDeServicio[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to TipoDeServicio.
     */
    private convertItemFromServer(tipoDeServicio: TipoDeServicio): TipoDeServicio {
        const copy: TipoDeServicio = Object.assign({}, tipoDeServicio);
        return copy;
    }

    /**
     * Convert a TipoDeServicio to a JSON which can be sent to the server.
     */
    private convert(tipoDeServicio: TipoDeServicio): TipoDeServicio {
        const copy: TipoDeServicio = Object.assign({}, tipoDeServicio);
        return copy;
    }
}
