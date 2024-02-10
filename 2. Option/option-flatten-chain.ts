import { pipe } from "fp-ts/lib/function";
import { Option, some, none, map, flatten, chain } from "fp-ts/Option";
import { Role } from "./enums";
import { Employee } from "./interfaces";

const employees: Array<Employee> = [
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
];

const firstWithRole = (employees: Array<Employee>): Option<Employee> => {
	return some(
		employees.filter((employee: Employee) => {
			return employee.role == Role.HR;
		})[0]
	);
};

const getUnder35 = (employee: Employee): Option<Employee> => {
	if (employee.age < 35) {
		return some(employee);
	}
	return none;
};

const employee = pipe(employees, firstWithRole, chain(getUnder35));

