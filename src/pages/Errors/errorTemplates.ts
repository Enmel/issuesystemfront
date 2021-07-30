const templateProblema = `
    <p style="text-align: left;">
        <strong>¿Cual es el problema?</strong>
    </p>
    <p style="text-align: left;">
        Describa detalladamente el problema. Si puede, apoyese de imagenes.
    </p>
    <p style="text-align: left;"><strong>Pasos para reproducir</strong></p>
    <p style="text-align: left;">
        Si es reproducible, indice los pasos para reproducirlo. O un breve relato de lo que se encontraba haciendo cuando ocurrió.
    </p>
    <p style="text-align: left;"><strong>Información de entorno</strong></p>
    <p style="text-align: left;">
        Navegador Web y su versión
        Sistema operativo - Resolución de pantalla

        Ejemplo:

        Mozilla Firefox 15.0
        Windows 10 - 1330x800
    </p>
`;

const templatePeticion = `
    <p style="text-align: left;">
        <strong>¿Qué&nbsp;necesita?</strong>
    </p>
    <p style="text-align: left;">
        Describa detalladamente la caracteristica que necesita. Si puede, apoyese de imagenes.
    </p>
    <p style="text-align: left;"><strong>¿Por qué lo necesita?</strong></p>
    <p style="text-align: left;">
        Explique los motivos que lo llevan a necesitar la caracteristica.
    </p>
`;

const templateList = {
    Ninguna: "",
    Problema: templateProblema,
    Peticion: templatePeticion
}

export {templateList}