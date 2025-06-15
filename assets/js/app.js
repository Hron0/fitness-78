// DOM Content Loaded
document.addEventListener("DOMContentLoaded", () => {
  // Initialize all components
  initNavbar()
  initForms()
  initAnimations()
  initTooltips()

  console.log("Fitness+ website loaded successfully!")
})

// Navbar functionality
function initNavbar() {
  const navbar = document.querySelector(".custom-navbar")

  // Navbar scroll effect
  window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
      navbar.style.backgroundColor = "rgba(0, 0, 0, 0.95)"
    } else {
      navbar.style.backgroundColor = "rgba(0, 0, 0, 0.9)"
    }
  })

  // Mobile menu auto-close
  const navLinks = document.querySelectorAll(".navbar-nav .nav-link")
  const navbarCollapse = document.querySelector(".navbar-collapse")

  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      if (navbarCollapse.classList.contains("show")) {
        const bsCollapse = new bootstrap.Collapse(navbarCollapse)
        bsCollapse.hide()
      }
    })
  })
}

// Form handling
function initForms() {
  // Form validation
  const forms = document.querySelectorAll("form")
  forms.forEach((form) => {
    form.addEventListener("submit", function (e) {
      if (!validateForm(this)) {
        e.preventDefault()
        showAlert("Пожалуйста, заполните все обязательные поля корректно", "danger")
      }
    })
  })

  // Password confirmation validation
  const confirmPasswordField = document.getElementById("confirm_password")
  const passwordField = document.getElementById("password")

  if (confirmPasswordField && passwordField) {
    confirmPasswordField.addEventListener("input", function () {
      if (this.value !== passwordField.value) {
        this.setCustomValidity("Пароли не совпадают")
        this.classList.add("is-invalid")
      } else {
        this.setCustomValidity("")
        this.classList.remove("is-invalid")
      }
    })
  }

  // Phone number formatting
  const phoneInputs = document.querySelectorAll('input[type="tel"]')
  phoneInputs.forEach((input) => {
    input.addEventListener("input", (e) => {
      let value = e.target.value.replace(/\D/g, "")
      if (value.length > 0) {
        if (value.length <= 1) {
          value = "+7 (" + value
        } else if (value.length <= 4) {
          value = "+7 (" + value.substring(1)
        } else if (value.length <= 7) {
          value = "+7 (" + value.substring(1, 4) + ") " + value.substring(4)
        } else if (value.length <= 9) {
          value = "+7 (" + value.substring(1, 4) + ") " + value.substring(4, 7) + "-" + value.substring(7)
        } else {
          value =
            "+7 (" +
            value.substring(1, 4) +
            ") " +
            value.substring(4, 7) +
            "-" +
            value.substring(7, 9) +
            "-" +
            value.substring(9, 11)
        }
      }
      e.target.value = value
    })
  })
}

// Form validation
function validateForm(form) {
  let isValid = true
  const inputs = form.querySelectorAll("input[required], textarea[required], select[required]")

  inputs.forEach((input) => {
    if (!input.value.trim()) {
      input.classList.add("is-invalid")
      isValid = false
    } else {
      input.classList.remove("is-invalid")

      // Email validation
      if (input.type === "email" && !isValidEmail(input.value)) {
        input.classList.add("is-invalid")
        isValid = false
      }

      // Password length validation
      if (input.type === "password" && input.value.length < 6) {
        input.classList.add("is-invalid")
        isValid = false
      }
    }
  })

  return isValid
}

// Email validation
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

// Alert system
function showAlert(message, type = "info", duration = 5000) {
  const alertContainer = document.createElement("div")
  alertContainer.className = `alert alert-${type} alert-dismissible fade show position-fixed`
  alertContainer.style.cssText = "top: 100px; right: 20px; z-index: 9999; min-width: 300px;"

  alertContainer.innerHTML = `
        ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
    `

  document.body.appendChild(alertContainer)

  // Auto remove
  setTimeout(() => {
    if (alertContainer.parentNode) {
      alertContainer.remove()
    }
  }, duration)
}

// Loading state for buttons
function showLoading(button, text = "Загрузка...") {
  const originalText = button.innerHTML
  const originalDisabled = button.disabled

  button.innerHTML = `<span class="spinner-border spinner-border-sm me-2"></span>${text}`
  button.disabled = true

  return function hideLoading() {
    button.innerHTML = originalText
    button.disabled = originalDisabled
  }
}

// Animations
function initAnimations() {
  // Intersection Observer for animations
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("fade-in-up")
        observer.unobserve(entry.target)
      }
    })
  }, observerOptions)

  // Observe elements
  const animatedElements = document.querySelectorAll(
    ".feature-card, .workout-card, .trainer-card, .pricing-card, .stat-item",
  )
  animatedElements.forEach((el) => observer.observe(el))

  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault()
      const target = document.querySelector(this.getAttribute("href"))
      if (target) {
        target.scrollIntoView({
          behavior: "smooth",
          block: "start",
        })
      }
    })
  })
}

// Initialize tooltips
function initTooltips() {
  const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
  tooltipTriggerList.map((tooltipTriggerEl) => new bootstrap.Tooltip(tooltipTriggerEl))
}

// Utility functions
function formatPrice(price) {
  return new Intl.NumberFormat("ru-RU").format(price)
}

function formatDate(date) {
  return new Intl.DateTimeFormat("ru-RU").format(new Date(date))
}

// AJAX helper
function makeRequest(url, options = {}) {
  const defaultOptions = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  }

  return fetch(url, { ...defaultOptions, ...options })
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      return response.json()
    })
    .catch((error) => {
      console.error("Request failed:", error)
      showAlert("Произошла ошибка при выполнении запроса", "danger")
      throw error
    })
}

// Admin functions (if needed)
function updateBookingStatus(bookingId, status) {
  const button = event.target
  const hideLoading = showLoading(button)

  makeRequest("admin_actions.php", {
    method: "POST",
    body: JSON.stringify({
      action: "update_booking_status",
      booking_id: bookingId,
      status: status,
    }),
  })
    .then((data) => {
      hideLoading()
      if (data.success) {
        showAlert(data.message, "success")
        setTimeout(() => location.reload(), 1000)
      } else {
        showAlert(data.message || "Произошла ошибка", "danger")
      }
    })
    .catch(() => {
      hideLoading()
    })
}

function updateMessageStatus(messageId, status) {
  const button = event.target
  const hideLoading = showLoading(button)

  makeRequest("admin_actions.php", {
    method: "POST",
    body: JSON.stringify({
      action: "update_message_status",
      message_id: messageId,
      status: status,
    }),
  })
    .then((data) => {
      hideLoading()
      if (data.success) {
        showAlert(data.message, "success")
        setTimeout(() => location.reload(), 1000)
      } else {
        showAlert(data.message || "Произошла ошибка", "danger")
      }
    })
    .catch(() => {
      hideLoading()
    })
}

// Filter functions for admin
function filterBookings(status) {
  const rows = document.querySelectorAll("#bookingsTable tbody tr")
  rows.forEach((row) => {
    const statusCell = row.querySelector(".booking-status")
    if (status === "all" || statusCell.textContent.trim().toLowerCase() === status) {
      row.style.display = ""
    } else {
      row.style.display = "none"
    }
  })
}

function filterMessages(status) {
  const rows = document.querySelectorAll("#messagesTable tbody tr")
  rows.forEach((row) => {
    const statusCell = row.querySelector(".message-status")
    if (status === "all" || statusCell.textContent.trim().toLowerCase() === status) {
      row.style.display = ""
    } else {
      row.style.display = "none"
    }
  })
}

// Search functionality
function searchTable(tableId, searchTerm) {
  const table = document.getElementById(tableId)
  const rows = table.querySelectorAll("tbody tr")

  rows.forEach((row) => {
    const text = row.textContent.toLowerCase()
    if (text.includes(searchTerm.toLowerCase())) {
      row.style.display = ""
    } else {
      row.style.display = "none"
    }
  })
}

// Performance optimization
function debounce(func, wait) {
  let timeout
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout)
      func(...args)
    }
    clearTimeout(timeout)
    timeout = setTimeout(later, wait)
  }
}

// Error handling
window.addEventListener("error", (e) => {
  console.error("JavaScript error:", e.error)
  showAlert("Произошла ошибка на странице", "danger")
})

// Prevent form double submission
document.addEventListener("submit", (e) => {
  const form = e.target
  const submitButton = form.querySelector('button[type="submit"]')

  if (submitButton && !submitButton.disabled) {
    setTimeout(() => {
      submitButton.disabled = true
      setTimeout(() => {
        submitButton.disabled = false
      }, 3000)
    }, 100)
  }
})
