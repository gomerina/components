$(document).ready(function () {
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
    // Если по инпуту можно кликнуть и задать колчиество товара вручную - скрипт ниже ограничивает счётчик по атрибуту инпута max
    //$(document).on('input', '.jsCounterInput', function () {
    //    if ($(this).val() > parseInt($(this).attr('max'))) {
    //        $(this).val(parseInt($(this).attr('max')))
    //    }
    //})
})