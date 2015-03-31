app.directive('swgOutput', function ($compile, swgOutputSelection) {
    return {
        template: [
            '<span ng-switch="type" ng-class="[\'swg-output\', \'swg-output--\' + type]">',
            '<span ng-switch-when="string">"<span class="swg-output__string">{{value}}</span>"</span>',
            '<span ng-switch-when="number">{{value}}</span>',
            '<span ng-switch-when="boolean">{{value}}</span>',
            '<span ng-switch-when="undefined">undefined</span>',
            '<span ng-switch-when="object">{',
            '  <div class="swg-output__object">',
            '    <div ng-repeat="property in properties" ng-class="{\'swg-output__hover\': property.explained, \'swg-output--active\': property.explained == explained}">',
            '      "<span class="swg-output__property">{{property.name}}</span>"<span class="swg-output__double-colon">:</span>',
            '      <swg-output value="property.value"></swg-output><span ng-if="!$last">,</span>',
            '    </div>',
            '  </div>',
            '}</span>',
            '<span ng-switch-when="array">[',
            '  <div class="swg-output__array">',
            '    <div ng-repeat="item in value track by $index">',
            '      <swg-output value="item"></swg-output><span ng-if="!$last">,</span>',
            '    </div>',
            '  </div>',
            ']</span>',
            '<span ng-switch-default>[swg-output error] Type "{{type}}" not implemented</span>',
            '</span>'
        ].join(''),
        scope: {
            value: '='
        },
        compile: function (element) {
            var contents = element.contents().remove();
            var compiledContents;
            return {
                post: function ($scope, element) {
                    // Compile the contents
                    if (!compiledContents) {
                        compiledContents = $compile(contents);
                    }
                    // Re-add the compiled contents to the element
                    compiledContents($scope, function (clone) {
                        element.append(clone);
                    });
                    $scope.$watch('value', function (value) {
                        $scope.type = angular.isArray(value) ? 'array' : typeof value;
                        $scope.properties = [];
                        if ($scope.type === 'object') {
                            for (var property in value) {
                                if (property !== '_explained') {
                                    $scope.properties.push({
                                        name: property,
                                        value: value[property]
                                    });
                                }
                            }
                            $scope.properties.forEach(function (property) {
                                if (typeof property.value === 'object' && property.value._explained) {
                                    property.explained = property.value._explained;
                                }
                            });
                            
                        }
                    });
                    element.bind('mousemove', function (e) {
                        var targetEl = $(e.target);
                        if (targetEl.hasClass('swg-output__hover')) {
                            if (swgOutputSelection.set(targetEl.scope().property.explained)) {
                                $scope.$apply();
                            }
                        } else {
                            var parents = targetEl.parents('.swg-output__hover');
                            if (parents.length) {
                                if (swgOutputSelection.set($([parents[0]]).scope().property.explained)) {
                                    $scope.$apply();
                                }
                            }
                        }
                    });
                    $scope.explained = swgOutputSelection.get(); 
                    $scope.$on('swgOutputSelectionChanged', function (event, explained) {
                        $scope.explained = explained;
                    });
                }
            };
        }
    };
});