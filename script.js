let lists = document.querySelectorAll(".list");
let rightBox = document.getElementById("right");
let leftBox = document.getElementById("left");

// Function to load stored data from localStorage
function loadSavedItems() {
  const leftItems = JSON.parse(localStorage.getItem("leftItems")) || [];
  const rightItems = JSON.parse(localStorage.getItem("rightItems")) || [];

  leftItems.forEach((itemHTML) => {
    leftBox.innerHTML += itemHTML;
  });

  rightItems.forEach((itemHTML) => {
    rightBox.innerHTML += itemHTML;
  });

  // Re-attach event listeners for all loaded items
  lists = document.querySelectorAll(".list");
  addDragAndDropListeners();
}

// Function to save the current state of the items to localStorage
function saveItems() {
  const leftItems = Array.from(leftBox.children).map((item) => item.outerHTML);
  const rightItems = Array.from(rightBox.children).map(
    (item) => item.outerHTML
  );

  localStorage.setItem("leftItems", JSON.stringify(leftItems));
  localStorage.setItem("rightItems", JSON.stringify(rightItems));
}

// Function to add drag and drop listeners
function addDragAndDropListeners() {
  lists.forEach((list) => {
    list.addEventListener("dragstart", function (e) {
      let selected = e.target;
      selected.classList.add("dragging"); // Add dragging class for feedback

      // Right Box: Allow drop
      rightBox.addEventListener("dragover", function (e) {
        e.preventDefault();
      });

      rightBox.addEventListener("drop", function (e) {
        rightBox.appendChild(selected);
        selected.classList.remove("dragging"); // Remove dragging class after drop
        saveItems(); // Save state after drop
        selected = null;
      });

      // Left Box: Allow drop
      leftBox.addEventListener("dragover", function (e) {
        e.preventDefault();
      });

      leftBox.addEventListener("drop", function (e) {
        leftBox.appendChild(selected);
        selected.classList.remove("dragging"); // Remove dragging class after drop
        saveItems(); // Save state after drop
        selected = null;
      });
    });

    // For keyboard navigation (accessibility)
    list.addEventListener("keydown", function (e) {
      if (e.key === "Enter" || e.key === " ") {
        let targetBox =
          e.target.parentElement.id === "left" ? rightBox : leftBox;
        targetBox.appendChild(e.target);
        saveItems(); // Save state after move
      }
    });
  });
}

// Load saved items from localStorage on page load
window.addEventListener("DOMContentLoaded", loadSavedItems);
