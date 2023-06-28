 import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Emp} from '../model/emp';

@Injectable({
  providedIn: 'root'
})
export class LeaveHistoryService {

  private baseUrl = 'http://localhost:8100';

  constructor(private http: HttpClient) { }

  getAllEmployee(): Observable<Emp[]> {
    return this.http.get<Emp[]>(`${this.baseUrl}/employees`);
  }

  addEmployee(employee: Emp): Observable<Emp> {
    return this.http.post<Emp>(`${this.baseUrl}/employees`, employee);
  }

  updateEmployee(employee: Emp): Observable<Emp> {
    return this.http.put<Emp>(`${this.baseUrl}/employees/${employee.name}`, employee);
  }

  deleteEmployee(employee: Emp): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/employees/${employee.name}`);
  }
}
