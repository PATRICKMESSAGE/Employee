import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Employee } from 'src/app/model/employee';
import { EmployeeService } from 'src/app/service/employee.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  empDetail!: FormGroup;
  empObject: Employee = new Employee();
  empList: Employee[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private empService: EmployeeService,
    private http: HttpClient
  ) { }

  ngOnInit(): void {
    this.getAllEmployee();
    this.empDetail = this.formBuilder.group({
      id: [''],
      name: [''],
      email: [''],
      salary: [''],
      phone: [''],
    });
  }

  addEmployee() {
    console.log(this.empDetail);
    this.empObject.id = this.empDetail.value.id;
    this.empObject.name = this.empDetail.value.name;
    this.empObject.email = this.empDetail.value.email;
    this.empObject.salary = this.empDetail.value.salary;
    this.empObject.phone = this.empDetail.value.phone;

    
    this.http.post<Employee>('http://localhost:8100/employees', this.empObject).subscribe(
      (res) => {
        console.log(res);
        this.getAllEmployee();
      },
      (err) => {
        console.log(err);
      }
    );
  }

  getAllEmployee() {
    this.http.get<Employee[]>('http://localhost:8100/employees').subscribe(
      (res) => {
        this.empList = res;
      },
      (err) => {
        console.log('error while fetching data.');
      }
    );
  }

  editEmployee(emp: Employee) {
    this.empDetail.controls['id'].setValue(emp.id);
    this.empDetail.controls['name'].setValue(emp.name);
    this.empDetail.controls['email'].setValue(emp.email);
    this.empDetail.controls['salary'].setValue(emp.salary);
    this.empDetail.controls['phone'].setValue(emp.phone);
  }

  updateEmployee() {
    this.empObject.id = this.empDetail.value.id;
    this.empObject.name = this.empDetail.value.name;
    this.empObject.email = this.empDetail.value.email;
    this.empObject.salary = this.empDetail.value.salary;
    this.empObject.phone = this.empDetail.value.phone;

    
    this.empService.updateEmployee(this.empObject).subscribe(
      (res) => {
        console.log(res);
        this.getAllEmployee();
      },
      (err) => {
        console.log(err);
      }
    );
  }

  deleteEmployee(emp: Employee) {
    this.empService.deleteEmployee(emp).subscribe(
      (res) => {
        console.log(res);
        alert('The Employee has deleted successfully.');
        this.getAllEmployee();
      },
      (err) => {
        console.log(err);
      }
    );
  }
}