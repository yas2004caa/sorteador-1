const nomes = new Set();
let sorteados = [];
function adicionar(){
    const nomeElemento = document.getElementById(&#39;nomeInput&#39;);
    let nome = nomeElemento.value;
    if (nome === &#39;&#39;) {
        alert(&#39;Por favor, digite um nome!&#39;);
        return;
    }
   
    if (nomes.has(nome)) {
        alert(&#39;Este nome já foi adicionado!&#39;);
        return;
    }
   
    //P1 - O nome deverá ser em letra maiúscula
    nome = nome.toUpperCase();
    //P2 - Deverá ser retirado os espaços do nomes
    nome = nome.trim();
    nomes.add(nome);
    atualizarParticipantes();
    habilitarSorteio();
    nomeElemento.value = &#39;&#39;;
    nomeElemento.focus();
}
function remover(nome) {
    //P3 - O nome deverá ser retirado da coleção do tipo SET
    nomes.delete(nome);  
    atualizarParticipantes();
    habilitarSorteio();
}
function atualizarParticipantes() {
    const participantesDiv = document.getElementById(&#39;participantesDiv&#39;);
    const participantesQtd = document.getElementById(&#39;participantesQtd&#39;);
    const excluir = document.getElementById(&#39;excluirParticipantes&#39;);
   
    participantesQtd.textContent = nomes.size;
    if (nomes.size === 0) {
        participantesDiv.innerHTML = &#39;&lt;div class=&quot;vazio&quot;&gt;Nenhum participante adicionado
ainda...&lt;/div&gt;&#39;;
        excluir.style.display = &#39;none&#39;;
    }
    else {
        participantesDiv.innerHTML = &quot;&quot;;
        for (let nome of nomes){
            participantesDiv.innerHTML +=
            `&lt;div class=&quot;participante-item&quot;&gt;
                ${nome}
                &lt;span class=&quot;remove-btn&quot; onclick=&quot;remover(&#39;${nome}&#39;)&quot;&gt;×&lt;/span&gt;
            &lt;/div&gt;`
        }
        excluir.style.display = &#39;inline-block&#39;;
    }
}
function atualizarSorteados() {
    const sorteadosDiv = document.getElementById(&#39;sorteadosDiv&#39;);
    const excluir = document.getElementById(&#39;excluirSorteados&#39;);
   
    participantesQtd.textContent = nomes.size;
    if (sorteados.length === 0) {

       sorteadosDiv.innerHTML = &#39;&lt;div class=&quot;vazio&quot;&gt;Clique em &quot;Sortear&quot; para ver o resultado!&lt;/div&gt;&#39;;
       excluir.style.display = &#39;none&#39;;
    }
    else {
        sorteadosDiv.innerHTML = &quot;&quot;;
       for (let sorteado of sorteados){
           sorteadosDiv.innerHTML +=
            `&lt;div class=&quot;sorteado-item&quot;&gt;
                ${sorteado}                
            &lt;/div&gt;`
        }
        excluir.style.display = &#39;inline-block&#39;;
    }
}
function habilitarSorteio() {
    const sortearButton= document.getElementById(&#39;sortearButton&#39;);
    sortearButton.disabled = nomes.size &lt; 2;
}
function sortear() {
    if (nomes.size &lt; 2) {
        alert(&#39;É necessário pelo menos 2 participantes para fazer o sorteio!&#39;);
        return;
    }
   
    const resultado = document.getElementById(&#39;sorteadosDiv&#39;);
    const excluir = document.getElementById(&#39;excluirSorteados&#39;);
   
    // Animação de sorteio
    resultado.innerHTML = &#39;&lt;div class=&quot;vazio&quot;&gt;Sorteando...&lt;/div&gt;&#39;;
   
    // Simular o sorteio com delay
    setTimeout(() =&gt; {
        const participantesArray =Array.from(nomes);
        const randomIndex = Math.floor(Math.random() * participantesArray.length);
        const vencedor = participantesArray[randomIndex];
        sorteados.push(vencedor)
        resultado.classList.add(&#39;vencedor&#39;);
               
        // Remover a animação após completar
        setTimeout(() =&gt; {
             resultado.classList.remove(&#39;vencedor&#39;);
        }, 1000);
        excluir.style.display = &#39;inline-block&#39;;
        resultado.innerHTML=&quot;&quot;;
        for (let sorteado of sorteados){
           resultado.innerHTML +=
            `&lt;div class=&quot;sorteado-item&quot;&gt;
                ${sorteado}                
            &lt;/div&gt;`
        }
        //P4 - O elemento sorteado deverá ser retirado da coleção SET nomes
        remover(vencedor);
 
    }, 1500);
}
function excluirTodosParticipantes(){
    if (confirm(&#39;Tem certeza que deseja remover todos os participantes?&#39;)) {

        //P5 - Todos os elementos de nomes e de sorteados deverão ser excluídos!
        nomes.clear();
        atualizarParticipantes();
        atualizarSorteados();
        habilitarSorteio();      
    }
}
function excluirTodosSorteados() {
    if (confirm(&#39;Tem certeza que deseja remover todos os Sorteados?&#39;)) {
        //P6 - Todos os elementos de sorteados deverão ser excluídos!
        sorteados = [];
        atualizarSorteados();
        habilitarSorteio();
       
    }
}
