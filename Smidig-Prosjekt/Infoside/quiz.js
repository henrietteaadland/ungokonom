const questions = [
    {
        question: "Hva er akseptpris?",
        options: [
            "Den laveste prisen en kjøper vil godta",
            "Løsning som sikrer at dine penger er sikre",
            "Anbefalte kjøpspris av megler",
        ],
        correctIndex: 0 /*hvilken som er riktig 0=1, 1=2, 3=2*/
    },

    {
        question: "Hva kjennetegner et annuitetslån?",
        options: [
            "At du betaler mindre hver måned",
            "Betaling av samme beløp hver måned",
            "En satt periode du har på deg for å betale tilbake",
        ],
        correctIndex: 1 /*hvilken som er riktig 0=1, 1=2, 3=2*/
    },
    {
        question: "Hva er egenkapital?",
        options: [
            "Penger du låner",
            "Penger du har",
            "Totale summen av alle lånene dine",
        ],
        correctIndex: 1 /*hvilken som er riktig 0=1, 1=2, 3=2*/
    },

    {
        question: "Hva viser et forbrukslån?",
        options: [
            "Et lån du kan få for å kjøpe bolig",
            "Et lån av penger uten sikkerhet",
            "Kostnader itillegg til lånet du tar",
        ],
        correctIndex: 1 /*hvilken som er riktig 0=1, 1=2, 3=2*/
    },

    {
        question: "Hva er et serielån?",
        options: [
            "Penger du låner av andre, ved å skrive under et dokument",
            "Et lån der du betaler samme beløp hver måned",
            "Et lån der du betaler mindre hver måned",
        ],
        correctIndex: 2 /*hvilken som er riktig 0=1, 1=2, 3=2*/
    },

    {
        question: "hva er gjeld?",
        options: [
            "Penger du skylder",
            "Penger i din konto",
            "Penger du låner bort",
        ],
        correctIndex: 0 /*hvilken som er riktig 0=1, 1=2, 3=2*/
    },

    {
        question: "Hva er nominell rente",
        options: [
            "Renten bare øker, synker ikke",
            "Renter uten gebyrer",
            "Renter du må betale på lånet ditt",
        ],
        correctIndex: 2 /*hvilken som er riktig 0=1, 1=2, 3=2*/
    },

    {
        question: "hva er en nedbetaligsplan?",
        options: [
            "Totale summen av hva du skylder",
            "En oversikt over dine regninger",
            "plan som viser hvor mye du må betale og hvor lang tid det vil ta",
        ],
        correctIndex: 2 /*hvilken som er riktig 0=1, 1=2, 3=2*/
    },

    {
        question: "Hva vil det si at du har fått en faktura?",
        options: [
            "Dokument som viser hva du må betale",
            "Kostnader for å drive en bedrift",
            "Et brev du for når du ikke har betalt det du skylder",
        ],
        correctIndex: 0 /*hvilken som er riktig 0=1, 1=2, 3=2*/
    },

    {
        question: "Hva er betydninger av kausjon?",
        options: [
            "At noen lover å betale for deg, dersom du ikke kan betale",
            "Oversikt over banken du er knyttet til",
            "Liste over dine regninger",
        ],
        correctIndex: 0 /*hvilken som er riktig 0=1, 1=2, 3=2*/
    },
];

const quizContainer = document.getElementById("quiz"); /* Alle spørsmålene*/
const scoreElement = document.getElementById("quiz-score"); /*Viser poengsum*/
const resetButton = document.getElementById("reset-quiz"); /*Knapp som starter quizen på nytt*/

let score = 0;

/*gå gjennom spørsmålene over*/
questions.forEach((q, qIndex) => {
    const questionE1 = document.createElement("article"); /*en article som container for spørsmålene*/
    questionE1.className = "quiz-question";

    /*Title for spørsmålene*/
    const title = document.createElement("h3");
    title.textContent = `spørsmål ${qIndex + 1}`;
    questionE1.appendChild(title);
    /*Title for spørsmålene*/

    const text = document.createElement("p"); /*<p></p> for spørsmål tekst*/
    text.className = "quiz-question-text"; /* for styling i CSS*/
    text.textContent = q.question;
    questionE1.appendChild(text);

    const optionsContainer = document.createElement("div"); /*en div som container*/
    optionsContainer.className = "quiz-options"; /* for styling i CSS*/

    /* går gjennom svaralternativene, og posissjon for riktig svar*/
    q.options.forEach((optionText, optionIndex) => {
        const button = document.createElement("button"); /*button for svarene*/
        button.className = "quiz-option"; /* for styling i CSS*/
        button.textContent = optionText; /* DENNE SLØSTE MASSE TID, HADDE OPTIONINDEX, SOM DA VISTE TALL OG IKKE SPØRSMÅL */
        button.dataset.questionIndex = qIndex.toString();
        button.dataset.optionIndex = optionIndex.toString(); /*sjekker om riktig*/

        button.addEventListener("click", handleAnswerClick); /*hver click kaller på funksjon nede*/

        optionsContainer.appendChild(button);
    });

    questionE1.appendChild(optionsContainer);
    quizContainer.appendChild(questionE1);
});

/*funksjon som kjører ved hvert click*/
function handleAnswerClick(event) {
    const button = event.currentTarget;
    const questionE1 = button.closest(".quiz-question");

    if (questionE1.classList.contains("answered")) return; /*gjør at man ikke kan svare på noe man har svart på*/

    const questionIndex = Number(button.dataset.questionIndex);
    const optionIndex = Number(button.dataset.optionIndex); /*leser hva som blir clicket*/
    const correctIndex = questions[questionIndex].correctIndex; /*henter riktig svar*/

    const optionButtons = questionE1.querySelectorAll(".quiz-option");

    optionButtons.forEach((btn, idx) => {
        btn.disabled = true;

        /* ved riktig så blir det grønt, CSS*/
        if (idx === correctIndex) {
            btn.classList.add("correct");
        }
        /* ved feil click så blir det rødt , CSS*/
        if (idx === optionIndex && optionIndex != correctIndex) {
            btn.classList.add("incorrect");
        }
    });

    questionE1.classList.add("answered");

    /*hvis svar er riktig så øker summmen*/
    if (optionIndex === correctIndex) {
        score++;
        updateScore();
    }
    /*hvis svar er riktig så øker summmen*/
}

/*oppdaterer poen summen*/
function updateScore() {
    scoreElement.textContent = `poeng: ${score} / ${questions.length}`;
}
/*oppdaterer poen summen*/

/*ved å trykke reset, så refreshes siden så du kan starte på nytt*/
resetButton.addEventListener("click", () => {
    window.location.reload();
});
/*ved å trykke reset, så refreshes siden så du kan starte på nytt*/