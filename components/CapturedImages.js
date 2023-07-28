import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import Loader from "./Loader";

function CapturedImages({
  triggerColorize,
  handleLoading,
  handleIsColorized,
  limit,
  selectedSequence,
  selectedSequenceImages,
  selectedSequenceChange,
}) {
  const [currentImage, setCurrentImage] = useState(`0001.jpg`);
  const [sequence, setSequence] = useState(selectedSequence);
  const [sequenceImages, setSequenceImages] = useState(selectedSequenceImages);
  const [index, setIndex] = useState(1);
  const [currentImageIdx, setCurrentImageIdx] = useState([]);
  const [loadingImage, setLoadingImage] = useState(false);
  const [start, setStart] = useState(42);
  const [end, setEnd] = useState(47);

  useEffect(() => {
    // const index = 8;
    if (triggerColorize) {
      setLoadingImage(true);
      handleLoading(true);

      const intervalId = setInterval(() => fetchImages(), 1000);
      console.log(currentImageIdx);
      console.log("is start: ", currentImageIdx[0] < 0);
      console.log("is end: ", currentImageIdx[1] > sequenceImages.length - 1);
      if (
        // index > 5
        currentImageIdx[0] < 0 ||
        currentImageIdx[1] > sequenceImages.length - 1
      ) {
        clearInterval(intervalId);
        setLoadingImage(false);
        handleLoading(false);
        handleIsColorized(true);
      }
      return () => {
        clearInterval(intervalId);
      };
    }
  }, [
    index,
    triggerColorize,
    limit,
    start,
    end,
    currentImageIdx,
    sequenceImages,
  ]);

  useEffect(() => {
    setSequenceImages(selectedSequenceImages);
    setSequence(selectedSequence);
    if (selectedSequence === "sequence3") {
      setStart(51);
      setEnd(68);
    }
    if (selectedSequence === "sequence2") {
      setStart(40);
      setEnd(45);
    }

    if (selectedSequence === "sequence1") {
      setStart(42);
      setEnd(47);
    }
  }, [selectedSequenceImages, selectedSequence]);
  const fetchImages = async () => {
    try {
      // setLoadingImage(true);
      setCurrentImageIdx([start - index, end + index]);
      const isStart = start - index < 0;
      const isEnd = end + index > sequenceImages.length - 1;

      const res = await axios.post("/api/", {
        seq: selectedSequence,
        idx: index,
        iss: isStart,
        ise: isEnd,
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
    return input && input.slice(0, 4) === "http";
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
              <>
                {image && (
                  <div className="cursor-pointer relative" key={key}>
                    {key >= 0 && key <= sequenceImages.length - 1 && (
                      <img
                        src={
                          isExternalUrl(image)
                            ? image
                            : `capsule/${sequence}/${image}`
                        }
                        className={`border-4 ${
                          key >= start && key <= end
                            ? "border-red-500"
                            : "border-gray-100"
                        }`}
                        onClick={() => setCurrentImage(image)}
                      />
                    )}
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
                )}
              </>
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
              className={`w-full h-full`}
              src={
                isExternalUrl(currentImage)
                  ? currentImage
                  : `capsule/${sequence}/${currentImage}`
              }
              // src={`capsule/${sequence}/${sequenceImages[43]}`}
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default CapturedImages;
