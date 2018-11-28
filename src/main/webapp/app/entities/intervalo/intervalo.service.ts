import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { JhiDateUtils } from 'ng-jhipster';

import { Intervalo } from './intervalo.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<Intervalo>;

@Injectable()
export class IntervaloService {

    private resourceUrl =  SERVER_API_URL + 'api/intervalos';

    constructor(private http: HttpClient, private dateUtils: JhiDateUtils) { }

    create(intervalo: Intervalo): Observable<EntityResponseType> {
        const copy = this.convert(intervalo);
        return this.http.post<Intervalo>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(intervalo: Intervalo): Observable<EntityResponseType> {
        const copy = this.convert(intervalo);
        return this.http.put<Intervalo>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<Intervalo>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<Intervalo[]>> {
        const options = createRequestOption(req);
        return this.http.get<Intervalo[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<Intervalo[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: Intervalo = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<Intervalo[]>): HttpResponse<Intervalo[]> {
        const jsonResponse: Intervalo[] = res.body;
        const body: Intervalo[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to Intervalo.
     */
    private convertItemFromServer(intervalo: Intervalo): Intervalo {
        const copy: Intervalo = Object.assign({}, intervalo);
        copy.fechaHoraDesde = this.dateUtils
            .convertDateTimeFromServer(intervalo.fechaHoraDesde);
        return copy;
    }

    /**
     * Convert a Intervalo to a JSON which can be sent to the server.
     */
    private convert(intervalo: Intervalo): Intervalo {
        const copy: Intervalo = Object.assign({}, intervalo);

        copy.fechaHoraDesde = this.dateUtils.toDate(intervalo.fechaHoraDesde);
        return copy;
    }
}
