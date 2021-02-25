const smoothScrollAnchor = document.querySelectorAll("a[href^='#']"); //bikin constanta baru

for (let index = 0; index < smoothScrollAnchor.length; index++) {
  const element = smoothScrollAnchor[index];

  element.addEventListener("click", function (event) {
    event.preventDefault();

    if (document.getElementById(this.getAttribute("href").replace("#", ""))) //ketika ada href maka # direplace/ganti jadi empty string 
      document.querySelector(this.getAttribute("href")).scrollIntoView({
        behavior: "smooth",
      });
  });
}
