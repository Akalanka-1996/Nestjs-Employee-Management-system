import { Injectable, NotFoundException } from '@nestjs/common';
import { Employee, EmployeeTier, EmployeeStatus } from './Employee.model';
import {v1 as uuid} from 'uuid'
import { EmployeeSearchDto } from './Employee.Search.dto';
import { EmployeeUpdateDto } from './Employee.Update.dto';
import { EmployeeCreateDto } from './Employee.Create.dto';

@Injectable()
export class EmployeesService {

private employees: Employee[] = []

getAllEmployees(){
    return this.employees
}

/*
createEmployee(firstName: string, lastName: string, designation: string, nearestCity: string, tier: EmployeeTier){

    const employee={
        id: uuid(),
        firstName,
        lastName,
        designation,
        nearestCity,
        tier,
        status: EmployeeStatus.ACTIVE
    }

    this.employees.push(employee)
    return employee

}
*/



createEmployee(employeeCreateDto: EmployeeCreateDto) {
    const {firstName, lastName, designation, nearestCity, tier} = employeeCreateDto

    const employee = {
        id: uuid(),
        firstName,
        lastName,
        designation,
        nearestCity,
        tier,
        status: EmployeeStatus.ACTIVE
    }

    this.employees.push(employee)
    return employee
}

searchEmployee(employeeSearchDto: EmployeeSearchDto) {
    console.log(employeeSearchDto)
    const {status, name} = employeeSearchDto;
    let employees = this.getAllEmployees();

    if(status) {
        console.log("abc")
        employees = employees.filter(employee => employee.status === status);
    }

    if (name) {
        console.log("name")
        employees = employees.filter(employee => employee.firstName.includes(name) || employee.lastName.includes(name));
    }

    return employees

}

getEmployeeById(id: string): Employee {
    const employees = this.getAllEmployees()
    let employee = employees.find(employee => employee.id == id)
    if(!employee){
        throw new NotFoundException(`${id} is not exist`)
    }
    return employee
}

updateEmployee(employeeUpdateDto: EmployeeUpdateDto) :Employee{
    const {id, city} = employeeUpdateDto;

    let employee = this.getEmployeeById(id)

    employee.nearestCity = city
    return employee
}

deleteEmployee(id: string): boolean {
    console.log("delete")
    let employees = this.getAllEmployees();
    this.employees = employees.filter(employee => employee.id != id)
    return (employees.length != this.employees.length)
}

}
