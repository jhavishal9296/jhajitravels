// ---------- 1. Car data (edit this list to add or change cars) ----------
const cars = [
  { name: "Swift Dzire",  gear: "Manual",    seats: 5, price: 1800, tag: "Best seller", img: "images/dzire.png" },
  { name: "Innova Crysta", gear: "Automatic", seats: 7, price: 3500, tag: "Promo",       img: "images/innova.png" },
  { name: "Fortuner",     gear: "Automatic", seats: 7, price: 6000, tag: "",            img: "images/fortuner.png" },
  { name: "Ertiga",       gear: "Manual",    seats: 7, price: 2500, tag: "",            img: "images/ertiga.png" },
  { name: "Creta",        gear: "Automatic", seats: 5, price: 2800, tag: "",            img: "images/creta.png" },
  { name: "Thar",         gear: "Manual",    seats: 4, price: 3200, tag: "",            img: "images/thar.png" },
  { name: "Baleno",       gear: "Manual",    seats: 5, price: 1600, tag: "",            img: "images/baleno.png" },
  { name: "XUV700",       gear: "Automatic", seats: 7, price: 4000, tag: "",            img: "images/xuv700.png" }
];

const cardsBox = document.getElementById("cards");
const moreBtn = document.getElementById("moreBtn");
let showAll = false;

function renderCars() {
  const list = showAll ? cars : cars.slice(0, 4);
  cardsBox.innerHTML = list.map(car => `
    <div class="car">
      ${car.tag ? `<span class="tag ${car.tag === "Promo" ? "promo-tag" : ""}">${car.tag}</span>` : ""}
      <div class="pic">
        <img src="${car.img}" alt="${car.name}" onerror="this.replaceWith('🚗')">
      </div>
      <h3>${car.name}</h3>
      <p class="info">⚙ ${car.gear} &nbsp; 👤 ${car.seats} seats</p>
      <p class="price">₹${car.price.toLocaleString("en-IN")} <small>/ day</small></p>
      <a class="btn" href="https://wa.me/910000000000?text=${encodeURIComponent("I want to rent the " + car.name)}" target="_blank" rel="noopener">Rent now</a>
    </div>
  `).join("");
  moreBtn.textContent = showAll ? "Show fewer cars" : "View all cars";
}

moreBtn.addEventListener("click", () => { showAll = !showAll; renderCars(); });
renderCars();

// ---------- 2. Countdown timer (counts down to midnight) ----------
function updateTimer() {
  const now = new Date();
  const end = new Date(now);
  end.setHours(24, 0, 0, 0);               // today at midnight
  const diff = Math.floor((end - now) / 1000);
  const pad = n => String(n).padStart(2, "0");
  document.getElementById("h").textContent = pad(Math.floor(diff / 3600));
  document.getElementById("m").textContent = pad(Math.floor((diff % 3600) / 60));
  document.getElementById("s").textContent = pad(diff % 60);
}
updateTimer();
setInterval(updateTimer, 1000);

// ---------- 3. Mobile menu ----------
document.getElementById("burger").addEventListener("click", () => {
  document.getElementById("menu").classList.toggle("open");
});

// ---------- 4. Search form ----------
const today = new Date().toISOString().split("T")[0];
const pickup = document.getElementById("pickup");
const returnDate = document.getElementById("return");
pickup.min = returnDate.min = today;

document.getElementById("searchForm").addEventListener("submit", e => {
  e.preventDefault();
  const place = document.getElementById("location").value;
  if (!place || !pickup.value || !returnDate.value) {
    alert("Please choose a location and both dates.");
    return;
  }
  if (returnDate.value < pickup.value) {
    alert("Return date must be after the pickup date.");
    return;
  }
  document.getElementById("fleet").scrollIntoView({ behavior: "smooth" });
});
