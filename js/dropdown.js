document.addEventListener("DOMContentLoaded", function () {
  const faqItems = document.querySelectorAll(".faq-item");

  faqItems.forEach((item) => {
    const question = item.querySelector(".question");
    const answer = item.querySelector(".answer");

    question.addEventListener("click", function () {
      item.classList.toggle("active");
      answer.style.display =
        answer.style.display === "block" ? "none" : "block";
    });
  });
});
