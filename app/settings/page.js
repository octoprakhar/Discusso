import SettingsItem from "../_components/SettingsItem";
import SettingsOptions from "../_components/SettingsOptions";
import { getUserById } from "../_libs/data-service";
import { getUserId } from "../utils/userUtils";

export const dynamic = "force-dynamic";

export default async function Page() {
  let user;
  try {
    const id = await getUserId();
    user = await getUserById(id);
    console.log("🎁 Settings Page.js: user data is: ", user);
  } catch (err) {
    console.error(err);
  }

  return (
    <div className="sm:w-[90%] md:w-[85%] mx-auto px-2 py-1 space-y-2">
      <h1 className="text-3xl md:text-5xl font-bold">Settings</h1>
      <SettingsOptions user={user} />
    </div>
  );
}
