import { IsNotEmpty, NotEquals } from "class-validator"
import { EmployeeStatus, EmployeeTier } from "./Employee.model"

export class EmployeeCreateDto{
    id: string
    @IsNotEmpty() // pipe validation for firstName
    firstName: string
    @IsNotEmpty()   // pipe validation for lastName
    lastName: string
    @NotEquals('CEO') // designation value should not be CEO
    designation: string
    nearestCity: string
    tier: EmployeeTier
    status: EmployeeStatus
}
