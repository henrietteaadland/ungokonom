const questions = [
    {
        question: "Hva er akseptpris?",
        options: [
            "s",
            "s",
            "s",
        ],
        correctIndex: 0
    },

    {
        question: "hva kjennetegner et annuitetslån?",
        options: [
            "s",
            "s",
            "s",
        ],
        correctIndex: 1
    },
    {
        question: "hva er egenkapital?",
        options: [
            " ",
            " ",
            " ",
        ],
        correctIndex: 1
    },

    {
        question: "hva viser et forbrukslån?",
        options: [
            " ",
            " ",
            " ",
        ],
        correctIndex: 1
    },

    {
        question: "hva betyr fastrente?",
        options: [
            " ",
            " ",
            " ",
        ],
        correctIndex: 1
    },

    {
        question: "hva er gjeld?",
        options: [
            " ",
            " ",
            " ",
        ],
        correctIndex: 1
    },

    {
        question: "hva er en nedbetaligsplan?",
        options: [
            " ",
            " ",
            " ",
        ],
        correctIndex: 1
    },

    {
        question: "hva er en nedbetaligsplan?",
        options: [
            " ",
            " ",
            " ",
        ],
        correctIndex: 1
    },

    {
        question: "hva er en nedbetaligsplan?",
        options: [
            " ",
            " ",
            " ",
        ],
        correctIndex: 1
    },

    {
        question: "hva er en nedbetaligsplan?",
        options: [
            " ",
            " ",
            " ",
        ],
        correctIndex: 1
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
        button.textContent = optionIndex;
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
