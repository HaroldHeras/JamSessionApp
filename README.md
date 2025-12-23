# JAM-SESSION'S APP

**Crea, organiza y participa** en Jam Sessions musicales de forma sencilla y colaborativa.
Una aplicación web hecha por un músico, pero enfocada a la participación de todo el público.

## Descripción

Jam-Session’s App es una aplicación web full-stack que permite al usuario crear y gestionar jam sessions musicales.
Los organizadores pueden crear jams, editar los detalles del evento, como su visibilidad o le repertorio, y el público puede explorar y participar en las sesiones activas, pudiendote apuntar tu mismo para tocarte un tema, o si solo eres un espectador que desea disfrutar de buena música, puedes proponer tus temas favoritos.

El objetivo del proyecto es ofrecer una experiencia fluida, moderna y atractiva para los amantes de la música en directo, y a su vez poner en práctica mis conocimientos en desarrollo web con tecnologías como Angular, Express o Node y sus librerías.

## Funcionalidades principales

🔐 Autenticación segura con tokens almacenados en cookies HTTP-only y encriptado de contraseñas en la base de datos.

🎵 Gestión de Jam Sessions:

    -Crear, editar y eliminar jams propias.

    -Consultar jams públicas.

    -Ver detalles de cada jam con información de participantes.

👥 Roles diferenciados:

    -Usuarios logueados: puede administrar sus jams.

    -Espectadores: puede explorar, proponer y participar.

⚡ Actualización reactiva en tiempo real mediante BehaviorSubject y observables.

💬 Confirmaciones y alertas dinámicas mediante ventanas emergentes personalizadas.

🌈 Diseño moderno y responsivo, inspirado en interfaces musicales, con colores cálidos y una UX centrada en la simplicidad.


## 🛠️ Tecnologías utilizadas

**Frontend**
- 🅰️ Angular 20
- RxJS, TypeScript
- HTML5, SCSS
- Angular(Router & Guards)

**Backend**
- 🟩 Node.js con Express, Bcrypt, Cookie-Parser...
- JWT para autenticación
- BBDD locales y externas
- CORS, Cookies HTTP-only, SameSite controlado
- Firestore(Firebase)

## 🧠 Aprendizaje y objetivos

Este proyecto nace como iniciativa personal para consolidar mis conocimientos en desarrollo full-stack.
Durante su desarrollo, he trabajado especialmente en:
- La comunicación entre cliente y servidor usando observables y promesas.
- La seguridad de sesiones con cookies y autenticación por token.
- La organización modular del código con buenas prácticas de Angular.
- La creación de un diseño UI/UX adaptado a usuarios reales.    

## 🧑‍💻 Sobre mí

Soy un desarrollador junior full-stack dedicado profesionalmente a la música 🎸 y apasionado a la programación 💻.
Busco seguir creciendo profesionalmente en entornos donde pueda aportar creatividad, código limpio y ganas de aprender.

📫 Contacto:

- [LinkedIn](https://www.linkedin.com/in/harold-de-las-heras-7422a0365/) 
- [GitHub](https://github.com/HaroldHeras) 
- haroldherascabezas@hotmail.com

   

## ⚙️ Instalación

**Clona el repositorio**
```sh
git clone https://github.com/HaroldHeras/JamSessionApp.git
```

**Instala dependencias del BackEnd**
```sh
npm install
```

**Instala dependencias del Frontend**
```sh
cd client/public/front
npm install
```

**Inicia ambos servidores**
```sh
node index.js
cd client/public/front
ng serve
```

**Configurar variables de entrono**
- Crear un archivo ".env" en la raiz de la carpeta del proyecto.
- Crear en el archivo ".env" las siguientes variables de entorno:
```sh
SECRET_JWT_KEY="(escribe aqui tu secreto)"

ROOT_USER="(escribe aquí tu ROOT_USER)"

ROOT_PASS="(escribe aqui tu ROOT_PASS)"
```

## 💡🔜 Futuras mejoras
    -​​ Mejora del sistema de registro de usuarios.
    - Implementación de roles en los diferentes usuarios registrados.
    - Mejoras UX con animaciones e interacciones visuales

## 🏁 Licencia
Este proyecto se distribuye bajo la licencia MIT.
Desarrollado por Harold de las Heras.
