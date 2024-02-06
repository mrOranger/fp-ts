import { Option, none, some, map, match } from "fp-ts/lib/Option";
import { Role } from "./enums";
import { Department, Employee, Manager } from "./interfaces";
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

const getManagerEmployees = (department : Department) : Array<Employee> => {
    const employees : Array<Employee> = new Array<Employee>();
    for (const employee of department.employees) {
        if ((employee.role == department.manager.role)) {
            employees.push(employee);
        }
    }
    return employees;
};

const getFirstEmployee = (employees : Array<Employee>) : Option<Employee> => {
    if (employees.length == 0) {
        return none;
    }
    return some(employees[0]);
};

const toCredentials = (employee : Employee) : string => {
    return `${employee.firstName} ${employee.lastName}`;
};

const toUpperCase = (credentials : string) : string => {
    return credentials.toUpperCase();
};

const credentials = pipe(
    department,
    getManagerEmployees,
    getFirstEmployee,
    map((employee) => toCredentials(employee)),
    map((employee) => toUpperCase(employee)),
    match(
        () => `Non esiste nessun impiegato dello stesso ruolo del manager`,
        (credentials) => `Impiegato: ${credentials}`
    )
);

console.log(credentials);
