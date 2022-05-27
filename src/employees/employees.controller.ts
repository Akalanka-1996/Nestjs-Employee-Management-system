import { Body, Controller, Delete, Get, HttpCode, HttpStatus, NotFoundException, Param, Post, Put, Query } from '@nestjs/common';
import { Employee } from './Employee.model';
import { EmployeeSearchDto } from './Employee.Search.dto';
import { EmployeeUpdateDto } from './Employee.Update.dto';
import { EmployeesService } from './employees.service';

@Controller('employees')
export class EmployeesController {

    constructor(private employeeService:EmployeesService){

    }

    @Get()
    getAllEmployees(@Query() param:EmployeeSearchDto){
        // console.log(param)
        // todo: implement
        if (Object.keys(param).length) {
            console.log(param)
            console.log("filter")
            return this.employeeService.searchEmployee(param);
        } else {
            console.log("no filter")
            return this.employeeService.getAllEmployees()

        }
    }

    @Get('/:id')
    getEmployeeById(@Param('id') id : string) {
        return this.employeeService.getEmployeeById(id)
    }

    @Post()
    createEmployee(@Body('firstName') firstName: string,
        @Body('lastName') lastName: string,
        @Body('designation') designation: string,
        @Body('nearestCity') nearestCity: string,
        @Body('tier') tier: number,){

        return this.employeeService.createEmployee(firstName, lastName, designation, nearestCity, tier)

    }

    // another method
    
    /*
    @Post()
    createEmployee2(@Body() request){

    return this.employeeService.createEmployee(request.firstName, request.lastName, request.designation, request.nearestCity, request.tier)

    }
    */

    @Put('/:id/city')
    updateEmployee(@Param('id') id: string, @Body()  employeeUpdateDto: EmployeeUpdateDto) { // id comes as query param
        employeeUpdateDto.id = id
        return this.employeeService.updateEmployee(employeeUpdateDto)
    }

    @Delete('/:id')
    @HttpCode(204)
    deleteEmployee(@Param('id') id: string) {
       if( !this.employeeService.deleteEmployee(id)) {
           throw new NotFoundException("Employee does not exist")
       }
    }

}
