<template>
  <div>
    <button @click="showForm = !showForm" v-if="!showForm">Add songs</button>
    <form @submit.enter.prevent="handleSubmit" v-if="showForm">
      <input type="text" v-model="title" required placeholder="Song Title" />
      <input type="text" v-model="artist" required placeholder="Artist" />
      <button>Add</button>
      <button @click="showForm = false">Close</button>
    </form>
  </div>
</template>

<script>
import { ref } from "@vue/reactivity";
import useDocument from "@/composables/useDocument";

export default {
  props: {
    playlistId: {
      type: String,
      required: true,
    },
    playlist: {
      type: Object,
      required: true,
    },
  },
  setup(props) {
    //COMPOSABLES
    const { updateDoc } = useDocument("playlists", props.playlist.playlistId);

    //REFS
    const showForm = ref(false);
    const title = ref("");
    const artist = ref("");

    const handleSubmit = async () => {
      const newSong = {
        title: title.value,
        artist: artist.value,
        id: Math.floor(Math.random() * 10000000),
      };

      title.value = "";
      artist.value = "";

      await updateDoc({
        songs: [...props.playlist.songs, newSong],
      });
    };
    return { showForm, handleSubmit, title, artist };
  },
};
</script>

<style lang="scss" scoped>
button {
  margin: 0 auto;
  display: inline-block;
  margin: 5px;
}
form {
  max-width: 90%;
  margin-top: 20px;
}
</style>
