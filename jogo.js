var altura = 0;
var largura = 0;
var vidas = 1;
var tempo = 20;
var criaMosquitoTempo = 1500;

var nivel = window.location.search;
nivel = nivel.replace('?', '');

if (nivel === 'normal') {
    criaMosquitoTempo = 1500;
} else if (nivel === 'dificil') {
    criaMosquitoTempo = 1000;
} else if (nivel === 'chucknorris') {
    criaMosquitoTempo = 750;
}

function ajustaTamanhoPalcoJogo() {
    altura = window.innerHeight;
    largura = window.innerWidth;

    console.log(largura, altura);
    // LARGURA ESTÁ NO EIXO X E ALTURA NO EIXO Y;
}

ajustaTamanhoPalcoJogo();

var cronometro = setInterval(function() {

    tempo -= 1;

    if (tempo < 0) {
        clearInterval(cronometro);
        clearInterval(criaMosquito);
        
        window.location.href = 'vitoria.html';
    } else {
        document.getElementById('cronometro').innerHTML = tempo;
    }

}, 1000);

function tamanhoAleatorio() {
    // SOMENTE 3 TAMANHOS DE MOSQUITOS DIFERENTES.
    var classe = Math.floor(Math.random() * 3);
    
    switch(classe) {
        case 0:
            return 'mosquito1';
        case 1:
            return 'mosquito2';
        case 2:
            return 'mosquito3';
    }
}

function ladoAleatorio() {
    // SOMENTE 2 POSICOES DISPONIVEIS: ESQUERDA OU DIREITA.
    var classe = Math.floor(Math.random() * 2);
    
    switch(classe) {
        case 0:
            return 'ladoA';
        case 1:
            return 'ladoB';
    }
}

function posicaoRandomica() {

    // REMOVER O MOSQUITO ANTERIOR (CASO EXISTA):
    if (document.getElementById('mosquito')) {
        document.getElementById('mosquito').remove();

        if (vidas > 3) {
            window.location.href = 'fim_de_jogo.html'
        } else {
            document.getElementById('v' + vidas).src='imagens/coracao_vazio.png';

            vidas++;
        }
    }
    

    var posicaoX = Math.floor(Math.random() * largura) - 90;
    var posicaoY = Math.floor(Math.random() * altura) - 90;

    if (posicaoX < 0) {
        posicaoX = 0;
    }
    if (posicaoY < 0) {
        posicaoY = 0;
    }

    console.log(posicaoX, posicaoY);

    // CRIAR O ELEMENTO HTML:
    var mosquito = document.createElement('img');
    mosquito.src = 'imagens/mosca.png';
    mosquito.className = tamanhoAleatorio() + ' ' + ladoAleatorio();
    mosquito.style.position = 'absolute';
    mosquito.style.left = posicaoX + 'px';
    mosquito.style.top = posicaoY + 'px';
    mosquito.id = 'mosquito';
    mosquito.onclick = function() {
        this.remove();
        // THIS FAZ REFERENCIA AO PROPRIO ELEMENTO QUE EXECUTA A AÇÃO.
    }

    document.body.appendChild(mosquito);

    
    
}
