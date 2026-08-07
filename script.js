// =====================
// MODO DESARROLLO
// =====================
const DEV_MODE = false;

// =====================
// ELEMENTOS DEL HTML
// =====================
const robotAvatar     = document.getElementById("robot-avatar");
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

// Tour del laboratorio (entre el loading y la primera misión)
const startScreen       = document.getElementById("start-screen");
const startScreenRobot  = document.getElementById("start-screen-robot");
const startScreenSpeech = document.getElementById("start-screen-speech");
const startScreenBtn    = document.getElementById("start-screen-btn");
const arrowContinue     = document.getElementById("arrow-continue")
// =====================
// CONSTANTES
// =====================

const VOID_TAGS = ["img", "br", "hr", "input", "meta", "link"];

const dialogosIntroduccion = [
    { texto: "¡Hola! soy Codi" },
    { texto: "Te voy a contar una historia…" },
    { texto: "Desperté hace mucho tiempo en este laboratorio..." },
    { texto: "Pero había un problema..." },
    { texto: "¡Mi cuerpo estaba incompleto!" },
    { texto: "Desde entonces intento recuperar mis piezas." },
    { texto: "¡Creo que tú puedes ayudarme!  " },
    { texto: "¡Necesito un compañero de programación!" },
    { texto: "¿Cual es tu nombre?" },
    { input: "nombre" }
];
let dialogoBienvenidaActual = 0;

const dialogosBienvenida = [
    { texto: "¡Qué emoción, {nombre}! Cada misión nos ayudará a recuperar una parte de mi cuerpo." },
    { texto: "Poco a poco volveré a estar completo y descubrirás cómo se crean las páginas web." },
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
        titulo: "MISIÓN 1: Recuperemos mi cabeza",

        pasos: [
            { texto: "¡Empecemos por la parte más importante de mi cuerpo: la cabeza!" },
            { texto: "¿Recuerdas que HTML es mi esqueleto? Pues mi cabeza necesita un   título, porque todos deben saber quién soy" },
            { texto: "En las páginas web, los títulos más importantes se escriben con la etiqueta <h1>." },
            { texto: "Es como un letrero gigante que dice de qué trata la página." },
            { texto: "Tu misión:\n Escribe un título para ayudarme a recuperar mi cabeza.\n Por ejemplo: \n <h1>Hola, soy Codi</h1>\nEse sería un buen título." }
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
        titulo: "MISIÓN 2: Recuperemos mi pecho",
        pasos: [
            { texto:"¡Ya tengo cabeza! Pero todavía necesito mi pecho."},
            { texto:"Un título grande está muy bien, pero a veces necesitamos organizar la información."},
            { texto:"Para eso existe <h2>, piensa que un <h1> es el título de un libro y un <h2> son los nombres de sus capítulos."},
            { texto:"Tu misión:\n Escribe un subtítulo para organizar mi laboratorio. \n Ejemplo: \n<h1>Mi cabeza</h1>\n <h2>Mi cuello</h2>\n<h2>Mi pecho</h2>"}
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
        titulo: "MISIÓN 3: Recuperemos mi voz",
        pasos: [
            { texto: "¡Cada vez estoy más completo!" },
            { texto: "Pero todavía no puedo contar mi historia." },
            { texto: "¿Sabes por qué?" },
            { texto: "Porque todavía no tengo texto." },
            { texto: "Las páginas web usan la etiqueta <p> para escribir párrafos. Es como mi voz. Gracias a ella puedo hablar contigo." },
            { texto: "Tu misión: \n Escribe un mensaje para que pueda presentarme. \nEjemplo: \n<p>Hola, soy Codi y este es mi laboratorio.</p>" },
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
        titulo: "Misión 4: Recuperemos mis ojos",
        pasos: [
            { texto: "¡No lo puedo creer! \n ¿Cómo se usa?{{VIDEO}}" },
            { texto: " Tu misión:\n Agrega mi imagen para devolverme la vista. \n Por ejemplo, una foto mía.\n <img src= > \n La parte src le dice a la computadora dónde encontrar la imagen. Es como darle un mapa para buscarla." }
        ],
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
//    <video> del tutorial, juntos, dentro de #video-mission
//  - paso de pregunta/ejercicio (sin {{VIDEO}}): muestra el texto de la
//    pregunta ahí adentro, con la misma clase .video-mission-titulo
// #video-mission solo se usa en el paso explicativo (el que trae {{VIDEO}}):
// muestra el título/caption + el <video> del tutorial, juntos. El ejercicio
// (paso sin {{VIDEO}}) no lo toca, se muestra en textMision.
function mostrarVideoMision(videoSrc, tituloVideo = "") {

    videoMision.classList.remove("hidden");

    videoMision.innerHTML = `
        ${tituloVideo
            ? `<p class="video-mission-titulo">${escaparHTML(tituloVideo)}</p>`
            : ""
        }

        <video class="mission-video"
            src="${videoSrc}"
            controls
            playsinline>
        </video>
    `;
}
function mostrarPreguntaEnVideoMision(texto) {

    // La pregunta/ejercicio se muestra DENTRO de #video-mission (mismo
    // contenedor que el video), usando la misma clase .video-mission-titulo
    // que el título del video, para que ambos casos luzcan consistentes.
    textMision.classList.add("hidden");

    videoMision.classList.remove("hidden");

    const textoConSaltos = escaparHTML(texto).replace(/\n/g, "<br>");

    videoMision.innerHTML = `<p class="video-mission-titulo">${textoConSaltos}</p>`;
}

// =====================
// ANIMACIÓN DE LA MASCOTA (video por diálogo)
// =====================
// Video que se usa cuando una línea no trae animación propia, o cuando el
// archivo de esa línea todavía no existe (ver fallback en el 'error' de abajo).
const VIDEO_MASCOTA_IDLE = "videos/mascota-idle.mp4";

function reproducirAnimacionMascota(src) {
    if (!robotAvatar) return;

    const fuente = src || VIDEO_MASCOTA_IDLE;

    // Si ya es el video que está sonando, solo lo reinicia en vez de recargarlo
    if (robotAvatar.getAttribute("src") === fuente) {
        robotAvatar.currentTime = 0;
        robotAvatar.play().catch(() => {});
        return;
    }

    robotAvatar.src = fuente;
    robotAvatar.load();
    robotAvatar.play().catch(() => {
        // Autoplay bloqueado por el navegador (pasa si no está muted): no es grave, se ignora.
    });
}

// Si el video de una línea puntual no existe (404), no tronamos: caemos
// en silencio al idle. Así puedes dejar `video` en un diálogo sin crear
// el archivo todavía, sin que se rompa nada.
if (robotAvatar) {
    robotAvatar.addEventListener("error", () => {
        if (robotAvatar.getAttribute("src") !== VIDEO_MASCOTA_IDLE) {
            console.warn(`No se encontró "${robotAvatar.getAttribute("src")}", usando idle.`);
            robotAvatar.src = VIDEO_MASCOTA_IDLE;
            robotAvatar.load();
            robotAvatar.play().catch(() => {});
        }
    });
}

// =====================
// TOUR DEL LABORATORIO
// =====================
// Aparece una sola vez, justo después del loading y antes de la primera
// misión. Codi va hablando desde abajo-izquierda mientras resalta (con la
// clase .tour-highlight) los elementos reales de la pantalla del editor:
// el tablero de misiones, el marcador de piezas, el editor y la preview.
//
// `resaltar` acepta un selector CSS o un arreglo de selectores (por si hay
// que señalar dos cosas a la vez, como el botón de ayuda y el de recordar
// misión). `video` es opcional, igual que en los otros diálogos: si no se
// pone, se usa el idle.
const dialogosLaboratorio = [
    { texto: "¡Bienvenido a mi laboratorio! Déjame enseñarte cómo funciona." },
    { texto: "Este tablero mostrará nuestras misiones.", resaltar: ".mission-header-title" },
    { texto: "Aquí irán apareciendo las piezas que recuperemos.", resaltar: ".mission-header-xp" },
    { texto: "Aquí escribiremos nuestro código.", resaltar: "#box-editor-html" },
    { texto: "Y aquí veremos si funcionó.", resaltar: "#preview-page" },
    {
        texto: "Esto es para que te ayude si no encuentras las teclas y aquí estaré yo para recordarte las instrucciones de cada reto.",
        resaltar: ["#box-help-symbols", "#recordar-mision-btn"]
    },
    { texto: "¿Estás listo?", final: true }
];

let dialogoLaboratorioActual = 0;
let elementosResaltadosActuales = [];

function limpiarResaltadoTour() {
    elementosResaltadosActuales.forEach(el => el.classList.remove("tour-highlight"));
    elementosResaltadosActuales = [];
}

function aplicarResaltadoTour(resaltar) {
    limpiarResaltadoTour();
    if (!resaltar) return;

    const selectores = Array.isArray(resaltar) ? resaltar : [resaltar];
    selectores.forEach(selector => {
        const el = document.querySelector(selector);
        // Si el selector no existe en el HTML todavía, no truena: simplemente
        // no resalta nada esa línea (útil mientras vas ajustando el layout).
        if (el) {
            el.classList.add("tour-highlight");
            elementosResaltadosActuales.push(el);
        }
    });
}

// Video del robot dedicado al tour: independiente del #robot-avatar de la
// intro/bienvenida, porque ese vive en welcome-card, que ya está oculto
// para cuando arranca este tour.
function reproducirAnimacionMascotaTour(src) {
    if (!startScreenRobot) return;
    const fuente = src || VIDEO_MASCOTA_IDLE;

    if (startScreenRobot.getAttribute("src") === fuente) {
        startScreenRobot.currentTime = 0;
        startScreenRobot.play().catch(() => {});
        return;
    }

    startScreenRobot.src = fuente;
    startScreenRobot.load();
    startScreenRobot.play().catch(() => {});
}

if (startScreenRobot) {
    startScreenRobot.addEventListener("error", () => {
        if (startScreenRobot.getAttribute("src") !== VIDEO_MASCOTA_IDLE) {
            startScreenRobot.src = VIDEO_MASCOTA_IDLE;
            startScreenRobot.load();
            startScreenRobot.play().catch(() => {});
        }
    });
}

function iniciarTourLaboratorio() {
    // Si el HTML del tour no existe todavía, no bloqueamos el juego:
    // pasamos directo a la primera misión como antes.
    if (!startScreen || !startScreenSpeech) {
        mostrarInstruccionesMision();
        return;
    }

    dialogoLaboratorioActual = 0;
    startScreen.classList.remove("hidden");
    if (startScreenBtn) startScreenBtn.classList.add("hidden");

    mostrarDialogoLaboratorio();
}

function mostrarDialogoLaboratorio() {
    const dialogo = dialogosLaboratorio[dialogoLaboratorioActual];

    aplicarResaltadoTour(dialogo.resaltar);
    reproducirAnimacionMascotaTour(dialogo.video);

    if (startScreenBtn) startScreenBtn.classList.add("hidden");

    escribirTexto(dialogo.texto, startScreenSpeech, () => {
        if (dialogo.final) {
            if (startScreenBtn) startScreenBtn.classList.remove("hidden");
        } else {
            setTimeout(() => siguienteDialogoLaboratorio(), 1600);
        }
    }, 45); // un poco más lento que la intro para que dé tiempo a ver lo resaltado
}

function siguienteDialogoLaboratorio() {
    dialogoLaboratorioActual++;
    if (dialogoLaboratorioActual < dialogosLaboratorio.length) {
        mostrarDialogoLaboratorio();
    }
}

function finalizarTourLaboratorio() {
    limpiarResaltadoTour();
    startScreen.classList.add("hidden");
    mostrarInstruccionesMision();
}

if (startScreenBtn) {
    startScreenBtn.addEventListener("click", finalizarTourLaboratorio);
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
    try {
        localStorage.setItem("jugador", JSON.stringify(jugador));
    } catch (error) {
        console.warn("No se pudo guardar el progreso:", error);
    }
}

function cargarProgreso() {
    const datos = localStorage.getItem("jugador");
    if (!datos) return false;

    try {
        const jugadorGuardado = JSON.parse(datos);
        jugador.nombre = jugadorGuardado.nombre || "programador";
        jugador.xp     = Number.isFinite(jugadorGuardado.xp) ? jugadorGuardado.xp : 0;
        jugador.nivel  = jugadorGuardado.nivel || 1;
        return true;
    } catch (error) {
        console.warn("Progreso guardado corrupto, se reinicia:", error);
        localStorage.removeItem("jugador");
        return false;
    }
}

// =====================
// UTILIDADES
// =====================
function escribirTexto(texto, elemento, callback, velocidad = 50) {
    let i = 0;
    elemento.textContent = "";

    const intervaloTexto = setInterval(() => {
        elemento.textContent += texto[i];
        i++;

        if (i === texto.length) {
            clearInterval(intervaloTexto);
            if (callback) callback();
        }
    }, velocidad);
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

    reproducirAnimacionMascota(dialogo.video); // usa el video de la línea, o el idle si no trae uno

    if (dialogo.texto) {
        escribirTexto(dialogo.texto, speech, () => {
            setTimeout(() => siguienteDialogo(), 1200);
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
        dialogoBienvenidaActual = 0; // reinicia el diálogo de bienvenida cada vez que se llama
        mostrarDialogoBienvenida();
    });
}
function mostrarDialogoBienvenida() {
    const dialogo = dialogosBienvenida[dialogoBienvenidaActual];
    const texto = dialogo.texto.replace("{nombre}", jugador.nombre);

    reproducirAnimacionMascota(dialogo.video); // usa el video de la línea, o el idle si no trae uno

    // Velocidad más lenta (90ms/letra) que la intro (50ms/letra) para que
    // se alcance a leer bien este bloque, que tiene frases más largas.
    escribirTexto(texto, speech, () => {
        setTimeout(() => siguienteDialogoBienvenida(), 1500);
    }, 90);
}

function siguienteDialogoBienvenida() {
    dialogoBienvenidaActual++;
    if (dialogoBienvenidaActual < dialogosBienvenida.length) {
        mostrarDialogoBienvenida();
    } else {
        mostrarLoading(); 
    }
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

    // FIX/FEATURE: antes iba directo a la primera misión. Ahora primero pasa
    // por el tour del laboratorio (Codi señalando el tablero, editor, etc.);
    // ese tour es quien llama a mostrarInstruccionesMision() al terminar.
    iniciarTourLaboratorio();
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
    //
    // FIX BUG: este contenedor se rellena vía innerHTML con otros <p> y
    // <div> adentro (renderPasosIndicador, renderInstrucciones). Un <p> NO
    // puede contener <p>/<div> como hijos: el navegador cierra el <p> solo
    // en cuanto encuentra el primer hijo de bloque, y el resto del HTML
    // termina como hermano suelto en vez de hijo real. Por eso se usa <div>.
    let parrafo = textMision.querySelector(".mission-instructions-text");
    if (!parrafo) {
        parrafo = document.createElement("div");
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
        // Mostrar el panel superior
        textMision.classList.remove("hidden");

        const { texto: textoSinLineaVideo, tituloVideo } = extraerLineaVideo(paso.texto);

        parrafo.innerHTML =
            (mensaje ? `<p class="mission-warning">${mensaje}</p>` : "") +
            renderPasosIndicador(pasos.length, pasoActual) +
            renderInstrucciones(textoSinLineaVideo);

        mostrarVideoMision(mision.video, tituloVideo);
    } else {
        // Ejercicio (paso sin {{VIDEO}}): va en la ventana normal de
        // instrucciones (textMision), NO en el contenedor del video.
        textMision.classList.remove("hidden");

        parrafo.innerHTML =
            (mensaje ? `<p class="mission-warning">${mensaje}</p>` : "") +
            renderPasosIndicador(pasos.length, pasoActual) +
            renderInstrucciones(paso.texto || "");

        videoMision.classList.add("hidden");
        videoMision.innerHTML = "";
    }

    missionContinueBtn.innerHTML = esUltimoPaso
        ? '<img src="css/img/continuar.svg" alt="check" class="btn-icon">'
        : '<img src="css/img/continuar.svg" alt="siguiente" class="btn-icon">';
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
    // FIX BUG: mismo problema que obtenerParrafoInstrucciones() — este
    // contenedor recibe innerHTML con <img>/<video> y <p> adentro, así que
    // debe ser <div> y no <p> para que el navegador no lo cierre solo.
    let parrafo = logroTexto.querySelector(".mission-texto-mensaje");
    if (!parrafo) {
        parrafo = document.createElement("div");
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
//
// FIX BUG: se agrega el mismo guard `if (overlayLogroCerrarBtn)` que ya
// tiene overlayMisionCerrarBtn más arriba. Antes, si el botón ✕ no existía
// en el HTML de .overlay-logro, esto lanzaba un TypeError que cortaba la
// ejecución de todo lo que viene después (incluido el listener de
// descargarBtn, el de finalBtn, etc).
if (overlayLogroCerrarBtn) {
    overlayLogroCerrarBtn.addEventListener("click", avanzarSiguienteMision);
    if (!overlayLogroCerrarBtn.textContent.trim()) {
        overlayLogroCerrarBtn.innerHTML = "<span>✕</span>";
    }
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