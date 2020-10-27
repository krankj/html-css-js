const displayedImage = document.querySelector('.displayed-img');
const thumbBar = document.querySelector('.thumb-bar');
let isDark = true;
const btn = document.querySelector('button');
const overlay = document.querySelector('.overlay');

/* Looping through images */
for (let i =0; i < 5 ; i++) {
const newImage = document.createElement('img');
let imagePath = "images/pic" + (i+1) +".jpg";
newImage.setAttribute('src', imagePath);
thumbBar.appendChild(newImage);
newImage.addEventListener("click", function () {
	displayedImage.src = imagePath;
});
}



/* Wiring up the Darken/Lighten button */
btn.addEventListener("click", function () {
	overlay.style.backgroundColor =  isDark ? "rgba(0,0,0,0.5)" : "rgba(0,0,0,0)";
	btn.textContent = isDark ? "Lighten" : "Darken";
	isDark = !isDark;
});
