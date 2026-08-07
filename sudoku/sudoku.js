let tableroJuego = [];

let tiempoSegundos = 0;

let intervaloCronometro = null;

let pistasDisponibles = 3;

let solucion = [];

let casillasFijas = [];

let dificultadActual = "facil";

let errores = 0;

let sudokuTerminado = false;

let casillaSeleccionada = null;



document.addEventListener(
    "DOMContentLoaded",
    () => {

        crearTablero();

        configurarNumeros();

        configurarBorrar();

        configurarNuevaPartida();

        configurarPista();

        nuevaPartida();

    }
);



// ==========================================
// CREAR TABLERO VISUAL
// ==========================================

function crearTablero() {

    const tablero =
        document.getElementById("tablero");


    tablero.innerHTML = "";


    for (let i = 0; i < 81; i++) {

        const casilla =
            document.createElement("div");


        casilla.classList.add(
            "casilla"
        );


        casilla.dataset.indice = i;


        tablero.appendChild(
            casilla
        );

        casilla.addEventListener(
            "click",
            () => seleccionarCasilla(casilla)
        );

    }

}



// ==========================================
// NUEVA PARTIDA
// ==========================================

function nuevaPartida() {


    sudokuTerminado = false;

    tiempoSegundos = 0;

    actualizarCronometro();

    iniciarCronometro();

    errores = 0;

    document.getElementById("errores").textContent = "0";

    pistasDisponibles = 3;

    document.getElementById(
        "pistas"
    ).textContent = "3";

    solucion =
        generarSudoku();


    tableroJuego =
        copiarTablero(solucion);


    eliminarNumeros();



    // Guardamos cuáles quedan bloqueadas

    casillasFijas =
        tableroJuego.map(
            fila =>
                fila.map(
                    valor =>
                        valor !== 0
                )
        );



    mostrarTablero();

}



// ==========================================
// GENERAR SUDOKU
// ==========================================

function generarSudoku() {


    let tablero =
        Array.from(
            {
                length: 9
            },
            () =>
                Array(9).fill(0)
        );


    resolverSudoku(tablero);


    return tablero;

}



// ==========================================
// RESOLVER SUDOKU
// ==========================================

function resolverSudoku(tablero) {


    let fila = -1;

    let columna = -1;


    let vacio = false;



    for(let i = 0; i < 9; i++) {

        for(let j = 0; j < 9; j++) {


            if(tablero[i][j] === 0) {

                fila = i;

                columna = j;

                vacio = true;

                break;

            }

        }


        if(vacio) {

            break;

        }

    }



    if(!vacio) {

        return true;

    }



    let numeros =
        mezclarNumeros();



    for(let numero of numeros) {


        if(
            esValido(
                tablero,
                fila,
                columna,
                numero
            )
        ) {


            tablero[fila][columna] =
                numero;



            if(
                resolverSudoku(tablero)
            ) {

                return true;

            }


            tablero[fila][columna] = 0;

        }

    }


    return false;

}



// ==========================================
// VALIDAR NÚMERO
// ==========================================

function esValido(
    tablero,
    fila,
    columna,
    numero
) {


    // FILA

    for(let i = 0; i < 9; i++) {

        if(
            tablero[fila][i] === numero
        ) {

            return false;

        }

    }



    // COLUMNA

    for(let i = 0; i < 9; i++) {

        if(
            tablero[i][columna] === numero
        ) {

            return false;

        }

    }



    // CUADRO 3x3

    let inicioFila =
        Math.floor(fila / 3) * 3;


    let inicioColumna =
        Math.floor(columna / 3) * 3;



    for(
        let i = 0;
        i < 3;
        i++
    ) {

        for(
            let j = 0;
            j < 3;
            j++
        ) {


            if(
                tablero[
                    inicioFila + i
                ][
                    inicioColumna + j
                ] === numero
            ) {

                return false;

            }

        }

    }


    return true;

}



// ==========================================
// MEZCLAR NÚMEROS
// ==========================================

function mezclarNumeros() {

    let numeros =
        [
            1,2,3,4,5,6,7,8,9
        ];


    return numeros.sort(
        () =>
            Math.random() - 0.5
    );

}



// ==========================================
// COPIAR TABLERO
// ==========================================

function copiarTablero(tablero) {

    return tablero.map(
        fila =>
            [
                ...fila
            ]
    );

}

// ==========================================
// QUITAR NÚMEROS SEGÚN DIFICULTAD
// ==========================================

function eliminarNumeros() {


    let cantidad;


    switch(dificultadActual) {


        case "facil":

            cantidad = 35;

            break;


        case "medio":

            cantidad = 45;

            break;


        case "dificil":

            cantidad = 55;

            break;

    }



    let eliminados = 0;



    while(
        eliminados < cantidad
    ) {


        let fila =
            Math.floor(
                Math.random() * 9
            );


        let columna =
            Math.floor(
                Math.random() * 9
            );



        if(
            tableroJuego[fila][columna] !== 0
        ) {


            tableroJuego[fila][columna] = 0;


            eliminados++;

        }

    }

}

// ==========================================
// MOSTRAR TABLERO
// ==========================================

function mostrarTablero() {


    const casillas =
        document.querySelectorAll(
            ".casilla"
        );



    casillas.forEach(
        (casilla, indice) => {


            let fila =
                Math.floor(
                    indice / 9
                );


            let columna =
                indice % 9;



            let valor =
                tableroJuego[fila][columna];

            casilla.dataset.indice =
                indice;


            casilla.textContent =
                valor === 0
                ? ""
                : valor;



            if(valor !== 0) {

    casilla.classList.add(
        "fija"
    );

}
else {

    casilla.classList.remove(
        "fija"
    );

}


// Limpiar estados visuales anteriores

casilla.classList.remove(
    "seleccionada"
);

casilla.classList.remove(
    "completado"
);

casilla.classList.remove(
    "error"
);

        }
    );

}

// ==========================================
// SELECCIONAR CASILLA
// ==========================================

function seleccionarCasilla(casilla) {


    // Quitar selección anterior

    document
        .querySelectorAll(".casilla")
        .forEach(c => {

            c.classList.remove(
                "seleccionada"
            );

        });



    // Guardar selección

    casillaSeleccionada =
        casilla;



    casilla.classList.add(
        "seleccionada"
    );

}

// ==========================================
// BOTONES DE NÚMEROS
// ==========================================

function configurarNumeros() {


    const botones =
        document.querySelectorAll(
            ".numero-btn"
        );



    botones.forEach(
        boton => {


            boton.addEventListener(
                "click",
                () => {


                    let numero =
                        boton.dataset.numero;


                    colocarNumero(
                        numero
                    );


                }
            );


        }
    );

}

// ==========================================
// COLOCAR NÚMERO
// ==========================================

function colocarNumero(numero) {


    // Si el Sudoku ya terminó, no permitir cambios

    if(sudokuTerminado) {

        return;

    }



    // Si no hay ninguna casilla seleccionada

    if(!casillaSeleccionada) {

        return;

    }



    let indice =
        Number(
            casillaSeleccionada.dataset.indice
        );



    let fila =
        Math.floor(
            indice / 9
        );


    let columna =
        indice % 9;



    // No permitir modificar casillas fijas

    if(
        casillasFijas[fila][columna]
    ){

        return;

    }



    let numeroIngresado =
        Number(numero);



    // ==========================================
    // VALIDAR NÚMERO
    // ==========================================

    if(
        validarMovimiento(
            fila,
            columna,
            numeroIngresado
        )
    ){

        // Número correcto

        tableroJuego[fila][columna] =
            numeroIngresado;


    }
    else{

        // Número incorrecto

        errores++;


        document.getElementById(
            "errores"
        ).textContent =
            errores;


        mostrarMensaje(
            "❌ Número incorrecto"
        );


        return;

    }



    // ==========================================
    // ACTUALIZAR TABLERO
    // ==========================================

    mostrarTablero();



    // Mantener seleccionada la casilla

    seleccionarCasilla(
        document.querySelector(
            `[data-indice="${indice}"]`
        )
    );



    // ==========================================
    // COMPROBAR VICTORIA
    // ==========================================

    if(
        comprobarVictoria()
    ){

        sudokuCompletado();

    }

}

// ==========================================
// BORRAR
// ==========================================

function configurarBorrar(){


    const botonBorrar =
        document.getElementById("borrar");


    botonBorrar.addEventListener(
        "click",
        function(){


            console.log(
                "Botón borrar presionado"
            );


            if(casillaSeleccionada === null){

                console.log(
                    "No hay casilla seleccionada"
                );

                return;

            }



            const indice =
                Number(
                    casillaSeleccionada.dataset.indice
                );


            const fila =
                Math.floor(
                    indice / 9
                );


            const columna =
                indice % 9;



            console.log(
                "Borrando fila:",
                fila,
                "columna:",
                columna
            );



            // si es fija no borrar

            if(
                casillasFijas[fila][columna]
            ){

                console.log(
                    "Es una casilla fija"
                );

                return;

            }



            tableroJuego[fila][columna] = 0;


            mostrarTablero();


            seleccionarCasilla(
                document.querySelector(
                    `[data-indice="${indice}"]`
                )
            );


        }
    );


}

// ==========================================
// VALIDAR MOVIMIENTO
// ==========================================

function validarMovimiento(
    fila,
    columna,
    numero
) {


    return (
        solucion[fila][columna] === numero
    );


}  

// ==========================================
// MENSAJES
// ==========================================

function mostrarMensaje(texto){

    const mensaje =
        document.getElementById(
            "mensaje"
        );


    mensaje.textContent =
        texto;


    setTimeout(
        () => {

            mensaje.textContent = "";

        },
        2000
    );

}

// ==========================================
// COMPROBAR VICTORIA
// ==========================================

function comprobarVictoria() {

    for (let fila = 0; fila < 9; fila++) {

        for (let columna = 0; columna < 9; columna++) {

            // Si todavía hay una casilla vacía
            if (tableroJuego[fila][columna] === 0) {

                return false;

            }

            // Si algún número no coincide con la solución
            if (
                tableroJuego[fila][columna] !==
                solucion[fila][columna]
            ) {

                return false;

            }

        }

    }

    return true;

}

// ==========================================
// SUDOKU COMPLETADO
// ==========================================

function sudokuCompletado() {

    sudokuTerminado = true;

    detenerCronometro();


    mostrarMensaje(
        "🎉 ¡Sudoku completado!"
    );


    document
        .querySelectorAll(".casilla")
        .forEach(casilla => {

            casilla.classList.add(
                "completado"
            );

        });

}

// ==========================================
// CONFIGURAR BOTÓN NUEVA PARTIDA
// ==========================================

function configurarNuevaPartida() {

    document
        .getElementById("nuevaPartida")
        .addEventListener(
            "click",
            () => {

                nuevaPartida();

            }
        );

}

// ==========================================
// CRONÓMETRO
// ==========================================

function iniciarCronometro() {

    detenerCronometro();


    intervaloCronometro =
        setInterval(
            () => {

                tiempoSegundos++;

                actualizarCronometro();

            },
            1000
        );

}

function detenerCronometro() {

    if(intervaloCronometro !== null) {

        clearInterval(
            intervaloCronometro
        );

        intervaloCronometro = null;

    }

}

function actualizarCronometro() {

    let minutos =
        Math.floor(
            tiempoSegundos / 60
        );


    let segundos =
        tiempoSegundos % 60;


    minutos =
        String(minutos).padStart(
            2,
            "0"
        );


    segundos =
        String(segundos).padStart(
            2,
            "0"
        );


    document.getElementById(
        "tiempo"
    ).textContent =
        `${minutos}:${segundos}`;

}

// ==========================================
// CONFIGURAR PISTA
// ==========================================

function configurarPista() {

    document
        .getElementById("pista")
        .addEventListener(
            "click",
            () => {

                usarPista();

            }
        );

}

// ==========================================
// USAR PISTA
// ==========================================

function usarPista() {


    if(sudokuTerminado) {

        return;

    }



    if(pistasDisponibles <= 0) {

        mostrarMensaje(
            "❌ No tienes más pistas"
        );

        return;

    }



    if(!casillaSeleccionada) {

        mostrarMensaje(
            "💡 Selecciona una casilla vacía"
        );

        return;

    }



    const indice =
        Number(
            casillaSeleccionada.dataset.indice
        );


    const fila =
        Math.floor(
            indice / 9
        );


    const columna =
        indice % 9;



    // No usar pista en casilla fija

    if(
        casillasFijas[fila][columna]
    ) {

        mostrarMensaje(
            "Esta casilla ya tiene un número"
        );

        return;

    }



    // Si ya tiene número

    if(
        tableroJuego[fila][columna] !== 0
    ) {

        mostrarMensaje(
            "Esta casilla ya tiene un número"
        );

        return;

    }



    // Colocar solución correcta

    tableroJuego[fila][columna] =
        solucion[fila][columna];



    // Convertirla en fija

    casillasFijas[fila][columna] =
        true;



    pistasDisponibles--;



    document.getElementById(
        "pistas"
    ).textContent =
        pistasDisponibles;



    mostrarTablero();



    seleccionarCasilla(
        document.querySelector(
            `[data-indice="${indice}"]`
        )
    );



    mostrarMensaje(
        "💡 ¡Pista utilizada!"
    );



    // Comprobar victoria

    if(
        comprobarVictoria()
    ) {

        sudokuCompletado();

    }

}