import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AdminService } from './admin.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'admin-module';

  // Define adminToUpdate object to bind to form fields
  adminToUpdate = {
    id: null,
    username: '',
    password: '',
    email: '',
    loginAttempts: 0,
    isActive: false,
    lastLoginTime: null
  };

  adminDetails = null as any;

  constructor(private adminService: AdminService) {
    this.getAdminDetails();
  }

  // Method to register a new admin
  register(registerForm: NgForm) {
    if (registerForm.valid) {
      this.adminService.registerAdmin(registerForm.value).subscribe(
        (resp: any) => {
          console.log('Admin registered:', resp);
          registerForm.reset();
          this.getAdminDetails();
        },
        (err: any) => {
          console.error('Error registering admin:', err);
        }
      );
    }
  }

  // Method to retrieve all admin details
  getAdminDetails() {
    this.adminService.getAdmins().subscribe(
      (resp: any) => {
        console.log('Admin details fetched:', resp);
        this.adminDetails = resp;
      },
      (err: any) => {
        console.error('Error fetching admin details:', err);
      }
    );
  }

  // Method to delete an admin
  deleteAdmin(admin: any) {
    if (admin && admin.id) {
      this.adminService.deleteAdmin(admin.id).subscribe(
        (resp: any) => {
          console.log('Admin deleted:', resp);
          this.getAdminDetails();
        },
        (err: any) => {
          console.error('Error deleting admin:', err);
        }
      );
    }
  }

  // Method to populate form for editing an admin
  edit(admin: any) {
    this.adminToUpdate = { ...admin }; // Make a copy of the selected admin to edit
  }
  updateAdmin() {
    this.adminService.updateAdmin(this.adminToUpdate).subscribe(
      (resp: any) => {
        console.log(resp);
        this.getAdminDetails(); // Refresh admin details after update
      },
      (err: any) => {
        console.log(err);
      }
    );
  }
 
  }

