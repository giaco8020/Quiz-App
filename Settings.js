let settings = {
    "mode": "casuale",
    "numDomande" : 5,
    "VeroFalso" : true
}


/*
    IT

    mode == "casuale" --> Vengono pescate le domande in modo casuale
    mode == "sequenziale" --> Vengono pescate le domande in modo sequenziale

    numDomande == null --> Vengono considerate tutte le domande presenti nel database in un quiz
    numDomande > 0 e minore del num max delle domande nel database
    
    veroFalso == true abilita le scorciatoie da tastiera V=Vero e F=Falso (ovviamente le domande inserite devono avere come uniche risposte plausibili Vero o Falso) 

    EN

    mode == "casuale" --> Questions are drawn randomly
    mode == "sequenziale" --> Questions are drawn sequentially

    numDomande == null --> All questions in the database are considered in a quiz
    numDomande > 0 and less than the max number of questions in the database

    veroFalso == true enables keyboard shortcuts V=True and F=False (obviously the inserted questions must have only plausible answers as True or False)

*/

