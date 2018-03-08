"use strict";

function saveData() {
  var storeHouse = StoreHouse.getInstance();
  var categories = storeHouse.categories;
  var category = categories.next();
  var shops = storeHouse.shops;
  var shop = shops.next();
  var arrayCategories = [];
  var arrayProducts;
  var arrayShops = [];
  var arrayProductsShop;
  var myObject;
  var myJson;

  while(category.done !== true){
    //Creamos un array con los literales de los productos
    arrayProducts = [];
    for (var i in category.value.products){
      arrayProducts.push(category.value.products[i].getObject());
    }

    //Añadimos el objeto que necesitamos para trabajar con categorias y productos
    arrayCategories.push({category: category.value.category.getObject(), products: arrayProducts});
    category = categories.next();
  }

  while(shop.done !== true){
    //Creamos un array con los literales de los productos
    arrayProductsShop = [];
    for (var i in shop.value.products){
      arrayProductsShop.push({serialNumber: shop.value.products[i].serialNumber, stock: shop.value.products[i].stock});
    }

    //Añadimos el objeto que necesitamos para trabajar con categorias y productos
    arrayShops.push({shop: shop.value.shop.getObject(), products: arrayProductsShop});
    shop = shops.next();
  }

  //Creamos un objeto con todos los objetos del erp
  myObject = {categories: arrayCategories, shops: arrayShops};
  console.log(myObject);
  myJson = JSON.stringify(myObject);

  var xmlhttp = new XMLHttpRequest();
  xmlhttp.onreadystatechange = function(){
    if (this.readyState == 4 && this.status == 200){
      console.log("enviado");
    }
  }
  xmlhttp.open("POST", "saveData.php", false);
  xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  xmlhttp.send("json=" + myJson);
}
