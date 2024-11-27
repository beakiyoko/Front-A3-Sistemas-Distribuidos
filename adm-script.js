document.getElementById("adm-form").addEventListener("submit", function (event) {
    event.preventDefault();

    const username = document.getElementById("adm-matricula").value.trim();
    const password = document.getElementById("adm-senha").value.trim();

    const admCredentials = {
        username: "beatriz",
        password: "12345"
    };

    if (username === admCredentials.username && password === admCredentials.password) {
        alert("Login bem-sucedido!");
        window.location.href = "home-adm.html";
    } else {
        alert("Usuário ou senha inválido. Tente novamente.");
    }
});


document.getElementById('cadastroForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const nome = document.getElementById('nome').value.trim();
    const sobrenome = document.getElementById('sobrenome').value.trim();
    const dataNascimento = document.getElementById('dataNascimento').value;
    const cpf = document.getElementById('cpf').value.trim();
    const cargo = document.getElementById('cargo').value;
    const senha = document.getElementById('senha').value;

    if (!/^\d{11}$/.test(cpf)) {
        document.getElementById('message').textContent = 'O CPF deve conter exatamente 11 dígitos e apenas números.';
        document.getElementById('message').style.color = 'red';
        return;
    }

    if (senha.length < 6) {
        document.getElementById('message').textContent = 'A senha deve conter no mínimo 6 caracteres.';
        document.getElementById('message').style.color = 'red';
        return;
    }

    if (!nome || !sobrenome || !dataNascimento || !cpf || !cargo || !senha) {
        document.getElementById('message').textContent = 'Por favor, preencha todos os campos.';
        document.getElementById('message').style.color = 'red';
        return;
    }

    const message = `Cadastro realizado com sucesso!\nNome: ${nome} ${sobrenome}\nCargo: ${cargo}`;
    document.getElementById('message').textContent = message;
    document.getElementById('message').style.color = 'green';

    document.getElementById('cadastroForm').reset();
});
