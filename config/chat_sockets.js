module.exports.chatSockets = function(socketServer) {
    let io = require('socket.io')(socketServer);

    io.sockets.on('connection', function(socket) {
        console.log('new connection received', socket.id);

        socket.on('disconnect', function() {
            console.log('socket disconnected!');
        });
        socket.on('join_room', function(data) {
            // join room event is received here by server
            console.log('joining rqst received', data);
            socket.join(data.chatroom); // join the socket to that room,
            // if the room already exist, user will be added,
            // if it does not, a new room will be created 

            // now let all the users in that chatroom to know that a user is joined 
            // emit an event inside this room to let the other users know 
            io.in(data.chatroom).emit('user_joined', data);
        });
        // CHANGE :: detect send_message and broadcast to everyone in the room
        socket.on('send_message', function(data) {
            // message will be sent in the given chatroom only using .in(data.chatroom)
            io.in(data.chatroom).emit('receive_message', data);
        });
    });
}