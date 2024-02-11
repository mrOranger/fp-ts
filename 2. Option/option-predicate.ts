import { pipe } from "fp-ts/lib/function";
import { Role } from "./enums";
import { Employee } from "./interfaces";
import { fromPredicate, map, match } from "fp-ts/lib/Option";

const juniorEmployee : Employee = {
	firstName : 'Mario',
	lastName : 'Rossi',
	age: 12,
	role: Role.HR,
}

const seniorEmployee : Employee = {
	firstName : 'Mario',
	lastName : 'Verdi',
	age: 32,
	role: Role.IT,
}

const isJunior = (employee : Employee) => {
	return employee.age < 30;
};

const getCredentials = (employee : Employee) => {
	return `${employee.firstName} ${employee.lastName} is ${employee.age} years old, working as ${employee.role}`;
}

function getJuniorEmployeeCredentials (employee : Employee) {
	return pipe(
		employee,
		fromPredicate(isJunior),
		map(getCredentials),
		match(
			() => `${employee.firstName} ${employee.lastName} is not a junior employee`,
			(credentials) => credentials
		)
	)
}

console.log(getJuniorEmployeeCredentials(juniorEmployee));
console.log(getJuniorEmployeeCredentials(seniorEmployee));