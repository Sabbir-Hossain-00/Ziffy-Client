import { HiUserCircle, HiSpeakerphone } from "react-icons/hi";
import { MdManageAccounts, MdReport } from "react-icons/md";
import MenuItem from "./MenuItem";

export const AdminMenu = () => {
  return (
    <>
      <MenuItem
        icon={MdManageAccounts}
        label="Manage Users"
        address="/dashboard/manage-user"
      />
      <MenuItem
        icon={MdReport}
        label="Reported Comments"
        address="/dashboard/reported-comments"
      />
      <MenuItem
        icon={HiSpeakerphone}
        label="Make Announcement"
        address="/dashboard/make-announcement"
      />
    </>
  );
};
