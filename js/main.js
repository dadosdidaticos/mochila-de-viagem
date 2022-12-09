const form = document.getElementById('form');
const divForm = document.querySelector('.principal')
const lista = document.querySelector('.lista')
let itens =  JSON.parse(localStorage.getItem('lista')) || []
recuperarItens()
form.addEventListener('submit',(e)=>{
    e.preventDefault()
    const nome = e.target.elements['nome']
    const quantidade = e.target.elements['quantidade']
    const novoItem = verificarEAtualizarItem(nome.value,quantidade.value)
    nome.value = ""
    quantidade.value = ""
    if (novoItem){
        itens.push(novoItem)
        localStorage.setItem("lista",JSON.stringify(itens))  
    }
});

function adicionaNovoItem (nome,quantidade,idExistente=undefined) {
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
        //const nodeListItens = document.querySelectorAll('.item')
        //const id = nodeListItens.length>0 ? parseInt(nodeListItens[nodeListItens.length-1].dataset.id)+1 : 0
        const id = idExistente || (itens.length>0 ? parseInt(itens[itens.length-1].id)+1 : 0)
        const novoItem = document.createElement('li')
        novoItem.classList.add('item')
        novoItem.innerHTML = `<strong>${quantidade}</strong>${nome}`
        novoItem.dataset.id = id
        novoItem.appendChild(criaBotaoExcluir())
        lista.appendChild(novoItem)
        const item = {
            nome:nome,
            quantidade:quantidade,
            id:id
        }
        return item
    }
}

function recuperarItens(){
        itens.forEach(item => {
            adicionaNovoItem(item.nome,item.quantidade,item.id)
        });
}

function verificarEAtualizarItem(nome,quantidade) {
    const itemExistente = itens.find(elemento => elemento.nome === nome);
    if(itemExistente) {
        const quantidadeAtual = itemExistente.quantidade
        const quantidadeNova = parseInt(quantidadeAtual)+parseInt(quantidade)
        itemExistente.quantidade = quantidadeNova
        localStorage.setItem("lista",JSON.stringify(itens))
        const elemento = document.querySelector(`[data-id='${itemExistente.id}']`)
        elemento.innerHTML=`<strong>${quantidadeNova}</strong>${nome}`
        elemento.appendChild(criaBotaoExcluir())
    }else{
        return adicionaNovoItem(nome,quantidade)
    }
}

function criaBotaoExcluir() {
    const botaoExcluir = document.createElement('button')
    botaoExcluir.innerText = "X"
    botaoExcluir.addEventListener('click',function (){
        const novosItens = itens.filter(elemento => elemento.id!==parseInt(this.parentNode.dataset.id))
        localStorage.setItem("lista",JSON.stringify(novosItens))
        this.parentNode.remove()
    })
    return botaoExcluir
}
