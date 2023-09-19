let $ = document

const questionBox = $.querySelector('.question')
const answerCotainer = $.querySelector('.answer-cotainer')
const firstQuez = $.querySelector('.first')
const lastQuez = $.querySelector('.last')
const nextQuestion = $.querySelector('.next-Question')
const statusTime = $.querySelector('.status-time')
const endQuez = $.querySelector('.end-Quez')
const restartQuez = $.querySelector('.restart-quez')
const resultRight = $.querySelector('.result-right')
const ofQuestion = $.querySelector('.of-question')
const containerQuestion = $.querySelector('.container')
const resultBox = $.querySelector('.result-box')
const contatore = $.querySelector('.corrette')
const bodyElement = document.body;
const buttonErrori = $.querySelector('.errori')
const buttonErroriShow = $.querySelector('.erroriView')

let domandeGenerate = []
let domandeSbagliate = []
let rightQuez = 0
let index = 0

//Leggo le impostazioni
var mode = settings.mode
var numDomande = settings.numDomande
var VeroFalso = settings.VeroFalso

function caricaDomande()
{
    //Controlli

    if (mode !== "casuale" && mode !== "sequenziale") {
        
        alert("Modalità non valida. Il caricamento della pagina è stato interrotto.");
        bodyElement.innerHTML = "ERRORE SETTINGS"
    }

    if(numDomande < 0 || numDomande > questions.length)
    {
        alert("numDomande non valido, Aggiornare settings");
        bodyElement = innerHTML = "ERRORE SETTINGS"
    }

    if (mode === "casuale") 
    {
        var domandeDisponibili = questions.slice(); // Copia dell'array delle domande
        var numDomandeTotali = domandeDisponibili.length;

        // Verifica se numDomande è valido
        if (numDomande !== null && (numDomande <= 0 || numDomande > numDomandeTotali)) {
            alert("numDomande non valido, Aggiornare settings");
            bodyElement = innerHTML = "ERRORE SETTINGS";
        }

        var numDomandeDaEstrarre = (numDomande !== null) ? numDomande : numDomandeTotali;
        var indiciDomandeDisponibili = Array.from(Array(numDomandeTotali).keys()); // Lista degli indici delle domande disponibili

        for (var i = 0; i < numDomandeDaEstrarre; i++) {
            var randomIndex = Math.floor(Math.random() * indiciDomandeDisponibili.length);
            var domandaIndex = indiciDomandeDisponibili[randomIndex]; // Ottieni l'indice della domanda
            domandeGenerate.push(domandeDisponibili[domandaIndex]);
            indiciDomandeDisponibili.splice(randomIndex, 1); // Rimuove l'indice dalla lista degli indici delle domande disponibili
        }
    }

    else if (mode === "sequenziale") 
    {
        var numDomandeTotali = questions.length;

        // Verifica se numDomande è valido
        if (numDomande !== null && (numDomande <= 0 || numDomande > numDomandeTotali)) 
        {
            alert("numDomande non valido, Aggiornare settings");
            bodyElement = innerHTML = "ERRORE SETTINGS"
        }

        var numDomandeDaEstrarre = (numDomande !== null) ? numDomande : numDomandeTotali;

        for (var i = 0; i < numDomandeDaEstrarre; i++) 
        {
            domandeGenerate.push(questions[i]);
        }
    } 
    else 
    {
        alert("Modalità non valida. Il caricamento della pagina è stato interrotto.");
        bodyElement.innerHTML = "ERRORE SETTINGS"
    }
}

function createTemplate(q) {
    answerCotainer.innerHTML = ''
    questionBox.innerHTML = ''

    let quezTemplate = `<p>${q[index].question}</p>`

    let answerOption = `<p class="answer">${q[index].options[0]}</p>
    <p class="answer">${q[index].options[1]}</p>`

    questionBox.insertAdjacentHTML('beforeend', quezTemplate)
    answerCotainer.insertAdjacentHTML('beforeend', answerOption)

    firstQuez.innerHTML = index + 1
    lastQuez.innerHTML = q.length

    let answer = $.querySelectorAll('.answer')

    for (let i = 0; i < answer.length; i++) {
        answer[i].setAttribute('onclick', 'checkAnswer(this)')
    }

    if(VeroFalso === true)
    {
        if (answer.length === 2) {
          var firstAnswer = answer[0].textContent.trim();
          var secondAnswer = answer[1].textContent.trim();

          if (firstAnswer === 'True' && secondAnswer === 'False') {
            answer[0].id = 'AnswerTrue';
            answer[1].id = 'AnswerFalse';
          }
        }
    }

}

var startTime;
var elapsedTime = 0;
var timerId;

function startCronometro() {
  startTime = new Date().getTime();

  function updateCronometro() {
    var currentTime = new Date().getTime();
    elapsedTime = currentTime - startTime;

    var minutes = Math.floor(elapsedTime / 60000);
    var seconds = Math.floor((elapsedTime % 60000) / 1000);
    var milliseconds = elapsedTime % 1000;

    // Aggiungi un zero iniziale se i minuti, secondi o millisecondi sono inferiori a 10
    minutes = (minutes < 10) ? "0" + minutes : minutes;
    seconds = (seconds < 10) ? "0" + seconds : seconds;
    milliseconds = (milliseconds < 100) ? (milliseconds < 10) ? "00" + milliseconds : "0" + milliseconds : milliseconds;

    var cronometroString = minutes + ":" + seconds + "." + milliseconds;
    
    document.getElementById("footerTimer").innerHTML = cronometroString

    timerId = setTimeout(updateCronometro, 10); // Aggiorna ogni 10 millisecondi
  }

  updateCronometro();
}

// Funzione per interrompere il cronometro e restituire il tempo trascorso
function stopCronometro() {
  clearTimeout(timerId);
  return elapsedTime;
}

function formatTime(milliseconds) {
  var seconds = Math.floor(milliseconds / 1000);
  var minutes = Math.floor(seconds / 60);
  seconds %= 60;

  // Aggiungi un zero iniziale se i minuti o i secondi sono inferiori a 10
  minutes = (minutes < 10) ? "0" + minutes : minutes;
  seconds = (seconds < 10) ? "0" + seconds : seconds;

  return minutes + ":" + seconds;
}

function convertToText(questions) {
  var text = "";

  questions.forEach(function (question) {
    var questionText = question.question;
    var answer = question.answer;

    text += '"' + questionText + '" : "' + answer + '"\n';
  });

  return text;
}

function generateHTMLPage() {
    
    let html = "<table border='1'>\n";

    for (let i = 0; i < domandeSbagliate.length; i++) {
    const question = domandeSbagliate[i];
    const color = question.answer === "True" ? "green" : "red";

    html += `<tr>
      <td><font color='${color}'>${question.answer.charAt(0)}</font></td>
      <td>${question.question}</td>
    </tr>\n`;
    }

    html += "</table>";

    document.open();
    document.write(html);
    document.close();

}



function saveToTextFile(data, filename) {
  var blob = new Blob([data], { type: 'text/plain' });
  var url = URL.createObjectURL(blob);

  var link = document.createElement('a');
  link.href = url;
  link.download = filename;

  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

function checkAnswer(answer) {

    //Al primo check faccio partire il timer --> Quiz iniziato
    if(index === 0)
    {
        startCronometro();
    }

    console.log(domandeGenerate[index])
    console.log("RISPOSTA: " + answer.innerHTML)

    let answerClick = answer.innerHTML
    let answerMain = domandeGenerate[index].answer
    let allAnswerChild = answerCotainer.children.length
    nextQuestion.classList.add('show-next')

    if (answerClick === answerMain) {
        answer.classList.add('rightAnswer')
        rightQuez++
        
        contatore.innerHTML = rightQuez

    } 
    else 
    {
        //Risposta Sbagliata
        //Immagazzino
        //console.log(questions[index])
        domandeSbagliate.push(domandeGenerate[index])

        answer.classList.add('noAnswer')
        for (let i = 0; i < allAnswerChild; i++) {
            if (answerCotainer.children[i].innerHTML === answerMain) {
                answerCotainer.children[i].classList.add('rightAnswer')
            }
        }
    }

    for (let i = 0; i < allAnswerChild; i++) {
        answerCotainer.children[i].classList.add('disable')
    }
}


function nextQuestionHandler() {
    index++

    if (index === domandeGenerate.length) 
    {
        stopCronometro()
        nextQuestion.classList.remove('show-next')
        endQuez.classList.add('show-end')

    } 
    else 
    {
        createTemplate(domandeGenerate)
        nextQuestion.classList.remove('show-next')
    }
}

function showResultQuez() {
    
    var tempoTrascorso = stopCronometro();
    containerQuestion.classList.add('hide-question')
    resultBox.classList.add('show-result')

    resultRight.innerHTML = rightQuez
    ofQuestion.innerHTML = domandeGenerate.length

    document.getElementById("time-quiz").innerHTML = formatTime(tempoTrascorso)

}


function errori()
{
    var convertedText = convertToText(domandeSbagliate);
    var filename = "Errori.txt";
    saveToTextFile(convertedText, filename);
}

function restartQuezHandler() {
    location.reload()
}


 //Set up scorciatoie 
document.addEventListener('keydown', function(event) {
  var bottone = document.getElementById('AnswerTrue'); // ID del bottone che desideri cliccare
  var bottone2 = document.getElementById('AnswerFalse')
  
  if (event.key === "v") {
    bottone.click();
  }

  if(event.key === "f")
  {
    bottone2.click()
  }

});

var paragrafo = document.getElementById('questionParagraph');

paragrafo.addEventListener('click', function() {
  var testoDomanda = paragrafo.textContent;
  
  navigator.clipboard.writeText(testoDomanda)
    .then(function() {
      console.log('Testo domanda copiato negli appunti');
      // Puoi mostrare una notifica o eseguire altre azioni qui se necessario
    })
    .catch(function(error) {
      console.error('Errore durante la copia del testo domanda:', error);
    });
});

nextQuestion.addEventListener('click', nextQuestionHandler)
restartQuez.addEventListener('click', restartQuezHandler)
endQuez.addEventListener('click', showResultQuez)
buttonErrori.addEventListener('click', errori)
buttonErroriShow.addEventListener('click', generateHTMLPage)

caricaDomande()
createTemplate(domandeGenerate)


