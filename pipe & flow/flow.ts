import { flow } from "fp-ts/lib/function";
import { Person } from "./interfaces";

const people : Array<Person> = [
   {
        firstName : 'Mario',
        lastName : 'Rossi',
        age : 21,
   },
   {
        firstName : 'Maria',
        lastName : 'Verdi',
        age: 12,
   },
    {
        firstName : 'Angelo',
        lastName : 'Pierino',
        age: 17,
    }
];

const takeAdults = (people : Array<Person>) : Array<Person> => {
    const adults : Array<Person> = new Array();
    for (let i = 0; i < people.length; i++) {
        if (people[i].age > 18) {
            adults.push(people[i]);
        }
    }
    return adults; 
};

const computeNumberOfAdults = (people : Array<Person>) : number => {
    return people.length;
};

const thereIsAtLeastOneAdult = (numberOfAdults : number) : boolean => {
    return numberOfAdults > 0;
};

const atLeastOneAdult = flow(takeAdults, computeNumberOfAdults, thereIsAtLeastOneAdult);
console.log(`Is there at least one adult? ${atLeastOneAdult(people)}`)