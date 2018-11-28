import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { JhiDateUtils } from 'ng-jhipster';

import { Agenda } from './agenda.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<Agenda>;

@Injectable()
export class AgendaService {

    private resourceUrl =  SERVER_API_URL + 'api/agenda';

    constructor(private http: HttpClient, private dateUtils: JhiDateUtils) { }

    create(agenda: Agenda): Observable<EntityResponseType> {
        const copy = this.convert(agenda);
        return this.http.post<Agenda>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(agenda: Agenda): Observable<EntityResponseType> {
        const copy = this.convert(agenda);
        return this.http.put<Agenda>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<Agenda>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<Agenda[]>> {
        const options = createRequestOption(req);
        return this.http.get<Agenda[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<Agenda[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: Agenda = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<Agenda[]>): HttpResponse<Agenda[]> {
        const jsonResponse: Agenda[] = res.body;
        const body: Agenda[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to Agenda.
     */
    private convertItemFromServer(agenda: Agenda): Agenda {
        const copy: Agenda = Object.assign({}, agenda);
        copy.fechaDesde = this.dateUtils
            .convertLocalDateFromServer(agenda.fechaDesde);
        copy.fechaHasta = this.dateUtils
            .convertLocalDateFromServer(agenda.fechaHasta);
        return copy;
    }

    /**
     * Convert a Agenda to a JSON which can be sent to the server.
     */
    private convert(agenda: Agenda): Agenda {
        const copy: Agenda = Object.assign({}, agenda);
        copy.fechaDesde = this.dateUtils
            .convertLocalDateToServer(agenda.fechaDesde);
        copy.fechaHasta = this.dateUtils
            .convertLocalDateToServer(agenda.fechaHasta);
        return copy;
    }
}
