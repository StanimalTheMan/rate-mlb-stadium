import React from "react";
import { useLocation } from "react-router-dom";
import Wrapper from "../styles/Navbar";
import GoogleAuth from "./GoogleAuth";
import { NavLink } from "react-router-dom";
import Search from "./Search";
import { useAuth } from "../context/auth-context";
import UserDropdown from "./UserDropdown";

function Navbar({ stadiums, filterStadiums }) {
  const user = useAuth();
  const location = useLocation();
  console.log(location);

  return (
    <Wrapper>
      <div className="logo flex-row">
        <span>
          <NavLink
            to={{ pathname: "/", state: { filteredStadiums: stadiums } }}
          >
            <img
              src={process.env.PUBLIC_URL + `/images/MLB.svg`}
              alt="mlb-logo"
              width="50"
              height="50"
            />
          </NavLink>
        </span>
      </div>

      {location.pathname === "/" && <Search filterStadiums={filterStadiums} />}

      <ul>
        <li>{user ? <UserDropdown user={user} /> : <GoogleAuth />}</li>
      </ul>
    </Wrapper>
  );
}

export default Navbar;
