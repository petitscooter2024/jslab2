// Dark / Light Mode Handling 
const toggleBtn = document.getElementById("toggleModeBtn");

(function restoreTheme() {
  const saved = localStorage.getItem("theme");
  if (saved === "dark") {
    document.body.classList.add("dark");
    toggleBtn.textContent = "🌙 Toggle Light Mode";
  }
})();

toggleBtn.addEventListener("click", () => {
  const isDark = document.body.classList.toggle("dark");
  localStorage.setItem("theme", isDark ? "dark" : "light");
  toggleBtn.textContent = isDark ? "🌙 Toggle Light Mode" : "🌞 Toggle Dark Mode";
});

//Clock with Time Zone Support
const tzSelect = document.getElementById("timezone");
let currentTZ = tzSelect.value;

tzSelect.addEventListener("change", (e) => {
  currentTZ = e.target.value;
  updateClock();
});

startClock();

function startClock() {
  updateClock();
  setInterval(updateClock, 1000);
}

function updateClock() {
  const now = new Date();
  const timeStr = now.toLocaleTimeString("en-US", { timeZone: currentTZ, hour12: false });
  const dateStr = now.toLocaleDateString("en-US", { timeZone: currentTZ });
  document.getElementById("clock").textContent = `${dateStr} – ${timeStr}`;
}

//Alert Button
function showAlert() {
  alert("You cannot go any further.");
}

document.getElementById("alertBtn").addEventListener("click", showAlert);

//Registration Form Validation
const form = document.getElementById("registerForm");
const dobEl = document.getElementById("dob");
const phone = document.getElementById("phone");
const pwd = document.getElementById("password");
const cpwd = document.getElementById("confirmPassword");
const acctEl = document.getElementById("account");
const strengthText = document.getElementById("strengthText");

const rePhone = /^\+?\d{10,15}$/;
const rePassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*#?&]).{8,}$/;

pwd.addEventListener("input", () => {
  strengthText.textContent = rePassword.test(pwd.value)
    ? "✅ Strong password"
    : "❌ Use A‑Z, a‑z, number & symbol (8+)";
});

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const errors = [];

  const dob = new Date(dobEl.value);
  const age = (Date.now() - dob) / (1000 * 60 * 60 * 24 * 365.25);
  if (isNaN(dob) || age < 18) errors.push("You must be at least 18.");

  if (!rePhone.test(phone.value.trim()))
    errors.push("Phone number format is invalid.");

  if (!rePassword.test(pwd.value))
    errors.push("Password is not strong enough.");

  if (pwd.value !== cpwd.value)
    errors.push("Passwords do not match.");

  if (errors.length) {
    alert(errors.join("\n"));
    return;
  }

  alert(`✅ You have successfully registered as a ${acctEl.value}!`);
  form.reset();
  strengthText.textContent = "";
});
