function toggleForms(form) {
  const loginForm = document.getElementById("loginForm");
  const registerForm = document.getElementById("registerForm");

  if (form === "register") {
    loginForm.style.display = "none";
    registerForm.style.display = "block";
  } else {
    registerForm.style.display = "none";
    loginForm.style.display = "block";
  }
}

// Show login form by default
document.getElementById("loginForm").style.display = "block";
document.getElementById("registerForm").style.display = "none";
// Toggle between login and register forms
function toggleForms(form) {
  const loginForm = document.getElementById("loginForm");
  const registerForm = document.getElementById("registerForm");

  if (form === "register") {
    loginForm.style.display = "none";
    registerForm.style.display = "block";
  } else {
    registerForm.style.display = "none";
    loginForm.style.display = "block";
  }
}

// Show login form by default
document.getElementById("loginForm").style.display = "block";
document.getElementById("registerForm").style.display = "none";

// Validate email format
function validateEmail(input) {
  const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
  const isValid = emailPattern.test(input.value);
  const errorSpan =
    input.id === "loginEmail" ? "emailError" : "emailErrorRegister";

  if (!isValid) {
    document.getElementById(errorSpan).style.display = "block";
  } else {
    document.getElementById(errorSpan).style.display = "none";
  }
}

// Password validation: minimum 8 chars, uppercase, special character, number
function validatePassword(input) {
  const password = input.value;
  const toast = document.getElementById("toast");

  const isValidLength = password.length >= 8;
  const hasUpperCase = /[A-Z]/.test(password);
  const hasNumber = /[0-9]/.test(password);
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

  if (isValidLength && hasUpperCase && hasNumber && hasSpecialChar) {
    toast.className = "toast show";
    toast.style.backgroundColor = "#4CAF50";
    toast.textContent = "Password is valid!";
  } else {
    toast.className = "toast show";
    toast.style.backgroundColor = "#f44336";
    toast.textContent =
      "Password must be at least 8 characters long, include an uppercase letter, a number, and a special character.";
  }

  // Hide toast after 3 seconds
  setTimeout(() => {
    toast.className = toast.className.replace("show", "");
  }, 3000);
}

// Toggle password visibility
function togglePasswordVisibility(inputId) {
  const input = document.getElementById(inputId);
  if (input.type === "password") {
    input.type = "text";
  } else {
    input.type = "password";
  }
}

// Capitalize the first letter for username input
function capitalizeFirstLetter(input) {
  input.value = input.value.charAt(0).toUpperCase() + input.value.slice(1);
}
