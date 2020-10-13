import App from './config/app';
const PORT = 3000;
let x;
const app = new App().app;

const server = app.listen(PORT, () => {
   console.log('Express server listening on port ' + PORT);
});

export default server;
