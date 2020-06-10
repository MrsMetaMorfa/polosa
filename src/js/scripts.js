// Аналог $(document).ready()
document.addEventListener('DOMContentLoaded', function() {
  const tagsListDefault = document.querySelectorAll('.header_tags .tag');
  let tagsWidthListDefault = [], currentTag, currentTagIndex;
  if (document.querySelector('.header_tags')) {
    Array.prototype.forEach.call(tagsListDefault, function(elem) {
      tagsWidthListDefault.push( elem.offsetWidth + 12 );
    });
    currentTag = document.querySelector('.header_tags .tag.current');
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
        imageHeight = (itemWidth - 40) / 141 * 212;
        Array.prototype.forEach.call(itemsOnPage, function(elem){
          let image = elem.querySelector('.item_image');
          image.style.height = imageHeight + 'px';
        });
      // } else {
        // itemWidth = itemsOnPage[0].offsetWidth;
        // imageHeight = (itemWidth - 40) / 141 * 212;
        // if (itemsOnPage[0].classList.contains('wide')) {
        //   imageHeight = (itemWidth - 40) / 151 * 106;
        // }
        // Array.prototype.forEach.call(itemsOnPage, function(elem){
        //   let image = elem.querySelector('.item_image');
        //   itemTags = elem.querySelector('.item_tags');
        //   image.style.height = imageHeight + 'px';
        //   itemTags.style.top = imageHeight + 'px';
        // });
      }
    }

    // if (document.querySelector('.article')) {
    //   let articleImage = document.querySelector('.article_image'),
    //       imageHeight, imageWidth;
    //   if ( (window.innerWidth <= 1024) && (window.innerWidth < window.innerHeight) ) { //portrait
    //     articleImage.style.width = 'inherit';
    //     articleImage.style.height = 'inherit';
    //     imageWidth = articleImage.offsetWidth;
    //     imageHeight = articleImage.offsetHeight;
    //     articleImage.nextElementSibling.style.paddingLeft = 0;
    //     articleImage.style.height = imageHeight + 'px';
    //     articleImage.nextElementSibling.querySelector('.header').style.marginBottom = imageHeight + 'px';
    //   } else if ((window.innerWidth > 1024) && (window.innerWidth > window.innerHeight)) { //landscape
    //     articleImage.style.width = 'inherit';
    //     articleImage.style.height = 'inherit';
    //     imageHeight = articleImage.offsetHeight;
    //     imageWidth = (imageHeight) / 212 * 141;
    //     articleImage.nextElementSibling.querySelector('.header').style.marginBottom = 'inherit';
    //     articleImage.style.width = imageWidth + 'px';
    //     articleImage.nextElementSibling.style.paddingLeft = (imageWidth + 64) + 'px';
    //   } else {
    //     articleImage.style.width = 'inherit';
    //     articleImage.style.height = 'inherit';
    //     imageHeight = articleImage.offsetHeight;
    //     imageWidth = articleImage.offsetWidth;
    //     articleImage.nextElementSibling.querySelector('.header').style.marginBottom = 'inherit';
    //     articleImage.style.width = imageWidth + 'px';
    //     articleImage.nextElementSibling.style.paddingLeft = (imageWidth + 48) + 'px';
    //   }
    // }

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

    if (document.querySelector('.header_tags')) {
      let tagNav = document.querySelector('.header_tags'),
          tagMoreList = document.querySelector('.header_tags .tag_list'),
          tagMoreButton = document.querySelector('.header_tags .tag-wrapper'),
          i = 0,
          tagNavWidth = tagNav.offsetWidth,
          tagMoreButtonWidth = tagMoreButton.offsetWidth,
          tagsVisibleWidth = 0,
          tagsList = Array.prototype.slice.call(tagsListDefault),
          tagsWidthList = tagsWidthListDefault.slice();
      function FindTagsVisibleWidth(index) {
        tagsVisibleWidth = tagMoreButtonWidth - 24;
        if (document.querySelector('.header_tags .tag.current')) {
          do {
            tagsVisibleWidth = tagsVisibleWidth + tagsWidthList[index];
            index++;
          } while ((tagsVisibleWidth <= (tagNavWidth - tagMoreButtonWidth - 24 - 26)) && (index < tagsList.length));
        } else {
          do {
            tagsVisibleWidth = tagsVisibleWidth + tagsWidthList[index];
            index++;
          } while ((tagsVisibleWidth <= (tagNavWidth - tagMoreButtonWidth - 24)) && (index < tagsList.length));
        }
        return index;
      }
      i = FindTagsVisibleWidth(i);
      let allNavTags = document.querySelectorAll('.header_tags .tag');
      if (currentTag) {
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
      Array.prototype.forEach.call(allNavTags, function (elem) {
        elem.remove();
      });
      for (let b = 0; b < i; b++) {
        tagMoreButton.before(tagsList[b]);
      }
      for (let l = i; l < tagsList.length; l++) {
        tagMoreList.append(tagsList[l]);
      }
      tagNav.style.flexWrap = 'nowrap';
    }

    if (document.querySelector('.header_tags')) {
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
      const navWrapper = document.querySelector('.header_tags .tag-wrapper'),
        navList = navWrapper.querySelector('.tag_list'),
        navButton = navWrapper.querySelector('.tag-button');
      new ToggleBlock(navList, navButton);

      document.onclick = (e) => {
        let target = e.target,
          itsMenu = target === menu || menu.contains(target),
          itsMenuButton = target === menuButton,
          menuIsActive = menu.classList.contains('open'),
          itsLanguage = target === language || language.contains(target),
          itsLanguageButton = target === languageButton,
          languageIsActive = language.classList.contains('open'),
          itsNotification = target === notification || notification.contains(target),
          itsNotificationButton = target === notificationButton,
          notificationIsActive = notification.classList.contains('open'),
          itsList = target === navList || navList.contains(target),
          itsListButton = target === navButton,
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

    let article = document.querySelector('.article_image'),
        articleWidth = article.offsetWidth;
    document.onscroll = function () {
      if (document.querySelector('.article')) {
        let articleHeight = document.querySelector('section.article').offsetHeight,
            headerHeight = document.querySelector('.header').offsetHeight;
        if ((pageYOffset > 40) && (pageYOffset < (articleHeight + headerHeight - article.offsetHeight - 100))) {
          article.style.position = 'fixed';
          article.style.top = '40px';
          article.style.bottom = 'auto';
          article.style.width = articleWidth + 'px';
        } else if ((pageYOffset > 40) && (pageYOffset > (articleHeight + headerHeight - article.offsetHeight - 100))) {
          article.style.position = 'absolute';
          article.style.top = 'auto';
          article.style.bottom = '80px';
          article.style.width = articleWidth + 'px';
        } else {
          article.style.position = 'absolute';
          article.style.top = '40px';
          article.style.bottom = 'auto';
          article.style.width = articleWidth + 'px';
        }
      }
    };
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
