# Pipe & Flow

I primi due esempi più semplici che voglio mostrare riguardano l'uso delle fuzioni __pipe__ e __flow__. Per quanto riguarda la prima, questa permette di concatenare tra loro delle funzioni che trasformino il dato in input nel formato di output. La seconda è invece un po' più complessa, perché non restituice direttamente un risultato, ma un'altra funzione.

# Pipe
Il modo più semplice per immaginarsi questa funzione, ed il suo comportamento, è ricordarsi l'immagine di una tubatura ... 

![Funzione Pipe](../assets/pipe.svg)

questa funzione come ho detto, non fa altro che concatenare delle funzioni tra di loro, ma necessita che queste concordino tra di loro con il valore restituito, come ho fatto vedere nella figura. Nell'esempio del file [pipe.ts](pipe.ts), prendendo come input un insieme di [persone](./interfaces/person.interface.ts), possiamo eseguire una serie di operazioni in serie, facendoci restituire la prima persona che è effettivamente maggiorenne.

# Flow

Se __pipe__ restituisce un risultato tangibile, partendo da un input e trasformandolo, la funzione __flow__ non restituisce qualcosa di concreto, ma crea invece una nuova funzione. Il comportamento però è molto simple a quello di pipe, e lo spieghiamo con quest'immagine:

![Funzione Flow](../assets/flow.svg)

in pratica come ho detto, la funzione non restiuisce un dato, ma una nuova funzione che come possiamo vedere nel [file](./flow.ts), deve quindi essere invocata per essere eseguita, esattamente come una normale funzione.