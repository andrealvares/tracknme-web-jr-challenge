angular.module('materialize', []).directive('datePicker', datePicker);

function datePicker(){
    var directive = {};

    directive.restrict = "E";
    directive.scope = true;

    directive.compile = function($element, $attrs) {

        var elementHtml = '<input type="text" class="datepicker" ng-model="'+
                            $attrs.bindTo + '" placeholder="' + $attrs.placeholder + '">';

        $element.html(elementHtml);
        
        $(document).ready(function(){
            $('.datepicker').datepicker({format: 'yyyy-mm-dd'});
        });
    }

    return directive;
}