/**
 * Adaptador de Logs para JavaScript Browser
 * Envía logs al ServidorCentralLogs vía HTTP POST
 * El nombre del proyecto debe ser la carpeta donde se encuentra el proyecto relativa a la raíz del workspace
 * 
 * INTERCEPTA AUTOMÁTICAMENTE: console.log, console.error, console.warn, console.info, console.debug,
 * console.assert, console.trace, console.count, console.countReset, console.time, console.timeEnd,
 * console.timeLog, console.group, console.groupCollapsed, console.groupEnd, console.clear,
 * console.table, console.dir, console.dirxml
 */

const URL_SERVIDOR = 'http://127.0.0.1:9999';

class AdaptadorLogs {
  constructor() {
    this.inicializado = false;
    this.nombreProyecto = 'Frontend';
    this.consolaOriginal = {};
    this.interceptado = false;
    this.contadores = {};
    this.temporizadores = {};
    this.nivelGrupo = 0;
  }

  async _enviar(ruta, payload) {
    try {
      await fetch(`${URL_SERVIDOR}${ruta}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
    } catch (_) {
      // Fallback silencioso - no usar console aquí para evitar recursión
    }
  }

  /**
   * Inicializa el sistema enviando el encabezado de sesión e intercepta console nativa
   * @param {string} nombreProyecto - Nombre del proyecto (preferiblemente la carpeta del proyecto)
   */
  initializeSystem(nombreProyecto) {
    if (this.inicializado) return;
    this.nombreProyecto = nombreProyecto;
    this.inicializado = true;

    this._enviar('/sesion', {
      proyecto: nombreProyecto,
      versiones: {
        'Browser': navigator.userAgent.substring(0, 60),
        'URL': window.location.origin,
      },
    });

    // Interceptar console nativa automáticamente
    this.interceptarConsolaNativa();
  }

  /**
   * Intercepta todos los métodos nativos de console para capturar logs automáticamente
   */
  interceptarConsolaNativa() {
    if (this.interceptado || typeof console === 'undefined') return;
    this.interceptado = true;

    // Guardar referencias originales
    this.consolaOriginal = {
      log: console.log.bind(console),
      info: console.info.bind(console),
      warn: console.warn.bind(console),
      error: console.error.bind(console),
      debug: console.debug.bind(console),
      assert: console.assert.bind(console),
      trace: console.trace.bind(console),
      count: console.count.bind(console),
      countReset: console.countReset.bind(console),
      time: console.time.bind(console),
      timeEnd: console.timeEnd.bind(console),
      timeLog: console.timeLog.bind(console),
      group: console.group.bind(console),
      groupCollapsed: console.groupCollapsed.bind(console),
      groupEnd: console.groupEnd.bind(console),
      clear: console.clear.bind(console),
      table: console.table.bind(console),
      dir: console.dir.bind(console),
      dirxml: console.dirxml.bind(console),
    };

    // Interceptar console.log
    console.log = (...args) => {
      this.consolaOriginal.log(...args);
      this._log('INFO', this._formatearArgumentos(args), 'Console-Nativa');
    };

    // Interceptar console.info
    console.info = (...args) => {
      this.consolaOriginal.info(...args);
      this._log('INFO', this._formatearArgumentos(args), 'Console-Nativa');
    };

    // Interceptar console.warn
    console.warn = (...args) => {
      this.consolaOriginal.warn(...args);
      this._log('WARNING', this._formatearArgumentos(args), 'Console-Nativa');
    };

    // Interceptar console.error
    console.error = (...args) => {
      this.consolaOriginal.error(...args);
      this._log('ERROR', this._formatearArgumentos(args), 'Console-Nativa');
    };

    // Interceptar console.debug
    console.debug = (...args) => {
      this.consolaOriginal.debug(...args);
      this._log('DEBUG', this._formatearArgumentos(args), 'Console-Nativa');
    };

    // Interceptar console.assert
    console.assert = (condicion, ...args) => {
      this.consolaOriginal.assert(condicion, ...args);
      if (!condicion) {
        this._log('ERROR', `Assertion failed: ${this._formatearArgumentos(args)}`, 'Console-Nativa');
      }
    };

    // Interceptar console.trace
    console.trace = (...args) => {
      this.consolaOriginal.trace(...args);
      this._log('DEBUG', `Trace: ${this._formatearArgumentos(args)}`, 'Console-Nativa');
    };

    // Interceptar console.count
    console.count = (etiqueta = 'default') => {
      this.consolaOriginal.count(etiqueta);
      this.contadores[etiqueta] = (this.contadores[etiqueta] || 0) + 1;
      this._log('DEBUG', `Count [${etiqueta}]: ${this.contadores[etiqueta]}`, 'Console-Nativa');
    };

    // Interceptar console.countReset
    console.countReset = (etiqueta = 'default') => {
      this.consolaOriginal.countReset(etiqueta);
      this.contadores[etiqueta] = 0;
      this._log('DEBUG', `Count reset [${etiqueta}]`, 'Console-Nativa');
    };

    // Interceptar console.time
    console.time = (etiqueta = 'default') => {
      this.consolaOriginal.time(etiqueta);
      this.temporizadores[etiqueta] = Date.now();
      this._log('DEBUG', `Timer started [${etiqueta}]`, 'Console-Nativa');
    };

    // Interceptar console.timeEnd
    console.timeEnd = (etiqueta = 'default') => {
      this.consolaOriginal.timeEnd(etiqueta);
      if (this.temporizadores[etiqueta]) {
        const duracion = Date.now() - this.temporizadores[etiqueta];
        delete this.temporizadores[etiqueta];
        this._log('DEBUG', `Timer ended [${etiqueta}]: ${duracion}ms`, 'Console-Nativa');
      }
    };

    // Interceptar console.timeLog
    console.timeLog = (etiqueta = 'default', ...args) => {
      this.consolaOriginal.timeLog(etiqueta, ...args);
      if (this.temporizadores[etiqueta]) {
        const duracion = Date.now() - this.temporizadores[etiqueta];
        this._log('DEBUG', `Timer [${etiqueta}]: ${duracion}ms ${this._formatearArgumentos(args)}`, 'Console-Nativa');
      }
    };

    // Interceptar console.group
    console.group = (...args) => {
      this.consolaOriginal.group(...args);
      this.nivelGrupo++;
      this._log('INFO', `Group start: ${this._formatearArgumentos(args)}`, 'Console-Nativa');
    };

    // Interceptar console.groupCollapsed
    console.groupCollapsed = (...args) => {
      this.consolaOriginal.groupCollapsed(...args);
      this.nivelGrupo++;
      this._log('INFO', `Group collapsed: ${this._formatearArgumentos(args)}`, 'Console-Nativa');
    };

    // Interceptar console.groupEnd
    console.groupEnd = () => {
      this.consolaOriginal.groupEnd();
      if (this.nivelGrupo > 0) this.nivelGrupo--;
      this._log('INFO', 'Group end', 'Console-Nativa');
    };

    // Interceptar console.clear
    console.clear = () => {
      this.consolaOriginal.clear();
      this._log('ACTION', 'Console cleared', 'Console-Nativa');
    };

    // Interceptar console.table
    console.table = (datos, columnas) => {
      this.consolaOriginal.table(datos, columnas);
      this._log('DEBUG', `Table: ${this._formatearObjetoParaLog(datos)}`, 'Console-Nativa');
    };

    // Interceptar console.dir
    console.dir = (objeto, opciones) => {
      this.consolaOriginal.dir(objeto, opciones);
      this._log('DEBUG', `Dir: ${this._formatearObjetoParaLog(objeto)}`, 'Console-Nativa');
    };

    // Interceptar console.dirxml
    console.dirxml = (...args) => {
      this.consolaOriginal.dirxml(...args);
      this._log('DEBUG', `DirXML: ${this._formatearArgumentos(args)}`, 'Console-Nativa');
    };
  }

  /**
   * Formatea argumentos de console para enviar como string
   */
  _formatearArgumentos(args) {
    return args.map(arg => {
      if (typeof arg === 'string') return arg;
      if (arg instanceof Error) return `${arg.message}\n${arg.stack}`;
      return this._formatearObjetoParaLog(arg);
    }).join(' ');
  }

  /**
   * Formatea objetos para log (evita circular references)
   */
  _formatearObjetoParaLog(objeto) {
    try {
      if (objeto === null) return 'null';
      if (objeto === undefined) return 'undefined';
      if (typeof objeto !== 'object') return String(objeto);
      
      // Intentar JSON.stringify con manejo de referencias circulares
      const visto = new WeakSet();
      return JSON.stringify(objeto, (clave, valor) => {
        if (typeof valor === 'object' && valor !== null) {
          if (visto.has(valor)) return '[Circular]';
          visto.add(valor);
        }
        return valor;
      }, 2);
    } catch (error) {
      return `[Object: ${Object.prototype.toString.call(objeto)}]`;
    }
  }

  _log(nivel, mensaje, fuente) {
    if (!this.inicializado) this.initializeSystem(this.nombreProyecto);
    this._enviar('/log', { nivel, mensaje, fuente, proyecto: this.nombreProyecto });
  }

  logInfo(mensaje, fuente = 'General') { this._log('INFO', mensaje, fuente); }
  logWarning(mensaje, fuente = 'General') { this._log('WARNING', mensaje, fuente); }
  logError(mensaje, fuente = 'General', err = null) {
    const textoCompleto = err ? `${mensaje}\nError: ${err.message}` : mensaje;
    this._log('ERROR', textoCompleto, fuente);
  }
  logDebug(mensaje, fuente = 'General') { this._log('DEBUG', mensaje, fuente); }
  logAction(mensaje, fuente = 'General') { this._log('ACTION', mensaje, fuente); }
}

const logger = new AdaptadorLogs();
window.logger = logger;
