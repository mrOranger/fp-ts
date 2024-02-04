# Programmazione Funzionale in Typescript

La prima volta che mi approcciai alla programmazione funzionale, fu tramite il corso __Formal Methods for Computer Science__ della mia laurea magistrale. Devo ammettere che all'inizio programmare in __Haskell__ mi sembrava veramente difficile e non riuscivo a trovare un'applicazione pratica di quello che imparavo.

Mi ci sono voluti due anni per realizzare finalmente a cosa mi fosse servito imparare quei concetti, e questo mi è costato tempo, in quanto sono dovuto andare a riprenderli successivamente mentre lavoravo, o mi stavo approcciando alla gestione di problemi complessi che richiedevano un'attenta gestione degli errori e delle eccezioni.

Grazie ai concetti della programmazione funzionale, infatti, capivo meglio come esprimere alcune soluzioni, dividendole in micro componenti e tramite i queli riuscivo a gestire in maniera molto più efficace gli errori e le eccezioni. Quest'attenta gestione dei casi limiti prende il nome di __Railway-oriented Programming__, tramite la quale possiamo creare applicazioni robute con un'attenta gestione agli errori, usando la composizione delle funzioni.

Per un'ultiore approfondimento sulle motivazioni dell'uso della programmazione funzionale, e del Railway-oriented Programming, rimando a [questo interessante articolo fatto dal team di PagoPA](https://medium.com/pagopa-spa/programmazione-funzionale-typescript-creare-servizi-digitali-efficienti-afd6dcdccdc0).

## Organizzazione della repository

Questa repository esplora la libraria __fp-ts__ di typescript, che ho spesso usato quando mi occupato di applicazioni sviluppate in _Angular_, e nella quale sono implementati i principali costrutti della programmazione funzionale. In particolare, la repository è divisa nei seguenti capitoli:

1. Composizione di funzioni con __flow__ e __pipe__.
2. Gestione di eccezioni attraverso il costrutto __Option__.
