import { Server } from 'socket.io';

const io = new Server(3001, {
  cors: {
      origin: '*',
  }
});

// io.on('connection', (socket) => {
//   console.log('Connection', socket.id)

// })
let users=[]
io.on('connect', (socket) => {
  console.log(socket.id)
  socket.on('join', name=>{
    users.push({name, id: socket.id})
    console.log(socket.id)
    socket.join(name)
    io.emit('users_connected', users)

  })
  
  socket.on("private_message", (data)=>{
    io.to(data.name).emit('message', data);
      console.log(data)
   })
   
  
  // socket.emit('message', `welcome ${socket.id}`)
  // socket.broadcast.emit('message', `${socket.id} joined`)

  // socket.on('message', function message(data) {
  //   console.log('message receivedd: %s', data)

  //   socket.emit('message', { data })
  // })

  socket.on('disconnecting', () => {
    const newArr = users.filter((x) => x.id !== socket.id)
    users = newArr
    io.emit('users_connected', users)
    console.log('disconnected', socket.id)
    // socket.broadcast.emit('message', `${socket.id} left`)
  })
});

export default fromNodeMiddleware ((req, res, next) => {
    res.statusCode = 200
    res.end()
})