class ChatEngine {
    constructor(chatBoxId, userEmail) {
        this.chatBox = $(`#${chatBoxId}`);
        this.userEmail = userEmail;

        this.socket = io.connect('http://localhost:5000'); // connect to the chat server

        if (this.userEmail) {
            this.connectionHandler();
        }

    }


    connectionHandler() {
        let self = this;

        this.socket.on('connect', function() {
            console.log('connection established using sockets...!');
            self.socket.emit('join_room', {
                // emit an event to join a room, sending room name and email id to join the room 
                user_email: self.userEmail,
                chatroom: 'codeial' // this is the name of the chatroom
            });
            self.socket.on('user_joined', function(data) {
                // receive an event when user joined
                console.log('user joinded', data);
            })
        });
        $('#send-message').click(function() {
            let msg = $('#chat-message-input').val();

            if (msg != '') {
                self.socket.emit('send_message', {
                    message: msg,
                    user_email: self.userEmail,
                    chatroom: 'codeial'
                });

            }
        });

        self.socket.on('receive_message', function(data) {
            console.log('message received', data.message);
            let newMessage = $('<li>');

            let messageType = 'other-message';

            if (data.user_email == self.userEmail) {
                messageType = 'self-message';
            }

            newMessage.append($('<span>', {
                'html': data.message
            }));

            newMessage.append($('<sub>', {
                'html': data.user_email
            }));

            newMessage.addClass(messageType);

            $('#chat-messages-list').append(newMessage);
        })
    }
}