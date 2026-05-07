// 1. CONTENEDOR

// Buscamos el <div id="tablero"> en el HTML y lo guardamos en una variable
// Se usa el tipo const por que como es el "lienzo" siempre va a ser el mismo, no se va a cambiar
// "document.getElementById("id") es una función que escanea el HTMl y devuelve el elemento
// exacto que tenga ese id

const contenedorTablero = document.getElementById('tablero');

// 2. LISTAS DE PIEZAS (ARRAYS)

// Almacenamos las piezas en arrays, la posición del emoji en la lista (0-7) coincidirá
// exactamente con la columna actual del bucle

// En JavaScript podemos crear arrays escribiendo:
// "const nombreArray = ['contenido1', 'contenido2'...];

const filaPiezasNegras = ['♜', '♞', '♝', '♛', '♚', '♝', '♞', '♜'];
const filaPeonesNegros = ['♟', '♟', '♟', '♟', '♟', '♟', '♟', '♟'];
const filaPeonesBlancos = ['♙', '♙', '♙', '♙', '♙', '♙', '♙', '♙'];
const filaPiezasBlancas = ['♖', '♘', '♗', '♕', '♔', '♗', '♘', '♖'];

// 3. BUCLE DE LAS FILAS

// El for sirve en este caso para no repetir código una y otra vez (no tener que hacer
// las 8 filas manulamente)

// Empezamos recorriendo en la fila 0 (arriba) y terminamos en la 7
// (ponemos let por que es una variable temporal que va cambiando)
for(let fila = 0; fila < 8; fila++){

    // 4. BUCLE DE LAS COLUMNAS

    // Ahora estando en una fila, con el for recorremos las 8 columnas que tiene
    // (de izquierda a derecha)
    // Con los dos, uno dentro de otro for así recorremos un array de 2 dimensiones (8x8=64)
    for(let columna = 0; columna < 8; columna++){

        // Con "document.createElement" fabricamos un objeto de tipo <div> que está vacío
        // Se usa const por que esta casilla será siempre la misma (el div es cada casilla)
        const nuevaCasilla = document.createElement('div');

        // Le aplicamos la clase CSS "casilla" a las casillas
        // "classList.add('casilla') permite añadir clases CSS a un elemento HTML
        nuevaCasilla.classList.add('casilla');

        // 5. DETECCIÓN DEL COLOR

        /*
        CÓMO SE GENERA EL PATRÓN:
        Imaginando las coordenadas (fila, columna):
        - Fila 0, Columna 0 -> 0 + 0 = 0 (Par)
        - Fila 0, Columna 1 -> 0 + 1 = 1 (Impar)
        - Fila 0, Columna 2 -> 0 + 2 = 2 (Par)

        Cuando saltamos a la fila de abajo:
        - Fila 1, Columna 0 -> 1 + 0 = 1 (Impar): Se desplaza el patrón

        El operador % coge la suma total y la divide entre 2.
        Luego % saca el resto (ya que si divides cualquier número entero sólo hay
        dos restos posibles 0 (par) o 1 (impar)

        Y con === preguntamos si el resto es igual a 0 (así asignamos la clase CSS
        dependiendo de si es par o impar)
        */

        if((fila + columna) % 2 === 0){
            nuevaCasilla.classList.add('blanca');
        }
        else{
            nuevaCasilla.classList.add('negra');
        }

        // 6. COLOCAR LAS PIEZAS

        // Para colocar las piezas, evaluamos sólo las filas y no las columnas
        // por que las piezas al principio se colocan de manera horizontal
        // Ponemos === 0, 1 por que son las dos primeras. Y === 6, 7 por que son las últimas
        if(fila === 0){

            // "textContent" coge el <div> vacío, y le injecta un String (que
            // en este caso el String(texto) es el icono de las piezas ♞) Ejemplo:
            // <div>♞</div>. Se dirige a la constante "filaPiezasNegras" (o la que sea)
            // y busca el índice que dicte la variable "columna"
            nuevaCasilla.textContent = filaPiezasNegras[columna];
        }
        else if(fila === 1){
            nuevaCasilla.textContent = filaPeonesNegros[columna];
        }
        else if(fila === 6){
            nuevaCasilla.textContent = filaPeonesBlancos[columna];
        }
        else if(fila === 7){
            nuevaCasilla.textContent = filaPiezasBlancas[columna];
        }

        // 7. PASO FINAL

        // Las casillas que hemos creado ya tienen su clase "casilla", su color, y sus piezas,
        // pero sigue estando oculta al usuario. "appendChild" (añadir hijo) es la orden
        // de ejecución. Coge el contenedor principal ("contenedorTablero") y le pega las nuevas
        // casillas ("nuevaCasilla"), al final del todo. Ahora el navegador dibuja la casilla
        // usando el CSS Grid que establecimos en el CSS, empujándola a su celda exacta
        contenedorTablero.appendChild(nuevaCasilla);

    }   // Fin del bucle interno (columna suma +1)

}   // Fin del bucle externo (fila suma +1)