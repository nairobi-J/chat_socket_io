const io = require('socket.io-client');
const jwt = require('jsonwebtoken');


const token = jwt.sign({userId: 1}, 'secretKey', {expiresIn:'1h'});


const socket = io('http://localhost:5000', {
    auth: {
        token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTcyNDQ1MTcxMywiZXhwIjoxNzI0NDU1MzEzfQ.0vjy6ISDYX8Eyt5Deofz_F1xncLIQUgUkR7YSJbqxmA"
    }
});



socket.on('connect', ()=> {
    console.log('connected to server as :', socket.id);

    const messageData = {
        senderId: 1,
        receiverId: 2,
        message: 'Hello nruh!'
    }


    socket.emit('sendMessage', messageData);
    console.log('message sent', messageData);
});


socket.on('messageSent', (confirmation) => {
    console.log('server confirmation', confirmation);
});


socket.on('receiverMessage', (data) =>{
    console.log('message received'. data);
})

socket.on('error', (error) => {
    console.log('Error', error);
})

socket.on('disconnect' , () => {
    console.log('Disconnected from server');
})