import { pipe } from "fp-ts/lib/function";
import { Person } from "./interfaces";

const people : Array<Person> = [
    {
        firstName : 'Mario',
        lastName : 'Rossi',
        age : 27,
    },
    {
        firstName : 'Filippo',
        lastName : 'Neri',
        age: 16,
    },
    {
        firstName : 'Maria',
        lastName : 'Verdi',
        age: 43,
    }
];

const filterAdult = ( people: Array<Person> ) : Array<Person> => {
    return people.map((person : Person) => {
        if (person.age > 18) {
            return person;
        }
        return null;
    });
};

const removeNotAdult = (people : Array<Person> ) : Array<Person> => { 
    return people.filter((person : Person) => person != null);
};

const takeFirstPerson = (people : Array<Person> ) : Person => {
    return people[0];
};

const numberOfAdultPerson = pipe(
    people,
    filterAdult,
    removeNotAdult,
    takeFirstPerson,
);

console.log(numberOfAdultPerson);