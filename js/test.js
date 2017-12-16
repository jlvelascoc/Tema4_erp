"use strict";

function testStoreHouse() {
  //Esta funcion comprueba el funcionamiento de un objeto Category
  function testCategories() {
    console.log("***Test categories***");
    console.log("Creamos category: title:  description: Esta categoria incluye guitarras y bajos");
    //Creamos una categoria sin nombre para comprobar que funcionan las validaciones
    try {
      var category = new Category("", "Esta categoria incluye guitarras y bajos");
    }
    catch (err){
      console.log(err.toString());
    }

    try {
      console.log("Creamos category: title: Instrumentos de cuerda,  description: Esta categoria incluye guitarras y bajos");
      var category = new Category("Instrumentos de cuerda", "Esta categoria incluye guitarras y bajos");
    }
    catch (err){
      console.log(err.toString());
    }
    console.log("category.id: " + category.id);
    console.log("category.title: " + category.title);
    console.log("category.description: " + category.description);
    console.log("Cambiamos el titulo de category a cuerda");
    category.title = "Cuerda";
    console.log("category.title: " + category.title);
  }

  //Esta funcion comprueba el funcionamiento de un objeto Product
  function testProducts() {
    console.log("***Test products***");
    console.log("Creamos product: Bateria pearl");
    //Creamos un producto sin precio para comprobar que funcionan las validaciones
    try {
      var product = new Product("Bateria pearl");
    }
    catch (err){
      console.log(err.toString());
    }

    try {
      console.log("Creamos product: Bateria pearl, 500");
      var product = new Product("Bateria pearl", 500);
      console.log(product.toString());
    }
    catch (err){
      console.log(err.toString());
    }

    try {
      console.log("Cambiamos el nombre, añadimos una descripcion y cambiamos el precio");
      product.description = "Bateria yamaha gama premiun, madera de palosanto, color natural";
      product.price = 675;
      product.name = "Bateria Yamaha";
      product.name = "";
    }
    catch (err){
      console.log(err.toString());
    }
    console.log(product.toString());
  }

  //Esta funcion comprueba el funcionamiento de un objeto Coords
  function testCoords() {
    console.log("***Test Coords***");
    console.log("Creamos coord1");

    try{
      var coord1 = new Coords(123, 423);
      console.log(coord1.toString());
    }
    catch (err){
      console.log(err.toString());
    }

    console.log("Modificamos la latitud y la longitud");
    coord1.longitude = 723;
    coord1.latitude = 800;
    console.log(coord1.toString());
  }

  //Esta funcion comprueba el funcionamiento de un objeto Shop
  function testShop(){
    console.log("***Test Shop***");
    console.log("Creamos shop1");

    try {
      var shop1 = new Shop("Music Center");
      console.log(shop1.toString());
    }
    catch (err){
      console.log(err.toString());
    }

    console.log("Añadimos el cif, la direccion, el telefono y las coordenadas");
    shop1.cif = "11111111a";
    console.log("cif: " + shop1.cif);
    shop1.address = "Desengaño 21";
    console.log("address: " + shop1.address);
    shop1.phone = "900600900";
    console.log("phone: " + shop1.phone);
    shop1.coords = new Coords(123, 423);
    console.log("cif: " + shop1.coords);

    console.log(shop1.toString());
  }

  //Tests para comprobar los objetos uno por uno
  //testCategories();
  //testProducts();
  //testCoords();
  //testShop();

  //Comprobación del funcionamiento de StoreHouse y de sus diferentes métodos.
  console.log("***Test storehouse***");
  var almacen = StoreHouse.getInstance();
  almacen.name = "Almacen";
  console.log("Nombre: " + almacen.name);
  console.log(">>Añadimos las categorias: cuerda, percusion, amplificadores<<");
  var cat1 = new Category("Cuerda", "Guitarras y bajos");
  var cat2 = new Category("Percusion", "Instrumentos de percusion");
  var cat3 = new Category("Amplificadores", "Amplificadores de todos los instrumentos");

  console.log("Cat1: " + cat1.toString());
  console.log("Cat2: " + cat2.toString());
  console.log("Cat3: " + cat3.toString());

  try{
    console.log(almacen.addCategory(cat1));
    console.log(almacen.addCategory(cat2));
    console.log(almacen.addCategory(cat3));
    console.log(almacen.addCategory(cat1));
  }
  catch (err){
    console.log(err.toString());
  }

  console.log(">>Iterador de categorias<<");
  var categories = almacen.categories;
  var category = categories.next();
  while(category.done !== true){
    console.log(category.value.toString());
    category = categories.next();
  }

  console.log(">>Añadimos los productos: bajo fender, bateria pearl, amplificador orange<<");
  var prod1 = new Bass("Fender jazzbass", 500);
  var prod2 = new Drums("Pearl reference pure", 800, "acoustic");
  var prod3 = new Amplifier("Markbass mk210", 600, 300,"transistors");
  var prod4 = new Bass("Rickenbacker", 150, 5, "active");

  console.log(prod1.toString());
  console.log(prod2.toString());
  console.log(prod3.toString());
  console.log(prod4.toString());

  try{
    console.log(almacen.addProduct(prod1, cat1));
    console.log(almacen.addProduct(prod2, cat2));
    console.log(almacen.addProduct(prod3, cat3));
    console.log(almacen.addProduct(prod4, ""));
  }
  catch (err){
    console.log(err.toString());
  }

  console.log(">>Borramos la categoria amplificadores<<");
  try{
    console.log(almacen.removeCategory(cat3));
  }
  catch (err){
    console.log(err.toString());
  }

  console.log(">>Iterador productos por categoria (default)<<");
  var products = almacen.getCategoryProducts(almacen.defaultCategory);
  var product = products.next();
  console.log(">>Categoria default:<<")
  while(product.done !== true){
    console.log(product.value.toString());
    product = products.next();
  }

  console.log(">>Iterador productos por categoria y tipo(default, bass)<<");
  var products = almacen.getCategoryProducts(almacen.defaultCategory, Bass);
  var product = products.next();
  console.log(">>Categoria default:<<")
  while(product.done !== true){
    console.log(product.value.toString());
    product = products.next();
  }

  console.log(">>Creamos 3 tiendas<<");
  try {
    var shop1 = new Shop("Music Center");
    var shop2 = new Shop("Musical Lupe");
    var shop3 = new Shop("El Danubio Azul");
    console.log(shop1.toString());
    console.log(shop2.toString());
    console.log(shop3.toString());
  }
  catch (err){
    console.log(err.toString());
  }

  console.log(">>Añadimos las tiendas al almacen<<");
  try {
    console.log(almacen.addShop(shop1));
    console.log(almacen.addShop(shop2));
    console.log(almacen.addShop(shop3));
    console.log(almacen.addShop(shop3));
  }
  catch (err){
    console.log(err.toString());
  }

  console.log(">>Iterador de tiendas<<");
  var tiendas = almacen.shops;
  var tienda = tiendas.next();
  while(tienda.done !== true){
    console.log(tienda.value.toString());
    tienda = tiendas.next();
  }

  console.log(">>Añadimos datos a las tiendas<<");
  try{
    shop1.cif = "11111111a";
    shop1.phone = "900600900";
    shop1.coords = new Coords(123, 475);

    shop2.cif = "22222222b";
    shop2.phone = "902202122";
    shop2.coords = new Coords(465, 789);

    shop3.cif = "33333333c";
    shop3.phone = "918181818";
    shop3.coords = new Coords(1, 1);
  }
  catch (err){
    console.log(err.toString());
  }

  console.log(">>Iterador de tiendas<<");
  var tiendas = almacen.shops;
  var tienda = tiendas.next();
  while(tienda.done !== true){
    console.log(tienda.value.toString());
    tienda = tiendas.next();
  }

  console.log(">>Añadimos productos a las tiendas<<");
  try {
    console.log("shop1: " + almacen.addProductInShop(shop1, prod1, 3));
    console.log("shop1: " + almacen.addProductInShop(shop1, prod2, 1));
    console.log("shop1: " + almacen.addProductInShop(shop1, prod4, 4));
    console.log("shop1: " + almacen.addProductInShop(shop1, prod4, 4));
  }
  catch (err){
    console.log(err.toString());
  }

  try {
    console.log("shop2: " + almacen.addProductInShop(shop2, prod1, 3));
    console.log("shop2: " + almacen.addProductInShop(shop2, prod2, 1));
    console.log("shop2: " + almacen.addProductInShop(shop2, prod4, 4));
  }
  catch (err){
    console.log(err.toString());
  }

  try {
    console.log("shop3: " + almacen.addProductInShop(shop3, prod1, 1));
    console.log("shop3: " + almacen.addProductInShop(shop3, prod2, 2));
    console.log("shop3: " + almacen.addProductInShop(shop3, prod4, 3));
  }
  catch (err){
    console.log(err.toString());
  }

  console.log(">>Incrementamos cantidades de los productos en las tiendas<<");
  try {
    console.log("shop1, prod1: " + almacen.addQuantityProductInShop(shop1, prod1, 3));
    console.log("shop1, prod2: " + almacen.addQuantityProductInShop(shop1, prod2, 1));
    console.log("shop1, prod4: " + almacen.addQuantityProductInShop(shop1, prod4, 4));
  }
  catch (err){
    console.log(err.toString());
  }

  try {
    console.log("shop2, prod1: " + almacen.addQuantityProductInShop(shop2, prod1, 3));
    console.log("shop2, prod2: " + almacen.addQuantityProductInShop(shop2, prod2, 1));
    console.log("shop2, prod3: " + almacen.addQuantityProductInShop(shop2, prod3, 4));
  }
  catch (err){
    console.log(err.toString());
  }

  try {
    console.log("shop3, prod1: " + almacen.addQuantityProductInShop(shop3, prod1, 3));
    console.log("shop3, prod2: " + almacen.addQuantityProductInShop(shop3, prod2, 1));
    console.log("shop3, prod3: " + almacen.addQuantityProductInShop(shop3, prod3, 4));
  }
  catch (err){
    console.log(err.toString());
  }

  console.log(">>Borramos prod3<<");
  try{
    console.log(almacen.removeProduct(prod3));
  }
  catch (err){
    console.log(err.toString());
  }

  console.log(">>Borramos shop 1<<");
  try {
    console.log(almacen.removeShop(shop1));
  }
  catch (err){
    console.log(err.toString());
  }

  console.log(">>Iterador productos por tienda<<");
  var products = almacen.getShopProducts(almacen.defaultShop);
  var product = products.next();
  console.log(">>Tienda default<<")
  while(product.done !== true){
    console.log("Product id:" + product.value.product + "; Stock:" + product.value.stock);
    product = products.next();
  }

  try{
    products = almacen.getShopProducts(shop1);
    product = products.next();
    console.log(">>Tienda " + shop1.name +"<<")
    while(product.done !== true){
      console.log("Product id:" + product.value.product + "; Stock: " + product.value.cant);
      product = products.next();
    }
  }
  catch (err){
    console.log(err.toString());
  }

  products = almacen.getShopProducts(shop2);
  product = products.next();
  console.log(">>Tienda " + shop2.name +"<<")
  while(product.done !== true){
    console.log("Product id:" + product.value.product + "; Stock: " + product.value.stock);
    product = products.next();
  }

  products = almacen.getShopProducts(shop3);
  product = products.next();
  console.log(">>Tienda " + shop3.name +"<<")
  while(product.done !== true){
    console.log("Product id:" + product.value.product + "; Stock: " + product.value.stock);
    product = products.next();
  }

  console.log(">>Iterador productos por tienda y tipo de producto<<");
  console.log(">>Tienda default, productos Bass<<")
  try {
    var products = almacen.getShopProducts(almacen.defaultShop, Bass);
    var product = products.next();
    while(product.done !== true){
      console.log("Product id:" + product.value.product + "; Stock:" + product.value.stock);
      product = products.next();
    }
  }
  catch (err){
    console.log(err.toString());
  }

  console.log(">>Tienda " + shop2.name +", productos Drums<<")
  try {
    var products = almacen.getShopProducts(shop2, Drums);
    var product = products.next();
    while(product.done !== true){
      console.log("Product id:" + product.value.product + "; Stock:" + product.value.stock);
      product = products.next();
    }
  }
  catch (err){
    console.log(err.toString());
  }

  console.log(">>Tienda " + shop3.name +", productos Amplifier<<")
  try {
    var products = almacen.getShopProducts(shop3, Amplifier);
    var product = products.next();
    while(product.done !== true){
      console.log("Product id:" + product.value.product + "; Stock:" + product.value.stock);
      product = products.next();
    }
  }
  catch (err){
    console.log(err.toString());
  }
}

window.onload = testStoreHouse();
