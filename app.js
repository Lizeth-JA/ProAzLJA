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

function register() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  auth.createUserWithEmailAndPassword(email, password)
    .then(user => alert("Registrado"))
    .catch(err => alert(err.message));
}

function login() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  auth.signInWithEmailAndPassword(email, password)
    .then(user => alert("Sesión iniciada"))
    .catch(err => alert(err.message));
}

function logout() {
  auth.signOut().then(() => alert("Sesión cerrada"));
}
