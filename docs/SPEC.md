# Permisos y exportaciones
Toda operación de empresas exige identidad de Admin y rol ADMIN_ROLE en la base.
Un token con rol alterado no cambia el rol persistido.
Consulta y XLSX comparten filtros, orden estable y paginación validada.
Excel es una descarga autenticada de la página actual; no usa archivos compartidos ni rutas locales.
foundationYear es entero1600..año actual; la trayectoria mostrada se calcula en UTC.
Actualizar un año recalcula el campo histórico de trayectoria.
Los errores no devuelven stacks, claves ni conexiones.
