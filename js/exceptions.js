"use strict";
//Excepcion base de la que heredarán las demás
function BaseException() {
}
BaseException.prototype = Object.create(Error.prototype);
BaseException.prototype.constructor = BaseException;
BaseException.prototype.toString = function () {
  return this.name + ": " + this.message;
}

//Excepción para indicar que un parametro no puede estar vacio
function EmptyValueException(parameter) {
  this.name = "EmptyValueException";
  this.message = "The parameter " + parameter + " can not be empty";
}
EmptyValueException.prototype = Object.create(BaseException.prototype);
EmptyValueException.prototype.constructor = EmptyValueException;

//Excepcion para indicar que el valor de un parametro no es válido
function InvalidValueException(param, value) {
  this.name = "InvalidValueException";
  this.message = "The parameter " + param + " has an invalid value. (" + param + ": " + value + ")";
}
InvalidValueException.prototype = Object.create(BaseException.prototype);
InvalidValueException.prototype.constructor = InvalidValueException;

//Excepcion para indicar el un objeto tiene que ser de un determinado tipo
function WrongValueException(type) {
  this.name = "WrongValueException";
  this.message = "The value must be of type " + type;
}
WrongValueException.prototype = Object.create(BaseException.prototype);
WrongValueException.prototype.constructor = WrongValueException;

//Excepción para indicar que un objeto no ha sido creado con su constructor
function InvalidAccessConstructorException() {
  this.name = "InvalidAccessConstructorException";
  this.message = "Constructor can not be called as a function.";
}
InvalidAccessConstructorException.prototype = new BaseException();
InvalidAccessConstructorException.prototype.constructor = InvalidAccessConstructorException;

//Excepción para indicar un intento de instanciar una clase abstracta
function AbstractClassException(classValue) {
  this.name = "AbstractClassException";
  this.message = classValue + " is a abstract class.";
}
AbstractClassException.prototype = new BaseException();
AbstractClassException.prototype.constructor = AbstractClassException;

//Excepcion para indicar el desbordamiento de un array
function OverflowException() {
  this.name = "OverflowException";
  this.message = "The index is higher than array lengt";
}
OverflowException.prototype = Object.create(BaseException.prototype);
OverflowException.prototype.constructor = OverflowException;

//Excepciones especificas del objeto storeHouse
//Excepcion base de storeHouse
function StoreHouseException() {
  this.name = "StoreHouseException";
  this.message = "Store House Exception"
}
StoreHouseException.prototype = Object.create(BaseException.prototype);
StoreHouseException.prototype.constructor = StoreHouseException;

//Excepcion para indicar que una categoria ya existe
function ExistingCategoryException(title) {
  this.name = "ExistingCategoryException";
  this.message = title + " already exists in the storehouse";
}
ExistingCategoryException.prototype = Object.create(StoreHouseException.prototype);
ExistingCategoryException.prototype.constructor = ExistingCategoryException;

//Excepcion para indicar que una categoria no existe
function NonExistingCategoryException(title) {
  this.name = "NonExistingCategoryException";
  this.message = title + " no exists in the storehouse";
}
NonExistingCategoryException.prototype = Object.create(StoreHouseException.prototype);
NonExistingCategoryException.prototype.constructor = NonExistingCategoryException;

//Excepcion para indicar que una tienda ya existe
function ExistingShopException(title) {
  this.name = "ExistingShopException";
  this.message = title + " already exists in the storehouse";
}
ExistingShopException.prototype = Object.create(StoreHouseException.prototype);
ExistingShopException.prototype.constructor = ExistingShopException;

//Excepcion para indicar que una tienda no existe
function NonExistingShopException(title) {
  this.name = "NonExistingShopException";
  this.message = title + " no exists in the storehouse";
}
NonExistingShopException.prototype = Object.create(StoreHouseException.prototype);
NonExistingShopException.prototype.constructor = NonExistingShopException;

//Excepcion para indicar que un valor ya existe dentro de un array.
//La utilizo tanto para las imagenes como para los productos
function ExistingValueException(type, value) {
  this.name = "ExistingValueException";
  this.message = "The " + type + " with id is " + value + " already exists";
}
ExistingValueException.prototype = Object.create(StoreHouseException.prototype);
ExistingValueException.prototype.constructor = ExistingValueException;

//Excepcion para indicar que un valor no existe dentro de un array.
//La utilizo tanto para las imagenes como para los productos
function NonExistingValueException(type, value) {
  this.name = "NonExistingValueException";
  this.message = "The " + type + " with id is " + value + " not exists";
}
NonExistingValueException.prototype = Object.create(StoreHouseException.prototype);
NonExistingValueException.prototype.constructor = NonExistingValueException;

//Excepcion para indicar que no existe un producto en una tienda
function NonExistingProductInShopException(product, shop) {
  this.name = "NonExistingProductInShopException";
  this.message = "The product " + product + " no exists in the shop " + shop;
}
NonExistingProductInShopException.prototype = Object.create(StoreHouseException.prototype);
NonExistingProductInShopException.prototype.constructor = NonExistingProductInShopException;
