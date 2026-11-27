# Gestión Coperex
API académica para administrar empresas y exportar una consulta paginada a Excel.

## Ejecutar
Node.js 22.15+ o 24, npm y MongoDB8 (Docker Compose opcional).
```sh
git clone https://github.com/Dabp7/Gestion_Coperex.git
cd Gestion_Coperex
npm ci
docker compose up -d --wait
cp .env.example .env
npm run seed
npm start
```
En PowerShell: `Copy-Item .env.example .env`. Configurar un secreto local de al menos32 caracteres. También sirve MongoDB local en URI_MONGO.
API http://127.0.0.1:3002, salud /health, OpenAPI /openapi.json y /api-docs.
Seed no destructivo, solo base coperex_demo. Identidades sintéticas: admin@example.test y viewer@example.test; contraseña de demo Demo-password-123! No se crea un administrador automáticamente al iniciar.

## Autorización
POST /coperex/v1/auth/login devuelve adminDetails.token. Enviar Authorization: Bearer.
Todas las rutas /coperex/v1/company requieren una cuenta ADMIN_ROLE comprobada en la base. Sin token:401; cuenta VIEWER_ROLE:403. El rol del JWT no otorga permisos.

## Consulta y Excel
GET /coperex/v1/company/ acepta category, impactLevel, minTrayectory, maxTrayectory, sort, limite y desde.
sort: name_asc, name_desc, foundation_asc o foundation_desc. limite1..100 (20 por defecto), desde0..1000000. Orden estable con desempate por id. Los filtros se combinan.
Trayectoria se deriva del año actual UTC menos foundationYear, sin depender de un valor guardado años atrás.
GET /coperex/v1/company/report acepta exactamente los mismos filtros, orden y paginación: descarga XLSX con la misma página que la consulta. Fundacion y Trayectoria son celdas numéricas. No escribe archivos en una carpeta pública ni devuelve rutas del servidor.
Se conservan getTrayectory/:trayectoryGet, getCategory/:category y getCompany/A-Z o Z-A.
POST /addCompany requiere nameCompany, email, foundationYear, impactLevel y category.
PUT /editCompany/:idCompany admite esos campos; recalcula trayectoria y valida la fecha. El nombre y email siguen siendo únicos.

## Verificar
```sh
npm test
```
Pruebas HTTP con MongoDB real temporal: autenticación de todas las rutas, rol sin permiso, filtros combinados, orden/paginación, lectura del XLSX con ExcelJS, tipos numéricos y entradas inválidas.
La primera ejecución descarga un binario oficial. Se puede reutilizar uno local con MONGOMS_SYSTEM_BINARY; no usa la base personal.
GitHub Actions ejecuta npm ci y npm test.

.env, reportes y dumps no se versionan. Una credencial real presente en el historial debe rotarse en su servicio; retirarla del árbol no la revoca. Datos nuevos del seed son ficticios.
