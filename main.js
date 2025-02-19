document.addEventListener("DOMContentLoaded", function () {
    /* About session Photo come in from left and text come in from right*/
    // Smooth fade-in effect on scroll using Intersection Observer
    const sections = document.querySelectorAll(".about-fade-in");
    const options = {
        threshold: 0.1, // Trigger effect when 10% of the section is visible
        rootMargin: "0px 0px -100px 0px" // Adjusts the trigger point
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("visible"); // Add class when section enters view
            } else {
                entry.target.classList.remove("visible"); // Reapply effect when scrolling up
            }
        });
    }, options);

    sections.forEach(section => {
        observer.observe(section);
    });

    /* Gallery Section: Image slider with auto-slide functionality */
    const track = document.querySelector(".image-track"); // Container for images
    const dots = document.querySelectorAll(".dot"); // Navigation dots
    let currentIndex = 0;  // Current image index
    let totalSlides = dots.length; // Total number of images
    let autoSlideInterval; // Interval reference for auto-slide

    // Function to update the gallery position
    function updateSlide(index) {
        track.style.transform = `translateX(-${index * 50}%)`; // Moves images based on index
        dots.forEach(dot => dot.classList.remove("active"));   // Remove active class from all dots
        dots[index].classList.add("active");                   // Highlight the active dot
    }

    // Auto-slide function to switch images every 3 seconds
    function startAutoSlide() {
        autoSlideInterval = setInterval(() => {
            currentIndex = (currentIndex + 1) % totalSlides; // Loop back to the first slide when reaching the end
            updateSlide(currentIndex);
        }, 3000); // Change every 3 seconds
    }

    // Reset auto-slide when user manually interacts with dots
    function resetAutoSlide() {
        clearInterval(autoSlideInterval);
        startAutoSlide(); // Restart auto-slide
    }

    // Manual dot click event
    dots.forEach((dot, index) => {
        dot.addEventListener("click", function () {
            currentIndex = index;
            updateSlide(currentIndex);
            resetAutoSlide(); // Reset auto-slide timer
        });
    });

    // Initialize first slide and start auto-slide
    updateSlide(currentIndex);
    startAutoSlide();

    /* Gear Section */
     // Typing effect for "Lists" heading
     function typeText(element, text, speed) {
        let i = 0;
        function type() {
            if (i < text.length) {
                element.textContent += text.charAt(i);
                i++;
                setTimeout(type, speed);
            }
        }
        element.textContent = ""; // Clear text before typing starts
        type();
    }

    const listTitle = document.querySelector("#gears-section h2");

    // Observer to trigger typing effect when heading enters viewport
    const titleObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                typeText(listTitle, "Lists", 200);
            }
        });
    }, { threshold: 1 });

    if (listTitle) {
        titleObserver.observe(listTitle);
    }

    // Fly-in effect for list items
    const listItems = document.querySelectorAll("#gears-section .list");

    const listObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.add("visible"); // Add 'visible' class with delay for staggered effect
                }, index * 300);
            } else {
                entry.target.classList.remove("visible"); // Reset when scrolling out
            }
        });
    }, { threshold: 0.1 });

    listItems.forEach(item => listObserver.observe(item));



   /* Preparation Section */
    // Create an intersection observer instance

 
    const preparationObserver = new IntersectionObserver((entries, preparationObserver) => {
        entries.forEach(entry => {
            const preparationSection = entry.target;
            
            if (entry.isIntersecting) {
                // Add 'visible' class when section comes into view
                preparationSection.classList.add('visible');
                
            } else {
                preparationSection.classList.remove('visible'); // Remove class when out of view
            }
        });
    }, {
        threshold: 0.5 // This triggers when 50% of the section is in view
    });

    // Observe the preparation section
    const preparationSection = document.getElementById('preparation-section');
    preparationObserver.observe(preparationSection);

    /*====================== Shoelace Theme Toggle (Dark Mode On and Off) =============================================== */
 
   
    const toggleSwitch = document.getElementById("theme-toggle");

    // Check and apply saved theme preference from local storage
    if (localStorage.getItem("theme") === "dark") {
        document.body.classList.add("dark-mode");
        toggleSwitch.checked = true;
    }

     // Toggle dark mode on theme switch change
    toggleSwitch.addEventListener("sl-change", () => {
        document.body.classList.toggle("dark-mode");

        if (document.body.classList.contains("dark-mode")) {
            localStorage.setItem("theme", "dark");   // Save dark mode preference
        } else {
            localStorage.setItem("theme", "light");  // Save light mode preference
        }
    });

   /*======================  Shoelace Business Hours and Emergency Contact Dialog Box ======================= */
    const dialog = document.querySelector('.dialog-overview'); // Shoelace modal dialog
    const openButton = dialog.nextElementSibling;              // Button to open dialog
    const closeButton = dialog.querySelector('sl-button[slot="footer"]');   // Button to close dialog

    openButton.addEventListener('click', () => dialog.show());     // Open dialog when button is clicked
    closeButton.addEventListener('click', () => dialog.hide());     // Close dialog when button is clicked 
    
});


