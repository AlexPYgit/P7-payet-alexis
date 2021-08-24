<template >
<w-button v-if="user.user.id === storageSubject.userId"> suprimer le sujet</w-button>
<w-flex justify-center>
<w-card class=" xs10">
    <div >
        <h1>Page du sujets</h1>
        <p class="storageSubject"> {{storageSubject}} </p>
        <p class="storageSubject"> {{storageSubject.id}} </p>
        <br>
        <p class="storageSubject"> {{storageSubject.createdAt}} </p>
        <p class="storageSubject "> {{storageSubject.title}} </p>
        <p class="storageSubject"> {{storageSubject.post}} </p>
    </div>
    <br>
    <p> <strong> Commentaire </strong></p>
    <div v-for="comment in storageSubject.Comments" :key="comment">
        <p> {{comment.content}} </p>
        <p> {{comment.User.name}} </p>
    </div>
</w-card>
</w-flex>

 <!-- création du commentaire -->
  <br>
  <w-flex justify-center class="ma4">
    <w-card class="xs10">
      <w-flex justify-center>
        <w-card class="xs4">
          <label> commenter le sujet </label>
        </w-card>
      </w-flex>
      <w-textarea v-model="content" type="text" for="contentSubject"  class = "mt4"  contour  shadow > contenu du commentaire </w-textarea>
      <br>       
       <p class="storageSubject"> {{storageSubject.id}} </p>

      <w-button @click="sendComment(storageSubject.id)"  class="button" > envoyer   </w-button>
    </w-card>
  </w-flex>


</template>
<script>
import { mapState } from 'vuex';


 export default {
        name: 'Subject',
        computed: {
            ...mapState({
                user:'user',
                oneSubject: 'oneSubject',
            })
        },
        data (){
            return {
            content: ''}
        },

        created() {
                this.storageSubject = this.oneSubject
            // if(this.$store.state.oneSubject == ''){
            //        this.storageSubject = JSON.parse(localStorage.getItem('storageSubject'));
            //        console.log('ici si',this.storageSubject)
            //        return
            //    }else{
            //        this.storageSubject = this.$store.state.oneSubject
            //        return
            //    }
               
        //     if(localStorage.getItem('storageSubject'))
        //   try {
        //       this.storageSubject = JSON.parse(localStorage.getItem('storageSubject'));
        //       console.log(this.storageSubject = JSON.parse(localStorage.getItem('storageSubject')));
        //       return
        //     } catch (error) {
        //         console.log(error)
        //   }
        },
        methods:{
            sendComment(idSubject){
                  console.log(idSubject)
                  console.log(this.content)
                this.$store.dispatch('sendComment', 
                {content:this.content,
                idSubject: idSubject
                });
            },
        },
    }
</script>