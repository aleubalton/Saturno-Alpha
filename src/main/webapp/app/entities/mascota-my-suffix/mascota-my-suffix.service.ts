import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { MascotaMySuffix } from './mascota-my-suffix.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<MascotaMySuffix>;

@Injectable()
export class MascotaMySuffixService {

    private resourceUrl =  SERVER_API_URL + 'api/mascotas';

    constructor(private http: HttpClient) { }

    create(mascota: MascotaMySuffix): Observable<EntityResponseType> {
        const copy = this.convert(mascota);
        return this.http.post<MascotaMySuffix>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(mascota: MascotaMySuffix): Observable<EntityResponseType> {
        const copy = this.convert(mascota);
        return this.http.put<MascotaMySuffix>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<MascotaMySuffix>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<MascotaMySuffix[]>> {
        const options = createRequestOption(req);
        return this.http.get<MascotaMySuffix[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<MascotaMySuffix[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: MascotaMySuffix = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<MascotaMySuffix[]>): HttpResponse<MascotaMySuffix[]> {
        const jsonResponse: MascotaMySuffix[] = res.body;
        const body: MascotaMySuffix[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to MascotaMySuffix.
     */
    private convertItemFromServer(mascota: MascotaMySuffix): MascotaMySuffix {
        const copy: MascotaMySuffix = Object.assign({}, mascota);
        return copy;
    }

    /**
     * Convert a MascotaMySuffix to a JSON which can be sent to the server.
     */
    private convert(mascota: MascotaMySuffix): MascotaMySuffix {
        const copy: MascotaMySuffix = Object.assign({}, mascota);
        return copy;
    }
}
