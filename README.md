# Proyectos Prácticos de JavaScript

Este repositorio contiene la entrega de dos proyectos desarrollados como parte de la evaluación práctica de programación frontend. El objetivo principal ha sido poner en práctica la manipulación del DOM, la gestión de eventos, el uso de bucles y la lógica de colisiones.

Ambos proyectos están separados en sus propias carpetas, conteniendo de manera estructurada los archivos HTML, CSS y JavaScript correspondientes.

## Proyecto 1: Tablero de Ajedrez Automático

Este proyecto consiste en la generación dinámica de un tablero de ajedrez de 8x8. En lugar de desarrollar las 64 casillas manualmente en el código fuente, el tablero se dibuja en tiempo de ejecución.

- **Estructura y estilos:** Se utiliza CSS Grid para la disposición exacta de las casillas en un contenedor único.
- **Generación dinámica:** Implementación de bucles `for` anidados (filas y columnas) mediante JavaScript para crear los elementos e insertarlos en el DOM.
- **Lógica de colores:** Se emplea un operador matemático (módulo de la suma de fila y columna) para determinar si la casilla debe recibir la clase CSS de color claro u oscuro.
- **Bonus implementado:** Mediante el uso de arrays, el script asigna y dibuja correctamente los caracteres (piezas de ajedrez) en sus posiciones iniciales de partida al crear las primeras y últimas filas.

## Proyecto 2: Mini-juego de Animación

Desarrollo de un juego de scroll lateral donde un personaje debe evitar colisionar contra obstáculos móviles.

- **Animaciones CSS:** Uso de `@keyframes` para controlar de forma fluida tanto el desplazamiento continuo del obstáculo como el salto del personaje.
- **Control de eventos:** Uso de escuchadores de eventos (`addEventListener`) para reaccionar a la pulsación de la barra espaciadora, añadiendo y retirando clases CSS temporalmente mediante temporizadores (`setTimeout`).
- **Detección de colisiones:** Se ha implementado un bucle principal con `setInterval` que evalúa constantemente las coordenadas en pantalla de los elementos utilizando `getBoundingClientRect()`, detectando superposiciones en los ejes X e Y para desencadenar el fin del juego.
- **Bonus implementado:** Se incluye un marcador de puntos que incrementa cada vez que el obstáculo termina su animación de desplazamiento con éxito, así como una interfaz de "Game Over" interactiva que permite reiniciar la partida.

## Organización del código

Los archivos cumplen con los requisitos de entrega:
- Separación de responsabilidades (`index.html`, `style.css`, `script.js`).
- Nomenclatura descriptiva para las variables en formato camelCase.
- Código documentado con comentarios que explican la función y lógica de cada bloque importante.

---

Tecnologías utilizadas: HTML5 | CSS3 | JavaScript

Trabajo desarrollado por Marta González González