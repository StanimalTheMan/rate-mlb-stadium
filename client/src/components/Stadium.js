import React from "react";
import { Link } from "react-router-dom";

function Stadium({ stadium }) {
  // to get the images of team logo
  const teamNameSplit = stadium.team.split(" ");
  const teamNameAbbrev =
    stadium.team === "Boston Red Sox" || stadium.team === "Chicago White Sox"
      ? teamNameSplit.slice(teamNameSplit.length - 2).join("")
      : teamNameSplit[teamNameSplit.length - 1];

  return (
    <Link to={{ pathname: `/stadiums/${stadium.id}`, state: { stadium } }}>
      <img
        src={process.env.PUBLIC_URL + `/images/${teamNameAbbrev}.svg`}
        alt="Stadium"
        width="500"
        height="500"
      />
      <h1>{stadium.name}</h1>
    </Link>
  );
}

export default Stadium;
