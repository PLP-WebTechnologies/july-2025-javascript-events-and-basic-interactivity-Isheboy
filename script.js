// ===== JAVASCRIPT FOR INTERACTIVE WEB PAGE =====
// This file contains all the JavaScript code for the assignment
// Each section is clearly commented to explain what it does

// Wait for the page to load completely before running JavaScript
document.addEventListener("DOMContentLoaded", function () {
  console.log("🚀 Interactive Web Page Loaded!");

  // Initialize all interactive features
  initEventHandling();
  initInteractiveElements();
  initFormValidation();
});

// ===== PART 1: EVENT HANDLING =====
// This section demonstrates different types of event listeners

function initEventHandling() {
  console.log("📝 Initializing Event Handling...");

  // 1. CLICK EVENT
  // When the button is clicked, show a message
  const clickBtn = document.getElementById("click-btn");
  const clickMessage = document.getElementById("click-message");
  let clickCount = 0;

  clickBtn.addEventListener("click", function () {
    clickCount++;
    clickMessage.textContent = `🎉 Button clicked ${clickCount} time(s)!`;
    clickMessage.className = "message success";

    // Add a fun animation
    clickBtn.style.transform = "scale(0.95)";
    setTimeout(() => {
      clickBtn.style.transform = "scale(1)";
    }, 150);
  });

  // 2. MOUSE EVENTS
  // When user hovers over the box, show different messages
  const hoverBox = document.getElementById("hover-box");
  const mouseMessage = document.getElementById("mouse-message");

  // Mouse enters the box
  hoverBox.addEventListener("mouseenter", function () {
    mouseMessage.textContent = "🐭 Mouse entered the box!";
    mouseMessage.className = "message success";
  });

  // Mouse leaves the box
  hoverBox.addEventListener("mouseleave", function () {
    mouseMessage.textContent = "👋 Mouse left the box!";
    mouseMessage.className = "message";
  });

  // Mouse is moving inside the box
  hoverBox.addEventListener("mousemove", function (event) {
    const rect = hoverBox.getBoundingClientRect();
    const x = Math.round(event.clientX - rect.left);
    const y = Math.round(event.clientY - rect.top);
    hoverBox.textContent = `Mouse at: (${x}, ${y})`;
  });

  // 3. KEYBOARD EVENT
  // When user types in the input, show what they're typing
  const textInput = document.getElementById("text-input");
  const keyboardMessage = document.getElementById("keyboard-message");

  textInput.addEventListener("input", function () {
    const text = textInput.value;
    if (text.length === 0) {
      keyboardMessage.textContent = "";
    } else {
      keyboardMessage.textContent = `⌨️ You typed: "${text}" (${text.length} characters)`;
      keyboardMessage.className = "message success";
    }
  });

  // Special keyboard event for Enter key
  textInput.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
      keyboardMessage.textContent = "🚀 You pressed Enter! Message sent!";
      keyboardMessage.className = "message success";
      textInput.value = "";
    }
  });
}

// ===== PART 2: INTERACTIVE ELEMENTS =====
// This section creates fun interactive features

function initInteractiveElements() {
  console.log("🎮 Initializing Interactive Elements...");

  // 1. DARK/LIGHT MODE TOGGLE
  initThemeToggle();

  // 2. CLICK COUNTER
  initClickCounter();

  // 3. COLLAPSIBLE FAQ
  initCollapsibleFAQ();

  // 4. DROPDOWN MENU
  initDropdownMenu();

  // 5. TABBED INTERFACE
  initTabbedInterface();
}

// Dark/Light Mode Toggle Feature
function initThemeToggle() {
  const themeToggle = document.getElementById("theme-toggle");
  let isDarkMode = false;

  themeToggle.addEventListener("click", function () {
    isDarkMode = !isDarkMode;

    if (isDarkMode) {
      document.body.classList.add("dark-theme");
      themeToggle.textContent = "☀️ Light Mode";
      console.log("🌙 Switched to Dark Mode");
    } else {
      document.body.classList.remove("dark-theme");
      themeToggle.textContent = "🌙 Dark Mode";
      console.log("☀️ Switched to Light Mode");
    }
  });
}

// Click Counter Feature
function initClickCounter() {
  const counterBtn = document.getElementById("counter-btn");
  const resetBtn = document.getElementById("reset-btn");
  let count = 0;

  counterBtn.addEventListener("click", function () {
    count++;
    counterBtn.textContent = `Count: ${count}`;

    // Change button color based on count
    if (count >= 10) {
      counterBtn.style.backgroundColor = "#e53e3e";
    } else if (count >= 5) {
      counterBtn.style.backgroundColor = "#dd6b20";
    }
  });

  resetBtn.addEventListener("click", function () {
    count = 0;
    counterBtn.textContent = "Count: 0";
    counterBtn.style.backgroundColor = "#667eea";
    console.log("🔄 Counter reset");
  });
}

// Collapsible FAQ Feature
function initCollapsibleFAQ() {
  const faqQuestions = document.querySelectorAll(".faq-question");

  faqQuestions.forEach((question) => {
    question.addEventListener("click", function () {
      const answer = this.nextElementSibling;
      const icon = this.querySelector(".faq-icon");

      // Close all other answers first
      faqQuestions.forEach((otherQuestion) => {
        if (otherQuestion !== this) {
          const otherAnswer = otherQuestion.nextElementSibling;
          const otherIcon = otherQuestion.querySelector(".faq-icon");
          otherAnswer.classList.remove("open");
          otherIcon.classList.remove("rotate");
          otherIcon.textContent = "+";
        }
      });

      // Toggle current answer
      if (answer.classList.contains("open")) {
        answer.classList.remove("open");
        icon.classList.remove("rotate");
        icon.textContent = "+";
      } else {
        answer.classList.add("open");
        icon.classList.add("rotate");
        icon.textContent = "−";
      }
    });
  });
}

// Dropdown Menu Feature
function initDropdownMenu() {
  const dropdownBtn = document.getElementById("dropdown-btn");
  const dropdownContent = document.getElementById("dropdown-content");
  const dropdownMessage = document.getElementById("dropdown-message");
  const dropdownOptions = document.querySelectorAll("#dropdown-content a");

  // Toggle dropdown when button is clicked
  dropdownBtn.addEventListener("click", function () {
    dropdownContent.classList.toggle("show");
  });

  // Handle option selection
  dropdownOptions.forEach((option) => {
    option.addEventListener("click", function (event) {
      event.preventDefault();
      const selectedValue = this.getAttribute("data-value");
      const selectedText = this.textContent;

      dropdownBtn.textContent = `${selectedText} ▼`;
      dropdownContent.classList.remove("show");
      dropdownMessage.textContent = `📚 You selected: ${selectedText}`;
      dropdownMessage.className = "message success";

      console.log(`Selected: ${selectedValue}`);
    });
  });

  // Close dropdown when clicking outside
  document.addEventListener("click", function (event) {
    if (!event.target.matches("#dropdown-btn")) {
      dropdownContent.classList.remove("show");
    }
  });
}

// Tabbed Interface Feature
function initTabbedInterface() {
  const tabButtons = document.querySelectorAll(".tab-button");
  const tabPanels = document.querySelectorAll(".tab-panel");

  tabButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const targetTab = this.getAttribute("data-tab");

      // Remove active class from all buttons and panels
      tabButtons.forEach((btn) => btn.classList.remove("active"));
      tabPanels.forEach((panel) => panel.classList.remove("active"));

      // Add active class to clicked button and corresponding panel
      this.classList.add("active");
      document.getElementById(targetTab).classList.add("active");

      console.log(`🗂️ Switched to tab: ${targetTab}`);
    });
  });
}

// ===== PART 3: FORM VALIDATION =====
// This section handles form validation with custom JavaScript

function initFormValidation() {
  console.log("📋 Initializing Form Validation...");

  const form = document.getElementById("signup-form");
  const successMessage = document.getElementById("success-message");

  // Form fields
  const fullnameInput = document.getElementById("fullname");
  const emailInput = document.getElementById("email");
  const passwordInput = document.getElementById("password");
  const confirmPasswordInput = document.getElementById("confirm-password");
  const ageInput = document.getElementById("age");
  const termsCheckbox = document.getElementById("terms");

  // Error message elements
  const fullnameError = document.getElementById("fullname-error");
  const emailError = document.getElementById("email-error");
  const passwordError = document.getElementById("password-error");
  const confirmPasswordError = document.getElementById(
    "confirm-password-error"
  );
  const ageError = document.getElementById("age-error");
  const termsError = document.getElementById("terms-error");

  // Real-time validation as user types
  fullnameInput.addEventListener("blur", () => validateFullName());
  emailInput.addEventListener("blur", () => validateEmail());
  passwordInput.addEventListener("input", () => validatePassword());
  confirmPasswordInput.addEventListener("blur", () =>
    validateConfirmPassword()
  );
  ageInput.addEventListener("blur", () => validateAge());

  // Form submission
  form.addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent default form submission

    console.log("📝 Form submitted, validating...");

    // Validate all fields
    const isFullNameValid = validateFullName();
    const isEmailValid = validateEmail();
    const isPasswordValid = validatePassword();
    const isConfirmPasswordValid = validateConfirmPassword();
    const isAgeValid = validateAge();
    const isTermsValid = validateTerms();

    // Check if all validations pass
    if (
      isFullNameValid &&
      isEmailValid &&
      isPasswordValid &&
      isConfirmPasswordValid &&
      isAgeValid &&
      isTermsValid
    ) {
      // Hide form and show success message
      form.style.display = "none";
      successMessage.style.display = "block";

      console.log("✅ Form is valid! Account created successfully.");

      // Reset form after 3 seconds
      setTimeout(() => {
        form.style.display = "block";
        successMessage.style.display = "none";
        form.reset();
        clearAllErrors();
        console.log("🔄 Form reset for new submission");
      }, 3000);
    } else {
      console.log("❌ Form validation failed");
    }
  });

  // Validation Functions

  function validateFullName() {
    const name = fullnameInput.value.trim();

    if (name.length === 0) {
      showError(fullnameError, "Full name is required");
      return false;
    } else if (name.length < 2) {
      showError(fullnameError, "Name must be at least 2 characters long");
      return false;
    } else if (!/^[a-zA-Z\s]+$/.test(name)) {
      showError(fullnameError, "Name can only contain letters and spaces");
      return false;
    } else {
      clearError(fullnameError);
      return true;
    }
  }

  function validateEmail() {
    const email = emailInput.value.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (email.length === 0) {
      showError(emailError, "Email is required");
      return false;
    } else if (!emailRegex.test(email)) {
      showError(emailError, "Please enter a valid email address");
      return false;
    } else {
      clearError(emailError);
      return true;
    }
  }

  function validatePassword() {
    const password = passwordInput.value;

    if (password.length === 0) {
      showError(passwordError, "Password is required");
      return false;
    } else if (password.length < 8) {
      showError(passwordError, "Password must be at least 8 characters long");
      return false;
    } else if (!/(?=.*[a-z])/.test(password)) {
      showError(
        passwordError,
        "Password must contain at least one lowercase letter"
      );
      return false;
    } else if (!/(?=.*[A-Z])/.test(password)) {
      showError(
        passwordError,
        "Password must contain at least one uppercase letter"
      );
      return false;
    } else if (!/(?=.*\d)/.test(password)) {
      showError(passwordError, "Password must contain at least one number");
      return false;
    } else {
      clearError(passwordError);
      return true;
    }
  }

  function validateConfirmPassword() {
    const password = passwordInput.value;
    const confirmPassword = confirmPasswordInput.value;

    if (confirmPassword.length === 0) {
      showError(confirmPasswordError, "Please confirm your password");
      return false;
    } else if (password !== confirmPassword) {
      showError(confirmPasswordError, "Passwords do not match");
      return false;
    } else {
      clearError(confirmPasswordError);
      return true;
    }
  }

  function validateAge() {
    const age = parseInt(ageInput.value);

    if (isNaN(age)) {
      showError(ageError, "Age is required");
      return false;
    } else if (age < 13) {
      showError(ageError, "You must be at least 13 years old");
      return false;
    } else if (age > 120) {
      showError(ageError, "Please enter a valid age");
      return false;
    } else {
      clearError(ageError);
      return true;
    }
  }

  function validateTerms() {
    if (!termsCheckbox.checked) {
      showError(termsError, "You must agree to the terms and conditions");
      return false;
    } else {
      clearError(termsError);
      return true;
    }
  }

  // Helper Functions

  function showError(errorElement, message) {
    errorElement.textContent = message;
    errorElement.style.color = "#e53e3e";
  }

  function clearError(errorElement) {
    errorElement.textContent = "";
  }

  function clearAllErrors() {
    clearError(fullnameError);
    clearError(emailError);
    clearError(passwordError);
    clearError(confirmPasswordError);
    clearError(ageError);
    clearError(termsError);
  }
}

// ===== ADDITIONAL UTILITY FUNCTIONS =====

// Function to log messages in a fun way
function logMessage(message, type = "info") {
  const timestamp = new Date().toLocaleTimeString();
  console.log(`[${timestamp}] ${message}`);
}

// Function to show a temporary message
function showTemporaryMessage(element, message, duration = 3000) {
  element.textContent = message;
  element.className = "message success";
  setTimeout(() => {
    element.textContent = "";
    element.className = "message";
  }, duration);
}

// Function to animate an element
function animateElement(element, animation = "pulse") {
  element.style.animation = `${animation} 0.5s ease-in-out`;
  setTimeout(() => {
    element.style.animation = "";
  }, 500);
}

// ===== CONSOLE WELCOME MESSAGE =====
console.log(`
🎉 Welcome to the Interactive Web Page!
📚 This is a JavaScript assignment demonstrating:
   ✅ Event Handling
   ✅ Interactive Elements  
   ✅ Form Validation

🔧 Open the browser developer tools to see console messages
💡 Try interacting with all the elements on the page!
`);

// ===== END OF SCRIPT =====
console.log("✨ All JavaScript features loaded successfully!");
