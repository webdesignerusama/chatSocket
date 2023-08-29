import { Server } from 'socket.io';

const io = new Server(3001, {
  cors: {
      origin: '*',
  }
});

// io.on('connection', (socket) => {
//   console.log('Connection', socket.id)

// })
const users={}
io.on('connect', (socket) => {
  console.log('Connection', socket.id)
  socket.on('newuser', name=>{
    console.log(name)
    users[socket.id] = name
    socket.broadcast.emit('userjoin', name)
  })
  
  socket.on("message", (message)=>{
    console.log(message)
    socket.broadcast.emit('recieve', {message: message, name:users[socket.id]})
   })
   
  
  // socket.emit('message', `welcome ${socket.id}`)
  // socket.broadcast.emit('message', `${socket.id} joined`)

  // socket.on('message', function message(data) {
  //   console.log('message receivedd: %s', data)

  //   socket.emit('message', { data })
  // })

  socket.on('disconnecting', () => {
    console.log('disconnected', socket.id)
    // socket.broadcast.emit('message', `${socket.id} left`)
  })
});

export default fromNodeMiddleware ((req, res, next) => {
    res.statusCode = 200
    res.end()
})