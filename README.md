# **DOM Manipulation**

### Proyecto meta in BetterMe - shopping-cart

El DOM (Document Object Model) es una interfaz que representa cómo los documentos HTML y XML son leídos por el navegador. Permite a un lenguaje (JavaScript) manipular, estructurar y dar estilo a un sitio web. Una vez que el navegador lee el documento HTML, crea un árbol de representación llamado Modelo de Objetos del Documento y define cómo se puede acceder a ese árbol.

![DOM tree](/img/DOM.png)

Hay cuatro elementos importantes en el DOM:

1. **Document**: Trata todos los documentos HTML.
2. **Element**: Todas las etiquetas que están dentro de tu HTML o XML se convierten en un elemento DOM.
3. **Text**: Todo el contenido de las etiquetas.
4. **Atributes**: Todos los atributos de un elemento HTML específico.

## Métodos del DOM

1. **getElementById()**: Este método devuelve el elemento que contiene el nombre id pasado. Como sabemos, los id's deben ser únicos.
2. **getElementsByClassName()**: Este método devuelve una HTMLCollection de todos aquellos elementos que contienen la clase de nombre específica pasada.
3. **getElementsByTagName()**: Funciona de la misma manera que los métodos anteriores: también devuelve una HTMLCollection, pero esta vez con una única diferencia: devuelve todos aquellos elementos con el nombre de etiqueta pasado.
4. **querySelector()**: Devuelve el primer elemento que tiene el selector CSS específico pasado. Recuerda que el selector debe seguir la sintaxis CSS. En caso de no tener ningún selector, devuelve null.
5. **querySelectorAll()**: Muy similar al método querySelector(), pero con una única diferencia: devuelve todos los elementos que coinciden con el selector CSS pasado. El selector también debe seguir la sintaxis CSS. En caso de no tener ningún selector, devuelve null.

## Eventos del DOM:

Los eventos permiten realizar interactividad en la página.

1. **Click**: Cuando el usuario da clic en un elemento, se genera una acción.
2. **Select**: Cuando desea enviar algo cuando se selecciona un elemento específico. En ese caso, enviaremos una alerta simple.

## Traversing DOM

Podemos recorrer el DOM y utilizar algunas propiedades que nos permiten devolver elementos, comentarios, texto, etc.

1. Traversing downwards
   a. element.querySelector
   b. element.querySelectorAll
   c. element.children
2. Traversing upwards
   a. element.parentElement
   b. element.closest
3. Traversing sideways
   a. element.nextElementSibling
   b. element.previousElementSibling
   c. Combine parentElement, children, and index
