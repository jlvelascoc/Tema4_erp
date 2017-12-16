"use strict";

//Declaración del objeto StoreHouse con un patrón Singleton
var StoreHouse = (function () {
  var instantiated;

  //Función que instancia el objeto StoreHouse
  function init() {
    //Constructor de la instancia StoreHouse
    function StoreHouse() {
      //Controlamos que se instancia mediante constructos
      if (!(this instanceof StoreHouse)) throw new InvalidAccessConstructorException();

      /**
       * Propiedad name.
       * @type {string}
       * @private
       */
      var _name = "Anonymous";
      //Propiedad publica de acceso a _name
      Object.defineProperty(this, 'name', {
        get: function () {
          return _name;
        },
        set: function (value) {
          //Controlamos que value no sea vacio
          if (!value) throw new EmptyValueException("nombre");
          _name = value;
        }
      });

      /**
       * Propiedad categories
       * Es un array de objetos. Cada objeto contiene un objeto categoria
       * y un array con los productos de dicha categoria. Los productos están
       * embebidos
       * @type {Array} Array de objetos
       * @private
       */
      var _categories = [];
      //Propiedad publica de acceso a _categories. Devuelve un iterador
      Object.defineProperty(this, 'categories', {
        get: function () {    //iterador para recorrer las categorias
          var nextIndex = 0;
          return {
            next: function () {
              return (nextIndex < _categories.length) ?
                {value: _categories[nextIndex++].category, done: false} :
                {done: true};
            }
          }
        }
      });

      //Metodos publicos para gestionar las categorias
      /**
       * Este método permite añadir una nueva categoria.
       * @param category Objeto Category
       * @returns {number} Numero de categorias que tenemos
       */
      this.addCategory = function (category) {
        if (!category) throw new EmptyValueException("category"); //Controlamos que category sea vacio
        //Controlamos que category sea una instacia de Category
        if (!(category instanceof Category)) throw new WrongValueException("Category");
        //Controlamos que category no se encuentra anteriormente
        if (getCategoryIndex(category) !== -1) throw new ExistingCategoryException(category.title);

        //Añadimos la categoria y un array vacio que contendrá a los productos
        _categories.push({category: category, products: []});
        return _categories.length;
      };

      /**
       * Este método permite eliminar una categoria.
       * @param category Objeto Category
       * @returns {number} Numero de categorias que tenemos
       */
      this.removeCategory = function (category) {
        if (!category) throw new EmptyValueException();   //Controlamos que category sea vacio
        //Controlamos que category sea una instacia de Category
        if (!(category instanceof Category)) throw new WrongValueException("Category");
        //Buscamos la posicion de la categoria en el array. Si no se encuentra lanzamos una excepción
        var index = getCategoryIndex(category);
        if (index === -1) throw new NonExistingCategoryException(category.id);

        //Añadimos los productos de esa categoria a la categoria por defecto
        for (let i = 0; i < _categories[index].products.length; i++) {
          this.addProduct(_categories[index].products[i], this.defaultCategory);
        }

        //Borramos la categoria del array
        _categories.splice(index, 1);
        return _categories.length;
      }

      /**
       * Este método devuelve un iterador de los productos de una categoria.
       * Si recibimos el parametro type, solo devuelve los productos de ese tipo
       * @param category Objeto categoria.
       * @param type Tipo de producto (opcional)
       * @returns {{next: next}} Iterador
       */
      this.getCategoryProducts = function (category, type) {
        if (!category) throw new EmptyValueException();   //Controlamos que category no sea vacio
        //Controlamos que category sea una instacia de Category
        if (!(category instanceof Category)) throw new WrongValueException("Category");
        //Buscamos la posicion de la categoria en el array. Si no se encuentra lanzamos una excepción
        var index = getCategoryIndex(category);
        if (index === -1) throw new NonExistingCategoryException(category.name);

        var nextIndex = 0; //Variable utilizada por el iterador para avanzar al siguiente producto
        return {
          next: function () {//Metodo que devuelve el siguiente producto
            if (type !== undefined){ //Si nos han pasado un tipo, filtramos los productos por él
              return (nextIndex < _categories[index].products.length &&
              ((_categories[index].products[nextIndex]) instanceof type))?
                {value: _categories[index].products[nextIndex++], done: false} :
                {done: true};
            }
            else {
              return (nextIndex < _categories[index].products.length) ?
                {value: _categories[index].products[nextIndex++], done: false} :
                {done: true};
            }
          }
        }
      }

      /**
       * Metodo que nos permite añadir un producto a una categoria.
       * Si no nos pasan categoria se añade ala categoria por defecto
       * @param product Objeto Product
       * @param category Objeto Category (Opcional)
       * @returns {number} Numero de productos en esa categoria
       */
      this.addProduct = function (product, category) {
        if (!product) throw new EmptyValueException("product");   //Controlamos que product no sea vacio
        //Controlamos que product sea una instacia de product
        if (!(product instanceof Product)) throw new WrongValueException("Product");
        //Si category no existe le damos el valor de la categoria por defecto
        if (!category || category === 'undefined') {
          category = this.defaultCategory;
        }
        //Controlamos que product sea una instacia de product
        if (!(category instanceof Category)) throw new WrongValueException("Category");

        //Obtenemos la posicion de la categoria en el array
        var categoryIndex = getCategoryIndex(category);
        if (categoryIndex === -1) {   //Si no existe la añadimos
          categoryIndex = this.addCategory(category) - 1;
        }

        //Obtenemos la posicion del producto en el array
        var productIndex = getProductIndex(product, categoryIndex);
        //Si no existe lo añadimos.
        if (productIndex === -1) {
          _categories[categoryIndex].products.push(product);
        }
        else { //Si ya existe lanzamos excepcion
          throw new ExistingValueException("product", product.name);
        }

        //Devolvemos el numero de productos de esa categoria
        return _categories[categoryIndex].products.length;
      }

      /**
       * Este método nos permite eliminar un producto
       * @param product Objeto Product
       * @returns {number} Numero de productos en esa categoria
       */
      this.removeProduct = function (product) {
        if (!product) throw new EmptyValueException("product");   //Controlamos que product no sea vacio
        //Controlamos que product sea una instacia de product
        if (!(product instanceof Product)) throw new WrongValueException("Product");

        var removed = false; //Esta variable nos permite saber si hemos borrado el producto
        //Recorremos los productos categoria a categoria. Cuando se elimina el producto el bucle se corta.
        for (var i = 0; i < _categories.length && !removed; i++) {
          for (let j = 0; j < _categories[i].products.length && !removed; j++) {
            if (_categories[i].products[j] === product) {
              _categories[i].products.splice(j, 1); //Borramos el producto
              removed = true; //Cambiamos la condicion
            }
          }
        }

        if (removed) { //Si el producto se ha borrado devolvemos el numero de productos de esa categoria
          return _categories[i].products.length;
        }
        else {  //Si no, lanzamos excepcion
          throw new NonExistingValueException("product", product.serialNumber);
        }
      }

      /**
       * Propiedad shops. Esta propiedad es un array de objetos.
       * Cada objeto contiene un objeto Shop y un array de productos.
       * Los productos están referenciados
       * @type {Array} Array de objetos
       * @private
       */
      var _shops = [];    //Array con las tiendas
      //Propiedad publica de acceso a _categories. Devuelve un iterador
      Object.defineProperty(this, 'shops', {
        get: function () {    //iterador para recorrer las categorias
          var nextIndex = 0;
          return {
            next: function () {
              return (nextIndex < _shops.length) ?
                {value: _shops[nextIndex++].shop, done: false} :
                {done: true};
            }
          }
        }
      });

      /**
       * Este metodo nos permite añadir una tienda
       * @param shop Objeto Shop
       * @returns {number} Numero de tiendas que tenemos
       */
      this.addShop = function (shop) {
        if (!shop) throw new EmptyValueException("shop"); //Controlamos que shop no está vacio
        //Controlamos que shop es una instacia de Shop
        if (!(shop instanceof Shop)) throw new WrongValueException("Shop");
        if (getShopIndex(shop) !== -1) throw new ExistingShopException(shop.name);

        _shops.push({shop: shop, products: []});  //Añadimos el objeto tienda y un array vacio para los productos
        return _shops.length; //Devolvemos el numero de tiendas que tenemos
      }

      /**
       * Este metodo nos permite borrar una tienda
       * @param shop Objeto Shop
       * @returns {number} Numero de tiendas que tenemos
       */
      this.removeShop = function (shop) {
        if (!shop) throw new EmptyValueException();   //Controlamos que shop no está vacio
        //Controlamos que shop es una instacia de Shop
        if (!(shop instanceof Shop)) throw new WrongValueException("Shop");
        var index = getShopIndex(shop); //Cogemos la poscion de la tienda

        //Si la tienda no existe lanzamos una excepción
        if (index === -1) throw new NonExistingShopException(shop.name);

        //Si la tienda existe, antes de borrarla pasamos los productos a la tienda por defecto
        for (let i = 0; i < _shops[index].products.length; i++) {
          changeToDefaultShop(_shops[index].products[i].serialNumber, _shops[index].products[i].stock);
        }

        _shops.splice(index, 1); //Borramos la tienda
        return _shops.length;   //Devolvemos el numero de tiendas que tenemos
      }

      /**
       * Este metodo nos permite añadir un producto con un stock determinado a una tienda.
       * Para ello añadimos la referencia del producto y el stock al array de productos
       * que teniamos creado los objetos del array de tiendas
       * @param shop Objeto Shop
       * @param product Objeto Product
       * @param stock Unidades del producto
       * @returns {number} Numero de productos en la tienda
       */
      this.addProductInShop = function (shop, product, stock) {
        if (!shop) throw new EmptyValueException("shop");   //Comprobamos que shop no esta vacío
        //Comprobamos que shop es una instancia de Shop
        if (!(shop instanceof Shop)) throw new WrongValueException("Shop");
        if (!product) throw new EmptyValueException("product");   //Comprobamos que product no esta vacío
        //Comprobamos que product es una instancia de Product
        if (!(product instanceof Product)) throw new WrongValueException("Product");
        if (!stock) throw new EmptyValueException("stock");   //Comprobamos que stock no esta vacío
        //Comprobamos que stock es un numero y que no es negativo
        if (isNaN(stock) || stock < 0) throw new InvalidValueException("stock", stock);
        //Comprobamos que el producto se encuentra en el almacen
        if (!checkProductStoreHouse(product)) throw new NonExistingValueException("product", product.serialNumber);

        //Obtenemos la posicion de la tienda
        var index = getShopIndex(shop);
        if (index === -1) throw new NonExistingShopException(shop.name); //Si la tienda no existe lanzamos excepcion

        //Comprobamos si el producto está en la tienda
        if (checkProductShop(index, product) === -1){ //Si no está, lo añadimos
          _shops[index].products.push({serialNumber: product.serialNumber, stock: stock});
        }
        else{ //Si está incrementamos su stock
          this.addQuantityProductInShop(shop, product, stock);
        }

        return _shops[index].products.length; //Devolvemos el numero de productos en la tienda
      }

      /**
       * Este método permite incrementar la cantidad de un producto en una tienda
       * @param shop Objeto Shop
       * @param product Objeto Product
       * @param stock Unidades del producto
       * @returns {number} Stock del producto en la tienda
       */
      this.addQuantityProductInShop = function (shop, product, stock) {
        if (!shop) throw new EmptyValueException("shop");   //Comprobamos que shop no esta vacío
        //Comprobamos que shop es una instancia de Shop
        if (!(shop instanceof Shop)) throw new WrongValueException("Shop");
        if (!product) throw new EmptyValueException("product");   //Comprobamos que product no esta vacío
        //Comprobamos que product es una instancia de Product
        if (!(product instanceof Product)) throw new WrongValueException("Product");
        if (stock < 0) throw new InvalidValueException("stock", stock); //Comprobamos que stock no es negativo
        if (isNaN(stock) || stock === "") stock = 1;  //Si no recibimos stock, el valor por defecto es 1
        //Comprobamos que el producto está registrado en el almacen
        if (!checkProductStoreHouse(product)) throw new NonExistingValueException("product", product.serialNumber);

        //Obtenemos la posicion de la tienda
        var index = getShopIndex(shop);
        if (index === -1) throw new NonExistingShopException(shop.name); //Si la tienda no existe lanzamos excepcion

        //Obtenemos la posicion del producto
        var position = checkProductShop(index, product);
        //Si el producto no existe lanzamos excepcion
        if (position === -1) throw new NonExistingProductInShopException(product.name, shop.name);

        _shops[index].products[position].stock += stock;  //Incrementamos el stock
        return _shops[index].products[position].stock; //Devolvemos el stock del producto en la tienda
      }

      /**
       * Este metodo nos devuelve un iterador con el numero de serie de los
       * productos y su stock en una tienda determinada
       * @param shop Objeto Shop
       * @param type  Tipo de producto (opcional)
       * @returns {{next: next}}  Iterador
       */
      this.getShopProducts = function (shop, type) {
        if (!shop) throw new EmptyValueException(); //Comprobamos que shop no está vacio
        //Controlamos que shop es una instancia de Shop
        if (!(shop instanceof Shop)) throw new WrongValueException("Shop");

        //Obtenemos la posicion de la tienda
        var index = getShopIndex(shop);
        if (index === -1) throw new NonExistingShopException(shop.name); //Si la tienda no existe lanzamos excepcion

        var nextIndex = 0;
        return {
          next: function () {
            //En esta variable añadiremos el producto y el stock para devolverlo. Ademas tambien nos sirve de
            //condicion de salida para el bucle
            var value = null;
            if (type !== undefined){//Si nos pasan el tipo de producto, filtramos por él
              while (nextIndex < _shops[index].products.length && value == null){
                if(nextIndex < _shops[index].products.length && sameType(_shops[index].products.serialNumber, type)){
                  value = {product: _shops[index].products[nextIndex].serialNumber,
                           stock: _shops[index].products[nextIndex].stock}
                }
                nextIndex++; //Incrementamos el indice para obtener el siguiente
              }
              if(value !== null){ //Devolvemos el producto
                return {value: value, done: false};
              }

              if(nextIndex >= _shops[index].products.length){
                return {done: true};
              }
            }
            else { //Sin tipo de producto devolvemos todos los de la tienda
              return (nextIndex < _shops[index].products.length) ?
                {value: {product: _shops[index].products[nextIndex].serialNumber, stock: _shops[index].products[nextIndex++].stock}, done: false} :
                {done: true};
            }
          }
        }
      }//Fin del metodo getShopProducts

      /**
       * Propiedad defaultCategory
       * Es la categoria por defecto para los productos
       * @type {Category}
       * @private
       */
      var _defaultCategory = new Category("Default", "Default category");
      this.addCategory(_defaultCategory);//añadimos la categoria por defecto

      //Propiedad publica de acceso a _defaultCategory
      Object.defineProperty(this, 'defaultCategory', {
        get: function () {
          return _defaultCategory;
        }
      });

      /**
       * Propiedad defaultShop
       * Es la tienda por defecto
       * @type {Shop}
       * @private
       */
      var _defaultShop = new Shop("Default", "Default shop");
      //Propiedad publica de acceso a _defaultShop
      this.addShop(_defaultShop); //añadimos la tienda por defecto

      Object.defineProperty(this, 'defaultShop', {
        get: function () {
          return _defaultShop;
        }
      });

      //Metodos privados
      /**
       * Este metodo nos permite obtener la posicion de una tienda
       * @param category Objeto Category
       * @returns {number} Posicion en el array. -1 si no se encuentra
       */
      function getCategoryIndex(category) {
        var index;

        index = _categories.findIndex(function (a) {
          return (a.category.title == category.title) //Comprobamos que son iguales mediante el nombre
        });

        return index;
      }

      /**
       * Este metodo nos permite obtener la posicion de un producto
       * @param product Objeto Product
       * @returns {number} Posicion en el array. -1 si no se encuentra
       */
      function getProductIndex(product, categoryIndex) {
        var index;

        index = _categories[categoryIndex].products.findIndex(function (a) {
          return (a.serialNumber === product.serialNumber); //Comprobamos que son iguales mediante el serialNumber
        });

        return index;
      }

      /**
       * Este metodo nos permite obtener la posicion de una tienda
       * @param shop Objeto Shop
       * @returns {number} Posicion en el array. -1 si no se encuentra
       */
      function getShopIndex(shop) {
        var index;

        index = _shops.findIndex(function (a) {
          return (a.shop.name == shop.name); //Comprobamos que son iguales mediante el nombre
        });

        return index;
      }

      /**
       * Este metodo comprueba si un producto está registrado en el almacen
       * @param product Objeto Product
       * @returns {boolean} True si lo encuentra, false si no.
       */
      function checkProductStoreHouse(product) {
        //Variable para saber si se encuentra. Sirve como condicion de salida del bucle
        var exist = false;

        //Recorremos los productos categoria a categoria
        for(let i = 0; i < _categories.length && !exist; i++){
          for(let j = 0; j < _categories[i].products.length && !exist; j++){
            //Comparamos el serialnumber. Si son iguales cambiamos la condicion para salir del bucle
            if (_categories[i].products[j].serialNumber === product.serialNumber){
              exist = true;
            }
          }
        }

        return exist;
      }

      /**
       * Este metodo comprueba si un producto está registrado en una determinada tienda.
       * @param index Indice de la tienda donde tenemos que buscar
       * @param product Objeto Product
       * @returns {number} Posicion del producto en la tienda. -1 si no se encuentra.
       */
      function checkProductShop(index, product) {
        var exist = false;//Variable para saber si se encuentra. Sirve como condicion de salida del bucle

        //Recorremos todos los productos de la tienda
        for(var i = 0; i < _shops[index].products.length && !exist; i++){
          //Comparamos el serialnumber. Si son iguales cambiamos la condicion para salir del bucle
          if (_shops[index].products[i].serialNumber === product.serialNumber){
            exist = true;
          }
        }

        //Si el producto existe devolvemos su posicion, si no -1.
        return (exist) ? i - 1 : -1;
      }

      /**
       * Este metodo añade un producto de una tienda a la tienda por defecto
       * antes de ser eliminada.
       * @param serialNumber SerialNumber del producto.
       * @param stock Stock del producto en la tienda actual.
       * @returns {number} Numero de productos en la tienda por defecto.
       */
      function changeToDefaultShop(serialNumber, stock) {
        //Comprobamos si el producto se encuentra en la tienda por defecto
        var index = _shops[0].products.findIndex(function (a) {
          return a.serialNumber == serialNumber;
        });

        if (index === -1){ //Si el producto no existe en la tienda por defecto lo añadimos
          _shops[0].products.push({serialNumber: serialNumber, stock: stock});
        }
        else{ //Si existe incrementamos su stock
          _shops[0].products[index].stock += stock;
        }

        return _shops[0].products.length; //Devolvemos la cantidad de productos de la tienda por defecto
      }

      /**
       * Este metodo comprueba si un objeto es de un tipo determinado
       * @param serialNumber Serial number del producto
       * @param type  Tipo de producto
       * @returns {boolean} True si son iguales, false en caso contrario
       */
      function sameType(serialNumber, type) {
        var sameSerial = false; //Condicion de salida del bucle

        //Recorremos todos los productos categoria por categoria para
        for(var i = 0; i < _categories.length && !sameSerial; i++){
          for(var j = 0; j < _categories[i].products.length && !sameSerial; j++){
            if(_categories[i].products[j].serialNumber === serialNumber){ //Comparamos por el serial number
              sameSerial = true;
            }
          }
        }

        //Comprobamos que el objeto es del tipo deseado
        return (_categories[i - 1].products[j - 1] instanceof type);
      }
    } //Fin del constructor StoreHouse
    StoreHouse.prototype = {};
    StoreHouse.prototype.constructor = StoreHouse;

    //Creamos el objeto instance, que es la única instancia de StoreHouse.
    var instance = new StoreHouse();
    Object.freeze(instance); //Congelamos el objeto
    return instance; //Devolvemos el objto
  }// Fin de la funcion init
  return {
    getInstance: function () {
      if (!instantiated) {
        instantiated = init();
      }
      return instantiated;
    }
  };
})();
