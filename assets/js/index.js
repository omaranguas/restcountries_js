const d = document,
  $content = d.querySelector(".countries"),
  $cardFilter = d.querySelector(".card-filter"),
  $fragment = d.createDocumentFragment(),
  $template = d.getElementById("template").content;

const getCountry = async () => {
  try {
    const res = await fetch(`https://restcountries.com/v3.1/all`),
      countries = await res.json();

    countries.forEach((country) => {
      $template.querySelector(".flag").setAttribute("src", country.flags.png);
      $template.querySelector(".name").textContent = country.name.official;
      $template.querySelector(".code").textContent = country.cca3;
      $template.querySelector(".capital").textContent = country.capital;
      $template.querySelector(".region").textContent = country.region;
      $template.querySelector(".subregion").textContent = country.subregion;

      let $clone = d.importNode($template, true);
      $fragment.appendChild($clone);
    });

    $content.appendChild($fragment);
  } catch (err) {
    let message = err.statusText || "No se han obtenido datos";
    $content.insertAdjacentHTML(
      "afterend",
      `<p><b>Error ${err.status}: ${message}</b></p`
    );
  }
};

d.addEventListener("DOMContentLoaded", (e) => {
  getCountry();
});

d.addEventListener("keyup", (e) => {
  if (e.key === "Escape") {
    e.target.value = "";
  }

  if (e.target.matches(".card-filter")) {
    d.querySelectorAll(".card").forEach((card) => {
      card.textContent.toLowerCase().includes(e.target.value) ||
      card.textContent.toUpperCase().includes(e.target.value) ||
      card.textContent.includes(e.target.value)
        ? card.classList.remove("filter")
        : card.classList.add("filter");
    });
  }
});
