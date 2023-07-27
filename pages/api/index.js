import supabase, { storage } from "../../firebase-config";
import { sequence1 } from "../../data/seq";
import { getDownloadURL, ref } from "firebase/storage";

const start = 42;
const end = 47;

export default async function handler(req, res) {
  console.log(sequence1[start - 1]);
  const index = req.body.idx;
  const sequence = req.body.seq;

  console.log("index = ", index);
  console.log(`sequence = ${sequence}`);
  try {
    const pathRefStart = ref(
      storage,
      `${sequence}/${sequence1[start - index]}`
    );
    const pathRefEnd = ref(storage, `${sequence}/${sequence1[end + index]}`);

    const startUrl = await getDownloadURL(pathRefStart);
    const endUrl = await getDownloadURL(pathRefEnd);

    res.status(200).json({ start: startUrl, end: endUrl });
  } catch (error) {
    res.status(400).json({ error: error.body });
  }
}
