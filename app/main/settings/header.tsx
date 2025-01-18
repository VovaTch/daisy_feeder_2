import { Settings } from "lucide-react";

const SettingsHeader = () => {
  return (
    <div
      className="flex flex-row absolute top-0 left-0 w-full  items-center justify-center text-center h-20 text-4xl
    text-white bg-orange-500/80"
    >
      <Settings className="h-[40px] w-[40px]" />
      <h1>Settings</h1>
    </div>
  );
};

export default SettingsHeader;
