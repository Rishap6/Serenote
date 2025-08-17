const wrapper = document.querySelector(".wrapper");
const loginLink = document.getElementById("loginLink");
const signupLink = document.getElementById("signupLink");
const loginForm = document.getElementById("loginForm");
const registerForm = document.getElementById("registerForm");


signupLink.addEventListener("click", (e) => {
  e.preventDefault();
  wrapper.classList.add("active");
});

loginLink.addEventListener("click", (e) => {
  e.preventDefault();
  wrapper.classList.remove("active");
});

/**
 * Displays a message within a form.
 * @param {HTMLFormElement} formElement The form to display the message in.
 * @param {string} message The message to display.
 * @param {boolean} isError If true, displays an error-styled message.
 */
function showMessage(formElement, message, isError = false) {
  const messageBox = formElement.querySelector(".form-message");
  if (messageBox) {
    messageBox.textContent = message;
    messageBox.className = `form-message ${isError ? 'error' : 'success'}`;
  }
}

/**
 * Toggles password visibility for an input field.
 * @param {HTMLInputElement} passField The password input field.
 * @param {HTMLElement} toggleIcon The icon element to toggle.
 */
function togglePasswordVisibility(passField, toggleIcon) {
  if (passField.type === "password") {
    passField.type = "text";
    toggleIcon.classList.replace("bxs-hide", "bxs-show");
  } else {
    passField.type = "password";
    toggleIcon.classList.replace("bxs-show", "bxs-hide");
  }
}

// Add event listeners for password toggles
document.getElementById("toggleLoginPass").addEventListener("click", () => togglePasswordVisibility(document.getElementById("loginPass"), document.getElementById("toggleLoginPass")));
document.getElementById("toggleRegPass").addEventListener("click", () => togglePasswordVisibility(document.getElementById("regPass"), document.getElementById("toggleRegPass")));
document.getElementById("toggleRegPass2").addEventListener("click", () => togglePasswordVisibility(document.getElementById("regPass2"), document.getElementById("toggleRegPass2")));


loginForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const username = document.getElementById("loginUser").value.trim();
  const password = document.getElementById("loginPass").value.trim();

  try {
    const res = await fetch(`/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password })
    });

    const data = await res.json();
    
    if (res.ok) {
      showMessage(loginForm, data.message, false);
      // On successful login, you would typically redirect the user
      setTimeout(() => {
        alert("Login successful! Redirecting to dashboard...");
        // window.location.href = '/dashboard.html'; 
      }, 1000);
    } else {
      showMessage(loginForm, data.message, true);
    }
  } catch (err) {
    console.error("Login error:", err);
    showMessage(loginForm, "A network error occurred. Please try again.", true);
  }
});

registerForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const username = document.getElementById("regUser").value.trim();
  const password = document.getElementById("regPass").value.trim();
  const confirmPassword = document.getElementById("regPass2").value.trim();

  if (!username || !password || !confirmPassword) {
    showMessage(registerForm, "Please fill in all fields!", true);
    return;
  }
  if (password !== confirmPassword) {
    showMessage(registerForm, "Passwords do not match!", true);
    return;
  }

  try {
    const res = await fetch(`/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password })
    });

    const data = await res.json();

    if (res.ok) {
      // On successful registration, redirect to a confirmation page.
      window.location.href = 'registration-success.html';
    } else {
      showMessage(registerForm, data.message, true);
    }
  } catch (err) {
    console.error("Registration error:", err);
    showMessage(registerForm, "A network error occurred. Please try again.", true);
  }
});
