import { Employee } from "./employee.interface";

export interface Manager extends Employee {
    responsibileOf : number,
}