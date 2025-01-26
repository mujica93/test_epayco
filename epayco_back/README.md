# epayco_test

## Descripción
Este proyecto es una API para la gestión de usuarios y billeteras electrónicas, permitiendo registrar usuarios, recargar saldo, consultar saldo y realizar pagos.

## Estructura del Proyecto

.env
.gitignore
app.ts
config.ts
database.ts
index.ts
mailer.ts
nodemon.json
package.json
README.md
src/
    controllers/
        auth.controller.ts
        pay.controller.ts
    models/
        response.ts
    routes/
        auth.route.ts
        pay.route.ts
tsconfig.json


## Instalación
1. Clona el repositorio:
    ```sh
    git clone https://github.com/mujica93/epayco_test.git
    ```
2. Posicionarnos el el proyecto:
    ```sh
    cd epayco_test/epayco_back
    ```
3. Instala las dependencias:
    ```sh
    npm install
    ```

## Configuración
1. Crea un archivo [.env](http://_vscodecontentref_/15) en la raíz del proyecto con el siguiente contenido:
    ```env
    DB_HOST=localhost
    DB_USER=root
    DB_PASSWORD=
    DB_NAME=epayco_db
    PORT=8000

    ENV_EMAIL_GOOGLE_NODEMAILER='tu_email@gmail.com'
    ENV_PASSWORD_GOOGLE_NODEMAILER='tu_contraseña'
    ```
2. Usuario insertado en la DB:
    ´´´
    Nombre: Yefferson Mujica
    Correo electrónico: jefersonmujica@gmail.com.
    Número de documento: 21640302
    Numero telefónico: 04127261953
    ´´´
3.  Nota:
    ´´´
    las variables de entorno ENV_EMAIL_GOOGLE_NODEMAILER, ENV_PASSWORD_GOOGLE_NODEMAILER ya poseen usuario y password con mis credenciales de gmail, pero si quieren utilizar otras credenciales pueden editarlo.
    ´´´

## Uso
1. Inicia el servidor en modo desarrollo:
    ```sh
    npm run dev
    ```
2. La API estará disponible en `http://localhost:8000`.

## Endpoints
### Autenticación
- **POST /auth/register**: Registra un nuevo usuario.
    - Body:
        ```json
        {
            "dni": "string",
            "fullname": "string",
            "email": "string",
            "phone": "string"
        }
        ```

### Pagos
- **POST /pay/recharge**: Recarga saldo en la billetera.
    - Body:
        ```json
        {
            "dni": "string",
            "phone": "string",
            "amount": "number"
        }
        ```
- **GET /pay/balance**: Consulta el saldo de la billetera.
    - Query Params:
        ```json
        {
            "dni": "string",
            "phone": "string"
        }
        ```
- **POST /pay/payment**: Realiza un pago.
    - Body:
        ```json
        {
            "dni": "string",
            "phone": "string",
            "amount": "number"
        }
        ```
- **POST /pay/confirmPayment**: Confirma un pago.
    - Body:
        ```json
        {
            "token": "string",
            "sessionId": "string"
        }
        ```

## Licencia
Este proyecto está bajo la Licencia MIT.