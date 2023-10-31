function pad(num, size) {
  num = num.toString();
  while (num.length < size) num = "0" + num;
  return num;
}
const swiper = new Swiper(".reviews", {
  centeredSlides: true,
    navigation: {
      nextEl: ".reviews__right-narrow",
      prevEl: ".reviews__left-narrow",
    },
    pagination: {
      el: ".reviews__pagination",
    },
  });
  const swiper1 = new Swiper(".prima-fitch__slider", {
    // direction: "vertical",
    centeredSlides: true,
    pagination: {
      el: ".prima-fitch__pagination",
      clickable: true,
      type: 'fraction',
      bulletClass: "prima-fitch__pagination-bullet",
      bulletActiveClass: "prima-fitch__pagination-bullet--active",
      renderBullet: function (index, className) {
        return '<span class="' + className + '">0' + (index + 1) + "</span>";
      },
      renderFraction: function (currentClass, totalClass) {
        return '0<span class="' + currentClass + '"></span>' +
                '/0' +
                '<span class="' + totalClass + '"></span>';
      }
    },
    scrollbar: {
      el: ".prima-fitch__scrollbar",
      hide: false,
      draggable: true,
    },
    breakpoints: {
      1270: {pagination: {type: 'bullets'}}
    },
    });
  