import {
  ChartPieIcon,
  CalendarIcon,
  Cog8ToothIcon,
  CubeIcon,
  FolderOpenIcon,
  InboxStackIcon,
} from "@heroicons/react/24/outline";
import Alert from "@mui/material/Alert";
import Spinner from "./Spinner";

import { sequence1, sequence2, sequence3 } from "../data/seq";
function Header({
  onTriggerColorize,
  loading,
  isColorized,
  handleLimit,
  limit,
  sequence,
  onSequenceChange,
}) {
  const handleColorizeTrigger = () => {
    console.log("clicked change");
    onTriggerColorize(true);
  };

  const handleSequenceChange = (newVal) => {
    let newSequence;
    if (newVal === "sequence1") newSequence = sequence1;
    if (newVal === "sequence2") newSequence = sequence2;
    if (newVal === "sequence3") newSequence = sequence3;

    onSequenceChange(newVal, newSequence);
  };

  return (
    <div className="w-full  flex items-center justify-center">
      <div className="lg:w-2/5 p-4 ">
        {/* <p className="mb-3 text-gray-700">
          choose the number of emergency images and the sequence:
        </p> */}
        <div class="mb-6">
          <label
            for="email"
            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Number of emergency images
          </label>
          <input
            type="number"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            value={limit}
            onChange={(e) => handleLimit(e.target.value)}
            max={10}
            placeholder="eg. 3"
          />
        </div>
        <div class="mb-6">
          <label
            for="countries"
            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Pathological sequence
          </label>
          <select
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            value={sequence}
            disabled={loading}
            onChange={(e) => handleSequenceChange(e.target.value)}
          >
            <option value={"sequence1"}>Angiectasia 04a7 2669-2768</option>
            <option value={"sequence2"}>Angiectasia 04a7 4717-4816</option>
            <option value={"sequence3"}>Ulcer 2fc3 1670-1770</option>
          </select>
        </div>

        <button
          onClick={handleColorizeTrigger}
          className="text-white bg-blue-700 hover:bg-blue-800 flex items-center focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          {loading && <Spinner />}
          colorize
        </button>

        {/* {isColorized && (
          <Alert severity="success" className="mt-4" color="success">
            The images have been successfully colorized!
          </Alert>
          
        )} */}
      </div>
      {/* <div className="flex-1 pl-4">
        <div className="h-full w-full flex items-center">
          <h1 className="text-2xl font-bold tracking-widest uppercase">
            Colorization Framework
          </h1>
        </div>
      </div> */}
    </div>
  );
}

export default Header;
