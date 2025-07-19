// Configuración de firebase
const firebaseConfig = {
  // 🔐 REEMPLAZA ESTOS CAMPOS CON TUS CLAVES DE FIREBASE
  apiKey: "TU_API_KEY",
  authDomain: "TU_AUTH_DOMAIN",
  projectId: "TU_PROJECT_ID",
  appId: "TU_APP_ID"
};

firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();

function register() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  auth.createUserWithEmailAndPassword(email, password)
    .then(() => alert("Usuario registrado"))
    .catch(e => alert(e.message));
}

function login() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  auth.signInWithEmailAndPassword(email, password)
    .then(() => alert("Bienvenido"))
    .catch(e => alert(e.message));
}

function logout() {
  auth.signOut();
}

auth.onAuthStateChanged(user => {
  if (user) {
    document.getElementById("login-section").style.display = "none";
    document.getElementById("reserva-section").style.display = "block";
    document.getElementById("user-info").innerText = `Usuario: ${user.email}`;
    mostrarReservas(user.uid);
  } else {
    document.getElementById("login-section").style.display = "block";
    document.getElementById("reserva-section").style.display = "none";
  }
});

function reservar() {
  const fecha = document.getElementById("fecha").value;
  const hora = document.getElementById("hora").value;
  const lab = document.getElementById("laboratorio").value;
  const user = auth.currentUser;

  fetch("/api/registrar", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ uid: user.uid, email: user.email, fecha, hora, laboratorio: lab })
  })
    .then(res => res.json())
    .then(data => {
      alert(data.mensaje);
      mostrarReservas(user.uid);
    })
    .catch(err => {
      alert("Error al reservar");
      console.error(err);
    });
}

function mostrarReservas(uid) {
  fetch(`/api/obtener?uid=${uid}`)
    .then(res => res.json())
    .then(data => {
      const lista = document.getElementById("lista-reservas");
      lista.innerHTML = "";
      data.forEach(item => {
        const li = document.createElement("li");
        li.innerText = `${item.fecha} - ${item.hora} - ${item.laboratorio}`;
        lista.appendChild(li);
      });
    })
    .catch(err => {
      console.error("Error al cargar reservas", err);
    });
}
