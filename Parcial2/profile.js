(() => {
    const App = {
        htmlElements: {
            logoutBtn: document.getElementById('logout-btn'),
            userHome: document.getElementById('user-home'),
            profileForm: document.getElementById('profileForm'),
            nameInput: document.getElementById('profileName'),
            passwordInput: document.getElementById('profilePassword'),
        },
        init() {
            App.bindEvents();
            App.methods.onLoading();
        },
        bindEvents() {
            App.htmlElements.logoutBtn.addEventListener('click', App.handlers.logout);
            App.htmlElements.userHome.addEventListener('click', App.handlers.homeNav);
            App.htmlElements.profileForm.addEventListener('submit', App.handlers.handleProfileUpdate);
        },
        handlers: { 
            logout() {
                localStorage.removeItem("isLoggedIn");
                window.location.href = "login.html";
            },
            homeNav() {
                window.location.href = "home.html";
            },
            handleProfileUpdate(e) {
                e.preventDefault();
                const username = localStorage.getItem("username");
                const existingUsers = JSON.parse(localStorage.getItem('users')) || [];
                const userIndex = existingUsers.findIndex(user => user.username === username);

                if (userIndex === -1) {
                    alert('User not found');
                    window.location.href = "login.html";
                    return;
                }

                const updatedName = App.htmlElements.nameInput.value;
                let updatedPassword = App.htmlElements.passwordInput.value;

                if (updatedPassword) {
                    updatedPassword = App.methods.hashCode(updatedPassword);
                    existingUsers[userIndex].password = updatedPassword;
                }

                existingUsers[userIndex].name = updatedName;
                localStorage.setItem('users', JSON.stringify(existingUsers));

                alert('Profile updated successfully');
                App.htmlElements.passwordInput.value = ''; // Clear the password field
            }
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
                const isLoggedIn = localStorage.getItem("isLoggedIn");
                if (!isLoggedIn) {
                    window.location.href = "login.html";
                    return;
                }

                const username = localStorage.getItem("username");
                const existingUsers = JSON.parse(localStorage.getItem('users')) || [];
                const user = existingUsers.find(user => user.username === username);

                if (user) {
                    App.htmlElements.nameInput.value = user.name;
                } else {
                    alert('User not found');
                    window.location.href = "login.html";
                }
            },
        },
    };

    App.init();
})();