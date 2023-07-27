import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { sequence1 } from "../data/seq";
import Loader from "./Loader";

function CapturedImages({
  triggerColorize,
  handleLoading,
  handleIsColorized,
  limit,
}) {
  const [currentImage, setCurrentImage] = useState("sequence1/0001.jpg");
  const [sequence, setSequence] = useState("sequence1");
  const [sequenceImages, setSequenceImages] = useState(sequence1);
  const [index, setIndex] = useState(1);
  const [currentImageIdx, setCurrentImageIdx] = useState([]);
  const [loadingImage, setLoadingImage] = useState(false);

  useEffect(() => {
    const start = 42;
    const end = 47;
    // const index = 8;
    if (triggerColorize) {
      setLoadingImage(true);
      handleLoading(true);

      const intervalId = setInterval(() => fetchImages(start, end), 5000);

      if (index > limit) {
        clearInterval(intervalId);
        setLoadingImage(false);
        handleLoading(false);
        handleIsColorized(true);
      }
      return () => {
        clearInterval(intervalId);
      };
    }
  }, [index, triggerColorize, limit]);

  const fetchImages = async (start, end) => {
    try {
      // setLoadingImage(true);
      setCurrentImageIdx([start - index, end + index]);
      const res = await axios.post("/api/", {
        seq: "sequence1",
        idx: index,
      });
      const newSequence = [...sequenceImages];

      newSequence[start - index] = res.data.start;
      newSequence[end + index] = res.data.end;

      setSequenceImages(newSequence);
      const newIndex = index + 1;
      setIndex(newIndex);
      setLoadingImage(false);
    } catch (error) {
      console.log(error);
    }
  };

  const isExternalUrl = (input) => {
    return input.slice(0, 4) === "http";
  };

  return (
    <>
      <div className="w-3/5 p-6">
        <div className="bg-[#E5E8EC] p-4 mb-4">
          <h1 className="font-bold text-gray-600">Captured images</h1>
        </div>
        <div className="h-3/4 overflow-scroll scrollbar-hide">
          <div className="grid grid-cols-8 gap-1">
            {sequenceImages.map((image, key) => (
              <div className="cursor-pointer relative" key={key}>
                <img
                  src={
                    isExternalUrl(image)
                      ? image
                      : `capsule/${sequence}/${image}`
                  }
                  onClick={() => setCurrentImage(image)}
                />
                {currentImageIdx.includes(key) && loadingImage && (
                  <div
                    style={{
                      background: "rgba(0, 0, 0, 0.5)",
                      position: "absolute",
                      top: 0,
                      left: 0,
                      right: 0,
                      bottom: 0,
                    }}
                  >
                    <Loader />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="w-2/5 p-6">
        <div className="bg-[#F8F8F8]">
          <div className="bg-[#D4E7EE] p-4 mb-2">
            <h1 className="font-bold text-gray-600">Preview Image</h1>
          </div>
          <div className="p-4 pb-0">
            <img
              className="w-full h-full"
              // src={`capsule/${sequence}/${currentImage}`}
              src={`capsule/${sequence}/${sequenceImages[43]}`}
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default CapturedImages;
