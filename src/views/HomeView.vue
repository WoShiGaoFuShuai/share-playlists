<template>
  <div class="home container">
    <p>Homepage</p>

    <div v-if="documents">
      <ListView :playlists="documents" />
    </div>
    <div v-if="error">{{ error }}</div>
  </div>
</template>

<script>
// @ is an alias to /src
import ListView from "@/components/ListView.vue";
import getCollection from "@/composables/getCollection";

export default {
  name: "HomeView",
  components: {
    ListView,
  },
  setup() {
    //COMPOSABLES
    const { error, documents } = getCollection("playlists");

    return { error, documents };
  },
};
</script>

<style scoped>
.home {
  margin-top: 50px;
  text-align: left;
}
</style>
