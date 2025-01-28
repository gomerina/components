if (AbcwwwMaskPhone === undefined) {
    var AbcwwwMaskPhone = new function () {
        this.isNum = function (value) {
            return /\d/.test(value);
        };
        this.maskEditValue = function (input, pos) {
            let posReturn = pos;
            let posReturnChange = true;
            if (pos > 0) {
                pos--;
            }

            let valueNew = '';
            for (let posValue = 0; posValue < pos; posValue++) {
                valueNew += input.value.charAt(posValue);
            }

            let posMask = pos;
            for (let posValue = pos; posValue < input.value.length; posValue++) {
                if (posMask < input.mask.length) {
                    let simbolValue = input.value.charAt(posValue);
                    let simbolMask = input.mask.charAt(posMask);

                    if (
                        simbolMask == simbolValue
                        || (simbolMask == '9' && AbcwwwMaskPhone.isNum(simbolValue))
                    ) {
                        posReturnChange = false;
                        valueNew += simbolValue;
                        posMask++;
                    } else if (
                        simbolMask == '9'
                        && !AbcwwwMaskPhone.isNum(simbolValue)
                    ) {
                        posReturnChange = false;
                    } else if (
                        simbolMask != '9'
                        && AbcwwwMaskPhone.isNum(simbolValue)
                    ) {
                        valueNew += simbolMask;
                        posMask++;
                        posValue--;
                        if (posReturnChange) {
                            posReturn++;
                        }
                        if (
                            input.valueOld.length > posReturn
                            && input.valueOld.charAt(posReturn - 1) == simbolMask
                        ) {
                            while (posReturn > 1 && !AbcwwwMaskPhone.isNum(input.valueOld.charAt(posReturn - 1))) {
                                posReturn--;
                            }
                        }
                    } else if (
                        simbolMask != '9'
                        && !AbcwwwMaskPhone.isNum(simbolValue)
                    ) {
                        valueNew += simbolMask;
                        posMask++;
                    }
                }
            }
            input.value = valueNew;
            input.valueOld = valueNew;

            let valueNotFull = '';
            for (let posMask = 0; posMask < input.mask.length; posMask++) {
                let simbolMask = input.mask.charAt(posMask);
                if (simbolMask == '9') {
                    if (input.value.length <= posMask) {
                        input.value = valueNotFull;
                        input.valueOld = valueNotFull;
                        posReturn = input.value.length;
                    }
                    break;
                }
                valueNotFull += simbolMask;
            }

            return posReturn;
        };
        this.cursorPosition = function (input) {
            let posMinimum = 0;
            for (let posMask = 0; posMask < input.mask.length; posMask++) {
                let simbolMask = input.mask.charAt(posMask);
                if (
                    simbolMask == '9'
                    || input.value.length <= posMask
                ) {
                    posMinimum = posMask;
                    break;
                }
            }
            if (
                input.selectionStart < posMinimum
                || input.selectionEnd < posMinimum
            ) {
                input.selectionStart = posMinimum;
                input.selectionEnd = posMinimum;
            }
        }
        this.maskDefault = '+7 (999) 999-99-99';

        this.init = function (input, mask, placeholder) {
            placeholder = placeholder === undefined || placeholder === true ? true : false;
            if (!input) {
                return false;
            }
            if (!input.classList.contains('is-masked')) {
                input.mask = mask || AbcwwwMaskPhone.maskDefault;
                input.valueOld = input.value;
                AbcwwwMaskPhone.maskEditValue(input, 0);
                if (input.value.length != input.mask.length) {
                    input.value = '';
                }
                if (placeholder) {
                    input.setAttribute('placeholder', input.mask);
                }

                input.classList.add('is-masked');

                input.addEventListener('input', function () {
                    let posReturn = AbcwwwMaskPhone.maskEditValue(this, this.selectionStart);
                    this.selectionStart = posReturn;
                    this.selectionEnd = posReturn;
                });
                input.addEventListener('focus', function () {
                    if (this.value.length <= 0) {
                        this.value = this.valueOld;
                        this.selectionStart = this.value.length;
                        this.selectionEnd = this.value.length;
                    }
                });
                input.addEventListener('blur', function () {
                    if (this.value.length != this.mask.length) {
                        this.value = '';
                    }
                });
                input.addEventListener('keydown', function () {
                    let obInput = this;
                    setTimeout(function () {
                        AbcwwwMaskPhone.cursorPosition(obInput);
                    }, 10);
                });
                input.addEventListener('keyup', function () {
                    AbcwwwMaskPhone.cursorPosition(this);
                });
                input.addEventListener('click', function () {
                    AbcwwwMaskPhone.cursorPosition(this);
                });
            }
        };
    };
}
$(document).ready(function () {
    $.fancybox.defaults.backFocus = false;
    $.fancybox.defaults.autoFocus = false;
    let jsTel = $('.jsTel');
    jsTel.each(function () {
        AbcwwwMaskPhone.init(this, '+7 (999) 999-99-99', false);
    });
    let sidebarItem = document.querySelectorAll('.catalog-aside__range');

    function sliders() {
        sidebarItem.forEach((elem) => {
            let sliders = elem.querySelector('.sliders');

            if (sliders) {
                let inputMin = elem.querySelector('.min');
                let inputMax = elem.querySelector('.max');
                let minValue = parseInt(inputMin.dataset.min);
                let maxValue = parseInt(inputMax.dataset.max);
                let inputs = [inputMin, inputMax];
                noUiSlider.create(sliders, {
                    start: [minValue, maxValue],
                    step: 1,
                    connect: true,
                    range: {
                        min: minValue,
                        max: maxValue,
                    },
                });
                sliders.noUiSlider.on('update', function (values, handle) {
                    inputs[handle].value = parseInt(values[handle]);
                });
                inputMin.addEventListener('change', function () {
                    sliders.noUiSlider.set([this.value, null]);
                });
                inputMax.addEventListener('change', function () {
                    sliders.noUiSlider.set([null, this.value]);
                });
            }

        });
    }
    sliders();
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

    new Swiper(".services__inner", {
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
    new Swiper(".main-slider", {
        spaceBetween: 15,
        slidesPerView: 1,
        slidesPerGroup: 1,
        speed: 900,
        navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
        },
        pagination: {
            el: ".swiper-pagination",
            clickable: true,
        },
    });
    new Swiper(".cards-slider", {
        spaceBetween: 20,
        slidesPerView: 5,
        slidesPerGroup: 1,
        speed: 900,
        navigation: {
            nextEl: ".cards-slider-next",
            prevEl: ".cards-slider-prev",
        },
        pagination: {
            el: ".swiper-pagination",
            clickable: true,
        },
        breakpoints: {
            0: {
                slidesPerView: 1.3,
                spaceBetween: 12,
            },
            769: {
                slidesPerView: 2,
                spaceBetween: 12,
            },
            1025: {
                slidesPerView: 3,
                spaceBetween: 20,
            },
            1331: {
                slidesPerView: 4,
                spaceBetween: 20,
            },
            1631: {
                slidesPerView: 5,
                spaceBetween: 20,
            },
        }
    });
    var verticalSlider = new Swiper(".vertical-slider", {
        spaceBetween: 20,
        slidesPerView: 4,
        slidesPerGroup: 1,
        speed: 900,
        watchSlidesProgress: true,
        direction: 'vertical',
        navigation: {
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
    $('select').styler();
    $(document).on('click', '.jsOpenModal', function (e) {
        let objButton = $(this);
        e.preventDefault();
        $.fancybox.open({
            src: objButton.data('url'),
            type: 'ajax',
            opts: {
                touch: false,
                afterShow: function (instance, current) {
                    let objSource = current.$content;
                    let jsTel = objSource.find('.jsTel')
                    jsTel.each(function () {
                        AbcwwwMaskPhone.init(this, '+7 (999) 999-99-99', false);
                    });
                }
            }
        });
    });
    $(document).on('click', '.jsBurger', function () {
        $('.jsMenu').addClass('active')
    })
    $(document).on('click', '.jsCloseMenu', function () {
        $('.jsMenu').removeClass('active')
    })
    $(document).on('click', '.jsTogglerHead', function () {
        var $this = $(this);
        var togglerParent = $(this).closest('.jsTogglerParent');
        if (togglerParent) {
            togglerParent.find('.jsTogglerHead').toggleClass('active');
            togglerParent.find('.jsTogglerBody').slideToggle();
        } else {
            $this.toggleClass('active');
            $this.next('.jsTogglerBody').slideToggle();
        }
    })
    $(document).on('click', '.jsDecrease', function () {
        var $input = $(this).closest('.jsCounterParent').find('.jsCounterInput');
        var count = parseInt($input.val()) - 1;
        count = count < 1 ? 1 : count;
        $input.val(count);
        $input.change();
        return false;
    })
    $(document).on('click', '.jsIncrease', function () {
        var $input = $(this).closest('.jsCounterParent').find('.jsCounterInput');
        if ($input.val() <= parseInt($input.attr('max')) - 1) {
            $input.val(parseInt($input.val()) + 1);
            $input.change();
        } else {
            return false;
        }
    })

    $(document).on('click', '.jsMobileFilter', function () {
        $('.jsOverlay, .jsCatalogAside').addClass('active')
    })
    $(document).on('click', '.jsOverlay, .jsCloseAside', function () {
        $('.jsOverlay, .jsCatalogAside').removeClass('active')
    })
    $(document).on('click', '.jsOpenCatalog', function () {
        $('.jsHeaderCatalog').addClass('active')
    })
    $(document).on('click', '.jsCloseCatalog', function () {
        $('.jsHeaderCatalog').removeClass('active')
    })
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
    $('.textpage table').each(function () {
        $(this).find('td').each(function () {
            $(this).attr('data-cell', $(this).closest('table').find('th').eq($(this).index()).text())
        })
    })
    $(window).on('scroll', function () {
        if (window.scrollY > $('.header').height()) {
            $('.header').addClass('sticked')
        } else {
            $('.header').removeClass('sticked')
        }
    })
})