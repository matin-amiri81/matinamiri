const grid = document.querySelector(".grid");
grid.dataset.prevPercentage = "0";
grid.dataset.percentage = "0";
grid.dataset.nextPercentage = "0";
//scroll with mouse
window.onmousedown = (mouse) => {
    grid.dataset.mouseDownAt = String(mouse.clientX);
};
window.onmouseup = () => {
    grid.dataset.mouseDownAt = "0";
    grid.dataset.prevPercentage = grid.dataset.percentage;
};
window.onmousemove = (mouse) => {
    if (grid.dataset.mouseDownAt === "0")
        return;
    const mouseDelta = parseFloat(grid.dataset.mouseDownAt) - mouse.clientX, maxDelta = window.innerWidth / 2;
    const percentage = (mouseDelta / maxDelta) * -100, nextPercentage = Math.max(Math.min(parseFloat(grid.dataset.prevPercentage) + percentage, 0), -100);
    grid.dataset.percentage = String(nextPercentage);
    grid.animate({ transform: `translate(${nextPercentage}%,-50%)` }, { duration: 1200, fill: "forwards" });
    const collection = grid.getElementsByClassName("grid-item");
    for (const image of collection) {
        image.animate({
            objectPosition: `${nextPercentage + 100}% 50%`,
        }, { duration: 1200, fill: "forwards" });
    }
};
//scroll with scroll
document.addEventListener("wheel", function (scroll) {
    const scrollDelta = scroll.deltaX / 2;
    const maxDelta = window.innerWidth / 2;
    const percentage = (scrollDelta / maxDelta) * -100, nextPercentage = Math.max(Math.min(parseFloat(grid.dataset.prevPercentage) + percentage, 0), -100);
    grid.dataset.percentage = String(nextPercentage);
    grid.animate({ transform: `translate(${nextPercentage}%,-50%)` }, { duration: 1200, fill: "forwards" });
    const collection = grid.getElementsByClassName("grid-item");
    for (const image of collection) {
        image.animate({
            objectPosition: `${nextPercentage + 100}% 50%`,
        }, { duration: 1200, fill: "forwards" });
    }
    grid.dataset.prevPercentage = String(nextPercentage);
});
function moveClick(placeHtml, newHtml) {
    document.getElementById(placeHtml).innerHTML =
        document.getElementById(newHtml).innerHTML;
    console.log(document.getElementById(placeHtml).innerHTML);
    moveAbout(placeHtml);
}
function moveAbout(section) {
    document.getElementById(section).scrollIntoView({ behavior: "smooth" });
    console.log(document.getElementById(section).innerHTML);
    //document.querySelector(section).scrollIntoView({ behavior: "smooth" });
}
