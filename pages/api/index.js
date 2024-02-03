import supabase, { storage } from "../../firebase-config";
import { sequence1, sequence2, sequence3, sequence4 } from "../../data/seq";
import { getDownloadURL, ref } from "firebase/storage";

export default async function handler(req, res) {
  const index = req.body.idx;
  const sequence = req.body.seq;
  const isEnd = req.body.ise;
  const isStart = req.body.iss;

  console.log("index = ", index);
  console.log(`sequence = ${sequence}`);

  let selectedSequence;
  let start, end;
  if (sequence === "sequence1") {
    selectedSequence = sequence1;
    start = 42;
    end = 47;
  } else if (sequence === "sequence2") {
    selectedSequence = sequence2;
    start = 40;
    end = 45;
  } else if (sequence === "sequence3") {
    selectedSequence = sequence3;
    start = 51;
    end = 68;
  } else if (sequence === "sequence4") {
    selectedSequence = sequence4;
    start = 50;
    end = 69;
  }
  try {
    const pathRefStart = ref(
      storage,
      `${sequence}/${selectedSequence[start - index]}`
    );
    const pathRefEnd = ref(
      storage,
      `${sequence}/${selectedSequence[end + index]}`
    );

    const startUrl = isStart ? null : await getDownloadURL(pathRefStart);
    const endUrl = isEnd ? null : await getDownloadURL(pathRefEnd);

    res.status(200).json({ start: startUrl, end: endUrl });
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: error });
  }
}
