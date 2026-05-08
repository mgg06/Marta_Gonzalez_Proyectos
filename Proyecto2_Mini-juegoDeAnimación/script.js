// Para que JavaScript pueda controlar los elementos creados en el HTML, primero
// necesitamos seleccionarlos. Aquí usamos "document.getElementById", que sirve
// para buscar en el documento los elementos que tengan un id específico, y
// guardamos su referencia en variables. Así podemos interactuar con ellos
// Lo asignamos como un const ya que no lo vamos a reasignar

const personaje = document.getElementById('personaje');
const obstaculo = document.getElementById('obstaculo');
const marcador = document.getElementById('marcador');
const pantallaFin = document.getElementById('pantalla-fin');

// 1. VARIABLES DE ESTADO

// Para declarar los puntos utilizamos let en vez de const, por que a diferencia
// de los elementos HTML, los puntos van a cambiar constantemente
let puntos = 0;

// Esta variable representa si el jugador a perdido o no. Si el jugador pierde, se
// cambiará a "true" para parar el juego y evitar que se siga ganando puntos o jugando
let juegoTerminado = false;

// 2. SISTEMA DE CONTROLES

// add.EventListener es un método que sirve para indicar que queremos que se ejecute
// una función específica cuando ocurra un evento. En este caso, "keydown" se activa
// cuando el usuario presiona cualquier tecla
// El parámetro evento es un objeto que el navegador pasa automáticamente a
// a la función, conteniendo información exacta de la tecla que se ha pulsado
document.addEventListener('keydown', function(evento){
    if(juegoTerminado === true){
        // Si el juego ha terminado y el usuario pulsa la barra espaciadora,
        // recargamos la página actual para reiniciar la partida
        if(evento.code === 'Space'){
            location.reload();
        }
        // Ejecutamos un return para detener la ejecución y evitar que el
        // personaje pueda seguir saltando o reaccionando a las teclas
        return;
    }

    // Accedemos a la propiedad code dentro del objeto evento, usamos el operador ===
    // para comprobar si el valor es exactamente la cadena de texto "Space", que
    // corresponde a la barra espaciadora
    // (code, evalúa el botón físico que pulsó el usuario, evitando errores
    // causados por deferentes configuraciones regionales de teclado)
    if(evento.code === 'Space'){
        // Si la condición es verdadera (se presiona la tecla espacio), se ejecuta
        // esta línea que llama a la función saltar(), que está definida en otra
        // parte del código y contiene las instrucciones para que salte el personaje
        saltar();
    }
});

// 3. FUNCIÓN DE SALTO
// (controla la adición y eliminación dinámica de clases CSS para activar el @keyfames)

function saltar(){
    // Validamos si el elemento ya tiene la clase aplicada (con contains), si la tiene
    // significa que la animación ya se está reproduciendo(salto). El return evita
    // que la clase se reinicie si el usuario presiona Espacio varias veces si está en el aire
    if(personaje.classList.contains("animar-salto")){
        return;
    }

    // Añadimos la clase. Al inyectarse en el HTML, el navegador aplica las reglas
    // CSS que corresponden, y comienza la animación de @keyframes salto
    personaje.classList.add("animar-salto");

    // setTimeout ejecuta una función una única vez tras un retraso específico
    // Nuestra animación CSS dura 0.5s(500 ms). Configuramos el temporizador a
    // 500ms exactos para eliminar la clase justo cuando la animación de salto
    // termine, y así el personaje puede volver a saltar
    setTimeout(function(){
        personaje.classList.remove("animar-salto");
    }, 500);
}

// 4. SISTEMA DE PUNTACIÓN

// En lugar de usar setInterval (que suma puntos por tiempo, salte o no),
// añadimos un "escuchador de eventos" (addEventListener) al obstáculo. El evento "animationiteration"
// se dispara automáticamente cada vez que una animación CSS (@keyframes) termina
// un ciclo y vuelve a empezar. En nuestro caso, significa que el obstáculo ha
// cruzado toda la caja sin chocar con nosotros.
obstaculo.addEventListener('animationiteration', function(){
    // Solo sumamos puntos si el juego sigue activo (false)
    if(juegoTerminado === false){
        // Incrementamos el valor numérico en la memoria de puntos
        puntos++;

        // Accedemos a la propiedad innerText del elemento HTML capturado al inicio
        // y sobrescribimos su texto combinando un string ("PUNTOS: ") con la variable
        marcador.innerText = "PUNTOS: " + puntos;
    }
});

// 5. SISTEMA DE COLISIONES

// Para detectar si el jugador pierde, tenemos que evaluar la posición en pantalla
// de ambos elementos constantemente. Creamos un nuevo setInterval(cada 500ms)
// que actúa como el bucle principal de actualización (como el game loop)
const bucleJuego = setInterval(function(){
    // getBoundingClientRect() es un método que devuelve un objeto con el
    // tamaño del elemento y su posición relativa al marco de visualización
    // (viewport). Esto nos genera nuestra hitbox
    const hitboxPersonaje = personaje.getBoundingClientRect();
    const hitboxObstaculo = obstaculo.getBoundingClientRect();

    // Creamos unos márgenes para reducir la caja de colisión (hitbox) del obstáculo.
    // Las imágenes suelen tener fondo transparente alrededor del dibujo. Si no
    // ajustamos esto, el jugador chocará contra el "aire" transparente.
    const margenX = 40; // Ignoramos 40px de los lados de la imagen
    const margenY = 45; // Ignoramos 45px de la parte superior de la imagen

    // Para lo lógica de colisión evaluamos si las coordenadas de los dos
    // rectángulos se superponen. Se preguntan si se tocan horizontalmente,
    // es true si el borde derecho del presonaje a cruzado el borde izquierdo
    // del obstáculo, Y SI el borde izquierdo del personaje no ha pasado el
    // borde derecho del obstáculo
    const colisionX = hitboxPersonaje.right > (hitboxObstaculo.left + margenX) &&
                        hitboxPersonaje.left < (hitboxObstaculo.right - margenX);

    // Si se tocan verticalmente es true, si la base (bottom) del personaje está
    // más abajo (valor númerico mayor), que la parte superior (top) del
    // obstáculo más el margen que hemos definido.
    const colisionY = hitboxPersonaje.bottom > (hitboxObstaculo.top + margenY);

    // Si ambas colisiones ocurren simultáneamente, los elementos están superpuestos
    if(colisionX && colisionY){
        // Actualizamos el estado para bloquear nuevos saltos
        juegoTerminado = true;

        // Usamos clearInterval pasando la referencia de nuestro temporizador
        // Esto detiene este mismo bucle de colisiones para no evaluarlo más
        clearInterval(bucleJuego);

        // Accedemos a los estilos en línea del obstáculo para sobreescribir el CSS
        // Establecemos la animación a none para congelr el elemento en su posición
        // actual
        obstaculo.style.animation = "none";

        // Modificamos la propiedades display de la pantalla de fin (que estaba
        // en none en el archivo CSS) para que se vea la interfaz cuando pierdes
        pantallaFin.style.display = "block";
    }
}, 50); // Evaluamos las posiciones cada 50 milisegundos
