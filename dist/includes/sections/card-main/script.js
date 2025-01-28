var verticalSlider = new Swiper(".vertical-slider", {
    spaceBetween: 20,
    slidesPerView: 4,
    slidesPerGroup: 1,
    speed: 900,
    watchSlidesProgress: true,
    direction: 'vertical',
    navigation: {
        prevEl: '.vertical-prev',
        nextEl: ".vertical-next",
    },
    breakpoints: {
        0: {
            slidesPerView: 2,
        },
        1331: {
            slidesPerView: 3,
        },
        1631: {
            slidesPerView: 4,
        },
    }
});
var bigSlider = new Swiper(".big-slider", {
    spaceBetween: 20,
    slidesPerView: 1,
    slidesPerGroup: 1,
    speed: 900,
    pagination: {
        el: ".swiper-pagination",
        clickable: true,
    },
    thumbs: {
        swiper: verticalSlider,
    },
});
new Swiper(".sales__box", {
    spaceBetween: 0,
    slidesPerView: "auto",
    slidesPerGroup: 1,
    speed: 900,
    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
    },
    breakpoints: {
        0: {
            spaceBetween: 10,
            slidesPerView: 1.3,
        },
        769: {
            spaceBetween: 0,
            slidesPerView: "auto",
        },
    }
});
// Якорь все характеристики
$(document).on('click', '.jsAllChars', function () {
    let anchor = $(this).attr('href');

    $('.jsTabBody, .jsTabHead').removeClass('active');
    $('#charsTabHead, #charsTabBody').addClass('active')
    var elemWidth = $('.jsTabHead.active').width()
    var elemIndex = $('.jsTabHead.active').index()
    $('html, body').animate({
        scrollTop: $(anchor).offset().top - 130
    }, 600);
    $('.jsScrollParent').animate({ 'scrollLeft': (elemWidth * elemIndex + 1) - 22 }, 500);
    return false;
})
// Универсальные табы 
$(document).on('click', '.jsTabHead', function () {
    var $this = $(this)
    var elemWidth = $(this).width()
    var elemIndex = $(this).index()
    $(this).addClass('active').siblings().removeClass('active');
    let jqParent = $(this).closest('.jsTabParent');
    if ($(this).parent('.jsScrollParent')) {
        if ($this.index() == 0) {
            $('.jsScrollParent').animate({ 'scrollLeft': 0 }, 500);
        } else {
            $('.jsScrollParent').animate({ 'scrollLeft': (elemWidth * elemIndex + 1) - 22 }, 500);
        }
    }
    jqParent.find('.jsTabBody').eq($(this).index()).addClass('active').siblings().removeClass('active');
})