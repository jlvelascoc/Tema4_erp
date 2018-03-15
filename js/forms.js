"use strict";

/**
 * Esta función asigna un evento onclick al boton guardar del modal insertCategory
 */
function modalInsertCategory() {
  //Asignamos el evento insertCategory al boton guardar
  $("#insertCategory").find("button.btn-primary").click(insertCategory);
}

/**
 * Esta función inserta una categoria en el almacen
 */
function insertCategory() {
  var items = $("#insertCategory").find(".form-control"); //Recojo el valor de los inputs
  var errors = $("#insertCategory").find(".error"); //Cojo la referencias de los parrafos
  var validated = true;

  clearParagraph("insertCategory"); //Borramos los mensajes de los parrafos

  //Validamos los campos
  if ($(items[0]).val() == "") {
    $(errors[0]).text("El campo nombre no puede ser vacío");
    validated = false;
  }

  if ($(items[1]).val() == "") {
    $(errors[1]).text("El campo descripción no puede ser vacío");
    validated = false;
  }

  if (validated) {  //Si esta todo correcto añadimos la categoria
    var category = new Category(generateId(), items[0].value, items[1].value); //Creo un objeto categoria

    StoreHouse.getInstance().addCategory(category); //Añado la categoria
    insertCategoryDB(category); //Añadimos un registro a la base datos

    $("#insertCategory").find(".close").click(); //Pulsamos el boton x para cerrar el modal

    clearModal("insertCategory"); //Limpiamos los campos
    categoriesPopulate(); //Volvemos a mostrar las categorias
  }
}

/**
 * Esta función carga los datos de la categoria en el modal.
 * Tambien signa un evento onclick al boton guardar del modal editCategory
 * @param category Objeto categoria
 */
function modalEditCategory(category) {
  var items = $("#setCategory").find(".form-control");  //Cogemos los inputs

  //Cargamos los valores actuales de la categoria
  $(items[0]).val(category.id);
  $(items[1]).val(category.title);
  $(items[2]).val(category.description);

  //Asignamos al evento onclick del boton guardar la funcion que guarda los cambios
  $("#setCategory").find("button.btn-primary").click(callEditCategory(category));
}

/**
 * Esta función edita la información de una categoria y la guarda en el almacen
 * @param category Objeto categoria
 */
function editCategory(category) {
  var items = $("#setCategory").find(".form-control"); //Recojo el valor de los inputs
  var errors = $("#setCategory").find(".error"); //Cojo la referencias de los parrafos
  var validated = true;

  clearParagraph("setCategory"); //Borramos los mensajes de los parrafos

  //Validamos los campos
  if ($(items[1]).val()== "") {
    $(errors[0]).text("El campo nombre no puede ser vacío");
    validated = false;
  }

  if ($(items[2]).val() == "") {
    $(errors[1]).text("El campo descripción no puede ser vacío");
    validated = false;
  }

  if (validated) { //Si esta correcto modificamos la categoria
    console.log($(items[1]).val());
    category.title = $(items[1]).val();
    category.description = $(items[2]).val();
    editCategoryDB(category); //Actualizamos el registro en la base de datos

    $("#setCategory").find(".close").click();

    categoriesPopulate();
  }
}

/**
 * Esta función elimina una categoria del almacen
 * @param category Objeto categoria
 */
function removeCategory(category) {
  StoreHouse.getInstance().removeCategory(category);
  removeCategoryDB(category); //Eliminamos el registro de la base datos
  categoriesPopulate();
}

/**
 * Esta función asigna un evento onclick al boton guardar del modal insertShop
 */
function modalInsertShop() {
  //Asignamos el evento insertShop al boton guardar
  $("#insertShop").find(".btn-primary").click(insertShop);
  getLocation("addShopMap"); //Dibujamos el mapa en el modal
}

/**
 * Esta función inserta una categoria en el almacen
 */
function insertShop() {
  var items = $("#insertShop").find(".form-control"); //Recojo el valor de los inputs
  var errors = $("#insertShop").find(".error"); //Cojo la referencias de los parrafos
  var coords = $("#insertShop").find("[name=coords]").val().split(",");
  var validated = true;

  clearParagraph("insertShop"); //Borramos los mensajes de los parrafos

  //Hacemos las validaciones
  if (items[0].value == "") {
    errors[0].innerHTML = "El campo nombre no puede ser vacío";
    validated = false;
  }

  if (items[2].value != "" && !(/^\d{9}$/.test(items[2].value))) {
    errors[2].innerHTML = "El campo telefono debe tener estar formado por 9 digitos";
    validated = false;
  }

  if (items[3].value != "" && !(/^\w{1,}.\w{3,4}$/.test(items[3].value))) {
    errors[3].innerHTML = "El campo imagen debe tener el siguiente formato: imagen.png";
    validated = false;
  }

  if (validated) {  //Si esta correcto creamos el obejto y lo añadimos
    var shop = new Shop(items[0].value, generateCif()); //Creo un objeto shop
    var coords = new Coords(coords[0], coords[1]);
    shop.coords = coords;
    shop.address = items[1].value;
    shop.phone = items[2].value;
    shop.image = items[3].value;

    StoreHouse.getInstance().addShop(shop); //Añado la tienda
    insertShopDB(shop); //Inserto la tienda en la base de datos

    $("#insertShop").find(".close").click(); //Pulsamos el boton x para cerrar el modal

    clearModal("insertShop"); //Limpiamos los campos del modal
    initPopulate(); //Volvemos a mostrar las tiendas
  }
}

/**
 * Esta función carga los datos de la categoria en el modal.
 * Tambien signa un evento onclick al boton guardar del modal editCategory
 * @param shop Objeto Shop
 */
function modalEditShop(shop) {
  var items = $("#setShop").find(".form-control");  //Cogemos los inputs
  var coords = $("#setShop").find("[name=setCoords]")[0];

  //Cargamos los valores actuales de la tienda
  items[0].value = shop.name;
  items[1].value = shop.cif;
  items[2].value = shop.address;
  items[3].value = shop.phone;
  items[4].value = shop.image;
  coords.value = shop.coords.latitude + "," + shop.coords.longitude;

  //Asignamos al evento onclick del boton guardar la funcion que guarda los cambios
  $("#setShop").find(".btn-primary").click(callEditShop(shop));
  getLocation("setShopMap"); //Dibujamos el mapa en el  modal
}

/**
 * Esta función edita la informacion de una tienda
 * @param shop Objeto Shop
 */
function editShop(shop) {
  var items = $("#setShop").find(".form-control");  //Cogemos los campos
  var errors = $("#setShop").find(".error"); //Cojo la referencias de los parrafos
  var coords = $("#setShop").find("[name=setCoords]").val().split(",");
  var validated = true;

  clearParagraph("setShop"); //Borramos los mensajes de los parrafos

  //Hacemos las validaciones
  if (items[0].value == "") {
    errors[0].innerHTML = "El campo nombre no puede ser vacío";
    validated = false;
  }

  if (items[3].value != "" && !(/^\d{9}$/.test(items[3].value))) {
    errors[3].innerHTML = "El campo telefono debe tener estar formado por 9 digitos";
    validated = false;
  }

  if (items[4].value != "" && !(/^\w{1,}.\w{3,4}$/.test(items[4].value))) {
    errors[4].innerHTML = "El campo imagen debe tener el siguiente formato: imagen.png";
    validated = false;
  }

  if (validated) {  //si todo esta correcto modificamos los datos
    var coords = new Coords(coords[0], coords[1]);
    shop.coords = coords;
    shop.name = items[0].value;
    shop.address = items[2].value;
    shop.phone = items[3].value;
    shop.image = items[4].value;

    editShopDB(shop); //Modificamos el registro en la base datos

    $("#setShop").find(".close").click(); //Pulsamos el boton x para cerrar el modal
    initPopulate();
  }
}

/**
 * Esta funcion elimina una tienda del almacen
 * @param shop Objeto shop
 */
function removeShop(shop) {
  StoreHouse.getInstance().removeShop(shop);
  removeShopDB(shop); //Eliminamos el registro de la base datos
  initPopulate();
}

/**
 * Esta funcion crea los campos del formulario el funcion del tipo de producto que se vaya a insertar.
 * Tambien asigna un evento onclick al boton guardar del modal insertProduct
 */
function modalInsertProduct() {
  var contenedor = $("#insertProduct").find("form")[0]; //Cogemos el formulario
  var type = $("#tipos").val();  //Cogemos el valor del select para saber el tipo de producto
  var select = $("#categorias")[0];  //Cogemos el select de categorias
  var groups =  $("#insertProduct").find(".form-group"); //Cogemos los grupos ya creados para saber donde tenemos que insertar los nuevos
  var group, label, div, input, option, p;

  if (contenedor.children.length > 6) { //Si el formulario ha sido alterado lo restauramos
    restoreModal("insertProduct");
  }

  switch (type) { //Segun el tipo creamos los campos necesarios
    case "Bass":

      group = document.createElement("div");
      $(group).attr("class", "form-group");

      label = document.createElement("label");
      $(label).attr({
        "class": "col-md-12",
        "for": "strings"
      });
      $(label).text("Cuerdas*");
      $(group).append(label);

      div = document.createElement("div");
      $(div).attr("class", "col-md-12");

      input = document.createElement("input");
      $(input).attr({
        "type": "text",
        "name": "strings",
        "id": "strings",
        "class": "form-control",
        "placeholder": "4, 5 o 6"
      });
      $(div).append(input);

      p = document.createElement("p");
      $(p).attr("class", "col-md-12 error");
      $(div).append(p);

      $(group).append(div);
      $("#imgNP").parent().parent().before(group);

      group = document.createElement("div");
      $(group).attr("class", "form-group");

      label = document.createElement("label");
      $(label).attr({
        "class": "col-md-12",
        "for": "electronic"
      });
      $(label).text("Electronica*");
      $(group).append(label);

      div = document.createElement("div");
      $(div).attr("class", "col-md-12");

      input = document.createElement("input");
      $(input).attr({
        "type": "text",
        "name": "electronic",
        "id": "electronic",
        "class": "form-control",
        "placeholder": "pasiva o activa"
      });
      $(div).append(input);

      p = document.createElement("p");
      $(p).attr("class", "col-md-12 error");
      $(div).append(p);

      $(group).append(div);
      $("#imgNP").parent().parent().before(group);
      break;

    case "Drums":
      group = document.createElement("div");
      $(group).attr("class", "form-group");

      label = document.createElement("label");
      $(label).attr({
        "class": "col-md-12",
        "for": "type"
      });
      $(label).text("Tipo*");
      $(group).append(label);

      div = document.createElement("div");
      $(div).attr("class", "col-md-12");

      input = document.createElement("input");
      $(input).attr({
        "type": "text",
        "name": "type",
        "id": "type",
        "class": "form-control",
        "placeholder": "acustica o electronica"
      });
      $(div).append(input);

      p = document.createElement("p");
      $(p).attr("class", "col-md-12 error");
      $(div).append(p);

      $(group).append(div);
      $("#imgNP").parent().parent().before(group);

      group = document.createElement("div");
      $(group).attr("class", "form-group");

      label = document.createElement("label");
      $(label).attr({
        "class": "col-md-12",
        "for": "toms"
      });
      $(label).text("Medidas de los toms");
      $(group).append(label);

      div = document.createElement("div");
      $(div).attr("class", "col-md-12");

      input = document.createElement("input");
      $(input).attr({
        "type": "text",
        "name": "toms",
        "id": "toms",
        "class": "form-control",
        "placeholder": "Ej: 22x18,12x08,13x09,16x16,14x5.5"
      });
      $(div).append(input);

      p = document.createElement("p");
      $(p).attr("class", "col-md-12 error");
      $(div).append(p);

      $(group).append(div);
      $("#imgNP").parent().parent().before(group);
      break;

    case "Amplifier":
      group = document.createElement("div");
      $(group).attr("class", "form-group");

      label = document.createElement("label");
      $(label).attr({
        "class": "col-md-12",
        "for": "watts"
      });
      $(label).text("Potencia*");
      $(group).append(label);

      div = document.createElement("div");
      $(div).attr("class", "col-md-12");

      input = document.createElement("input");
      $(input).attr({
        "type": "text",
        "name": "watts",
        "id": "watts",
        "class": "form-control",
        "placeholder": "Ej: 150"
      });
      $(div).append(input);

      p = document.createElement("p");
      $(p).attr("class", "col-md-12 error");
      $(div).append(p);

      $(group).append(div);
      $("#imgNP").parent().parent().before(group);

      group = document.createElement("div");
      $(group).attr("class", "form-group");

      label = document.createElement("label");
      $(label).attr({
        "class": "col-md-12",
        "for": "type"
      });
      $(label).text("Tipo*");
      $(group).append(label);

      div = document.createElement("div");
      $(div).attr("class", "col-md-12");

      input = document.createElement("input");
      $(input).attr({
        "type": "text",
        "name": "type",
        "id": "type",
        "class": "form-control",
        "placeholder": "transistores o valvulas"
      });
      $(div).append(input);

      p = document.createElement("p");
      $(p).attr("class", "col-md-12 error");
      $(div).append(p);

      $(group).append(div);
      $("#imgNP").parent().parent().before(group);
      break;
  }

  if (select.children.length == 0) { //Si el campo select está vacio cargamos las categorias
    var categories = StoreHouse.getInstance().categories;
    var category = categories.next();
    var objectCategory;

    while (category.done !== true) {
      objectCategory = category.value.category;
      $(select).append("<option value='"+objectCategory.title+"'>"+objectCategory.title+"</option>");

      category = categories.next();
    }
  }
  $("#insertProduct").find(".btn-primary").click(insertProduct); //Asignamos el evento onclick al boton guardar
}

/**
 * Esta funcion inserta un producto en el alamacen
 */
function insertProduct() {
  var items = $("#insertProduct").find(".form-control");  //Cogemos los cmapos
  var errors = $("#insertProduct").find(".error"); //Cojo la referencias de los parrafos
  var validated = true;

  clearParagraph("insertProduct"); //Borramos los mensajes de los parrafos

  //Hacemos las validaciones
  if (items[2].value == "") {
    errors[0].innerHTML = "El campo nombre no puede ser vacío";
    validated = false;
  }

  if (items[4].value == "") {
    errors[1].innerHTML = "El campo precio no puede ser vacío";
    validated = false;
  }

  if (items[4].value != "" && !(/^\d{1,5}(.\d{1,2}){0,1}$/.test(items[4].value))) {
    errors[1].innerHTML = "El campo precio debe tener el siguiente formato: 125.90";
    validated = false;
  }

  if (items[7].value == ""){
    errors[4].innerHTML = "El campo imagenes no puede ser vacío";
    validated = false;
  }
  else{
    var images = items[7].value.split(",");
  }

  switch (items[0].value) { //Segun el tipo de producto hacemos las validaciones
    case "Bass":
      if (items[5].value != "" && !(/^[4|5|6]$/.test(items[5].value))) {
        errors[2].innerHTML = "El campo cuerdas solo acepta como valor 4, 5 o 6";
        validated = false;
      }

      if (items[6].value != "" && !(/^(pasiva|activa)$/.test(items[6].value))) {
        errors[3].innerHTML = "El campo electronica solo acepta como valor pasiva o activa";
        validated = false;
      }

      if(validated) {
        var product = new Bass(generateSerialNumber(), items[2].value, items[4].value, items[5].value, items[6].value);
      }
      break;

    case "Drums":
      if (items[5].value != "" && !(/^(acustica|electronica)$/.test(items[5].value))) {
        errors[2].innerHTML = "El campo tipo solo acepta como valor acustica o electronica";
        validated = false;
      }

      if(validated) {
        var product = new Drums(generateSerialNumber(), items[2].value, items[4].value, items[5].value, items[6].value);
      }
      break;

    case "Amplifier":
      if (items[5].value != "" && !(/^\d{2,4}$/.test(items[5].value))) {
        errors[2].innerHTML = "El campo potencia solo acepta numeros de mas de dos cifras";
        validated = false;
      }

      if (items[6].value != "" && !(/^(transistores|valvulas)$/.test(items[6].value))) {
        errors[3].innerHTML = "El campo tipo solo acepta como valor transistores o valvulas";
        validated = false;
      }

      if(validated) {
        var product = new Amplifier(generateSerialNumber(), items[2].value, items[4].value, items[5].value, items[6].value);
      }
      break;
  }

  if(validated) { //Si esta correcto insertamos el producto
    product.description = items[3].value;

    for (let i = 0; i < images.length; i++) { //Añadimos las imagenes
      product.addImage(images[i]);
    }

    var objectCategory = StoreHouse.getInstance().getCategoryByTitle(items[1].value);
    StoreHouse.getInstance().addProduct(product, objectCategory);
    insertProductDB(product, objectCategory); //Insetamos el registro en la base da datos

    $("#insertProduct").find(".close").click(); //Pulsamos el boton x para cerrar el modal
    clearModal("insertProduct");  //Liampiamos los campos del modal
    globalProductPopulate();
  }
}

/**
 * Esta funcion carga los datos y los campos segun el producto
 * Tambien asigna un evento onclick al boton guardar del modal setProduct
 * @param product Objeto Product
 */
function modalEditProduct(product, category) {
  var contenedor = $("#setProduct").find("form")[0]; //Cogemos el formulario
  var items = $("#setProduct").find(".form-control");  //Cogemos los campos
  var groups = $("#setProduct").find(".form-group"); //Cogemos los grupos para saber donde tenemos que insertar los nuevos
  var group, div, input, p;
console.log(items);
  if (contenedor.children.length > 5) { //Si el formulario ha sido alterado lo restauramos
    restoreModal("setProduct");
  }

  switch (true) { //Cargamos la informacion segun el tipo de producto
    case (product instanceof Bass):
      group = $("<div class='form-group'></div>");
      group.append("<label class='col-md-12' for='strings'>Cuerdas*</label>");

      div = $("<div class='col-md-12'></div>");
      div.append("<input type='text' name='strings' id='strings' class='form-control' value='"+product.strings+"'>");
      div.append("<p class='col-md-12 error'></p>");

      group.append(div);
      $("#imgP").parent().parent().before(group);

      group = $("<div class='form-group'></div>");
      group.append("<label class='col-md-12' for='electronic'>Electronica*</label>");

      div = $("<div class='col-md-12'></div>");
      div.append("<input type='text' name='electronic' id='electronic' class='form-control' value='"+product.electronic+"'>");
      div.append("<p class='col-md-12 error'></p>");

      group.append(div);
      $("#imgP").parent().parent().before(group);
      break;

    case (product instanceof Drums):
      group = $("<div class='form-group'></div>");
      group.append("<label class='col-md-12' for='type'>Tipo*</label>");

      div = $("<div class='col-md-12'></div>");
      div.append("<input type='text' name='type' id='type' class='form-control' value='"+product.type+"'>");
      div.append("<p class='col-md-12 error'></p>");

      group.append(div);
      $("#imgP").parent().parent().before(group);

      group = $("<div class='form-group'></div>");
      group.append("<label class='col-md-12' for='toms'>Medidas de los toms</label>");
      div.append("<p class='col-md-12 error'></p>");

      div = $("<div class='col-md-12'></div>");
      div.append("<input type='text' name='toms' id='toms' class='form-control' value='"+product.toms+"'>");
      div.append("<p class='col-md-12 error'></p>");

      group.append(div);
      $("#imgP").parent().parent().before(group);
      break;

    case (product instanceof Amplifier):
      group = $("<div class='form-group'></div>");
      group.append("<label class='col-md-12' for='watts'>Potencia*</label>");

      div = $("<div class='col-md-12'></div>");
      div.append("<input type='text' name='watts' id='watts' class='form-control' value='"+product.watts+"'>");
      div.append("<p class='col-md-12 error'></p>");

      group.append(div);
      $("#imgP").parent().parent().before(group);

      group = $("<div class='form-group'></div>");
      group.append("<label class='col-md-12' for='type'>Electrónica*</label>");

      div = $("<div class='col-md-12'></div>");
      div.append("<input type='text' name='type' id='type' class='form-control' value='"+product.type+"'>");
      div.append("<p class='col-md-12 error'></p>");

      group.append(div);
      $("#imgP").parent().parent().before(group);
      break;
  }
  //Cargamos la informacion comun a todos los productos
  $(items[0]).val(product.serialNumber);
  $(items[1]).val(product.name);
  $(items[2]).text(product.description);
  $(items[3]).val(product.price);
  console.log();
  $(items[4]).val(product.images.toString());

  $("#setProduct").find(".btn-primary").click(callEditProduct(product, category)); //Asignamos el evento al boton guardar
}

/**
 * Esta función edita la informacion de un producto en el almacen
 * @param product Objeto Product
 */
function editProduct(product, category) {
  var items = $("#setProduct").find(".form-control"); //Cogemos los campos
  var errors = $("#setProduct").find(".error"); //Cojo la referencias de los parrafos
  var validated = true;
  var images;
console.log(items);
  clearParagraph("setProduct"); //Borramos los mensajes de los parrafos

  //Hacemos las validaciones comunes a todos los productos
  if (items[1].value == "") {
    errors[0].innerHTML = "El campo nombre no puede ser vacío";
    validated = false;
  }

  if (items[3].value == "") {
    errors[1].innerHTML = "El campo precio no puede ser vacío";
    validated = false;
  }

  if (items[3].value != "" && !(/^\d{1,5}(.\d{1,2}){0,1}$/.test(items[3].value))) {
    errors[1].innerHTML = "El campo precio debe tener el siguiente formato: 125.90";
    validated = false;
  }

  if (items[6].value == ""){
    errors[4].innerHTML = "El campo imagenes no puede ser vacío";
    validated = false;
  }
  else{
    var images = items[6].value.split(",");
  }

  switch (true) { //Hacemos las validaciones expecificas de cada tipo de producto
    case (product instanceof Bass):
      if (items[4].value != "" && !(/^[4|5|6]$/.test(items[4].value))) {
        errors[2].innerHTML = "El campo cuerdas solo acepta como valor 4, 5 o 6";
        validated = false;
      }
console.log(items[5]);
      if (items[5].value != "" && !(/^(pasiva|activa)$/.test(items[5].value))) {
        errors[3].innerHTML = "El campo electronica solo acepta como valor pasiva o activa";
        validated = false;
      }

      if(validated) {
        product.strings = items[4].value;
        product.electronic = items[5].value;
      }
      break;

    case (product instanceof Drums):
      if (items[4].value != "" && !(/^(acustica|electronica)$/.test(items[4].value))) {
        errors[2].innerHTML = "El campo tipo solo acepta como valor acustica o electronica";
        validated = false;
      }

      if(validated) {
        product.type = items[4].value;
        product.toms = items[5].value;
      }
      break;

    case (product instanceof Amplifier):
      if (items[4].value != "" && !(/^\d{2,4}$/.test(items[4].value))) {
        errors[2].innerHTML = "El campo potencia solo acepta numeros de mas de dos cifras";
        validated = false;
      }

      if (items[5].value != "" && !(/^(transistores|valvulas)$/.test(items[5].value))) {
        errors[3].innerHTML = "El campo tipo solo acepta como valor transistores o valvulas";
        validated = false;
      }

      if(validated) {
        product.watts = items[4].value;
        product.electronic = items[5].value;
      }
      break;
  }

  if(validated) { //Si esta correcto editamos la informacion del producto
    product.name = items[1].value;
    product.description = items[2].value;
    product.price = items[3].value;

    product.removeAllImages();
    for (let i = 0; i < images.length; i++) {
      product.addImage(images[i]);
    }
    editProductDB(product, category); //Modificamos el registro  en la base de datos

    $("#setProduct").find(".close").click();  //HAcemos click en el boton x para cerrar el modal
    globalProductPopulate();
  }
}

/**
 * Esta funcion elimina un producto del almacen
 * @param product Objeto Product
 */
function removeProduct(product, category) {
  StoreHouse.getInstance().removeProduct(product);
  removeProductDB(product, category); //Borramos el registro de la base de datos
  globalProductPopulate();
}

/**
 * Esta funcion carga todos los productos disponibles en un select
 * Tambien asigna un evento al boton guardar
 * @param shop Objeto Shop
 */
function modalAddProductInShop(shop) {
  var select = $("#addProduct").find("select")[0];  //Cogemos el select
  var option;

  if (select.children.length == 0) {  //Si el desplegable esta vacio cargamos los productos
    var categories = StoreHouse.getInstance().categories;
    var category = categories.next();
    var products;

    while (category.done !== true) {
      products = category.value.products;

      for (let i = 0; i < products.length; i++) {
        option = document.createElement("option");
        $(option).val(products[i].serialNumber);
        $(option).text(products[i].name);
        $(select).append(option);
      }
      category = categories.next();
    }
  }
  $("#addProduct").find(".btn-primary").click(callAddProductInShop(shop));  //Asignamos el evento
}

/**
 * Esta funcion añade un producto a una tienda. Si está incrementa su stock
 * @param shop Objeto Shop
 */
function addProductInShop(shop) {
  var items = $("#addProduct").find(".form-control");  //Cogemos los campos
  var errors = $("#addProduct").find(".error"); //Cojo la referencias de los parrafos
  var storeHouse = StoreHouse.getInstance();
  var validated = true;

  clearParagraph("addProduct"); //Borramos los mensajes de los parrafos

  //Hacemos las validaciones
  if (items[1].value == "") {
    errors[0].innerHTML = "El campo cantidad no puede ser vacío";
    validated = false;
  }

  if (items[1].value != "" && !(/^\d{1,}$/.test(items[1].value))) {
    errors[0].innerHTML = "El campo cantidad debe ser numerico";
    validated = false;
  }

  if(validated) {
    storeHouse.addProductInShop(shop, items[0].value, parseInt(items[1].value, 10));
    addProductInShopDB(shop, items[0].value, parseInt(items[1].value, 10)); //Añadimos el registro a la tienda
    $("#addProduct").find(".close").click(); //Pulsamos el boton x para cerrar el modal
    clearModal("addProduct");
    initPopulate();
  }
}

/**
 * Esta funcion asigna un evento al boton iniciar sesion
 */
function modalLogIn() {
  $("#logIn").find(".btn-primary").click(logIn);
}

/**
 * Esta funcion conprueba si el usuario y la contraseña son correctos. Si lo son crea una cookie para mantener la sesion
 */
function logIn() {
  var items = $("#logIn").find(".form-control"); //Recojo el valor de los inputs

  if (items[0].value == "prueba" && items[1].value == "prueba") {
    setCookie(10); //Cramos la cookie con expiracion a los 10 dias
    initPopulate();
  }

  $("#logIn").find(".close").click(); //Pulsamos el boton x para cerrar el modal
}

/**
 * Esta funcion cierra sesion eliminando la cookie del usuario
 */
function logOut() {
  setCookie(-100);
  $("#signUp").css("display", "inherit");
  $("#signOff").css("display", "none");
  hideButtons(); //Ocultamos los botones privados
  initPopulate();
}

/**
 * Esta funcion crea una cookie
 * @param exDays Dias a los que debe expirar la cookie
 */
function setCookie(exDays) {
  var date = new Date();
  var expires;

  //A la fecha actual le añadimos los dias que queremos que dure la cookie, para establecer la fecha de expiracion
  date.setTime(date.getTime() + (exDays * 24 * 60 * 60 * 1000));
  expires = "expires=" + date.toGMTString();

  //Creamos la cookie
  document.cookie = "username=prueba;" + expires + ";path=/";
}

/**
 * Esta funcion recoge el valor de la cookie con ese nombre
 * @param cname Nombre de la cookie
 * @return {string}
 */
function getCookie(cname) {
  var name = cname + "=";
  var decodedCookie = decodeURIComponent(document.cookie);
  var ca = decodedCookie.split(';');
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}

/**
 * Esta funcion comprueba una cookie
 * @return {boolean}
 */
function checkCookie() {
  var user = getCookie("username");

  if (user != "") {
    setCookie(10); //Volvemos a crear la cookie para renovar la fecha de expiracion
    return true;
  }
  else {
    return false;
  }
}

/**
 * Esta funcion muestra los botones para editar la informacion de los objetos del almacen
 */
function showButtons() {
  $(".private").css("display", "inherit");
  $("#signUp").css("display", "none"); //Ocultamos el boton iniciar sesion
}

/**
 * Esta funcion oculta los botones para editar la informacion de los objetos del almacen
 */
function hideButtons() {
  $(".private").css("display", "none");
  $("#signOff").css("display", "none");  //Ocultamos el boton cerrar sesion
  $("#signUp").css("display", "inherit");  //Mostramos el boton iniciar sesion
}

/**
 * Esta funcion borra los campos creados segun el tipo de producto
 * @param id
 */
function restoreModal(id) {
  var form = $("#" + id).find("form");
  var childrens = $(form).children().length;

  $(form).children().eq(childrens - 2).remove();
  $(form).children().eq(childrens - 3).remove();
}

/**
 * Esta funcion llama a la funcion modalEditCategory
 * @param category Objeto Category
 * @return {Function} modalEditCategory
 */
function callModalEditCategory(category) {
  return function () {
    modalEditCategory(category);
  }
}

/**
 * Esta funcion llama a la funcion editCategory
 * @param category Objeto Category
 * @return {Function} editCategory
 */
function callEditCategory(category) {
  return function () {
    editCategory(category);
  }
}

/**
 * Esta funcion llama a la funcion removeCategory
 * @param category Objeto Category
 * @return {Function} removeCategory
 */
function callRemoveCategory(category) {
  return function () {
    removeCategory(category);
  }
}

/**
 * Esta funcion llama a la funcion modalEditShop
 * @param shop Objeto Shop
 * @return {Function} modalEditShop
 */
function callModalEditShop(shop) {
  return function () {
    modalEditShop(shop);
  }
}

/**
 * Esta funcion llama a la funcion editShop
 * @param shop Objeto Shop
 * @return {Function} editShop
 */
function callEditShop(shop) {
  return function () {
    editShop(shop);
  }
}

/**
 * Esta funcion llama a la funcion removeShop
 * @param shop Objeto Shop
 * @return {Function} removeShop
 */
function callRemoveShop(shop) {
  return function () {
    removeShop(shop);
  }
}

/**
 * Esta funcion llama a la funcion modalEditProduct
 * @param product Objeto Product
 * @return {Function} modalEditProduct
 */
function callModalEditProduct(product, category) {
  return function () {
    modalEditProduct(product, category);
  }
}

/**
 * Esta funcion llama a la funcion editProduct
 * @param product Objeto Product
 * @return {Function} editProduct
 */
function callEditProduct(product, category) {
  return function () {
    editProduct(product, category);
  }
}

/**
 * Esta funcion llama a la funcion removeProduct
 * @param product Objeto Product
 * @return {Function} removeProduct
 */
function callRemoveProduct(product, category) {
  return function () {
    removeProduct(product, category);
  }
}

/**
 * Esta funcion llama a la funcion modalAddProductInShop
 * @param shop Objeto Shop
 * @return {Function} modalAddProductInShop
 */
function callModalAddProductInShop(shop) {
  return function () {
    modalAddProductInShop(shop);
  }
}

/**
 * Esta funcion llama a la funcion addProductInShop
 * @param shop Objeto Shop
 * @return {Function} addProductInShop
 */
function callAddProductInShop(shop) {
  return function () {
    addProductInShop(shop);
  }
}

/**
 * Esta funcion borra el valor de los campos de un formulario
 * @param id  Identificador del formulario
 */
function clearModal(id) {
  var modal = document.getElementById(id);
  $("#"+id).find(".form-control").val("");
}

/**
 * Esta funcion borra el contenido de los parrafos de la clase error
 * @param idModal Identificador del modal
 */
function clearParagraph(idModal) {
  var modal = document.getElementById(idModal);
  $("#"+idModal).find(".error").text("");
}
