function login(){

let username = document.querySelector("#username").value;
let password = document.querySelector("#password").value;

(username === "admin" && password === "admin123") 
? window.location.href = "index.html" 
: alert("Invalid username or password");

}