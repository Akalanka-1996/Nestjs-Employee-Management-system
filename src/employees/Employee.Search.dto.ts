import { IsIn } from "class-validator";
import { Employee, EmployeeStatus } from "./Employee.model";

export class EmployeeSearchDto{
    // user can filter base on status and name
    @IsIn(Object.values(EmployeeStatus)) // check whether employee status is valid
    status: EmployeeStatus
    name: string

}