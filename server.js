const app = require('express')()
const http = require('http').Server(app)
const io = require('socket.io')(http)


io.on('connection', socket => {
  socket.on('copy', date => {
    socket.broadcast.emit('copy', date)
  })
})

http.listen(process.env.PORT || 3000, () => {
  console.log('listening on *:3000')
})
