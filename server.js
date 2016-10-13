const app = require('express')()
const http = require('http').Server(app)
const io = require('socket.io')(http)


io.on('connection', socket => {
  socket.on('text_copy', data => {
    socket.broadcast.emit('text_copy', data)
  })

  socket.on('file_copy', date => {
    socket.broadcast.emit('file_copy', date)
  })
})

http.listen(process.env.PORT || 3000, () => {
  console.log('listening on *:3000')
})
