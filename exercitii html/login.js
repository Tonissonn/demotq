function switchTheme() {
  const inputs = document.querySelector('.theme-switch input[type="checkbox"]');
  if (inputs.checked) {
    document.documentElement.setAttribute("data-theme", "dark");
    document.getElementById("header-logo").src = "./dark-logo.PNG";
  } else {
    document.documentElement.setAttribute("data-theme", "light");
    document.getElementById("header-logo").src = "./light-logo.PNG";
  }
}
function switchToUser() {
  console.log("user");
  document.documentElement.setAttribute("user-type", "user");
}
function switchToAdmin() {
  console.log("admin");
  document.documentElement.setAttribute("user-type", "admin");
}
window.onload = function () {
  document.documentElement.setAttribute("data-theme", "light");
  document.documentElement.setAttribute("user-type", "user");
};
