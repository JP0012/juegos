class JuegoAhorcado {

    constructor() {

        console.log("🎮 Iniciando Ahorcado...");


        // ==========================================
        // ELEMENTOS HTML
        // ==========================================

        this.canvas =
            document.getElementById("canvas");

        this.ctx =
            this.canvas.getContext("2d");


        this.teclado =
            document.getElementById("teclado");


        this.palabraHTML =
            document.getElementById("palabra");


        this.categoriaHTML =
            document.getElementById("categoria");


        this.vidasHTML =
            document.getElementById("vidas");

        this.pistaTexto =
            document.getElementById("pistaTexto");

        this.mensajeHTML =
            document.getElementById("mensaje");


        this.progreso =
            document.getElementById("progreso");


        this.ganadasHTML =
            document.getElementById("ganadas");


        this.perdidasHTML =
            document.getElementById("perdidas");


        this.puntosHTML =
            document.getElementById("puntos");


        this.rachaHTML =
            document.getElementById("racha");


        this.btnNuevo =
            document.getElementById("nuevo");


        this.btnPista =
            document.getElementById("pista");

        
        this.btnDesconectar =
            document.getElementById("desconectar");


        this.dificultadSelect =
            document.getElementById("dificultad");


        // ==========================================
        // CONFIGURACIÓN
        // ==========================================

        this.MAX_ERRORES = 6;


        // ==========================================
        // ESTADO
        // ==========================================

        this.palabra = "";

        this.categoria = "";

        this.letrasAdivinadas = [];

        this.errores = 0;

        this.juegoTerminado = false;

        this.usoPista = false;


        // ==========================================
        // MÓDULOS
        // ==========================================

        this.dibujo =
            new Dibujo(this.ctx);


        this.interfaz =
            new Interfaz();


        this.estadisticas =
            new Estadisticas();


        this.sonidos =
            new Sonidos();


        // ==========================================
        // INICIAR
        // ==========================================

        this.crearTeclado();

        this.configurarEventos();

        this.actualizarMarcador();

        this.nuevaPartida();

    }


    // ==========================================
    // EVENTOS
    // ==========================================

    configurarEventos() {

        this.btnNuevo.addEventListener(
            "click",
            () => this.nuevaPartida()
        );


        this.btnPista.addEventListener(
            "click",
            () => this.usarPista()
        );


        this.btnDesconectar.addEventListener(
            "click",
            () => this.desconectar()
        );


        this.dificultadSelect.addEventListener(
            "change",
            () => this.nuevaPartida()
        );


        document.addEventListener(
            "keydown",
            (event) => {

                const letra =
                    event.key.toUpperCase();


                if (/^[A-ZÑ]$/.test(letra)) {

                    this.intentarLetra(letra);

                }

            }
        );

    }


    // ==========================================
    // NUEVA PARTIDA
    // ==========================================

    nuevaPartida() {

        this.juegoTerminado = false;

        this.usoPista = false;

        this.letrasAdivinadas = [];

        this.pistaTexto.textContent = "";

        this.errores = 0;


        const dificultad =
            this.dificultadSelect.value;


        const categorias =
            Object.keys(
                BASE_PALABRAS[dificultad]
            );


        this.categoria =
            elegir(categorias);


        const lista =
        BASE_PALABRAS[dificultad][this.categoria];

        const seleccion =
        elegir(lista);

        this.palabra =
        seleccion.palabra;

        this.pistaActual =
        seleccion.pista;


        console.log(
            "Nueva palabra:",
            this.palabra
        );


        console.log(
            "Categoría:",
            this.categoria
        );


        this.categoriaHTML.textContent =
            this.categoria;


        this.mensajeHTML.textContent =
            "";


        this.dibujo.limpiar();


        this.actualizarPalabra();

        this.actualizarVidas();

        this.habilitarTeclado();

    }


    // ==========================================
    // TECLADO
    // ==========================================

    crearTeclado() {

        this.teclado.innerHTML = "";


        const letras =
            "ABCDEFGHIJKLMNÑOPQRSTUVWXYZ";


        for (const letra of letras) {

            const boton =
                document.createElement("button");


            boton.textContent =
                letra;


            boton.dataset.letra =
                letra;


            boton.addEventListener(
                "click",
                () => this.intentarLetra(letra)
            );


            this.teclado.appendChild(
                boton
            );

        }

    }


    // ==========================================
    // INTENTAR LETRA
    // ==========================================

    intentarLetra(letra) {

        if (this.juegoTerminado) {
            return;
        }


        const boton =
            document.querySelector(
                `[data-letra="${letra}"]`
            );


        if (!boton || boton.disabled) {
            return;
        }


        boton.disabled = true;


        if (this.palabra.includes(letra)) {

            boton.classList.add("correcta");

            this.letrasAdivinadas.push(
                letra
            );

            this.estadisticas.sumarLetraCorrecta();

            this.actualizarMarcador();

            this.actualizarPalabra();

            this.sonidos.acierto();

            this.comprobarVictoria();

        }

        else {

            boton.classList.add("incorrecta");

            this.errores++;

            this.estadisticas.sumarLetraIncorrecta();

            this.actualizarMarcador();

            this.actualizarVidas();

            this.dibujo.dibujar(
                this.errores
            );

            this.sonidos.error();

            this.interfaz.error(
                this.canvas
            );

            this.comprobarDerrota();

        }

    }


    // ==========================================
    // PALABRA
    // ==========================================

    actualizarPalabra() {

        this.palabraHTML.innerHTML = "";


        for (const letra of this.palabra) {

            if (
                this.letrasAdivinadas
                    .includes(letra)
            ) {

                this.palabraHTML.innerHTML +=
                    letra + " ";

            }

            else {

                this.palabraHTML.innerHTML +=
                    "_ ";

            }

        }

    }


    // ==========================================
    // VIDAS
    // ==========================================

    actualizarVidas() {

        const restantes =
            this.MAX_ERRORES -
            this.errores;


        this.vidasHTML.innerHTML =
            "❤️".repeat(restantes);


        const porcentaje =
            (restantes /
            this.MAX_ERRORES) *
            100;


        this.progreso.style.width =
            porcentaje + "%";


        if (porcentaje > 60) {

            this.progreso.style.background =
                "#4CAF50";

        }

        else if (porcentaje > 30) {

            this.progreso.style.background =
                "#FFC107";

        }

        else {

            this.progreso.style.background =
                "#F44336";

        }

    }


    // ==========================================
    // VICTORIA
    // ==========================================

    comprobarVictoria() {

        const gano =
            [...this.palabra].every(
                letra =>
                    this.letrasAdivinadas
                        .includes(letra)
            );


        if (!gano) {
            return;
        }


        this.juegoTerminado = true;


        this.mensajeHTML.innerHTML =
            "🎉 ¡GANASTE!";


        this.estadisticas.sumarVictoria(!this.usoPista);


        this.actualizarMarcador();


        this.sonidos.victoria();


        this.interfaz.victoria(
            this.mensajeHTML
        );


        this.deshabilitarTeclado();

    }


    // ==========================================
    // DERROTA
    // ==========================================

    comprobarDerrota() {

        if (
            this.errores <
            this.MAX_ERRORES
        ) {

            return;

        }


        this.juegoTerminado = true;


        this.mensajeHTML.innerHTML =
            `💀 Perdiste. La palabra era:
            <b>${this.palabra}</b>`;


        this.palabraHTML.innerHTML =
            this.palabra;


        this.estadisticas
            .sumarDerrota();


        this.actualizarMarcador();


        this.sonidos.derrota();


        this.interfaz.error(
            this.canvas
        );


        this.deshabilitarTeclado();

    }


    // ==========================================
    // PISTA
    // ==========================================

    usarPista() {

    if (this.juegoTerminado) {
        return;
    }


    if (this.usoPista) {

        this.pistaTexto.textContent =
            "💡 Ya utilizaste la pista de esta partida.";

        return;

    }


    this.usoPista = true;


    this.estadisticas.usarPista();


    this.actualizarMarcador();


    this.pistaTexto.textContent =
        "💡 " + this.pistaActual;

    }


    // ==========================================
    // TECLADO
    // ==========================================

    habilitarTeclado() {

        document
            .querySelectorAll(
                "#teclado button"
            )
            .forEach(boton => {

                boton.disabled = false;

                boton.className = "";

            });

    }


    deshabilitarTeclado() {

        document
            .querySelectorAll(
                "#teclado button"
            )
            .forEach(boton => {

                boton.disabled = true;

            });

    }


    // ==========================================
    // ESTADÍSTICAS
    // ==========================================

    actualizarMarcador() {

    this.ganadasHTML.textContent =
        this.estadisticas.ganadas;


    this.perdidasHTML.textContent =
        this.estadisticas.perdidas;


    this.puntosHTML.textContent =
        this.estadisticas.puntos;


    this.rachaHTML.textContent =
        this.estadisticas.racha;

    }


    desconectar() {

    const confirmar =
        confirm(
            "¿Seguro que quieres desconectarte?\n\n" +
            "Se eliminarán todas tus estadísticas y comenzarás desde 0."
        );

    if (!confirmar) {
        return;
    }


    // Eliminar estadísticas
    localStorage.removeItem(
        "ahorcado_ganadas"
    );

    localStorage.removeItem(
        "ahorcado_perdidas"
    );

    localStorage.removeItem(
        "ahorcado_racha"
    );

    localStorage.removeItem(
        "ahorcado_mejor_racha"
    );

    localStorage.removeItem(
        "ahorcado_puntos"
    );


    // Reiniciar las estadísticas actuales
    this.estadisticas.ganadas = 0;

    this.estadisticas.perdidas = 0;

    this.estadisticas.racha = 0;

    this.estadisticas.mejorRacha = 0;

    this.estadisticas.puntos = 0;


    // Actualizar la interfaz
    this.actualizarMarcador();


    // Iniciar una partida nueva
    this.nuevaPartida();


    alert(
        "Se han eliminado tus estadísticas. ¡Comenzamos desde 0!"
    );

}

}


// ==============================================
// INICIAR
// ==============================================

document.addEventListener(
    "DOMContentLoaded",
    () => {

        new JuegoAhorcado();

    }
);