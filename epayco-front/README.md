# ePayco Frontend

Este es el frontend de la aplicación ePayco, una plataforma que permite a los usuarios registrar, recargar y consultar el saldo de su billetera, así como realizar compras. Este proyecto está construido con Next.js y React.

## Tecnologías Utilizadas

- **Frontend**: Next.js, React, TailwindCSS

## Instalación

### Requisitos Previos

- Node.js (versión 14 o superior)

### Clonar el Repositorio
1. Clona el repositorio:
    ```sh
    git clone https://github.com/mujica93/epayco_test.git
    ```
2. Posicionarnos el el proyecto:
    ```sh
    cd test_epayco/epayco-front
    ```
3. Instala las dependencias:
    ```sh
    npm install
    ```
## Uso
1. Inicia el servidor en modo desarrollo:
    ```sh
    npm run dev
    # o
    yarn dev
    # o
    pnpm dev
    # o
    bun dev
    ```
2. El Frontend estará disponible en `http://localhost:3000`.
3. Usuario insertado en la DB para relizar las pruebas:
    ´´´
    Nombre: Yefferson Mujica
    Correo electrónico: jefersonmujica@gmail.com.
    Número de documento: 21640302
    Numero telefónico: 04127261953
    ´´´
## Estructura del Proyecto

epayco-front/
├── .gitignore
├── eslint.config.mjs
├── next.config.ts
├── package.json
├── postcss.config.mjs
├── public/
│   ├── images/
├── README.md
├── src/
   ├── app/
   │   ├── api/
   │   ├── auth/
   │   ├── components/
   │   ├── hooks/
   │   ├── models/
   │   ├── providers/
   │   ├── styles/
   │   ├── wallet/
── tailwind.config.ts
── tsconfig.json
├── README.md

## Licencia
Este proyecto está bajo la Licencia MIT.