<template>
  <div class="navbar">
    <div class="navbar-container container">
      <div class="left">
        <img src="../assets/avatar-ninja.png" alt="Avatar-ninja" />
        <router-link :to="{ name: 'Home' }">
          <h2>Muso Ninjas</h2>
        </router-link>
      </div>
      <div class="right">
        <div v-if="user" class="right__userinfo">
          <!-- {{ user }} -->
          <span v-if="computedUser" class="username"
            >Hi there, {{ computedUser.displayName }}!</span
          >
          <router-link :to="{ name: 'UserPlaylists' }"
            >My Playlists</router-link
          >
          <router-link :to="{ name: 'CreatePlaylists' }"
            >Create Playlists</router-link
          >
          <button v-if="!isPending" @click="handleClick">Logout</button>
          <button v-else>Loading...</button>
        </div>
        <div class="noUser" v-else>
          <router-link :to="{ name: 'Login' }">
            <button>Login</button>
          </router-link>
          <router-link :to="{ name: 'Signup' }">
            <button>Sign up</button>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import getUser from "@/composables/getUser";
import useLogout from "@/composables/useLogout";
import { useRouter } from "vue-router";
import { computed, onMounted, onUpdated } from "@vue/runtime-core";
import store from "@/store";

export default {
  setup() {
    //COMPOSBALES
    const { user } = getUser();
    const { logout, error, isPending } = useLogout();
    const router = useRouter();

    //FUNCTIONS
    const handleClick = async () => {
      await logout();
      if (!error.value) {
        store.dispatch("logoutUserAction");
        router.push({ name: "Login" });
      }
    };

    const computedUser = computed(() => {
      return store.state.user;
    });

    return { user, error, isPending, handleClick, computedUser };
  },
};
</script>

<style lang="scss" scoped>
.navbar {
  padding: 5px 0px;
  background-color: white;

  .router-link-exact-active {
    font-weight: 700;
  }

  .navbar-container {
    display: flex;
    justify-content: space-between;
    align-items: center;

    .left {
      display: flex;
      align-items: center;

      img {
        max-height: 60px;
        border-radius: 50%;
        display: inline-block;
      }

      h2 {
        display: inline-block;
        margin-left: 25px;
        margin-right: 10px;

        @media (max-width: 500px) {
          display: none;
        }
      }
    }

    .right {
      display: flex;
      align-items: center;
      margin-left: 16px;

      @media (max-width: 500px) {
        width: 100%;
      }

      &__userinfo {
        @media (max-width: 500px) {
          display: flex;
          flex-direction: column;
          width: inherit;
          align-items: center;
          margin: 10px 0;
        }
      }

      button,
      a {
        margin-right: 15px;
        @media (max-width: 605px) {
          display: inline-block;
          margin-bottom: 5px;
          margin-top: 5px;
        }

        &:last-child {
          margin-right: 0;
        }

        @media (max-width: 500px) {
          margin-right: 0;
        }
      }

      span {
        margin-right: 50px;

        @media (max-width: 500px) {
          margin-right: 0;
        }
      }

      .username {
        font-weight: 700;
      }

      .noUser {
        a {
          margin: 10px;

          button {
            @media (max-width: 320px) {
              margin: 5px;
            }
          }
        }
      }
    }
  }
}
</style>
