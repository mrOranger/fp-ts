import { pipe } from "fp-ts/lib/function";
import { Role } from "./enums";
import { Department, Employee } from "./interfaces";
import { alt, fromPredicate, getOrElse, map } from "fp-ts/lib/Option";

const department: Department = {
	name: "Department 1",
	employees: [
		{
			firstName: "Mario",
			lastName: "Rossi",
			age: 26,
			role: Role.IT,
		},
		{
			firstName: "Maria",
			lastName: "Verdi",
			age: 21,
			role: Role.IT,
		},
		{
			firstName: "Federico",
			lastName: "Neri",
			age: 32,
			role: Role.HR,
		},
	],
	manager: {
		firstName: "Arianna",
		lastName: "Neri",
		age: 31,
		role: Role.HR,
		responsibileOf: 3,
	},
};

const getManagerCredentials = (employee: Employee) => {
	return pipe(
		employee,
		fromPredicate(
			(employee) =>
				department.manager.firstName == employee.firstName && department.manager.lastName == employee.lastName
		),
		map((employee) => `${employee.firstName} ${employee.lastName} is a manager.`)
	);
};

const getJuniorEmployeeCredentials = (employee: Employee) => {
	return pipe(
		employee,
		fromPredicate(
			(employee) =>
				employee.age < 30
		),
		map((employee) => `${employee.firstName} ${employee.lastName} is a junior employee.`)
	);
};

const employee : Employee = {
	firstName: "Arianna",
	lastName: "Verdi",
	age: 27,
	role: Role.HR,
};

const credentials = pipe(
	employee, 
	getManagerCredentials,
	alt(() => getJuniorEmployeeCredentials(employee)),
	getOrElse(() => `${employee.firstName} ${employee.lastName} is a simple employee.`)
);

console.log(credentials);
