app.run(function ($rootScope, $http, $q, $parse) {
    $q.all([
        $http.get('petstore-simple.json'),
        $http.get('petstore-simple.explained.json')
    ]).then(function (responses) {
        // augment data
        var swagger = responses[0].data;
        var explainations = responses[1].data;
        explainations.forEach(function (explained) {
            var node = (explained.path === '$root') ? swagger : $parse(explained.path)(swagger);
            node._explained = explained;
        });
        $rootScope.swagger = swagger;
        $rootScope.explainations = explainations;
//        console.log(swagger);
    });
    $rootScope.$on('swgOutputSelectionChanged', function (event, explained) {
        $rootScope.explained = explained;
    });

});