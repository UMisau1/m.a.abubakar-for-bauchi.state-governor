/* ==========================================
   M.A. CAMPAIGN WEBSITE
   main.js
========================================== */


/* ==========================================
   PAGE LOADER
========================================== */

window.addEventListener("load", () => {

    const loader = document.getElementById("loader");

    if (loader) {

        loader.classList.add("loader-hidden");

        setTimeout(() => {

            loader.remove();

        }, 600);

    }

});


/* ==========================================
   STICKY NAVBAR
========================================== */

const navbar = document.querySelector(".navbar");

window.addEventListener("scroll", () => {

    if (!navbar) return;

    if (window.scrollY > 80) {

        navbar.classList.add("sticky");

    } else {

        navbar.classList.remove("sticky");

    }

});


/* ==========================================
   MOBILE MENU
========================================== */

const menuToggle = document.querySelector(".menu-toggle");
const navMenu = document.querySelector(".nav-menu");

if (menuToggle && navMenu) {

    menuToggle.addEventListener("click", () => {

        navMenu.classList.toggle("active");

        menuToggle.classList.toggle("active");

    });

}


/* ==========================================
   MOBILE DROPDOWN MENU
========================================== */

const dropdowns = document.querySelectorAll(".nav-menu .dropdown");

dropdowns.forEach(dropdown => {

    const dropdownLink = dropdown.querySelector(":scope > a");

    if (!dropdownLink) return;

    dropdownLink.addEventListener("click", (e) => {

        if (window.innerWidth <= 991) {

            e.preventDefault();

            /* Close other dropdowns */

            dropdowns.forEach(otherDropdown => {

                if (otherDropdown !== dropdown) {

                    otherDropdown.classList.remove("active");

                }

            });

            /* Toggle selected dropdown */

            dropdown.classList.toggle("active");

        }

    });

});


/* ==========================================
   CLOSE MOBILE MENU AFTER NORMAL LINK CLICK
========================================== */

document.querySelectorAll(".nav-menu > li > a").forEach(link => {

    link.addEventListener("click", () => {

        if (window.innerWidth <= 991) {

            const parent = link.parentElement;

            /* Do not close menu for dropdown links */

            if (parent && parent.classList.contains("dropdown")) {

                return;

            }

            if (navMenu) {

                navMenu.classList.remove("active");

            }

            if (menuToggle) {

                menuToggle.classList.remove("active");

            }

        }

    });

});


/* ==========================================
   CLOSE MOBILE MENU AFTER SUBMENU LINK
========================================== */

document.querySelectorAll(".dropdown-menu a").forEach(link => {

    link.addEventListener("click", () => {

        if (window.innerWidth <= 991) {

            if (navMenu) {

                navMenu.classList.remove("active");

            }

            if (menuToggle) {

                menuToggle.classList.remove("active");

            }

            dropdowns.forEach(dropdown => {

                dropdown.classList.remove("active");

            });

        }

    });

});


/* ==========================================
   BACK TO TOP
========================================== */

const backToTop = document.getElementById("backToTop");

if (backToTop) {

    window.addEventListener("scroll", () => {

        if (window.scrollY > 500) {

            backToTop.classList.add("show");

        } else {

            backToTop.classList.remove("show");

        }

    });


    backToTop.addEventListener("click", () => {

        window.scrollTo({

            top: 0,

            behavior: "smooth"

        });

    });

}


/* ==========================================
   SMOOTH SCROLL
========================================== */

document.querySelectorAll('a[href^="#"]').forEach(anchor => {

    anchor.addEventListener("click", function (e) {

        const href = this.getAttribute("href");

        if (!href || href === "#") return;

        const target = document.querySelector(href);

        if (target) {

            e.preventDefault();

            target.scrollIntoView({

                behavior: "smooth",

                block: "start"

            });

        }

    });

});


/* ==========================================
   ACTIVE NAVIGATION
========================================== */

const sections = document.querySelectorAll("section[id]");

window.addEventListener("scroll", () => {

    let current = "";

    sections.forEach(section => {

        const sectionTop = section.offsetTop - 120;

        const sectionHeight = section.offsetHeight;

        if (
            window.scrollY >= sectionTop &&
            window.scrollY < sectionTop + sectionHeight
        ) {

            current = section.getAttribute("id");

        }

    });


    document.querySelectorAll(".nav-menu > li > a").forEach(link => {

        link.classList.remove("active");

        if (link.getAttribute("href") === "#" + current) {

            link.classList.add("active");

        }

    });

});


/* ==========================================
   SCROLL ANIMATION
========================================== */

const revealElements = document.querySelectorAll(
    ".section-title,.card,.news-card,.gallery-item,.event-card,.contact-card,.benefit-card"
);


const revealOnScroll = () => {

    const trigger = window.innerHeight * 0.85;

    revealElements.forEach(element => {

        const top = element.getBoundingClientRect().top;

        if (top < trigger) {

            element.classList.add("show");

        }

    });

};


window.addEventListener("scroll", revealOnScroll);

window.addEventListener("load", revealOnScroll);


/* ==========================================
   COUNTER ANIMATION
========================================== */

const counters = document.querySelectorAll("[data-counter]");

const startCounter = (counter) => {

    const target = parseInt(
        counter.getAttribute("data-counter")
    );

    const speed = 200;

    let count = 0;

    const updateCounter = () => {

        const increment = Math.ceil(target / speed);

        if (count < target) {

            count += increment;

            if (count > target) {

                count = target;

            }

            counter.innerText = count.toLocaleString();

            requestAnimationFrame(updateCounter);

        } else {

            counter.innerText = target.toLocaleString();

        }

    };

    updateCounter();

};


if ("IntersectionObserver" in window) {

    const counterObserver = new IntersectionObserver(
        (entries) => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    startCounter(entry.target);

                    counterObserver.unobserve(entry.target);

                }

            });

        },
        {
            threshold: 0.5
        }
    );


    counters.forEach(counter => {

        counterObserver.observe(counter);

    });

} else {

    counters.forEach(counter => {

        startCounter(counter);

    });

}


/* ==========================================
   CURRENT YEAR
========================================== */

const year = document.getElementById("currentYear");

if (year) {

    year.textContent = new Date().getFullYear();

}


/* ==========================================
   PREVENT EMPTY LINKS
========================================== */

document.querySelectorAll('a[href="#"]').forEach(link => {

    link.addEventListener("click", function (e) {

        /*
           Dropdown links are handled separately
           on mobile.
        */

        const parent = this.parentElement;

        if (
            window.innerWidth > 991 ||
            !parent ||
            !parent.classList.contains("dropdown")
        ) {

            e.preventDefault();

        }

    });

});


/* ==========================================
   RESET MOBILE MENU ON DESKTOP
========================================== */

window.addEventListener("resize", () => {

    if (window.innerWidth > 991) {

        if (navMenu) {

            navMenu.classList.remove("active");

        }

        if (menuToggle) {

            menuToggle.classList.remove("active");

        }

        dropdowns.forEach(dropdown => {

            dropdown.classList.remove("active");

        });

    }

});

/* ==========================================
   MOBILE DROPDOWN MENU
========================================== */

document.querySelectorAll(".nav-menu .dropdown > a").forEach(link => {

    link.addEventListener("click", function(e) {

        if (window.innerWidth <= 991) {

            e.preventDefault();

            const dropdown = this.parentElement;

            dropdown.classList.toggle("active");

        }

    });

});

/* ==========================================
   END OF MAIN.JS
========================================== */