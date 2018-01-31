"use strict";

/**
 * Esta función crea los objetos necesarios para realizar
 * la práctica. También llama a la función initPopulate que
 * dibuja la página
 */
function init() {
  console.log("init");

  var storeHouse = StoreHouse.getInstance(); //Cogemos la instancia del almacen
  storeHouse.name = "Musicopolix"; //Cambiamos el nombre

  var logo = document.querySelectorAll("header a");//Cogemos la referencia del logo
  logo = logo[0];
  logo.addEventListener("click", initPopulate);

  //Creamos tres tiendas
  var danubioAzul = new Shop("Danubio Azul");
  var laLira = new Shop("La Lira");
  var musiReal = new Shop("Decibelios");
  var guitarCenter = new Shop("Garcia Cid");

  //Añadimos las tiendas al almacen
  try {
    console.log(storeHouse.addShop(danubioAzul));
    console.log(storeHouse.addShop(laLira));
    console.log(storeHouse.addShop(musiReal));
    console.log(storeHouse.addShop(guitarCenter));
  }
  catch (err) {
    console.log(err.toString());
  }

  //Creamos tres categorias
  var cuerda = new Category("Cuerda", "Guitarras y bajos");
  var percusion = new Category("Percusion", "Instrumentos de percusion");
  var amplificadores = new Category("Amplificadores", "Amplificadores de todos los instrumentos");

  //Añadimos las categorias al almacen
  try {
    console.log(storeHouse.addCategory(cuerda));
    console.log(storeHouse.addCategory(percusion));
    console.log(storeHouse.addCategory(amplificadores));
  }
  catch (err) {
    console.log(err.toString());
  }

  //Creamos los productos
  var fenderJB = new Bass("Fender jazzbass", 500, 4, "passive");
  var cortArt = new Bass("Cort artisan", 450, "active");
  var rickenbacker = new Bass("Rickenbacker", 150, 5, "active");
  var pearl = new Drums("Pearl reference pure", 800, "acoustic");
  var mapex = new Drums("Mapex Armory", 650, "acoustic");
  var yamaha = new Drums("Yamaha e-drums", 480, "electronic");
  var markbass = new Amplifier("Markbass mk210", 600, 300, "transistors");
  var marshall = new Amplifier("Marshall MG100", 300, 150, "transistors");
  var ashdown = new Amplifier("Ashdown EVO 115", 250, 150, "transistors");

  //Añadimos una descripción a los productos
  fenderJB.description = "Cuerpo de fresno americano, Mástil de arce canadiense, Diapasón de arce, 20 trastes, Escala: 864mm, Ancho de la cejilla: 38mm, Alma de doble acción, Pastillas de bobina simple Roswell JBA Alnico-5 vintage de estilo JB, 2 controles de volumen y 1 de tono, Herrajes de cromo deluxe, Clavijas de afinación PB-style clásicas, Cuerdas D'addario 045-100, Color: Natural de alto brillo.";
  cortArt.description = "Cuerpo de fresno de pantano, Mástil de 5 piezas de wengué y palisandro atornillado (bolt-on), Diapasón de palisandro (Dalbergia latifolia),Sin trastes ni thomann líneas de trastes, Escala de 34\" (864mm), Pastillas Bartolini MK-1, Preamplificador activo Markbass MB-1 con ecualizador de 3 bandas, 1 potenciómetro de volumen y de balance, Interruptor mini para modo activo/pasivo, Herrajes negros, Clavijas de afinación Hipshot Ultralight, Acabado: Natural a poro abierto.";
  rickenbacker.description = "Cuerpo de arce, Mástil de arce atravesado, Diapasón de madera Caribbean Rosewood (Metopium Brownei), Triangle Inlays, 20 trastes, Medida 845 mm, Ancho de cejuela 42,9 mm, Mecánicas thomann Schaller Deluxe, 2 pastillas Single Coil Bass, Peso: Aprox. 4,1 kg, Color: Midnight Blue, incluye caja.";
  pearl.description = "Versión Standard, EXX725Z/C, Cascos laminados, Color: Jet Black #31, Hardware cromado, Cascos combinados de maderas caoba asiática y chopo para sonido profundo y voluminoso.";
  mapex.description = "Configuración 'Rock', Material del casco: Arce/Nogal, Herrajes de cromo negros, Cascos lacados de alto brillo, Color: Arce 'Agua Profunda' (Deep Water Maple Burst, #MSL), El thomann borde SONIClear™ mejora el tono y el rango de afinación.";
  yamaha.description = "Incluye diez Kits de Batería y diez Funciones de Ejercicios, El set viene con Pads de Batería de nuevo desarrollo, Pads de thomann platillos grandes, Nuevo módulo DTX400 Drum Trigger Module con 169 sonidos de alta calidad, USB, Aux in, Salida de auriculares, Pedal de bombo casi silencioso.";
  markbass.description = "Potencia: 500W 4 ohm / 300W 8 ohm, Configuración: 2x altavoces de 10\" de neodimio, Custom made by thomann B&C + Tweeter, 40Hz - 18KHz, Reguladores: Volumen, Bass, low y Hight mid, Hights, Master Volumen, Filtro Pre Shape variable, Función de Emulación Vintage Speaker, Salida de línea, Envío y retorno de efectos, Recinto adaptado como monitor (wedge) con dos ángulos de apoyo, Sistema Bassreflex, ultra ligero y ultra compacto, Peso: Aprox. 20 kg, Medida An x thomann Al x Pr: 59,5 x 48 x 47,5 cm.";
  marshall.description = "2x 50 W, 4 canales, Efectos FX digitales, Entrada de micrófono (alimentación phantom 15V), Medidas: 60 x 54 x 26,1cm, Peso: 21kg.";
  ashdown.description = "1 altavoz Ashdown de 15\", Emulación de válvulas, Entrada activa y pasiva, Medidor VU, Ecualizador de 5 bandas, Interruptor 'bright', Interruptor 'deep', DI balanceada conmutable (ecualizador Pre/Post), Control de compresión, Control 'overdrive', Control de sub-armónicos, Bucle de efectos, Salida de afinador.";

  //Añadimos las medidas de los toms de las baterias
  pearl.toms = ["22x18", "12x08", "13x09", "16x16", "14x5.5"];
  mapex.toms = ["22x18", "10x08", "12x09", "14x14", "14x5.5"];
  yamaha.toms = ["5", "7.5", "7.5", "7.5", "7.5"];

  //Añadimos las imagenes a los productos
  fenderJB.addImage("img/fender.png");
  cortArt.addImage("img/cort.png");
  rickenbacker.addImage("img/rickenbacker.png");
  pearl.addImage("img/pearl.png");
  mapex.addImage("img/mapex.png");
  yamaha.addImage("img/yamaha.png");
  markbass.addImage("img/markbass.png");
  marshall.addImage("img/marshall.png");
  ashdown.addImage("img/ashdown.png");

  //Añadimos los productos al almacen
  try {
    console.log(storeHouse.addProduct(fenderJB, cuerda));
    console.log(storeHouse.addProduct(cortArt, cuerda));
    console.log(storeHouse.addProduct(rickenbacker, cuerda));
    console.log(storeHouse.addProduct(pearl, percusion));
    console.log(storeHouse.addProduct(mapex, percusion));
    console.log(storeHouse.addProduct(yamaha, percusion));
    console.log(storeHouse.addProduct(markbass, amplificadores));
    console.log(storeHouse.addProduct(marshall, amplificadores));
    console.log(storeHouse.addProduct(ashdown, amplificadores));
  }
  catch (err) {
    console.log(err.toString());
  }

  //Añadimos los productos a las tiendas
  try {
    storeHouse.addProductInShop(danubioAzul, fenderJB, 5);
    storeHouse.addProductInShop(danubioAzul, cortArt, 2);
    storeHouse.addProductInShop(danubioAzul, rickenbacker, 1);
    storeHouse.addProductInShop(danubioAzul, pearl, 1);
    storeHouse.addProductInShop(danubioAzul, mapex, 1);
    storeHouse.addProductInShop(danubioAzul, yamaha, 1);
    storeHouse.addProductInShop(danubioAzul, markbass, 1);
    storeHouse.addProductInShop(danubioAzul, marshall, 3);
    storeHouse.addProductInShop(danubioAzul, ashdown, 4);
  }
  catch (err) {
    console.log(err.toString());
  }

  try {
    storeHouse.addProductInShop(laLira, fenderJB, 1);
    storeHouse.addProductInShop(laLira, cortArt, 1);
    storeHouse.addProductInShop(laLira, rickenbacker, 1);
    storeHouse.addProductInShop(laLira, pearl, 1);
    storeHouse.addProductInShop(laLira, mapex, 1);
    storeHouse.addProductInShop(laLira, yamaha, 1);
    storeHouse.addProductInShop(laLira, markbass, 1);
    storeHouse.addProductInShop(laLira, marshall, 1);
    storeHouse.addProductInShop(laLira, ashdown, 1);
  }
  catch (err) {
    console.log(err.toString());
  }

  try {
    storeHouse.addProductInShop(musiReal, fenderJB, 2);
    storeHouse.addProductInShop(musiReal, cortArt, 1);
    storeHouse.addProductInShop(musiReal, mapex, 1);
    storeHouse.addProductInShop(musiReal, yamaha, 1);
    storeHouse.addProductInShop(musiReal, marshall, 2);
    storeHouse.addProductInShop(musiReal, ashdown, 1);
  }
  catch (err) {
    console.log(err.toString());
  }

  try {
    storeHouse.addProductInShop(guitarCenter, fenderJB, 10);
    storeHouse.addProductInShop(guitarCenter, cortArt, 5);
    storeHouse.addProductInShop(guitarCenter, rickenbacker, 4);
    storeHouse.addProductInShop(guitarCenter, pearl, 2);
    storeHouse.addProductInShop(guitarCenter, mapex, 5);
    storeHouse.addProductInShop(guitarCenter, yamaha, 3);
    storeHouse.addProductInShop(guitarCenter, markbass, 3);
    storeHouse.addProductInShop(guitarCenter, marshall, 7);
    storeHouse.addProductInShop(guitarCenter, ashdown, 5);
  }
  catch (err) {
    console.log(err.toString());
  }

  //Invocamos a la funcion para dibujar la pagina;
  initPopulate();
}

/**
 * Esta función dibuja la página. En ella se muestran
 * las tiendas
 */
function initPopulate() {
  console.log("initPopulate");

  //Borramos el contenido de main si existe
  clearMain();
  //Borramos el menu de tiendas si existe
  removeShopsMenu();
  //Borramos el de categorias si existe
  removeCategoriesMenu();
  //Borramos el boton mostrar todo si existe
  removeButton();

  var main = document.getElementById("main"); //Cogemos el contenedor principal
  var divShops = document.createElement("section");  //Contenedor donde agruparemos las tiendas
  var header = document.getElementsByTagName("header")[0].firstElementChild; //Cogemos la cabecera
  var button = document.createElement("button"); //Boton para mostrar la info de todos los productos
  var divShop, src, h2, imagen;  //Elementos para cada tienda
  var objectShop;   //tienda

  var shops = StoreHouse.getInstance().shops;
  var shop = shops.next();
  var i = 0;

  while (shop.done !== true) {
    objectShop = shop.value.shop;

    //Creamos el div de la tienda
    divShop = document.createElement("div");
    divShop.id = "t" + i;
    divShop.className = "col-sm-6 panel panel-default tienda";

    //Creamos y añadimos la imagen
    src = document.createAttribute("src");
    src.value = "img/tienda" + i + ".png";
    imagen = document.createElement("img")
    imagen.setAttributeNode(src);
    imagen.className = "imgTienda";
    divShop.appendChild(imagen);

    //Creamos y añadimos un titulo
    h2 = document.createElement("h2");
    h2.className = "panel-footer";
    h2.innerHTML = objectShop.name;
    divShop.appendChild(h2);

    //Creamos un evento onclick
    divShop.addEventListener("click", callShopPopulate(objectShop));

    divShops.appendChild(divShop);  //Añadimos la tienda

    shop = shops.next();
    i++;
  }

  //Creamos el boton Mostrar todos los productos
  button.innerHTML = "Mostrar todos los productos";
  button.id = "mostrarTodo";
  button.className = "btn pull-right";
  button.addEventListener("click", globalProductPopulate);
  header.appendChild(button);

  //Añadimos la seccion al contenedor principal
  divShops.id = "tiendas";
  divShops.className = "panel-body";
  main.appendChild(divShops);

  main.setAttribute("class", "col-sm-12");
}

/**
 * Esta función crea un menú con un item para cada tienda
 * @param shopName Nombre de la tienda
 */
function shopsMenusPopulate(shopName) {
  console.log("shopsMenusPopulate");

  //Creamos los elementos header, nav y ul
  var nav = document.getElementById("menu1");
  var contenedor = nav.firstElementChild;
  var div = document.createElement("div");
  var ul = document.createElement("ul");
  var li, a;

  //Cogemos las tiendas
  var shops = StoreHouse.getInstance().shops;
  var shop = shops.next();
  var objectShop;

  while (shop.done !== true) {
    objectShop = shop.value.shop;

    //Creamos el enlace
    a = document.createElement("a");
    a.innerHTML = objectShop.name;
    a.setAttribute("href", "javascript:;");
    //Creamos un evento onclick
    a.addEventListener("click", callShopPopulate(objectShop));

    //Creamos el li y añadimos la clase active al li de la tienda actual
    li = document.createElement("li");
    if (objectShop.name == shopName) {
      li.className = "active";
    }

    //Añadimos el enlace al li y el li al ul
    li.appendChild(a);
    ul.appendChild(li);

    shop = shops.next();
  }

  ul.className = "nav nav-tabs";
  div.appendChild(ul);

  //Añadimos el menu a la página
  div.id = "menuPrincipal";
  div.className = "collapse navbar-collapse";
  contenedor.appendChild(div);

  //Mostramos el menu
  nav.style.display = "block";
}

/**
 * Esta función dibuja los productos de una tienda.
 * Tambien se utiliza al filtrar los productos de una categoria.
 * El parametro que recibe varía en función desde donde sea llamada
 * @param data Puede ser de dos tipos: objeto tienda o un objeto categoria
 */
function shopPopulate(data) {
  console.log("shopPopulate");

  var main = document.getElementById("main"); //Cogemos el main
  var divProducts = document.createElement("section");  //Contenedor donde agruparemos los productos
  var row; //Div con la clase row para agrupar los productos y necesaria para bootstrap

  //Si data es un objeto Shop trabajamos con un iterador
  if (data instanceof Shop) {
    removeShopsMenu();  //Borramos el menu de las tiendas si existe
    removeCategoriesMenu(); //Borramos el menu de las categorias si existe
    clearMain(); //Borramos el contenedor principal si existe

    var products = StoreHouse.getInstance().getShopProducts(data); //Cogemos los productos
    var product = products.next();
    var i = 0;

    while (product.done !== true) {
      //Creamos una fila cada 3 productos
      if(i % 3 == 0){
        row = document.createElement("div");
        row.className = "row";
        divProducts.appendChild(row);
      }

      //Creamos el producto y lo añadimos a la fila
      row.appendChild(createProduct(product.value.product, i));
      product = products.next();
      i++;
    }

    //Volvemos a crear los menus
    shopsMenusPopulate(data.name);
    menuCategoryShopPopulate(data, "");
  }
  else { //Si el parametro es un objeto categoria trabajamos sobre un array
    for (let i = 0; i < data.products.length; i++) {
      //Creamos una fila cada 3 productos
      if(i % 3 == 0){
        row = document.createElement("div");
        row.className = "row";
        divProducts.appendChild(row);
      }

      //Creamos el producto y lo añadimos a la fila
      row.appendChild(createProduct(data.products[i], i));
    }
  }

  //Añadimos la seccion al contenedor principal
  divProducts.id = "tiendas";
  divProducts.class = "panel-body";
  main.appendChild(divProducts);
}

/**
 * Esta función crea un menú lateral con las categorias de cada tienda
 * @param shop Objeto categoria
 * @param nameCategory Nombre de la categoria (Opcional)
 */
function menuCategoryShopPopulate(shop, nameCategory) {
  console.log("menuCategoryShopPopulate");

  //Cogemos las categorias
  var categories = getCategories(shop);

  //Creamos los elementos para el menu
  var main = document.getElementById("main");
  var contenedor = document.getElementById("container");
  var aside = document.createElement("aside");
  var nav = document.createElement("nav");
  var ul = document.createElement("ul");
  var li, a;

  for (let i = 0; i < categories.length; i++) {
    a = document.createElement("a");
    a.innerHTML = categories[i].category.title;
    a.setAttribute("href", "javascript:;");
    //Creamos un evento onclick
    a.addEventListener("click", callProductsCategoryShopPopulate(categories[i]));

    //Añadimos la clase active, en función de la categoria en la que nos encontramos
    li = document.createElement("li");
    if (categories[i].title == nameCategory) {
      li.className = " active";
    }

    li.appendChild(a)
    ul.appendChild(li);
  }

  //Asignamos las clases y añadimos el menu a la pagina
  ul.className = "nav nav-pills nav-stacked";
  nav.appendChild(ul);

  nav.id = "menuCategorias";
  nav.setAttribute("class", "sidebar-nav");
  aside.appendChild(nav);

  main.setAttribute("class", "col-md-10");//Cambiamos la clase del main para hacerlo mas estrecho
  aside.setAttribute("class", "col-md-2");
  contenedor.insertBefore(aside, main);
}

/**
 * Esta funcion muestra los productos de una categoria
 * en una tienda. Reutiliza la función shopPopulate
 * @param category Objeto Category
 */
function productCategoryShopPopulate(category) {
  clearMain(); //Borramos el main
  changeActive(category.category.title); //Cambiamos la clase active

  shopPopulate(category);
}

/**
 * Esta función muestra la información de un producto
 * @param index Numero del id del elemento html
 */
function productShopPopulate(index) {
  //Cogemos el elemento y los botones
  var description = document.getElementById("descr" + index);
  var button = document.getElementById("btnShow" + index);
  var button2 = document.getElementById("btnHide" + index);

  //Cambiamos los displays para mostrar unos elementos y ocultar otros
  description.style.display = "block";
  button.style.display = "none";
  button2.style.display = "block";
}

/**
 * Esta función oculta la información de un producto
 * @param index Numero del id del elemento html
 */
function hideProductShopPopulate(index) {
  //Cogemos el elemento y los botones
  var description = document.getElementById("descr" + index);
  var button = document.getElementById("btnShow" + index);
  var button2 = document.getElementById("btnHide" + index);

  //Cambiamos los displays para mostrar unos elementos y ocultar otros
  description.style.display = "none";
  button.style.display = "block";
  button2.style.display = "none";
}

/**
 * Esta función muestra la información de todos los productos
 * registrados en el almacen y su stock total
 */
function globalProductPopulate(){
  console.log("globalProductPopulate");

  removeShopsMenu();  //Borramos el menu de las tiendas si existe
  removeCategoriesMenu(); //Borramos el menu de las categorias si existe
  clearMain(); //Borramos el contenedor principal si existe

  //Elementos html necesarios para mostrar la información
  var main = document.getElementById("main");
  var section = document.createElement("section");
  var div, h4, text;

  var storeHouse = StoreHouse.getInstance(); //Instancia del alamacen
  var categories = storeHouse.categories;
  var category = categories.next();

  while (category.done !== true) {
    div = document.createElement("div");
    h4 = document.createElement("h4");
    h4.innerHTML = category.value.category.title;
    div.appendChild(h4);

    //Recorremos los productos de la categoria
    for(let i = 0; i < category.value.products.length; i++){
      text = document.createElement("p");
      text =  getProductInfo(category.value.products[i]); //Cogemos la informacion
      text.innerHTML += ("Stock: " + storeHouse.getGlobalStock(category.value.products[i].serialNumber));//Cogemos el stock
      div.appendChild(text);
    }
    div.setAttribute("class", "infoGlobal");
    section.appendChild(div);

    category = categories.next();
  }

  main.appendChild(section);
}

/*Funciones privadas*/
/**
 * Esta funcion permite llama a la funcion shopPopulate y la devuelve
 * @param shop Objeto Shop
 * @returns {Function} Funcion shopPopulate
 */
function callShopPopulate(shop) {
  return function () {
    shopPopulate(shop);
  }
}

/**
 * Esta funcion permite llama a la funcion productsCategoryShopPopulate y la devuelve
 * @param category Objeto Category
 * @returns {Function} Funcion productsCategoryShopPopulate
 */
function callProductsCategoryShopPopulate(category) {
  return function () {
    productCategoryShopPopulate(category);
  }
}

/**
 * Esta funcion permite llama a la funcion productShopPopulate y la devuelve
 * @param index
 * @returns {Function} Función productShopPopulate
 */
function callProductShopPopulate(index) {
  return function () {
    productShopPopulate(index);
  }
}

/**
 * Esta funcion permite llama a la funcion HideProductShopPopulate y la devuelve
 * @param index
 * @returns {Function} Función HideProductShopPopulate
 */
function callHideProductShopPopulate(index) {
  return function () {
    hideProductShopPopulate(index);
  }
}

/**
 * Esta funcion borra el contenido del main si existe
 */
function clearMain() {
  var main = document.getElementById("main"); //Cogemos el div principal

  while (main.hasChildNodes()) {
    main.removeChild(main.firstChild);
  }
}

/**
 * Esta funcion elimina el menu de tiendas si existe
 */
function removeShopsMenu() {
  var nav = document.getElementById("menu1");
  var menu = nav.getElementsByClassName("collapse navbar-collapse")[0];

  if (menu instanceof Node) {   //Comprobamos si ya existia
    nav.firstElementChild.removeChild(menu);    //Si existe lo borramos
    nav.style.display = "none";
  }
}

/**
 * Esta funcion elimina el menu de categorias si existe
 */
function removeCategoriesMenu() {
  var contenedor = document.getElementById("container");
  var aside = document.getElementsByTagName("aside")[0];

  if (aside instanceof Node) {   //Comprobamos si ya existia
    contenedor.removeChild(aside);    //Si existe lo borramos
  }
}

/**
 * Esta funcion elimina el boton mostrar todo, si existe
 */

function removeButton() {
  var header = document.getElementsByTagName("header")[0].firstElementChild;
  var button = header.getElementsByTagName("button")[0];

  if (button instanceof Node) {   //Comprobamos si ya existia
    header.removeChild(button);    //Si existe lo borramos
  }
}

/**
 * Esta funcion devuelve un array con todas las categorias de una tienda
 * @param shop Objeto Shop
 * @returns {Array} Array con las categorias sin repetir
 */
function getCategories(shop) {
  var categories = StoreHouse.getInstance().getShopCategories(shop);
  var category = categories.next();
  var temp, array = [];

  while (category.done !== true) {
    //El metodo getShopCategories devuelve la categoria de cada producto. Aqui quitamos las repetidas
    temp = array.findIndex(function (item) {
      return item.category.title == category.value.category.title;
    });

    if (temp == -1) {
      array.push(category.value);
    }
    category = categories.next();
  }

  return array;
}

/**
 * Esta funcion cambia la clase active de un elemento li a otro
 * @param nameCategory Nombre de la categoria
 */
function changeActive(nameCategory) {
  var ul = document.getElementsByTagName("aside")[0].firstChild.firstChild; //ul del menu
  var items = ul.children; //Elementos li
  var classValue;

  //Añadimos la clase active
  for (let i = 0; i < items.length; i++) {
    classValue = items[i].className;

    //Quitamos la clase active si existe
    if (/[active]/.test(classValue)) {
      items[i].className = classValue.replace(" active", "");
    }

    if (items[i].firstChild.innerHTML == nameCategory) {
      items[i].className += " active";
    }
  }
}

/**
 * Esta funcion recopila la informacion de un producto,
 * se la asigna a un elemento pre y lo devuelve
 * @param product Objeto Product
 * @returns {HTMLPreElement} Elemento pre
 */
function getProductInfo(product) {
  var text = document.createElement("pre");
  text.appendChild(document.createTextNode("Nombre: " + product.name + ".\n\r"));
  text.appendChild(document.createTextNode("Descripción: " + product.description + ".\n\r"));

  //Dependiendo del tipo de producto recogemos una informacion u otra
  if (product instanceof Bass) {
    text.appendChild(document.createTextNode("Cuerdas: " + product.strings + ".\n\r"));
    text.appendChild(document.createTextNode("Electronica: " + product.electronic + ".\n\r"));
  }
  else if (product instanceof Drums) {
    text.appendChild(document.createTextNode("Tipo: " + product.type + ".\n\r"));
    text.appendChild(document.createTextNode("Medidas de los toms: " + product.toms.toString() + ".\n\r"));
  }
  else {
    text.appendChild(document.createTextNode("Potencia: " + product.watts + " watts.\n\r"));
    text.appendChild(document.createTextNode("Tipo: " + product.type + ".\n\r"));
  }

  text.appendChild(document.createTextNode("Precio: " + product.price + ".\n\r"));
  text.appendChild(document.createTextNode("IVA: " + product.tax + ".\n\r"));

  text.normalize();
  return text;
}

/**
 * Crea un div producto para añadirlo a la pagina
 * @param product Objeto Product
 * @param cont Contador para asignar un id correlativo
 * @returns {HTMLDivElement | *} Elemento div
 */
function createProduct(product, cont) {
  var divProduct;  //Div para un producto
  var img, src, h3, description, button, button2;

  //Creamos el div para el producto
  divProduct = document.createElement("div");
  divProduct.id = "p" + cont;
  divProduct.className = "col-sm-3 col-md-4 panel panel-default producto";

  //Creamos y añadimos la imagen
  src = document.createAttribute("src");
  src.value = product.images[0];
  img = document.createElement("img");
  img.setAttributeNode(src);
  img.className = "center-block img-responsive imgTienda";
  divProduct.appendChild(img);

  //Creamos y añadimos un titulo
  h3 = document.createElement("h2");
  h3.className = "panel-footer text-center";
  h3.innerHTML = product.name;
  divProduct.appendChild(h3);

  //Creamos y añadimos la descripcion del producto
  description = document.createElement("div");
  description.appendChild(getProductInfo(product));
  description.id = "descr" + cont;
  description.className = "description";
  divProduct.appendChild(description);

  //Creamos y añadimos un boton
  button = document.createElement("button");
  button.innerHTML = "Mostrar información";
  button.id = "btnShow" + cont;
  button.className = "btn center-block";
  button.addEventListener("click", callProductShopPopulate(cont));
  divProduct.appendChild(button);

  //Creamos y añadimos un segundo boton
  button2 = document.createElement("button");
  button2.innerHTML = "Ocultar información";
  button2.id = "btnHide" + cont;
  button2.className = "btn center-block hideBtn";
  button2.addEventListener("click", callHideProductShopPopulate(cont));
  divProduct.appendChild(button2);

  return divProduct;
}

window.onload = init;
