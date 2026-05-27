function addTask() {
  const input = document.getElementById("task");
  const text = input.value.trim();

  if (!text) return;

  const li = document.createElement("li");

  const span = document.createElement("span");
  span.textContent = text;

  const removeBtn = document.createElement("button");
  removeBtn.textContent = "✕ Delete";
  removeBtn.className = "remove";
  removeBtn.setAttribute("aria-label", "Delete task");
  removeBtn.onclick = function () {
    showConfirm(text, function () {
      li.remove();
    });
  };

  li.appendChild(span);
  li.appendChild(removeBtn);

  document.getElementById("list").appendChild(li);
  input.value = "";
  input.focus();
}

function showConfirm(taskText, onConfirm) {
  const overlay = document.getElementById("confirm-overlay");
  const msgEl = document.getElementById("confirm-msg");

  // Truncate long task names neatly
  const display = taskText.length > 50 ? taskText.slice(0, 47) + "…" : taskText;
  msgEl.textContent = `"${display}"`;

  overlay.classList.add("visible");

  const yesBtn = document.getElementById("confirm-yes");
  const noBtn = document.getElementById("confirm-no");

  // Clone buttons to clear any old event listeners
  const newYes = yesBtn.cloneNode(true);
  const newNo = noBtn.cloneNode(true);
  yesBtn.parentNode.replaceChild(newYes, yesBtn);
  noBtn.parentNode.replaceChild(newNo, noBtn);

  newYes.addEventListener("click", function () {
    overlay.classList.remove("visible");
    onConfirm();
  });

  newNo.addEventListener("click", function () {
    overlay.classList.remove("visible");
  });

  // Close on backdrop click
  overlay.addEventListener("click", function handleBackdrop(e) {
    if (e.target === overlay) {
      overlay.classList.remove("visible");
      overlay.removeEventListener("click", handleBackdrop);
    }
  });

  // Focus the "No" button by default for safety
  newNo.focus();
}

// Allow pressing Enter to add a task
document.addEventListener("DOMContentLoaded", function () {
  document.getElementById("task").addEventListener("keydown", function (e) {
    if (e.key === "Enter") addTask();
  });

  // Close dialog on Escape key
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") {
      document.getElementById("confirm-overlay").classList.remove("visible");
    }
  });
});
