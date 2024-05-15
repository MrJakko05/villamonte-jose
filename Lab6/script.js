const login = () => {    
    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;

    if (username === "usertest" && password === "passtest") {
        localStorage.setItem("isLoggedIn", "true");
        localStorage.setItem("username", username);
        localStorage.setItem("descripcion", "Desarrollador Full Stack");
        window.location.href = "home.html"
    } else {
        alert("nombre de usuario o contraseña invalidos");
    }
}; 

const logout = () => {
    localStorage.removeItem("isLoggedIn");
    window.location.href = "login.html";
}

const onLoading = () => {
    var isLoggedIn = localStorage.getItem("isLoggedIn");
    if (!isLoggedIn) {
        window.location.href = "login.html";
    } else {
        document.getElementById("userData").innerHTML = localStorage.getItem("username");
        document.getElementById("userDescription").innerHTML = localStorage.getItem("descripcion");
        document.getElementById("userImage").style.display = "block";
    }
};

window.onload = onLoading;