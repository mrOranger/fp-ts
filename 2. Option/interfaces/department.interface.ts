import { Employee } from "./employee.interface";
import { Manager } from "./manager.interface";

export interface Department {
    name : string,
    employees : Array<Employee>,
    manager : Manager,
};