document.addEventListener("DOMContentLoaded", () => {

    // =====================================================
    // MOBILE MENU
    // =====================================================

    const menuToggle = document.querySelector(".menu-toggle");
    const mobileMenu = document.querySelector(".mobile-menu");
    const mobileLinks = document.querySelectorAll(".mobile-nav a");

    if (menuToggle && mobileMenu) {

        const openMenu = () => {

            menuToggle.classList.add("active");
            mobileMenu.classList.add("active");

            document.body.classList.add("menu-open");

            menuToggle.setAttribute("aria-expanded", "true");
            menuToggle.setAttribute(
                "aria-label",
                "Close navigation menu"
            );

        };

        const closeMenu = () => {

            menuToggle.classList.remove("active");
            mobileMenu.classList.remove("active");

            document.body.classList.remove("menu-open");

            menuToggle.setAttribute("aria-expanded", "false");
            menuToggle.setAttribute(
                "aria-label",
                "Open navigation menu"
            );

        };

        menuToggle.addEventListener("click", () => {

            const isOpen =
                mobileMenu.classList.contains("active");

            if (isOpen) {
                closeMenu();
            } else {
                openMenu();
            }

        });

        mobileLinks.forEach((link) => {

            link.addEventListener("click", () => {
                closeMenu();
            });

        });

        document.addEventListener("keydown", (event) => {

            if (
                event.key === "Escape" &&
                mobileMenu.classList.contains("active")
            ) {
                closeMenu();
            }

        });

        window.addEventListener("resize", () => {

            if (window.innerWidth > 1100) {
                closeMenu();
            }

        });

    }



    // =====================================================
    // CONTACT FORM
    // =====================================================

    const contactForm = document.getElementById("contactForm");
    const formSuccessMessage =
        document.getElementById("formSuccessMessage");
    const phoneInput =
        document.getElementById("phone");


    // =============================
    // PHONE NUMBER
    // NUMBERS ONLY
    // =============================

    if (phoneInput) {

        phoneInput.addEventListener("input", () => {

            phoneInput.value =
                phoneInput.value.replace(/\D/g, "");

            phoneInput.setCustomValidity("");

        });

    }


    // =============================
    // CONTACT FORM SUBMIT
    // =============================

    if (contactForm) {

        contactForm.addEventListener("submit", (event) => {

            event.preventDefault();


            // Normal HTML validation
            if (!contactForm.checkValidity()) {

                contactForm.reportValidity();

                return;

            }


            // Lebanese phone validation
            if (phoneInput) {

                const phone =
                    phoneInput.value.trim();

                const lebanesePhonePattern =
                    /^\d{7,8}$/;

                if (!lebanesePhonePattern.test(phone)) {

                    phoneInput.setCustomValidity(
                        "Please enter a valid Lebanese phone number."
                    );

                    phoneInput.reportValidity();

                    return;

                }

                phoneInput.setCustomValidity("");

            }


            // Show success message
            if (formSuccessMessage) {

                formSuccessMessage.classList.add("show");

            }


            // Reset form
            contactForm.reset();


            // Scroll to success message
            if (formSuccessMessage) {

                formSuccessMessage.scrollIntoView({
                    behavior: "smooth",
                    block: "nearest"
                });

            }

        });

    }



    // =====================================================
    // HIDE SUCCESS MESSAGE
    // WHEN USER STARTS TYPING AGAIN
    // =====================================================

    if (contactForm && formSuccessMessage) {

        const formFields =
            contactForm.querySelectorAll(
                "input, textarea"
            );

        formFields.forEach((field) => {

            field.addEventListener("input", () => {

                if (
                    formSuccessMessage.classList.contains("show")
                ) {
                    formSuccessMessage.classList.remove("show");
                }

            });

        });

    }



    // =====================================================
    // IMPACT COUNTER REVEAL
    // =====================================================

    const impactSection =
        document.querySelector(".impact-counter-section");

    if (impactSection) {

        const impactObserver = new IntersectionObserver(
            (entries, observer) => {

                entries.forEach((entry) => {

                    if (entry.isIntersecting) {

                        impactSection.classList.add("reveal");

                        observer.unobserve(entry.target);

                    }

                });

            },
            {
                threshold: 0.25
            }
        );

        impactObserver.observe(impactSection);

    }

});

// =====================================================
// RESOURCES ACCORDION
// =====================================================

const resourceItems =
    document.querySelectorAll(".resource-item");

resourceItems.forEach((item) => {

    const toggle =
        item.querySelector(".resource-toggle");

    if (!toggle) {
        return;
    }

    toggle.addEventListener("click", () => {

        const isOpen =
            item.classList.contains("active");


        // Close all other resources
        resourceItems.forEach((otherItem) => {

            if (otherItem !== item) {

                otherItem.classList.remove("active");

                const otherToggle =
                    otherItem.querySelector(".resource-toggle");

                if (otherToggle) {

                    otherToggle.setAttribute(
                        "aria-expanded",
                        "false"
                    );

                }

            }

        });


        // Toggle selected resource
        item.classList.toggle("active", !isOpen);

        toggle.setAttribute(
            "aria-expanded",
            String(!isOpen)
        );

    });

});

// =====================================================
// FACTS & FIGURES
// REVEAL + COUNT UP
// =====================================================

const factsSection =
    document.querySelector(".facts-section");

if (factsSection) {

    let factsAnimated = false;


    // =============================
    // NUMBER ANIMATION
    // =============================

    const animateNumber = (element) => {

        const target =
            Number(element.dataset.target);

        const duration = 1600;

        const startTime =
            performance.now();


        const updateNumber = (currentTime) => {

            const elapsed =
                currentTime - startTime;

            const progress =
                Math.min(elapsed / duration, 1);


            // Smooth easing
            const easedProgress =
                1 - Math.pow(1 - progress, 3);


            const currentValue =
                Math.floor(
                    target * easedProgress
                );


            element.textContent =
                currentValue.toLocaleString();


            if (progress < 1) {

                requestAnimationFrame(
                    updateNumber
                );

            } else {

                element.textContent =
                    target.toLocaleString();

            }

        };


        requestAnimationFrame(
            updateNumber
        );

    };


    // =============================
    // OBSERVER
    // =============================

    const factsObserver =
        new IntersectionObserver(

            (entries, observer) => {

                entries.forEach((entry) => {

                    if (
                        entry.isIntersecting &&
                        !factsAnimated
                    ) {

                        factsAnimated = true;

                        factsSection.classList.add(
                            "reveal"
                        );


                        const numbers =
                            factsSection.querySelectorAll(
                                ".fact-number"
                            );


                        numbers.forEach(
                            (number) => {

                                animateNumber(number);

                            }
                        );


                        observer.unobserve(
                            entry.target
                        );

                    }

                });

            },

            {
                threshold: 0.25
            }

        );


    factsObserver.observe(
        factsSection
    );

}