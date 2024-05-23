// Seleciona o botão de adicionar tarefa, a entrada de texto e a lista de tarefas
const button = document.querySelector('.button-add-task');
const input = document.querySelector('.input-task');
const listaCompleta = document.querySelector('.list-tasks');

// Array para armazenar a lista de tarefas
let minhaListaDeItens = [];

// Função para adicionar uma nova tarefa à lista
function adicionarNovaTarefa() {
  // Verifica se o campo de entrada está vazio
  if (input.value.trim() === '') {
    return;
  }

  // Adiciona a nova tarefa ao array
  minhaListaDeItens.push({
    tarefa: input.value,
    concluida: false,
  });

  // Limpa o campo de entrada
  input.value = '';

  // Atualiza a exibição da lista de tarefas
  mostrarTarefas();
}

// Função para exibir a lista de tarefas na página
function mostrarTarefas() {
  let novaLi = '';

  // Cria o HTML para cada item da lista de tarefas
  minhaListaDeItens.forEach((item, posicao) => {
    novaLi += `
      <li class="task ${item.concluida ? 'done' : ''}">
          <img src="./img/checked.png" alt="check-na-tarefa" onclick="concluirTarefa(${posicao})">
          <p>${item.tarefa}</p>
          <img src="./img/trash.png" alt="tarefa-para-o-lixo" onclick="deletarItem(${posicao})">
      </li>
    `;
  });

  // Atualiza o conteúdo da lista de tarefas na página
  listaCompleta.innerHTML = novaLi;

  // Salva a lista de tarefas no armazenamento local
  localStorage.setItem('lista', JSON.stringify(minhaListaDeItens));
}

// Função para marcar uma tarefa como concluída ou não concluída
function concluirTarefa(posicao) {
  minhaListaDeItens[posicao].concluida = !minhaListaDeItens[posicao].concluida;

  // Atualiza a exibição da lista de tarefas
  mostrarTarefas();
}

// Função para excluir uma tarefa da lista
function deletarItem(posicao) {
  minhaListaDeItens.splice(posicao, 1);

  // Atualiza a exibição da lista de tarefas
  mostrarTarefas();
}

// Função para carregar as tarefas salvas no armazenamento local ao carregar a página
function recarregarTarefas() {
  const tarefasDoLocalStorage = localStorage.getItem('lista');

  // Verifica se há tarefas salvas no armazenamento local
  if (tarefasDoLocalStorage) {
    minhaListaDeItens = JSON.parse(tarefasDoLocalStorage);
  }

  // Exibe as tarefas na página
  mostrarTarefas();
}

// Carrega as tarefas ao carregar a página
recarregarTarefas();

// Adiciona um evento de clique ao botão de adicionar tarefa
button.addEventListener('click', adicionarNovaTarefa);

// Adiciona um evento de tecla pressionada à entrada de texto para permitir a adição de tarefas ao pressionar Enter
input.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    adicionarNovaTarefa();
  }
});
