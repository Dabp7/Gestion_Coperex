# Verificación 2026-11-27

Windows10, Node22.15.0, npm10.9.2, MongoDB8.0.8 real temporal.

`npm test` aprobado: cinco pruebas, cero fallos.

La suite verifica todas las rutas de empresas sin token y con cuenta sin permiso, filtros combinados, orden/paginación, lectura del XLSX con ExcelJS, celdas numéricas, entradas inválidas y recálculo de trayectoria.
Se usó MONGOMS_SYSTEM_BINARY con un mongod instalado y un puerto/base temporales propios de la suite; no la base personal.

Se retiraron del árbol versionado .env, dumps previos de administradores/empresas y el reporte compartido. El historial no se reescribió. El seed y la colección nueva usan datos sintéticos.

Arranque desde una base vacía: seed, proceso real `node index.js`, health, login administrativo y consulta de tres empresas aprobados. El servidor espera los índices antes de escuchar y cierra la conexión si falla el arranque.
Se fijó uuid11.1.1 para la dependencia de ExcelJS; los cinco tests y la lectura de XLSX volvieron a pasar. `npm audit --omit=dev`: cero vulnerabilidades.

Revisión independiente adicional: no se encontraron fallos relevantes en los permisos de empresas, filtros compartidos o exportación de la página consultada. Las cinco pruebas reales volvieron a pasar. `config.mongodbMemoryServer.disablePostinstall=true` evita que npm ci descargue un MongoDB distinto del elegido por las pruebas; el resolver de la dependencia confirmó el valor true. No cambian versiones ni lógica de negocio.
