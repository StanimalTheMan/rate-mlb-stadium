import React from "react";

function Review({ review }) {
  return (
    <>
      <div
        style={{
          border: "white solid 5px",
          display: "box",
          textAlign: "center",
          marginLeft: "auto",
          marginRight: "auto",
        }}
      >
        <p>Overall Rating: {review.overallRating}</p>
        <p>Cleanliness Rating: {review.cleanlinessRating}</p>
        <p>Fans Atmosphere Rating: {review.fansAtmosphereRating}</p>
        <p>Recommends: {review.recommends ? "Yes" : "No"}</p>
        <p>Review: {review.text}</p>
        <p>By: {review.user.username}</p>
        <p>Created at: {review.createdAt}</p>
      </div>
      <br />
    </>
  );
}

export default Review;
