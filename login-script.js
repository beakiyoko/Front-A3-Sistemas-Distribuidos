document.getElementById("login-form").addEventListener("submit", function (event) {
    event.preventDefault();

    const username = document.getElementById("matricula").value.trim();
    const password = document.getElementById("senha").value.trim();

    // Simulação de validação (você pode substituir por uma API ou backend)
    const credentials = {
        username: "bea",
        password: "123"
    };

    if (username === credentials.username && password === credentials.password) {
        alert("Login bem-sucedido!");
        window.location.href = "home.html";
    } else {
        alert("Usuário ou senha inválido. Tente novamente.");
    }
});