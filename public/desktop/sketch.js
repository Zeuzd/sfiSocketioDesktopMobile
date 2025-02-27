let socket;
let circleX = 200;
let circleY = 200;
let receivedImg = null;

function setup() {
    createCanvas(400, 400);
    background(220);

    let socketUrl = 'https://obscure-space-guacamole-q5pg4q75rppcxqj-3000.app.github.dev/';
    socket = io(socketUrl);

    socket.on('connect', () => {
        console.log('Connected to server');
    });

    socket.on('message', (data) => {
        console.log(`Received message: ${data}`);
        let parsedData = JSON.parse(data);
        if (parsedData.type === 'touch') {
            circleX = parsedData.x;
            circleY = parsedData.y;
        }
    });

    socket.on('image', (imgData) => {
        console.log('Received image');
        receivedImg = loadImage(imgData); // Convertir Base64 a imagen
    });

    socket.on('disconnect', () => {
        console.log('Disconnected from server');
    });

    socket.on('connect_error', (error) => {
        console.error('Socket.IO error:', error);
    });
}

function draw() {
    background(220);
    
    if (receivedImg) {
        image(receivedImg, 0, 0, width, height);
    } else {
        fill(255, 0, 0);
        ellipse(circleX, circleY, 50, 50);
    }
}
