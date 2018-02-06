# Tema4_erp
Version 1.0.0

    Añadido fichero .editorconfig
    Creado el directorio js
        Creado el fichero exceptions.js
            Este fichero contiene los constructores de las diferentes excepciones del proyecto.
            Están divididas en excepciones genéricas y excepciones propias de StoreHous.
        Creado el fichero objectsStoreHouse.js
            Este fichero contiene los constructores de los objetos necesarios para el funcionamiento de StoreHouse.
            Estos objetos son: Product(clase abstracta), Bass, Drums, y Amplifier que heredan de Poduct, Category,
            Coords y Shop.
        Creado el fichero StoreHouse.js
            Este fichero contiene el constructor de StoreHouse creado a través de un patrón Singleton.
        Creado el fichero test.js
            Este fichero contien diferentes funciones que comprueban el funcionamiento de los diferntes objetos.
    Creado el fichero storehouse.html

Version 2.0.0
    
    Creado directorio css
        Creado fichero mis_estilos.css
            Este fichero contiene las reglas css necesarias para la correcta visualización de la página.
        Añadidos los ficheros css necesarios para bootstrap
    Creado directorio img
    
    Creado directorio fonts
    
    Añadidos los ficheros js necesarios para bootstrap
    Modificado fichero storehouse.html
        Modificadas las propiedades:
        - Categories: El iterador ahora devuelve el objeto Category y un array con los productos.
        - Shops: El iterador ahora devuelve el objeto Shop y un array con el serial number de los productos.
        Modificados los metodos:
        - getShopProducts: El iterador ahora devuelve el objeto Product completo.
        Creados los metodos:
        - getShopCategories.
        - getGlobalStock.
        
    Creado fichero layout.js
        Este fichero contiene las funciones necesarias para dibujar en la pagina los diferentes elementos en cada
        momento.

    Modificado el fichero storehouse.html
        Se ha creado la estructura básica de una web compuesta de header, main y footer.
        
Version 3.0.0

    Modificado fichero layout.js
        Modificada funcion shopProductPopulate.
        Modificada funcion hideShopProductPopulate.
        Modificada funcion createProduct.
        Modificada funcion getProductInfo.
        Creada la funcion productCarousel.
        Creada la funcion closeWindow.
        Creada la funcion closeAllWindows.
        
    Modificado fichero mis_estilos.css
