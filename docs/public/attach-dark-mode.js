(() => {
  function checkDarkMode() {
    if (
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches
    ) {
      return true;
    }

    return false;
  }

  function addCss(fileName) {
    var head = document.head;
    var link = document.createElement("link");

    link.type = "text/css";
    link.rel = "stylesheet";
    link.href = fileName;

    head.appendChild(link);
  }

  function addDarkMode() {
    if (checkDarkMode()) {
      document.documentElement.classList.add("mode-dark");
      document.documentElement.classList.add("bg-gray-1000");
    } else {
      document.documentElement.classList.remove("mode-dark");
      document.documentElement.classList.remove("bg-gray-1000");
    }
  }

  addDarkMode();

  const darkModeMediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

  darkModeMediaQuery.addListener((e) => {
    addDarkMode();
  });
})();
