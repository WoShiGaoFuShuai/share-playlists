import { projectFirestore } from "@/firebase/config";
import { ref } from "vue";

const useCollection = (collection) => {
  const error = ref(null);

  const addDoc = async (doc) => {
    error.value = null;

    try {
      const res = await projectFirestore.collection(collection).add(doc);

      if (!res) {
        throw Error("Sorry, we can not add file to the collection");
      }

      return res;
    } catch (err) {
      error.value = err.message;
    }
  };

  return { error, addDoc };
};

export default useCollection;
