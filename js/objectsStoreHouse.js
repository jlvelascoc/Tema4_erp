"use strict";
//Funcion anomina que se ejecuta para devolver los constructores Product, Bass, Drums & Amplifiers
//Utilizo este tipo de funcion para que producto sea una clase abstracta
(function () {
  var abstractCreateLock = false; //Seguro clase abstracta

  //Clouser para generar numeros de serie distintos para cada producto.
  //Devuelve un numero distinto cada vez
  var GenerateSerialNumber = function () {
    var cont = 1;
    return function () {
      return cont++
    };
  }();

  //Cosntructor de la clase abstracta Product
  function Product(name, price) {
    //Comprobaciones
    if (abstractCreateLock) throw new AbstractClassException("Product"); //Seguro para que no se pueda instanciar
    if (!(this instanceof Product)) throw new InvalidAccessConstructorException();
    name = (typeof name !== undefined) ? name : "";
    if (!name) throw new EmptyValueException("name");
    price = (typeof price !== undefined) ? price : "";
    if (!price) throw new EmptyValueException("price");

    //Propiedades privadas
    var _serialNumber = GenerateSerialNumber(); //numero de serie del producto
    var _name = name;   //nombre del producto
    var _price = price;   //precio del producto
    var _description = "";    //descricion del producto
    var _tax = 21;    //Impuestos, por defecto 21%
    var _images = [];   //Array con las url de las imagenes del producto

    //Propiedades publicas
    Object.defineProperty(this, 'serialNumber', { //Permite ver _serialNumber
      get: function () {
        return _serialNumber;
      }
    });

    Object.defineProperty(this, 'name', {   //Permite ver y modificar _name
      get: function () {
        return _name;
      },
      set: function (value) {
        if (!value) throw new EmptyValueException("name"); //Controla que _name no pueda ser vacio
        _name = value;
      }
    });

    Object.defineProperty(this, 'description', { //Permite ver y modificar _description
      get: function () {
        return _description;
      },
      set: function (value) {
        _description = value;
      }
    });

    Object.defineProperty(this, 'price', {    //Permite ver y modificar _price
      get: function () {
        return _price;
      },
      set: function (value) {
        if (!value) throw new EmptyValueException("price");   //Controla que _price no pueda ser vacio
        _price = value;
      }
    });

    Object.defineProperty(this, 'tax', {    //Permite ver y modificar _tax
      get: function () {
        return _tax;
      },
      set: function (value) {   //Controla que _tax no pueda ser vacio
        if (!value) {
          _tax = 21;
        }
        else {
          _tax = value;
        }
      }
    });

    Object.defineProperty(this, 'images', {   //Permite ver _images
      get: function () {
        return _images;
      }
    });

    //Metodos públicos
    //Este metodo permite añadir una imagen
    this.addImage = function (url) {
      //Controlamos que url no pueda ser vacio y que no exista ya
      if (!url) throw new EmptyValueException("url");
      if (getImageIndex(url) !== -1) throw new ExistingValueException("image", url);
      _images.push(url);

      return _images.length; //numero de imagenes que hay
    }

    //Metodo que permite borrar una imagen dado un indice
    this.removeImageIndex = function (index) {
      //Controlamos que index no pueda ser vacio y que no sea mayor que la cantidad de images actuales
      if (!index) throw new EmptyValueException("index");
      if (index > _images.length) throw new OverFlowException();
      _images.splice(index, 1);
    }

    //Metodo que permite borrar una imagen dada su url
    this.removeImage = function (url) {
      //Controlamos que index no pueda ser vacio y que la imagen existe en el array
      if (!url) throw new EmptyValueException("url");
      if (getImageIndex(url) === -1) throw new NonExistingValueException("image", url);

      this.removeImageIndex(getImageIndex(url));
    }

    //Metodos privados
    //Metodo que devuelve la posicion del una imagen en el array
    function getImageIndex(url) {
      var index;

      index = _images.findIndex(function (image) {
        return (image = url);
      });

      return index;
    }
  } //Fin del constructor Product
  Product.prototype = {};
  Product.prototype.constructor = Product;
  Product.prototype.toString = function () {
    return "Serial number: " + this.serialNumber + "; Name: " + this.name + "; Price: " + this.price + "€; Description: " + this.description + "; Taxes: " + this.tax + "%; Images: " + this.images;
  }

  //Constructor del objeto Bass. Ademas de los parametros comunes recibe el numero de cuerdas y el tipo de electronica
  function Bass(name = "", price = "", strings = 4, electronic = "passive") {
    //Abrimos el candado para poder llamar a la clase abstracta
    abstractCreateLock = false;
    Product.call(this, name, price);
    abstractCreateLock = true;

    //Controlamos que strings no sea vacio y que su valor es 4, 5, 6 o 7. Por defecto 4
    strings = (typeof strings !== 'undefined') ? strings : 4;
    if (strings < 4 || strings > 7) throw new InvalidValueException("strings", strings);

    //Controlamos que electronic no sea vacio y que su valor es pasive o active. Por defecto pasive
    electronic = (typeof electronic !== 'undefined') ? electronic.toLowerCase() : "passive";
    if (!/^(passive|active)$/.test(electronic)) throw new InvalidValueException("electronic", electronic);

    //atributos privados de bass
    var _strings = strings;   //Numero de cuerdas
    var _electronic = electronic;   //Tipo de electronica
    var _type = "";   //Tipo de bajo

    //Propiedades de acceso a los atributos privados
    Object.defineProperty(this, 'strings', {    //Permite ver y modificar _strings
      get: function () {
        return _strings;
      },
      set: function (value) {
        //Controlamos que value no sea vacio y que su valor es 4, 5, 6 o 7. Por defecto 4
        value = (typeof value !== 'undefined') ? value : 4;
        if (value < 4 || value > 7) throw new InvalidValueException("strings", value);
        _strings = value;
      }
    });

    Object.defineProperty(this, 'electronic', {   //Permite ver y modificar _electronic
      get: function () {
        return _electronic;
      },
      set: function (value) {
        //Controlamos que value no sea vacio y que su valor es passive o active. Por defecto passive
        value = (typeof value !== 'undefined') ? value.toLowerCase() : "passive";
        if (!/^(passive|active)$/.test(value)) throw new InvalidValueException("electronic", value);
        _electronic = value;
      }
    });

    Object.defineProperty(this, 'type', { //Permite ver y modificar _type
      get: function () {
        return _type;
      },
      set: function (value) {
        _type = value;
      }
    });
  }//Fin del constructor Bass
  Bass.prototype = Object.create(Product.prototype);
  Bass.prototype.constructor = Bass;
  Bass.prototype.toString = function () {
    return Product.prototype.toString.call(this) + "; Strings: " + this.strings + "; Electronic: " + this.electronic + "; Type: " + this.type;
  }

  //Constructo del objeto Drums.  Ademas de los parametros comunes recibe el tipo de bateria
  function Drums(name = "", price = "", type = "acoustic") {
    //Abrimos el seguro para poder llamar al superconstructor
    abstractCreateLock = false;
    Product.call(this, name, price);
    abstractCreateLock = true;

    //Controlamos que type no sea vacio y que su valor es acoustic o electronic. Por defecto acoustic
    type = (typeof type !== 'undefined') ? type.toLowerCase() : "acoustic";
    if (!/^(acoustic|electronic)$/.test(type)) throw new InvalidValueException("type", type);

    //atributos privados de bass
    var _type = type;   //Tipo de bateria
    var _toms = []; //array con las medidas de los toms

    //Propiedades de acceso a los atributos privados
    Object.defineProperty(this, 'type', {   //Permite ver y modificar _type
      get: function () {
        return _type;
      },
      set: function (value) {
        //Controlamos que value no sea vacio y que su valor es acoustic o electronic. Por defecto acoustic
        value = (typeof value !== 'undefined') ? type.toLowerCase() : "acoustic";
        if (!/^(acoustic|electronic)$/.test(value)) throw new InvalidValueException("type", value);
        _type = value;
      }
    });

    Object.defineProperty(this, 'toms', {   //Permite ver y modificar _toms
      get: function () {
        return _toms.toString();
      },
      set: function (value) {
        _toms = value;
      }
    });
  }//Fin del constructor Drums
  Drums.prototype = Object.create(Product.prototype);
  Drums.prototype.constructor = Drums;
  Drums.prototype.toString = function () {
    return Product.prototype.toString.call(this) + "; Type: " + this.type + "; Inches of toms: " + this.toms;
  }

  //Cosntructor del objeto Amplifier. Ademas de los atributos comunes recibe la potencia y el tipo
  function Amplifier(name = "", price = "", watts = "", type = "transistors") {
    //Abrimos el seguro para llamar al superconstructor
    abstractCreateLock = false;
    Product.call(this, name, price);
    abstractCreateLock = true;

    //Controlamos que type no sea vacio y que su valor es transistors, valves ,
    // hibrids o modeling. Por defecto transistors
    type = (typeof type !== 'undefined' || type === "") ? type.toLowerCase() : "transistors";
    if (!/^(transistors|valves|hibrids|modeling)$/.test(type)) throw new InvalidValueException("type", type);

    //Controlamos que watts no sea vacio
    watts = (typeof watts !== 'undefined') ? watts : "";
    if (!watts) throw new EmptyValueException("watts");

    //atributos privados de bass
    var _type = type;   //tipo de amplificador
    var _watts = watts;   //potencia en wattios

    //Propiedades de acceso a los atributos privados
    Object.defineProperty(this, 'type', {   //Permite ver y modificar _type
      get: function () {
        return _type;
      },
      set: function (value) {
        //Controlamos que value no sea vacio y que su valor es transistors, valves ,
        // hibrids o modeling. Por defecto transistors
        value = (typeof value !== 'undefined') ? value.toLowerCase() : "transistors";
        if (!/^(transistors|valves|hibrids|modeling)$/.test(value)) throw new InvalidValueException("type", value);
        _type = value;
      }
    });

    Object.defineProperty(this, 'watts', {    //Permite ver y modificar _watts
      get: function () {
        return _watts;
      },
      set: function (value) {
        //Controlamos que value no sea vacio
        if (!value) throw new EmptyValueException("watts");
        _watts = (value);
      }
    });
  }//Fin del constructor Drums
  Amplifier.prototype = Object.create(Product.prototype);
  Amplifier.prototype.constructor = Amplifier;
  Amplifier.prototype.toString = function () {
    return Product.prototype.toString.call(this) + "; Type: " + this.type + "; Watts: " + this.watts;
  }

  abstractCreateLock = true; //Activamos el seguro de la clase abstracta

  //Devolvemos los constructores al obejto window
  window.Product = Product;
  window.Bass = Bass;
  window.Drums = Drums;
  window.Amplifier = Amplifier;
})();

//Clouser para asignar el id  de category de forma automatica
var categoryId = function () {
  var cont = 1;
  return function () {
    return cont++
  };
}();

//Constructor de category
function Category(title, description) {
  //Controlamos que el objeto se instancia mediante constructor
  if (!(this instanceof Category)) throw new InvalidAccessConstructorException();
  //Controlamos que title no esta vacio
  title = (typeof title !== 'undefined') ? title : "";
  if (!title) throw new EmptyValueException("title");

  //Propiedades privadas
  var _id = categoryId();   //Identificador de la categoria
  var _title = title;   //Titulo
  var _description = description || "";   //Descripcion

  //Propiedades públicas de acceso
  Object.defineProperty(this, 'id', {   //Permite ver _id
    get: function () {
      return _id;
    }
  });

  Object.defineProperty(this, 'title', {    //Permite ver y modificar _title
    get: function () {
      return _title;
    },
    set: function (value) {
      //Controlamos que value no esta vacio
      if (!value) throw new EmptyValueException("title");
      _title = value;
    }
  });

  Object.defineProperty(this, 'description', {    //Permite ver y modificar _description
    get: function () {
      return _description;
    },
    set: function (value) {
      _description = value;
    }
  });
} //Fin del constructor Category
Category.prototype = {};
Category.prototype.constructor = Category;
Category.prototype.toString = function () {
  return "ID: " + this.id + "; Title: " + this.title + "; Description: " + this.description;
}

//Constructor del objeto Coords
function Coords(latitude, longitude) {
  //Controlamos que el objeto se instancia mediante constructor
  if (!(this instanceof Coords)) throw new InvalidAccessConstructorException();
  //Comprobamos que latitude y longitude no sean vacios
  latitude = (typeof latitude !== 'undefined') ? latitude : "";
  if (!latitude) throw new EmptyValueException("latitude");
  longitude = (typeof longitude !== 'undefined') ? longitude : "";
  if (!longitude) throw new EmptyValueException("longitude");

  //Propiedades privadas
  var _latitude = latitude;
  var _longitude = longitude;

  //Propiedades públicas de acceso
  Object.defineProperty(this, 'latitude', {   //Permite ver y modificar latitude
    get: function () {
      return _latitude;
    },
    set: function (value) {
      //Comprobamos que value no sea vacio
      value = (typeof value !== 'undefined') ? value : "";
      if (!value) throw new EmptyValueException("latitude");
      _latitude = value;
    }
  });

  Object.defineProperty(this, 'longitude', {    //Permite ver y modificar longitude
    get: function () {
      return _longitude;
    },
    set: function (value) {
      //Comprobamos que value no sea vacio
      value = (typeof value !== 'undefined') ? value : "";
      if (!value) throw new EmptyValueException("longitude");
      _longitude = value;
    }
  });
}//Fin del constructor Coords
Coords.prototype = {};
Coords.prototype.constructor = Coords;
Coords.prototype.toString = function () {
  return "Latitude: " +this.latitude + "; Longitude: " + this.longitude;
}


//Constructor del objeto Shop
function Shop (name){
  //Controlamos que Shop se instancia mediante constructor
  if (!(this instanceof Shop)) throw new InvalidAccessConstructorException();
  //Controlamos que name no esté vacio
  name = (typeof name !== undefined) ? name : "";
  if (!name) throw new EmptyValueException("name");

  //Propiedades privadas
  var _name = name;
  var _cif = "";
  var _address = "";
  var _phone = "";
  var _coords = "";

  //Propiedades públicas de acceso
  Object.defineProperty(this, 'name', {   //Permite ver y modificar _name
    get: function () {
      return _name;
    },
    set: function (value) {
      //Controlamos que name no esté vacio
      value = (typeof value !== 'undefined') ? value : "";
      if (!value) throw new EmptyValueException("name");
      _name = value;
    }
  });

  Object.defineProperty(this, 'cif', {    //Permite ver y modificar _cif
    get: function () {
      return _cif;
    },
    set: function (value) {
      _cif = value;
    }
  });

  Object.defineProperty(this, 'address', {    //Permite ver y modificar _address
    get: function () {
      return _address;
    },
    set: function (value) {
      _address = value;
    }
  });

  Object.defineProperty(this, 'phone', {    //Permite ver y modificar _phone
    get: function () {
      return _phone;
    },
    set: function (value) {
      _phone = value;
    }
  });

  Object.defineProperty(this, 'coords', {   //Permite ver y modificar _coords
    get: function () {
      return _coords.toString();
    },
    set: function (value) {
      //Controlamos que value sea una instancia de Coords
      if (!(value instanceof Coords)) throw new WrongValueException("Coords");
      _coords = value;
    }
  });
}//Fin del constructor Shop
Shop.prototype = {};
Shop.prototype.constructor = Shop;
Shop.prototype.toString = function () {
  return "Name: " + this.name + "; CIF: " + this.cif + "; Address: " + this.address + "; Phone: " + this.phone + "; Coords: " + this.coords;
}
