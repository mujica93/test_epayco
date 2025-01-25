# ePayco

ePayco es una aplicación web que permite a los usuarios registrar, recargar y consultar el saldo de su billetera, así como realizar compras. El proyecto está dividido en dos partes: el backend (`epayco_back`) y el frontend (`epayco-front`).

## Tecnologías Utilizadas

- **Backend**: Node.js, Express, MySQL, Nodemailer
- **Frontend**: Next.js, React, TailwindCSS

## Instalación

### Requisitos Previos

- Node.js (versión 14 o superior)
- MySQL

### Clonar el Repositorio

```bash
git clone https://github.com/tu_usuario/epayco.git
cd epayco

### Backend

```bash
cd epayco_back
npm install
npm run start

### Frontend

```bash
cd epayco_front
npm install
npm run dev

### Estrcutura del proyecto

epayco/
├── epayco_back/
│   ├── .env
│   ├── .gitignore
│   ├── app.ts
│   ├── config.ts
│   ├── database.ts
│   ├── index.ts
│   ├── mailer.ts
│   ├── nodemon.json
│   ├── package.json
│   ├── README.md
│   ├── src/
│   │   ├── controllers/
│   │   │   ├── auth.controller.ts
│   │   │   ├── pay.controller.ts
│   │   ├── models/
│   │   │   ├── response.ts
│   │   ├── routes/
│   │   │   ├── auth.route.ts
│   │   │   ├── pay.route.ts
│   ├── tsconfig.json
├── epayco-front/
│   ├── .gitignore
│   ├── eslint.config.mjs
│   ├── next.config.ts
│   ├── package.json
│   ├── postcss.config.mjs
│   ├── public/
│   │   ├── images/
│   ├── README.md
│   ├── src/
│   │   ├── app/
│   │   │   ├── api/
│   │   │   ├── auth/
│   │   │   ├── components/
│   │   │   ├── hooks/
│   │   │   ├── models/
│   │   │   ├── providers/
│   │   │   ├── styles/
│   │   │   ├── wallet/
│   ├── tailwind.config.ts
│   ├── tsconfig.json
├── README.md