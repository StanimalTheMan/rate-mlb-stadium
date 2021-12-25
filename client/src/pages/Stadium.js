import React from "react";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import Button from "@material-ui/core/Button";
import { client } from "../utils/api-client";
import { useAuth } from "../context/auth-context";
import NoResults from "../components/NoResults";
import Skeleton from "../skeletons/StadiumSkeleton";
import AddReview from "../components/AddReview";
import Review from "../components/Review";

const stadiumImgStyle = {
  display: "block",
  marginTop: "10px",
  marginLeft: "auto",
  marginRight: "auto",
  width: "1000px",
  height: "500px",
};

function Stadium() {
  const [open, setOpen] = React.useState(false);
  const [stadium, setStadium] = React.useState(null);
  const user = useAuth();
  const { stadiumId } = useParams();
  const { isLoading } = useQuery(
    ["Stadium", stadiumId],
    () => client.get(`/stadiums/${stadiumId}`).then((res) => res.data.stadium),
    {
      onSuccess: setStadium,
    }
  );

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  if (isLoading) {
    return <Skeleton />;
  }

  if (!isLoading && !stadium) {
    return (
      <NoResults
        title="Page not found"
        text="The page you are looking for is not found or it may have been removed"
      />
    );
  }

  console.log("STADIUM", stadium.reviews);
  return (
    <div style={{ marginTop: "100px" }}>
      <header>
        <div
          style={{
            display: "box",
            textAlign: "center",
            marginLeft: "auto",
            marginRight: "auto",
          }}
        >
          <h1>{stadium.name}</h1>
          <h2> Home of the {stadium.team}</h2>
          <h2>Average Overall Rating: {stadium.avgOverallRating}</h2>
          <h2>
            Average Overall Cleanliness Rating: {stadium.avgCleanlinessRating}
          </h2>
          <h2>
            Average Overall Fans Atomosphere Rating:{" "}
            {stadium.avgFansAtmosphereRating}
          </h2>
          <h2>Average Food Rating: {stadium.avgFoodRating}</h2>
          {user && (
            <Button
              style={{ backgroundColor: "white", color: "black" }}
              onClick={handleClickOpen}
            >
              Add Review
            </Button>
          )}
        </div>
        {
          <AddReview
            open={open}
            handleClose={handleClose}
            user={user}
            stadium={stadium}
          />
        }
        <img
          style={stadiumImgStyle}
          src={stadium.image}
          alt={`picture of ${stadium.name}`}
        />
      </header>
      <ul>
        <h2 style={{ textAlign: "center" }}>All Reviews</h2>
        {stadium.reviews.map((review) => (
          <Review key={review.createdAt} review={review} />
        ))}
      </ul>
    </div>
  );
}

export default Stadium;
