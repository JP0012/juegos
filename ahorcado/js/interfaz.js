class Interfaz {

    victoria(elemento) {

        elemento.animate(

            [
                {
                    transform: "scale(1)"
                },

                {
                    transform: "scale(1.2)"
                },

                {
                    transform: "scale(1)"
                }
            ],

            {
                duration: 500
            }

        );

    }


    error(elemento) {

        elemento.animate(

            [
                {
                    transform: "translateX(-6px)"
                },

                {
                    transform: "translateX(6px)"
                },

                {
                    transform: "translateX(0)"
                }
            ],

            {
                duration: 300
            }

        );

    }

}