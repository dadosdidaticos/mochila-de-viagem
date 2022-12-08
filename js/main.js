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
    const itens = JSON.parse(localStorage.lista)
    itens.forEach(item => {
        adicionaNovoItem(item.nome,item.quantidade)
    });
}