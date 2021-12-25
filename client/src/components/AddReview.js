import React from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import TextareaAutosize from "@material-ui/core/TextareaAutosize";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import { addReview } from "../utils/api-client";

const minRating = 1;
const maxRating = 5;

export default function AddReview({ open, handleClose, user, stadium }) {
  const [checked, setChecked] = React.useState(true);
  const [reviewText, setReviewText] = React.useState("");
  const [foodRating, setFoodRating] = React.useState(3);
  const [fansAtmosphereRating, setFansAtmosphereRating] = React.useState(3);
  const [cleanlinessRating, setCleanlinessRating] = React.useState(3);
  console.log(user);
  const handleClick = () => {
    console.log(checked);
    console.log(reviewText);
    console.log(foodRating);
    console.log(fansAtmosphereRating);
    console.log(cleanlinessRating);
    addReview({
      stadium,
      text: reviewText,
      foodRating,
      fansAtmosphereRating,
      cleanlinessRating,
      recommends: checked,
    });
    handleClose();
  };

  return (
    <div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add a Review</DialogTitle>
        <DialogContent>
          <div>
            <TextareaAutosize
              onChange={(event) => setReviewText(event.target.value)}
              placeholder="Your Review"
            />
          </div>
          <div>
            <TextField
              type="number"
              value={foodRating}
              InputProps={{
                inputProps: {
                  max: 5,
                  min: 1,
                },
              }}
              label="Food Rating"
              onChange={(e) => {
                var value = parseInt(e.target.value, 10);

                if (value > maxRating) {
                  value = maxRating;
                }
                if (value < minRating) {
                  value = minRating;
                }

                setFoodRating(value);
              }}
            />
          </div>
          <div>
            <TextField
              type="number"
              value={fansAtmosphereRating}
              InputProps={{
                inputProps: {
                  max: 5,
                  min: 1,
                },
              }}
              label="Fans Rating"
              onChange={(e) => {
                var value = parseInt(e.target.value, 10);

                if (value > maxRating) {
                  value = maxRating;
                }
                if (value < minRating) {
                  value = minRating;
                }

                setFansAtmosphereRating(value);
              }}
            />
          </div>
          <div>
            <TextField
              type="number"
              value={cleanlinessRating}
              InputProps={{
                inputProps: {
                  max: 5,
                  min: 1,
                },
              }}
              label="Cleanliness Rating"
              onChange={(e) => {
                var value = parseInt(e.target.value, 10);

                if (value > maxRating) {
                  value = maxRating;
                }
                if (value < minRating) {
                  value = minRating;
                }

                setCleanlinessRating(value);
              }}
            />
          </div>
          <FormControlLabel
            control={
              <Checkbox
                checked={checked}
                onChange={(event) => setChecked(event.target.checked)}
                color="primary"
              />
            }
            label="Recommend"
            labelPlacement="start"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleClick}>Add Review</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
