import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Run} from "../models/run.model";
import {firstValueFrom, Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class RunService {
  constructor(private http: HttpClient) {
  }

  getRuns(): Observable<Run[]> {
    return this.http.get<Run[]>('/api/runs');
  }

  async getRunsAsync(): Promise<Run[]> {
    return firstValueFrom(this.getRuns());
  }
}
