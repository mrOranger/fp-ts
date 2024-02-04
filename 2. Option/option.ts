import { Department, Employee, Manager } from "./interfaces";
import { Role } from "./enums";
import { Option, some, none, match, isNone} from "fp-ts/Option";
import { pipe } from "fp-ts/lib/function";

const employees : Array<Employee> = [
    {
        firstName : 'Mario',
        lastName : 'Rossi',
        age: 26,
        role : Role.IT,
    },
    {
        firstName : 'Maria',
        lastName : 'Verdi',
        age: 21,
        role : Role.IT,
    },
    {
        firstName : 'Federico',
        lastName : 'Neri',
        age: 32,
        role : Role.HR,
    }
];

const manager : Manager = {
    firstName : 'Arianna',
    lastName : 'Neri',
    age: 31,
    role: Role.HR,
    responsibileOf: 3,
};

const department : Department = {
    name : 'Department 1',
    employees : employees,
    manager : manager,
};

const filterJuniorEmployee = (department : Department) : Option<Array<Employee>> => {
    const juniorEmployees : Array<Employee> = new Array<Employee>();
    for (let employee of department.employees) {
        if (employee.age < 30) {
            juniorEmployees.push(employee);
        }
    }
    if (juniorEmployees.length > 0) {
        return some(juniorEmployees);
    }
    return none;
};

const getNumberOfJuniorEmployees = (employees : Option<Array<Employee>>) => {
    if (!isNone(employees)) {
        return some(employees.value.length);
    }
    return none;
};

const juniorEmployees = pipe(
    department,
    filterJuniorEmployee,
    getNumberOfJuniorEmployees,
    match(
        () => `There is none junior employee.`,
        (juniorEmployees : number) => `There are ${juniorEmployees} junior employees.`
    )
);

console.log(juniorEmployees);