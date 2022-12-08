const form = document.getElementById('form');
const divForm = document.querySelector('.principal')
const lista = document.querySelector('.lista')
const itens = []
recuperarItens()
form.addEventListener('submit',(e)=>{
    e.preventDefault()
    const nome = e.target.elements['nome']
    const quantidade = e.target.elements['quantidade']
    adicionaNovoItem(nome.value,quantidade.value)
    nome.value = ""
    quantidade.value = ""
});

function adicionaNovoItem (nome,quantidade) {
    if (!nome || !quantidade){
        if(document.querySelector('.message')){
            form.removeChild(document.querySelector('.message'))
        }
        const message = document.createElement('p')
        message.setAttribute('class','message')
        message.textContent = "Todos os campos devem ser preenchidos"
        form.appendChild(message)
    } else {
        if(document.querySelector('.message')){
            form.removeChild(document.querySelector('.message'))
        }

            const novoItem = document.createElement('li')
            novoItem.classList.add('item')
            novoItem.innerHTML = `<strong>${quantidade}</strong>${nome}`
            lista.appendChild(novoItem)
            const item = {
                nome:nome,
                quantidade:quantidade
            }
            itens.push(item)
        localStorage.setItem("lista",JSON.stringify(itens))  
    }
}

function recuperarItens(){
    if(localStorage.lista!==undefined){
        const itens = JSON.parse(localStorage.lista)
        itens.forEach(item => {
            adicionaNovoItem(item.nome,item.quantidade)
        });
    }
}

function verificarEAtualizarItem(nomeNovoItem,quantidadeNovoItem) {
    const listaItens = document.querySelectorAll('.item')
    if (listaItens && localStorage.lista!==undefined){
        const itensSalvos = JSON.parse(localStorage.lista)
        for (let i = 0; i < itensSalvos.length; i++) {
            const item = itensSalvos[i];
            let quantidade = parseInt(quantidadeNovoItem)
            if(nomeNovoItem===item.nome){
                quantidade += parseInt(quantidadeNovoItem)
                itensSalvos[i].quantidade = quantidade
            }  
            listaItens.forEach(item => {
                let nome = item.innerText.split('\n')[1]
                let quantidade = parseInt(item.innerText.split('\n')[0])
                //atualizando a tela
                if(nomeNovoItem === nome){
                    quantidade += parseInt(quantidadeNovoItem)
                    item.innerHTML = `<strong>${quantidade}</strong>${nome}`
                }
            });
        }
        localStorage.setItem("lista",JSON.stringify(itensSalvos))
    }
}