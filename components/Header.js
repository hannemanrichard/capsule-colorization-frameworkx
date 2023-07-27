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

function Header({
  onTriggerColorize,
  loading,
  isColorized,
  handleLimit,
  limit,
}) {
  const handleColorizeTrigger = () => {
    onTriggerColorize(true);
  };

  return (
    <div className="w-full h-48 bg-[#F2F0F0] flex justify-between">
      <div className="flex-1 pl-4">
        <div className="h-full w-full flex items-center">
          <div>
            <img src="avatar.png" className="h-32 w-32 rounded-lg" />
          </div>
          <div className="ml-6">
            <h1 className="text-2xl font-bold tracking-widest uppercase">
              Patient Name
            </h1>

            <p className="text-gray-600 mt-2 text-lg">
              Age.<span className="mx-3">Gender</span>
              <span>Date of birth</span>
            </p>
            <p className=" text-gray-600 text-lg">Street address, city</p>
          </div>
        </div>
      </div>
      <div className="w-2/5 p-4 bg-[#D4E7EE]">
        <p className="mb-3 text-gray-700">
          Number of emergency images to colorize:
        </p>
        <input
          type="number"
          value={limit}
          onChange={(e) => handleLimit(e.target.value)}
          max={10}
          className="p-4"
          placeholder="eg. 3"
        />
        <button
          onClick={handleColorizeTrigger}
          className="p-4 w-40 uppercase font-bold hover:bg-gray-600 bg-black text-white"
        >
          {loading && <Spinner />}
          colorize
        </button>
        {loading && (
          <Alert severity="info" className="mt-4" color="info">
            Colorizing sequence in progress!
          </Alert>
        )}
        {isColorized && (
          <Alert severity="success" className="mt-4" color="success">
            The images have been successfully colorized!
          </Alert>
        )}
      </div>
      <div className="justify-end w-40 bg-[#AEC7D0]">
        <div className="h-full w-full flex items-center">
          <div className="text-center w-full">
            <h1 className="text-white text-3xl font-bold">11/05</h1>
            <p className="text-white text-lg">Next visit</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
