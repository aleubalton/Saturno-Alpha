import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { Tarea } from './tarea.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<Tarea>;

@Injectable()
export class TareaService {

    private resourceUrl =  SERVER_API_URL + 'api/tareas';

    constructor(private http: HttpClient) { }

    create(tarea: Tarea): Observable<EntityResponseType> {
        const copy = this.convert(tarea);
        return this.http.post<Tarea>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(tarea: Tarea): Observable<EntityResponseType> {
        const copy = this.convert(tarea);
        return this.http.put<Tarea>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<Tarea>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<Tarea[]>> {
        const options = createRequestOption(req);
        return this.http.get<Tarea[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<Tarea[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: Tarea = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<Tarea[]>): HttpResponse<Tarea[]> {
        const jsonResponse: Tarea[] = res.body;
        const body: Tarea[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to Tarea.
     */
    private convertItemFromServer(tarea: Tarea): Tarea {
        const copy: Tarea = Object.assign({}, tarea);
        return copy;
    }

    /**
     * Convert a Tarea to a JSON which can be sent to the server.
     */
    private convert(tarea: Tarea): Tarea {
        const copy: Tarea = Object.assign({}, tarea);
        return copy;
    }
}
