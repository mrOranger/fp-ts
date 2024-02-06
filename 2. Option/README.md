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