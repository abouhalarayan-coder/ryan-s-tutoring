// Available times
const availableTimes = ["17:00", "18:00", "19:00", "20:00", "21:00"];
const dateInput = document.getElementById("date");
const timeSelect = document.getElementById("time");
const bookingForm = document.getElementById("bookingForm");
const bookingMessage = document.getElementById("bookingMessage");

// Populate times on date change
if (dateInput && timeSelect) {
  dateInput.addEventListener("change", () => {
    timeSelect.innerHTML = '<option value="">Select a time</option>';
    availableTimes.forEach(time => {
      const opt = document.createElement("option");
      opt.value = time;
      opt.textContent = formatTime(time);
      timeSelect.appendChild(opt);
    });
  });
}

// Booking form submit (with EmailJS)
if (bookingForm) {
  bookingForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const date = dateInput.value;
    const time = timeSelect.value;
    const message = document.getElementById("message").value.trim();

    if (!name || !email || !date || !time) {
      bookingMessage.textContent = "⚠️ Please fill in all required fields.";
      bookingMessage.style.color = "red";
      return;
    }

    const btn = bookingForm.querySelector("button");
    btn.disabled = true;
    btn.textContent = "Booking...";

    // Send email using EmailJS
    emailjs.send("service_k6xeyr5", "template_iq6j6qf", {
      name: name,
      email: email,
      date: date,
      time: formatTime(time),
      message: message
    })
    .then(() => {
      bookingMessage.textContent = `✅ Thank you ${name}! Your lesson is booked for ${date} at ${formatTime(time)}. A confirmation email has been sent.`;
      bookingMessage.style.color = "green";
      bookingForm.reset();
      timeSelect.innerHTML = '<option value="">Select a time</option>';
    })
    .catch((err) => {
      console.error("EmailJS Error:", err);
      bookingMessage.textContent = "❌ Something went wrong. Please try again.";
      bookingMessage.style.color = "red";
    })
    .finally(() => {
      btn.disabled = false;
      btn.textContent = "Confirm Booking";
    });
  });
}

// Format time to AM/PM
function formatTime(time) {
  let [h, m] = time.split(":");
  h = parseInt(h);
  const suffix = h >= 12 ? "PM" : "AM";
  h = ((h + 11) % 12) + 1;
  return `${h}:${m} ${suffix}`;
}

// Hero animation
window.addEventListener("DOMContentLoaded", () => {
  const heroContent = document.querySelector(".hero-content");
  const heroImageWrap = document.querySelector(".hero-image-wrap");
  if (heroContent) heroContent.classList.add("animate");
  if (heroImageWrap) heroImageWrap.classList.add("animate");

  // Section fade-in on scroll
  const sections = document.querySelectorAll("section, main.section");
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) entry.target.classList.add("animate");
    });
  }, { threshold: 0.2 });
  sections.forEach(sec => observer.observe(sec));
});
