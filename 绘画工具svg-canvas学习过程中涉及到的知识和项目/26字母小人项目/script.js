function danceLetter(letter) {
  try {
    // Attempt to find the path element and dancer
    const pathElement = document.querySelector(`path.${letter}`);
    const dancer = document.getElementById("dancer");

    // If either the pathElement or dancer does not exist, return false
    if (!pathElement || !dancer) {
      return false;
    }

    // Safely set the dancer's path
    dancer.setAttribute("d", pathElement.getAttribute("d"));
    return true;
  } catch (error) {
    // Catch any unexpected errors and return false
    console.error("An error occurred in danceLetter:", error);
    return false;
  }
}

document.addEventListener("keydown", (event) => {
  const letter = event.key.toUpperCase();
  danceLetter(letter);
});

// Select the keyboard container and all keys
const keyboard = document.querySelector("[data-keyboard]");
const keys = document.querySelectorAll(".key");

// Add click event listeners to each button
keys.forEach((key) => {
  key.addEventListener("click", (e) => {
    const keyPressed = key.dataset.key; // Get the data-key attribute
    danceLetter(keyPressed);
  });
});

// Add keydown event listener to the document
document.addEventListener("keydown", (e) => {
  // Convert to uppercase to match data-key
  const keyPressed = e.key.toUpperCase();
  const keyElement = Array.from(keys).find(
    (key) => key.dataset.key === keyPressed
  );

  if (keyElement) {
    keyElement.classList.add("active");
    danceLetter(keyPressed);
    setTimeout(() => keyElement.classList.remove("active"), 200);
  }
});

document.addEventListener("DOMContentLoaded", function () {
  setTimeout(() => {
    danceLetter("S");
  }, 1000);
  setTimeout(() => {
    danceLetter("P");
  }, 1500);
  setTimeout(() => {
    danceLetter("A");
  }, 2000);
});
