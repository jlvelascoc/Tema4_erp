"use strict";
var ventanas = [];
var productsByCategory = [[], [], [], []];
var productsInShop = [[], [], [], [], []];
var categoriesData;
var shopsData;

/**
 * Esta función crea los objetos necesarios para realizar la práctica.
 */
function init() {
  console.log("init");

  //Creamos tres tiendas
  shopsData = [
    new Shop("Default", "A000000000"),
    new Shop("Danubio Azul", generateCif()),
    new Shop("La Lira", generateCif()),
    new Shop("Decibelios", generateCif()),
    new Shop("Garcia Cid", generateCif())
  ];
  //Añadimos la imagenes de cada una
  shopsData[0].image = "tienda0.png";
  shopsData[1].image = "tienda1.png";
  shopsData[2].image = "tienda2.png";
  shopsData[3].image = "tienda3.png";
  shopsData[4].image = "tienda4.png";

  //Creamos tres categorias
  categoriesData = [
    new Category("0000000000", "Default", "Default category"),
    new Category(generateId(), "Cuerda", "Guitarras y bajos Lorem ipsum dolor sit amet, consectetur adipisicing elit. Atque, aut doloribus ea est excepturi illo impedit laboriosam libero, natus perspiciatis placeat provident quidem quo, rem repellat veniam voluptas voluptatem voluptates!"),
    new Category(generateId(), "Percusion", "Instrumentos de percusion Lorem ipsum dolor sit amet, consectetur adipisicing elit. Atque, aut doloribus ea est excepturi illo impedit laboriosam libero, natus perspiciatis placeat provident quidem quo, rem repellat veniam voluptas voluptatem voluptates!"),
    new Category(generateId(), "Amplificadores", "Amplificadores de todos los instrumentos Lorem ipsum dolor sit amet, consectetur adipisicing elit. Atque, aut doloribus ea est excepturi illo impedit laboriosam libero, natus perspiciatis placeat provident quidem quo, rem repellat veniam voluptas voluptatem voluptates!")
  ];

  //Creamos los productos
  productsByCategory[1] = [
    new Bass(generateSerialNumber(), "Fender jazzbass", 500, 4, "pasiva"),
    new Bass(generateSerialNumber(), "Cort artisan", 450, "activa"),
    new Bass(generateSerialNumber(), "Rickenbacker", 150, 5, "activa")
  ];

  productsByCategory[2] = [
    new Drums(generateSerialNumber(), "Pearl reference pure", 800, "acustica"),
    new Drums(generateSerialNumber(), "Mapex Armory", 650, "acustica"),
    new Drums(generateSerialNumber(), "Yamaha e-drums", 480, "electronica")
  ];

  productsByCategory[3] = [
    new Amplifier(generateSerialNumber(), "Markbass mk210", 600, 300, "transistores"),
    new Amplifier(generateSerialNumber(), "Marshall MG100", 300, 150, "transistores"),
    new Amplifier(generateSerialNumber(), "Ashdown EVO 115", 250, 150, "transistores")
  ];

  //Añadimos una descripción a los productos
  productsByCategory[1][0].description = "Cuerpo de fresno americano, Mástil de arce canadiense, Diapasón de arce, 20 trastes, Escala: 864mm, Ancho de la cejilla: 38mm, Alma de doble acción, Pastillas de bobina simple Roswell JBA Alnico-5 vintage de estilo JB, 2 controles de volumen y 1 de tono, Herrajes de cromo deluxe, Clavijas de afinación PB-style clásicas, Cuerdas D'addario 045-100, Color: Natural de alto brillo.";
  productsByCategory[1][1].description = "Cuerpo de fresno de pantano, Mástil de 5 piezas de wengué y palisandro atornillado (bolt-on), Diapasón de palisandro (Dalbergia latifolia),Sin trastes ni thomann líneas de trastes, Escala de 34\" (864mm), Pastillas Bartolini MK-1, Preamplificador activo Markbass MB-1 con ecualizador de 3 bandas, 1 potenciómetro de volumen y de balance, Interruptor mini para modo activo/pasivo, Herrajes negros, Clavijas de afinación Hipshot Ultralight, Acabado: Natural a poro abierto.";
  productsByCategory[1][2].description = "Cuerpo de arce, Mástil de arce atravesado, Diapasón de madera Caribbean Rosewood (Metopium Brownei), Triangle Inlays, 20 trastes, Medida 845 mm, Ancho de cejuela 42,9 mm, Mecánicas thomann Schaller Deluxe, 2 pastillas Single Coil Bass, Peso: Aprox. 4,1 kg, Color: Midnight Blue, incluye caja.";
  productsByCategory[2][0].description = "Versión Standard, EXX725Z/C, Cascos laminados, Color: Jet Black #31, Hardware cromado, Cascos combinados de maderas caoba asiática y chopo para sonido profundo y voluminoso.";
  productsByCategory[2][1].description = "Configuración 'Rock', Material del casco: Arce/Nogal, Herrajes de cromo negros, Cascos lacados de alto brillo, Color: Arce 'Agua Profunda' (Deep Water Maple Burst, #MSL), El thomann borde SONIClear™ mejora el tono y el rango de afinación.";
  productsByCategory[2][2].description = "Incluye diez Kits de Batería y diez Funciones de Ejercicios, El set viene con Pads de Batería de nuevo desarrollo, Pads de thomann platillos grandes, Nuevo módulo DTX400 Drum Trigger Module con 169 sonidos de alta calidad, USB, Aux in, Salida de auriculares, Pedal de bombo casi silencioso.";
  productsByCategory[3][0].description = "Potencia: 500W 4 ohm / 300W 8 ohm, Configuración: 2x altavoces de 10\" de neodimio, Custom made by thomann B&C + Tweeter, 40Hz - 18KHz, Reguladores: Volumen, Bass, low y Hight mid, Hights, Master Volumen, Filtro Pre Shape variable, Función de Emulación Vintage Speaker, Salida de línea, Envío y retorno de efectos, Recinto adaptado como monitor (wedge) con dos ángulos de apoyo, Sistema Bassreflex, ultra ligero y ultra compacto, Peso: Aprox. 20 kg, Medida An x thomann Al x Pr: 59,5 x 48 x 47,5 cm.";
  productsByCategory[3][1].description = "2x 50 W, 4 canales, Efectos FX digitales, Entrada de micrófono (alimentación phantom 15V), Medidas: 60 x 54 x 26,1cm, Peso: 21kg.";
  productsByCategory[3][2].description = "1 altavoz Ashdown de 15\", Emulación de válvulas, Entrada activa y pasiva, Medidor VU, Ecualizador de 5 bandas, Interruptor 'bright', Interruptor 'deep', DI balanceada conmutable (ecualizador Pre/Post), Control de compresión, Control 'overdrive', Control de sub-armónicos, Bucle de efectos, Salida de afinador.";

  //Añadimos las medidas de los toms de las baterias
  productsByCategory[2][0].toms = ["22x18", "12x08", "13x09", "16x16", "14x5.5"];
  productsByCategory[2][1].toms = ["22x18", "10x08", "12x09", "14x14", "14x5.5"];
  productsByCategory[2][2].toms = ["5", "7.5", "7.5", "7.5", "7.5"];

  //Añadimos las imagenes a los productos
  productsByCategory[1][0].addImage("img/fender.png");
  productsByCategory[1][0].addImage("img/fender-1.png");
  productsByCategory[1][0].addImage("img/fender-2.png");
  productsByCategory[1][0].addImage("img/fender-3.png");
  productsByCategory[1][1].addImage("img/cort.png");
  productsByCategory[1][1].addImage("img/cort-1.png");
  productsByCategory[1][1].addImage("img/cort-2.png");
  productsByCategory[1][2].addImage("img/rickenbacker.png");
  productsByCategory[1][2].addImage("img/rickenbacker-1.png");
  productsByCategory[1][2].addImage("img/rickenbacker-2.png");
  productsByCategory[2][0].addImage("img/pearl.png");
  productsByCategory[2][0].addImage("img/pearl-1.png");
  productsByCategory[2][0].addImage("img/pearl-2.png");
  productsByCategory[2][1].addImage("img/mapex.png");
  productsByCategory[2][1].addImage("img/mapex-1.png");
  productsByCategory[2][1].addImage("img/mapex-2.png");
  productsByCategory[2][1].addImage("img/mapex-3.png");
  productsByCategory[2][2].addImage("img/yamaha.png");
  productsByCategory[2][2].addImage("img/yamaha-1.png");
  productsByCategory[2][2].addImage("img/yamaha-2.png");
  productsByCategory[3][0].addImage("img/markbass.png");
  productsByCategory[3][0].addImage("img/markbass-1.png");
  productsByCategory[3][0].addImage("img/markbass-2.png");
  productsByCategory[3][1].addImage("img/marshall.png");
  productsByCategory[3][1].addImage("img/marshall-1.png");
  productsByCategory[3][1].addImage("img/marshall-2.png");
  productsByCategory[3][2].addImage("img/ashdown.png");
  productsByCategory[3][2].addImage("img/ashdown-1.png");
  productsByCategory[3][2].addImage("img/ashdown-2.png");

  //Convertimos los objetos product en literales
  for (let i = 1; i < productsByCategory.length; i++) {
    for (let j = 0; j < productsByCategory[i].length; j++) {
      productsByCategory[i][j] = productsByCategory[i][j].getObject();
    }
  }

  //Creamos un array con el serial number y el stock de los productos en cada tienda
  productsInShop[1] = [
    {serialNumber: productsByCategory[1][0].serialNumber, stock: 5},
    {serialNumber: productsByCategory[1][1].serialNumber, stock: 1},
    {serialNumber: productsByCategory[1][2].serialNumber, stock: 3},
    {serialNumber: productsByCategory[2][0].serialNumber, stock: 7},
    {serialNumber: productsByCategory[2][1].serialNumber, stock: 7},
    {serialNumber: productsByCategory[2][2].serialNumber, stock: 9},
    {serialNumber: productsByCategory[3][0].serialNumber, stock: 9},
    {serialNumber: productsByCategory[3][1].serialNumber, stock: 1},
    {serialNumber: productsByCategory[3][2].serialNumber, stock: 10}
  ];

  productsInShop[2] = [
    {serialNumber: productsByCategory[1][0].serialNumber, stock: 4},
    {serialNumber: productsByCategory[1][1].serialNumber, stock: 3},
    {serialNumber: productsByCategory[1][2].serialNumber, stock: 4},
    {serialNumber: productsByCategory[2][0].serialNumber, stock: 3},
    {serialNumber: productsByCategory[2][1].serialNumber, stock: 5},
    {serialNumber: productsByCategory[2][2].serialNumber, stock: 6},
    {serialNumber: productsByCategory[3][0].serialNumber, stock: 7},
    {serialNumber: productsByCategory[3][1].serialNumber, stock: 8},
    {serialNumber: productsByCategory[3][2].serialNumber, stock: 9}
  ];

  productsInShop[3] = [
    {serialNumber: productsByCategory[1][0].serialNumber, stock: 1},
    {serialNumber: productsByCategory[1][1].serialNumber, stock: 3},
    {serialNumber: productsByCategory[1][2].serialNumber, stock: 4},
    {serialNumber: productsByCategory[2][0].serialNumber, stock: 5},
    {serialNumber: productsByCategory[2][1].serialNumber, stock: 6},
    {serialNumber: productsByCategory[2][2].serialNumber, stock: 2},
    {serialNumber: productsByCategory[3][0].serialNumber, stock: 2},
    {serialNumber: productsByCategory[3][1].serialNumber, stock: 2},
    {serialNumber: productsByCategory[3][2].serialNumber, stock: 2}
  ];

  productsInShop[4] = [
    {serialNumber: productsByCategory[1][0].serialNumber, stock: 2},
    {serialNumber: productsByCategory[1][1].serialNumber, stock: 2},
    {serialNumber: productsByCategory[1][2].serialNumber, stock: 2},
    {serialNumber: productsByCategory[2][0].serialNumber, stock: 1},
    {serialNumber: productsByCategory[2][1].serialNumber, stock: 1},
    {serialNumber: productsByCategory[2][2].serialNumber, stock: 1},
    {serialNumber: productsByCategory[3][0].serialNumber, stock: 3},
    {serialNumber: productsByCategory[3][1].serialNumber, stock: 3},
    {serialNumber: productsByCategory[3][2].serialNumber, stock: 3}
  ];
}//Fin de la función init

/**
 * Esta función dibuja la página. En ella se muestran
 * las tiendas
 */
function initPopulate() {
  console.log("initPopulate");

  //Borramos el contenido de main si existe
  clearMain();

  //Borramos el de categorias si existe
  removeCategoriesMenu();

  //Si el menu no existe lo creamos
  if ($("#menuPrincipal") == null) {
    principalMenuPopulate("Tiendas");
  }
  else {//Si existe lo borramos
    removeMenu();
    principalMenuPopulate("Tiendas");
  }

  var main = $("#main")[0]; //Cogemos el contenedor principal
  var section = document.createElement("section");  //Contenedor donde agruparemos las tiendas
  var header = $("header").children(0)[0]; //Cogemos la cabecera
  var button; //Boton para mostrar cerrar las ventanas
  var col, divShop, divButtons, divPanel, imagen, row, div;  //Elementos para cada tienda
  var objectShop;   //tienda

  var shops = StoreHouse.getInstance().shops;
  var shop = shops.next();
  var i = 0;

  button = document.createElement("button");
  $(button).attr({
    "type": "button",
    "class": "btn btn-lg center-block new private",
    "data-toggle": "modal",
    "data-target": "#insertShop"
  });
  $(button).click(modalInsertShop);
  $(button).text("Insertar tienda");
  $(section).append(button);

  while (shop.done !== true) {
    //Creamos una fila cada 3 productos
    if (i % 3 == 0) {
      row = document.createElement("div");
      $(row).attr("class", "row");
      $(section).append(row);
    }

    objectShop = shop.value.shop;
    col = document.createElement("div");
    $(col).attr("class", "col-sm-4 margen");

    divPanel = document.createElement("div");
    $(divPanel).attr("class", "panel panel-default");

    //Creamos el div de la tienda
    divShop = document.createElement("div");
    $(divShop).attr({
      "id": "t" + i,
      "class": "text-center tienda"
    });

    //Creamos y añadimos la imagen
    imagen = document.createElement("img")
    $(imagen).attr({
      "class": "imgTienda",
      "src": "img/" + objectShop.image
    });
    $(divShop).append(imagen);

    //Creamos y añadimos un titulo
    $(divShop).append("<h2 class='panel-footer'>"+objectShop.name+"</h2>");

    //Creamos un evento onclick
    $(divShop).click(callShopPopulate(objectShop));

    $(divPanel).append(divShop);
    $(col).append(divPanel);

    if (i != 0) { //si la tienda no es la de por defecto
      //Creamos los botones eliminar, añadir y modificar tienda
      divButtons = document.createElement("div");
      $(divButtons).attr("class", "buttons");

      button = document.createElement("button");
      $(button).attr("class", "btn remove private");
      $(button).text("Eliminar");
      $(button).click(callRemoveShop(objectShop));
      $(divButtons).append(button);

      button = document.createElement("button");
      $(button).attr({
        "class": "btn add private",
        "data-toggle": "modal",
        "data-target": "#addProduct"
      });
      $(button).text("Añadir Producto");
      $(button).click(callModalAddProductInShop(objectShop));
      $(divButtons).append(button);

      button = document.createElement("button");
      $(button).attr({
        "class": "btn set private",
        "data-toggle": "modal",
        "data-target": "#setShop"
      });
      $(button).text("Modificar");
      $(button).click(callModalEditShop(objectShop));
      $(divButtons).append(button);

      $(divPanel).append(divButtons);
    }

    $(row).append(col); //Añadimos la columna a la fila

    shop = shops.next();
    i++;
  }

  //Si los botones no existen los creamos
  if (document.getElementById("signUp") == null) {
    //Boton iniciar sesion
    button = document.createElement("button");
    $(button).text("Iniciar Sesion");
    $(button).attr({
      "id": "signUp",
      "class": "btn pull-right",
      "data-toggle": "modal",
      "data-target": "#logIn"
    });
    $(button).click(modalLogIn);
    $(header).append(button);

    //Boton cerrar sesion
    button = document.createElement("button");
    $(button).text("Cerrar Sesion");
    $(button).attr({
      "id": "signOff",
      "class": "btn pull-right private"
    });
    $(button).click(logOut);
    $(header).append(button);

    //Creamos el boton Cerrar todas las ventanas
    button = document.createElement("button");
    $(button).text("Cerrar todas las ventanas");
    $(button).attr({
      "id": "cerrarTodo",
      "class": "btn pull-right"
    });
    $(button).click(closeAllWindows);
    $(header).append(button);

    //Creamos el boton guardar datos
    button = document.createElement("button");
    $(button).text("Guardar datos");
    $(button).attr({
      "id": "save",
      "class": "btn pull-right private"
    });
    $(button).click(saveData);
    $(header).append(button);
  }

  //Añadimos la seccion al contenedor principal
  $(section).attr("id", "tiendas");
  $(main).append(section);
  $(main).removeClass("col-sm-10");
  $(main).addClass("col-sm-12");

  //Cerramos las ventanas de productos que haya abiertas
  closeAllWindows();

  //Si estamos logueados mostramos las funciones ocultas
  if (checkCookie()) {
    showButtons();
  }
}

/**
 * Esta funcion crea el menu para navegar entre las distintas secciones del almacen (tiendas, categorias, productos)
 * @param nameSection
 */
function principalMenuPopulate(nameSection) {
  console.log("principalMenuPopulate");

  //Recogemos los elementos padre
  var contenedor = $("#menu1").children(0)[0];
  var div = document.createElement("div");
  var ul, liP, li, a, span;

  //Creamos la estructura del menu principal
  ul = document.createElement("ul");
  $(ul).attr("class", "nav nav-tabs");

  liP = document.createElement("li");
  $(liP).attr("class", "dropdown");

  a = document.createElement("a");
  $(a).text(nameSection);
  $(a).attr({
    "id": "itemDDown",
    "href": "javascript:;",
    "class": "dropdown-toggle",
    "data-toggle": "dropdown"
  });

  span = document.createElement("span");
  $(span).attr("class", "caret");

  $(a).append(span);
  $(liP).append(a);
  $(ul).append(liP);
  $(div).append(ul);
  $(div).attr("id", "menuPrincipal");
  $(contenedor).append(div);

  //Creamos el contenido desplegable
  ul = document.createElement("ul");
  $(ul).attr("class", "dropdown-menu");

  li = document.createElement("li");
  a = document.createElement("a");
  $(a).text("Tiendas");
  $(a).attr("href", "javascript:;");
  $(a).click(initPopulate);
  $(li).append(a);
  $(ul).append(li);

  li = document.createElement("li");
  a = document.createElement("a");
  $(a).text("Categorias");
  $(a).attr("href", "javascript:;");
  $(a).click(categoriesPopulate);
  $(li).append(a);
  $(ul).append(li);

  li = document.createElement("li");
  a = document.createElement("a");
  $(a).text("Productos");
  $(a).attr("href", "javascript:;");
  $(a).click(globalProductPopulate);
  $(li).append(a);
  $(ul).append(li);

  li = document.createElement("li");
  a = document.createElement("a");
  $(a).text("Ubicación");
  $(a).attr("href", "javascript:;");
  $(a).click(geolocationPopulate);
  $(li).append(a);
  $(ul).append(li);

  liP.appendChild(ul);
}

/**
 * Esta función crea un menú con un item para cada tienda
 */
function shopsMenusPopulate(nameShop) {
  console.log("shopsMenusPopulate");

  //Creamos los elementos header, nav y ul
  var contenedor = $("#menuPrincipal").children(0)[0];
  var li, a;

  //Cogemos las tiendas
  var shops = StoreHouse.getInstance().shops;
  var shop = shops.next();
  var objectShop;

  while (shop.done !== true) {
    objectShop = shop.value.shop;

    //Creamos el enlace
    a = document.createElement("a");
    $(a).text(objectShop.name);
    $(a).attr("href", "javascript:;");
    //Creamos un evento onclick
    $(a).click(callShopPopulate(objectShop));

    //Creamos el li
    li = document.createElement("li");
    if (objectShop.name == nameShop) {
      $(li).attr("class", "active");
    }

    //Añadimos el enlace al li y el li al contenedor
    $(li).append(a);
    $(contenedor).append(li);

    shop = shops.next();
  }
}

/**
 * Esta función dibuja los productos de una tienda.
 * Tambien se utiliza al filtrar los productos de una categoria.
 * El parametro que recibe varía en función desde donde sea llamada
 * @param shop Puede ser de dos tipos: objeto tienda o un objeto categoria
 */
function shopPopulate(shop) {
  console.log("shopPopulate");
  console.log(shop);
  //Cerramos las ventanas de productos que haya abiertas
  closeAllWindows();

  var main = $("#main")[0]; //Cogemos el main
  var divProducts = document.createElement("section");  //Contenedor donde agruparemos los productos
  var row; //Div con la clase row para agrupar los productos y necesaria para bootstrap

  removeCategoriesMenu(); //Borramos el menu de las categorias si existe
  clearMain(); //Borramos el contenedor principal si existe
  removeShopsMenu();

  var products = StoreHouse.getInstance().getShopProducts(shop); //Cogemos los productos
  var product = products.next();
  var i = 0;

  while (product.done !== true) {
    //Creamos una fila cada 3 productos
    if (i % 3 == 0) {
      row = document.createElement("div");
      $(row).addClass = "row";
      $(divProducts).append(row);
    }

    //Creamos el producto y lo añadimos a la fila
    $(row).append(createProduct(product.value.product, i));
    product = products.next();
    i++;
  }

  //Volvemos a crear los menus
  shopsMenusPopulate(shop.name);
  menuCategoryShopPopulate(shop, "");

  //Añadimos la seccion al contenedor principal
  $(divProducts).attr({
    "id": "tiendas",
    "class": "panel-body row"
  });

  $(main).attr("class", "col-sm-10");
  main.appendChild(divProducts);

  //Si estamos logueados mostramos las funciones ocultas
  if (checkCookie()) {
    showButtons();
  }
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
  var aside = document.createElement("aside");
  var nav = document.createElement("nav");
  var ul = document.createElement("ul");
  var li, a;

  for (let i = 0; i < categories.length; i++) {
    a = document.createElement("a");
    $(a).text(categories[i].category.title);
    $(a).attr("href", "javascript:;");
    //Creamos un evento onclick
    $(a).click(callProductsCategoryShopPopulate(categories[i], shop));

    //Añadimos la clase active, en función de la categoria en la que nos encontramos
    li = document.createElement("li");
    if (categories[i].title == nameCategory) {
      $(li).addClass(" active");
    }

    $(li).append(a);
    $(ul).append(li);
  }

  //Asignamos las clases y añadimos el menu a la pagina
  $(ul).attr("class", "nav nav-pills nav-stacked");
  $(nav).append(ul);

  $(nav).attr({
    "id": "menuCategorias",
    "class": "sidebar-nav"
  });
  aside.appendChild(nav);

  $(aside).attr("class", "col-md-2");
  $("#main").before(aside);
}

/**
 * Esta funcion muestra los productos de una categoria
 * en una tienda. Reutiliza la función shopPopulate
 * @param category Objeto Category
 */
function productCategoryShopPopulate(category, shop) {
  clearMain(); //Borramos el main
  changeActive(category.category.title); //Cambiamos la clase active

  //shopPopulateByCategory(shop, category);
  //Cerramos las ventanas de productos que haya abiertas
  closeAllWindows();

  var main = $("#main")[0]; //Cogemos el main
  var divProducts = document.createElement("section");  //Contenedor donde agruparemos los productos
  var row; //Div con la clase row para agrupar los productos y necesaria para bootstrap

  removeCategoriesMenu(); //Borramos el menu de las categorias si existe
  clearMain(); //Borramos el contenedor principal si existe
  removeShopsMenu();

  var products = StoreHouse.getInstance().getShopProducts(shop); //Cogemos los productos
  var product = products.next();
  var i = 0;
  var index;

  while (product.done !== true) {
    //Creamos una fila cada 3 productos
    if (i % 3 == 0) {
      row = document.createElement("div");
      $(row).addClass = "row";
      $(divProducts).append(row);
    }

    index = category.products.findIndex(function (a) {
      return a.serialNumber == product.value.product.serialNumber;
    });

    if(index != -1){
      //Creamos el producto y lo añadimos a la fila
      $(row).append(createProduct(product.value.product, i));
      i++;
    }

    product = products.next();
  }

  //Volvemos a crear los menus
  shopsMenusPopulate(shop.name);
  menuCategoryShopPopulate(shop, category.category.title);

  //Añadimos la seccion al contenedor principal
  $(divProducts).attr({
    "id": "tiendas",
    "class": "panel-body row"
  });

  $(main).attr("class", "col-sm-10");
  main.appendChild(divProducts);

  //Si estamos logueados mostramos las funciones ocultas
  if (checkCookie()) {
    showButtons();
  }
}

/**
 * Esta función muestra la información de un producto en una ventana nueva
 * @param index Numero del id del elemento html
 * @param product Objeto producto.
 */
function productShopPopulate(index, product) {
  console.log("productShopPopulate");
  var i, description, divProduct;

  //Cambiamos los displays para cambiar los botones
  $("#btnShow" + index).css("display", "none");
  $("#btnHide" + index).css("display", "block");

  //Creamos la nueva ventana y la añadimos al array
  ventanas.push(window.open("producto.html", product.name, "toolbar=no,scrollbars=no,resizable=no,top=200,left=500,width=500,height=500"));

  //Escribimos la información en la ventana
  i = ventanas.length - 1;
  ventanas[i].onload = function () {
    var main = ventanas[i].$("main")[0];
    $(main).append(productCarousel(product));
    $(main).append(getProductInfo(product));
  }

  //Añadimos un evento que se ejecuta justo antes de cerrar la ventana
  ventanas[i].addEventListener("beforeunload", callHideProductShopPopulate(index, product.name));

  $("#cerrarTodo").css("display", "block");
}

/**
 * Esta función cambia los displays de los botones al cerrar una ventana
 * @param index Numero del id del elemento html.
 */
function hideProductShopPopulate(index, name) {
  console.log("hideProductShopPopulate");
  var cont = 0;
  var position;

  //Cambiamos los displays para mostrar un boton y ocultar otro
  $("#btnShow" + index).css("display", "block");
  $("#btnHide" + index).css("display", "none");

  //Borramos la referencia de la ventana
  position = ventanas.findIndex(function (a) {
    return a.name == name;
  });
  ventanas.splice(position, 1);

  //Comprobamos si queda alguna ventana abierta para saber si mantenemos visible el boton "cerrar todo"
  for (let i = 0; i < ventanas.length && !opened; i++) {
    if (!ventanas[i].closed) {
      cont++;
    }
  }

  if (cont <= 1) {
    $("#cerrarTodo").css("display", "none");
  }
}

/**
 * Esta función muestra la información de todos los productos
 * registrados en el almacen y su stock total
 */
function globalProductPopulate() {
  console.log("globalProductPopulate");

  removeCategoriesMenu(); //Borramos el menu de las categorias si existe
  clearMain(); //Borramos el contenedor principal si existe
  removeMenu(); //Borramos las tiendas del menu

  principalMenuPopulate("Productos");

  //Elementos html necesarios para mostrar la información
  var main = $("#main")[0];
  var section = document.createElement("section");
  var div, h4, text, strong, button, divButtons;

  var storeHouse = StoreHouse.getInstance(); //Instancia del alamacen
  var categories = storeHouse.categories;
  var category = categories.next();

  button = document.createElement("button");
  $(button).attr({
    "type": "button",
    "class": "btn btn-lg center-block new private",
    "data-toggle": "modal",
    "data-target": "#insertProduct"
  });
  $(button).click(modalInsertProduct);
  $(button).text("Insertar producto");
  $(section).append(button);

  while (category.done !== true) {
    div = document.createElement("div");
    h4 = document.createElement("h4");
    $(h4).text(category.value.category.title);
    $(h4).attr("class", "category");
    $(div).append(h4);

    //Recorremos los productos de la categoria
    for (let i = 0; i < category.value.products.length; i++) {
      text = document.createElement("p");
      $(text).append("<strong>Stock:</strong> " + storeHouse.getGlobalStock(category.value.products[i].serialNumber));
      $(div).append(getProductInfo(category.value.products[i]));
      $(div).children().last().append(text);

      divButtons = document.createElement("div");
      $(divButtons).attr("class", "btns");
      $(div).children("div").append(divButtons);

      button = document.createElement("button");
      $(button).attr("class", "btn remove private");
      $(button).text("Eliminar");
      $(button).click(callRemoveProduct(category.value.products[i], category.value.category));
      $(divButtons).append(button);

      button = document.createElement("button");
      $(button).attr({
        "class": "btn set private",
        "data-toggle": "modal",
        "data-target": "#setProduct"
      });
      $(button).text("Modificar");
      $(button).click(callModalEditProduct(category.value.products[i], category.value.category));
      $(divButtons).append(button);
    }
    $(div).attr("class", "infoGlobal");
    section.appendChild(div);

    category = categories.next();
  }

  $(main).append(section);

  //Si estamos logueados mostramos las funciones ocultas
  if (checkCookie()) {
    showButtons();
  }
}

/**
 * Esta funcion muestra las categorias disponibles en el almacen
 */
function categoriesPopulate() {
  console.log("categoriesPopulate");

  removeCategoriesMenu(); //Borramos el menu de las categorias si existe
  clearMain(); //Borramos el contenedor principal si existe
  removeMenu(); //Borramos las tiendas del menu

  principalMenuPopulate("Categorias");

  //Elementos html necesarios para mostrar la información
  var main = $("#main")[0];
  var section = document.createElement("section");
  var divMargen, divCategory, divButtons, divPanel, row, h3, p, button;
  var i = 0;

  var categories = StoreHouse.getInstance().categories;
  var category = categories.next();

  $(main).attr("class", "col-sm-12"); //Cambiamos la clase del main para hacerlo mas ancho";

  button = document.createElement("button");
  $(button).attr({
    "type": "button",
    "class": "btn btn-lg center-block new private",
    "data-toggle": "modal",
    "data-target": "#insertCategory"
  });
  $(button).click(modalInsertCategory);
  $(button).text("Insertar categoria");
  $(section).append(button);

  while (category.done !== true) {
    //Creamos una fila cada 3 categorias
    if (i % 3 == 0) {
      row = document.createElement("div");
      $(row).attr("class","row");
      $(section).append(row);
    }

    divMargen = document.createElement("div");
    $(divMargen).attr("class", "col-sm-3 col-md-4  margen");
    $(row).append(divMargen);

    divPanel = document.createElement("div");
    $(divPanel).attr("class", "panel panel-default");
    $(divMargen).append(divPanel);

    divCategory = document.createElement("div");
    $(divCategory).attr({
      "id": "c" + (i + 1),
      "class": "category"
    });
    $(divPanel).append(divCategory);

    //Creamos y añadimos un titulo
    h3 = document.createElement("h3");
    $(h3).attr("class", "text-center");
    $(h3).text(category.value.category.title);
    $(divCategory).append(h3);

    //Creamos y añadimos una descripcion
    p = document.createElement("p");
    $(p).text(category.value.category.description);
    $(divCategory).append(p);

    if (i != 0) { //Si la categoria no es la de por defecto
      //Creamos los botones de modificar y eliminar
      divButtons = document.createElement("div");
      $(divButtons).attr("class", "buttons");
      $(divPanel).append(divButtons);

      button = document.createElement("button");
      $(button).attr("class", "btn remove private");
      $(button).text("Eliminar");
      $(button).click(callRemoveCategory(category.value.category));
      divButtons.appendChild(button);

      button = document.createElement("button");
      $(button).attr({
        "class": "btn set private",
        "data-toggle": "modal",
        "data-target": "#setCategory"
      });
      $(button).text("Modificar");
      $(button).click(callModalEditCategory(category.value.category));
      $(divButtons).append(button);
    }

    category = categories.next();
    i++;
  }

  $(main).append(section);

  //Si estamos logueados mostramos las funciones ocultas
  if (checkCookie()) {
    showButtons();
  }
}

/**
 * Esta función muestra un mapa con la ubicación de las tiendas
 */
function geolocationPopulate() {
  removeCategoriesMenu(); //Borramos el menu de las categorias si existe
  clearMain(); //Borramos el contenedor principal si existe
  removeMenu(); //Borramos las tiendas del menu

  principalMenuPopulate("Ubicación");

  //Elementos html necesarios para mostrar la información
  var main = $("#main")[0];
  var section = document.createElement("section");
  var div = document.createElement("div");

  $(div).attr("id", "principalMap");
  $(section).append(div);
  $(section).attr("class", "container");
  $(main).append(section);

  getLocation("principalMap"); //Llamamos a la funcion que dibuja el mapa
}

/*Funciones privadas*/
/**
 * Esta funcion llama a la funcion shopPopulate y la devuelve
 * @param shop Objeto Shop
 * @returns {Function} Funcion shopPopulate
 */
function callShopPopulate(shop) {
  return function () {
    shopPopulate(shop);
  }
}

/**
 * Esta funcion llama a la funcion productsCategoryShopPopulate y la devuelve
 * @param category Objeto Category
 * @returns {Function} Funcion productsCategoryShopPopulate
 */
function callProductsCategoryShopPopulate(category, shop) {
  return function () {
    productCategoryShopPopulate(category, shop);
  }
}

/**
 * Esta funcion llama a la funcion productShopPopulate y la devuelve
 * @param index
 * @returns {Function} Función productShopPopulate
 */
function callProductShopPopulate(index, product) {
  return function () {
    productShopPopulate(index, product);
  }
}

/**
 * Esta funcion permite llama a la funcion HideProductShopPopulate y la devuelve
 * @param index
 * @returns {Function} Función HideProductShopPopulate
 */
function callHideProductShopPopulate(index, name) {
  return function () {
    hideProductShopPopulate(index, name);
  }
}

/**
 * Esta funcion borra el contenido del main si existe
 */
function clearMain() {
  $("#main").empty();
}

/**
 * Esta funcion elimina el menu principal
 */
function removeMenu() {
  $("#menuPrincipal").remove();
}

/**
 * Esta funcion elimina el menu con los items de las tiendas
 */
function removeShopsMenu() {
  console.log("removeShopsMenu");
  $("#menuPrincipal li.dropdown").nextAll().remove();
}

/**
 * Esta funcion elimina el menu de categorias si existe
 */
function removeCategoriesMenu() {
  var aside = $("aside")[0];
  if (aside instanceof Node) {   //Comprobamos si ya existia
    $(aside).remove();    //Si existe lo borramos
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
  var items = $("#menuCategorias").find("a");
  $("#menuCategorias").find("li").removeClass("active"); //Eliminamos la clase active del elemento anterior

  //Añadimos la clase active al li
  for (let i = 0; i < items.length; i++) {
    if ($(items[i]).text() == nameCategory) {
      $(items[i]).parent().addClass(" active");
    }
  }
}

/**
 * Esta funcion recopila la informacion de un producto,
 * se la asigna a un elemento pre y lo devuelve
 * @param product Objeto Product
 * @returns {HTMLDiv} Elemento div
 */
function getProductInfo(product) {
  var text;
  var strong;
  var div = document.createElement("div");

  text = document.createElement("p");
  strong = document.createElement("strong");
  $(strong).text("Nombre: ");
  $(text).append(strong);
  $(text).append(product.name);
  $(text).attr("class", "panel-heading");
  $(div).append(text);

  text = document.createElement("p");
  strong = document.createElement("strong");
  $(strong).text("Descripción: ");
  $(text).append(strong);
  $(text).append(product.description);
  $(div).append(text);

  //Dependiendo del tipo de producto recogemos una informacion u otra
  if (product instanceof Bass) {
    text = document.createElement("p");
    strong = document.createElement("strong");
    $(strong).text("Cuerdas: ");
    $(text).append(strong);
    $(text).append(product.strings);
    $(div).append(text);

    text = document.createElement("p");
    strong = document.createElement("strong");
    $(strong).text("Electrónica: ");
    $(text).append(strong);
    $(text).append(product.electronic);
    $(div).append(text);
  }
  else if (product instanceof Drums) {
    text = document.createElement("p");
    strong = document.createElement("strong");
    $(strong).text("Tipo: ");
    $(text).append(strong);
    $(text).append(product.type);
    $(div).append(text);

    text = document.createElement("p");
    strong = document.createElement("strong");
    $(strong).text("Medidas de los toms: ");
    $(text).append(strong);
    $(text).append(product.toms.toString());
    $(div).append(text);
  }
  else {
    text = document.createElement("p");
    strong = document.createElement("strong");
    $(strong).text("Potencia: ");
    $(text).append(strong);
    $(text).append(product.watts + " watts.");
    $(div).append(text);

    text = document.createElement("p");
    strong = document.createElement("strong");
    $(strong).text("Tipo: ");
    $(text).append(strong);
    $(text).append(product.type);
    $(div).append(text);
  }

  text = document.createElement("p");
  strong = document.createElement("strong");
  $(strong).text("Precio: ");
  $(text).append(strong);
  $(text).append(product.price + "€.");
  $(div).append(text);

  text = document.createElement("p");
  strong = document.createElement("strong");
  $(strong).text("IVA: ");
  $(text).append(strong);
  $(text).append(product.tax + "%.");
  $(div).append(text);

  $(div).attr("class", "panel panel-default productInfo");
  return div;
}

/**
 * Crea un div producto para añadirlo a la pagina
 * @param product Objeto Product
 * @param cont Contador para asignar un id correlativo
 * @returns {HTMLDivElement | *} Elemento div
 */
function createProduct(product, cont) {
  var divProduct, divMargen, divImg, img, src, h3, description, button, button2;

  divMargen = document.createElement("div");
  $(divMargen).attr("class", "col-sm-3 col-md-4  margen");

  //Creamos el div para el producto
  divProduct = document.createElement("div");
  $(divProduct).attr({
    "id": "p" + cont,
    "class": "panel panel-default producto"
  });
  $(divMargen).append(divProduct);

  //Creamos y añadimos un titulo
  h3 = document.createElement("h3");
  $(h3).attr("class", "text-center");
  $(h3).text(product.name);
  $(divProduct).append(h3);

  //Creamos y añadimos la imagen
  divImg = document.createElement("div");
  img = document.createElement("img");
  $(img).attr({
    "src": product.images[0],
    "class": "center-block img-responsive imgProducto"
  });
  $(divImg).append(img);
  $(divImg).attr("class","divImg");
  $(divProduct).append(divImg);

  //Creamos y añadimos un boton
  button = document.createElement("button");
  $(button).text("Mostrar información");
  $(button).attr({
    "id": "btnShow" + cont,
    "class": "btn center-block"
  });
  $(button).click(callProductShopPopulate(cont, product));
  $(divProduct).append(button);

  //Creamos y añadimos un segundo boton
  button2 = document.createElement("button");
  $(button2).text("Ocultar información");
  $(button2).attr({
    "id": "btnHide" + cont,
    "class": "btn center-block hideBtn"
  });
  $(button2).click(callCloseWindow(product.name));
  $(divProduct).append(button2);

  return divMargen;
}

/**
 * Esta función crea un slider con las imagenes de un producto
 * @param product Objeto Product
 * @returns {Element} Devuelve el slider
 */
function productCarousel(product) {
  var items = product.images.length; //Numero de imagenes existentes del prodcuto
  var container = document.createElement("div");
  var carousel = document.createElement("div");
  var ol = document.createElement("ol");
  var li, div, img, a, span;

  //Creamos una lista con tantos items como imagenes haya
  for (let i = 0; i < items; i++) {
    li = document.createElement("li");
    $(li).attr({
      "data-target": "#myCarousel",
      "data-slide-to": i
    });
    $(ol).append(li);

    //Creamos un div que contendra a la imagen
    div = document.createElement("div");
    if (i == 0) { //Al primero le añadimos la clase active
      $(div).attr("class", "item active");
      $(li).attr("class", "active");
    }
    else {
      $(div).attr("class", "item");
    }

    img = document.createElement("img");
    $(img).attr({
      "src": product.images[i],
      "style": "width:100%;"
    });

    $(div).append(img);
    $(carousel).append(div);
  }

  $(carousel).attr("class", "carousel-inner");
  $(container).append(carousel);

  //Creamos los enlaces para navegar por las imágenes
  a = document.createElement("a");
  $(a).attr({
    "class": "left carousel-control",
    "href": "#myCarousel",
    "data-slide": "prev"
  });

  span = document.createElement("span");
  $(span).attr("class", "glyphicon glyphicon-chevron-left");
  $(a).append(span);
  $(container).append(a);

  a = document.createElement("a");
  $(a).attr({
    "class": "right carousel-control",
    "href": "#myCarousel",
    "data-slide": "next"
  });

  span = document.createElement("span");
  $(span).attr("class", "glyphicon glyphicon-chevron-right");
  $(a).append(span);
  $(container).append(a);

  $(container).attr({
    "id": "myCarousel",
    "class": "carousel slide",
    "data-ride": "carousel"
  });
  return container;
}

/**
 * Esta función cierra todas la ventanas que se encuentren abiertas.
 */
function closeAllWindows() {
  console.log("closeAllWindows");
  var items = ventanas.length;

  for (let i = 0; i < items; i++) {
    ventanas[0].close();
  }

  $("#cerrarTodo").css("display", "none");
}

/**
 * Esta función cierra una ventana.
 * @param name Nombre de la ventana a cerrar.
 */
function closeWindow(name) {
  //Recopilamos la posicion de la ventana en el array.
  var i = ventanas.findIndex(function (a) {
    return a.name == name;
  });

  ventanas[i].close();
}

/**
 * Esta funcion llama a la funcion closeWindow y la devuelve
 * @param name Nombre de la ventana
 * @returns {Function} Función closeWindow
 */
function callCloseWindow(name) {
  return function () {
    closeWindow(name);
  }
}
