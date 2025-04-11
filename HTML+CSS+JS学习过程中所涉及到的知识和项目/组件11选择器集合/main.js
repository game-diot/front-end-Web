// Initialize Map
var map = L.map("map").setView([51.505, -0.09], 13);
L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  attribution: "&copy; OpenStreetMap contributors",
}).addTo(map);

var marker;

// Function to Search Address
document.getElementById("addressInput").addEventListener("input", function () {
  var query = this.value;
  if (query.length < 3) return;

  fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${query}`)
    .then((response) => response.json())
    .then((data) => {
      var suggestions = "";
      data.forEach(function (place) {
        suggestions += `<div class="suggestion-item" data-lat="${place.lat}" data-lon="${place.lon}">${place.display_name}</div>`;
      });
      document.getElementById("suggestions").innerHTML = suggestions;
      document.getElementById("suggestions").style.display = "block";
    });
});

// Handle Selection from Suggestions
document.addEventListener("click", function (event) {
  if (event.target && event.target.classList.contains("suggestion-item")) {
    var lat = event.target.getAttribute("data-lat");
    var lon = event.target.getAttribute("data-lon");
    document.getElementById("addressInput").value = event.target.textContent;
    document.getElementById("suggestions").style.display = "none";

    // Move map to selected location
    if (marker) map.removeLayer(marker);
    marker = L.marker([lat, lon]).addTo(map);
    map.setView([lat, lon], 14);
  }
});

const rangeInput = document.getElementById("rangeInput");
const rangeValue = document.getElementById("rangeValue");

rangeInput.addEventListener("input", function () {
  rangeValue.textContent = rangeInput.value;
});

const colorPicker = document.getElementById("colorPicker");
const colorCode = document.getElementById("colorCode");
const colorFormat = document.getElementById("colorFormat");

function updateColorCode() {
  const color = colorPicker.value;
  const format = colorFormat.value;

  if (format === "hex") {
    colorCode.value = color;
  } else if (format === "rgb") {
    const rgb = hexToRgb(color);
    colorCode.value = `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`;
  } else if (format === "hsl") {
    const hsl = hexToHsl(color);
    colorCode.value = `hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)`;
  }
}

function hexToRgb(hex) {
  const bigint = parseInt(hex.slice(1), 16);
  const r = (bigint >> 16) & 255;
  const g = (bigint >> 8) & 255;
  const b = bigint & 255;
  return { r, g, b };
}

function hexToHsl(hex) {
  const { r, g, b } = hexToRgb(hex);
  const rNormalized = r / 255;
  const gNormalized = g / 255;
  const bNormalized = b / 255;
  const max = Math.max(rNormalized, gNormalized, bNormalized);
  const min = Math.min(rNormalized, gNormalized, bNormalized);
  let h,
    s,
    l = (max + min) / 2;

  if (max === min) {
    h = s = 0; // achromatic
  } else {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case rNormalized:
        h =
          (gNormalized - bNormalized) / d + (gNormalized < bNormalized ? 6 : 0);
        break;
      case gNormalized:
        h = (bNormalized - rNormalized) / d + 2;
        break;
      case bNormalized:
        h = (rNormalized - gNormalized) / d + 4;
        break;
    }
    h /= 6;
  }

  return {
    h: Math.round(h * 360),
    s: Math.round(s * 100),
    l: Math.round(l * 100),
  };
}

colorPicker.addEventListener("input", updateColorCode);
colorFormat.addEventListener("change", updateColorCode);

updateColorCode();

const textInput = document.getElementById("text-input");
const emojiToggle = document.getElementById("emoji-toggle");
const emojiGrid = document.getElementById("emoji-grid");
const emojiButtons = document.querySelectorAll(".emoji-button");

emojiToggle.addEventListener("click", function () {
  if (emojiGrid.style.display === "none" || emojiGrid.style.display === "") {
    emojiGrid.style.display = "grid";
  } else {
    emojiGrid.style.display = "none";
  }
});

emojiButtons.forEach((button) => {
  button.addEventListener("click", function () {
    textInput.value += button.textContent;
    emojiGrid.style.display = "none";
  });
});
