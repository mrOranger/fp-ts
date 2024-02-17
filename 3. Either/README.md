# Either 
Per spiegare cosa sia effettivamente il costrutto __Either__ dobbiamo analizzare alcune limitazioni di __Option__. Prendendo in esame il seguente pezzo di codice:

```typescript
interface Card {
	total : number;
	frozen : boolean;
}

function pay (card : CreditCard, total : number) : Option<CreditCard> {
	if ((card.total < total) || card.frozen) {
		return none();
	}
	card.total = card.total - total;
	return some(card);
}
```

prendendo in input una carta di credito ed il totale del conto da saldare, la funzione _pay_ restituisce un _Option_ contenente la carta di credito con il saldo aggiornato, nel caso in cui il pagamento è andato a buon fine, ed un _None_, nel caso in cui il pagamento ha avuto qualche problema ... si ma quale problema?

Ecco perché viene introdotto il tipo _Either_, sostanzialmente perché _Option_ non è in grado di fornirci informazioni aggiuntive in alcune situazione che le richiedono.

Il tipo _Either_ è infatti definito come segue:
```typescript
type Either<E, V> = Left<E> | Right<V>
```
questo significa che un _Either_ può assumere contemporaneamente due valori distinti, e nel nostro caso potrebbe assumere come valore sinistro il tipo di errore che vogliamo gestire, e come valore destro, il tipo di valore che potrebbe essere restituito come output.

## Either e gestione delle eccezioni
Come vediamo nell'esempio del file [either.ts](either.ts), la funzione che implementa il nuovo metodo di pagamento, adesso restituisce un tipo _Either_ che ci indica cosa accade nello specifico se viene sollevata un'eccezione:

```typescript
const pay = (total : number) => (card : CreditCard) : Either<FrozenAccountException | InsufficientCreditException, CreditCard> => {
	if (card.total < total) {
		return left(new InsufficientCreditException("Insufficient credit."));
	}
	if (card.frozen) {
		return left(new FrozenAccountException("Frozen card."));
	}
	card.total = card.total - total;
	return right(card);
}
```

cosa che invece non accadeva se avessimo dichiarato la stessa funzione come abbiamo visto con _Option_. In un caso d'uso reale questo ci semplifica di molto il lavoro in quanto conosciamo già nella dichiarazione della funzioni quali siano i casi in cui questa fallisca.

Come possiamo accedere però al valore contenuto in _Either_? In maniera quasi simile a _Option_, possiamo utilizzare la funzione del namespace _fp-ts/Either_ _match_, che prende in input due funzioni da eseguire rispettivamente se è contenuto un valore sinistro o destro, restituendo un risultato comune:

```typescript
match(
	(error : FrozenAccountException | InsufficientCreditException) => error.message,
	(card : CreditCard) => "Payment accepted.",
)
```

## Try-catch con Either
Either ci permette quindi di avere una gestione un po' più controllata delle eccezioni, si può fare di meglio, tuttavia, usando la funzione __trtCatch_. Questa particolare funzione definita nel namespace _Either_, permette di specificare il risultato finale passando due funzioni differenti, nel caso in cui venga sollevata un'eccezione, oppure nel caso in cui tutto vada per il meglio.

```typescript
function tryCatch<E, T>(
	f : () => T,
	e : (m : unkown) => E
)
```

Come si vede nell'esempio del file [PaymentOption.ts](./interfaces/PaymentOption.ts), all'interno della funzione _pay_, definiamo i due rami della computazione che potrebbero essere eseguiti, e restituiamo un tipo _Either_, contenente i due possibili esiti della funzione:

```typescript
public pay (amout : number) : (account : Account) => Either<string, Account> {
	return (account : Account) => {
		return tryCatch(
			() => {
				if (account.balance > amout) {
					if (!account.isFrozen) {	
						account.balance = account.balance - amout;
						return account;
					}
					throw new FrozenAccountException('Frozen account.');
				}
				throw new InsufficientCreditException('Insufficient credit');
			},
			(exception) => {
				if (exception instanceof InsufficientCreditException || exception instanceof FrozenAccountException) {
					return exception.message;
				}
				return 'Unknown exception.';
			}
		);
	}
}
```
Quale sarebbe il vantaggio di dover usare questa funzione? Il vantaggio lo possiamo immediatamente vedere all'interno della funzione principale nel file [try-catch.ts](try-catch.ts):

```typscript
public run () : string {
	return pipe(
		this.account,
		this.paymentOption.pay(1000),
		match(
			(exception : string) => `An exception has been thrown ... ${exception}`,
			(account : Account) => account.info,
		)
	)
}
```
grazie all'uso di _tryCatch_ e _Either_ sappiamo esattamente quale sia il risultato della computazione della funzione _pay_, cosa che invece non avremmo saputo in alcun modo in un approccio imperativo del try-catch.