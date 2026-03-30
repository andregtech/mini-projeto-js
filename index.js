function abrirModal() {
    overlay.classList.add('active');
    criarTarefa.classList.add('active');
}

function fecharModal() {
    overlay.classList.remove('active');
    criarTarefa.classList.remove('active');
}

//busca lista de tarefas que foi criada no api.json
function buscarTarefas() {
    fetch('http://localhost:3000/tarefas')
        .then(res => res.json())
        .then(res => {
            inserirTarefas(res);
        }) 
} buscarTarefas();

function inserirTarefas(listaDeTarefas) {
    if(listaDeTarefas.length > 0) {  
        lista.innerHTML = ""
        listaDeTarefas.map(tarefa => {
            lista.innerHTML += `
                <li>
                        <h5>${tarefa.titulo}</h5>
                        <p>${tarefa.descricao}</p>
                        <div class="actions">
                                <box-icon name='trash' size="sm" onclick="deletarTarefa(${tarefa.id})"></box-icon>
                         </div>
                    </li>
            `;
        })
    }
}

function novaTarefa() {
    event.preventDefault(); //impede o comportamento padrão do formulário que é recarregar a página
    
    let tarefa = {
        titulo: titulo.value,
        descricao: descricao.value
    }

    fetch('http://localhost:3000/tarefas',{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(tarefa) //transforma o objeto tarefa em uma string para ser enviada para a API
    })
    .then(res => res.json())
    .then(res => {
        fecharModal();
        buscarTarefas();
        let form = document.querySelector('#criarTarefa form');
        form.reset();
    })  
}

function deletarTarefa(id) {
    fetch(`http://localhost:3000/tarefas/${id}`,{
        method: 'DELETE',
    })
    .then(res => res.json())
    .then(res => {
        alert('Tarefa deletada com sucesso!');
        buscarTarefas();
    })
}

function pesquisarTarefas() {

    let lis = document.querySelectorAll('ul li');
    let valorBusca = busca.value.toLowerCase(); // toLowerCase normaliza a busca para minúsculo

    lis.forEach(li => {

        let tituloTarefa = li.querySelector('h5').innerText.toLowerCase();
        let descricaoTarefa = li.querySelector('p').innerText.toLowerCase();

        if(tituloTarefa.includes(valorBusca) || descricaoTarefa.includes(valorBusca)) { // includes é quem verifica se a busca contém o valor passado como argumento ou não.
            li.classList.remove('oculto');
        } else {
            li.classList.add('oculto');  
        }

    });

}

/*
function pesquisarTarefas() {
    let lis = document.querySelectorAll('ul li');
    console.log(lis);
    if(busca.value.length > 0) {
        lis.forEach(li => {
            if(!li.children[0].innerText.includes(busca.value)) {//includes é um método de string que verifica se a string contém o valor passado como argumento, retorna true ou false
                li.classList.add('oculto');
            } else {
                li.classList.remove('oculto');  
            }
        })
    } else {
        lis.forEach(li => {
            li.classList.remove('oculto');
        })
    }
}
*/