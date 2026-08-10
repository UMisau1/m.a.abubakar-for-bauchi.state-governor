/* =========================================================
   M.A. CAMPAIGN WEBSITE
   ACHIEVEMENTS PAGE
   Legislative Laws Renderer
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       ELEMENTS
    ===================================================== */

    const lawsGrid = document.getElementById("legislativeLawsGrid");
    const yearFilter = document.getElementById("lawYearFilter");
    const categoryFilter = document.getElementById("lawCategoryFilter");
    const searchInput = document.getElementById("lawSearch");

    const totalLaws = document.getElementById("totalLaws");
    const totalCategories = document.getElementById("totalCategories");


    /* =====================================================
       CHECK DATABASE
    ===================================================== */

    if (!lawsGrid) {
        return;
    }

    if (
        typeof window.legislativeLaws === "undefined" ||
        !Array.isArray(window.legislativeLaws)
    ) {

        lawsGrid.innerHTML = `
            <div class="legislative-empty">
                <h3>Legislative data unavailable</h3>
                <p>
                    The legislative database could not be loaded.
                </p>
            </div>
        `;

        return;
    }


    /* =====================================================
       DATABASE
    ===================================================== */

    const laws = window.legislativeLaws;
    /* =====================================================
   DATABASE
===================================================== */

const laws = window.legislativeLaws;


/* =====================================================
   LEGISLATIVE TOTAL — ACHIEVEMENTS STAT
===================================================== */

const legislativeTotalLaws =
    document.getElementById("legislativeTotalLaws");

if (legislativeTotalLaws) {
    legislativeTotalLaws.textContent = laws.length;
}

    /* =====================================================
       TOTAL LAWS
    ===================================================== */

    if (totalLaws) {
        totalLaws.textContent = laws.length;
    }


    /* =====================================================
       UNIQUE CATEGORIES
    ===================================================== */

    const categories = [
        ...new Set(
            laws
                .map(law => law.category)
                .filter(Boolean)
        )
    ].sort();


    if (totalCategories) {
        totalCategories.textContent = categories.length;
    }


    /* =====================================================
       CATEGORY FILTER
    ===================================================== */

    if (categoryFilter) {

        categories.forEach(category => {

            const option = document.createElement("option");

            option.value = category;
            option.textContent = category;

            categoryFilter.appendChild(option);

        });

    }


    /* =====================================================
       RENDER LAWS
    ===================================================== */

    function renderLaws(data) {

        lawsGrid.innerHTML = "";


        /* =================================================
           EMPTY RESULT
        ================================================= */

        if (!data.length) {

            lawsGrid.innerHTML = `
                <div class="legislative-empty">

                    <div class="empty-icon">
                        ⚖️
                    </div>

                    <h3>No legislation found</h3>

                    <p>
                        Try changing your search or filter.
                    </p>

                </div>
            `;

            return;
        }


        /* =================================================
           CREATE CARDS
        ================================================= */

        data.forEach(law => {

            const card = document.createElement("article");

            card.className = "legislative-law-card";


            /* =============================================
               STATUS CLASS
            ============================================= */

            let statusClass = "status-recorded";

            if (
                law.status &&
                law.status.toLowerCase().includes("verification")
            ) {
                statusClass = "status-verification";
            }


            /* =============================================
               CARD
            ============================================= */

            card.innerHTML = `

                <div class="law-card-top">

                    <span class="law-number">
                        LAW NO. ${law.lawNo}
                    </span>

                    <span class="law-year">
                        ${law.year}
                    </span>

                </div>


                <div class="law-card-content">

                    <span class="law-category">
                        ${law.category}
                    </span>

                    <h3>
                        ${law.title}
                    </h3>

                </div>


                <div class="law-card-footer">

                    <span class="law-status ${statusClass}">
                        ${law.status}
                    </span>

                </div>

            `;


            lawsGrid.appendChild(card);

        });

    }


    /* =====================================================
       FILTER FUNCTION
    ===================================================== */

    function filterLaws() {

        const selectedYear =
            yearFilter
                ? yearFilter.value
                : "all";


        const selectedCategory =
            categoryFilter
                ? categoryFilter.value
                : "all";


        const searchTerm =
            searchInput
                ? searchInput.value.trim().toLowerCase()
                : "";


        const filtered = laws.filter(law => {

            /* =============================================
               YEAR
            ============================================= */

            const yearMatch =
                selectedYear === "all" ||
                String(law.year) === selectedYear;


            /* =============================================
               CATEGORY
            ============================================= */

            const categoryMatch =
                selectedCategory === "all" ||
                law.category === selectedCategory;


            /* =============================================
               SEARCH
            ============================================= */

            const searchMatch =
                !searchTerm ||

                String(law.lawNo)
                    .toLowerCase()
                    .includes(searchTerm) ||

                String(law.year)
                    .toLowerCase()
                    .includes(searchTerm) ||

                law.category
                    .toLowerCase()
                    .includes(searchTerm) ||

                law.title
                    .toLowerCase()
                    .includes(searchTerm);


            return (
                yearMatch &&
                categoryMatch &&
                searchMatch
            );

        });


        renderLaws(filtered);

    }


    /* =====================================================
       EVENTS
    ===================================================== */

    if (yearFilter) {

        yearFilter.addEventListener(
            "change",
            filterLaws
        );

    }


    if (categoryFilter) {

        categoryFilter.addEventListener(
            "change",
            filterLaws
        );

    }


    if (searchInput) {

        searchInput.addEventListener(
            "input",
            filterLaws
        );

    }


    /* =====================================================
       INITIAL RENDER
    ===================================================== */

    renderLaws(laws);

});