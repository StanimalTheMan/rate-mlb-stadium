import { PrismaClient } from "@prisma/client";
import express from "express";

const prisma = new PrismaClient();

function getStadiumRoutes() {
  const router = express.Router();

  router.get("/", getStadiums);

  router.get("/:stadiumId", getStadium);

  router.post("/:stadiumId/reviews", addReview);

  return router;
}

export async function getStadiumReviews(stadiums) {
  for (const stadium of stadiums) {
    const reviews = await prisma.review.findMany({
      include: {
        user: true,
        stadium: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
    stadium.reviews = reviews;
  }
  return stadiums;
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

  stadiums = await getStadiumReviews(stadiums);

  res.status(200).json({ stadiums });
}

async function getStadium(req, res, next) {
  const stadium = await prisma.stadium.findUnique({
    where: {
      id: req.params.stadiumId,
    },
    include: {
      reviews: {
        include: {
          user: true,
        },
        orderBy: {
          createdAt: "desc",
        },
      },
    },
  });

  if (!stadium) {
    return next({
      message: `No stadium found with name: "${req.params.stadiumName}"`,
      statusCode: 404,
    });
  }

  res.status(200).json({ stadium });
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
          req.cleanlinessRating) /
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

  res.status(200).json({ stadium });
}

export { getStadiumRoutes };
