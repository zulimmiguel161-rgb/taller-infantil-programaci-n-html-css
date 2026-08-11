// =====================
// MODO DESARROLLO
// =====================
const DEV_MODE = true;

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
const finalMensaje      = document.getElementById("final-mensaje-texto");
const finalBtn          = document.getElementById("final-btn");

// Tour del laboratorio (entre el loading y la primera misión)
const startScreen       = document.getElementById("start-screen");
const startScreenRobot  = document.getElementById("start-screen-robot");
const startScreenSpeech = document.getElementById("start-screen-speech");
const startScreenBtn    = document.getElementById("start-screen-btn");
const startScreenContinueBtn = document.querySelector("#start-screen .button-continue");
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
        recompensa: "¡Tu página tiene imagen! A partir de ahora puedes decorarla libremente con CSS",
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
let tourIntervaloEscritura = null;
let tourEscribiendo = false;
let tourEsperandoAvance = false;
let tourTimeoutId = null;

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
        if (el) {
            el.classList.add("tour-highlight");
            elementosResaltadosActuales.push(el);
        }
    });
}

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
    if (startScreenContinueBtn) startScreenContinueBtn.classList.remove("hidden");

    escribirTextoTour(dialogo.texto, startScreenSpeech, () => finalizarEscrituraTour(dialogo), 45);
}

function escribirTextoTour(texto, elemento, callback, velocidad = 45) {
    let i = 0;
    elemento.textContent = "";
    tourEscribiendo = true;

    tourIntervaloEscritura = setInterval(() => {
        elemento.textContent += texto[i];
        i++;
        if (i === texto.length) {
            clearInterval(tourIntervaloEscritura);
            tourIntervaloEscritura = null;
            tourEscribiendo = false;
            if (callback) callback();
        }
    }, velocidad);
}

function finalizarEscrituraTour(dialogo) {
    if (dialogo.final) {
        if (startScreenBtn) startScreenBtn.classList.remove("hidden");
        if (startScreenContinueBtn) startScreenContinueBtn.classList.add("hidden");
    } else {
        tourEsperandoAvance = true;
        tourTimeoutId = setTimeout(() => {
            tourEsperandoAvance = false;
            siguienteDialogoLaboratorio();
        }, 1600);
    }
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
function manejarClicFlechaTour() {
    if (tourIntervaloEscritura) {
        clearInterval(tourIntervaloEscritura);
        tourIntervaloEscritura = null;
    }
    if (tourTimeoutId) {
        clearTimeout(tourTimeoutId);
        tourTimeoutId = null;
    }

    tourEscribiendo = false;
    tourEsperandoAvance = false;

    finalizarTourLaboratorio(); 
}

if (startScreenContinueBtn) {
    startScreenContinueBtn.addEventListener("click", manejarClicFlechaTour);
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
let intervaloLoading;
let esperandoSiguienteMision = false;

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
// SEGUNDA ETAPA (transición a modo libre de CSS)
// =====================
const cssIntroScreen      = document.getElementById("css-intro-screen");
const cssIntroRobot       = document.getElementById("css-intro-robot");
const cssIntroSpeech      = document.getElementById("css-intro-speech");
const cssIntroBtn         = document.getElementById("css-intro-btn");
const cssIntroContinueBtn = document.querySelector("#css-intro-screen .button-continue");

const dialogosSegundaEtapa = [
    { texto: "¡Lo logramos!" },
    { texto: "Gracias a tu ayuda, pude recuperar todas las partes de mi cuerpo. Sin ti, nunca lo habría conseguido." },
    { texto: "Pero ¿sabes qué es lo más divertido?" },
    { texto: "Ahora que ya aprendiste a construir una página web con HTML, es tu turno de darle personalidad." },
    { texto: "Puedes cambiar los colores, el tamaño de las letras, el fondo e incluso hacer que tu página se vea exactamente como tú la imaginas." },
    { texto: "No existe una única forma correcta de crear una página web. Cada persona tiene ideas diferentes, y eso hace que cada página sea única." },
    {
        texto: "¡Todo constructor necesita buenas herramientas!\nPor eso preparé este Kit de CSS.\nAquí encontrarás pequeños ejemplos para cambiar colores, fondos, tamaños y mucho más.\nSi alguna misión se te complica, puedes volver a consultarlo cuando quieras.",
        resaltar: "#css-help-table"
    },
    {
        texto: "Así que usa tu imaginación, prueba cosas nuevas y diviértete experimentando.\n¡Estoy seguro de que crearás una página increíble!\n¿Listo para darle estilo a nuestra página?",
        final: true
    }
];

let dialogoSegundaEtapaActual = 0;
let etapa2IntervaloEscritura  = null;
let etapa2Escribiendo         = false;
let etapa2EsperandoAvance     = false;
let etapa2TimeoutId           = null;
let etapa2Mostrada            = false;

function reproducirAnimacionMascotaEn(elemento, src) {
    if (!elemento) return;
    const fuente = src || VIDEO_MASCOTA_IDLE;

    if (elemento.getAttribute("src") === fuente) {
        elemento.currentTime = 0;
        elemento.play().catch(() => {});
        return;
    }

    elemento.src = fuente;
    elemento.load();
    elemento.play().catch(() => {});
}

if (cssIntroRobot) {
    cssIntroRobot.addEventListener("error", () => {
        if (cssIntroRobot.getAttribute("src") !== VIDEO_MASCOTA_IDLE) {
            cssIntroRobot.src = VIDEO_MASCOTA_IDLE;
            cssIntroRobot.load();
            cssIntroRobot.play().catch(() => {});
        }
    });
}

function iniciarSegundaEtapa() {
    if (etapa2Mostrada || !cssIntroScreen || !cssIntroSpeech) return;
    etapa2Mostrada = true;

    dialogoSegundaEtapaActual = 0;
    cssIntroScreen.classList.remove("hidden");
    if (cssIntroBtn) cssIntroBtn.classList.add("hidden");

    mostrarDialogoSegundaEtapa();
}

function mostrarDialogoSegundaEtapa() {
    const dialogo = dialogosSegundaEtapa[dialogoSegundaEtapaActual];

    aplicarResaltadoTour(dialogo.resaltar);
    reproducirAnimacionMascotaEn(cssIntroRobot, dialogo.video);

    if (cssIntroBtn) cssIntroBtn.classList.add("hidden");
    if (cssIntroContinueBtn) cssIntroContinueBtn.classList.remove("hidden");

    escribirTextoSegundaEtapa(dialogo.texto, () => finalizarEscrituraSegundaEtapa(dialogo));
}

function escribirTextoSegundaEtapa(texto, callback, velocidad = 45) {
    let i = 0;
    cssIntroSpeech.textContent = "";
    etapa2Escribiendo = true;

    etapa2IntervaloEscritura = setInterval(() => {
        cssIntroSpeech.textContent += texto[i];
        i++;
        if (i === texto.length) {
            clearInterval(etapa2IntervaloEscritura);
            etapa2IntervaloEscritura = null;
            etapa2Escribiendo = false;
            if (callback) callback();
        }
    }, velocidad);
}

function finalizarEscrituraSegundaEtapa(dialogo) {
    if (dialogo.final) {
        if (cssIntroBtn) cssIntroBtn.classList.remove("hidden");
        if (cssIntroContinueBtn) cssIntroContinueBtn.classList.add("hidden");
    } else {
        etapa2EsperandoAvance = true;
        etapa2TimeoutId = setTimeout(() => {
            etapa2EsperandoAvance = false;
            siguienteDialogoSegundaEtapa();
        }, 1600);
    }
}

function siguienteDialogoSegundaEtapa() {
    dialogoSegundaEtapaActual++;
    if (dialogoSegundaEtapaActual < dialogosSegundaEtapa.length) {
        mostrarDialogoSegundaEtapa();
    }
}

function finalizarSegundaEtapa() {
    limpiarResaltadoTour();
    cssIntroScreen.classList.add("hidden");
}

if (cssIntroBtn) {
    cssIntroBtn.addEventListener("click", finalizarSegundaEtapa);
}

function manejarClicFlechaSegundaEtapa() {
    if (etapa2IntervaloEscritura) {
        clearInterval(etapa2IntervaloEscritura);
        etapa2IntervaloEscritura = null;
    }
    if (etapa2TimeoutId) {
        clearTimeout(etapa2TimeoutId);
        etapa2TimeoutId = null;
    }
    etapa2Escribiendo = false;
    etapa2EsperandoAvance = false;

    finalizarSegundaEtapa();
}

if (cssIntroContinueBtn) {
    cssIntroContinueBtn.addEventListener("click", manejarClicFlechaSegundaEtapa);
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
function htmlTieneEtiquetasMalCerradas(codigo) {
    const regex = /<\/?([a-zA-Z][a-zA-Z0-9]*)\b[^>]*>/g;

    const pila = [];

    const etiquetasVoid = new Set([
        "area",
        "base",
        "br",
        "col",
        "embed",
        "hr",
        "img",
        "input",
        "link",
        "meta",
        "param",
        "source",
        "track",
        "wbr"
    ]);

    let match;

    while ((match = regex.exec(codigo)) !== null) {
        const etiqueta = match[1].toLowerCase();
        const etiquetaCompleta = match[0];

        // Estas etiquetas no necesitan cierre
        if (etiquetasVoid.has(etiqueta)) {
            continue;
        }

        // Etiqueta de cierre
        if (etiquetaCompleta.startsWith("</")) {

            // Hay un cierre sin apertura
            if (pila.length === 0) {
                return true;
            }

            const ultima = pila.pop();

            // El cierre no corresponde con la última etiqueta abierta
            if (ultima !== etiqueta) {
                return true;
            }

        } else {

            // Etiqueta de apertura
            pila.push(etiqueta);
        }
    }

    // Si quedaron etiquetas abiertas
    return pila.length > 0;
}
// =====================
// INTRODUCCIÓN
// =====================
function mostrarDialogo() {
    const dialogo = dialogosIntroduccion[dialogoActual];

    reproducirAnimacionMascota(dialogo.video);

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
    escribirTexto(`¡Mucho gusto, ${jugador.nombre}! `, speech, () => {
        guardarProgreso();
        dialogoBienvenidaActual = 0;
        mostrarDialogoBienvenida();
    });
}
function mostrarDialogoBienvenida() {
    const dialogo = dialogosBienvenida[dialogoBienvenidaActual];
    const texto = dialogo.texto.replace("{nombre}", jugador.nombre);

    reproducirAnimacionMascota(dialogo.video);

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
    saludarJugador();
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

    editorScreen.classList.remove("revealing");

    iniciarTourLaboratorio();
}

// =====================
// BOTON   YA TERMINÉ
// =====================
const yaTermineBtn = document.getElementById("ya-termine-btn");

yaTermineBtn.addEventListener("click", () => {
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
    jugador.xp = 1;

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

    const hayOverlayVisible =
        overlayMision.classList.contains("show") || overlayLogro.classList.contains("show");

    if (!hayOverlayVisible) {
        overlayContainer.classList.remove("show");
        overlayContainer.classList.add("hidden");
    }
}


function obtenerParrafoInstrucciones() {
    let parrafo = textMision.querySelector(".mission-instructions-text");
    if (!parrafo) {
        parrafo = document.createElement("div");
        parrafo.className = "mission-instructions-text";
        textMision.appendChild(parrafo);
    }
    return parrafo;
}

// =====================
// INSTRUCCIONES DE MISIÓN, EN PASOS 
// =====================
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
        textMision.classList.remove("hidden");

        const { texto: textoSinLineaVideo, tituloVideo } = extraerLineaVideo(paso.texto);

        parrafo.innerHTML =
            (mensaje ? `<p class="mission-warning">${mensaje}</p>` : "") +
            renderPasosIndicador(pasos.length, pasoActual) +
            renderInstrucciones(textoSinLineaVideo);

        mostrarVideoMision(mision.video, tituloVideo);
    } else {
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

    pasoActual = 0;
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

if (overlayMisionCerrarBtn) {
    overlayMisionCerrarBtn.addEventListener("click", ocultarInstrucciones);
}


if (recordarMisionBtn) {
    recordarMisionBtn.addEventListener("click", () => {
        mostrarInstruccionesMision();
    });
}

function recordarMision() {
    codeEditor.classList.add("input-error");
    mostrarInstruccionesMision("🤖 ¡Casi! Vamos a recordar la misión.");
}
function verificarMision(codigo) {

    if (esperandoSiguienteMision) return;
    if (enModoLibre()) return;

    const mision = obtenerMisionActual();

    if (!mision || typeof mision.validar !== "function") {
        return;
    }

    const htmlIncorrecto = htmlTieneEtiquetasMalCerradas(codigo);
    const misionCorrecta = mision.validar(codigo);

    if (misionCorrecta && !htmlIncorrecto) {

        codeEditor.classList.remove("input-error");

        actualizarPreview();

        completarMision();

        mostrarRecompensa(mision);

    } else {

        codeEditor.classList.add("input-error");

        recordarMision();
    }
}

function obtenerParrafoLogro() {
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

    if (enModoLibre()) {
        actualizarHeader();  
        iniciarSegundaEtapa();
        return;
    }

    mostrarInstruccionesMision();
    actualizarHeader();
}

if (overlayLogroCerrarBtn) {
    overlayLogroCerrarBtn.addEventListener("click", avanzarSiguienteMision);
    if (!overlayLogroCerrarBtn.textContent.trim()) {
        overlayLogroCerrarBtn.innerHTML = "<span>✕</span>";
    }
}

const logroContinueBtn = overlayLogro.querySelector(".mission-button-continue");
if (logroContinueBtn) {
    logroContinueBtn.addEventListener("click", avanzarSiguienteMision);
}

overlayContainer.classList.add("hidden");
ocultarOverlay(overlayMision);
ocultarOverlay(overlayLogro);

// =====================
// EDITOR
// =====================
codeEditor.addEventListener("input", () => {
    const codigo = codeEditor.value;

    // 1. Revisar etiquetas mal cerradas
    const htmlIncorrecto = htmlTieneEtiquetasMalCerradas(codigo);

    if (htmlIncorrecto) {
        codeEditor.classList.add("input-error");
    } else {
        codeEditor.classList.remove("input-error");
    }

    // 2. Actualizar la vista
    actualizarPreview();

    // 3. Si estamos en modo libre, no validar misiones
    if (enModoLibre()) {
        return;
    }

    // 4. Obtener misión actual
    const mision = obtenerMisionActual();

    if (!mision) {
        return;
    }

    // 5. Validar mientras escribe
    const misionCorrecta = mision.validar(codigo);

if (misionCorrecta && !htmlIncorrecto) {
        codeEditor.classList.remove("input-error");

        if (mision.autoValidar) {
            verificarMision(codigo);
        }
    } else {
        codeEditor.classList.add("input-error");
    }
});
function actualizarTodo() {
    actualizarPreview();
}

function actualizarPreview() {
    const css = cssEditorInput ? cssEditorInput.value : "";
    previewPage.innerHTML = `
        <style>${css}</style>
        ${codeEditor.value}
    `;
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

    actualizarPreview();
}
document.querySelectorAll(".css-help-select").forEach((select) => {
    select.addEventListener("change", () => {
        if (!select.value) return;

        const propiedad = select.dataset.propiedad;
        insertarTextoCSS(`${propiedad}: ${select.value};\n`);

        select.value = ""; // vuelve al placeholder, así puede reusarse
    });
});
// =====================
// TABLA DE AYUDA DE CSS (menús desplegables + tamaño de imagen, modo libre)
// =====================
// ===== Tamaño de imagen: selección por click + slider =====
const rangoImagen = document.getElementById("menu-img-tamano");
let imagenSeleccionada = null;
let contadorImagenes = 0;

// Escapa caracteres especiales de regex (BUG 3)
function escaparRegex(texto) {
    return texto.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

// Genera un id que no colisiona con uno ya existente en el código (BUG 5)
function generarIdUnico() {
    let nuevoId;
    do {
        contadorImagenes++;
        nuevoId = `imagen${contadorImagenes}`;
    } while (codeEditor.value.includes(`id="${nuevoId}"`));
    return nuevoId;
}

// Selecciona una imagen al hacer click sobre ella en el preview
document.getElementById("preview-page").addEventListener("click", (e) => {
    if (e.target.tagName !== "IMG") return;

    if (imagenSeleccionada) {
        imagenSeleccionada.style.outline = "";
    }

    imagenSeleccionada = e.target;
    imagenSeleccionada.style.outline = "3px dashed dodgerblue";

    if (!imagenSeleccionada.id) {
        const nuevoId = generarIdUnico();
        // Calcula qué posición ocupa esta imagen entre las que comparten el mismo src (BUG 4)
        const mismasImagenes = Array.from(
            document.querySelectorAll(`#preview-page img[src="${imagenSeleccionada.getAttribute("src")}"]`)
        );
        const indiceEntreIguales = mismasImagenes.indexOf(imagenSeleccionada);

        asignarIdEnEditorHTML(imagenSeleccionada, nuevoId, indiceEntreIguales);

        // BUG 2: actualizarPreview() dentro de asignarIdEnEditorHTML destruye
        // el nodo <img> original (y su outline). Hay que volver a
        // encontrarlo por su nuevo id y reaplicar el resaltado.
        reseleccionarImagen(nuevoId);
    }

    sincronizarSliderConImagen(imagenSeleccionada.id);
});

if (rangoImagen) {
    rangoImagen.addEventListener("input", () => {
        if (!imagenSeleccionada) return;
        actualizarTamanoImagenPorId(imagenSeleccionada.id, rangoImagen.value);
    });
}

function asignarIdEnEditorHTML(img, nuevoId, indiceEntreIguales = 0) {
    const src = img.getAttribute("src");
    const srcEscapado = escaparRegex(src);
    const regexImg = new RegExp(`<img([^>]*src=["']${srcEscapado}["'][^>]*)>`, "g");

    let contador = -1;
    codeEditor.value = codeEditor.value.replace(regexImg, (match, atributos) => {
        contador++; // ahora cuenta TODAS las coincidencias, tengan o no id ya

        if (contador !== indiceEntreIguales) return match; // no es la que buscamos
        if (atributos.includes("id=")) return match;        // por si acaso, no la pisamos

        return `<img${atributos} id="${nuevoId}">`;
    });

    actualizarPreview();
}

// Crea o reemplaza la regla CSS "#idImagen { width: X%; }"
function actualizarTamanoImagenPorId(id, valor) {
    if (!cssEditorInput) return;

    const nuevaRegla = `#${id} {\n  width: ${valor}%;\n}`;
    const contenidoActual = cssEditorInput.value;
    const regexRegla = new RegExp(`#${id}\\s*\\{[^}]*\\}`);

    cssEditorInput.value = regexRegla.test(contenidoActual)
        ? contenidoActual.replace(regexRegla, nuevaRegla)
        : contenidoActual.trim() + "\n\n" + nuevaRegla;

    actualizarPreview();
    reseleccionarImagen(id);
}

function reseleccionarImagen(id) {
    const nuevaImg = document.getElementById(id);
    if (nuevaImg) {
        imagenSeleccionada = nuevaImg;
        imagenSeleccionada.style.outline = "3px dashed dodgerblue";
    }
}

function sincronizarSliderConImagen(id) {
    if (!rangoImagen) return;
    const regexRegla = new RegExp(`#${id}\\s*\\{[^}]*width:\\s*(\\d+)%`);
    const match = cssEditorInput.value.match(regexRegla);
    rangoImagen.value = match ? match[1] : 50;
}
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
if (DEV_MODE) {
    saltarDirectoAlEditor();
} else {
    iniciarJuego();
}