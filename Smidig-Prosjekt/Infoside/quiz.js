const questions = [
    {
        question: "Hva er akseptpris?",
        options: [
            "Den laveste prisen en kjøper vil godta",
            "Løsning som sikrer at dine penger er sikre",
            "Anbefalte kjøpspris av megler",
        ],
        correctIndex: 0
    },

    {
        question: "Hva kjennetegner et annuitetslån?",
        options: [
            "At du betaler mindre hver måned",
            "Betaling av samme beløp hver måned",
            "En satt periode du har på deg for å betale tilbake",
        ],
        correctIndex: 1
    },
    {
        question: "Hva er egenkapital?",
        options: [
            "Penger du låner",
            "Penger du har",
            "Totale summen av alle lånene dine",
        ],
        correctIndex: 1
    },

    {
        question: "Hva viser et forbrukslån?",
        options: [
            "Et lån du kan få for å kjøpe bolig",
            "Et lån av penger uten sikkerhet",
            "Kostnader itillegg til lånet du tar",
        ],
        correctIndex: 1
    },

    {
        question: "Hva er et serielån?",
        options: [
            "Penger du låner av andre, ved å skrive under et dokument",
            "Et lån der du betaler samme beløp hver måned",
            "Et lån der du betaler mindre hver måned",
        ],
        correctIndex: 2
    },

    {
        question: "hva er gjeld?",
        options: [
            "Penger du skylder",
            "Penger i din konto",
            "Penger du låner bort",
        ],
        correctIndex: 0
    },

    {
        question: "Hva er nominell rente",
        options: [
            "Renten bare øker, synker ikke",
            "Renter uten gebyrer",
            "Renter du må betale på lånet ditt",
        ],
        correctIndex: 2
    },

    {
        question: "hva er en nedbetaligsplan?",
        options: [
            "Totale summen av hva du skylder",
            "En oversikt over dine regninger",
            "plan som viser hvor mye du må betale og hvor lang tid det vil ta",
        ],
        correctIndex: 2
    },

    {
        question: "Hva vil det si at du har fått en faktura?",
        options: [
            "Dokument som viser hva du må betale",
            "Kostnader for å drive en bedrift",
            "Et brev du for når du ikke har betalt det du skylder",
        ],
        correctIndex: 0
    },

    {
        question: "Hva er betydninger av kausjon?",
        options: [
            "At noen lover å betale for deg, dersom du ikke kan betale",
            "Oversikt over banken du er knyttet til",
            "Liste over dine regninger",
        ],
        correctIndex: 0
    },
];

const quizContainer = document.getElementById("quiz");
const scoreElement = document.getElementById("quiz-score");
const resetButton = document.getElementById("reset-quiz");

let score = 0;

questions.forEach((q, qIndex) => {
    const questionE1 = document.createElement("article");
    questionE1.className = "quiz-question";

    const title = document.createElement("h3");
    title.textContent = `spørsmål ${qIndex + 1}`;
    questionE1.appendChild(title);

    const text = document.createElement("p");
    text.className = "quiz-question-text";
    text.textContent = q.question;
    questionE1.appendChild(text);

    const optionsContainer = document.createElement("div");
    optionsContainer.className = "quiz-options";

    q.options.forEach((optionText, optionIndex) => {
        const button = document.createElement("button");
        button.className = "quiz-option";
        button.textContent = optionText; /* DENNE SLØSTE MASSE TID, HADDE OPTIONINDEX, SOM DA VISTE TALL OG IKKE SPØRSMÅL */
        button.dataset.questionIndex = qIndex.toString();
        button.dataset.optionIndex = optionIndex.toString();

        button.addEventListener("click", handleAnswerClick);

        optionsContainer.appendChild(button);
    });

    questionE1.appendChild(optionsContainer);
    quizContainer.appendChild(questionE1);
});

function handleAnswerClick(event) {
    const button = event.currentTarget;
    const questionE1 = button.closest(".quiz-question");

    if (questionE1.classList.contains("answered")) return;

    const questionIndex = Number(button.dataset.questionIndex);
    const optionIndex = Number(button.dataset.optionIndex);
    const correctIndex = questions[questionIndex].correctIndex;

    const optionButtons = questionE1.querySelectorAll(".quiz-option");

    optionButtons.forEach((btn, idx) => {
        btn.disabled = true;

        if (idx === correctIndex) {
            btn.classList.add("correct");
        }

        if (idx === optionIndex && optionIndex != correctIndex) {
            btn.classList.add("incorrect");
        }
    });

    questionE1.classList.add("answered");

    if (optionIndex === correctIndex) {
        score++;
        updateScore();
    }
}

function updateScore() {
    scoreElement.textContent = `poeng: ${score} / ${questions.length}`;
}

resetButton.addEventListener("click", () => {
    window.location.reload();
});
