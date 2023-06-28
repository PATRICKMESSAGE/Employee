import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Emp} from 'src/app/model/emp';
import { LeaveHistoryService } from 'src/app/service/leave-history.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-leave-history',
  templateUrl: './leave-history.component.html',
  styleUrls: ['./leave-history.component.css']
})
export class LeaveHistoryComponent {
  leaveDetail!: FormGroup;
  leaveObject: Emp = new Emp();
  leaveList: Emp[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private empService: LeaveHistoryService,
    private http: HttpClient
  ) { }

  ngOnInit(): void {
    this.getAllEmployee();
    this.leaveDetail = this.formBuilder.group({
      name: [''],
      email: [''],
      phone: [''],
      leavestartday: [''],
      leaveendday: [''],
      duration: [''],
    });
  }

  addEmployee() {
    console.log(this.leaveDetail);
    this.leaveObject.name = this.leaveDetail.value.name;
    this.leaveObject.email = this.leaveDetail.value.email;
    this.leaveObject.phone = this.leaveDetail.value.phone;
    this.leaveObject.leavestartday = this.leaveDetail.value.leavestartday;
    this.leaveObject.leaveendday = this.leaveDetail.value.leaveendday;
    this.leaveObject.duration = this.leaveDetail.value.duration;

    this.http.post<Emp>('http://localhost:8100/employees', this.leaveObject).subscribe(
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
    this.http.get<Emp[]>('http://localhost:8100/employees').subscribe(
      (res) => {
        this.leaveList = res;
      },
      (err) => {
        console.log('error while fetching data.');
      }
    );
  }

  editEmployee(emp: Emp) {
    this.leaveDetail.controls['name'].setValue(emp.name);
    this.leaveDetail.controls['email'].setValue(emp.email);
    this.leaveDetail.controls['phone'].setValue(emp.phone);
    this.leaveDetail.controls['leavestartday'].setValue(emp.leavestartday);
    this.leaveDetail.controls['leaveendday'].setValue(emp.leaveendday);
    this.leaveDetail.controls['duration'].setValue(emp.duration);
  }

  updateEmployee() {
    this.leaveObject.name = this.leaveDetail.value.name;
    this.leaveObject.email = this.leaveDetail.value.email;
    this.leaveObject.phone = this.leaveDetail.value.phone;
    this.leaveObject.leavestartday = this.leaveDetail.value.leavestartday;
    this.leaveObject.leaveendday = this.leaveDetail.value.leaveendday;
    this.leaveObject.duration = this.leaveDetail.value.duration;

    this.empService.updateEmployee(this.leaveObject).subscribe(
      (res) => {
        console.log(res);
        this.getAllEmployee();
      },
      (err) => {
        console.log(err);
      }
    );
  }

  deleteEmployee(emp: Emp) {
    this.empService.deleteEmployee(emp).subscribe(
      (res) => {
        console.log(res);
        alert('Are you to delete this Employee permanently.');
        this.getAllEmployee();
      },
      (err) => {
        console.log(err);
      }
    );
  }
}
