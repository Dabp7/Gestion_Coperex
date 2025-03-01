#  Coperex - Gestión de Empresas en Interfer  

Este proyecto es un **sistema de gestión de empresas** que se presentarán en **Interfer**. Solo los **administradores** tienen acceso y pueden registrar, visualizar, editar y generar reportes de empresas.  

---

##  Características del Proyecto  

✔️ **Inicio de Sesión**: Solo los administradores pueden acceder al sistema.  
✔️ **Registro de Empresas**: Se registran empresas con datos clave como nivel de impacto, trayectoria y categoría.  
✔️ **Visualización de Empresas**: Listado completo con filtros y ordenación (trayectoria, categoría, A-Z, Z-A).  
✔️ **Edición de Empresas**: Permite modificar los datos de una empresa registrada.  
✔️ **Generación de Reportes**: Exporta la información de todas las empresas a **Excel**.  

---

##  Instalación y Configuración  

###  Clonar el repositorio  
```bash
git clone https://github.com/tu-usuario/coperex_company.git
cd coperex_company

## Endpoints Disponibles
🔹 Autenticación


POST	/coperex/v1/auth/login	Iniciar sesión como administrador

🔹 Empresas

POST	/coperex/v1/company/addCompany	Agregar una nueva empresa
GET	/coperex/v1/company/:trayectory	Listar empresas por trayectoria
GET	/coperex/v1/company/getCategory/:category	Filtrar empresas por categoría
GET	/coperex/v1/company/getCompany/A-Z	Listar empresas ordenadas de A-Z
GET	/coperex/v1/company/getCompany/Z-A	Listar empresas ordenadas de Z-A
PUT	/coperex/v1/company/editCompany/:id	Editar datos de una empresa
GET	/coperex/v1/company/export/report	Generar y descargar reporte en Excel


📌 Credenciales del Administrador
📌 Usuario: Dabpp
📌 Email: Dabp@gmail.com
📌 Contraseña: dBerc1an!

