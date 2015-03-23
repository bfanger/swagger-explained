app.run(function ($rootScope, $http, $q, $parse) {
    $q.all([
        $http.get('petstore-simple.json'),
        $http.get('petstore-simple.explained.json')
    ]).then(function (responses) {
        // augment data
        var swagger = responses[0].data;
        var explained = responses[1].data;
        for (var path in explained) {
            var node = $parse(path)(swagger);
            node._explained = explained[path];
        }
        $rootScope.swagger = swagger;
        console.log(swagger);
    });
    $rootScope.$on('swgOutputHover', function (e, explained) {
        $rootScope.explained = explained;
    });

});