# Reglas de Desarrollo

Este documento define las convenciones de nomenclatura y reglas de desarrollo que se deben aplicar al pie de la letra en este proyecto.

---

## Idiomas

Los proyectos manejan dos idiomas en la construcción:
- Español sin acentos y sin letra ñ (a en vez de á, nn en vez de ñ)
- Inglés: solo cuando el framework o librería lo requiera por convención obligatoria

---

## Regla de Mínimo 3 Palabras

Todos los nombres deben tener mínimo TRES palabras completas (sin abreviaturas).

### Archivos de Código

- Controladores: `ControladorNombreFuncionalidadApiController.cs`
- Servicios: `ServicioNombreFuncionalidadApiService.cs`
- Entidades: `EntidadNombreObjetoNegocio.cs`
- Contextos: `ContextoBaseDatosNombreTecnologia.cs`

### Clases e Interfaces

- Clases: `PalabraQueEsEjemplo`, `ContadorElementosLista`, `AdministradorConfiguracionSistema`
- Interfaces: `IPalabraQueEsEjemplo`, `IContadorElementosLista`, `IAdministradorConfiguracionSistema`

### Métodos

- Métodos: `ObtenerDatosDesdeServidor`, `CrearInstanciaObjetoNuevo`, `CalcularPromedioValoresNumero`

### Variables

- Variables privadas: `_palabraQueEsEjemploInstancia`, `_contadorElementosListaActual` (primera palabra en minúscula, agregar sufijo descriptivo)
- Variables locales: `palabraQueEsEjemploLocal`, `contadorElementosListaActual`, `administradorConfiguracionSistemaActivo`
- Parámetros: `palabraQueEsEjemploParametro`, `contadorElementosListaParametro`, `administradorConfiguracionSistemaParametro`

### Propiedades

- Propiedades de clase: `PalabraQueEsEjemploPropiedad`, `ContadorElementosListaActual`, `AdministradorConfiguracionSistemaActivo`
- Propiedades JSON: `palabraQueEsEjemplo`, `contadorElementosLista`, `administradorConfiguracionSistema`

---

## Regla Crítica: Conteo de Palabras

Contar palabras por separación de mayúsculas en PascalCase/camelCase:

- `MensajeIA` = Mensaje + IA = 2 palabras ❌
- `MensajeInteligenciaArtificial` = Mensaje + Inteligencia + Artificial = 3 palabras ✅
- `MetricasTexto` = Metricas + Texto = 2 palabras ❌
- `MetricasAnalisisTexto` = Metricas + Analisis + Texto = 3 palabras ✅
- `ContextoBaseDatos` = Contexto + Base + Datos = 3 palabras ✅
- `ContextoBaseDatosSqlite` = Contexto + Base + Datos + Sqlite = 4 palabras ✅

---

## Prohibición de Abreviaturas

NO usar abreviaturas:
- NO usar `kvp` → usar `parClaveValorDiccionario` ✅
- NO usar `msg` → usar `textoMensajeUsuario` ✅
- NO usar `cfg` → usar `configuracionSistemaActual` ✅

---

## Base de Datos

### Tablas

- Formato: PascalCase con prefijo `Tbl` y mínimo 3 palabras
- Ejemplo: `TblNombreEntidadNegocio`

### Columnas

- Formato: PascalCase con prefijo `Col` y mínimo 3 palabras
- Ejemplos:
  - `ColIdNombreEntidadNegocio`
  - `ColTextoDescripcionEntidad`
  - `ColFechaCreacionRegistroEntidad`

---

## Propiedades JSON (API)

- Formato: camelCase con mínimo 3 palabras
- Ejemplos:
  - `resultadoProcesamientoOperacionCompleta`
  - `textoMensajeOriginalUsuario`
  - `fechaCreacionRegistroEntidad`

---

## Excepciones

Los siguientes nombres pueden mantener su formato original cuando son requeridos por el framework:
- `Controller` (ASP.NET Core)
- `Program`
- `Startup`
- `IActionResult`
- Propiedades de API que se exponen: usar PascalCase en inglés si es convención del framework

---

## Comentarios

- Comentarios en español explicando funcionalidad según buenas prácticas
- No exagerar con comentarios innecesarios
- Enfocarse en el "por qué" más que en el "qué"

---

## 📋 LOGS Y DEBUGGING - REGLA CRÍTICA

> **⚠️ ANTES DE CUALQUIER CORRECCIÓN, MANTENIMIENTO O DEBUGGING EN CUALQUIERA DE LOS PROYECTOS**:
> 
> **El archivo `zLogs.txt` es tu mejor aliado para debugging**:
> - Captura TODAS las acciones del API y UI
> - Cada log que pongas en el código (backend o frontend) se registra automáticamente
> - SIEMPRE revisa `zLogs.txt` PRIMERO antes de hacer cambios
> - Limpia el contenido del archivo antes de hacer pruebas
> - Ejecuta la aplicación y revisa los logs para entender el flujo
> - Agrega logs estratégicos para rastrear el problema
> 
> **Flujo de trabajo para debugging**:
> 1. **Revisar** `zLogs.txt` para ver el estado actual
> 2. **Limpiar** el contenido del archivo (dejar vacío)
> 3. **Agregar logs** en el código donde necesites rastrear
> 4. **Ejecutar** la aplicación y reproducir el problema
> 5. **Analizar** los logs para encontrar la causa raíz
> 6. **Corregir** el código basándote en los logs
> 7. **Verificar** con nuevos logs que la corrección funciona
> 
> **Objetivo**: Hacer debugging eficiente y preciso usando logs en lugar de adivinar.
> Los logs te muestran exactamente qué está pasando en tiempo real.

---

## 📢 REGLA IMPORTANTE PARA DESARROLLO

> **⚠️ ANTES DE REALIZAR CUALQUIER AJUSTE, MANTENIMIENTO O EVOLUCIÓN**:
> 
> **Para Asistente IA o Chat IA**:
> - Cuando el usuario solicite un cambio y haga referencia a revisar este README.md
> - DEBES presentar primero un plan detallado con el formato **🎯 ACCIONES A REALIZAR**
> - Incluir: archivos a modificar, ubicaciones exactas, código específico a agregar/cambiar
> - Esperar aprobación del usuario antes de proceder con los cambios
> - Cuando empieces a redactar las 🎯 ACCIONES A REALIZAR, indica siempre donde el usuario puede poner puntos de interrupción y también logs tanto en el api y/o en el ui para hacer recorridos o obtener información relevante de errores, movimiento de datos desde base de datos, estructura de entrada o salida en servicios externos usados, u cualquier otro relevante de debuggeo profesional.
> - **DESPUÉS DE APLICAR CAMBIOS EN FRONTEND (JS/CSS/HTML)**: SIEMPRE ejecutar `clear-cache-and-run.ps1` para forzar recarga en navegador
> 
> **Objetivo**: Mantener claridad y control sobre los cambios en el proyecto.
> El usuario que conoce la estructura del proyecto puede autorizar u opinar sobre ajustes alternativos.

---

## 🚫 Reglas para Archivos Temporales y Scripts (PARA IA)

> **⚠️ REGLAS CRÍTICAS PARA ASISTENTES DE IA**:
> 
> **PROHIBIDO - Archivos de Resumen/Documentación Temporal**:
> - ❌ NUNCA crear archivos .md para resumir cambios, correcciones o trabajo realizado ni para manejar documentación ya que no se quiere tener archivos residuales o desactualizados.
> - ❌ NUNCA crear archivos .txt para documentar procesos o resultados
> - ❌ NUNCA crear archivos de "resumen", "cambios", "correcciones", "notas", etc.
> - ✅ Toda comunicación de resultados debe ser SOLO en el chat, no en archivos
> - ⚠️ **EXCEPCIÓN**: Se permite crear ÚNICAMENTE el archivo `zNotas.md` en la raíz del proyecto
> - ⚠️ Al finalizar las **🎯 ACCIONES A REALIZAR**, preguntar al usuario: "¿Deseas que cree el archivo zNotas.md para no perder el flujo de las actividades a realizar?"
> - ⚠️ Solo crear `zNotas.md` si el usuario responde afirmativamente
> 
> **SCRIPTS TEMPORALES PERMITIDOS**:
> - ❌ PROHIBIDO crear scripts en subcarpetas (difícil de encontrar)
> - ✅ Scripts temporales SOLO en raíz del proyecto
> - ⚠️ Scripts son TEMPORALES - Preguntar al usuario si debes eliminarlos cuando ya no los uses más
> - ⚠️ Scripts NO forman parte del proyecto, son herramientas de un solo uso
> 
> **EXCEPCIÓN - Script de Caché (OBLIGATORIO)**:
> - ✅ `clear-cache-and-run.ps1` - Script PERMANENTE en raíz de cada proyecto que lo necesite
> - ⚠️ Este script es OBLIGATORIO ejecutarlo después de cualquier cambio en archivos frontend del proyecto donde se haga el ajuste
> - ⚠️ Asistente IA o Chat IA DEBE ejecutar este script después de modificar JS/CSS/HTML
> 
> **Razón de esta regla**:
> - Scripts en raíz son visibles inmediatamente
> - Usuario puede eliminarlos fácilmente después de usarlos
> - Scripts en subcarpetas se pierden y quedan como "basura"
> - Este es un proyecto serio, no debe tener archivos basura ocultos
> - El script de caché garantiza que los cambios se reflejen en el navegador
> 
> **Resumen para IA**:
> ```
> ❌ NO crear archivos .md/.txt, ni ninguna otra extensión de resumen (usar solo chat)
> ✅ EXCEPCIÓN: zNotas.md en raíz (solo si usuario lo autoriza al final de 🎯 ACCIONES A REALIZAR)
> ✅ Scripts temporales SOLO en raíz (nunca en subcarpetas)
> ⚠️ Scripts son temporales (usuario los elimina después)
> ✅ EXCEPCIÓN: clear-cache-and-run.ps1 solo en el proyecto que lo necesite es PERMANENTE y OBLIGATORIO
> 🔧 SIEMPRE ejecutar clear-cache-and-run.ps1 después de cambios frontend
> ```

---

## Nota Importante

Los ejemplos en este documento (PalabraQueEsEjemplo, ContadorElementosLista, etc.) son GENÉRICOS para enseñar el formato de nomenclatura. NO son palabras específicas de ningún proyecto. Cada proyecto debe usar nombres descriptivos según su propio dominio y contexto.

---

## 📄 Nota final

Este archivo tiene exactamente 211 líneas con el salto de línea al final, está prohibido en este que hagas ajustes, no puedes añadir ni actualizar ni nada por el estilo este archivo README.md, el archivos .txt tampoco es para notas es de lectura y se permite limpiar cuando ya se tiene entendimiento de las acciones, errores, advertencias, fallos, etc. Además tener en cuenta que lo que ve el usuario en la UI todo va en "INGLÉS" pero lo que ve el desarrollador en el código va de acuerdo a las "Convenciones de este archivo".
