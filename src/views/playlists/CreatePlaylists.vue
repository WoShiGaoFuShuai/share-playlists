<template>
  <div class="create-playlists">
    <form @submit.enter.prevent="handleSubmit">
      <h2>Create New Playlist</h2>

      <input
        type="text"
        required
        placeholder="Playlist title"
        v-model="title"
      />
      <textarea
        v-model="description"
        placeholder="Playlist description..."
        required
      ></textarea>

      <label>
        <p>Upload playlist cover image</p>
        <input type="file" @change="handleChange" />
      </label>
      <div v-if="errorTypes" class="error">{{ errorTypes }}</div>

      <button v-if="!isPending">Create</button>
      <button v-else disabled>Loading...</button>
    </form>
  </div>
</template>

<script>
import { ref } from "@vue/reactivity";
import useCollection from "@/composables/useCollection";
import { timestamp } from "@/firebase/config";
import { user } from "@/composables/getUser";
import getUser from "@/composables/getUser";
import useStorage from "@/composables/useStorage";
import { useRouter } from "vue-router";

export default {
  setup() {
    //COMPOSABLES
    const { addDoc, error } = useCollection("playlists");
    const { user } = getUser();
    const { url, filePath, uploadImage } = useStorage();
    const router = useRouter();

    //REFS
    const title = ref("");
    const description = ref("");
    const errorTypes = ref(false);
    const file = ref(null);
    const isPending = ref(false);

    //FUNCTIONS
    const handleSubmit = async () => {
      // isPending.value = true;
      if (file.value) {
        isPending.value = true;

        await uploadImage(file.value);
        const object = {
          title: title.value,
          description: description.value,
          createdAt: timestamp(),
          songs: [],
          userId: user.value.uid,
          userName: user.value.displayName,
          coverUrl: url.value,
          filePath: filePath.value,
        };

        const res = await addDoc(object);

        if (!error.value) {
          router.push({
            name: "PlaylistDetails",
            params: { playlistId: res.id },
          });
        }

        isPending.value = false;
        // return res;
      }
    };

    const requiredTypes = ["image/jpeg", "image/png"];

    const handleChange = (e) => {
      errorTypes.value = false;
      const selected = e.target.files[0];
      file.value = null;
      if (selected && requiredTypes.includes(selected.type)) {
        file.value = selected;
      } else {
        errorTypes.value = "Sorry, we can accept images only (jpeg or png)";
      }
    };

    return {
      title,
      description,
      handleSubmit,
      handleChange,
      errorTypes,
      isPending,
      uploadImage,
    };
  },
};
</script>

<style lang="scss" scoped>
.create-playlists {
  margin-top: 100px;

  form {
    overflow: hidden;
    text-align: left;

    h2,
    p {
      padding: 10px;
    }

    h2 {
      font-size: 16px;
    }

    textarea {
      min-height: 40px;
      max-width: 100%;
      min-width: 100%;
    }
  }
}
</style>
