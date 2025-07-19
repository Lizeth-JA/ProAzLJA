const firebaseConfig = {
  apiKey: "AIzaSyCB0UvAnvADnBVLZyCLimjDM5q39yvSoYM",
  authDomain: "yestlj.firebaseapp.com",
  projectId: "yestlj",
  storageBucket: "yestlj.firebasestorage.app",
  messagingSenderId: "634813248764",
  appId: "1:634813248764:web:31f00ef24432f68f1b1379"
};

firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();

auth.onAuthStateChanged(user => {
  const reservasSection = document.getElementById("reservasSection");
  const userStatus = document.getElementById("userStatus");

  if (user) {
    reservasSection.style.display = "block";
    userStatus.textContent = `Sesión iniciada como: ${user.email}`;
  } else {
    reservasSection.style.display = "none";
    userStatus.textContent = "No has iniciado sesión.";
  }
});

// Registro
function register() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  auth.createUserWithEmailAndPassword(email, password)
    .then(() => alert("Registrado correctamente"))
    .catch(err => alert(err.message));
}

// Inicio de sesión
function login() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  auth.signInWithEmailAndPassword(email, password)
    .then(() => alert("Sesión iniciada"))
    .catch(err => alert(err.message));
}

// Cierre de sesión
function logout() {
  auth.signOut()
    .then(() => alert("Sesión cerrada"))
    .catch(err => alert(err.message));
}

// Crear reserva
async function crearReserva() {
  const user = auth.currentUser;
  if (!user) {
    alert("Debes iniciar sesión");
    return;
  }

  const nombre = document.getElementById("nombreReserva").value;
  const fecha = document.getElementById("fechaReserva").value;

  if (!nombre || !fecha) {
    alert("Por favor, completa todos los campos");
    return;
  }

  const respuesta = await fetch("https://funappjal-c0fjghgxhde2b4a5.canadacentral-01.azurewebsites.net/api/reserva", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      nombre,
      fecha,
      email: user.email
    })
  });

  const resultado = await respuesta.json();
  alert(resultado.mensaje || "Error al guardar");
}
