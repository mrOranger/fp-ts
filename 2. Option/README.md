# Option

Consideriamo la seguente funzione: 

```typescript
function inverse (x : number) {
    if (x == 0) {
        throw new Error(`Invalid number for inverse.`);
    }
    return 1/x;
}
```
la funzione si comporta correttamente per il calcolo dell'inversa di un numero, ma in realtà la sua dichirazione sta mentendo.

Infatti, niente di questa ci sta indicando quale potrebbe essere il risultato che si ottiene nel caso di un'operazione invalida. Quindi, starà a noi successivamente gestire in maniera appropriata l'errore tramite un blocco _try-catch_. Ed in situazioni come queste che il costrutto __Option__ ci viene in soccorso. 

Questo è definito letteralmente come segue:

```typescript
type Option<T> = Some<T> | None
```

ossia, un elemento T opzionale o è un valore _Some_ che contiene T stesso, oppure e _None_. E'inutuibile quindi, comprendere che tutti i possibili errori che vengono sollevati vengono incapsulati all'interno di _None_.

Grazie al costruttone Option, infatti, possiamo riscrivere la prima funzione in questa maniera più compatta:

```typescript
function inverse (x : number) : Option<number> {
    if (x == 0) {
        return none;
    }
    return some(1/x);
}
```

ed in questa maniera, non dobbiamo più gestire l'eccezione che verrebbe sollevata nel caso in cui si chieda di eseguire l'inversa di 0.

## Gestione di Option

Tuttavia, è nostro compito gestire il possibile output di una computazione che restituisca il valore Option. Fortunatamente, sempre all'interno del package _Option_ della libreria _fp-ts_, esisono una serie di funzioni e costrutti che ci semplificano la vita. 

Ad esempio, nel [file allegato option.ts](./option.ts), viene definita una sequenza di operazioni tramite la funzione _pipe_, che permettono di restituire il numero di impegati junior di un'ipotetica azienda:

```typescript
const juniorEmployees = pipe(
    department,
    filterJuniorEmployee,
    getNumberOfJuniorEmployees,
    match(
        () => `There is none junior employee.`,
        (juniorEmployees : number) => `There are ${juniorEmployees} junior employees.`
    )
);
```

come nell'esempio, la funzione _getNumberOfJuniorEmployee_ restituisce il numero di impiegati junior, incapsulati all'interno di un oggetto _Option_. Tramite la funzione _match_, possiamo a sua volta mappare l'oggetto _Option_ in un altro valore, sulla base di quale sia il valore assunto dal primo. 

Ad esempio, restituiamo il messaggio _'There is none junior employee.'_, nel caso in cui Option abbia restituito None, altrimento la stringa _'There are ${juniorEmployees} junior employees.'_, nel caso in cui il valore sia _Some_.

## Operatore Map
Spesso è necessario manipolare il contenuto di un valore Option. E'possibile eseguire la manipolazione di questo valore manualmente cercando considerando le diramazioni nel caso in cui Option sia None, oppure usare la funzione __map__. 

Considerando l'esempio contenuto nel file [option-map.ts](./option-map.ts):

```typescript
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
```
vogliamo ottenere le credenziali del primo impiegato che abbia lo stesso ruolo del manager del dipartimento a cui il primo afferisce. Una volta ottenuto il primo impiegato della lista ed inserito questo nell'oggetto _Option_. Usiamo la funzione __map__ per convertire l'oggetto impiegato se presente, in una stringa contenente le credenziali di questo, e quindi convertiamo la stringa in maiuscolo.

Come possiamo vedere, è la funzione __map__ che si occupa di convertire il contenuto di _Option_, ed eventualmente gestire il caso in cui questo sia None.

## Operatori Flatted & Chain 

Commentiamo l'esempio descritto nel file [option-flatten-chain.ts](./option-flatten-chain.ts), e consideriamo il caso in cui da un insieme di Impiegati, si voglia ottenere il primo impiegato che sia afferente ad un certo dipartimento, e quindi vogliamo che vengano restituite le sue credenziali se questo è un impiegato under 35, altrimenti non deve essere restituito nulla.

Nella prima versione di questa implementazione, possiamo scrivere:

```typescript
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

pipe(employees, firstWithRole, map(getUnder35));
```

però, il risultato della funzione pipe, non è un _Optional\<Employee\>_, ma bensì un _Optional\<Optional\<Employee\>\>_. Questo comportamento però è completamente normale, in quanto come descritto dalle funzioni, non è detto che anche se la funzione _firstWithRole_ ci restituisce un Employee, questo valore venga restituito anche dalla funzione _getUnder35_, perché appunto non è detto che l'impiegato sia un under 35. Come fare allora?

Fortunatamente la libreria fp-ts mette a disposizione una nuova funzione chiamata _flatten_, che si occupa letteralmente di spacchettare questi _Optional_ annidati nel seguente modo:

```typescript
const employee = pipe(employees, firstWithRole, map(getUnder35), flatten);
```

Questo pattern di operatori _map_ seguiti da un _flatten_ è così comune che si è deciso di implementare una funzione che unisca le caratteristiche di entrambe, ossia la funzione _chain_. Il risultato finale del nostro esempio sarà quindi:

```typescript
const employee = pipe(employees, firstWithRole, chain(getUnder35));
```

## Operatore Predicate
L'operatore _Option.fromPredicate_ restituisce un Option contenente il valore dell'oggetto su cui si sta predicando, se il predicato è vero, altrimenti restituisce un _None_. Nell'esempio contenuto nel file [option-predicate.ts](./option-predicate.ts), vogliamo ottenere le credenziali di un impiegato se questo è di livello junior, altrimenti un messaggio che di indichi che questo non è un impiegato junior:

```typescript
const isJunior = (employee : Employee) => {
	return employee.age < 30;
};
```
la funzione _isJunior_ è appunto un __Predicato__, ossia una funzione che prende in input un valore e restituisce _true_ o _false_ se questo soddisfa o no una condizione. Mentre:

```typescript
const getCredentials = (employee : Employee) => {
	return `${employee.firstName} ${employee.lastName} is ${employee.age} years old, working as ${employee.role}`;
}
```

è una funzione di servizio che useremo per mappare le informazioni dell'impiegato, nel caso in cui il predicato che sia stato eseguito su questo, abbia restituito un valore true. 

Infine, la funzione:

```typescript
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
```

controlla se il parametro _employee_ sia effettivamente un impiegato junior, attraverso il predicato _isJunior_, e quindi ne estrare le credenziali usando una combinazione tra la funzione _map_ e la funzione _getCredentials_. Infine, usando la funzione _match_, restituiamo la stringa informativa sull'impiegato.

