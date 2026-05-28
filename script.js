const input = document.getElementById("searchInput");
const noResult = document.getElementById("no-result");
const resultCount = document.getElementById("resultCount");
const allCards = document.querySelectorAll(".card, .cmd-card");
const allSections = document.querySelectorAll("[data-section]");

input.addEventListener("input", () => {
  const q = input.value.toLowerCase().trim();
  let visible = 0;
  allCards.forEach((card) => {
    const match =
      !q || (card.dataset.name + " " + card.dataset.desc).includes(q);
    card.classList.toggle("hidden", !match);
    if (match) visible++;
  });
  allSections.forEach((sec) => {
    const hasVisible = [...sec.querySelectorAll(".card, .cmd-card")].some(
      (c) => !c.classList.contains("hidden"),
    );
    sec.classList.toggle("hidden", !hasVisible);
  });
  resultCount.textContent = q
    ? visible + " result" + (visible !== 1 ? "s" : "")
    : "";
  noResult.style.display = q && visible === 0 ? "block" : "none";
});

document.querySelectorAll(".cmd-copy").forEach((btn) => {
  btn.addEventListener("click", () => {
    navigator.clipboard.writeText(btn.dataset.cmd).then(() => {
      const origHTML = btn.innerHTML;
      btn.innerHTML = "Copied!";
      btn.classList.add("copied");
      setTimeout(() => {
        btn.innerHTML = origHTML;
        btn.classList.remove("copied");
      }, 2000);
    });
  });
});

function openChoice(
  e,
  name1,
  url1,
  desc1,
  name2,
  url2,
  desc2,
  name3,
  url3,
  desc3,
) {
  e.preventDefault();
  const overlay = document.getElementById("choiceModal");
  const opt1 = document.getElementById("modalOpt1");
  const opt2 = document.getElementById("modalOpt2");
  const opt3 = document.getElementById("modalOpt3");

  opt1.href = url1;
  opt1.querySelector(".modal-btn-name").textContent = name1;
  opt1.querySelector(".modal-btn-desc").textContent = desc1;

  opt2.href = url2;
  opt2.querySelector(".modal-btn-name").textContent = name2;
  opt2.querySelector(".modal-btn-desc").textContent = desc2;

  if (name3 && url3) {
    opt3.href = url3;
    opt3.querySelector(".modal-btn-name").textContent = name3;
    opt3.querySelector(".modal-btn-desc").textContent = desc3;
    opt3.style.display = "";
  } else {
    opt3.style.display = "none";
  }

  overlay.classList.add("open");
}

document.getElementById("choiceModal").addEventListener("click", function (e) {
  if (e.target === this) this.classList.remove("open");
});
document.getElementById("modalCancel").addEventListener("click", function () {
  document.getElementById("choiceModal").classList.remove("open");
});
