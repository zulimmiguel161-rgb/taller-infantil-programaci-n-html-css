// =====================
// MODO DESARROLLO
// =====================
const DEV_MODE = false;

// =====================
// ELEMENTOS DEL HTML
// =====================
const speech          = document.getElementById("speech");
const nameRow         = document.getElementById("name-row");
const playerName      = document.getElementById("player-name");
const startBtn        = document.getElementById("start-btn");
const welcomeCard     = document.getElementById("welcome-card");
const loadingScreen   = document.getElementById("loading-screen");
const loadingProgress = document.getElementById("loading-progress");
const loadingMessage  = document.getElementById("loading-message");
const pixelReveal     = document.getElementById("pixel-reveal");
const editorScreen    = document.getElementById("editor-screen");
const codeEditor      = document.getElementById("code-editor");
const codeHighlight   = document.querySelector("#code-highlight code");
const previewPage     = document.getElementById("preview-page");
const editorHtml      = document.getElementById("box-editor-html");
const editorCSS       = document.getElementById("box-editor-css");

// Editor de CSS (panel de modo libre)
const cssEditorInput   = document.getElementById("css-editor");

// Overlays de instrucciones y logro (del <section class="overlay-container">)
const overlayContainer    = document.querySelector(".overlay-container");
const overlayMision       = document.querySelector(".overlay-mission");
const overlayLogro        = document.querySelector(".overlay-logro");

const missionInstructions = document.getElementById("mission-instructions");
const robotMision         = document.getElementById("robot-mission");
const textMision          = document.getElementById("text-mision");
const videoMision         = document.getElementById("video-mission");
const missionContinueBtn  = overlayMision.querySelector(".mission-button-continue");

const overlayMisionCerrarBtn = overlayMision.querySelector(".overlay-cerrar");
const overlayLogroCerrarBtn  = overlayLogro.querySelector(".overlay-cerrar");
const logroTexto             = overlayLogro.querySelector(".mission-texto");

const recordarMisionBtn = document.getElementById("recordar-mision-btn");
const descargarBtn      = document.getElementById("descargar-btn");
const finalScreen       = document.getElementById("final-screen");
const finalMensaje      = document.getElementById("final-mensaje");
const finalBtn          = document.getElementById("final-btn");
// =====================
// CONSTANTES
// =====================

const VOID_TAGS = ["img", "br", "hr", "input", "meta", "link"];

const dialogosIntroduccion = [
    { texto: "¡Hola! Yo soy Codi" },
    { texto: "Juntos vamos a crear tu primera página web" },
    { texto: "¿Cuál es tu nombre?" },
    { input: "nombre" }
];

const dialogoLoading = [
    "[ ] Inicializando sistema",
    "[=] Calibrando sensores del robot",
    "[==] Cargando módulos de aprendizaje",
    "[===] Compilando laboratorio",
    "[####] Laboratorio listo"
];

// Solo quedan las 4 misiones de HTML. Al completarlas todas, el juego entra
// en "modo libre de CSS" (ver enModoLibre()): ya no hay más misiones, no hay
// validación, no hay botón "ya terminé" ni mensajes de "casi, inténtalo de
// nuevo". El niño simplemente juega libremente con el panel de CSS.
const misiones = [
    {
        titulo: "Escribe tu primera etiqueta, ¡TU PRIMER HOLA MUNDO!",

        pasos: [
            { texto: "¿Qué es? \n Cuando quieres poner el título más importante de tu página, usas <h1>. \n¡Es el más grande de todos y solo puede haber uno! \n Así se escribe:{{VIDEO}}" },
            { texto: "¡Ahora te toca a ti! \n Escribe un <h1> con: \n Hola mundo, mi nombre es:  Por ejemplo, si te llamas Ana, sería:\n<h1>Hola mundo, mi nombre es Ana</h1>" }
        ],
        video: "videos/mision1-h1.mp4",
        videoLogro: "https://i.pinimg.com/originals/aa/d3/0b/aad30b629170b9b9195542820179cc70.gif",
        recompensa: "¡Lo lograste! Tu página cambió",
        autoValidar: false,
        validar(codigo) {
            return /<h1>[^<]{2,}<\/h1>/i.test(codigo);
        }
    },
    {
        titulo: "Escribe tu nombre con H2",
        pasos: [
            { texto: "¿Qué es? \n Es un título más pequeño que el <h1>, se usa para separar temas dentro de la página. Puedes usar varios en la misma página.\n ¿Cómo se usa? {{VIDEO}}" },
            { texto: "Ejercicio: \n Escribe un <h2> con el nombre de tu película favorita" }
        ],
        video: "videos/mision2-h2.mp4",
        recompensa: "¡Dos títulos en tu página! ¡WOOOOW!",
        videoLogro: "https://i.pinimg.com/originals/4d/32/f1/4d32f142871c29466f303c2c80f24ed4.gif",
        autoValidar: false, // texto libre, el niño decide cuándo terminó
        validar(codigo) {
            return /<h2>[^<]{2,}<\/h2>/i.test(codigo);
        }
    },
    {
        titulo: "Cuenta de qué trata tu película favorita",
        pasos: [
            { texto: "¿Qué es?\n Es texto normal, como cuando escribes una historia o cuentas algo. No tiene negrita ni tamaño grande. \n¿Cómo se usa? {{VIDEO}}" },
            { texto: "Ejercicio:\n Escribe un <p> contando de qué trata tu película favorita" }
        ],
        video: "videos/mision3-p.mp4",
        recompensa: "¡Tu página tiene contenido!",
        videoLogro: "https://i.pinimg.com/originals/91/f6/6f/91f66fae35a6135a42ca2b8de4554964.gif",
        autoValidar: false,
        validar(codigo) {
            return /<p>\s*[^<\s][^<]{2,}<\/p>/i.test(codigo);
        }
    },
    {
        titulo: "Inserta una imagen",
        pasos: [
            { texto: "¿Qué es <img>? \n Es la etiqueta que muestra una imagen en la pantalla. No se cierra con pareja como las demás. \n ¿Cómo se usa? <img src= >{{VIDEO}}" },
            { texto: "Ejercicio:\n Busca una imagen de tu película favorita y pégala aquí:" }
        ],
        // BUGFIX: estos dos campos estaban cruzados. `video` (el tutorial que
        // se inserta con {{VIDEO}} arriba) tenía la URL del GIF de festejo,
        // y `videoLogro` (la pantalla de recompensa) tenía el mp4 local.
        // Se regresaron al mismo patrón usado en las misiones 1-3:
        // `video` = clip local del tutorial, `videoLogro` = gif de festejo.
        // ⚠️ Verifica que "videos/mision4-img.mp4" sea el nombre real de tu archivo.
        video: "videos/mision4-img.mp4",
        recompensa: "¡Tu página tiene imagen! A partir de ahora puedes decorarla libremente con CSS 🎨",
        videoLogro: "videos/logro1.mp4",
        autoValidar: false,
        validar(codigo) {
            return /<img\s+[^>]*src\s*=\s*["'][^"']+["'][^>]*>/i.test(codigo);
        }
    }
];


function renderInstrucciones(texto) {
    const escapar = (str) =>
        str
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;");

    // Dividir el texto en líneas, quitando espacios sobrantes y líneas vacías
    const lineas = texto.split("\n").map(l => l.trim()).filter(l => l !== "");

    const html = lineas
        .map((linea) => {
            let contenido = escapar(linea);

            // Convertir `texto` entre backticks en <code>
            contenido = contenido.replace(/`([^`]+)`/g, "<code>$1</code>");

            // Red de seguridad: si quedara algún {{VIDEO}} suelto (no debería,
            // ver extraerLineaVideo), lo limpiamos para no dejar un hueco.
            contenido = contenido.replace("{{VIDEO}}", "").trim();

            // Detectar si la línea es una pregunta para darle otra clase
            const esPregunta = contenido.startsWith("¿");

            return `<p class="${esPregunta ? "instruccion-pregunta" : "instruccion-texto"}">${contenido}</p>`;
        })
        .join("");

    return html;
}

// Saca del texto la línea que trae el marcador {{VIDEO}} (ej. "¿Cómo se
// usa?") para usarla como título/caption del video, en vez de dejarla
// mezclada con el resto de las instrucciones.
// Devuelve { texto: el resto de las líneas, tituloVideo: esa línea, limpia }
function extraerLineaVideo(texto) {
    const lineas = (texto || "").split("\n");
    let tituloVideo = "";
    const lineasResto = [];

    lineas.forEach((linea) => {
        if (linea.includes("{{VIDEO}}")) {
            tituloVideo = linea.replace("{{VIDEO}}", "").trim();
        } else {
            lineasResto.push(linea);
        }
    });

    return { texto: lineasResto.join("\n"), tituloVideo };
}

// El rectángulo #video-mission tiene dos usos según el paso:
//  - paso explicativo (trae {{VIDEO}}): muestra el título/caption + el
//    <video> del tutorial
//  - paso de pregunta/ejercicio (sin {{VIDEO}}): muestra el texto de la
//    pregunta ahí adentro, en vez de en el bloque normal de texto
function mostrarVideoMision(videoSrc, tituloVideo = "") {
    const caption = tituloVideo
        ? `<p class="video-mission-titulo">${escaparHTML(tituloVideo)}</p>`
        : "";

    videoMision.innerHTML =
        caption +
        `<video class="mission-video" src="${videoSrc}" controls playsinline></video>`;

    videoMision.classList.remove("hidden", "video-mission-texto");
    videoMision.classList.add("show");
}

function mostrarPreguntaEnVideoMision(texto) {
    videoMision.innerHTML = renderInstrucciones(texto);
    videoMision.classList.remove("hidden");
    videoMision.classList.add("show", "video-mission-texto");
}
// =====================
// ESTADO DEL JUGADOR
// =====================
const jugador = {
    nombre: "",
    xp: 0,
    nivel: 1
};

let dialogoActual          = 0;
let progreso               = 0;
let intervaloLoading; // interval id de la barra de carga
let esperandoSiguienteMision = false; // true mientras se muestra el mensaje de recompensa

// =====================
// GUARDAR Y CARGAR
// =====================
function guardarProgreso() {
    localStorage.setItem("jugador", JSON.stringify(jugador));
}

function cargarProgreso() {
    const datos = localStorage.getItem("jugador");

    if (datos) {
        const jugadorGuardado = JSON.parse(datos);
        jugador.nombre = jugadorGuardado.nombre;
        jugador.xp     = jugadorGuardado.xp;
        jugador.nivel  = jugadorGuardado.nivel;
        return true;
    }

    return false;
}

// =====================
// UTILIDADES
// =====================
function escribirTexto(texto, elemento, callback) {
    let i = 0;
    elemento.textContent = "";

    const intervaloTexto = setInterval(() => {
        elemento.textContent += texto[i];
        i++;

        if (i === texto.length) {
            clearInterval(intervaloTexto);
            if (callback) callback();
        }
    }, 50);
}

function cambiarPantalla(pantallaVieja, pantallaNueva) {
    pantallaVieja.classList.remove("show");
    pantallaVieja.classList.add("hidden");

    pantallaNueva.classList.remove("hidden");
    pantallaNueva.classList.add("show");
}

function escaparHTML(texto) {
    return texto
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;");
}

// =====================
// INTRODUCCIÓN
// =====================
function mostrarDialogo() {
    const dialogo = dialogosIntroduccion[dialogoActual];

    if (dialogo.texto) {
        escribirTexto(dialogo.texto, speech, () => {
            setTimeout(() => siguienteDialogo(), 1500);
        });
        return;
    }

    if (dialogo.input === "nombre") {
        nameRow.classList.remove("hidden");
        nameRow.classList.add("show");
        startBtn.classList.remove("hidden");
        startBtn.classList.add("show");
    }
}

function siguienteDialogo() {
    dialogoActual++;
    if (dialogoActual < dialogosIntroduccion.length) {
        mostrarDialogo();
    }
}

// =====================
// JUGADOR
// =====================
function guardarNombre() {
    jugador.nombre = playerName.value.trim();
    if (jugador.nombre === "") jugador.nombre = "programador";
}

function ocultarFormulario() {
    nameRow.classList.remove("show");
    nameRow.classList.add("hidden");
    startBtn.classList.remove("show");
    startBtn.classList.add("hidden");
}

function saludarJugador() {
    escribirTexto(`¡Mucho gusto, ${jugador.nombre}! 😄`, speech, () => {
        guardarProgreso();
        mostrarLoading();
    });
}

function comenzarJuego() {
    guardarNombre();
    ocultarFormulario();
    saludarJugador(); //
}

// =====================
// INICIO DEL JUEGO
// =====================
function iniciarJuego() {
    if (cargarProgreso()) {
        escribirTexto(`¡Hola de nuevo, ${jugador.nombre}! 👋`, speech, () => {
            setTimeout(() => continuarJuego(), 1500);
        });
    } else {
        mostrarDialogo();
    }
}

function continuarJuego() {
    mostrarLoading();
}

// =====================
// LOADING
// =====================
function mostrarLoading() {
    setTimeout(() => {
        welcomeCard.classList.add("fade-out");

        setTimeout(() => {
            // Armamos el editor "detrás de escena" antes de mostrar la
            // pantalla de carga: así, mientras la barra avanza, la grilla
            // de pixeles se va disolviendo y revela el editor ya listo.
            prepararEditorDetrasDeCarga();

            loadingScreen.classList.remove("hidden");
            loadingScreen.classList.add("show");

            crearGrillaPixeles();
            iniciarLoading();
        }, 100);
    }, 1000);
}

function prepararEditorDetrasDeCarga() {
    welcomeCard.classList.remove("show");
    welcomeCard.classList.add("hidden");

    // El editor queda visible y armado detrás de la pantalla de carga,
    // pero sin poder interactuar con él todavía (ver .editor-screen.revealing).
    editorScreen.classList.remove("hidden");
    editorScreen.classList.add("show");
    editorScreen.classList.add("revealing");

    actualizarHeader();
}

function iniciarLoading() {
    progreso = 0;
    actualizarBarra();
    mostrarMensaje();
    intervaloLoading = setInterval(actualizarLoading, 50);
}

function actualizarLoading() {
    aumentarProgreso();
    actualizarBarra();
    mostrarMensaje();
    actualizarGrillaPixeles(progreso);
    verificarFin();
}

function aumentarProgreso() {
    if (progreso < 100) progreso++;
}

function actualizarBarra() {
    loadingProgress.style.width = progreso + "%";
}

function mostrarMensaje() {
    let indiceMensaje = Math.floor(progreso / 20);
    if (indiceMensaje >= dialogoLoading.length) indiceMensaje = dialogoLoading.length - 1;
    loadingMessage.textContent = dialogoLoading[indiceMensaje];
}

function verificarFin() {
    if (progreso >= 100) {
        clearInterval(intervaloLoading);
        loadingMessage.textContent = dialogoLoading[dialogoLoading.length - 1];
        setTimeout(() => finalizarCarga(), 1000);
    }
}

// =====================
// GRILLA DE PIXELES (revela el editor mientras carga)
// =====================
const PIXEL_COLS = 24;
const PIXEL_ROWS = 14;

let pixelCeldas = [];
let pixelOrden  = [];

function crearGrillaPixeles() {
    if (!pixelReveal) return;

    pixelReveal.innerHTML = "";
    pixelCeldas = [];

    const total = PIXEL_COLS * PIXEL_ROWS;

    for (let i = 0; i < total; i++) {
        const celda = document.createElement("span");
        pixelReveal.appendChild(celda);
        pixelCeldas.push(celda);
    }

    // Orden aleatorio para que la disolución no se note como un barrido en fila.
    pixelOrden = pixelCeldas.map((_, i) => i).sort(() => Math.random() - 0.5);
}

function actualizarGrillaPixeles(progresoActual) {
    if (!pixelReveal) return;

    const total = pixelOrden.length;
    if (total === 0) return;

    const celdasFuera = Math.floor((progresoActual / 100) * total);

    for (let i = 0; i < celdasFuera; i++) {
        pixelCeldas[pixelOrden[i]].classList.add("out");
    }
}

// =====================
// FIN DE LA CARGA → ENTRAR AL EDITOR
// =====================
function finalizarCarga() {
    loadingScreen.classList.remove("show");
    loadingScreen.classList.add("hidden");

    // El editor ya estaba armado y visible detrás: ahora se habilita.
    editorScreen.classList.remove("revealing");

    mostrarInstruccionesMision(); // muestra el overlay con la primera misión
}

// =====================
// BOTON   YA TERMINÉ
// =====================
const yaTermineBtn = document.getElementById("ya-termine-btn");

yaTermineBtn.addEventListener("click", () => {
    // Ya no hay misiones de CSS: el botón "ya terminé" siempre valida el HTML.
    // El preview solo se actualiza aquí, al dar clic — así el niño ve el
    // resultado justo cuando dice "ya terminé", sea correcto o no.
    actualizarPreview();
    verificarMision(codeEditor.value);
});

// =====================
// MODO LIBRE (después de completar las 4 misiones de HTML)
// =====================
function enModoLibre() {
    return jugador.xp >= misiones.length;
}

// =====================
// YA TERMINE FUNCION
// =====================
function actualizarBotonTermine() {
    // En modo libre no hay nada que validar: el botón desaparece para siempre.
    if (enModoLibre()) {
        yaTermineBtn.classList.add("hidden");
        yaTermineBtn.classList.remove("show");
        return;
    }

    const mision = obtenerMisionActual();

    editorHtml.appendChild(yaTermineBtn);

    if (mision.autoValidar) {
        yaTermineBtn.classList.add("hidden");
        yaTermineBtn.classList.remove("show");
    } else {
        yaTermineBtn.classList.remove("hidden");
        yaTermineBtn.classList.add("show");
    }
}

function saltarDirectoAlEditor() {
    localStorage.removeItem("jugador");

    jugador.nombre = "Test";
    jugador.xp = 3;

    welcomeCard.classList.add("hidden");
    loadingScreen.classList.add("hidden");

    editorScreen.classList.remove("hidden");
    editorScreen.classList.remove("revealing");
    editorScreen.classList.add("show");

    actualizarHeader();
    mostrarInstruccionesMision();
}

// =====================
// HEADER DE MISIÓN
// =====================
const missionHeaderTitle = document.querySelector(".mission-header-title");
const missionHeaderXp    = document.querySelector(".mission-header-xp");

function actualizarHeader() {
    actualizarBotonTermine();
    actualizarTituloHeader();
    actualizarEstrellas();
    actualizarPanelCSS();
    actualizarPreview();
}
function actualizarTituloHeader() {
    if (enModoLibre()) {
        missionHeaderTitle.innerHTML = `Modo libre de CSS 🎨, ${obtenerNombreJugador()}`;
        return;
    }

    missionHeaderTitle.innerHTML =
        `${obtenerTituloMision()}, ${obtenerNombreJugador()}`;
}

function obtenerMisionActual() {
    // Cuando ya se completaron las 4 misiones de HTML, ya no hay misión activa.
    if (enModoLibre()) return null;
    return misiones[jugador.xp];
}

function obtenerTituloMision() {
    return obtenerMisionActual().titulo;
}

function obtenerNombreJugador() {
    return `${jugador.nombre} <img src="css/img/robot.png" class="robot-inline-icon" alt="robot">`;
}

function actualizarEstrellas() {
    if (!missionHeaderXp) return;

    const totalEstrellas = misiones.length;
    const completadas = Math.min(jugador.xp, totalEstrellas);

    let html = "";

    for (let i = 0; i < totalEstrellas; i++) {
        const src = i < completadas ? "css/img/estrella.svg" : "css/img/estrellaborde.svg";
        html += `<img src="${src}" class="star-icon" alt="estrella">`;
    }

    missionHeaderXp.innerHTML = html;
}
function actualizarPanelCSS() {

    const mostrar = enModoLibre();

    document
        .querySelector(".container-editor-preview")
        .classList.toggle("mostrar-css", mostrar);

    editorScreen.classList.toggle("css-mode", mostrar);

    if (descargarBtn) {
        descargarBtn.classList.toggle("hidden", !mostrar);
        descargarBtn.classList.toggle("show", mostrar);
    }
}
// =====================
// COMPLETAR MISIÓN
// =====================
function completarMision() {
    if (jugador.xp < misiones.length) {
        jugador.xp++;
        guardarProgreso();
        actualizarHeader();
    }
}

// =====================
// OVERLAYS DE MISIÓN Y LOGRO
// =====================
function mostrarOverlay(overlay) {
    overlayContainer.classList.remove("hidden");
    overlayContainer.classList.add("show");

    overlay.classList.remove("hidden");
    overlay.classList.add("show");
}

function ocultarOverlay(overlay) {
    overlay.classList.remove("show");
    overlay.classList.add("hidden");

    // si ya no queda ningún overlay visible, ocultamos también el contenedor
    const hayOverlayVisible =
        overlayMision.classList.contains("show") || overlayLogro.classList.contains("show");

    if (!hayOverlayVisible) {
        overlayContainer.classList.remove("show");
        overlayContainer.classList.add("hidden");
    }
}


function obtenerParrafoInstrucciones() {
    // FIX: el párrafo ahora se inserta dentro de #text-mision (junto al
    // robot), en línea con la estructura del HTML dividido, en vez de
    // como hijo suelto de #mission-instructions.
    let parrafo = textMision.querySelector(".mission-instructions-text");
    if (!parrafo) {
        parrafo = document.createElement("p");
        parrafo.className = "mission-instructions-text";
        textMision.appendChild(parrafo);
    }
    return parrafo;
}

// =====================
// INSTRUCCIONES DE MISIÓN, EN PASOS (estilo wizard)
// =====================
// Cada misión trae `pasos: [{texto}, {texto}]` — normalmente paso 1 es la
// explicación (con el video) y paso 2 es el ejercicio. `pasoActual` indica
// en cuál va el jugador dentro del overlay abierto ahora mismo.
let pasoActual = 0;

function obtenerPasosMision(mision) {
    return mision.pasos && mision.pasos.length ? mision.pasos : [{ texto: "" }];
}

function renderPasosIndicador(total, actual) {
    if (total <= 1) return "";
    let puntos = "";
    for (let i = 0; i < total; i++) {
        puntos += `<span class="paso-dot${i === actual ? " activo" : ""}"></span>`;
    }
    return `<div class="pasos-indicador">${puntos}</div>`;
}

function renderPasoInstrucciones(mensaje = "") {
    const parrafo = obtenerParrafoInstrucciones();
    const mision = obtenerMisionActual();
    const pasos = obtenerPasosMision(mision);
    const paso = pasos[pasoActual];
    const esUltimoPaso = pasoActual === pasos.length - 1;

    const tieneVideo = !!(paso.texto && paso.texto.includes("{{VIDEO}}") && mision.video);

    if (tieneVideo) {
        // Paso explicativo: separamos la línea del video (ej. "¿Cómo se
        // usa?") del resto del texto. El resto va en el bloque normal
        // (junto al robot); esa línea se muestra como título del video.
        const { texto: textoSinLineaVideo, tituloVideo } = extraerLineaVideo(paso.texto);

        parrafo.innerHTML =
            (mensaje ? `<p class="mission-warning">${mensaje}</p>` : "") +
            renderPasosIndicador(pasos.length, pasoActual) +
            renderInstrucciones(textoSinLineaVideo);

        mostrarVideoMision(mision.video, tituloVideo);
    } else {
        // Paso de pregunta/ejercicio: el texto se mueve DENTRO del
        // rectángulo de video. El bloque normal solo conserva el indicador
        // de pasos (y el aviso de "casi" si lo hay).
        parrafo.innerHTML =
            (mensaje ? `<p class="mission-warning">${mensaje}</p>` : "") +
            renderPasosIndicador(pasos.length, pasoActual);

        mostrarPreguntaEnVideoMision(paso.texto || "");
    }

    missionContinueBtn.innerHTML = esUltimoPaso
  ? '<img src="css/img/continuar.svg" alt="check" class="btn-icon">'
  : ' <img src="css/img/continuar.svg" alt="siguiente" class="btn-icon">';
}

function mostrarInstruccionesMision(mensaje = "") {
    if (enModoLibre()) return;

    pasoActual = 0; // toda misión nueva (o recordatorio) arranca desde el paso 1
    renderPasoInstrucciones(mensaje);
    mostrarOverlay(overlayMision);
}

function ocultarInstrucciones() {
    ocultarOverlay(overlayMision);
    actualizarBotonTermine();
}

function manejarContinuarInstrucciones() {
    const mision = obtenerMisionActual();
    if (!mision) { ocultarInstrucciones(); return; }

    const pasos = obtenerPasosMision(mision);

    if (pasoActual < pasos.length - 1) {
        pasoActual++;
        renderPasoInstrucciones();
    } else {
        ocultarInstrucciones();
    }
}

missionContinueBtn.addEventListener("click", manejarContinuarInstrucciones);

// FIX: se usaba `misionCerrarBtn`, que nunca fue declarado (arriba se
// declaró como `overlayMisionCerrarBtn`). Eso lanzaba un ReferenceError
// que detenía TODO el script a partir de aquí.
if (overlayMisionCerrarBtn) {
    // La ✕ siempre cierra de una vez, sin importar en qué paso vayas.
    overlayMisionCerrarBtn.addEventListener("click", ocultarInstrucciones);
}


if (recordarMisionBtn) {
    recordarMisionBtn.addEventListener("click", () => {
        mostrarInstruccionesMision();
    });
}

function recordarMision() {
    mostrarInstruccionesMision("🤖 ¡Casi! Vamos a recordar la misión.");
}

function verificarMision(codigo) {

    if (esperandoSiguienteMision) return;
    if (enModoLibre()) return; // no hay nada que validar en modo libre

    const mision = obtenerMisionActual();
    if (!mision || typeof mision.validar !== "function") return;

    if (mision.validar(codigo)) {
        actualizarPreview();
        completarMision();
        mostrarRecompensa(mision);
    } else {
        recordarMision();
    }
}
function obtenerParrafoLogro() {
    let parrafo = logroTexto.querySelector(".mission-texto-mensaje");
    if (!parrafo) {
        parrafo = document.createElement("p");
        parrafo.className = "mission-texto-mensaje";
        logroTexto.prepend(parrafo);
    }
    return parrafo;
}

function mostrarRecompensa(mision) {
    esperandoSiguienteMision = true;

    const parrafo = obtenerParrafoLogro();

    const media = mision.videoLogro.endsWith(".gif")
        ? `<img class="mission-video" src="${mision.videoLogro}" alt="Celebración">`
        : `<video class="mission-video"
                  src="${mision.videoLogro}"
                  autoplay
                  muted
                  playsinline></video>`;

    parrafo.innerHTML = `
        ${media}
        <p>${mision.recompensa}</p>
    `;

    mostrarOverlay(overlayLogro);
}
function avanzarSiguienteMision() {
    ocultarOverlay(overlayLogro);
    esperandoSiguienteMision = false;

    mostrarInstruccionesMision(); // no hace nada si ya estamos en modo libre
    actualizarHeader();
}

// FIX: `logroCerrarBtn` tampoco existía — se declaró como
// `overlayLogroCerrarBtn` arriba. Este era el segundo ReferenceError.
overlayLogroCerrarBtn.addEventListener("click", avanzarSiguienteMision);
if (!overlayLogroCerrarBtn.textContent.trim()) {
    overlayLogroCerrarBtn.innerHTML = "<span>✕</span>";
}

// El botón "Continuar" dentro de .mission-texto (si lo agregaste) hace lo mismo que la ✕
const logroContinueBtn = overlayLogro.querySelector(".mission-button-continue");
if (logroContinueBtn) {
    logroContinueBtn.addEventListener("click", avanzarSiguienteMision);
}

// Oculta el contenedor y ambos overlays al cargar, por si el HTML no trae "hidden"
overlayContainer.classList.add("hidden");
ocultarOverlay(overlayMision);
ocultarOverlay(overlayLogro);

// =====================
// EDITOR
// =====================
codeEditor.addEventListener("input", () => {
    const codigo = codeEditor.value;
    resaltarCodigo(codigo); // el resaltado de sintaxis sí se actualiza en vivo mientras se escribe

    if (enModoLibre()) {
        actualizarPreview(); // en modo libre el preview SÍ es en vivo
        return;
    }

    // En misiones de HTML el preview NO se actualiza en vivo: se queda
    // quieto hasta que el niño de clic en "Ya terminé" (ver ese listener),
    // para que la sorpresa del resultado aparezca justo en ese momento.
    const mision = obtenerMisionActual();
    if (mision.autoValidar) {
        verificarMision(codigo); // instantáneo, es texto exacto, no hay ambigüedad — sí actualiza el preview si valida bien
    }
    // si autoValidar es false, no tocamos el preview acá — esperamos al botón
});

// Mantiene el resaltado de sintaxis alineado con lo que se escribe al hacer scroll
codeEditor.addEventListener("scroll", () => {
    codeHighlight.scrollTop  = codeEditor.scrollTop;
    codeHighlight.scrollLeft = codeEditor.scrollLeft;
});

// El panel de CSS (modo libre) también actualiza el preview en vivo, tecla por tecla
if (cssEditorInput) {
    cssEditorInput.addEventListener("input", () => {
        actualizarPreview();
    });
}

function actualizarTodo() {
    const codigo = codeEditor.value;
    resaltarCodigo(codigo);
    actualizarPreview();
}

// Combina siempre el HTML acumulado + el CSS acumulado en el preview,
// sin importar en qué misión esté el niño ahora mismo.
function actualizarPreview() {
    const css = cssEditorInput ? cssEditorInput.value : "";
    previewPage.innerHTML = `
        <style>${css}</style>
        ${codeEditor.value}
    `;
}

function resaltarCodigo(codigo) {
    const regexTag = /(<\/?)([a-zA-Z][a-zA-Z0-9]*)([^>]*?)(\/?>)/g;
    const pilaAbiertas = [];
    const tokens = [];
    let ultimoIndice = 0;
    let coincidencia;

    while ((coincidencia = regexTag.exec(codigo)) !== null) {
        const [textoCompleto, apertura, nombreTag, , cierre] = coincidencia;
        const esCierre      = apertura === "</";
        const esAutocerrada = cierre === "/>" || VOID_TAGS.includes(nombreTag.toLowerCase());

        if (coincidencia.index > ultimoIndice) {
            tokens.push({ tipo: "texto", contenido: codigo.slice(ultimoIndice, coincidencia.index) });
        }

        const tagToken = { tipo: "tag", contenido: textoCompleto, sinCerrar: false };

        if (esCierre) {
            const indiceApertura = pilaAbiertas.findIndex(t => t.nombre === nombreTag);
            if (indiceApertura !== -1) pilaAbiertas.splice(indiceApertura, 1);
        } else if (!esAutocerrada) {
            pilaAbiertas.push({ nombre: nombreTag, token: tagToken });
        }

        tokens.push(tagToken);
        ultimoIndice = coincidencia.index + textoCompleto.length;
    }

    if (ultimoIndice < codigo.length) {
        tokens.push({ tipo: "texto", contenido: codigo.slice(ultimoIndice) });
    }

    pilaAbiertas.forEach(item => { item.token.sinCerrar = true; });

    codeHighlight.innerHTML = tokens.map(token => {
        if (token.tipo === "texto") return escaparHTML(token.contenido);
        const clase = token.sinCerrar ? "tag-symbol tag-unclosed" : "tag-symbol";
        return `<span class="${clase}">${escaparHTML(token.contenido)}</span>`;
    }).join("");
}

// =====================
// BOTON AYUDA (símbolos de HTML, mientras se hacen las misiones)
// =====================
const buttonHelp = document.getElementById("box-help-symbols");
const panelSymbols = document.getElementById("panel-symbols");

if (buttonHelp) {
    buttonHelp.addEventListener("click", () => {
        panelSymbols.classList.toggle("hidden");
    });
}

document.querySelectorAll(".symbol-btn").forEach(btn => {
    btn.addEventListener("click", () => {
        insertarTexto(btn.textContent);
    });
});

function insertarTexto(texto) {
    const inicio = codeEditor.selectionStart;
    const fin = codeEditor.selectionEnd;

    codeEditor.setRangeText(texto, inicio, fin, "end");
    codeEditor.focus();

    resaltarCodigo(codeEditor.value);
    actualizarPreview();
}

// =====================
// TABLA DE AYUDA DE CSS (menús desplegables fijos dentro del panel de CSS, modo libre)
// =====================
document.querySelectorAll(".css-help-select").forEach(select => {
    select.addEventListener("change", () => {
        const valor = select.value;
        if (!valor) return;

        const propiedad = select.dataset.propiedad;
        insertarTextoCSS(`${propiedad}: ${valor};`);

        select.value = ""; // vuelve al placeholder para poder elegir de nuevo
    });
});

function insertarTextoCSS(texto) {
    if (!cssEditorInput) return;

    const inicio = cssEditorInput.selectionStart;
    const fin = cssEditorInput.selectionEnd;

    cssEditorInput.setRangeText(texto, inicio, fin, "end");
    cssEditorInput.focus();

    actualizarPreview();
}
// =====================
// PANTALLA FINAL (felicidades)
// =====================
function mostrarFelicidades() {
    if (!finalScreen) return;

    finalMensaje.textContent = `${jugador.nombre}, has terminado el curso 🎉`;

    finalScreen.classList.remove("hidden");
    finalScreen.classList.add("show");
}

if (finalBtn) {
    finalBtn.addEventListener("click", () => {
        finalScreen.classList.remove("show");
        finalScreen.classList.add("hidden");
    });
}
// =====================
// DESCARGAR PÁGINA (modo libre)
// =====================
function descargarPagina() {
    const htmlUsuario = codeEditor.value;
    const cssUsuario  = cssEditorInput ? cssEditorInput.value : "";

    const contenidoHTML = `<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Mi Página - ${jugador.nombre}</title>
    <style>
${cssUsuario}
    </style>
</head>
<body>
${htmlUsuario}
</body>
</html>`;

    descargarArchivo("index.html", contenidoHTML);
        mostrarFelicidades();
}

function descargarArchivo(nombreArchivo, contenido) {
    const blob = new Blob([contenido], { type: "text/html" });
    const url  = URL.createObjectURL(blob);

    const enlace = document.createElement("a");
    enlace.href = url;
    enlace.download = nombreArchivo;
    document.body.appendChild(enlace);
    enlace.click();
    document.body.removeChild(enlace);

    URL.revokeObjectURL(url);
}

if (descargarBtn) {
    descargarBtn.addEventListener("click", descargarPagina);

}

// =====================
// ARRANQUE
// =====================
// BUGFIX: antes esta rama estaba comentada y el juego SIEMPRE arrancaba con
// iniciarJuego(), sin importar el valor de DEV_MODE — el interruptor no
// hacía nada. Ahora sí respeta la bandera de arriba.
if (DEV_MODE) {
    saltarDirectoAlEditor();
} else {
    iniciarJuego();
}