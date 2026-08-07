function numeroAleatorio(max) {

    return Math.floor(
        Math.random() * max
    );

}


function elegir(lista) {

    return lista[
        numeroAleatorio(lista.length)
    ];

}