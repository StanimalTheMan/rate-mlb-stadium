import { PrismaClient } from "@prisma/client";
import express from "express";

const prisma = new PrismaClient();

function getStadiumRoutes() {
  const router = express.Router();

  router.get("/", getStadiums);

  router.get("/:stadiumName", getStadium);

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
      name: req.params.stadiumName,
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

export { getStadiumRoutes };
