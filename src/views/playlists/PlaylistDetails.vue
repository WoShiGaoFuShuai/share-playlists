<template>
  <div v-if="playlist" class="details container">
    <div class="details-content">
      <div class="left">
        <img :src="playlist.coverUrl" alt="Cover of a playlist" />
        <p class="title">{{ playlist.title }}</p>
        <p class="createdBy">Created by {{ playlist.userName }}</p>
        <p class="description">{{ playlist.description }}</p>
        <div v-if="ownership">
          <button @click="handleClick" v-if="!isPending">
            Delete Playlist
          </button>
          <button v-else disabled>Loading...</button>
        </div>
        <div class="error">{{ delitingError }}</div>
      </div>
      <div class="right">
        <div class="right__no-songs" v-if="!playlist.songs.length">
          No songs have been added to this playlist yet
        </div>
        <div class="songs-item" v-else>
          <div class="song-item" v-for="(song, i) in playlist.songs" :key="i">
            <span class="title">{{ song.title }}</span> -
            <span class="artist">{{ song.artist }}</span>
            <button v-if="ownership" @click="handleDelSong(song.id)">
              Delete
            </button>
          </div>
        </div>
        <AddSong
          :playlist="playlist"
          :playlistId="playlistId"
          v-if="ownership"
        />
      </div>
    </div>
  </div>
</template>

<script>
import getDocument from "@/composables/getDocument";
import getUser from "@/composables/getUser";
import useDocument from "@/composables/useDocument";
import useStorage from "@/composables/useStorage";

import AddSong from "@/components/AddSong.vue";

import { computed, ref } from "@vue/runtime-core";
import { useRouter } from "vue-router";

export default {
  props: {
    playlistId: {
      type: String,
      required: true,
    },
  },
  components: {
    AddSong,
  },
  setup(props) {
    //COMPOSABLES
    const { error, document: playlist } = getDocument(
      "playlists",
      props.playlistId
    );
    const { user } = getUser();
    const {
      deleteDoc,
      error: delitingError,
      updateDoc,
    } = useDocument("playlists", props.playlistId);
    const { deleteImage } = useStorage();
    const router = useRouter();

    //REFS
    const isPending = ref(false);

    //COMPUTED
    const ownership = computed(() => {
      return Boolean(user.value.uid === playlist.value.userId);
    });

    //FUNCTIONS
    const handleClick = async () => {
      isPending.value = true;

      await deleteImage(playlist.value.filePath);
      await deleteDoc();

      isPending.value = false;

      if (!delitingError.value) {
        router.push({ name: "Home" });
      }
    };

    const handleDelSong = async (id) => {
      const updates = playlist.value.songs.filter((song) => song.id !== id);
      await updateDoc({
        songs: [...updates],
      });
    };

    return {
      error,
      playlist,
      ownership,
      delitingError,
      handleClick,
      deleteImage,
      isPending,
      handleDelSong,
    };
  },
};
</script>

<style lang="scss" scoped>
.details {
  margin-top: 60px;

  &.container {
    width: 90%;

    @media (max-width: 768px) {
      margin-bottom: 30px;
    }

    @media (max-width: 500px) {
      margin-top: 30px;
    }
  }

  .details-content {
    display: grid;
    grid-template-columns: 1fr 2fr;

    @media (max-width: 768px) {
      grid-template-columns: 1fr;
    }

    .left {
      img {
        max-height: 200px;

        @media (max-width: 425px) {
          max-height: 150px;
        }
      }

      .title {
        font-weight: 700;
        font-size: 30px;
        text-align: center;
      }

      .createdBy {
        margin-bottom: 15px;
        text-align: center;
      }

      .description {
        text-align: center;
        margin-bottom: 15px;
      }
    }

    .right {
      margin-left: 15px;

      @media (max-width: 768px) {
        margin-left: 0;
      }

      &__no-songs {
        margin-bottom: 20px;
      }

      .song-item {
        display: flex;
        align-items: center;
        background-color: white;
        margin: 10px 0;
        box-shadow: 1px 1px 1px 0 rgba(0, 0, 0, 0.1);
        border-radius: 10px;
        padding: 10px;
        cursor: pointer;
        transition: all 0.3 ease-in;

        @media (max-width: 768px) {
          flex-direction: column;
          flex-wrap: wrap;
        }

        &:hover {
          transform: scale(1.005);
          background-color: rgb(223, 219, 219);
        }

        .title {
          font-weight: 600;
          margin-right: 30px;
          word-break: break-word;

          @media (max-width: 768px) {
            margin-right: 0;
            margin-top: 10px;
          }
        }

        .artist {
          font-style: italic;
          margin-left: 30px;
          margin-right: 20px;
          word-break: break-word;

          @media (max-width: 768px) {
            margin-right: 0;
            margin-left: 0;
            margin-bottom: 10px;
          }
        }

        button {
          margin-left: auto;

          @media (max-width: 768px) {
            margin-left: 0;
          }
        }
      }
    }
  }
}
</style>
