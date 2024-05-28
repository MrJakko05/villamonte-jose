(() => {
    const App = {
        htmlElements: {
            registerForm: document.getElementById('registerForm'),
            goToLoginButton: document.getElementById('goToLogin')
        },
        init() {
            App.bindEvents();
            App.methods.onLoading();
        },
        bindEvents() {
            App.htmlElements.registerForm.addEventListener('submit', App.handlers.handleRegister);
            App.htmlElements.goToLoginButton.addEventListener('click', App.handlers.handleGoToLogin);
        },
        handlers: {
            handleRegister(e) {
                e.preventDefault();
                const username = e.target.registerUsername.value;
                const name = e.target.registername.value;
                const password = e.target.registerPassword.value;

                // Verifica si el usuario existe
                const existingUsers = JSON.parse(localStorage.getItem('users')) || [];
                const userExists = existingUsers.some(user => user.username === username);
                if (userExists) {
                    alert('Nombre de usuario ya existe');
                    return;
                }

                // Aplica el hash a la contraseña
                const hashedPassword = App.methods.hashCode(password);

                // Salva los datos del usuario en el localStorage
                const newUser = { username, name, password: hashedPassword };
                existingUsers.push(newUser);
                localStorage.setItem('users', JSON.stringify(existingUsers));

                console.log(existingUsers);

                alert('Registro satisfactorio');
                window.location.href = 'login.html';
            },
            handleGoToLogin() {
                window.location.href = 'login.html';
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
                const fromLogin = localStorage.getItem('fromLogin');
                if (!fromLogin) {
                    window.location.href = 'login.html';
                } else {
                    localStorage.removeItem('fromLogin'); // Limpiar la bandera después de usarla
                }
            }
        },
        render () {}
    };

    App.init();
})();