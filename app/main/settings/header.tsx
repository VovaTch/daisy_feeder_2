import { Settings } from "lucide-react";

/**
 * SettingsHeader component renders a header for the settings page.
 * It displays a centered title "Settings" with an icon.
 *
 * @returns {JSX.Element} The rendered header component.
 */
const SettingsHeader = () => {
  return (
    <div
      className="flex flex-row absolute top-0 left-0 w-full  items-center justify-center text-center h-20 
    text-white bg-orange-500/80"
    >
      <Settings className="h-[40px] w-[40px]" />
      <h1 className="lg:text-4xl text-2xl">Settings</h1>
    </div>
  );
};

export default SettingsHeader;
