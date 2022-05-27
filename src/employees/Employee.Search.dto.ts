import { Employee, EmployeeStatus } from "./Employee.model";

export interface EmployeeSearchDto{
    // user can filter base on status and name
    status: EmployeeStatus,
    name: string

}