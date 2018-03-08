"use strict";

/**
 * Esta función pinta un mapa con la ubicación de todas las tiendas
 * @param position
 */
function principalMap(position) {
  console.log("principalMap");

  var myCenter = new google.maps.LatLng(position.coords.latitude, position.coords.longitude); //Centro del mapa
  var mapProp = { //Opciones del mapa
    center: myCenter,
    zoom: 14,
  };

  var map = new google.maps.Map(document.getElementById("principalMap"), mapProp); //Creamos el mapa
  //Añadimos un marcador de nuestra posicion
  var marker = new google.maps.Marker({position:myCenter});
  marker.setMap(map);

  var shops = StoreHouse.getInstance().shops;
  var shop = shops.next();
  var shopMarker, position, objectShop;

  shop = shops.next(); //Me salto la tienda por defecto
  //Recorremos las tiendas para añadir un marcador de la posicion de cada una
  while (shop.done !== true) {
    objectShop = shop.value.shop;
    position = new google.maps.LatLng(objectShop.coords.latitude, objectShop.coords.longitude); //Posicion de la tienda actual
    shopMarker = new google.maps.Marker({position:position, icon: 'img/flecha.png'});
    shopMarker.setMap(map);

    //Evento que al hacer click en el marcador muestra el nombre de la tienda
    google.maps.event.addListener(shopMarker,'click', callAddInfo(objectShop, map, shopMarker));

    shop = shops.next();
  }
}

/**
 * Esta funcion crea un panel con el nombre de la tienda
 * @param shop
 * @param map
 * @param marker
 */
function addInfo(shop, map, marker) {
  var infowindow = new google.maps.InfoWindow({
    content: shop.name
  });
  infowindow.open(map,marker);
}

/**
 * Esta función dibuja un mapa en el modal de insertar tienda para que el usuario pueda posicionarla
 * @param position
 */
function addShopMap(position) {
  console.log("addShopMap");
  var myCenter = new google.maps.LatLng(position.coords.latitude, position.coords.longitude); //Centro del mapa
  var mapProp = { //Opciones del mapa
    center: myCenter,
    zoom: 14,
  };

  var map = new google.maps.Map(document.getElementById("addShopMap"), mapProp);

  google.maps.event.addListener(map, 'click', function(event) { //Evento on click que nos permite obtener las coordenas donde hemos hecho el click
    placeMarker(map, event.latLng);
  });
}

/**
 * Esta funcion obtiene las coordenadas de donde hemos hecho click y las pone en un campo oculto para que podamos trabajar con ellas.
 * Tambien añade un marcador en dicha posicion
 * @param map Mapa donde vamos a ñadir el marcador
 * @param location Coordenadas donde vamos a ñadir el marcador
 */
function placeMarker(map, location) {
  //Creamos el marcador
  var marker = new google.maps.Marker({
    position: location,
    map: map
  });

  //Ponemos las coordenadas en el campo oculto
  document.getElementsByName("coords")[0].value = location.lat() + "," + location.lng();
}

/**
 * Esta funcion dibuja un mapa en el modal modificar tienda y añade una marca de la ubicacion actual
 * @param position
 */
function setShopMap(position) {
  console.log("setShopMap");
  var coords = document.getElementsByName("setCoords")[0].value.split(","); //Obtenemos las coordenadas de la tienda
  var myCenter = new google.maps.LatLng(position.coords.latitude, position.coords.longitude); //Centro del mapa
  var mapProp = { //Opciones del mapa
    center: myCenter,
    zoom: 14,
  };
  //Creamos el mapa
  var map = new google.maps.Map(document.getElementById("setShopMap"), mapProp);
  //Añadimos un marcador con la posicion de la tienda
  var shopPosition = new google.maps.LatLng(coords[0], coords[1]);
  var marker = new google.maps.Marker({position:shopPosition, icon: 'img/flecha.png'});
  marker.setMap(map);

  google.maps.event.addListener(map, 'click', function(event) {//Evento onclick para obtener la coordenadas del click
    setPlaceShop(map, event.latLng);
  });
}

/**
 * Esta funcion obtiene las coordenadas donde hemos hecho click y las pone en un campo oculto para que podamos trabajar con ellas.
 * Tambien añade un marcador en dicha posicion
 * @param map Mapa donde vamos a ñadir el marcador
 * @param location Coordenadas donde vamos a ñadir el marcador
 */
function setPlaceShop(map, location) {
  var marker = new google.maps.Marker({
    position: location,
    map: map
  });
  document.getElementsByName("setCoords")[0].value = location.lat() + "," + location.lng();
}

/**
 * Funcion que obtiene la ubicacion actual del usuario
 * En funcion del parametro llama a un mapa o a otro
 * @param map
 */
function getLocation(map) {
  switch (map){
    case "principalMap":
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(principalMap);
      }
      else{
        document.getElementById("principalMap").innerHTML = "Su navegador no soporta geolocalización";
      }
      break;
    case "addShopMap":
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(addShopMap);
      }
      else{
        document.getElementById("addShopMap").innerHTML = "Su navegador no soporta geolocalización";
      }
      break;
    case "setShopMap":
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(setShopMap);
      }
      else{
        document.getElementById("setShopMap").innerHTML = "Su navegador no soporta geolocalización";
      }
      break;
  }
}

function callAddInfo(shop, map, marker) {
  return function () {
    addInfo(shop, map, marker);
  }
}
