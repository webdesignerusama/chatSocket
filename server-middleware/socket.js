import { Server } from 'socket.io';

const io = new Server(3001, {
  cors: {
      origin: '*',
  }
});

// io.on('connection', (socket) => {
//   console.log('Connection', socket.id)

// })
let users=''
io.on('connect', (socket) => {
  socket.on('join', name=>{
    users = name
    console.log(`User ${name} joined`);

  })
  
  socket.on("private_message", (data)=>{
    console.log(data)
    io.to(data.name).emit('message', data);
      
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