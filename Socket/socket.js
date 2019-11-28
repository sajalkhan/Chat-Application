'use strict'
let h = require('../Helper/helperMethods');

module.exports = (io,data) =>{

    let all_rooms = data.locals.chatrooms;

    io.of('/roomslist').on('connection', socket=>{
       
        // Listining getChatrooms event
        socket.on('getChatrooms', ()=>{
            socket.emit('chatRoomsList', JSON.stringify(all_rooms)); // trigger chatRoomsList
        });

        // Listining createNewRooms event
        socket.on('createNewRoom', (newChat_Room)=>{
            
            // check to see if a room with same title exists or not
            //if not then create one and broadcast to everyone
            if(!h.findChatroom(all_rooms, newChat_Room)){
                
                //create a new room and broadcast to all
                all_rooms.push({
                    roomName: newChat_Room,
                    roomId: h.createRoomId(),
                    users:[]
                });

                //Emit an update list to the creator
                socket.emit('chatRoomsList', JSON.stringify(all_rooms)); // trigger chatRoomsList event from server side
                
                //Emit and update list to the everyone who connected to the room
                socket.broadcast.emit('chatRoomsList', JSON.stringify(all_rooms));
            }
        });
    });

}