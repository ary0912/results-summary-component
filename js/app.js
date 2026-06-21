// ======================================
// Dynamic JSON Rendering
// ======================================

// Container Selection
const summaryList = document.querySelector("#summary-list");

// JSON Data Loading
async function loadSummaryData() {
  try {
    const response = await fetch("./data/data.json");

    if (!response.ok) {
      throw new Error("Failed to load summary data");
    }

    const data = await response.json();

    renderSummaryItems(data);
  } catch (error) {
    console.error("Error loading data:", error);

    summaryList.innerHTML = `
      <p class="error-message">
        Unable to load summary data.
      </p>
    `;
  }
}

// Card Rendering
function renderSummaryItems(data) {
  data.forEach((item) => {
    const card = createSummaryCard(item);

    summaryList.appendChild(card);
  });
}

// Creating card
function createSummaryCard(item) {
  const card = document.createElement("div");

  // Adding base layer
  card.classList.add("summary-item");

  // Adding category class
  card.classList.add(item.category.toLowerCase());

  card.innerHTML = `
    <div class="summary-left">

      <img
        src="${item.icon}"
        alt=""
        aria-hidden="true"
      >

      <span class="category">
        ${item.category}
      </span>

    </div>

    <span class="score-value">
      ${item.score}
      <span class="score-total"> / 100</span>
    </span>
  `;

  return card;
}

loadSummaryData();