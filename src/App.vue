<template>
  <div id="app">
    <div id="nav">
    <Header/>
    </div>
    <router-view/>
  </div>
</template>


<script>
import Header from "@/components/Header.vue";

export default {
  components: {
    Header
  },
  created() {
    this.$store.dispatch('initAuth');
  },
}
</script>

<style>

</style>
