import { HiUserCircle, HiPlusCircle, HiCollection } from "react-icons/hi";
import MenuItem from "./MenuItem";

export const UserMenu = () => {
  return (
    <>
      <MenuItem
        icon={HiUserCircle}
        label="My Profile"
        address="/dashboard/my-profile"
      />
      <MenuItem
        icon={HiPlusCircle}
        label="Add Post"
        address="/dashboard/add-post"
      />
      <MenuItem
        icon={HiCollection}
        label="My Posts"
        address="/dashboard/my-post"
      />
    </>
  );
};
