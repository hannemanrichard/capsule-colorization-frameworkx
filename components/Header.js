import {
  ChartPieIcon,
  CalendarIcon,
  Cog8ToothIcon,
  CubeIcon,
  FolderOpenIcon,
  InboxStackIcon,
} from "@heroicons/react/24/outline";
import Alert from "@mui/material/Alert";

function Header() {
  return (
    <div className="w-full h-48 bg-[#F2F0F0] flex justify-between">
      <div className="flex-1 pl-4">
        <div className="h-full w-full flex items-center">
          <div>
            <img src="avatar.jpg" className="h-32 w-32 rounded-lg" />
          </div>
          <div className="ml-6">
            <h1 className="text-2xl font-bold tracking-widest uppercase">
              John Scalley
            </h1>

            <p className="text-gray-600 mt-2 text-lg">
              42 yo.<span className="mx-3">male</span>
              <span>Apr 15 2022</span>
            </p>
            <p className=" text-gray-600 text-lg">
              1901 Thornridge Cir. Shiloh, Hawaii 81063
            </p>
          </div>
        </div>
      </div>
      <div className="w-2/5 p-4 bg-[#D4E7EE]">
        <p className="mb-3 text-gray-700">
          Number of emergency images to colorize:
        </p>
        <input type="text" className="p-4" placeholder="eg. 3" />
        <button className="p-4 w-40 uppercase font-bold hover:bg-gray-600 bg-black text-white">
          colorize
        </button>
        <Alert severity="success" className="mt-4" color="info">
          Two pathological sequences have been detected!
        </Alert>
      </div>
      <div className="justify-end w-40 bg-[#AEC7D0]">
        <div className="h-full w-full flex items-center">
          <div className="text-center w-full">
            <h1 className="text-white text-3xl font-bold">11/07</h1>
            <p className="text-white text-lg">Next visit</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
