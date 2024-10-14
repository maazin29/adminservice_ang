import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  // Define your Spring Boot API base URL
  private API = "http://localhost:8080"; // Update to your backend URL if necessary

  constructor(private http: HttpClient) { }

  // Method to register a new admin
  public registerAdmin(adminData: any): Observable<any> {
    return this.http.post(`${this.API}/admin`, adminData);
  }

  // Method to get all admins
  public getAdmins(): Observable<any[]> {
    return this.http.get<any[]>(`${this.API}/admin`);
  }

  // Method to delete an admin by id
  public deleteAdmin(adminId: number): Observable<any> {
    return this.http.delete(`${this.API}/admin/${adminId}`);
  }

  // Method to update admin details
  public updateAdmin(admin: any): Observable<any> {
    return this.http.put(`${this.API}/admin/${admin.id}`, admin);
  }
}
