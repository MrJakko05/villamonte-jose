(() => {
    const App = {
        htmlElements: {
            loginForm: document.getElementById('loginForm'),
            goToRegisterButton: document.getElementById('goToRegister')
        },
        init() {
            App.bindEvents();
            App.methods.onLoading();
        },
        bindEvents() {
            App.htmlElements.loginForm.addEventListener('submit', App.handlers.handleLogin);
            App.htmlElements.goToRegisterButton.addEventListener('click', App.handlers.handleGoToRegister);
        },
        handlers: {
            handleLogin(e) {
                e.preventDefault();
                const username = e.target.loginUsername.value;
                const password = e.target.loginPassword.value;

                // Aplica el hash a la contraseña ingresada
                const hashedPassword = App.methods.hashCode(password);

                const existingUsers = JSON.parse(localStorage.getItem('users')) || [];

                console.log(existingUsers);

                const user = existingUsers.find(user => user.username === username && user.password === hashedPassword);

                if (user) {
                    localStorage.setItem("isLoggedIn", "true");
                    localStorage.setItem("username", username);
                    window.location.href = "home.html"
                } else {
                    alert("Nombre de usuario o contraseña inválidos");
                }
            },
            handleGoToRegister() {
                localStorage.setItem('fromLogin', true);
                window.location.href = 'register.html';
            }, 
        },
        methods: {
            hashCode(str) {
                let hash = 0;
                for (let i = 0, len = str.length; i < len; i++) {
                    let chr = str.charCodeAt(i);
                    hash = (hash << 5) - hash + chr;
                    hash |= 0; // Convierte a una integer de 32bit
                }
                return hash;
            },
            onLoading() {
                var isLoggedIn = localStorage.getItem("isLoggedIn");
                if (!isLoggedIn) {
                    window.location.href = "login.html";
                } else {
                    const userDataElement = document.getElementById("userData");
                    if (userDataElement) {
                        userDataElement.innerHTML = localStorage.getItem("username");
                    }
                }
            }
        },
    };

    App.init();
})();