class Dibujo {

    constructor(ctx) {

        this.ctx = ctx;

    }

    limpiar() {

        this.ctx.clearRect(
            0,
            0,
            300,
            350
        );

    }

    dibujar(error) {

        const ctx = this.ctx;

        ctx.lineWidth = 4;
        ctx.strokeStyle = "#222";
        ctx.lineCap = "round";

        switch (error) {

            case 1:

                ctx.beginPath();

                ctx.moveTo(30, 320);
                ctx.lineTo(220, 320);

                ctx.stroke();

                break;


            case 2:

                ctx.beginPath();

                ctx.moveTo(80, 320);
                ctx.lineTo(80, 30);
                ctx.lineTo(180, 30);
                ctx.lineTo(180, 70);

                ctx.stroke();

                break;


            case 3:

                ctx.beginPath();

                ctx.arc(
                    180,
                    95,
                    25,
                    0,
                    Math.PI * 2
                );

                ctx.stroke();

                break;


            case 4:

                ctx.beginPath();

                ctx.moveTo(180, 120);
                ctx.lineTo(180, 210);

                ctx.stroke();

                break;


            case 5:

                ctx.beginPath();

                ctx.moveTo(180, 140);
                ctx.lineTo(150, 180);

                ctx.moveTo(180, 140);
                ctx.lineTo(210, 180);

                ctx.stroke();

                break;


            case 6:

                ctx.beginPath();

                ctx.moveTo(180, 210);
                ctx.lineTo(150, 260);

                ctx.moveTo(180, 210);
                ctx.lineTo(210, 260);

                ctx.stroke();

                break;

        }

    }

}