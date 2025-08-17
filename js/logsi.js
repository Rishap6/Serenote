const wrapper = document.querySelector(".wrapper");
const loginLink = document.getElementById("loginLink");
const signupLink = document.getElementById("signupLink");

signupLink.addEventListener("click", (e) => {
  e.preventDefault();
  wrapper.classList.add("active");
});

loginLink.addEventListener("click", (e) => {
  e.preventDefault();
  wrapper.classList.remove("active");
});

// Handle Login
document.getElementById("loginForm").addEventListener("submit", (e) => {
  e.preventDefault();
  const user = document.getElementById("loginUser").value.trim();
  const pass = document.getElementById("loginPass").value.trim();

  if (!user || !pass) {
    alert("Please fill in all fields!");
    return;
  }
  alert(`Logged in as ${user} (demo mode)`);
});

// Handle Register
document.getElementById("registerForm").addEventListener("submit", (e) => {
  e.preventDefault();
  const user = document.getElementById("regUser").value.trim();
  const pass = document.getElementById("regPass").value.trim();
  const pass2 = document.getElementById("regPass2").value.trim();

  if (!user || !pass || !pass2) {
    alert("Please fill in all fields!");
    return;
  }
  if (pass !== pass2) {
    alert("Passwords do not match!");
    return;
  }
  alert(`Account created for ${user} (demo mode)`);
});


