import { projectAuth } from "@/firebase/config";
import { ref } from "vue";

const error = ref(null);
const isPending = ref(false);

const signup = async (email, password, nickname) => {
  error.value = null;
  isPending.value = true;
  try {
    const res = await projectAuth.createUserWithEmailAndPassword(
      email,
      password
    );
    if (!res) {
      throw Error("Could not complete signup");
    }

    await res.user.updateProfile({
      displayName: nickname,
    });
    error.value = null;
    isPending.value = false;

    return res;
  } catch (err) {
    error.value = err.message;
    console.log(err.message);
    isPending.value = false;
  }
};

const useSignup = () => {
  return { error, signup, isPending };
};

export default useSignup;
