const campoNovaTarefa = document.getElementById("campo-nova-tarefa");
const botaoAdicionar = document.getElementById("btn-adicionar");
const msg = document.getElementById("msg");


const listaAFazer = document.getElementById("lista-afazer");
const listaFazendo = document.getElementById("lista-fazendo");
const listaFeito = document.getElementById("lista-feito");

const contadorAfazer = document.getElementById("contador-afazer");
const contadorFazendo = document.getElementById("contador-fazendo");
const contadorFeito = document.getElementById("contador-feito");

/* botaoAdicionar.addEventListener('click', function(){
    adicionarTarefa();
});
 */

/* botaoAdicionar.onclick = ()=>{
    adicionarTarefa();
} */

function adicionarTarefa(){
    let texto = campoNovaTarefa.value;
    if(texto.trim() === ""){
        msg.textContent = "Digite uma tarefa primeiro!";
        msg.style.color = "red";
        msg.style.fontWeight = "bold";
        return;
    }
    let cartao = criarCartaoTarefa(texto);
    listaAFazer.appendChild(cartao);

    campoNovaTarefa.value = "";
}


function criarCartaoTarefa(texto){
    let tarefa = document.createElement("div");
    tarefa.className = "tarefa";

    tarefa.innerHTML = `
        <span class="texto">${texto}</span>
        <div class="acoes">
            <button class="btn-voltar">Voltar</button>
            <button class="btn-avancar">Avançar</button>
            <button class="btn-excluir">Excluir</button>
        </div>
    `;

    let botaoVoltar = tarefa.querySelector(".btn-voltar");
    botaoVoltar.addEventListener("click", ()=>{
        moverTarefa(tarefa, "voltar");
    });

    let botaoAvancar = tarefa.querySelector(".btn-avancar");
    botaoAvancar.addEventListener("click", ()=>{
        moverTarefa(tarefa, "avancar");
    });


    let botaoExcluir = tarefa.querySelector(".btn-excluir");
    botaoExcluir.addEventListener('click', ()=>{ 
        excluirTarefa(tarefa);
    });

    return tarefa;
}

function moverTarefa(tarefa, direcao){
    let listaAtual = tarefa.parentElement;

    if(direcao === "avancar"){
        if(listaAtual === listaAFazer){
            listaFazendo.appendChild(tarefa);
        }

        else if(listaAtual === listaFazendo){
            listaFeito.appendChild(tarefa);
        }
        
    }

    if(direcao === "voltar"){
        if(listaAtual === listaFeito){
            listaFazendo.appendChild(tarefa);
        }

        else if(listaAtual === listaFazendo){
            listaAFazer.appendChild(tarefa);
        }
    }

    atualizarContador();
}


function excluirTarefa(tarefa){
    let confirmou = confirm("Tem certeza que quer excluir está tarefa?");
    if(confirmou){
        tarefa.remove();
        atualizarContador()
    }
}

function atualizarContador(){
    contadorAfazer.textContent = listaAFazer.children.length;
    contadorFazendo.textContent = listaFazendo.children.length;
    contadorFeito.textContent = listaFeito.children.length;
}