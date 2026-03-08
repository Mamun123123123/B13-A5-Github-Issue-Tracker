if (localStorage.getItem("loggedIn") !== "true") {
    window.location.href = "login.html";
}
function login() {
    const username = document.querySelector("#username").value;
    const password = document.querySelector("#password").value;

    if (username === "admin" && password === "admin123") {
        localStorage.setItem("loggedIn", "true");
        window.location.href = "index.html";
    } else {
        alert("Invalid username or password");
    }
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
function activeButton(btn){

    allBtn.classList.remove("bg-blue-600","text-white")
    openBtn.classList.remove("bg-blue-600","text-white")
    closedBtn.classList.remove("bg-blue-600","text-white")

    btn.classList.add("bg-blue-600","text-white")

}

allBtn.addEventListener("click", () => {
        activeButton(allBtn)
        show(allData)
})

openBtn.addEventListener("click", () => {
      activeButton(openBtn)
     let openIssues = allData.filter(item => item.status === "open")

     show(openIssues)

})


closedBtn.addEventListener("click", () => {
     activeButton(closedBtn)
     let closedIssues = allData.filter(item => item.status === "closed")

     show(closedIssues)

})

activeButton(allBtn)

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



function openModal(item) {

    document.querySelector("#issue-modal").classList.remove("hidden")

    document.querySelector("#modal-title").textContent = item.title

    document.querySelector("#modal-status").textContent = item.status

    document.querySelector("#modal-status").className =
        item.status === "open"
            ? "px-2 py-1 rounded-full bg-green-500 text-white text-xs"
            : "px-2 py-1 rounded-full bg-blue-900 text-white text-xs"

    document.querySelector("#modal-author").textContent = "Opened by " + item.author

    document.querySelector("#modal-date").textContent =
        new Date(item.created_at).toLocaleDateString()

    document.querySelector("#modal-labels").innerHTML =
        item.labels.map(label =>
            `<span class="text-sm font-medium uppercase bg-blue-100 px-3 py-1 rounded">${label}</span>`
        ).join("")

    document.querySelector("#modal-description").textContent = item.description

    document.querySelector("#modal-assignee").textContent =
        item.assignee || "Unassigned"

    document.querySelector("#modal-priority").textContent = item.priority
}

document.querySelector("#modal-close").addEventListener("click", () => {

    document.querySelector("#issue-modal").classList.add("hidden")

})


document.querySelector("#issue-modal").addEventListener("click", (e) => {

    if (e.target.id === "issue-modal") {
        document.querySelector("#issue-modal").classList.add("hidden")
    }

})


function show(data) {

     let cards = document.querySelector("#issues")
     let count = document.querySelector("#count")
     count.textContent = data.length
     cards.innerHTML = ""

     data.forEach(item => {

          let borderColor = item.status === "open" 
          ? "border-t-4 border-green-500" 
          : "border-t-4 border-blue-900"

          let card = document.createElement("div")

          card.className = `bg-white p-5 rounded-lg shadow-md hover:shadow-xl transition mb-4 ${borderColor}`

          card.innerHTML = `

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

          `

          card.addEventListener("click", () => {
               openModal(item)
          })

          cards.appendChild(card)

     })

}
