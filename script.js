const fetchTrivia = async (endpoint='', qtd=5) => {
    try {
        const url = `https://opentdb.com/api.php?amount=6&category=15&type=multiple${endpoint}`;
        let resultado = await fetch(url);
        resultado = await resultado.json();

        return resultado.results;
    } catch (e) {
        console.error(e.message)
    }
};

const fetchTradutor = async (texto) => {
    try {
        const url = `https://clients5.google.com/translate_a/t?client=dict-chrome-ex&sl=auto&tl=pt-BR&q=${encodeURIComponent(texto)}`;
        let resultado = await fetch(url);
        resultado = await resultado.json();

        return resultado[0][0];
    } catch (e) {
        console.error(e.message);
    }
}

const mostrarTelaInicial = () => {
    const container = document.querySelector('#question-container');
    container.innerHTML = `
        <div id="tela-inicial">
            <h2>Bem-vindo à Trivia!</h2>
            <p>Digite seu nome para começar:</p>
            <input type="text" id="nome-jogador" placeholder="Seu nome aqui..." maxlength="30">
            <br>
            <button id="btn-iniciar">Iniciar Jogo</button>
        </div>
    `;

    const btnIniciar = document.querySelector('#btn-iniciar');
    const inputNome = document.querySelector('#nome-jogador');

    btnIniciar.addEventListener('click', () => {
        const nome = inputNome.value.trim();
        if (nome === '') {
            alert('Por favor, digite seu nome!');
            return;
        }
        mostrarQuestoes(nome);
    });

    // Permitir pressionar Enter para iniciar
    inputNome.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            btnIniciar.click();
        }
    });
};

const mostrarQuestoes = async (nomeJogador) => {
    const container = document.querySelector('#question-container');
    container.innerHTML = `<p>Jogador: <strong>${nomeJogador}</strong></p>`;
    
    const questions = await fetchTrivia();
    let acertos = 0;
    let numeroQuestao = 1;
    
    for (const question of questions){
        const divQuestao = document.createElement('div');
        divQuestao.className = 'questao';
        divQuestao.innerHTML = `
            <h3>Questão ${numeroQuestao} de ${questions.length}</h3>
            <p>${decodeURIComponent(await fetchTradutor(question.question))}</p>
        `;
        container.appendChild(divQuestao);
        
        const divResposta = document.createElement('div');
        divResposta.className = 'respostas';
        
        const respostas = [...question.incorrect_answers, question.correct_answer];
        respostas.sort((a, b) => Math.random() - 0.5);
    
        for (const resposta of respostas){
            const botaoResposta = document.createElement('button');
            botaoResposta.innerText = decodeURIComponent(await fetchTradutor(resposta));
            divResposta.appendChild(botaoResposta);
        }
    
        container.appendChild(divResposta);
    
        const respostaTraduzida = decodeURIComponent(await fetchTradutor(question.correct_answer));
    
        await new Promise((resolve) => {
            const botoesResposta = document.querySelectorAll('.respostas button');
            botoesResposta.forEach((botao) => {
                botao.onclick = () => {
                    if (botao.innerText == respostaTraduzida){
                        botao.style.backgroundColor = 'green';
                        acertos++;
                    } else {
                        botao.style.backgroundColor = 'red';
                        botoesResposta.forEach((bt) => {
                            if (bt.innerText == respostaTraduzida){
                                bt.style.backgroundColor = 'green';
                            }
                        });
                    }
                    // Desabilitar todos os botões após clicar
                    botoesResposta.forEach((bt) => {
                        bt.disabled = true;
                    });
                    
                    setTimeout(() => {
                        resolve();
                    }, 1000)
                }
            });
        });
        
        numeroQuestao++;
    }

    container.innerHTML = `
        <div id="resultado-final">
            <h2>🎉 Fim de Jogo! 🎉</h2>
            <p>Jogador: <strong>${nomeJogador}</strong></p>
            <p>Você acertou <strong>${acertos}</strong> de ${questions.length} questões!</p>
            <p>${acertos === questions.length ? '🏆 Parabéns, você é um gênio!' : '👏 Continue praticando!'}</p>
            <button id="btn-reiniciar">Jogar Novamente</button>
        </div>
    `;

    document.querySelector('#btn-reiniciar')?.addEventListener('click', () => {
        mostrarTelaInicial();
    });
}

// Iniciar o jogo com a tela inicial
mostrarTelaInicial();