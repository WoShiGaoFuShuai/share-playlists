<template>
  <router-link
    class="playlist"
    v-for="playlist in playlists"
    :key="playlist.playlistId"
    :to="{
      name: 'PlaylistDetails',
      params: { playlistId: playlist.playlistId },
    }"
  >
    <div class="image">
      <img :src="playlist.coverUrl" alt="" />
    </div>
    <div class="info">
      <p class="title">{{ playlist.title }}</p>
      <p class="username">{{ playlist.userName }}</p>
    </div>
    <div class="songs-quantity">
      <span>{{ playlist.songs.length }}</span>
    </div>
  </router-link>
</template>

<script>
export default {
  props: {
    playlists: {
      type: Array,
      required: true,
    },
  },
};
</script>

<style lang="scss" scoped>
.playlist {
  background-color: white;
  border-radius: 8px;
  display: flex;
  align-items: center;
  margin: 16px 0;
  padding: 20px;
  transition: all 0.3s ease-in;
  cursor: pointer;
  box-shadow: 2px 2px 1px 0 rgba(0, 0, 0, 0.1);

  &:hover {
    transform: scale(1.02);
  }

  .image {
    max-width: 100px;
    max-height: 100px;
    overflow: hidden;
    img {
      display: block;
      width: 100%;
      height: 100%;
    }
  }

  .info {
    text-align: left;
    font-family: "Nunito", sans-serif;
    color: var(--primary);
    margin: 20px;
    .title {
      font-weight: 700;
    }

    .username {
      font-style: italic;
    }
  }

  .songs-quantity {
    margin-left: auto;
    padding-right: 20px;
  }
}
</style>
