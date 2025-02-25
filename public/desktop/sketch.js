let socket;
let circleX = 200;
let circleY = 200;
const port = 3000;


function setup() {
    createCanvas(400, 400);
    background(220);

    //let socketUrl = 'http://localhost:3000';
    let socketUrl = 'https://obscure-space-guacamole-q5pg4q75rppcxqj-3000.app.github.dev/';
    socket = io(socketUrl); 

    // Evento de conexión exitosa
    socket.on('connect', () => {
        console.log('Connected to server');
    });

    // Recibir mensaje del servidor
    socket.on('message', (data) => {
        console.log(`Received message: ${data}`);
        let parsedData = JSON.parse(data);
        if (parsedData.type === 'touch') {
            circleX = parsedData.x;
            circleY = parsedData.y;
        }
    });    

    // Evento de desconexión
    socket.on('disconnect', () => {
        console.log('Disconnected from server');
    });

    socket.on('connect_error', (error) => {
        console.error('Socket.IO error:', error);
    });
}

function draw() {
    background(220);
    fill(255, 0, 0);
    ellipse(circleX, circleY, 50, 50);
}
