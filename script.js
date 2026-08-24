/* =====================================================
   MODO CLARO / ESCURO
===================================================== */

const temaBtn = document.getElementById("temaBtn");

temaBtn.addEventListener("click", () => {

    document.body.classList.toggle("light");

    if (document.body.classList.contains("light")) {

        temaBtn.textContent = "☀️";

        localStorage.setItem("tema", "light");

    } else {

        temaBtn.textContent = "🌙";

        localStorage.setItem("tema", "dark");

    }

});


if (localStorage.getItem("tema") === "light") {

    document.body.classList.add("light");

    temaBtn.textContent = "☀️";

}


/* =====================================================
   JOGO DAS EMOÇÕES
===================================================== */

const desafios = [

    {
        emoji: "😊",
        nome: "Alegria",

        opcoes: [
            "Ganhar um presente que você queria muito",
            "Ouvir um barulho assustador",
            "Comer algo estragado",
            "Perder algo importante"
        ],

        correta: 0
    },

    {
        emoji: "😢",
        nome: "Tristeza",

        opcoes: [
            "Ganhar uma competição",
            "Perder alguém ou algo importante",
            "Receber uma notícia muito divertida",
            "Comer seu prato favorito"
        ],

        correta: 1
    },

    {
        emoji: "😡",
        nome: "Raiva",

        opcoes: [
            "Sofrer uma injustiça",
            "Receber um elogio",
            "Assistir a uma comédia",
            "Encontrar um presente"
        ],

        correta: 0
    },

    {
        emoji: "😨",
        nome: "Medo",

        opcoes: [
            "Estar diante de uma situação perigosa",
            "Receber um abraço",
            "Ganhar um jogo",
            "Encontrar um amigo"
        ],

        correta: 0
    },

    {
        emoji: "🤢",
        nome: "Nojo",

        opcoes: [
            "Sentir um cheiro muito desagradável",
            "Ganhar uma medalha",
            "Ouvir uma música",
            "Receber uma mensagem"
        ],

        correta: 0
    },

    {
        emoji: "😰",
        nome: "Ansiedade",

        opcoes: [
            "Ficar preocupado com algo que pode acontecer",
            "Comer seu doce favorito",
            "Receber um presente",
            "Assistir a um filme engraçado"
        ],

        correta: 0
    }

];


let desafioAtual = 0;

let pontosJogo = 0;

let vidas = 3;

let respondeuJogo = false;

let tempo = 30;

let intervalo;


const emojiJogo =
    document.getElementById("emojiJogo");

const nomeEmocao =
    document.getElementById("nomeEmocao");

const opcoesJogo =
    document.getElementById("opcoesJogo");

const mensagemJogo =
    document.getElementById("mensagemJogo");

const pontosElemento =
    document.getElementById("pontos");

const vidasElemento =
    document.getElementById("vidas");

const tempoElemento =
    document.getElementById("tempo");


function carregarDesafio() {

    respondeuJogo = false;

    const desafio =
        desafios[desafioAtual];

    emojiJogo.textContent =
        desafio.emoji;

    nomeEmocao.textContent =
        desafio.nome;

    mensagemJogo.textContent =
        "Escolha uma resposta!";

    opcoesJogo.innerHTML = "";

    desafio.opcoes.forEach(
        (opcao, index) => {

            const botao =
                document.createElement("button");

            botao.className =
                "opcao-jogo";

            botao.textContent =
                opcao;

            botao.addEventListener(
                "click",
                () => responderJogo(
                    index,
                    botao
                )
            );

            opcoesJogo.appendChild(botao);

        }
    );

    iniciarTemporizador();
}


function responderJogo(index, botao) {

    if (respondeuJogo) {
        return;
    }

    respondeuJogo = true;

    clearInterval(intervalo);

    const correta =
        desafios[desafioAtual].correta;

    const botoes =
        document.querySelectorAll(".opcao-jogo");

    if (index === correta) {

        botao.classList.add("certa");

        pontosJogo += 10;

        pontosElemento.textContent =
            pontosJogo;

        mensagemJogo.textContent =
            "🎉 Muito bem! Você acertou!";

    } else {

        botao.classList.add("errada");

        botoes[correta].classList.add("certa");

        vidas--;

        atualizarVidas();

        mensagemJogo.textContent =
            "❌ Quase! A resposta correta está destacada.";

        if (vidas <= 0) {

            mensagemJogo.textContent =
                `💔 Fim de jogo! Você fez ${pontosJogo} pontos.`;

            opcoesJogo.querySelectorAll("button")
                .forEach(
                    botao => botao.disabled = true
                );

            return;
        }
    }
}


function atualizarVidas() {

    vidasElemento.textContent =
        "❤️".repeat(vidas) +
        "🖤".repeat(3 - vidas);
}


function iniciarTemporizador() {

    clearInterval(intervalo);

    tempo = 30;

    tempoElemento.textContent =
        tempo;

    intervalo =
        setInterval(() => {

            tempo--;

            tempoElemento.textContent =
                tempo;

            if (tempo <= 0) {

                clearInterval(intervalo);

                if (!respondeuJogo) {

                    respondeuJogo = true;

                    vidas--;

                    atualizarVidas();

                    mensagemJogo.textContent =
                        "⏰ O tempo acabou!";

                }

            }

        }, 1000);
}


document.getElementById("novoDesafio")
    .addEventListener("click", () => {

        desafioAtual++;

        if (desafioAtual >= desafios.length) {

            desafioAtual = 0;
        }

        carregarDesafio();

    });


carregarDesafio();


/* =====================================================
   CURIOSIDADES
===================================================== */

const curiosidades = [

    {
        emoji: "😊",
        titulo: "As emoções podem trabalhar juntas",

        texto:
            "Uma mesma situação pode provocar várias emoções ao mesmo tempo. É possível sentir alegria e nervosismo, por exemplo."
    },

    {
        emoji: "🧠",
        titulo: "O cérebro processa emoções",

        texto:
            "Diversas regiões do cérebro participam do processamento das emoções e ajudam a interpretar situações."
    },

    {
        emoji: "😨",
        titulo: "O medo pode proteger",

        texto:
            "O medo pode ajudar a perceber perigos e preparar o corpo para reagir diante de uma situação ameaçadora."
    },

    {
        emoji: "😢",
        titulo: "A tristeza também pode ter uma função",

        texto:
            "A tristeza pode sinalizar que precisamos de apoio, descanso ou tempo para lidar com uma situação difícil."
    },

    {
        emoji: "😡",
        titulo: "A raiva pode indicar limites",

        texto:
            "A raiva pode surgir quando sentimos injustiça, frustração ou quando percebemos que nossos limites foram ultrapassados."
    },

    {
        emoji: "🌈",
        titulo: "Não existem emoções 'inúteis'",

        texto:
            "Todas as emoções podem trazer informações sobre como estamos percebendo uma situação."
    }

];


let curiosidadeAtual = 0;

const numeroCuriosidade =
    document.getElementById(
        "numeroCuriosidade"
    );

const iconeCuriosidade =
    document.getElementById(
        "iconeCuriosidade"
    );

const tituloCuriosidade =
    document.getElementById(
        "tituloCuriosidade"
    );

const textoCuriosidade =
    document.getElementById(
        "textoCuriosidade"
    );


function mostrarCuriosidade() {

    const curiosidade =
        curiosidades[curiosidadeAtual];

    numeroCuriosidade.textContent =
        String(curiosidadeAtual + 1)
            .padStart(2, "0");

    iconeCuriosidade.textContent =
        curiosidade.emoji;

    tituloCuriosidade.textContent =
        curiosidade.titulo;

    textoCuriosidade.textContent =
        curiosidade.texto;
}


document.getElementById(
    "proximaCuriosidade"
).addEventListener(
    "click",
    () => {

        curiosidadeAtual++;

        if (
            curiosidadeAtual >=
            curiosidades.length
        ) {

            curiosidadeAtual = 0;

        }

        mostrarCuriosidade();

    }
);


/* =====================================================
   FLASHCARDS
===================================================== */

const flashcards = [

    {
        pergunta: "O que é uma emoção?",

        resposta:
            "É uma resposta que faz parte da nossa experiência diante de situações, pensamentos ou acontecimentos."
    },

    {
        pergunta: "Para que serve o medo?",

        resposta:
            "O medo pode ajudar a identificar perigos e preparar o organismo para reagir."
    },

    {
        pergunta: "A tristeza é sempre ruim?",

        resposta:
            "Não. A tristeza pode fazer parte da vida e indicar que precisamos de apoio ou de tempo para processar uma situação."
    },

    {
        pergunta: "Quando podemos sentir raiva?",

        resposta:
            "A raiva pode aparecer diante de injustiças, frustrações ou quando nossos limites são ultrapassados."
    },

    {
        pergunta: "Podemos sentir várias emoções ao mesmo tempo?",

        resposta:
            "Sim. Uma mesma situação pode provocar diferentes emoções simultaneamente."
    },

    {
        pergunta: "Por que é importante conhecer nossas emoções?",

        resposta:
            "Reconhecer emoções pode ajudar a compreender melhor nossos sentimentos, necessidades e comportamentos."
    }

];


let flashAtual = 0;

const flashcard =
    document.getElementById("flashcard");

const flashNumero =
    document.getElementById("flashNumero");

const flashPergunta =
    document.getElementById("flashPergunta");

const flashResposta =
    document.getElementById("flashResposta");


function mostrarFlashcard() {

    const flash =
        flashcards[flashAtual];

    flashNumero.textContent =
        `${flashAtual + 1} / ${flashcards.length}`;

    flashPergunta.textContent =
        flash.pergunta;

    flashResposta.textContent =
        flash.resposta;

    flashcard.classList.remove(
        "flipped"
    );
}


flashcard.addEventListener(
    "click",
    () => {

        flashcard.classList.toggle(
            "flipped"
        );

    }
);


document.getElementById(
    "flashProximo"
).addEventListener(
    "click",
    () => {

        flashAtual++;

        if (
            flashAtual >=
            flashcards.length
        ) {

            flashAtual = 0;

        }

        mostrarFlashcard();

    }
);


document.getElementById(
    "flashAnterior"
).addEventListener(
    "click",
    () => {

        flashAtual--;

        if (flashAtual < 0) {

            flashAtual =
                flashcards.length - 1;

        }

        mostrarFlashcard();

    }
);


mostrarFlashcard();


/* =====================================================
   QUIZ
===================================================== */

const perguntasQuiz = [

    {
        pergunta:
            "Qual emoção costuma estar relacionada à sensação de perigo?",

        alternativas: [
            "Alegria",
            "Medo",
            "Nojo",
            "Orgulho"
        ],

        correta: 1
    },

    {
        pergunta:
            "Qual situação pode provocar alegria?",

        alternativas: [
            "Receber uma boa notícia",
            "Perder algo importante",
            "Estar diante de um perigo",
            "Sentir um cheiro desagradável"
        ],

        correta: 0
    },

    {
        pergunta:
            "Qual emoção pode surgir diante de uma injustiça?",

        alternativas: [
            "Raiva",
            "Alegria",
            "Sono",
            "Surpresa"
        ],

        correta: 0
    },

    {
        pergunta:
            "Qual dessas afirmações é verdadeira?",

        alternativas: [
            "Só podemos sentir uma emoção por vez",
            "As emoções nunca mudam",
            "Podemos sentir várias emoções ao mesmo tempo",
            "Emoções não influenciam nosso comportamento"
        ],

        correta: 2
    },

    {
        pergunta:
            "O que pode ajudar a lidar melhor com as emoções?",

        alternativas: [
            "Ignorar tudo que sentimos",
            "Reconhecer e compreender nossos sentimentos",
            "Nunca conversar com ninguém",
            "Evitar qualquer situação nova"
        ],

        correta: 1
    },

    {
        pergunta:
            "Qual emoção pode estar relacionada a algo que consideramos desagradável?",

        alternativas: [
            "Nojo",
            "Alegria",
            "Orgulho",
            "Esperança"
        ],

        correta: 0
    }

];


let perguntaAtual = 0;

let pontosQuiz = 0;

let respondeuQuiz = false;


const perguntaElemento =
    document.getElementById(
        "perguntaQuiz"
    );

const alternativasElemento =
    document.getElementById(
        "alternativasQuiz"
    );

const feedback =
    document.getElementById(
        "feedbackQuiz"
    );

const questaoNumero =
    document.getElementById(
        "questaoNumero"
    );

const quizPontos =
    document.getElementById(
        "quizPontos"
    );

const barraProgresso =
    document.getElementById(
        "barraProgresso"
    );

const quizContainer =
    document.getElementById(
        "quizContainer"
    );

const resultadoQuiz =
    document.getElementById(
        "resultadoQuiz"
    );

const textoResultado =
    document.getElementById(
        "textoResultado"
    );

const porcentagem =
    document.getElementById(
        "porcentagem"
    );


function carregarPergunta() {

    respondeuQuiz = false;

    const pergunta =
        perguntasQuiz[perguntaAtual];

    perguntaElemento.textContent =
        pergunta.pergunta;

    questaoNumero.textContent =
        `Questão ${perguntaAtual + 1} de ${perguntasQuiz.length}`;

    quizPontos.textContent =
        pontosQuiz;

    barraProgresso.style.width =
        `${((perguntaAtual + 1) / perguntasQuiz.length) * 100}%`;

    feedback.textContent = "";

    alternativasElemento.innerHTML = "";

    pergunta.alternativas.forEach(
        (alternativa, index) => {

            const botao =
                document.createElement("button");

            botao.className =
                "alternativa";

            botao.textContent =
                alternativa;

            botao.addEventListener(
                "click",
                () => responderQuiz(
                    index,
                    botao
                )
            );

            alternativasElemento
                .appendChild(botao);

        }
    );
}


function responderQuiz(index, botao) {

    if (respondeuQuiz) {
        return;
    }

    respondeuQuiz = true;

    const correta =
        perguntasQuiz[
            perguntaAtual
        ].correta;

    const botoes =
        document.querySelectorAll(
            ".alternativa"
        );

    if (index === correta) {

        botao.classList.add(
            "certa"
        );

        pontosQuiz++;

        quizPontos.textContent =
            pontosQuiz;

        feedback.textContent =
            "🎉 Resposta correta!";

        feedback.style.color =
            "#4dd58a";

    } else {

        botao.classList.add(
            "errada"
        );

        botoes[correta]
            .classList.add("certa");

        feedback.textContent =
            "❌ Não foi dessa vez!";

        feedback.style.color =
            "#ff5252";
    }
}


document.getElementById(
    "proximaPergunta"
).addEventListener(
    "click",
    () => {

        if (!respondeuQuiz) {

            alert(
                "Escolha uma alternativa primeiro!"
            );

            return;
        }

        perguntaAtual++;

        if (
            perguntaAtual >=
            perguntasQuiz.length
        ) {

            finalizarQuiz();

            return;

        }

        carregarPergunta();

    }
);


function finalizarQuiz() {

    quizContainer.classList.add(
        "hidden"
    );

    resultadoQuiz.classList.remove(
        "hidden"
    );

    const porcentagemFinal =
        Math.round(
            (pontosQuiz /
                perguntasQuiz.length) *
            100
        );

    porcentagem.textContent =
        `${porcentagemFinal}%`;

    textoResultado.textContent =
        `Você acertou ${pontosQuiz} de ${perguntasQuiz.length} perguntas.`;

}


document.getElementById(
    "reiniciarQuiz"
).addEventListener(
    "click",
    () => {

        perguntaAtual = 0;

        pontosQuiz = 0;

        quizContainer.classList.remove(
            "hidden"
        );

        resultadoQuiz.classList.add(
            "hidden"
        );

        carregarPergunta();

    }
);


carregarPergunta();


/* =====================================================
   ANIMAÇÃO AO ROLAR
===================================================== */

const elementos =
    document.querySelectorAll(
        ".emocao-card, .game, .curiosidade, .flashcard, .quiz-container"
    );


const observador =
    new IntersectionObserver(
        (entradas) => {

            entradas.forEach(
                entrada => {

                    if (
                        entrada.isIntersecting
                    ) {

                        entrada.target.style.opacity =
                            "1";

                        entrada.target.style.transform =
                            "translateY(0)";

                    }

                }
            );

        },
        {
            threshold: 0.1
        }
    );


elementos.forEach(
    elemento => {

        elemento.style.opacity =
            "0";

        elemento.style.transform =
            "translateY(25px)";

        elemento.style.transition =
            "opacity .7s ease, transform .7s ease";

        observador.observe(
            elemento
        );

    }
);
