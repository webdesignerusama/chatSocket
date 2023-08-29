<template>
  <v-container>
    <h1 class="text-center">Chat Application</h1>
    <div class="">
      <div class="chatbox">
       <h4 class="leftmessage">
        {{ userjoin }}
       </h4>
       <h4 class="rightmessage">
       {{nameMessage}}
</h4>
      </div>
    </div>
  
      <input  v-model="message" />
    <v-btn @click="sendMessage">send</v-btn>

  </v-container>
</template>
<script setup>




 const { $io } = useNuxtApp();
 const userName = ref('')
let userjoin = ref('')
let message= ref('')
let nameMessage=ref('')




onMounted(() => {
  userName.value = prompt('')
  $io.emit("newuser", userName.value);
  $io.on('userjoin', name=>{
        userjoin.value= name + " join the room"
        console.log('u')
   })
})
onBeforeUpdate(()=>{

  $io.on('receive', data=>{
  
      console.log('usama')
       nameMessage= data.name+"  " + data.message
  })
})
let sendMessage = () => {
  $io.emit("message", message.value)
  // console.log(message.value)
  
  
};

const receiveMessage =()=>{
  // $io.on("message", {data})  
}
</script>
<style scoped>
   .chatbox{
    border: 1px solid black;
    height: 80vh;
    overflow: auto;
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
