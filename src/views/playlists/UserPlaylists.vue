<template>
  <div class="container">
    <p class="title">USER PLAYLISTS</p>

    <div v-if="error" class="error">{{ error }}</div>
    <div v-if="documents">
      <ListView :playlists="documents" />
    </div>
    <router-link :to="{ name: 'CreatePlaylists' }">
      <button>Create a new playlist</button>
    </router-link>
  </div>
</template>

<script>
import ListView from "@/components/ListView.vue";
import getCollection from "@/composables/getCollection";
import getUser from "@/composables/getUser";

export default {
  components: {
    ListView,
  },
  setup() {
    const { user } = getUser();
    const { error, documents } = getCollection("playlists", [
      "userId",
      "==",
      user.value.uid,
    ]);
    return { error, documents };
  },
};
</script>

<style scoped>
.title {
  font-weight: 700;
  font-size: 20px;
  margin: 30px 0;
}
</style>
