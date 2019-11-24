'use strict'

module.exports = (io,data) =>{
    let all_rooms = data.locals.chat_room;

    io.of('/roomslist').on('connection', socket=>{
        console.log('socket.io is connected!');
    });

}