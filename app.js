var app = angular.module('bizlinked' , ["ngRoute"]);
app.config(function($routeProvider) {
  $routeProvider
  .when("/", {
    templateUrl : "product.html"
  })
  .when("/product", {
    templateUrl : "product.html"
  })
  .when("/attributes", {
    templateUrl : "attributes.html"
  })
    .when("/attribute", {
    templateUrl : "attribute.html"
  })
  .when("/variants", {
    templateUrl : "variants.html"
  })
  .when("/variant", {
    templateUrl : "variant.html"
  })
  .when("/variant-combination", {
    templateUrl : "variant-combination.html"
  })
});
