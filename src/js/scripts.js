// Аналог $(document).ready()
document.addEventListener('DOMContentLoaded', function() {
  function StartScripts() {

    if (document.querySelector('.compilation')) {
      let itemsOnPage = document.querySelectorAll('.item'), itemWidth, imageHeight;
      if ((window.innerWidth < 1024) && (window.innerWidth < window.innerHeight)) {
        itemWidth = itemsOnPage[0].querySelector('.item_image').offsetWidth;
        imageHeight = (itemWidth) / 141 * 212;
        Array.prototype.forEach.call(itemsOnPage, function(elem){
          console.log(elem);
          let image = elem.querySelector('.item_image');
          image.style.height = imageHeight + 'px';
        });
      } else {
        itemWidth = itemsOnPage[0].offsetWidth;
        imageHeight = (itemWidth) / 141 * 212;
        Array.prototype.forEach.call(itemsOnPage, function(elem){
          console.log(elem);
          let image = elem.querySelector('.item_image');
          image.style.height = imageHeight + 'px';
        });
      }
    }

    if (document.querySelector('.article')) {
      let articleImage = document.querySelector('.article_image'),
          imageHeight, imageWidth;
      if ( (window.innerWidth < 1024) && (window.innerWidth < window.innerHeight) ) {
        articleImage.style.width = 'inherit';
        articleImage.style.height = 'inherit';
        imageWidth = articleImage.offsetWidth;
        imageHeight = articleImage.offsetHeight;
        console.log(imageHeight, imageWidth);
        articleImage.nextElementSibling.style.left = 0;
        articleImage.style.height = imageHeight + 'px';
        articleImage.nextElementSibling.querySelector('.header').style.marginBottom = imageHeight + 'px';
      } else {
        articleImage.style.width = 'inherit';
        articleImage.style.height = 'inherit';
        imageHeight = articleImage.offsetHeight;
        imageWidth = (imageHeight) / 212 * 141;
        articleImage.nextElementSibling.querySelector('.header').style.marginBottom = 'inherit';
        articleImage.style.width = imageWidth + 'px';
        articleImage.nextElementSibling.style.left = imageWidth + 'px';
      }
    }
    if (document.querySelector('#copyLink')) {
      document.querySelector('#copyLink').addEventListener('click', () => {
        let dummy = document.createElement('input'),
            text = window.location.href;

        document.body.appendChild(dummy);
        dummy.value = text;
        dummy.select();
        document.execCommand('copy');
        document.body.removeChild(dummy);
      });
    }
  }

  new StartScripts();

  window.onresize = StartScripts;
});


// // Если должен быть найден один элемент
// if((e = document.querySelector("#form")) !== null)
//   e.classList.add('last'); // Аналог выборки и присвоения класса
// // Если элементов будет много
// Array.prototype.forEach.call(document.querySelectorAll("#form"), function(e){
//   e.classList.add('last');
// });
