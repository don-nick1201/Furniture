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
