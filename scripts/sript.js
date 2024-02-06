// Adding smooth scrolling to anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

const tabs = document.querySelectorAll('.container button');
const contentTabs = document.querySelectorAll('.tab');

tabs.forEach(tab => {
    tab.addEventListener('click', () => {
        const tabId = tab.dataset.tab;
        const contentTab = document.getElementById(tabId);

        // Remove active class from all buttons
        tabs.forEach(tab => tab.classList.remove('active'));

        // Add active class to clicked button
        tab.classList.add('active');

        // Hide all content tabs
        contentTabs.forEach(tab => tab.style.opacity = 0);

        // Show clicked content tab
        contentTab.style.opacity = 1; // Make the tab visible
    });
});

document.addEventListener('DOMContentLoaded', function () {
  const testimonialsContainer = document.querySelector('.testimonial-carousel');
  const testimonials = document.querySelectorAll('.testimonial');
  const indicators = document.querySelectorAll('.indicator');
  let currentIndex = 0;

  function showTestimonial(index) {
      const newPosition = -index * 100 + '%';
      testimonialsContainer.style.transform = 'translateX(' + newPosition + ')';
  }

  function updateIndicators() {
      indicators.forEach((indicator, index) => {
          indicator.classList.toggle('active', index === currentIndex);
      });
  }

  function nextTestimonial() {
      currentIndex = (currentIndex + 1) % testimonials.length;
      showTestimonial(currentIndex);
      updateIndicators();
  }

  function prevTestimonial() {
      currentIndex = (currentIndex - 1 + testimonials.length) % testimonials.length;
      showTestimonial(currentIndex);
      updateIndicators();
  }

  function autoSlide() {
      nextTestimonial();
  }

  // Show the first testimonial and update indicators on page load
  showTestimonial(currentIndex);
  updateIndicators();

  // Set up event listeners for next and previous buttons
  document.getElementById('prevTestimonial').addEventListener('click', prevTestimonial);
  document.getElementById('nextTestimonial').addEventListener('click', nextTestimonial);

  // Set up interval for auto sliding
  const intervalId = setInterval(autoSlide, 5000); // Adjust the interval as needed

  // Pause auto sliding when mouse enters the testimonial carousel
  testimonialsContainer.addEventListener('mouseenter', () => clearInterval(intervalId));

  // Resume auto sliding when mouse leaves the testimonial carousel
  testimonialsContainer.addEventListener('mouseleave', () => {
      clearInterval(intervalId);
      intervalId = setInterval(autoSlide, 5000); // Adjust the interval as needed
  });

  // Set up event listeners for navigation indicators
  indicators.forEach((indicator, index) => {
      indicator.addEventListener('click', () => {
          currentIndex = index;
          showTestimonial(currentIndex);
          updateIndicators();
      });
  });
});