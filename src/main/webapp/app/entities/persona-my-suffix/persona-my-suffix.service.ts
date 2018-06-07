import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { PersonaMySuffix } from './persona-my-suffix.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<PersonaMySuffix>;

@Injectable()
export class PersonaMySuffixService {

    private resourceUrl =  SERVER_API_URL + 'api/personas';

    constructor(private http: HttpClient) { }

    create(persona: PersonaMySuffix): Observable<EntityResponseType> {
        const copy = this.convert(persona);
        return this.http.post<PersonaMySuffix>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(persona: PersonaMySuffix): Observable<EntityResponseType> {
        const copy = this.convert(persona);
        return this.http.put<PersonaMySuffix>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<PersonaMySuffix>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<PersonaMySuffix[]>> {
        const options = createRequestOption(req);
        return this.http.get<PersonaMySuffix[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<PersonaMySuffix[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: PersonaMySuffix = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<PersonaMySuffix[]>): HttpResponse<PersonaMySuffix[]> {
        const jsonResponse: PersonaMySuffix[] = res.body;
        const body: PersonaMySuffix[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to PersonaMySuffix.
     */
    private convertItemFromServer(persona: PersonaMySuffix): PersonaMySuffix {
        const copy: PersonaMySuffix = Object.assign({}, persona);
        return copy;
    }

    /**
     * Convert a PersonaMySuffix to a JSON which can be sent to the server.
     */
    private convert(persona: PersonaMySuffix): PersonaMySuffix {
        const copy: PersonaMySuffix = Object.assign({}, persona);
        return copy;
    }
}
