const app = require('express')()
const http = require('http').Server(app)
const io = require('socket.io')(http)
const ss = require('socket.io-stream')



io.on('connection', socket => {
  socket.on('text_copy', data => {
    socket.broadcast.emit('text_copy', data)
  })

  ss(socket).on('file_copy', (stream, data) => {
   Object.keys(io.sockets.connected)
    .map(k => io.sockets.connected[k])
    .filter(connectedSocket => socket.id !== connectedSocket.id)
    .forEach(connectedSocket => {
      const emitStream = ss.createStream()
      ss(connectedSocket).emit('file_copy', emitStream, data)
      stream.pipe(emitStream)
    })
  })
})

http.listen(process.env.PORT || 3000, () => {
  console.log('listening on *:3000')
})
