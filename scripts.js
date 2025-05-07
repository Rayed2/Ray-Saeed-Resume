"use strict";  // Enabling strict mode to catch potential errors

// *** Module Pattern ***
//Not using DOM methods
const GalleryModule = (function () {
    const figures = document.querySelectorAll('figure');  // Private scope
    
    // Private helper function for setting up hover effects
    function addHoverEffects(figure, img, caption) {
        // Hover in (mouseenter)
        figure.addEventListener('mouseenter', () => {
            figure.style.transform = "scale(1.2)"; // Scale the figure
            figure.style.zIndex = "2"; // Bring to the front

            img.style.filter = "drop-shadow(10px 10px 20px black) grayscale(0)"; // Adjust image filter
            caption.style.fontSize = "1.2em"; // Increase font size of the caption
        });

        // Hover out (mouseleave)
        figure.addEventListener('mouseleave', () => {
            figure.style.transform = "scale(1)"; // Reset figure size
            figure.style.zIndex = "1"; // Reset z-index

            img.style.filter = "drop-shadow(3px 3px 10px black) grayscale(1)"; // Reset image filter
            caption.style.fontSize = "0px"; // Reset font size of the caption
        });
    }

    // Public method to initialize gallery
    function init() {
        figures.forEach(figure => {
            const img = figure.querySelector('img');
            const caption = figure.querySelector('figcaption');
            addHoverEffects(figure, img, caption);
        });
    }

    // Return public methods
    return {
        init: init
    };
})();

// Initialize the gallery module
GalleryModule.init();

// *** Factory Pattern for News Bar ***
const NewsBarFactory = (function () {
    const msgs = [
        "CIS 171 - Introduction to Networks",
        "CIS 211 - Introduction to C++",
        "CIS 223 - Introduction to C#",
        "CIS 238 - JavaScript",
        "CIS 290 - Object Oriented Programming"
    ];
    
    const msg_url = [
        "https://catalog.schoolcraft.edu/preview_course_nopop.php?catoid=13&coid=12839",
        "https://catalog.schoolcraft.edu/preview_course_nopop.php?catoid=13&coid=12845",
        "https://catalog.schoolcraft.edu/preview_course_nopop.php?catoid=13&coid=12848",
        "https://catalog.schoolcraft.edu/preview_course_nopop.php?catoid=13&coid=12851",
        "https://catalog.schoolcraft.edu/preview_course_nopop.php?catoid=13&coid=12857"
    ];
    
    const barwidth = 350; // Enter main bar width in px or %
    const setdelay = 3000; // Enter delay between msgs, in milliseconds

    function createNewsBar() {
        let count = 0;

        const newsBarElement = document.createElement('form');
        newsBarElement.name = "news_bar";

        const prevButton = document.createElement('input');
        prevButton.type = "button";
        prevButton.value = "Previous";
        prevButton.addEventListener('click', () => moveIt(0));
        newsBarElement.appendChild(prevButton);

        const newsButton = document.createElement('input');
        newsButton.type = "button";
        newsButton.name = "news_bar_but";
        newsButton.value = msgs[count];
        newsButton.style = `color:#000000;background:#FFFFFF;width:${barwidth}px;height:22px;border-width:1px;border-color:#000000;cursor:pointer;`;
        newsButton.addEventListener('click', goURL);
        newsBarElement.appendChild(newsButton);

        const nextButton = document.createElement('input');
        nextButton.type = "button";
        nextButton.value = "Next";
        nextButton.addEventListener('click', () => moveIt(1));
        newsBarElement.appendChild(nextButton);

        function moveIt(how) {
            if (how === 1) {
                if (count < msgs.length - 1) count++;
                else count = 0;
            } else {
                if (count === 0) count = msgs.length - 1;
                else count--;
            }
            newsButton.value = msgs[count];
        }

        function goURL() {
            window.open(msg_url[count], '_blank');
        }

        setInterval(() => moveIt(1), setdelay);

        return newsBarElement;
    }

    return {
        createNewsBar: createNewsBar
    };
})();

// Use this as an example to create and append the news bar
document.body.appendChild(NewsBarFactory.createNewsBar());

