# 🎯 Operação Trivia

Um jogo de perguntas e respostas desenvolvido em **HTML, CSS e JavaScript**, utilizando uma API externa para obter questões de trivia.

O projeto foi desenvolvido como atividade acadêmica para praticar conceitos de desenvolvimento web, manipulação do DOM, eventos, funções assíncronas e consumo de APIs.

## 🕹️ Sobre o projeto

Na **Operação Trivia**, o jogador deve informar um codinome e iniciar uma sequência de perguntas.

Durante a missão, o jogador recebe perguntas com alternativas de múltipla escolha. Após selecionar uma resposta, o sistema informa visualmente se a escolha está correta ou incorreta e, ao final, apresenta o resultado da partida.

O projeto também conta com uma área de **gabarito**, permitindo consultar as questões, a resposta escolhida pelo jogador e a resposta correta.

## ✨ Funcionalidades

* 👤 Identificação do jogador através de um codinome;
* 🎯 Perguntas de múltipla escolha;
* 🔀 Alternativas apresentadas em ordem aleatória;
* 🌐 Consumo de questões através de uma API externa;
* 🇧🇷 Tradução das perguntas e alternativas para português;
* ✅ Indicação visual da resposta correta;
* ❌ Indicação visual da resposta incorreta;
* 📊 Contagem de acertos;
* 🏆 Tela de resultado ao finalizar a missão;
* 📋 Consulta do gabarito completo;
* 🔄 Possibilidade de iniciar uma nova missão;
* ⌨️ Possibilidade de iniciar a partida pressionando `Enter`.

## 🛠️ Tecnologias utilizadas

* **HTML5** — estrutura da aplicação;
* **CSS3** — estilização e identidade visual;
* **JavaScript** — lógica, interatividade e manipulação do DOM;
* **Fetch API** — comunicação com APIs externas;
* **Open Trivia Database (OpenTDB)** — fornecimento das perguntas;
* **Google Translate API endpoint** — tradução das perguntas e alternativas.

## 📁 Estrutura do projeto

```text
trivia-pedro-reginaldo/
│
├── index.html      # Estrutura da página
├── style.css       # Estilos e identidade visual
├── script.js       # Lógica e funcionamento do jogo
└── README.md       # Documentação do projeto
```

## 🚀 Como executar

Não é necessário instalar dependências ou utilizar um servidor backend.

### 1. Clone o repositório

```bash
git clone https://github.com/logoeupedro/trivia-pedro-reginaldo.git
```

### 2. Acesse a pasta

```bash
cd trivia-pedro-reginaldo
```

### 3. Execute o projeto

Abra o arquivo `index.html` em um navegador.

Também é possível utilizar uma extensão como **Live Server** no Visual Studio Code para executar o projeto localmente.

## 🎮 Como jogar

1. Digite seu codinome;
2. Clique em **INICIAR MISSÃO**;
3. Leia a pergunta apresentada;
4. Escolha uma das alternativas;
5. Aguarde o sistema indicar o resultado;
6. Continue até completar todas as questões;
7. Confira sua pontuação na tela final;
8. Utilize **VER GABARITO** para revisar suas respostas;
9. Clique em **NOVA MISSÃO** para jogar novamente.

## 🔌 APIs

As perguntas são obtidas através da **Open Trivia Database (OpenTDB)**.

A aplicação também utiliza um endpoint de tradução para apresentar as perguntas e alternativas em português.

## 🎓 Objetivo acadêmico

Este projeto tem como objetivo colocar em prática conhecimentos fundamentais de desenvolvimento web, especialmente:

* Manipulação de elementos HTML através do JavaScript;
* Eventos e interações com o usuário;
* Funções assíncronas;
* `async/await`;
* Consumo de APIs utilizando `fetch()`;
* Manipulação de arrays;
* Estruturas condicionais e de repetição;
* Atualização dinâmica do conteúdo da página;
* Organização de uma aplicação web utilizando HTML, CSS e JavaScript.

## 👨‍💻 Autores

**Pedro & Reginaldo**

Projeto desenvolvido para fins acadêmicos.
