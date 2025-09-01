let items = document.querySelectorAll('.slider .list .item');
let next = document.getElementById('next');
let prev = document.getElementById('prev');
let thumbnails = document.querySelectorAll('.thumbnail .item');

let countItem = items.length;
let itemActive = 0;

// event next click
next.onclick = function(){
    itemActive++;
    if(itemActive >= countItem){
        itemActive = 0;
    }
    showSlider();
}

// event prev click
prev.onclick = function(){
    itemActive--;
    if(itemActive < 0){
        itemActive = countItem - 1;
    }
    showSlider();
}

// auto run slider (only set once)
let refreshInterval = setInterval(() => {
    next.click();
}, 5000);

function showSlider(){
    // remove old active
    let itemActiveOld = document.querySelector('.slider .list .item.active');
    let thumbnailActiveOld = document.querySelector('.thumbnail .item.active');
    if(itemActiveOld) itemActiveOld.classList.remove('active');
    if(thumbnailActiveOld) thumbnailActiveOld.classList.remove('active');

    // set new active
    items[itemActive].classList.add('active');
    thumbnails[itemActive].classList.add('active');

    setPositionThumbnail();
}

function setPositionThumbnail () {
    let thumbnailActive = document.querySelector('.thumbnail .item.active');
    if (!thumbnailActive) return;
    let rect = thumbnailActive.getBoundingClientRect();
    if (rect.left < 0 || rect.right > window.innerWidth) {
        thumbnailActive.scrollIntoView({ behavior: 'smooth', inline: 'nearest' });
    }
}

// click thumbnail
thumbnails.forEach((thumbnail, index) => {
    thumbnail.addEventListener('click', () => {
        itemActive = index;
        showSlider();
    })
})
