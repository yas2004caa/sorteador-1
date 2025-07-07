const nomes = new Set();
let  sorteados = [];

function adicionar(){
    const nomeElemento = document.getElementById('nomeInput');
    const nome = nomeElemento.value;

    if (nome === '') {
        alert('Por favor, digite um nome!');
        return;
    }
    
    if (nomes.has(nome)) {
        alert('Este nome já foi adicionado!');
        return;
    }
    
    //P1 - O nome deverá ser em letra maiúscula
    //P2 - Deverá ser retirado os espaços do nomes
    nomes.add(nome);
    atualizarParticipantes();
    habilitarSorteio();
    nomeElemento.value = '';
    nomeElemento.focus();
}

function remover(nome) {
    //P3 - O nome deverá ser retirado da coleção do tipo SET  
    atualizarParticipantes();
    habilitarSorteio();
}

function atualizarParticipantes() {
    const participantesDiv = document.getElementById('participantesDiv');
    const participantesQtd = document.getElementById('participantesQtd');
    const excluir = document.getElementById('excluirParticipantes');
    
    participantesQtd.textContent = nomes.size;
    if (nomes.size === 0) {
        participantesDiv.innerHTML = '<div class="vazio">Nenhum participante adicionado ainda...</div>';
        excluir.style.display = 'none';
    } 
    else {
        participantesDiv.innerHTML = "";
        for (let nome of nomes){
            participantesDiv.innerHTML += 
            `<div class="participante-item">
                ${nome}
                <span class="remove-btn" onclick="remover('${nome}')">×</span>
            </div>`
        }
        excluir.style.display = 'inline-block';
    }
}

function atualizarSorteados() {
    const sorteadosDiv = document.getElementById('sorteadosDiv');
    const excluir = document.getElementById('excluirSorteados');
    
    participantesQtd.textContent = nomes.size;
    if (sorteados.length === 0) {

       sorteadosDiv.innerHTML = '<div class="vazio">Clique em "Sortear" para ver o resultado!</div>';
       excluir.style.display = 'none';
    } 
    else {
        sorteadosDiv.innerHTML = "";
       for (let sorteado of sorteados){
           resultado.innerHTML += 
            `<div class="sorteado-item">
                ${sorteado}                
            </div>`
        }
        excluir.style.display = 'inline-block';
    }
}


function habilitarSorteio() {
    const sortearButton= document.getElementById('sortearButton');
    sortearButton.disabled = nomes.size < 2;
}

function sortear() {
    if (nomes.size < 2) {
        alert('É necessário pelo menos 2 participantes para fazer o sorteio!');
        return;
    }
    
    const resultado = document.getElementById('sorteadosDiv');
    const excluir = document.getElementById('excluirSorteados');
    
    // Animação de sorteio
    resultado.innerHTML = '<div class="vazio">Sorteando...</div>';
    
    // Simular o sorteio com delay
    setTimeout(() => {
        const participantesArray =Array.from(nomes);
        const randomIndex = Math.floor(Math.random() * participantesArray.length);
        const vencedor = participantesArray[randomIndex];
        sorteados.push(vencedor)
        resultado.classList.add('vencedor');
                
        // Remover a animação após completar
        setTimeout(() => {
             resultado.classList.remove('vencedor');
        }, 1000);
        excluir.style.display = 'inline-block';

        resultado.innerHTML="";
        for (let sorteado of sorteados){
           resultado.innerHTML += 
            `<div class="sorteado-item">
                ${sorteado}                
            </div>`
        }

        //P4 - O elemento sorteado deverá ser retirado da coleção SET nomes
  

    }, 1500);


}

function excluirTodosParticipantes(){
    if (confirm('Tem certeza que deseja remover todos os participantes?')) {
        //P5 - Todos os elementos de nomes e de sorteados deverão ser excluídos!

        atualizarParticipantes();
        atualizarSorteados();
        habilitarSorteio();      
    }
}

function excluirTodosSorteados() {
    if (confirm('Tem certeza que deseja remover todos os Sorteados?')) {
        //P6 - Todos os elementos de sorteados deverão ser excluídos!

        atualizarSorteados();
        habilitarSorteio();
        
    }
}
