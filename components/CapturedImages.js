import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import Loader from "./Loader";
import { Alert } from "@mui/material";
import { RotatingLines } from "react-loader-spinner";

function CapturedImages({
  triggerColorize,
  handleLoading,
  handleIsColorized,
  limit,
  selectedSequence,
  selectedSequenceImages,
  onTriggerColorize,
  onIsColorizedChange,
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
  const [loading, setLoading] = useState(false);
  const [loadingEmergency, setLoadingEmergency] = useState(true);

  useEffect(() => {
    // const index = 8;
    if (triggerColorize) {
      setLoadingImage(true);
      handleLoading(true);
      setLoading(true);
      const intervalId = setInterval(() => fetchImages(), 1000);
      console.log("index =>", index);
      console.log("[start, end] =>", currentImageIdx);
      console.log("is start: ", currentImageIdx[0] < 0);
      console.log("is end: ", currentImageIdx[1] > sequenceImages.length - 1);
      // if (index > limit) {
      //   setLoadingEmergency(false);
      // }
      if (
        // index > 5
        currentImageIdx[0] < 0 &&
        currentImageIdx[1] > sequenceImages.length - 1
      ) {
        clearInterval(intervalId);
        setLoadingImage(false);
        handleLoading(false);
        setLoading(false);
        handleIsColorized(true);
        setIndex(1);
        // onTriggerColorize(false);
        console.log(loading);
        console.log("is ending...");
      }
      return () => {
        // setIndex(1);
        console.log("ended");
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
    if (triggerColorize) {
      if (
        // index > 5
        currentImageIdx[0] < 0 &&
        currentImageIdx[1] > sequenceImages.length - 1
      ) {
        onTriggerColorize(false);
      }
    }
  }, [currentImageIdx]);

  useEffect(() => {
    setSequenceImages(selectedSequenceImages);
    setSequence(selectedSequence);
    setIndex(1);
    if (selectedSequence === "sequence3") {
      setStart(51);
      setEnd(68);
      setCurrentImageIdx([51 - index, 68 + index]);
    }
    if (selectedSequence === "sequence2") {
      setStart(40);
      setEnd(45);
      setCurrentImageIdx([40 - index, 45 + index]);
    }

    if (selectedSequence === "sequence1") {
      setStart(42);
      setEnd(47);
      setCurrentImageIdx([42 - index, 47 + index]);
    }
  }, [selectedSequenceImages, selectedSequence, onTriggerColorize]);
  const fetchImages = async () => {
    try {
      // setLoadingImage(true);
      setCurrentImageIdx([start - index, end + index]);
      const isStart = start - index < 0;
      const isEnd = end + index > sequenceImages.length - 1;
      console.log("start: ", isStart);
      console.log("isEnd:", isEnd);
      const res = await axios.post("/api/", {
        seq: selectedSequence,
        idx: index,
        iss: isStart,
        ise: isEnd,
      });
      const newSequence = [...sequenceImages];

      newSequence[start - index] = res.data.start;
      newSequence[end + index] = res.data.end;
      console.log(`start: ${res.data.start}, end: ${res.data.end}`);
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
    <div className="lg:ml-20 lg:mr-20 lg:mx-4 md:flex">
      <div className="w-full md:w-1/5 md:px-2 p-6">
        <div className="">
          <div className="p-5 font-medium text-left text-gray-500 border border-b-0 border-gray-200 rounded-t-xl focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-800 bg-gray-100 ">
            <h1 className="font-bold text-gray-600">Preview Image</h1>
          </div>
          <div className="p-4 border border-gray-200">
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
      <div className="w-full md:w-4/5 p-6">
        <div className="w-full p-5 font-medium text-left text-gray-500 border border-b-0 border-gray-200 rounded-t-xl focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-800 bg-gray-100 ">
          <h1 className="font-bold text-gray-600">Captured images</h1>
        </div>
        {loading && loadingEmergency && (
          <Alert severity="info" className="mt-4 mb-4" color="warning">
            Colorizing emergency in progress!
          </Alert>
        )}
        {loading && !loadingEmergency && (
          <Alert severity="info" className="mt-4 mb-4" color="info">
            Colorizing rest of sequence in progress!
          </Alert>
        )}
        <div className="h-3/4 overflow-scroll scrollbar-hide p-5 border  border-gray-200 dark:border-gray-700 dark:bg-gray-900">
          <div className="grid md:grid-cols-6 sm:grid-cols-3 grid-cols-2 lg:grid-cols-12 gap-1">
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
                        <div className="flex h-full justify-center items-center">
                          <RotatingLines
                            visible={true}
                            height="32"
                            width="32"
                            strokeColor="#fff"
                            strokeWidth="4"
                            animationDuration="0.75"
                            ariaLabel="rotating-lines-loading"
                            // style={}
                            wrapperStyle={{ top: "10px", left: "10px" }}
                            wrapperClass="ro"
                          />
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default CapturedImages;
