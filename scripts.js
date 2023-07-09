// Logica para navegação da pagina web ======================
const btnCadastro = document.querySelector('#btnCadastro')
const btnBusca = document.querySelector('#btnBusca')

btnCadastro.addEventListener('click', () => {
    window.scrollBy({ top: 1.1 * window.innerHeight, behavior: "smooth" })
})

btnBusca.addEventListener('click', () => {
    window.scrollBy({ top: 10 * window.innerHeight, behavior: "smooth" })
})
// ==========================================================


// Função para adicionar um novo livro com nome, genero, quantidade e valor 
const newItem = () => {
    let inputBook = document.getElementById("newInput").value;
    let inputGender = document.getElementById("newGender").value;
    let inputQuantity = document.getElementById("newQuantity").value;
    let inputPrice = document.getElementById("newPrice").value;

    if (inputBook === '') {
        alert("Escreva o nome de um livro!");
    }
    else if (inputGender === '') {
        alert("Escreva o genero do livro!")
    }
    else if (isNaN(inputQuantity) || isNaN(inputPrice)) {
        alert("Quantidade e valor precisam ser números!");
    } else {
        insertList(inputBook, inputGender, inputQuantity, inputPrice)
        postItem(inputBook, inputGender, inputQuantity, inputPrice)
        alert("Livro adicionado!")
    }
}
// ==========================================================


// Função para consultar um novo livro pelo nome
const searchItem = () => {
    let inputBookRequired = document.getElementById("inputRequired").value;

    if (inputBookRequired === '') {
        alert("Escreva o nome do livro buscado!");
    } else {
        getBookRequired(inputBookRequired)
    }
}
// ==========================================================


// Função para obter a lista existente do servidor via requisição GET
const getList = async () => {
    let url = 'http://127.0.0.1:5000/buscar_livros';
    fetch(url, {
        method: 'get',
    })
        .then((response) => response.json())
        .then((data) => {
            data.livros.forEach(item => insertList(item.nome, item.genero, item.quantidade, item.valor))
        })
        .catch((error) => {
            console.error('Error:', error);
        });
}
// ==========================================================


// Chamada da função para carregamento inicial dos dados
getList()
// ==========================================================


// Função para inserir livros na lista apresentada
const insertList = (nameBook, gender, quantity, price) => {
    var item = [nameBook, gender, quantity, price]
    var table = document.getElementById('myTable');
    var row = table.insertRow();

    for (var i = 0; i < item.length; i++) {
        var cel = row.insertCell(i);
        cel.textContent = item[i];
    }
    insertButton(row.insertCell(-1))
    document.getElementById("newInput").value = "";
    document.getElementById("newGender").value = "";
    document.getElementById("newQuantity").value = "";
    document.getElementById("newPrice").value = "";

    removeElement()
}
// ==========================================================


// Função para consultar um livro da lista de livros
const getBookRequired = async (item) => {
    let url = 'http://127.0.0.1:5000/buscar_livro_id?nome=' + item;
    fetch(url, {
        method: 'get',
    })
        .then((response) => {
            if (!response.ok) {
                throw new Error('Livro não encontrado na base.');
            }
            return response.json();
        })
        .then((data) => {
            clearTableRequired();
            alert("Livro Encontrado!");
            insertListRequired(data.nome, data.genero, data.quantidade, data.valor);
        })
        .catch((error) => {
            alert(error.message);
            console.error('Error:', error);
        });
}
// ==========================================================


// Função para inserir itens requeridos/buscados na lista apresentada
const insertListRequired = (nameBook, gender, quantity, price) => {
    var item = [nameBook, gender, quantity, price]
    var table = document.getElementById('myTableRequired');
    var row = table.insertRow();

    for (var i = 0; i < item.length; i++) {
        var cel = row.insertCell(i);
        cel.textContent = item[i];
    }
    insertButton(row.insertCell(-1))
    document.getElementById("inputRequired").value = "";

    removeElement()
}
// ==========================================================


// Função para criar um botão close para cada livro da lista
const insertButton = (parent) => {
    let span = document.createElement("span");
    let txt = document.createTextNode("\u00D7");
    span.className = "close";
    span.appendChild(txt);
    parent.appendChild(span);
}
// ==========================================================


// Função para remover um livro da lista de acordo com o click no botão close
const removeElement = () => {
    let close = document.getElementsByClassName("close");
    let i;
    for (i = 0; i < close.length; i++) {
        close[i].onclick = function () {
            let div = this.parentElement.parentElement;
            const nomeItem = div.getElementsByTagName('td')[0].innerHTML
            if (confirm("Você tem certeza?")) {
                div.remove()
                deleteItem(nomeItem)
                alert("Removido!")
                clearTable();
                getList();
            }
        }
    }
}
// ==========================================================


// Função para deletar um livro da lista do servidor via requisição DELETE
const deleteItem = (item) => {
    console.log(item)
    let url = 'http://127.0.0.1:5000/deletar_livro?nome=' + item;
    fetch(url, {
        method: 'delete'
    })
        .then((response) => response.json())
        .catch((error) => {
            console.error('Error:', error);
        });
}
// ==========================================================


// Função para colocar um livro na lista do servidor via requisição POST
const postItem = async (inputBook, inputGender, inputQuantity, inputPrice) => {
    const formData = new FormData();
    formData.append('nome', inputBook);
    formData.append('genero', inputGender);
    formData.append('quantidade', inputQuantity);
    formData.append('valor', inputPrice);

    let url = 'http://127.0.0.1:5000/cadastrar_livro';
    fetch(url, {
        method: 'post',
        body: formData
    })
        .then((response) => response.json())
        .catch((error) => {
            console.error('Error:', error);
        });
}
// ==========================================================


// Função para limpar a tabela
const clearTable = () => {
    var table = document.getElementById('myTable');
    var rowCount = table.rows.length;

    // Remove todas as linhas, exceto a primeira (cabeçalho)
    for (var i = rowCount - 1; i > 0; i--) {
        table.deleteRow(i);
    }
}
// ==========================================================


// Função para limpar a tabela de consulta
const clearTableRequired = () => {
    var table = document.getElementById('myTableRequired');
    var rowCount = table.rows.length;

    // Remove todas as linhas, exceto a primeira (cabeçalho)
    for (var i = rowCount - 1; i > 0; i--) {
        table.deleteRow(i);
    }
}
// ==========================================================