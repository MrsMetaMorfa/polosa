// Аналог $(document).ready()
document.addEventListener('DOMContentLoaded', function() {
  const tagsListDefault = document.querySelectorAll('.main .nav .tag');
  let tagsWidthListDefault = [], currentTag, currentTagIndex;
  if (document.querySelector('.main .nav')) {
    Array.prototype.forEach.call(tagsListDefault, function(elem) {
      tagsWidthListDefault.push( elem.offsetWidth + 12 );
    });
    currentTag = document.querySelector('.main .nav .tag.current');
    currentTagIndex = function() {
      if (currentTag !== null) {
        return Array.prototype.slice.call(tagsListDefault).indexOf(currentTag);
      }
    };
  }

  function StartScripts() {

    if (document.querySelector('.compilation')) {
      let itemsOnPage = document.querySelectorAll('.item'), itemWidth, imageHeight, itemTags;
      if ((window.innerWidth <= 1024) && (window.innerWidth < window.innerHeight)) { //portrait
        itemWidth = itemsOnPage[0].querySelector('.item_image').offsetWidth;
        imageHeight = (itemWidth) / 141 * 212;
        Array.prototype.forEach.call(itemsOnPage, function(elem){
          let image = elem.querySelector('.item_image');
          image.style.height = imageHeight + 'px';
        });
      } else {
        itemWidth = itemsOnPage[0].offsetWidth;
        imageHeight = (itemWidth) / 141 * 212;
        if (itemsOnPage[0].classList.contains('wide')) {
          imageHeight = (itemWidth) / 151 * 106;
        }
        Array.prototype.forEach.call(itemsOnPage, function(elem){
          let image = elem.querySelector('.item_image');
          itemTags = elem.querySelector('.item_tags');
          image.style.height = imageHeight + 'px';
          itemTags.style.top = imageHeight + 'px';
        });
      }
    }

    if (document.querySelector('.article')) {
      let articleImage = document.querySelector('.article_image'),
          imageHeight, imageWidth;
      if ( (window.innerWidth <= 1024) && (window.innerWidth < window.innerHeight) ) { //portrait
        articleImage.style.width = 'inherit';
        articleImage.style.height = 'inherit';
        imageWidth = articleImage.offsetWidth;
        imageHeight = articleImage.offsetHeight;
        articleImage.nextElementSibling.style.paddingLeft = 0;
        articleImage.style.height = imageHeight + 'px';
        articleImage.nextElementSibling.querySelector('.header').style.marginBottom = imageHeight + 'px';
      } else if ((window.innerWidth > 1024) && (window.innerWidth > window.innerHeight)) { //landscape
        articleImage.style.width = 'inherit';
        articleImage.style.height = 'inherit';
        imageHeight = articleImage.offsetHeight;
        imageWidth = (imageHeight) / 212 * 141;
        articleImage.nextElementSibling.querySelector('.header').style.marginBottom = 'inherit';
        articleImage.style.width = imageWidth + 'px';
        articleImage.nextElementSibling.style.paddingLeft = (imageWidth + 64) + 'px';
      } else {
        articleImage.style.width = 'inherit';
        articleImage.style.height = 'inherit';
        imageHeight = articleImage.offsetHeight;
        imageWidth = articleImage.offsetWidth;
        articleImage.nextElementSibling.querySelector('.header').style.marginBottom = 'inherit';
        articleImage.style.width = imageWidth + 'px';
        articleImage.nextElementSibling.style.paddingLeft = (imageWidth + 48) + 'px';
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

    function ToggleBlock(block, button) {
      let ToggleMenu = function() {
        block.classList.toggle('open');
      };
      button.onclick = () => (new ToggleMenu());
    }

    if (document.querySelector('.main .nav')) {
      console.log(currentTagIndex());
      let tagNav = document.querySelector('.main .nav'),
          tagMoreList = document.querySelector('.main .nav .tag_list'),
          tagMoreButton = document.querySelector('.main .nav .tag-wrapper'),
          i = 0,
          tagNavWidth = tagNav.offsetWidth,
          tagMoreButtonWidth = tagMoreButton.offsetWidth,
          tagsVisibleWidth = 0,
          tagsList = Array.prototype.slice.call(tagsListDefault),
          tagsWidthList = tagsWidthListDefault;
      function FindTagsVisibleWidth(index) {
        tagsVisibleWidth = 0;
        if (document.querySelector('.main .nav .tag.current')) {
          while ((tagsVisibleWidth <= (tagNavWidth - tagMoreButtonWidth - 6 - 26)) && (index < tagsList.length)) {
            tagsVisibleWidth = tagsVisibleWidth + tagsWidthList[index];
            index++;
          }
        } else {
          while ((tagsVisibleWidth <= (tagNavWidth - tagMoreButtonWidth - 6)) && (index < tagsList.length)) {
            tagsVisibleWidth = tagsVisibleWidth + tagsWidthList[index];
            index++;
          }
        }
        return index;
      }
      i = FindTagsVisibleWidth(i);
      let allNavTags = document.querySelectorAll('.main .nav .tag');

      if (currentTag) {
        i = i - 1;
        if (currentTagIndex() > i) {
          let currentTagWidth = tagsWidthList[currentTagIndex()];
          tagsList.splice(currentTagIndex(), 1);
          tagsWidthList.splice(currentTagIndex(), 1);
          let k = i - 1;
          tagsList.splice(k, 0, currentTag);
          tagsWidthList.splice(k, 0, currentTagWidth);
        }
        i = 0;
        i = FindTagsVisibleWidth(i);
      }
      i = i - 1;
      Array.prototype.forEach.call(allNavTags, function (elem) {
        elem.remove();
      });
      for (let b = 0; b < i; b++) {
        tagMoreButton.before(tagsList[b]);
      }
      for (let l = i; l < tagsList.length; l++) {
        tagMoreList.append(tagsList[l]);
      }
    }

    if (document.querySelector('.header_top') || document.querySelector('.main .nav')) {
      const menuWrapper = document.querySelector('.header_menu'),
            menu = menuWrapper.querySelector('.menu'),
            menuButton = menuWrapper.querySelector('.btn-icon');
      new ToggleBlock(menu, menuButton);
      const languageWrapper = document.querySelector('.header_language'),
            language = languageWrapper.querySelector('.language'),
            languageButton = languageWrapper.querySelector('.btn-icon');
      new ToggleBlock(language, languageButton);
      const notificationWrapper = document.querySelector('.header_notification'),
            notification = notificationWrapper.querySelector('.notification'),
            notificationButton = notificationWrapper.querySelector('.btn-icon');
      new ToggleBlock(notification, notificationButton);
      const navWrapper = document.querySelector('.main .nav .tag-wrapper'),
        navList = navWrapper.querySelector('.tag_list'),
        navButton = navWrapper.querySelector('.tag-button');
      new ToggleBlock(navList, navButton);

      document.onclick = (e) => {
        let target = e.target,
          itsMenu = target == menu || menu.contains(target),
          itsMenuButton = target == menuButton,
          menuIsActive = menu.classList.contains('open'),
          itsLanguage = target == language || language.contains(target),
          itsLanguageButton = target == languageButton,
          languageIsActive = language.classList.contains('open'),
          itsNotification = target == notification || notification.contains(target),
          itsNotificationButton = target == notificationButton,
          notificationIsActive = notification.classList.contains('open'),
          itsList = target == navList || navList.contains(target),
          itsListButton = target == navButton,
          listIsActive = navList.classList.contains('open');

        if (!itsMenu && !itsMenuButton && menuIsActive) {
          menu.classList.toggle('open');
        }
        if (!itsLanguage && !itsLanguageButton && languageIsActive) {
          language.classList.toggle('open');
        }
        if (!itsNotification && !itsNotificationButton && notificationIsActive) {
          notification.classList.toggle('open');
        }
        if (!itsList && !itsListButton && listIsActive) {
          navList.classList.toggle('open');
        }
      };

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
