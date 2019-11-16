app.controller('product', function ($scope, $location) {
  scope = $scope;
  $scope.product = {
    available: true
    // attributes: [
    //   { "name": "Color", "values": ["Red", "Green", "Blue"], "id": 1 },
    //   { "name": "Size", "values": ["Small", "Medium", "Large"], "id": 2 }
    // ],
    // variants: [
    //   { "name": "Fabric", "values": ["Cotton", "Polyster"], "id": 1 },
    //   { "name": "Made", "values": ["Local", "Imported"], "id": 2 }
    // ]
  };
  $scope.attributes = [];
  $scope.attribute = {};
  $scope.attributeValue = { value: "" };
  $scope.variants = [];
  $scope.variant = {};
  $scope.variantValue = { value: "" };
  $scope.variantCombination = {};

  $scope.saveProduct = function () {
    console.log($scope.product);
  };
  ////////////////////////////////////////////////////////////// Attributes
  $scope.newAttribute = function () {
    $scope.attribute = {};
    $scope.attributeValue.value = "";
    $location.path('attribute');

  };
  $scope.saveAttribute = function () {
    $scope.attributes = $scope.attributes || [];
    if ($scope.attributes.filter(attr => attr.id !== $scope.attribute.id && attr.name === $scope.attribute.name).length > 0) {
      alert('Attribute with same name already exists');
      return;
    }
    let attribute;
    if ($scope.attribute.id) {
      attribute = $scope.attributes.filter(attr => attr.id === $scope.attribute.id)[0];
    } else {
      $scope.attribute.id = (Math.max($scope.attributes.map(a => a.id)) || 0) + 1;
      attribute = {};
      $scope.attributes.push(attribute);
    }
    angular.copy($scope.attribute, attribute);
    $scope.attribute = {};
    $scope.attributeValue.value = "";
    $location.path("attributes");
  };
  $scope.modifyAttribute = function (attr) {
    $scope.attribute = angular.copy(attr);
    $location.path('attribute');
  };
  $scope.deleteAttribute = function () {
    $scope.attributes.splice($scope.attributes.findIndex(a => a.id === $scope.attribute.id), 1);
    $location.path('attributes');
  };
  $scope.addAttributeValue = function () {
    $scope.attribute.values = $scope.attribute.values || [];
    if ($scope.attribute.values.indexOf($scope.attributeValue.value) >= 0) {
      alert("Attribute value already exists");
      return;
    }
    if ($scope.attributeValue.value.length > 0) {
      $scope.attribute.values.push($scope.attributeValue.value);
    }
    $scope.attributeValue.value = "";
  };
  $scope.removeAttributeValue = function (value) {
    $scope.attribute.values = $scope.attribute.values || [];
    $scope.attribute.values.splice($scope.attribute.values.indexOf(value), 1);
  }
  $scope.saveAttributes = function () {
    $scope.product.attributes = $scope.product.attributes || [];
    angular.copy($scope.attributes, $scope.product.attributes);
    $scope.attributes = [];

    let cartesian = [];
    $scope.product.attributes.forEach(attr => {
      cartesian = getCartesian(cartesian, attr.values);
    });
    $scope.product.attributeCombinations = cartesian.map((c, i)=> {return {id: i+1, combination: c}});
    if($scope.product.variantCombinations){
      $scope.product.variantCombinations.forEach(comb => {
        comb.attributeCombinations = angular.copy($scope.product.attributeCombinations).map(ac => {ac.selected = true; return ac;});
      });
    }
    $location.path('product');

    function getCartesian(combinations, values) {
      let cartesian = [];
      if (!combinations || combinations.length === 0) {
        values.forEach(v => {
          cartesian.push([v]);
        });
      } else {
        combinations.forEach(c => {
          values.forEach(v => {
            let comb = [...c];
            comb.push(v);
            cartesian.push(comb);
          });
        });
      }
      return cartesian;
    }
  }
  $scope.modifyAttributes = function (attrs) {
    $scope.attributes = angular.copy(attrs);
    $location.path('attributes');
  }
  $scope.removeAttributeCombination = function(comb) {
    $scope.product.attributeCombinations = $scope.product.attributeCombinations || [];
    $scope.product.attributeCombinations.splice($scope.product.attributeCombinations.indexOf(comb ), 1);
  }
  ///////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////// Variants
  $scope.newVariant = function () {
    $scope.variant = {};
    $scope.variantValue.value = "";
    $location.path('variant');

  };
  $scope.saveVariant = function () {
    $scope.variants = $scope.variants || [];
    if ($scope.variants.filter(vari => vari.id !== $scope.variant.id && vari.name === $scope.variant.name).length > 0) {
      alert('Variant with same name already exists');
      return;
    }
    let variant;
    if ($scope.variant.id) {
      variant = $scope.variants.filter(vari => vari.id === $scope.variant.id)[0];
    } else {
      $scope.variant.id = (Math.max($scope.variants.map(a => a.id)) || 0) + 1;
      variant = {};
      $scope.variants.push(variant);
    }
    angular.copy($scope.variant, variant);
    $scope.variant = {};
    $scope.variantValue.value = "";
    $location.path("variants");
  };
  $scope.modifyVariant = function (vari) {
    $scope.variant = angular.copy(vari);
    $location.path('variant');
  };
  $scope.deleteVariant = function () {
    $scope.variants.splice($scope.variants.findIndex(a => a.id === $scope.variant.id), 1);
    $location.path('variants');
  };
  $scope.addVariantValue = function () {
    $scope.variant.values = $scope.variant.values || [];
    if ($scope.variant.values.indexOf($scope.variantValue.value) >= 0) {
      alert("Variant value already exists");
      return;
    }
    if ($scope.variantValue.value.length > 0) {
      $scope.variant.values.push($scope.variantValue.value);
    }
    $scope.variantValue.value = "";
  };
  $scope.removeVariantValue = function (value) {
    $scope.variant.values = $scope.variant.values || [];
    $scope.variant.values.splice($scope.variant.values.indexOf(value), 1);
  }
  $scope.saveVariants = function () {
    $scope.product.variants = $scope.product.variants || [];
    angular.copy($scope.variants, $scope.product.variants);
    $scope.variants = [];

    let cartesian = [];
    $scope.product.variants.forEach(vari => {
      cartesian = getCartesian(cartesian, vari.values);
    });
    $scope.product.variantCombinations = cartesian.map((c, i)=> {
      return {
        id: i+1, 
        combination: c, 
        price: $scope.product.price,
        available: $scope.product.available,
        attributeCombinations: $scope.product.attributeCombinations ? angular.copy($scope.product.attributeCombinations).map(ac => {ac.selected = true; return ac;}) : []
      };
    });
    $location.path('product');

    function getCartesian(combinations, values) {
      let cartesian = [];
      if (!combinations || combinations.length === 0) {
        values.forEach(v => {
          cartesian.push([v]);
        });
      } else {
        combinations.forEach(c => {
          values.forEach(v => {
            let comb = [...c];
            comb.push(v);
            cartesian.push(comb);
          });
        });
      }
      return cartesian;
    }
  }
  $scope.modifyVariants = function (varis) {
    $scope.variants = angular.copy(varis);
    $location.path('variants');
  }
  $scope.removeVariantCombination = function() {
    let variantCombination = $scope.product.variantCombinations.filter(vc => vc.id === $scope.variantCombination.id)[0];
    $scope.product.variantCombinations.splice(variantCombination, 1);
    $scope.variantCombination = {};
    $location.path('product');
  }
  $scope.modifyVariantCombination = function (comb) {
    $scope.variantCombination = angular.copy(comb);
    $location.path('variant-combination');
  };
  $scope.saveVariantCombination = function() {
    let variantCombination = $scope.product.variantCombinations.filter(variComb => variComb.id === $scope.variantCombination.id)[0];
    angular.copy($scope.variantCombination, variantCombination);
    $location.path('product');
  }
  ///////////////////////////////////////////////////
});