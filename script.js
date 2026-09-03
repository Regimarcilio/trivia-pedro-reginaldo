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
            <h2>🎯 OPERAÇÃO TRIVIA</h2>
            <p class="subtitulo">◆ Forças Especiais ◆</p>
            <p>Identifique-se, soldado:</p>
            <input type="text" id="nome-jogador" placeholder="Digite seu codinome..." maxlength="30">
            <br>
            <button id="btn-iniciar">INICIAR MISSÃO</button>
        </div>
    `;

    const btnIniciar = document.querySelector('#btn-iniciar');
    const inputNome = document.querySelector('#nome-jogador');

    btnIniciar.addEventListener('click', () => {
        const nome = inputNome.value.trim();
        if (nome === '') {
            alert('⚠️ Identifique-se, soldado!');
            return;
        }
        iniciarTrivia(nome);
    });

    inputNome.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            btnIniciar.click();
        }
    });
};

const iniciarTrivia = async (nomeJogador) => {
    const container = document.querySelector('#question-container');
    const questions = await fetchTrivia();
    let acertos = 0;
    let questaoAtual = 0;

    // Função para mostrar uma questão específica
    const mostrarQuestao = async (indice) => {
        // Limpa o container
        container.innerHTML = '';
        
        // Mostra o nome do jogador e progresso
        const header = document.createElement('div');
        header.className = 'progresso';
        header.innerHTML = `
            <p>👤 ${nomeJogador} | Questão ${indice + 1} de ${questions.length}</p>
        `;
        container.appendChild(header);

        const question = questions[indice];
        
        // Cria a div da questão
        const divQuestao = document.createElement('div');
        divQuestao.className = 'questao';
        
        const perguntaTraduzida = decodeURIComponent(await fetchTradutor(question.question));
        divQuestao.innerHTML = `
            <h3>🎯 MISSÃO ${indice + 1}</h3>
            <p>${perguntaTraduzida}</p>
        `;
        container.appendChild(divQuestao);
        
        // Cria as respostas
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
    
        // Aguarda a resposta do usuário
        await new Promise((resolve) => {
            const botoesResposta = document.querySelectorAll('.respostas button');
            let jaRespondeu = false;
            
            botoesResposta.forEach((botao) => {
                botao.onclick = () => {
                    if (jaRespondeu) return;
                    jaRespondeu = true;
                    
                    if (botao.innerText == respostaTraduzida){
                        botao.style.backgroundColor = '#2d7d2d';
                        botao.style.borderColor = '#3a9a3a';
                        acertos++;
                    } else {
                        botao.style.backgroundColor = '#7d2d2d';
                        botao.style.borderColor = '#9a3a3a';
                        botoesResposta.forEach((bt) => {
                            if (bt.innerText == respostaTraduzida){
                                bt.style.backgroundColor = '#2d7d2d';
                                bt.style.borderColor = '#3a9a3a';
                            }
                        });
                    }
                    
                    // Desabilita todos os botões
                    botoesResposta.forEach((bt) => {
                        bt.disabled = true;
                    });
                    
                    // Avança para a próxima questão após 1.5 segundos
                    setTimeout(() => {
                        resolve();
                    }, 1500);
                }
            });
        });
    };

    // Loop principal - mostra uma questão por vez
    while (questaoAtual < questions.length) {
        await mostrarQuestao(questaoAtual);
        questaoAtual++;
    }

// Tela de resultado final
container.innerHTML = `
    <div id="resultado-final">
        <h2>🏆 MISSÃO CONCLUÍDA 🏆</h2>
        <p>👤 <strong>${nomeJogador}</strong></p>
        <p>🔫 Acertos: <strong>${acertos}</strong> de ${questions.length}</p>

        <p class="mensagem-final">
            ${acertos === questions.length ? '💀 PERFEIÇÃO ABSOLUTA!' : 
              acertos >= questions.length * 0.6 ? '🎯 BOM TRABALHO, SOLDADO!' : 
              '🔰 TREINE MAIS, RECRUTA!'}
        </p>

        <button id="btn-reiniciar">NOVA MISSÃO</button>
        <button id="btn-gabarito">📋 VER GABARITO</button>

        <div id="gabarito" style="display: none;"></div>
    </div>
`;

    // Botão para iniciar uma nova missão
    document.querySelector('#btn-reiniciar')?.addEventListener('click', () => {
        mostrarTelaInicial();
    });

    // Botão para mostrar o gabarito
    document.querySelector('#btn-gabarito')?.addEventListener('click', async () => {

        const gabarito = document.querySelector('#gabarito');

        gabarito.style.display = 'block';

        gabarito.innerHTML = `
            <h2>📋 GABARITO DA MISSÃO</h2>
        `;

        // Percorre todas as questões
        for (let i = 0; i < questions.length; i++) {

            const question = questions[i];

            const perguntaTraduzida = decodeURIComponent(
                await fetchTradutor(question.question)
            );

            const respostaTraduzida = decodeURIComponent(
                await fetchTradutor(question.correct_answer)
            );

            gabarito.innerHTML += `
                <div class="questao-gabarito">
                    <h3>🎯 Questão ${i + 1}</h3>
                    <p>${perguntaTraduzida}</p>
                    <p>
                        ✅ <strong>Resposta correta:</strong>
                        ${respostaTraduzida}
                    </p>
                </div>
            `;
        }

        // Esconde o botão depois que o gabarito for aberto
        document.querySelector('#btn-gabarito').style.display = 'none';
    });
    

    document.querySelector('#btn-reiniciar')?.addEventListener('click', () => {
        mostrarTelaInicial();
    });
}

// Inicia o jogo
mostrarTelaInicial();