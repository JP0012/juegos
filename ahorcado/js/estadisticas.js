class Estadisticas {

    constructor() {

        this.ganadas = 0;
        this.perdidas = 0;

        this.racha = 0;
        this.mejorRacha = 0;

        this.puntos = 0;

        this.cargar();

    }


    // ==========================================
    // CARGAR DATOS
    // ==========================================

    cargar() {

        this.ganadas =
            Number(
                localStorage.getItem(
                    "ahorcado_ganadas"
                )
            ) || 0;


        this.perdidas =
            Number(
                localStorage.getItem(
                    "ahorcado_perdidas"
                )
            ) || 0;


        this.racha =
            Number(
                localStorage.getItem(
                    "ahorcado_racha"
                )
            ) || 0;


        this.mejorRacha =
            Number(
                localStorage.getItem(
                    "ahorcado_mejor_racha"
                )
            ) || 0;


        this.puntos =
            Number(
                localStorage.getItem(
                    "ahorcado_puntos"
                )
            ) || 0;

    }


    // ==========================================
    // GUARDAR DATOS
    // ==========================================

    guardar() {

        localStorage.setItem(
            "ahorcado_ganadas",
            this.ganadas
        );


        localStorage.setItem(
            "ahorcado_perdidas",
            this.perdidas
        );


        localStorage.setItem(
            "ahorcado_racha",
            this.racha
        );


        localStorage.setItem(
            "ahorcado_mejor_racha",
            this.mejorRacha
        );


        localStorage.setItem(
            "ahorcado_puntos",
            this.puntos
        );

    }


    // ==========================================
    // LETRA CORRECTA
    // ==========================================

    sumarLetraCorrecta() {

        this.puntos += 10;

        this.guardar();

    }


    // ==========================================
    // LETRA INCORRECTA
    // ==========================================

    sumarLetraIncorrecta() {

        this.puntos -= 5;

        if (this.puntos < 0) {

            this.puntos = 0;

        }

        this.guardar();

    }


    // ==========================================
    // USAR PISTA
    // ==========================================

    usarPista() {

        this.puntos -= 15;

        if (this.puntos < 0) {

            this.puntos = 0;

        }

        this.guardar();

    }


    // ==========================================
    // VICTORIA
    // ==========================================

    sumarVictoria(sinPista) {

    this.ganadas++;

    this.racha++;

    // Puntos por completar la palabra
    this.puntos += 50;

    // Bono únicamente si NO utilizó pista
    if (sinPista) {
        this.puntos += 25;
    }

    // Actualizar mejor racha
    if (this.racha > this.mejorRacha) {
        this.mejorRacha = this.racha;
    }

    this.guardar();

}


    // ==========================================
    // DERROTA
    // ==========================================

    sumarDerrota() {

        this.perdidas++;

        this.racha = 0;

        this.guardar();

    }


    // ==========================================
    // PARTIDAS
    // ==========================================

    partidasJugadas() {

        return (
            this.ganadas +
            this.perdidas
        );

    }


    // ==========================================
    // PORCENTAJE
    // ==========================================

    porcentajeVictorias() {

        const partidas =
            this.partidasJugadas();


        if (partidas === 0) {

            return 0;

        }


        return Math.round(
            (
                this.ganadas /
                partidas
            ) * 100
        );

    }

}