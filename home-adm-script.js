document.getElementById('cadastroForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const nome = document.getElementById('nome').value.trim();
    const sobrenome = document.getElementById('sobrenome').value.trim();
    const dataNascimento = document.getElementById('dataNascimento').value;
    const cpf = document.getElementById('cpf').value.trim();
    const cargo = document.getElementById('cargo').value;
    const senha = document.getElementById('senha').value;

    if (!/^\d{11}$/.test(cpf)) {
        alert('O CPF deve conter exatamente 11 dígitos e apenas números.');
        return;
    }

    alert(`Cadastro realizado com sucesso!\nNome: ${nome} ${sobrenome}\nCargo: ${cargo}`);
    document.getElementById('cadastroForm').reset();

    document.getElementById('cadastroForm').reset();
});


function logout() {
    console.log("Logout efetuado.");
    alert("Você foi deslogado.");
    window.location.href = "/adm-login.html";
}




// ¹
document.getElementById('pesquisa').addEventListener('input', function () {
    const pesquisa = document.getElementById('pesquisa').value.trim();

    if (pesquisa.length > 0) {
        // Buscar dados da API (aqui simulamos com dados mock)
        fetch(`api/funcionarios?nome=${pesquisa}`)
            .then(response => response.json())
            .then(data => {
                const resultados = document.getElementById('tabelaResultados');
                resultados.innerHTML = '';

                if (data.length === 0) {
                    resultados.innerHTML = '<tr><td colspan="4">Nenhum resultado encontrado.</td></tr>';
                    return;
                }

                data.forEach(funcionario => {
                    const tr = document.createElement('tr');
                    tr.innerHTML = `
                        <td>${funcionario.dia}</td>
                        <td>${funcionario.entrada}</td>
                        <td>${funcionario.saida}</td>
                        <td>${funcionario.horasTrabalhadas}</td>
                    `;
                    resultados.appendChild(tr);
                });
            })
            .catch(error => {
                console.error('Erro ao buscar dados:', error);
            });
    } else {
        // Se a pesquisa estiver vazia, limpar a tabela
        document.getElementById('tabelaResultados').innerHTML = '';
    }
});

function editarRegistro(id) {
    const novoRegistro = prompt('Digite o novo registro:');
    if (novoRegistro) {
        fetch(`api/funcionarios/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ registro: novoRegistro })
        })
        .then(response => {
            if (response.ok) {
                alert('Registro atualizado com sucesso!');
                document.getElementById('pesquisaForm').submit();
            }
        })
        .catch(error => console.error('Erro ao editar registro:', error));
    }
}

function deletarRegistro(id) {
    if (confirm('Tem certeza que deseja deletar este registro?')) {
        fetch(`api/funcionarios/${id}`, { method: 'DELETE' })
        .then(response => {
            if (response.ok) {
                alert('Registro deletado com sucesso!');
                document.getElementById('pesquisaForm').submit();
            }
        })
        .catch(error => console.error('Erro ao deletar registro:', error));
    }
}


document.addEventListener('DOMContentLoaded', function () {
    // Função para buscar e exibir os registros na tabela
    function carregarRegistros() {
        // Faz uma requisição GET para buscar os registros
        fetch('api/funcionarios')
            .then(response => response.json())
            .then(data => {
                const tabelaResultados = document.getElementById('tabelaResultados');
                tabelaResultados.innerHTML = ''; // Limpa a tabela antes de preencher

                // Preenche a tabela com os dados retornados
                data.forEach(funcionario => {
                    const row = document.createElement('tr');
                    row.innerHTML = `
                        <td>${funcionario.nome}</td>
                        <td>${funcionario.dataNascimento}</td>
                        <td>${funcionario.registro}</td>
                        <td>
                            <button onclick="editarRegistro(${funcionario.id})">Editar</button>
                            <button onclick="deletarRegistro(${funcionario.id})">Deletar</button>
                        </td>
                    `;
                    tabelaResultados.appendChild(row);
                });
            })
            .catch(error => console.error('Erro ao carregar os registros:', error));
    }

    // Carregar os registros assim que a página for carregada
    carregarRegistros();

    // Função de pesquisa
    document.getElementById('pesquisa').addEventListener('input', function() {
        const query = this.value.toLowerCase();

        const rows = document.querySelectorAll('#tabelaResultados tr');
        rows.forEach(row => {
            const nome = row.querySelector('td').innerText.toLowerCase();
            if (nome.includes(query)) {
                row.style.display = '';
            } else {
                row.style.display = 'none';
            }
        });
    });
});

// Função para editar o registro
function editarRegistro(id) {
    const novoRegistro = prompt('Digite o novo registro:');
    if (novoRegistro) {
        fetch(`api/funcionarios/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ registro: novoRegistro })
        })
        .then(response => {
            if (response.ok) {
                alert('Registro atualizado com sucesso!');
                // Recarregar a tabela para exibir a atualização
                carregarRegistros();
            }
        })
        .catch(error => console.error('Erro ao editar registro:', error));
    }
}

// Função para deletar o registro
function deletarRegistro(id) {
    if (confirm('Tem certeza que deseja deletar este registro?')) {
        fetch(`api/funcionarios/${id}`, { method: 'DELETE' })
        .then(response => {
            if (response.ok) {
                alert('Registro deletado com sucesso!');
                // Recarregar a tabela para remover o registro deletado
                carregarRegistros();
            }
        })
        .catch(error => console.error('Erro ao deletar registro:', error));
    }
}
