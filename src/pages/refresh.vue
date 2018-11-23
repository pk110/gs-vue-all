<template>
  <div>
  
  </div>
</template>

<script>
export default {
    data () {
      return {
        
      }
    },
    methods:{

    },
    computed: {
      
    },
    components: {
      
    },
    created(){
      
    },
    beforeRouteEnter(to, from, next){
      next(vm => {  
        vm.$stamp(null,from)    
        vm.$router.replace(from.fullPath)        
      })   
    }
}
</script>

<style>

</style>
