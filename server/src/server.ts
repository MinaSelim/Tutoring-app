import App from './config/app';
const PORT = 3000;

// Get the express app
const app = new App().app;

// app.listen starts the application, and returns the server (useless outside of testing context)
const server = app.listen(PORT, () => {
   console.log('Express server listening on port ' + PORT);
});

export default server;
