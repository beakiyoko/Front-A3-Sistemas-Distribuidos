document.addEventListener("DOMContentLoaded", function () {
    const pageType = document.body.classList.contains("login-adm") ? "admin" : "user";
    const formId = pageType === "admin" ? "adm-form" : "login-form";
    const usernameField = pageType === "admin" ? "adm-matricula" : "matricula";
    const passwordField = pageType === "admin" ? "adm-senha" : "senha";

    const form = document.getElementById(formId);

    if (!form) return;

    form.addEventListener("submit", function (event) {
        event.preventDefault();

        const username = document.getElementById(usernameField).value.trim();
        const password = document.getElementById(passwordField).value.trim();

        // teste
        const credentials = {
            user: { username: "bea", password: "123" },
            admin: { username: "beatriz", password: "12345" }
        };

        let isValid = false;

        if (pageType === "admin") {
            isValid = username === credentials.admin.username && password === credentials.admin.password;
        } else {
            isValid = username === credentials.user.username && password === credentials.user.password;
        }

        if (isValid) {
            alert("Login bem-sucedido!");
            window.location.href = pageType === "admin" ? "home-adm.html" : "home.html";
        } else {
            alert("Usuário ou senha inválido. Tente novamente.");
        }
    });
});