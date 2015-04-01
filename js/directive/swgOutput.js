app.directive('swgOutput', function ($compile, swgOutputSelection) {
    /**
     * 
     * @param {Scope} $scope
     * @returns {Object} explained
     */
    function extractExplained($scope) {
        if ($scope.property && typeof $scope.property.value === 'object' && $scope.property.value._explained) {
            return $scope.property.value._explained;
        }
        if (typeof $scope.item === 'object' && $scope.item._explained) {
            return $scope.item._explained;
        }
        if (typeof $scope.value === 'object' && $scope.value._explained) {
            return $scope.value._explained;
        }
        if ($scope.$parent) {
            return extractExplained($scope.$parent);
        }
    }
    return {
        template: [
            '<span ng-switch="type" ng-class="[\'swg-output\', \'swg-output--\' + type]">',
            '<span ng-switch-when="string">"<span class="swg-output__string">{{value}}</span>"</span>',
            '<span ng-switch-when="number">{{value}}</span>',
            '<span ng-switch-when="boolean">{{value}}</span>',
            '<span ng-switch-when="undefined">undefined</span>',
            '<span ng-switch-when="object">{',
            '  <div class="swg-output__indent">',
            '    <div ng-repeat="property in properties" ng-class="[hoverClass(property.value._explained)]">',
            '      "<span class="swg-output__property">{{property.name}}</span>"<span class="swg-output__double-colon">:</span>',
            '      <swg-output value="property.value" as-property="true"></swg-output><span ng-if="!$last">,</span>',
            '    </div>',
            '  </div>',
            '}</span>',
            '<span ng-switch-when="array">[',
            '  <div class="swg-output__indent">',
            '    <div ng-repeat="item in value track by $index" ng-class="[hoverClass(item._explained)]">',
            '      <swg-output value="item"></swg-output><span ng-if="!$last">,</span>',
            '    </div>',
            '  </div>',
            ']</span>',
            '<span ng-switch-default>[swg-output error] Type "{{type}}" not implemented</span>',
            '</span>'
        ].join(''),
        scope: {
            value: '=',
            asProperty: '='
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
                        }
                    });

                    element.bind('mousemove', function (e) {
                        var explained = extractExplained($(e.target).scope());
                        if (explained && swgOutputSelection.set(explained)) {
                            $scope.$apply();
                        }
                    });
                    $scope.hoverClass = function (explained) {
                        if (explained) {
                            if (explained === swgOutputSelection.get()) {
                                return 'swg-output--active';
                            }
                            return 'swg-output__hover';
                        }
                    };
                }

            };
        }
    };
});