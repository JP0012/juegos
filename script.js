const tarjetas = document.querySelectorAll(".tarjeta");

tarjetas.forEach((tarjeta, indice)=>{

    tarjeta.style.opacity=0;

    tarjeta.style.transform="translateY(60px)";

    setTimeout(()=>{

        tarjeta.style.transition=".6s";

        tarjeta.style.opacity=1;

        tarjeta.style.transform="translateY(0)";

    },300*indice);

});