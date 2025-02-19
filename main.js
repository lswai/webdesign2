document.addEventListener("DOMContentLoaded", function () {
    /* About session Photo come in from left and text come in from right*/
    // Smooth fade-in effect on scroll
    const sections = document.querySelectorAll(".about-fade-in");
    const options = {
        threshold: 0.1,
        rootMargin: "0px 0px -100px 0px"
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("visible");
            } else {
                entry.target.classList.remove("visible"); // Reapply effect when scrolling up
            }
        });
    }, options);

    sections.forEach(section => {
        observer.observe(section);
    });

    /* Gallery Section */
    const track = document.querySelector(".image-track");
    const dots = document.querySelectorAll(".dot");
    let currentIndex = 0;
    let totalSlides = dots.length;
    let autoSlideInterval;

    // Function to update the gallery position
    function updateSlide(index) {
        track.style.transform = `translateX(-${index * 50}%)`; // Moves images based on index
        dots.forEach(dot => dot.classList.remove("active"));
        dots[index].classList.add("active");
    }

    // Auto-slide function
    function startAutoSlide() {
        autoSlideInterval = setInterval(() => {
            currentIndex = (currentIndex + 1) % totalSlides; // Loop back to the first slide
            updateSlide(currentIndex);
        }, 3000); // Change every 3 seconds
    }

    // Stop auto-slide temporarily when user interacts
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
                    entry.target.classList.add("visible");
                }, index * 300);
            } else {
                entry.target.classList.remove("visible"); // Reset when scrolling out
            }
        });
    }, { threshold: 0.1 });

    listItems.forEach(item => listObserver.observe(item));



   /* Preparation */
    // Create an intersection observer instance

 
    const preparationObserver = new IntersectionObserver((entries, preparationObserver) => {
        entries.forEach(entry => {
            const preparationSection = entry.target;
            
            if (entry.isIntersecting) {
                // Add 'visible' class when section comes into view
                preparationSection.classList.add('visible');
                
            } else {
                preparationSection.classList.remove('visible');
            }
        });
    }, {
        threshold: 0.5 // This triggers when 50% of the section is in view
    });

    // Observe the preparation section
    const preparationSection = document.getElementById('preparation-section');
    preparationObserver.observe(preparationSection);

    // Shoelace 
 
   
    const toggleSwitch = document.getElementById("theme-toggle");

    // Check local storage for theme preference
    if (localStorage.getItem("theme") === "dark") {
        document.body.classList.add("dark-mode");
        toggleSwitch.checked = true;
    }

    toggleSwitch.addEventListener("sl-change", () => {
        document.body.classList.toggle("dark-mode");

        if (document.body.classList.contains("dark-mode")) {
            localStorage.setItem("theme", "dark");
        } else {
            localStorage.setItem("theme", "light");
        }
    });

   // Shoelace Business Hours and Emergency Contact
    const dialog = document.querySelector('.dialog-overview');
    const openButton = dialog.nextElementSibling;
    const closeButton = dialog.querySelector('sl-button[slot="footer"]');

    openButton.addEventListener('click', () => dialog.show());
    closeButton.addEventListener('click', () => dialog.hide());
    




});


