import { Menu, MenuButton, MenuItem, MenuList } from "@reach/menu-button";
import "@reach/menu-button/styles.css";
import React from "react";
import { useHistory } from "react-router-dom";
import Avatar from "../styles/Avatar";
import { SignoutIcon } from "./Icons";
import { signoutUser } from "../utils/api-client";

function UserDropdown({ user }) {
  const history = useHistory();

  return (
    <Menu>
      <MenuButton>
        <Avatar className="pointer" src={user.avatar} alt={user.username} />
      </MenuButton>
      <MenuList>
        <MenuItem onSelect={signoutUser}>
          <SignoutIcon />
          <span>Sign out</span>
        </MenuItem>
      </MenuList>
    </Menu>
  );
}

export default UserDropdown;
