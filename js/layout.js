"use strict";
var ventanas = [];

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

  //Añadimos la imagens de cada una
  danubioAzul.image = "tienda1.png";
  laLira.image = "tienda2.png";
  musiReal.image = "tienda3.png";
  guitarCenter.image = "tienda4.png";

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
  var cuerda = new Category("Cuerda", "Guitarras y bajos Lorem ipsum dolor sit amet, consectetur adipisicing elit. Atque, aut doloribus ea est excepturi illo impedit laboriosam libero, natus perspiciatis placeat provident quidem quo, rem repellat veniam voluptas voluptatem voluptates!");
  var percusion = new Category("Percusion", "Instrumentos de percusion Lorem ipsum dolor sit amet, consectetur adipisicing elit. Atque, aut doloribus ea est excepturi illo impedit laboriosam libero, natus perspiciatis placeat provident quidem quo, rem repellat veniam voluptas voluptatem voluptates!");
  var amplificadores = new Category("Amplificadores", "Amplificadores de todos los instrumentos Lorem ipsum dolor sit amet, consectetur adipisicing elit. Atque, aut doloribus ea est excepturi illo impedit laboriosam libero, natus perspiciatis placeat provident quidem quo, rem repellat veniam voluptas voluptatem voluptates!");

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
  var fenderJB = new Bass("Fender jazzbass", 500, 4, "pasiva");
  var cortArt = new Bass("Cort artisan", 450, "activa");
  var rickenbacker = new Bass("Rickenbacker", 150, 5, "activa");
  var pearl = new Drums("Pearl reference pure", 800, "acustica");
  var mapex = new Drums("Mapex Armory", 650, "acustica");
  var yamaha = new Drums("Yamaha e-drums", 480, "electronica");
  var markbass = new Amplifier("Markbass mk210", 600, 300, "transistores");
  var marshall = new Amplifier("Marshall MG100", 300, 150, "transistores");
  var ashdown = new Amplifier("Ashdown EVO 115", 250, 150, "transistores");

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
  fenderJB.addImage("img/fender-1.png");
  fenderJB.addImage("img/fender-2.png");
  fenderJB.addImage("img/fender-3.png");
  cortArt.addImage("img/cort.png");
  cortArt.addImage("img/cort-1.png");
  cortArt.addImage("img/cort-2.png");
  rickenbacker.addImage("img/rickenbacker.png");
  rickenbacker.addImage("img/rickenbacker-1.png");
  rickenbacker.addImage("img/rickenbacker-2.png");
  pearl.addImage("img/pearl.png");
  pearl.addImage("img/pearl-1.png");
  pearl.addImage("img/pearl-2.png");
  mapex.addImage("img/mapex.png");
  mapex.addImage("img/mapex-1.png");
  mapex.addImage("img/mapex-2.png");
  mapex.addImage("img/mapex-3.png");
  yamaha.addImage("img/yamaha.png");
  yamaha.addImage("img/yamaha-1.png");
  yamaha.addImage("img/yamaha-2.png");
  markbass.addImage("img/markbass.png");
  markbass.addImage("img/markbass-1.png");
  markbass.addImage("img/markbass-2.png");
  marshall.addImage("img/marshall.png");
  marshall.addImage("img/marshall-1.png");
  marshall.addImage("img/marshall-2.png");
  ashdown.addImage("img/ashdown.png");
  ashdown.addImage("img/ashdown-1.png");
  ashdown.addImage("img/ashdown-2.png");

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
  //Borramos el de categorias si existe
  removeCategoriesMenu();

  //Si el menu no existe lo creamos
  if (document.getElementById("menuPrincipal") == null) {
    principalMenuPopulate("Tiendas");
  }
  else {//Si existe lo borramos
    removeMenu();
    principalMenuPopulate("Tiendas");
  }

  var main = document.getElementById("main"); //Cogemos el contenedor principal
  var section = document.createElement("section");  //Contenedor donde agruparemos las tiendas
  var header = document.getElementsByTagName("header")[0].firstElementChild; //Cogemos la cabecera
  var button; //Boton para mostrar cerrar las ventanas
  var col, divShop, divButtons, divPanel, src, h2, imagen, row;  //Elementos para cada tienda
  var objectShop;   //tienda

  var shops = StoreHouse.getInstance().shops;
  var shop = shops.next();
  var i = 0;

  button = document.createElement("button");
  button.setAttribute("type", "buttom");
  button.setAttribute("class", "btn btn-lg center-block new private");
  button.setAttribute("data-toggle", "modal");
  button.setAttribute("data-target", "#insertShop");
  button.addEventListener("click", modalInsertShop);
  button.innerHTML = "Insertar tienda";
  section.appendChild(button);

  while (shop.done !== true) {
    //Creamos una fila cada 3 productos
    if (i % 3 == 0) {
      row = document.createElement("div");
      row.className = "row";
      section.appendChild(row);
    }
    objectShop = shop.value.shop;
    col = document.createElement("div");
    col.className = "col-sm-4 margen";

    divPanel = document.createElement("div");
    divPanel.setAttribute("class", "panel panel-default");

    //Creamos el div de la tienda
    divShop = document.createElement("div");
    divShop.id = "t" + i;
    divShop.className = "tienda";

    //Creamos y añadimos la imagen
    src = document.createAttribute("src");
    src.value = "img/"+ objectShop.image;
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

    divPanel.appendChild(divShop);
    col.appendChild(divPanel);

    if(i != 0){ //si la tienda no es la de por defecto
      //Creamos los botones eliminar, añadir y modificar tienda
      divButtons = document.createElement("div");
      divButtons.setAttribute("class", "buttons");

      button = document.createElement("button");
      button.setAttribute("class", "btn remove private");
      button.innerHTML = "Eliminar";
      button.addEventListener("click", callRemoveShop(objectShop));
      divButtons.appendChild(button);

      button = document.createElement("button");
      button.setAttribute("class", "btn add private");
      button.setAttribute("data-toggle", "modal");
      button.setAttribute("data-target", "#addProduct");
      button.innerHTML = "Añadir Producto";
      button.addEventListener("click", callModalAddProductInShop(objectShop));
      divButtons.appendChild(button);

      button = document.createElement("button");
      button.setAttribute("class", "btn set private");
      button.setAttribute("data-toggle", "modal");
      button.setAttribute("data-target", "#setShop");
      button.innerHTML = "Modificar";
      button.addEventListener("click", callModalEditShop(objectShop));
      divButtons.appendChild(button);

      divPanel.appendChild(divButtons);
    }

    row.appendChild(col); //Añadimos la columna a la fila

    shop = shops.next();
    i++;
  }

  //Si los botones no existen los creamos
  if (document.getElementById("signUp") == null) {
    //Boton iniciar sesion
    button = document.createElement("button");
    button.innerHTML = "Iniciar Sesion";
    button.id = "signUp";
    button.className = "btn pull-right";
    button.setAttribute("data-toggle", "modal");
    button.setAttribute("data-target", "#logIn");
    button.addEventListener("click", modalLogIn);
    header.appendChild(button);

    //Boton cerrar sesion
    button = document.createElement("button");
    button.innerHTML = "Cerrar Sesion";
    button.id = "signOff";
    button.className = "btn pull-right private";
    button.addEventListener("click", logOut);
    header.appendChild(button);

    //Creamos el boton Cerrar todas las ventanas
    button = document.createElement("button");
    button.innerHTML = "Cerrar todas las ventanas";
    button.id = "cerrarTodo";
    button.className = "btn pull-right";
    button.addEventListener("click", closeAllWindows);
    header.appendChild(button);
  }

  //Añadimos la seccion al contenedor principal
  section.id = "tiendas";
  main.appendChild(section);

  main.setAttribute("class", "col-sm-12");

  //Cerramos las ventanas de productos que haya abiertas
  closeAllWindows();

  //Si estamos logueados mostramos las funciones ocultas
  if(checkCookie()){
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
  var nav = document.getElementById("menu1");
  var contenedor = nav.firstElementChild;
  var div = document.createElement("div");
  var ul, liP, li, a, span;

  //Creamos la estructura del menu principal
  ul = document.createElement("ul");
  ul.setAttribute("class", "nav nav-tabs");

  liP = document.createElement("li");
  liP.setAttribute("class", "dropdown");

  a = document.createElement("a");
  a.innerHTML = nameSection;
  a.setAttribute("id", "itemDDown");
  a.setAttribute("href", "javascript:;");
  a.setAttribute("class", "dropdown-toggle");
  a.setAttribute("data-toggle", "dropdown");

  span = document.createElement("span");
  span.setAttribute("class", "caret");

  a.appendChild(span);
  liP.appendChild(a);
  ul.appendChild(liP);
  div.appendChild(ul);
  div.id = "menuPrincipal"
  contenedor.appendChild(div);

  //Creamos el contenido desplegable
  ul = document.createElement("ul");
  ul.setAttribute("class", "dropdown-menu");

  li = document.createElement("li");
  a = document.createElement("a");
  a.innerHTML = "Tiendas";
  a.setAttribute("href", "javascript:;");
  a.addEventListener("click", initPopulate);
  li.appendChild(a);
  ul.appendChild(li);

  li = document.createElement("li");
  a = document.createElement("a");
  a.innerHTML = "Categorias";
  a.setAttribute("href", "javascript:;");
  a.addEventListener("click", categoriesPopulate);
  li.appendChild(a);
  ul.appendChild(li);

  li = document.createElement("li");
  a = document.createElement("a");
  a.innerHTML = "Productos";
  a.setAttribute("href", "javascript:;");
  a.addEventListener("click", globalProductPopulate);
  li.appendChild(a);
  ul.appendChild(li);

  liP.appendChild(ul);
}

/**
 * Esta función crea un menú con un item para cada tienda
 */
function shopsMenusPopulate(nameShop) {
  console.log("shopsMenusPopulate");

  //Creamos los elementos header, nav y ul
  var contenedor = document.getElementById("menuPrincipal").firstElementChild;
  //var ul = document.createElement("ul");
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

    //Creamos el li
    li = document.createElement("li");
    if (objectShop.name == nameShop) {
      li.setAttribute("class", "active");
    }

    //Añadimos el enlace al li y el li al contenedor
    li.appendChild(a);
    contenedor.appendChild(li);

    shop = shops.next();
  }
}

/**
 * Esta función dibuja los productos de una tienda.
 * Tambien se utiliza al filtrar los productos de una categoria.
 * El parametro que recibe varía en función desde donde sea llamada
 * @param data Puede ser de dos tipos: objeto tienda o un objeto categoria
 */
function shopPopulate(data) {
  console.log("shopPopulate");
  //Cerramos las ventanas de productos que haya abiertas
  closeAllWindows();

  var main = document.getElementById("main"); //Cogemos el main
  var divProducts = document.createElement("section");  //Contenedor donde agruparemos los productos
  var row; //Div con la clase row para agrupar los productos y necesaria para bootstrap

  //Si data es un objeto Shop trabajamos con un iterador
  if (data instanceof Shop) {
    removeCategoriesMenu(); //Borramos el menu de las categorias si existe
    clearMain(); //Borramos el contenedor principal si existe
    removeShopsMenu();

    var products = StoreHouse.getInstance().getShopProducts(data); //Cogemos los productos
    var product = products.next();
    var i = 0;

    while (product.done !== true) {
      //Creamos una fila cada 3 productos
      if (i % 3 == 0) {
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
      if (i % 3 == 0) {
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

  //Si estamos logueados mostramos las funciones ocultas
  if(checkCookie()){
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
  var main = document.getElementById("main");
  var contenedor = document.getElementById("contain");
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
 * Esta función muestra la información de un producto en una ventana nueva
 * @param index Numero del id del elemento html
 * @param product Objeto producto.
 */
function productShopPopulate(index, product) {
  console.log("productShopPopulate");

  //Cogemos los botones
  var button = document.getElementById("btnShow" + index);
  var button2 = document.getElementById("btnHide" + index);
  var i, description, divProduct;

  //Cambiamos los displays para cambiar los botones
  button.style.display = "none";
  button2.style.display = "block";

  //Creamos la nueva ventana y la añadimos al array
  ventanas.push(window.open("producto.html", product.name, "toolbar=no,scrollbars=no,resizable=no,top=200,left=500,width=500,height=500"));

  //Escribimos la información en la ventana
  i = ventanas.length - 1;
  ventanas[i].onload = function () {
    var main = ventanas[i].document.body.getElementsByTagName("main")[0];
    main.appendChild(productCarousel(product));
    main.appendChild(getProductInfo(product));
  }

  //Añadimos un evento que se ejecuta justo antes de cerrar la ventana
  ventanas[i].addEventListener("beforeunload", callHideProductShopPopulate(index, product.name));

  document.getElementById("cerrarTodo").style.display = "block";
}

/**
 * Esta función cambia los displays de los botones al cerrar una ventana
 * @param index Numero del id del elemento html.
 */
function hideProductShopPopulate(index, name) {
  console.log("hideProductShopPopulate");

  //Cogemos los botones
  var button = document.getElementById("btnShow" + index);
  var button2 = document.getElementById("btnHide" + index);
  var cont = 0;
  var position;

  //Cambiamos los displays para mostrar un boton y ocultar otro
  button.style.display = "block";
  button2.style.display = "none";

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
    document.getElementById("cerrarTodo").style.display = "none";
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
  var main = document.getElementById("main");
  var section = document.createElement("section");
  var div, h4, text, strong, button, divButtons;

  var storeHouse = StoreHouse.getInstance(); //Instancia del alamacen
  var categories = storeHouse.categories;
  var category = categories.next();

  button = document.createElement("button");
  button.setAttribute("type", "buttom");
  button.setAttribute("class", "btn btn-lg center-block new private");
  button.setAttribute("data-toggle", "modal");
  button.setAttribute("data-target", "#insertProduct");
  button.addEventListener("click", modalInsertProduct);
  button.innerHTML = "Insertar producto";
  section.appendChild(button);

  while (category.done !== true) {
    div = document.createElement("div");
    h4 = document.createElement("h4");
    h4.innerHTML = category.value.category.title;
    h4.setAttribute("class", "category");
    div.appendChild(h4);

    //Recorremos los productos de la categoria
    for (let i = 0; i < category.value.products.length; i++) {
      text = document.createElement("p");
      strong = document.createElement("strong");
      strong.innerHTML = ("Stock: " + storeHouse.getGlobalStock(category.value.products[i].serialNumber));//Cogemos el stock
      text.appendChild(strong);
      div.appendChild(getProductInfo(category.value.products[i]));
      div.lastElementChild.appendChild(text);

      divButtons = document.createElement("div");
      divButtons.setAttribute("class", "btns");
      div.lastElementChild.appendChild(divButtons);

      button = document.createElement("button");
      button.setAttribute("class", "btn remove private");
      button.innerHTML = "Eliminar";
      button.addEventListener("click", callRemoveProduct(category.value.products[i]));
      divButtons.appendChild(button);

      button = document.createElement("button");
      button.setAttribute("class", "btn set private");
      button.setAttribute("data-toggle", "modal");
      button.setAttribute("data-target", "#setProduct");
      button.innerHTML = "Modificar";
      button.addEventListener("click", callModalEditProduct(category.value.products[i]));
      divButtons.appendChild(button);
    }
    div.setAttribute("class", "infoGlobal");
    section.appendChild(div);

    category = categories.next();
  }

  main.appendChild(section);

  //Si estamos logueados mostramos las funciones ocultas
  if(checkCookie()){
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
  var main = document.getElementById("main");
  var section = document.createElement("section");
  var divMargen, divCategory, divButtons, divPanel, row, h3, p, button;
  var i = 0;

  var categories = StoreHouse.getInstance().categories;
  var category = categories.next();

  main.className = "col-md-12"; //Cambiamos la clase del main para hacerlo mas ancho";

  button = document.createElement("button");
  button.setAttribute("type", "button");
  button.setAttribute("class", "btn btn-lg center-block new private");
  button.setAttribute("data-toggle", "modal");
  button.setAttribute("data-target", "#insertCategory");
  button.addEventListener("click", modalInsertCategory);
  button.innerHTML = "Insertar categoria";
  section.appendChild(button);

  while (category.done !== true) {
    //Creamos una fila cada 3 categorias
    if (i % 3 == 0) {
      row = document.createElement("div");
      row.className = "row";
      section.appendChild(row);
    }

    divMargen = document.createElement("div");
    divMargen.className = "col-sm-3 col-md-4  margen";
    row.appendChild(divMargen);

    divPanel = document.createElement("div");
    divPanel.setAttribute("class", "panel panel-default");
    divMargen.appendChild(divPanel);

    divCategory = document.createElement("div");
    divCategory.id = "c" + (i + 1);
    divCategory.className = " category";
    divPanel.appendChild(divCategory);

    //Creamos y añadimos un titulo
    h3 = document.createElement("h3");
    h3.className = "text-center";
    h3.innerHTML = category.value.category.title;
    divCategory.appendChild(h3);

    //Creamos y añadimos una descripcion
    p = document.createElement("p");
    p.innerHTML = category.value.category.description;
    divCategory.appendChild(p);

    if(i != 0){ //Si la categoria no es la de por defecto
      //Creamos los botones de modificar y eliminar
      divButtons = document.createElement("div");
      divButtons.setAttribute("class", "buttons");
      divPanel.appendChild(divButtons);

      button = document.createElement("button");
      button.setAttribute("class", "btn remove private");
      button.innerHTML = "Eliminar";
      button.addEventListener("click", callRemoveCategory(category.value.category));
      divButtons.appendChild(button);

      button = document.createElement("button");
      button.setAttribute("class", "btn set private");
      button.setAttribute("data-toggle", "modal");
      button.setAttribute("data-target", "#setCategory");
      button.innerHTML = "Modificar";
      button.addEventListener("click", callModalEditCategory(category.value.category));
      divButtons.appendChild(button);
    }

    category = categories.next();
    i++;
  }

  main.appendChild(section);

  //Si estamos logueados mostramos las funciones ocultas
  if(checkCookie()){
    showButtons();
  }
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
function callProductsCategoryShopPopulate(category) {
  return function () {
    productCategoryShopPopulate(category);
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
  var main = document.getElementById("main"); //Cogemos el div principal

  while (main.hasChildNodes()) {
    main.removeChild(main.firstChild);
  }
}

/**
 * Esta funcion elimina el menu principal
 */
function removeMenu() {
  var nav = document.getElementById("menu1");
  var menu = nav.firstElementChild;

  menu.removeChild(menu.lastElementChild);
}

/**
 * Esta funcion elimina el menu con los items de las tiendas
 */
function removeShopsMenu() {
  console.log("removeShopsMenu");

  var menu = document.getElementById("menuPrincipal").firstElementChild;
  var item = menu.firstElementChild;
  var sibling = item.nextElementSibling;

  while (sibling instanceof Node) {
    menu.removeChild(sibling);
    sibling = item.nextElementSibling;
  }
}

/**
 * Esta funcion elimina el menu de categorias si existe
 */
function removeCategoriesMenu() {
  var contenedor = document.getElementById("contain");
  var aside = document.getElementsByTagName("aside")[0];

  if (aside instanceof Node) {   //Comprobamos si ya existia
    contenedor.removeChild(aside);    //Si existe lo borramos
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
 * @returns {HTMLDiv} Elemento div
 */
function getProductInfo(product) {
  var text;
  var strong;
  var div = document.createElement("div");

  text = document.createElement("p");
  strong = document.createElement("strong");
  strong.innerHTML = "Nombre: ";
  text.appendChild(strong);
  text.appendChild(document.createTextNode(product.name));
  text.setAttribute("class", "panel-heading");
  div.appendChild(text);

  text = document.createElement("p");
  strong = document.createElement("strong");
  strong.innerHTML = "Descripcion: ";
  text.appendChild(strong);
  text.appendChild(document.createTextNode(product.description));
  div.appendChild(text);

  //Dependiendo del tipo de producto recogemos una informacion u otra
  if (product instanceof Bass) {
    text = document.createElement("p");
    strong = document.createElement("strong");
    strong.innerHTML = "Cuerdas: ";
    text.appendChild(strong);
    text.appendChild(document.createTextNode(product.strings));
    div.appendChild(text);

    text = document.createElement("p");
    strong = document.createElement("strong");
    strong.innerHTML = "Electrónica: ";
    text.appendChild(strong);
    text.appendChild(document.createTextNode(product.electronic));
    div.appendChild(text);
  }
  else if (product instanceof Drums) {
    text = document.createElement("p");
    strong = document.createElement("strong");
    strong.innerHTML = "Tipo: ";
    text.appendChild(strong);
    text.appendChild(document.createTextNode(product.type));
    div.appendChild(text);

    text = document.createElement("p");
    strong = document.createElement("strong");
    strong.innerHTML = "Medidas de los toms: ";
    text.appendChild(strong);
    text.appendChild(document.createTextNode(product.toms.toString()));
    div.appendChild(text);
  }
  else {
    text = document.createElement("p");
    strong = document.createElement("strong");
    strong.innerHTML = "Potencia: ";
    text.appendChild(strong);
    text.appendChild(document.createTextNode(product.watts + " watts."));
    div.appendChild(text);

    text = document.createElement("p");
    strong = document.createElement("strong");
    strong.innerHTML = "Tipo: ";
    text.appendChild(strong);
    text.appendChild(document.createTextNode(product.type));
    div.appendChild(text);
  }

  text = document.createElement("p");
  strong = document.createElement("strong");
  strong.innerHTML = "Precio: ";
  text.appendChild(strong);
  text.appendChild(document.createTextNode(product.price + "€"));
  div.appendChild(text);

  text = document.createElement("p");
  strong = document.createElement("strong");
  strong.innerHTML = "IVA: ";
  text.appendChild(strong);
  text.appendChild(document.createTextNode(product.tax + "%"));
  div.appendChild(text);

  div.className = "panel panel-default productInfo";
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
  divMargen.className = "col-sm-3 col-md-4  margen";

  //Creamos el div para el producto
  divProduct = document.createElement("div");
  divProduct.id = "p" + cont;
  divProduct.className = "panel panel-default producto";
  divMargen.appendChild(divProduct);

  //Creamos y añadimos un titulo
  h3 = document.createElement("h3");
  h3.className = "text-center";
  h3.innerHTML = product.name;
  divProduct.appendChild(h3);

  //Creamos y añadimos la imagen
  divImg = document.createElement("div");
  img = document.createElement("img");
  img.setAttribute("src", product.images[0]);
  img.className = "center-block img-responsive imgProducto";
  divImg.appendChild(img);
  divImg.className = "divImg";
  divProduct.appendChild(divImg);

  //Creamos y añadimos un boton
  button = document.createElement("button");
  button.innerHTML = "Mostrar información";
  button.id = "btnShow" + cont;
  button.className = "btn center-block";
  button.addEventListener("click", callProductShopPopulate(cont, product));
  divProduct.appendChild(button);

  //Creamos y añadimos un segundo boton
  button2 = document.createElement("button");
  button2.innerHTML = "Ocultar información";
  button2.id = "btnHide" + cont;
  button2.className = "btn center-block hideBtn";
  button2.addEventListener("click", callCloseWindow(product.name));
  divProduct.appendChild(button2);

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
    li.setAttribute("data-target", "#myCarousel");
    li.setAttribute("data-slide-to", i);
    ol.appendChild(li);

    //Creamos un div que contendra a la imagen
    div = document.createElement("div");
    if (i == 0) { //Al primero le añadimos la clase active
      div.setAttribute("class", "item active");
      li.setAttribute("class", "active");
    }
    else {
      div.setAttribute("class", "item");
    }
    img = document.createElement("img");
    img.setAttribute("src", product.images[i]);
    img.setAttribute("style", "width:100%;");

    div.appendChild(img);
    carousel.appendChild(div);
  }

  carousel.setAttribute("class", "carousel-inner");
  container.appendChild(carousel);

  //Creamos los enlaces para navegar por las imágenes
  a = document.createElement("a");
  a.setAttribute("class", "left carousel-control");
  a.setAttribute("href", "#myCarousel");
  a.setAttribute("data-slide", "prev");

  span = document.createElement("span");
  span.setAttribute("class", "glyphicon glyphicon-chevron-left");
  a.appendChild(span);
  container.appendChild(a);

  a = document.createElement("a");
  a.setAttribute("class", "right carousel-control");
  a.setAttribute("href", "#myCarousel");
  a.setAttribute("data-slide", "next");

  span = document.createElement("span");
  span.setAttribute("class", "glyphicon glyphicon-chevron-right");
  a.appendChild(span);
  container.appendChild(a);

  container.setAttribute("class", "carousel slide");
  container.setAttribute("data-ride", "carousel");
  container.id = "myCarousel";
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

  document.getElementById("cerrarTodo").style.display = "none";

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

window.onload = init;
