import { projectFirestore } from "@/firebase/config";
import { ref } from "vue";

const useDocument = (collection, id) => {
  const error = ref(null);
  const isPending = ref(false);

  const docRef = projectFirestore.collection(collection).doc(id);

  const deleteDoc = async () => {
    isPending.value = true;
    error.value = null;
    try {
      const res = await docRef.delete();
      isPending.value = false;
      return res;
    } catch (err) {
      error.value = "Could not delete a playlist";
      isPending.value = false;
    }
  };

  const updateDoc = async (updates) => {
    isPending.value = true;
    error.value = null;
    try {
      const res = await docRef.update(updates);
      isPending.value = false;
      return res;
    } catch (err) {
      error.value = "Could not add a song";
      isPending.value = false;
    }
  };

  return { deleteDoc, error, isPending, updateDoc };
};

export default useDocument;
