<template>
    <h1>Bienvenue {{ name }} </h1>
</template>

<script>

export default {
    name: 'Welcom',
    props:{
        name: { 
            type: String,
                }
    },
    mounted() {
        this.$store.dispatch('getAllSubject')
        return;
    },
}
</script>