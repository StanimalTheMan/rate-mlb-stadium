import React from "react";
import { useLocation } from "react-router-dom";
import Stadium from "../components/Stadium";
import Wrapper from "../styles/Home";
import VideoGrid from "../styles/VideoGrid";

function Home({ filteredStadiums }) {
  const location = useLocation();
  console.log("sfsfsdf", location);
  console.log(filteredStadiums);
  if (location.state && location.state.filteredStadiums.length > 0) {
    filteredStadiums = location.state.filteredStadiums;
  }
  return (
    <Wrapper>
      <VideoGrid>
        {filteredStadiums.map((stadium) => (
          <Stadium key={stadium.id} stadium={stadium} />
        ))}
      </VideoGrid>
    </Wrapper>
  );
}

export default Home;
