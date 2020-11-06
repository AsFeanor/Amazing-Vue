<template>
  <div id="app">
    <div id="nav">
    <Header/>
    </div>
    <transition name="fade" mode="out-in">
      <router-view></router-view>
    </transition>
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

<style src="cxlt-vue2-toastr/dist/css/cxlt-vue2-toastr.css"/>

<style>
.fade-enter {
  opacity: 0;
}

.fade-enter-active {
  animation: fade-in 0.5s ease-out forwards;
  transition: opacity 0.25s;
}

.fade-leave {
}

.fade-leave-active {
  animation: fade-out 0.5s ease-out forwards;
  transition: opacity 0.5s;
  opacity: 0;
  position: absolute;
}

@keyframes fade-in {
  from {
    transform: translateY(20px);
  }
  to {
    transform: translateY(0px);
  }
}

@keyframes fade-out {
  from {
    transform: translateY(0px);
  }
  to {
    transform: translateY(20px);
  }
}
</style>
