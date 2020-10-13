import App from "./config/app";
const PORT = 3000;
let x;
let app = new App().app;

let server = app.listen(PORT, () => {
   console.log('Express server listening on port ' + PORT);
})

export default server;