<template >
<w-flex>
    <w-button class="button_delete_subject ma4" v-if="user.user.id == storageSubject.User.id  "  @click="deleteSubject()"  > suprimer le sujet</w-button>
</w-flex>
<w-flex justify-center>
    <w-card class=" xs10" tile>
    <template #title>
        <w-toolbar>
        <div class="title3 text-upper"> <h2>{{storageSubject.title}}</h2></div>
        <div class="spacer"></div>
        <span class="ml2 title4">{{ storageSubject.User.name }}</span>
        <span class="ml2 caption">{{ moment(storageSubject.createdAt) }}</span>
        </w-toolbar>
    </template>
        <p class="storageSubject"> {{storageSubject.post}} </p>
    </w-card>
</w-flex>

    <!-- commentaire> -->
<w-flex justify-center>
    <w-card  class=" xs10 ">
        <br>
        <w-card class=" xs10 blue-light3--bg" >
            <p> <strong> Commentaire </strong></p>
        </w-card>
        <w-card class="xs10  blue-light7--bg">
        <div v-for="comment in comentBySubject" :key="comment" >
        <w-flex class="justify-space-between">
            <w-card class="xs12 my2 blue-light7--bg" >
            <p class="caption "> {{comment.User.name}} </p>
            <p> {{comment.content}} </p> 
            <w-flex class="justify-end" >
                <w-button @click="deleteComment(comment.id,storageSubject.id),getAllComentBySubject(storageSubject.id)" v-if="user.user.id == storageSubject.User.id  " class="caption"> suprimer son commentaire</w-button>
            </w-flex>
            </w-card>
        </w-flex>
        </div>
        </w-card>
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
      <w-button @click="sendComment(storageSubject.id), $waveui.notify('Commentaire envoyé !', 'success')"  class="button" > envoyer   </w-button>
    </w-card>
  </w-flex>


</template>
<script>
import { mapState } from 'vuex';
import moment from 'moment'


 export default {
        name: 'Subject',
        computed: {
            ...mapState({
                user:'user',
                oneSubject: 'oneSubject',
                comentBySubject: 'comentBySubject',
            })
        },
        data (){
            return {
            content: '',
            }
        },

        created(){

                if(this.oneSubject === null){
                    this.storageSubject = this.oneSubject
                    }else{
                        this.storageSubject = JSON.parse(localStorage.getItem('storageSubject'))
                    }        
        },

        
        methods:{
            
            deleteComment(commentId, storageSubjectId ){
                console.log(storageSubjectId)
                this.$store.dispatch('deleteComment',commentId)
                this.$store.comentBySubject= ''
                this.$store.dispatch('getAllComentBySubject', storageSubjectId)
            },

            getAllComentBySubject(){
            },
            
            sendComment(idSubject){
                this.$store.dispatch('sendComment', 
                {content:this.content,
                idSubject: idSubject
                });
                this.content= ' ';
                this.$store.dispatch('getAllComentBySubject', idSubject)
            },

            deleteSubject(){
                this.$store.dispatch('deleteSubject', {
                   subjecId: this.storageSubject.id, 
                   userId: this.storageSubject.User.id
                })
                this.$router.push('/home')
            },

            moment(){
                let date = this.storageSubject.createdAt
                return moment(date).format('MMMM Do YYYY, hh:mm');
            },
        },
    }
</script>