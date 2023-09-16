<template>
  <v-container>
    <v-row>
      <v-col cols="6">
        <v-text-field v-model="loggedUser"></v-text-field>
        <v-btn @click="login">Login</v-btn>
        <ul>
          <li v-for="user in users.filter((x) => x.name !== loggedUser)" @click="setSelectedUser(user.name)" :key="user"> {{ user.name }} </li>
        </ul>
      </v-col>
      <v-col cols="6">
        <h1 class="text-center">Chat Application</h1>
    <h4>You are chating with {{ destUser }}</h4>
    <div class="">
      <div class="chatbox">
        <h4 v-for="(item,i) in arrItem" :key="i" :class="item">{{ item.name+": "+item.message }}</h4>
      </div>
    </div>
     <div class="mt-4 ">
       <v-text-field class="snd-box" max-width="144" label="write your message here" variant="outlined" v-model="message"></v-text-field>
       <v-btn @click="sendMessage">send</v-btn>
     </div>
      </v-col>
    

    </v-row>
   

  </v-container>
</template>
<script setup>
 const { $io } = useNuxtApp();
let message= ref('')
let arrItem=ref([])
let loggedUser = ref('')
const destUser = ref('')
const users = ref([])


const login = () => {
  // localStorage.setItem('name', loggedUser.value)
     $io.emit('join', loggedUser.value)
}

const setSelectedUser = (user) => {
destUser.value = user
}

onMounted(() => {
  // loggedUser.value = localStorage.getItem('name')
  // $io.emit("newuser", loggedUser.value);
  //  $io.on('receive', (data)=>{
  //   if (data.destUser === loggedUser.value) {
    
  //       data.position = 'leftmessage'
  //       data.chatRoom =  loggedUser.value + data.name
  //        saveChat(data)
      
  //   }
  // })
  $io.on('users_connected', (data) => {
    users.value = data
  })
  $io.on('message', (data) => {
    console.log("working...", data.name, loggedUser.value)
  arrItem.value.push(data)
  
})
  
 
})
let sendMessage = () => {

  arrItem.value.push({name:loggedUser.value,message:message.value})
  $io.emit('private_message', {name:destUser.value,message:message.value});

  // if (!destUser.value) {
  //   alert('no user selected for chat')
  //   return
  // }
  // const msg = {
  //   name: loggedUser.value,
  //   message:message.value,
  //   position:'rightmessage',
  //   destUser:destUser.value,
  //   chatRoom: loggedUser.value + destUser.value
  // }
  // $io.emit("message",msg)
  // saveChat(msg)
 
};

// const saveChat = (chat) => {
//   console.log(chat.chatRoom)
//   let chatroom = chat.name + chat.destUser
//   if (localStorage.getItem(chatroom)) {
//     const prevChat = JSON.parse(localStorage.getItem(chatroom))
//     prevChat.push(chat)
//     localStorage.setItem(chatroom, JSON.stringify(prevChat))
//     arrItem.value = prevChat
//   } else {
//     arrItem.value = [chat]
//     localStorage.setItem(chatroom, JSON.stringify([chat]))
//   }
// }
</script>
<style scoped>
   .chatbox{
    border: 1px solid black;
    height: 60vh;
    overflow: auto;
   }
   .snd-box{
    max-width: 50%;
   }
   .leftmessage{
    float: left;
    clear: both;
    padding: 10px;
    background-color: bisque;
    margin: 30px 30px ;
    
   }
   .rightmessage{
    float: right;
    clear: both;
    padding: 10px;
    background-color: bisque;
    margin:10px 20px 0px 10px;
    
   }



</style>
