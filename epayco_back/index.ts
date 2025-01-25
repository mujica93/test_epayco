import { App } from './app';
import { initializeDB } from './database';
//initialize the app, DB connection and start the server
async function main() {
    //app
    const app = new App();
    //DB 
    initializeDB();
    //start server
    app.start();
}

main();