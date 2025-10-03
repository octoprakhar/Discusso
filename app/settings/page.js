import SettingsItem from "../_components/SettingsItem";
import SettingsOptions from "../_components/SettingsOptions";

export default function Page() {
  return (
    <div className="sm:w-[90%] md:w-[85%] mx-auto px-2 py-1 space-y-2">
      <h1 className="text-3xl md:text-5xl font-bold">Settings</h1>
      <SettingsOptions />
    </div>
  );
}
