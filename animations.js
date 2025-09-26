//NAME TYPING
document.addEventListener('DOMContentLoaded', function() {
    var typed = new Typed('#typed-name', {
        strings: ["Ajay<br>Ramsaran"],
        startDelay: 1000,
        typeSpeed: 35,
        cursorChar: "_"
        });
    });


    //ON SCROLL DELAY
AOS.init({
    duration: 1000, // how long animations last
    once: true      // animate only the first time
});

    //NAVIGATION
document.addEventListener("DOMContentLoaded", () => {
    const stickyNav = document.getElementById("stickyNav");
    const hero = document.getElementById("hero");
    const menuToggle = document.getElementById("menuToggle");
    const navMenu = document.getElementById("navMenu");
    const navLinks = navMenu.querySelectorAll("a");

    // Fade nav in/out
    window.addEventListener("scroll", () => {
    const heroBottom = hero.offsetTop + hero.offsetHeight;
    if (window.scrollY > heroBottom - 50) {
        stickyNav.classList.remove("opacity-0", "pointer-events-none");
        stickyNav.classList.add("opacity-100");
    } else {
        stickyNav.classList.add("opacity-0", "pointer-events-none");
        stickyNav.classList.remove("opacity-100");
    }
    });

    // Toggle dropdown with animation
    menuToggle.addEventListener("click", () => {
    if (navMenu.classList.contains("max-h-0")) {
        navMenu.classList.remove("max-h-0");
        navMenu.classList.add("max-h-96"); // adjust height if menu grows bigger
    } else {
        navMenu.classList.add("max-h-0");
        navMenu.classList.remove("max-h-96");
    }
    });

    // Collapse after selecting a link
    navLinks.forEach(link => {
    link.addEventListener("click", () => {
        navMenu.classList.add("max-h-0");
        navMenu.classList.remove("max-h-96");
    });
    });
});

    //ROULETTE
        const message = document.getElementById("skillMessage");

    // Simple check for touch support
    if ("ontouchstart" in window || navigator.maxTouchPoints > 0) {
    message.textContent = "(hold to speed up)";
    } else {
    message.textContent = "(hover to speed up)";
    }

    document.addEventListener('DOMContentLoaded', function() {
    const wheel = document.getElementById("wheel");
    const items = wheel.querySelectorAll(".item");

    let current = 0;
    let intervalId;
    let intervalTime = 1000; // default speed

    function render() {
    items.forEach((item, i) => {
        let offset = (i - current + items.length) % items.length;
        if (offset > items.length / 2) offset -= items.length;

        const scale = 1 - Math.abs(offset) * 0.15;
        const translateX = offset * 160;
        const zIndex = 10 - Math.abs(offset);

        item.style.transform = `translate(-50%, -50%) translateX(${translateX}px) scale(${scale})`;
        item.style.zIndex = zIndex;
        item.style.opacity = Math.abs(offset) > 3 ? 0 : 1;

        const caption = item.querySelector("p");
        if (caption) {
        caption.style.display = offset === 0 ? "block" : "none";
        }
    });
    }

    function next() {
    current = (current + 1) % items.length;
    render();
    }

    function startInterval(time) {
    clearInterval(intervalId);
    intervalId = setInterval(next, time);
    }

    // Start default speed
    startInterval(intervalTime);
    render();

    // Hover events to speed up
    wheel.addEventListener('mouseenter', () => {
    startInterval(500); // faster speed on hover
    });

    wheel.addEventListener('mouseleave', () => {
    startInterval(intervalTime); // return to normal speed
    });

    //Mobile
    wheel.addEventListener('touchstart', () => {
    startInterval(500);
    });
    wheel.addEventListener('touchend', () => {
    startInterval(intervalTime);
    });

});


//DROPDOWNS
function animateCounter(el, duration = 1000) {
const target = parseFloat(el.getAttribute('data-target'));
const decimals = parseInt(el.getAttribute('data-decimals')) || 0;
const suffix = el.getAttribute('data-suffix') || ""; // read suffix
let current = 0;
const steps = duration / 30;
const increment = target / steps;

const timer = setInterval(() => {
    current += increment;
    if (current >= target) {
    el.textContent = target.toFixed(decimals) + suffix;
    clearInterval(timer);
    } else {
    el.textContent = current.toFixed(decimals) + suffix;
    }
}, 30);
}


function setupDropdown(buttonId, itemClass) {
    const btn = document.getElementById(buttonId);
    const items = document.querySelectorAll(`.${itemClass}`);
    let visible = false;

    btn.addEventListener('click', () => {
        visible = !visible;

        if (visible) {
        items.forEach((item, index) => {
            setTimeout(() => {
            item.classList.remove('hidden');
            setTimeout(() => {
                item.classList.remove('opacity-0', '-translate-y-4');

                // animate ALL counters inside item
                const counters = item.querySelectorAll('.counter');
                counters.forEach((counter, i) => {
                setTimeout(() => {
                    counter.textContent = (counter.getAttribute('data-decimals') === "0") ? "0" : "0.0";
                    animateCounter(counter, 1000);
                }, 500 + i * 200); // staggered animation
                });

            }, 20);
            }, index * 200);
        });
        } else {
        items.forEach(item => {
            item.classList.add('hidden', 'opacity-0', '-translate-y-4');
            
            // reset counters on hide
            const counters = item.querySelectorAll('.counter');
            counters.forEach(counter => {
            const decimals = parseInt(counter.getAttribute('data-decimals')) || 0;
            const suffix = counter.getAttribute('data-suffix') || "";
            counter.textContent = (decimals === 0 ? "0" : "0.0") + suffix;
});
        });
        }
    });
}
// Setup Dropdowns
setupDropdown('projects', 'project');
setupDropdown('academics', 'academic');
setupDropdown('works', 'work');