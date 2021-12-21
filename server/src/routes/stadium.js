import { PrismaClient } from "@prisma/client";
import express from "express";
import { protect } from "../middleware/authorization";

const prisma = new PrismaClient();

function getStadiumRoutes() {
  const router = express.Router();

  router.get("/", getStadiums);

  router.get("/search", searchStadiums);

  router.post("/:stadiumId/reviews", protect, addReview);
  router.delete("/:stadiumId/reviews/:reviewId", protect, deleteReview);

  router.get("/:stadiumId", getStadium);

  return router;
}

async function getStadiumReviews(stadium) {
  const reviews = await prisma.review.findMany({
    where: {
      stadiumId: {
        equals: stadium.id,
      },
    },
    include: {
      user: true,
      stadium: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
  stadium.reviews = reviews;
  return stadium;
}

async function getStadiums(req, res) {
  let stadiums = await prisma.stadium.findMany({
    orderBy: {
      name: "asc",
    },
  });

  if (!stadiums.length) {
    return res.status(200).json({ stadiums });
  }

  // for (let stadium of stadiums) {
  //   stadium = await getStadiumReviews(stadium);
  // }
  res.status(200).json({ stadiums });
}

async function searchStadiums(req, res, next) {
  if (!req.query.query) {
    return next({
      message: "Please enter a search query",
      statusCode: 400,
    });
  }

  const stadiums = await prisma.stadium.findMany({
    where: {
      OR: [
        {
          name: {
            contains: req.query.query,
            mode: "insensitive",
          },
        },
        {
          team: {
            contains: req.query.query,
            mode: "insensitive",
          },
        },
      ],
    },
  });
  console.log(stadiums);

  if (!stadiums.length) {
    return res.status(200).json({ stadiums });
  }

  for (let stadium of stadiums) {
    stadium = await getStadiumReviews(stadium);
  }
  res.status(200).json({ stadiums });
}

async function addReview(req, res, next) {
  const stadium = await prisma.stadium.findUnique({
    where: {
      id: req.params.stadiumId,
    },
  });

  if (!stadium) {
    return next({
      message: `No stadium found with id: "${req.params.stadiumId}"`,
      statusCode: 404,
    });
  }
  const review = await prisma.review.create({
    data: {
      text: req.body.text,
      foodRating: req.body.foodRating,
      fansAtmosphereRating: req.body.fansAtmosphereRating,
      cleanlinessRating: req.body.cleanlinessRating,
      overallRating: Math.floor(
        (req.body.foodRating +
          req.body.fansAtmosphereRating +
          req.body.cleanlinessRating) /
          3
      ),
      recommends: req.body.recommends,
      user: {
        connect: {
          id: req.user.id,
        },
      },
      stadium: {
        connect: {
          id: req.params.stadiumId,
        },
      },
    },
  });

  res.status(200).json({ review });
}

async function deleteReview(req, res) {
  const review = await prisma.review.findUnique({
    where: {
      id: req.params.reviewId,
    },
    select: {
      userId: true,
    },
  });

  if (review.userId !== req.user.id) {
    return res.status(401).send("You are not authorized to delete this review");
  }

  await prisma.review.delete({
    where: {
      id: req.params.reviewId,
    },
  });

  res.status(200).json({});
}

async function getStadium(req, res, next) {
  let stadium = await prisma.stadium.findUnique({
    where: {
      id: req.params.stadiumId,
    },
  });

  if (!stadium) {
    return next({
      message: `No stadium found with name: "${req.params.stadiumName}"`,
      statusCode: 404,
    });
  }

  stadium = await getStadiumReviews(stadium);
  // probs better approach than using 4 different reducers to do similar logic
  const overallRatingReducer = (previousValue, currentValue) => {
    // console.log("Sfsdfsdfsdfsd", currentValue);
    return previousValue + currentValue.overallRating;
  };
  const foodRatingReducer = (previousValue, currentValue) =>
    previousValue + currentValue.foodRating;
  const fansAtmosphereReducer = (previousValue, currentValue) =>
    previousValue + currentValue.fansAtmosphereRating;
  const cleanlinessRatingReducer = (previousValue, currentValue) =>
    previousValue + currentValue.cleanlinessRating;
  const numReviews = stadium.reviews.length;
  // probs better approach out there than hardcoded default review values below
  let avgOverallRating = 3;
  let avgFoodRating = 3;
  let avgFansAtmosphereRating = 3;
  let avgCleanlinessRating = 3;
  if (numReviews > 0) {
    // probs inefficient to use reduce if there is only one review but this is temp approach
    console.log("1", stadium.reviews.reduce(overallRatingReducer, 0));
    avgOverallRating =
      stadium.reviews.reduce(overallRatingReducer, 0) / numReviews;
    avgFoodRating = stadium.reviews.reduce(foodRatingReducer, 0) / numReviews;
    avgFansAtmosphereRating =
      stadium.reviews.reduce(fansAtmosphereReducer, 0) / numReviews;
    avgCleanlinessRating =
      stadium.reviews.reduce(cleanlinessRatingReducer, 0) / numReviews;
  }

  // properties below don't exist on stadium model but whatever?
  stadium.avgOverallRating = avgOverallRating;
  stadium.avgFoodRating = avgFoodRating;
  stadium.avgFansAtmosphereRating = avgFansAtmosphereRating;
  stadium.avgCleanlinessRating = avgCleanlinessRating;

  res.status(200).json({ stadium });
}

export { getStadiumRoutes };
