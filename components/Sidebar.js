import Icons from "./Icons";
// import { CalendarIcon } from "@heroicons/react/24/solid";
import {
  ChartPieIcon,
  CalendarIcon,
  Cog8ToothIcon,
  CubeIcon,
  FolderOpenIcon,
  InboxStackIcon,
} from "@heroicons/react/24/outline";

function Sidebar() {
  return (
    <div className="w-32 fixed bg-[#111111] h-screen flex flex-col justify-between">
      {/* Logo */}
      <div className="flex justify-center mt-5">
        <img src="logo.png" className="h-7" />
      </div>
      {/* Menu */}
      <div className="w-full mt-10 flex-1">
        <a
          href=""
          className="flex justify-center py-6 hover:bg-[#D9D9D9] group"
        >
          <ChartPieIcon className="h-6 w-6 text-[#D4E7EE] group-hover:text-black" />
        </a>
        <a
          href=""
          className="flex justify-center py-6 hover:bg-[#D9D9D9] group"
        >
          <CalendarIcon className="h-6 w-6 text-[#D4E7EE] group-hover:text-black" />
        </a>
        <a href="" className="flex justify-center py-6 bg-[#D9D9D9] group">
          <FolderOpenIcon className="h-6 w-6 text-black" />
        </a>
        <a
          href=""
          className="flex justify-center py-6 hover:bg-[#D9D9D9] group"
        >
          <CubeIcon className="h-6 w-6 text-[#D4E7EE] group-hover:text-black" />
        </a>
        <a
          href=""
          className="flex justify-center py-6 hover:bg-[#D9D9D9] group"
        >
          <InboxStackIcon className="h-6 w-6 text-[#D4E7EE] group-hover:text-black" />
        </a>
      </div>
      <div className="flex justify-end justify-center">
        <div className="mb-12">
          <a href="" className="flex justify-center p-2 mb-6">
            <Cog8ToothIcon className="h-6 w-6 text-[#D4E7EE]" />
          </a>
          <a href="" className="flex justify-center p-2">
            <img
              class="inline-block h-12 w-12 rounded-full ring-2 ring-white/40"
              src="https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50"
              alt="Peter thiel"
            />
          </a>
        </div>
      </div>

      {/* Settings */}
    </div>
  );
}

export default Sidebar;
