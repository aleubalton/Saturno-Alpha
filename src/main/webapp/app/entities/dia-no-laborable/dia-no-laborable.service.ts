import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { JhiDateUtils } from 'ng-jhipster';

import { DiaNoLaborable } from './dia-no-laborable.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<DiaNoLaborable>;

@Injectable()
export class DiaNoLaborableService {

    private resourceUrl =  SERVER_API_URL + 'api/dia-no-laborables';

    constructor(private http: HttpClient, private dateUtils: JhiDateUtils) { }

    create(diaNoLaborable: DiaNoLaborable): Observable<EntityResponseType> {
        const copy = this.convert(diaNoLaborable);
        return this.http.post<DiaNoLaborable>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(diaNoLaborable: DiaNoLaborable): Observable<EntityResponseType> {
        const copy = this.convert(diaNoLaborable);
        return this.http.put<DiaNoLaborable>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<DiaNoLaborable>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<DiaNoLaborable[]>> {
        const options = createRequestOption(req);
        return this.http.get<DiaNoLaborable[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<DiaNoLaborable[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: DiaNoLaborable = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<DiaNoLaborable[]>): HttpResponse<DiaNoLaborable[]> {
        const jsonResponse: DiaNoLaborable[] = res.body;
        const body: DiaNoLaborable[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to DiaNoLaborable.
     */
    private convertItemFromServer(diaNoLaborable: DiaNoLaborable): DiaNoLaborable {
        const copy: DiaNoLaborable = Object.assign({}, diaNoLaborable);
        copy.fecha = this.dateUtils
            .convertLocalDateFromServer(diaNoLaborable.fecha);
        return copy;
    }

    /**
     * Convert a DiaNoLaborable to a JSON which can be sent to the server.
     */
    private convert(diaNoLaborable: DiaNoLaborable): DiaNoLaborable {
        const copy: DiaNoLaborable = Object.assign({}, diaNoLaborable);
        copy.fecha = this.dateUtils
            .convertLocalDateToServer(diaNoLaborable.fecha);
        return copy;
    }
}
