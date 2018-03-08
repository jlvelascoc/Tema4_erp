"use strict";

const DB_NAME = 'UT07Indexed_storeHouse';
const DB_VERSION = 3;
const DB_STORE_NAME_SHOPS = 'shops';
const DB_STORE_NAME_CATEGORIES = 'categories';

var db;
var request = indexedDB.open(DB_NAME, DB_VERSION);

//Evento que se ejecuta si ocurre un error al conectar con la BBDD
request.onerror = function (event) {
  document.getElementById("error").appendChild(document.createTextNode("Error en la solicitud: " + event.target.error));
};

/**
 * Evento que se ejecuta si todo ha ido bien durante la conexion.
 * Carga los datos en los arrays de storehouse
 * @param event
 */
request.onsuccess = function (event) {
  console.log("onsuccess");
  db = event.target.result;

  //Error genérico de la base de datos
  db.onerror = function (event) {
    document.getElementById("error").appendChild(document.createTextNode("Error en el acceso a la base de datos: " + event.target.error + "<br/>"));
  }

  //transacciones para cargar los datos en el erp
  var categoriesObjectStore = db.transaction(DB_STORE_NAME_CATEGORIES).objectStore(DB_STORE_NAME_CATEGORIES);
  var shopsObjectStore = db.transaction(DB_STORE_NAME_SHOPS).objectStore(DB_STORE_NAME_SHOPS);
  var storeHouse = StoreHouse.getInstance();
  var product, category, shop;

  //transaccion de las categorias
  categoriesObjectStore.openCursor().onsuccess = function (event) {
    var cursor = event.target.result;
    //Recorremos el cursor

    if (cursor) {
      //Instanciamos la categoria y la añadimos al erp
      category = new Category(cursor.value.category.id, cursor.value.category.title, cursor.value.category.description);
      storeHouse.addCategory(category);

      //Recorremos los productos para instanciar uno a uno
      for (var i in cursor.value.products) {
        switch (cursor.value.products[i].productType) { //segun el tipo de producto llamamos a un constructor o a otro
          case "bass":
            product = new Bass(cursor.value.products[i].serialNumber, cursor.value.products[i].name, cursor.value.products[i].price, cursor.value.products[i].strings, cursor.value.products[i].electronic);
            break;
          case "drums":
            product = new Drums(cursor.value.products[i].serialNumber, cursor.value.products[i].name, cursor.value.products[i].price, cursor.value.products[i].type);
            break;
          case "amplifier":
            product = new Amplifier(cursor.value.products[i].serialNumber, cursor.value.products[i].name, cursor.value.products[i].price, cursor.value.products[i].watts, cursor.value.products[i].type);
            break;
        }

        //Añadimos la descripcion y la imagenes
        product.description = cursor.value.products[i].description;
        for (let j = 0; j < cursor.value.products[i].images.length; j++) { //Añadimos las imagenes
          product.addImage(cursor.value.products[i].images[j]);
        }
        storeHouse.addProduct(product, category); //Añadimos el producto al array de su categoria
      }
      cursor.continue();
    }
  };

  //transaccion de las tiendas
  shopsObjectStore.openCursor().onsuccess = function (event) {
    var cursor = event.target.result;
    if (cursor) {
      //Instanciamos la tienda y la añadimos al erp
      shop = new Shop(cursor.value.shop.name, cursor.value.shop.cif);
      shop.image = cursor.value.shop.image;
      shop.coords = new Coords(cursor.value.shop.coords.latitude, cursor.value.shop.coords.longitude);
      storeHouse.addShop(shop);

      //Añadimos los productos a la tienda
      for (var i in cursor.value.products) {
        storeHouse.addProductInShop(shop, cursor.value.products[i].serialNumber, cursor.value.products[i].stock);
      }
      cursor.continue();
    }
    else { //Una vez cargados todos los datos invocamos a la funcion para dibujar la pagina;
      storeHouse.name = "Musicopolix"; //Cambiamos el nombre

      //Agregamos un evento onclick al logo para que vuelva a la página principal
      var logo = document.querySelectorAll("header a")[0];
      logo.addEventListener("click", initPopulate);

      initPopulate();
    }
  };
};

/**
 * Evento que se ejecuta para crear la estructura de la tabla o si se ha modificado esa estructura
 * @param event
 */
request.onupgradeneeded = function (event) {
  console.log("onupgradeneeded");
  db = event.target.result;

  //Creamos los contenedores
  var categoryObjectStore = db.createObjectStore(DB_STORE_NAME_CATEGORIES, {keyPath: "category.id"});
  var shopsObjectStore = db.createObjectStore(DB_STORE_NAME_SHOPS, {keyPath: "shop.cif"});

  var xmlhttp = new XMLHttpRequest();

  xmlhttp.onreadystatechange = function () {  //Cuando el fichero esté cargado completamente
    if (this.readyState == 4 && this.status == 200) {
      var myObj = JSON.parse(this.responseText);//Parseamos el json

      //Nos aseguramos que estan los contenedores creados
      shopsObjectStore.transaction.oncomplete  = function () {
        var transaction = db.transaction([DB_STORE_NAME_CATEGORIES, DB_STORE_NAME_SHOPS], "readwrite");
        var categories = transaction.objectStore(DB_STORE_NAME_CATEGORIES);
        var shops = transaction.objectStore(DB_STORE_NAME_SHOPS);

        //Creamos un almacen para categorias. Los objetos almacenados tienen una propiedad category y otra products.
        //category: objeto category, products: array con objetos producto
        for (var i in myObj.categories) {
          categories.add({category: myObj.categories[i].category, products: myObj.categories[i].products});
        }

        //Creamos un almacen para tiendas. Los objetos almacenados tienen una propiedad shop y otra products.
        //shop: objeto shop, products: array con los serialnumber de los productos
        for (var i in myObj.shops) {
          shops.add({shop: myObj.shops[i].shop, products: myObj.shops[i].products});
        }
      }
    }
  };
  xmlhttp.open("GET", "data.json", false);
  xmlhttp.send();
};

/**
 * Esta función añade un nuevo registro al almacen categories
 * @param category
 */
function insertCategoryDB(category) {
  //Creamos la transaccion
  var categoriesObjectStore = db.transaction(DB_STORE_NAME_CATEGORIES, "readwrite").objectStore(DB_STORE_NAME_CATEGORIES);

  //Añadimos la categoria
  categoriesObjectStore.add({category: category.getObject(), products: []});
}

/**
 * Esta funcion modifica un registro del almacen categories
 * @param category
 */
function editCategoryDB(category) {
  var categoriesObjectStore = db.transaction(DB_STORE_NAME_CATEGORIES, "readwrite").objectStore(DB_STORE_NAME_CATEGORIES);
  var modified = false; //Condicion de salida

  //Creamos un cursor para recorrer las categrias
  categoriesObjectStore.openCursor().onsuccess = function (event) {
    var cursor = event.target.result;

    if (cursor && !modified) {
      //si id de la categoria actual es igual al de la categoria pasada por parametro, actualizamos el registro
      if (cursor.value.category.id == category.id) {
        var updateData = cursor.value;

        updateData.category.id = category.id;
        updateData.category.title = category.title;
        updateData.category.description = category.description;

        cursor.update(updateData);
        modified = true; //Cambiamos el valor de la variable para que no se vuelva a iterar
      }
      cursor.continue();
    }
  };
}

/**
 * Esta función elimina un registro del almacen categories
 * @param category
 */
function removeCategoryDB(category) {
  var categoriesObjectStore = db.transaction(DB_STORE_NAME_CATEGORIES, "readwrite").objectStore(DB_STORE_NAME_CATEGORIES);
  var request = categoriesObjectStore.get(category.id);

  request.onsuccess = function () {
    productsToDefaultCategory(request.result.products);
    categoriesObjectStore.delete(category.id);
  };
}

/**
 * Esta funcion cambia los productos de una categoria a la categoria por defecto
 * @param products
 */
function productsToDefaultCategory(products) {
  var categoriesObjectStore = db.transaction(DB_STORE_NAME_CATEGORIES, "readwrite").objectStore(DB_STORE_NAME_CATEGORIES);
  var request = categoriesObjectStore.get(StoreHouse.getInstance().defaultCategory);

  request.onsuccess = function () {
    var updateData = request.result;

    for (let i in products) { //Recorremos los productos
      var index = updateData.products.findIndex(function (a) { //Obtenemos el indice
        return a.serialNumber == products[i].serialNumber;
      });

      if (index == -1) { //Si el indice es -1 significa que no existe todavia y por lo tanto lo añadimos
        updateData.products.push(products[i]);
      }
    }

    categoriesObjectStore.put(updateData);//Actualizamos el registro
  };
}

/**
 * Esta función inserta un nuevo registro en el almacen shops
 * @param shop
 */
function insertShopDB(shop) {
  //Creamos la transaccion
  var shopsObjectStore = db.transaction(DB_STORE_NAME_SHOPS, "readwrite").objectStore(DB_STORE_NAME_SHOPS);

  //Añadimos la categoria
  shopsObjectStore.add({shop: shop.getObject(), products: []});
}

/**
 * Esta funcion edita un registro del almacen shops
 * @param shop
 */
function editShopDB(shop) {
  var shopsObjectStore = db.transaction(DB_STORE_NAME_SHOPS, "readwrite").objectStore(DB_STORE_NAME_SHOPS);
  var modified = false; //Condicion de salida

  //Creamos un cursor para recorrer las tiendas
  shopsObjectStore.openCursor().onsuccess = function (event) {
    var cursor = event.target.result;

    if (cursor && !modified) {
      //si cif de la tienda actual es igual al de la tienda pasada por parametro, actualizamos el registro
      if (cursor.value.shop.cif == shop.cif) {
        var updateData = cursor.value;

        updateData.shop.id = shop.id;
        updateData.shop.name = shop.name;
        updateData.shop.address = shop.address;
        updateData.shop.phone = shop.phone
        updateData.shop.image = shop.image;

        cursor.update(updateData); //Actualizamos el registro
        modified = true; //Cambiamos la condicion para que no itera más
      }
      cursor.continue();
    }
  };
}

/**
 * Esta funcion elimina un registro del almacen shops
 * @param shop
 */
function removeShopDB(shop) {
  var shopsObjectStore = db.transaction(DB_STORE_NAME_SHOPS, "readwrite").objectStore(DB_STORE_NAME_SHOPS);
  var request = shopsObjectStore.get(shop.cif);

  request.onsuccess = function () {
    productsToDefaultShop(request.result.products); //Cambiamos los productos a la tienda por defecto
    shopsObjectStore.delete(shop.cif);
  };
}

/**
 * Esta función cambia los productos de una tienda a la tienda por defecto
 * @param products Array de productos y stock
 */
function productsToDefaultShop(products) {
  var shopsObjectStore = db.transaction(DB_STORE_NAME_SHOPS, "readwrite").objectStore(DB_STORE_NAME_SHOPS);
  var request = shopsObjectStore.get(StoreHouse.getInstance().defaultShop);

  request.onsuccess = function () {
    var updateData = request.result;

    updateData.shop.id = request.result.shop.id;
    updateData.shop.name = request.result.shop.name;
    updateData.shop.address = request.result.shop.address;
    updateData.shop.phone = request.result.shop.phone
    updateData.shop.image = request.result.shop.image;

    for (let i in products) { //Recorremos los productos
      var index = updateData.products.findIndex(function (a) { //obtenemos el indice
        return a.serialNumber == products[i].serialNumber;
      });

      if (index == -1) { //Si el indice es -1 significa que no existe en la tienda por defecto y lo añadimos
        updateData.products.push({serialNumber: products[i].serialNumber, stock: products[i].stock});
      }
      else { //Si existe incrementamos su stock
        updateData.products[i].stock += products[i].stock;
      }
    }

    shopsObjectStore.put(updateData); //Actualizamos el registro
  };
}

/**
 * Esta función inserta un producto en la propiedad products de una categoria
 * @param product
 * @param category
 */
function insertProductDB(product, category) {
  //Creamos la transaccion
  var productsObjectStore = db.transaction(DB_STORE_NAME_CATEGORIES, "readwrite").objectStore(DB_STORE_NAME_CATEGORIES);
  var inserted = false;

  //Creamos un cursor para recorrer las categorias
  productsObjectStore.openCursor().onsuccess = function (event) {

    var cursor = event.target.result;

    if (cursor && !inserted) {
      //si el id de la categoria actual es igual al de la categoria pasada por parametro, borramos el registro
      if (cursor.value.category.id == category.id) {
        var updateData = cursor.value;

        cursor.value.products.push(product.getObject()); //Añadimos el producto
        updateData.products = cursor.value.products; //Modificamos el array de indexedDB

        cursor.update(updateData); //Actualizamos el registro
        inserted = true;  //Cambiamos la condicion para no iterar mas
      }
      cursor.continue();
    }
  };
}

/**
 * Esta funcion edita la informacion de un producto
 * @param product
 * @param category
 */
function editProductDB(product, category) {
  //Creamos la transaccion
  var productsObjectStore = db.transaction(DB_STORE_NAME_CATEGORIES, "readwrite").objectStore(DB_STORE_NAME_CATEGORIES);
  var modified = false;

  //Creamos un cursor para recorrer las categorias
  productsObjectStore.openCursor().onsuccess = function (event) {

    var cursor = event.target.result;

    if (cursor && !modified) {
      //si el id de la categoria actual es igual al de la categoria pasada por parametro, borramos el registro
      if (cursor.value.category.id == category.id) {
        //Recorremos el array de productos
        for (let i = 0; i < cursor.value.products.length && !modified; i++) {
          if (cursor.value.products[i].serialNumber == product.serialNumber) {
            var updateData = cursor.value;

            //Modificamos las propiedades genericas
            cursor.value.products[i].name = product.name;
            cursor.value.products[i].description = product.description;
            cursor.value.products[i].price = product.price;
            cursor.value.products[i].images = product.images;

            //Modificamos la propiedades especificas
            switch (cursor.value.products[i].productType) {
              case "bass":
                cursor.value.products[i].strings = product.strings;
                cursor.value.products[i].electronic = product.electronic;
                break;
              case "drums":
                cursor.value.products[i].type = product.type;
                cursor.value.products[i].toms = product.toms;
                break;
              case "amplifier":
                cursor.value.products[i].watts = product.watts;
                cursor.value.products[i].type = product.type;
                break;
            }
            updateData.products = cursor.value.products;
            cursor.update(updateData); //Actualizamos el registro
            modified = true; //Cambiamos la codiciones para no iterar mas
          }
        }
      }
      cursor.continue();
    }
  };
}

function removeProductDB(product, category) {
  //Creamos la transaccion
  var productsObjectStore = db.transaction(DB_STORE_NAME_CATEGORIES, "readwrite").objectStore(DB_STORE_NAME_CATEGORIES);
  var removed = false;

  //Creamos un cursor para recorrer las categorias
  productsObjectStore.openCursor().onsuccess = function (event) {

    var cursor = event.target.result;

    if (cursor && !removed) {
      //si el id de la categoria actual es igual al de la categoria pasada por parametro, borramos el registro
      if (cursor.value.category.id == category.id) {
        for (let i = 0; i < cursor.value.products.length && !removed; i++) {
          if (cursor.value.products[i].serialNumber == product.serialNumber) {
            var updateData = cursor.value;
            cursor.value.products.splice(i, 1);

            updateData.products = cursor.value.products;
            cursor.update(updateData);
            removed = true;
          }
        }
      }
      cursor.continue();
    }
  };
}

/**
 * Esta funcion añade un producto y un stock a un tienda
 * @param shop
 * @param serialNumber
 * @param stock
 */
function addProductInShopDB(shop, serialNumber, stock) {
  //Creamos la transaccion
  var shopsObjectStore = db.transaction(DB_STORE_NAME_SHOPS, "readwrite").objectStore(DB_STORE_NAME_SHOPS);
  var added = false;

  //Creamos un cursor para recorrer las tiendas
  shopsObjectStore.openCursor().onsuccess = function (event) {

    var cursor = event.target.result;

    if (cursor && !added) {
      //si el id de la tienda actual es igual al de la tienda pasada por parametro, borramos el registro
      if (cursor.value.shop.cif == shop.cif) {
        //Recorremos los productos
        for (let i = 0; i < cursor.value.products.length && !added; i++) {
          if (cursor.value.products[i].serialNumber == serialNumber) {
            var updateData = cursor.value;

            updateData.products[i].serialNumber = serialNumber;
            updateData.products[i].stock += stock;
            updateData.products = cursor.value.products;
            cursor.update(updateData);
            added = true;
          }
        }
        //Si no se ha cambiado el valor de la condicion significa que no existe ese producto en la tienda
        //Por lo tanto lo añadimos
        if (!added) {
          var updateData = cursor.value;
          updateData.products.push({serialNumber: serialNumber, stock: stock});
          updateData.products = cursor.value.products;
          cursor.update(updateData);
          added = true;
        }
      }
      cursor.continue();
    }
  };
}
