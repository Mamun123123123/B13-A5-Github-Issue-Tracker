function login() {

     let username = document.querySelector("#username").value;
     let password = document.querySelector("#password").value;

     (username === "admin" && password === "admin123")
          ? window.location.href = "index.html"
          : alert("Invalid username or password");

}

let allBtn = document.querySelector("#all")
let openBtn = document.querySelector("#open")
let closedBtn = document.querySelector("#closed")

let url = "https://phi-lab-server.vercel.app/api/v1/lab/issues"

let allData = []

window.addEventListener("DOMContentLoaded", getIssues)

async function getIssues() {

     let response = await fetch(url)

     let data = await response.json()

     allData = data.data

     show(allData)

}

allBtn.addEventListener("click", () => {
     show(allData)
})

openBtn.addEventListener("click", () => {

     let openIssues = allData.filter(item => item.status === "open")

     show(openIssues)

})


closedBtn.addEventListener("click", () => {

     let closedIssues = allData.filter(item => item.status === "closed")

     show(closedIssues)

})

let search_input = document.querySelector("#search_input")
let search_btn = document.querySelector("#search_btn")

search_btn.addEventListener("click", async (e) => {
    e.preventDefault(); 
    let query = search_input.value.trim();
    let search_url = `https://phi-lab-server.vercel.app/api/v1/lab/issues/search?q=${query}`;
    let response = await fetch(search_url);
    let data = await response.json();
    show(data.data);
});

function show(data) {

     let cards = document.querySelector("#issues")
     let count = document.querySelector("#count")
     count.textContent = data.length
     cards.innerHTML = ""

     data.forEach(item => {
           let borderColor = item.status === "open" ? "border-t-4 border-green-500" : "border-t-4 border-blue-900"

          cards.innerHTML += `

<div class="bg-white p-5 rounded-lg shadow-md hover:shadow-xl transition mb-4 ${borderColor}">

     <div class="flex justify-between items-center">

          <img class="w-6" src="assets/Open-Status.png">

          <span class="text-xs px-3 py-1 rounded-full bg-gray-200">
               ${item.priority}
          </span>

     </div>


     <div class="mt-3">

          <h2 class="font-semibold text-lg">
               ${item.title}
          </h2>

     </div>


     <div>

          <p class="text-gray-600 mt-2">
               ${item.description}
          </p>

     </div>


     <div class="flex gap-2 mt-3">

          ${item.labels.map(label =>
               `<span class="items-center bg-yellow-50 uppercase rounded-2xl text-yellow-500 p-2">${label}</span>`
          ).join("")}

     </div>


     <hr class="my-3">


     <div class="flex justify-between text-sm text-gray-500">

          <span>#${item.id} by ${item.author}</span>

          <span>${new Date(item.created_at).toLocaleDateString()}</span>

     </div>

</div>

`
     })

}