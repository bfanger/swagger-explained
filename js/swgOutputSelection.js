app.service('swgOutputSelection', function ($rootScope) {
    var selected = -'NaN';
    this.set = function (value) {
        var hasChanged = selected !== value;
        selected = value;
        if (hasChanged) {
            $rootScope.$broadcast('swgOutputSelectionChanged', value);
        }
        return hasChanged;
    };
    this.get = function () {
        return selected;
    };
});