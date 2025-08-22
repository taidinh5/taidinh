
// Dark/Light Mode Toggle
const toggleBtn = document.getElementById('mode-toggle');
const body = document.body;

// Load saved mode - default to dark mode
if (localStorage.getItem('theme') === 'light') {
  body.classList.remove('dark');
  updateThemeLabels('light');
} else {
  // Default to dark mode if no preference saved
  body.classList.add('dark');
  localStorage.setItem('theme', 'dark');
  updateThemeLabels('dark');
}

// Toggle mode
toggleBtn.addEventListener('click', () => {
  body.classList.toggle('dark');

  if (body.classList.contains('dark')) {
    localStorage.setItem('theme', 'dark');
    updateThemeLabels('dark');
  } else {
    localStorage.setItem('theme', 'light');
    updateThemeLabels('light');
  }
});

// Function to update theme labels and icons
function updateThemeLabels(theme) {
  const darkLabel = document.querySelector('.dark-label');
  const lightLabel = document.querySelector('.light-label');
  const moonIcon = document.getElementById('moon-icon');
  const sunIcon = document.getElementById('sun-icon');
  
  if (darkLabel && lightLabel) {
    if (theme === 'dark') {
      lightLabel.classList.add('active');
      darkLabel.classList.remove('active');
      // Show moon icon for dark mode
      if (moonIcon && sunIcon) {
        moonIcon.style.display = 'block';
        sunIcon.style.display = 'none';
      }
    } else {
      darkLabel.classList.add('active');
      lightLabel.classList.remove('active');
      // Show sun icon for light mode
      if (moonIcon && sunIcon) {
        moonIcon.style.display = 'none';
        sunIcon.style.display = 'block';
      }
    }
  }
}

// Typing Animation
const typingText = document.getElementById('typing-text');
const phrases = [
  "Welcome to my portfolio!",
  "Seeking data analyst roles"
];

let phraseIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typingSpeed = 100;

function typeWriter() {
  const currentPhrase = phrases[phraseIndex];
  
  if (isDeleting) {
    typingText.textContent = currentPhrase.substring(0, charIndex - 1);
    charIndex--;
    typingSpeed = 50;
  } else {
    typingText.textContent = currentPhrase.substring(0, charIndex + 1);
    charIndex++;
    typingSpeed = 100;
  }

  if (!isDeleting && charIndex === currentPhrase.length) {
    // Pause at end of phrase
    typingSpeed = 2000;
    isDeleting = true;
  } else if (isDeleting && charIndex === 0) {
    // Move to next phrase
    isDeleting = false;
    phraseIndex = (phraseIndex + 1) % phrases.length;
    typingSpeed = 500;
  }

  setTimeout(typeWriter, typingSpeed);
}

// Start typing animation when page loads
window.addEventListener('load', () => {
  setTimeout(typeWriter, 1000);
  updateCurrentTime();
});

// Update current time function
function updateCurrentTime() {
  const timeElement = document.getElementById('current-time');
  if (timeElement) {
    const now = new Date();
    const easternTime = new Date(now.toLocaleString("en-US", {timeZone: "America/New_York"}));
    const timeString = easternTime.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
      timeZone: 'America/New_York'
    });
    timeElement.textContent = `${timeString} (GMT-5:00 Eastern Time)`;
  }
}

// Update time every minute
setInterval(updateCurrentTime, 60000);



// Navigation highlighting
const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('section');

function updateActiveNav() {
  let current = '';
  
  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;
    
    if (window.pageYOffset >= sectionTop - 200) {
      current = section.getAttribute('id');
    }
  });

  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === `#${current}`) {
      link.classList.add('active');
    }
  });
}

// Update navigation on scroll
window.addEventListener('scroll', updateActiveNav);

// Smooth scrolling for navigation links
navLinks.forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    const targetId = link.getAttribute('href');
    const targetSection = document.querySelector(targetId);
    
    if (targetSection) {
      targetSection.scrollIntoView({
        behavior: 'smooth'
      });
    }
  });
});

// Simple Parallax Effect on Hero Background and Space Objects
const hero = document.querySelector('.hero');
if (hero) {
  console.log('Hero section found, setting up parallax');
  
  hero.addEventListener('mousemove', (e) => {
    const moveX = (e.clientX - window.innerWidth / 2) * 0.03; // Increased from 0.01 to 0.03
    const moveY = (e.clientY - window.innerHeight / 2) * 0.03; // Increased from 0.01 to 0.03
    
    // Apply parallax to space objects with different speeds for depth effect
    const spaceObjects = hero.querySelectorAll('.space-object');
    console.log(`Moving ${spaceObjects.length} space objects by X:${moveX.toFixed(2)}, Y:${moveY.toFixed(2)}`);
    
    spaceObjects.forEach((obj, index) => {
      const depth = (index + 1) * 0.4; // Increased from 0.15 to 0.4 for stronger effect
      const objMoveX = moveX * depth;
      const objMoveY = moveY * depth;
      
      // Apply parallax transform
      obj.style.transform = `translate(${objMoveX}px, ${objMoveY}px)`;
    });
  });
  
  // Reset transforms when mouse leaves hero section
  hero.addEventListener('mouseleave', () => {
    console.log('Mouse left hero section, resetting transforms');
    const spaceObjects = hero.querySelectorAll('.space-object');
    spaceObjects.forEach((obj) => {
      obj.style.transform = 'translate(0px, 0px)';
    });
  });
} else {
  console.log('Hero section not found');
}

// Email Popup Functionality
const emailIcon = document.getElementById('email-icon');
const emailPopup = document.getElementById('email-popup');
const copyBtn = document.getElementById('copy-btn');

// Show popup when email icon is clicked
emailIcon.addEventListener('click', (e) => {
  e.preventDefault();
  emailPopup.classList.add('show');
});

// Hide popup when clicking outside
document.addEventListener('click', (e) => {
  if (!emailPopup.contains(e.target) && !emailIcon.contains(e.target)) {
    emailPopup.classList.remove('show');
  }
});

// Copy email to clipboard
copyBtn.addEventListener('click', async () => {
  try {
    await navigator.clipboard.writeText('taidinh5@outlook.com');
    
    // Visual feedback
    const originalText = copyBtn.innerHTML;
    copyBtn.innerHTML = `
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
        <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
      </svg>
    `;
    
    setTimeout(() => {
      copyBtn.innerHTML = originalText;
    }, 2000);
    
  } catch (err) {
    console.error('Failed to copy email:', err);
  }
});

// Credential Modal Functionality
const credentialModal = document.getElementById('credential-modal');
const credentialImage = document.getElementById('credential-image');
const closeModal = document.querySelector('.close-modal');
const viewCredentialBtns = document.querySelectorAll('.view-credential-btn');

// Show modal when credential button is clicked
viewCredentialBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    const certType = btn.getAttribute('data-cert');
    let imagePath = '';
    
    switch(certType) {
      case 'googcert':
        imagePath = 'img/googcert.png';
        break;
      case 'aofcert':
        imagePath = 'img/aofcert.png';
        break;
      case 'bacert':
        imagePath = 'img/bacert.png';
        break;
      default:
        imagePath = 'img/googcert.png';
    }
    
    credentialImage.src = imagePath;
    credentialModal.style.display = 'block';
    document.body.style.overflow = 'hidden'; // Prevent background scrolling
  });
});

// Close modal when X is clicked
closeModal.addEventListener('click', () => {
  credentialModal.style.display = 'none';
  document.body.style.overflow = 'auto'; // Restore scrolling
});

// Close modal when clicking outside the modal content
credentialModal.addEventListener('click', (e) => {
  if (e.target === credentialModal) {
    credentialModal.style.display = 'none';
    document.body.style.overflow = 'auto';
  }
});

// Close modal with Escape key
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && credentialModal.style.display === 'block') {
    credentialModal.style.display = 'none';
    document.body.style.overflow = 'auto';
  }
});

// Custom Rocket Scrollbar
const rocketScrollbar = document.getElementById('rocket-scrollbar');
const customScrollbar = document.querySelector('.custom-scrollbar');
let lastScrollTop = 0;

window.addEventListener('scroll', () => {
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  const scrollDirection = scrollTop > lastScrollTop ? 1 : -1;
  
  // Calculate scrollbar position - make it follow exactly
  const windowHeight = window.innerHeight;
  const documentHeight = document.documentElement.scrollHeight;
  const scrollPercentage = scrollTop / (documentHeight - windowHeight);
  
  // Position the rocket scrollbar to match scroll position exactly
  const scrollbarHeight = windowHeight; // Use viewport height
  const rocketHeight = 40; // Rocket height
  const maxTop = scrollbarHeight - rocketHeight;
  const newTop = scrollPercentage * maxTop;
  
  rocketScrollbar.style.top = `${newTop}px`;
  
  // Rotate rocket based on scroll direction
  const rotation = scrollDirection === 1 ? 45 : -45;
  rocketScrollbar.style.transform = `rotate(${rotation}deg)`;
  
  lastScrollTop = scrollTop;
});

// Make rocket clickable to scroll to top
rocketScrollbar.addEventListener('click', () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
});

// Initialize rocket position on page load
window.addEventListener('load', () => {
  // Trigger scroll event to position rocket correctly
  window.dispatchEvent(new Event('scroll'));
});

// Project Filtering Functionality
const filterBtns = document.querySelectorAll('.filter-btn');
const projectItems = document.querySelectorAll('.project-item');

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    // Remove active class from all buttons
    filterBtns.forEach(b => b.classList.remove('active'));
    // Add active class to clicked button
    btn.classList.add('active');
    
    const filterValue = btn.getAttribute('data-filter');
    
    // Filter projects with smooth transitions
    projectItems.forEach(item => {
      const category = item.getAttribute('data-category');
      
      if (filterValue === 'all' || category === filterValue) {
        // Show item
        item.classList.remove('hidden');
        // Reset any inline styles to maintain proper layout
        setTimeout(() => {
          item.style.opacity = '';
          item.style.transform = '';
          item.style.display = '';
        }, 50);
      } else {
        // Hide item with smooth transition
        item.style.opacity = '0';
        item.style.transform = 'scale(0.8)';
        
        setTimeout(() => {
          item.classList.add('hidden');
        }, 200); // Wait for opacity transition
      }
    });
  });
});

// Contact Form Handling
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
  contactForm.addEventListener('submit', async function(e) {
    e.preventDefault();
    
    const submitBtn = this.querySelector('.send-message-btn');
    const originalText = submitBtn.querySelector('span').textContent;
    
    // Show submitting state
    this.classList.add('submitting');
    submitBtn.querySelector('span').textContent = 'Sending...';
    submitBtn.disabled = true;
    
    try {
      // Get form data
      const formData = new FormData(this);
      
      // Submit to Formspree
      const response = await fetch('https://formspree.io/f/xblkndrj', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.get('fullName'),
          email: formData.get('email'),
          subject: formData.get('subject'),
          message: formData.get('message')
        })
      });
      
      if (response.ok) {
        // Success
        this.classList.remove('submitting');
        this.classList.add('success');
        submitBtn.querySelector('span').textContent = 'Message Sent!';
        
        // Reset form
        this.reset();
        
        // Reset button after 3 seconds
        setTimeout(() => {
          this.classList.remove('success');
          submitBtn.querySelector('span').textContent = originalText;
          submitBtn.disabled = false;
        }, 3000);
      } else {
        throw new Error('Submission failed');
      }
    } catch (error) {
      // Error
      this.classList.remove('submitting');
      this.classList.add('error');
      submitBtn.querySelector('span').textContent = 'Error! Try Again';
      
      // Reset button after 3 seconds
      setTimeout(() => {
        this.classList.remove('error');
        submitBtn.querySelector('span').textContent = originalText;
        submitBtn.disabled = false;
      }, 3000);
    }
  });
}
