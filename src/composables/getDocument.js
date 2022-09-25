import { projectFirestore } from "@/firebase/config";
import { ref, watchEffect } from "vue";

const getDocument = (collection, id) => {
  const error = ref(null);
  const document = ref(null);

  const collectionRef = projectFirestore.collection(collection).doc(id);

  const unsub = collectionRef.onSnapshot(
    (doc) => {
      if (doc.data()) {
        document.value = { ...doc.data(), playlistId: id };
        error.value = null;
      } else {
        document.value = null;
        error.value = "That document does not exist";
      }
    },
    (err) => {
      document.value = null;
      error.value = "Could not fetch the data";
    }
  );

  watchEffect((onInvalidate) => {
    onInvalidate(() => unsub());
  });

  return { error, document };
};

export default getDocument;
