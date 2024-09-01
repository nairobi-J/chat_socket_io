const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { Server} = require('socket.io')
const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const cors = require('cors');
const http = require('http')
const app = express();
app.use(bodyParser.json());
app.use(cors());

const server = http.createServer(app); //creating server
const io = new Server(server); //socket.io



const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'jerin',
    database: 'messenger_db'
});


db.connect(err => {
    if (err) throw err;
    console.log('MySQL connected');
});

app.post('/signup', (req, res) => {
    const {name, email, password} =  req.body;
    const hashedPassword = bcrypt.hashSync(password, 10);
   

    const query = `INSERT INTO users(name, email, password) VALUES(?, ?, ?)`;
    db.query(query, [name, email, hashedPassword], (err, result) => {
        if(err){
            return res.status(500).send('error registering new user');
        }
        res.status(201).send('User registred successfully');
    })


})
app.post('/signin', (req, res) => {
    const {email, password} = req.body;

    const query = `SELECT * FROM users WHERE email = ?`;
    db.query(query, [email], (err, results) => {
        if(err){
            return res.status(500).send('error login');
        }
       if(results.length === 0){
        return res.status(401).send('user not found');
       }

       const user = results[0];

       const isPasswordValid = bcrypt.compareSync(password, user.password);
       if(!isPasswordValid){
        return res.status(401).send('invalid credentials');
       }

       const token = jwt.sign({userId: user.id}, 'secretKey', {expiresIn:'1h'});
       res.status(200).json({token});

    })
})

// Send message route
app.post('/send-message', (req, res) => {
    const { senderId, receiverId, message } = req.body;

    const query = `INSERT INTO messages (sender_id, receiver_id, message) VALUES (?, ?, ?)`;
    db.query(query, [senderId, receiverId, message], (err, result) => {
        if (err) {
            return res.status(500).send('Error sending message.');
        }
        res.status(201).send('Message sent successfully!');
    });
});
// Get messages route
app.get('/messages', (req, res) => {
    const { userId, contactId } = req.query;

    const query = `SELECT * FROM messages WHERE (sender_id = ? AND receiver_id = ?) OR (sender_id = ? AND receiver_id = ?) ORDER BY created_at ASC`;
    db.query(query, [userId, contactId, contactId, userId], (err, results) => {
        if (err) {
            return res.status(500).send('Error fetching messages.');
        }
        res.status(200).json(results);
    });
});

app.post('/send-message', (req, res) => {
    const {senderId, receiverId, message} = req.body;

    const checkConversationQuery = `SELECT id FROM conversations
    WHERE (user1_id = ? AND user2_id = ?) OR (user1_id = ? AND user2_id = ?)`;
    //khuje dekhlam ache kina conversation
    db.query(checkConversationQuery, [senderId, receiverId, receiverId,senderId], (err, results) => {
        if(err) {
            return res.status(500).send('error checking conversation');
        }
        let conversationId;
        if(results.length > 0){
            //jodi agei thake conversation
            conversationId = results[0].id;
        }
        else {
                //notun convo khullam

            const createConversationQuery = `INSERT INTO conversations (user1_id, user2_id) VALUES(?,?)`;
            db.query(createConversationQuery, [senderId, receiverId], (err, results) => {
                if(err) { 
                    return res.status(500).send('error creating conversation');
                }
                conversationId = result.insertId;

                sendMessage();
            })
        }
        function sendMessage() {
            //databse e insert krlam

            const query = `INSERT INTO messages(conversation_id, sender_id, contact) VALUES(?,?,?)`;
            db.query(query, [conversationId, senderId, message], (err, result) => {
                if(err){
                    return res.status(500).send('Error sending message');
                }
                res.status(201).send('Message sent successfully');
            })
        }
    })
})

app.post('/add-contacts', (req, res) => {
    const {userId, contactId} = req.body;
    const query = `INSERT INTO contacts (user_id, contact_id) VALUES(?, ?)`;

    db.query(query, [userId, contactId], (err, result) => {
        if(err){
            return res.status(500).send('error adding contact');
        }
        res.status(201).send('contact added successfully');
    })
})

app.get('/contacts', (req, res) => {
    const {userId} = req.query;
    const query = `SELECT users.id, users.name, users.email FROM contacts 
    JOIN users ON contacts contacts_id = users.id 
    WHERE contacts.user_id = ?`;
    db.query(query, [userId], (err, results)=> {
        if(err){
            return res.status(500).send('error fetching contacts');
        }
        res.status(200).json(results);
    } )
})


io.use((socket, next) => {
    const token = socket.handshake.auth.token;

    if(!token){
        return next(new Error('Authentication error'));
    }

    jwt.verify(token, 'secretKey', (err, decoded) => {
        if(err){
            return next(new Error('Authetication error'));
        }

        socket.userId = decoded.userId;

        next();
    })
})


io.on('connection', (socket) => {
    console.log('a user connected', socket.id);

    socket.on('sendMessage', (data) => {
        const {senderId, receiverId, message} = data;

        const query = `INSERT INTO messages (sender_id, receiver_id, content) VALUES (?, ?, ?)`;
        db.query(query, [senderId, receiverId, message], (err, result) =>{
            if(err){
                console.log('database err', err.message)
                socket.emit('error', 'Error sending message.');
            }
            else{
                io.to(receiverId).emit('recieverMessage', data);
                socket.emit('messageSent', 'Message sent successfully!');
            }
        });
    });
  socket.on('disconnect', () => {
    console.log('A user disconnected', socket.id);
  });


});



server.listen(5000, () => {
    console.log('Server started at port 5000');
});
