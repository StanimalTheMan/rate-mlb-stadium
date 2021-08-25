# Migration `20210825154558-initial-migration`

This migration has been generated by StanimalTheMan at 8/25/2021, 11:45:58 AM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "username" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "avatar" TEXT NOT NULL DEFAULT E'https://scontent-ort2-2.cdninstagram.com/v/t51.2885-19/s150x150/82559664_3161307737426774_8687807477812559872_n.jpg?_nc_ht=scontent-ort2-2.cdninstagram.com&_nc_ohc=llb3VCRb-mkAX_XTEi3&oh=64f0323db646c01299e513e3337b83ff&oe=5E8620BF',
    "about" TEXT NOT NULL DEFAULT E'',

    PRIMARY KEY ("id")
)

CREATE TABLE "Review" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "foodRating" INTEGER NOT NULL DEFAULT 3,
    "fansAtmosphereRating" INTEGER NOT NULL DEFAULT 3,
    "cleanlinessRating" INTEGER NOT NULL DEFAULT 3,
    "overallRating" INTEGER NOT NULL DEFAULT 3,
    "text" TEXT NOT NULL,
    "recommends" BOOLEAN NOT NULL,
    "userId" TEXT NOT NULL,
    "stadiumId" TEXT NOT NULL,

    PRIMARY KEY ("id")
)

CREATE TABLE "Stadium" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "image" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "capacity" INTEGER NOT NULL,
    "surface" TEXT NOT NULL,
    "team" TEXT NOT NULL,
    "opened" INTEGER NOT NULL,
    "distanceToCenterFieldInFeet" INTEGER NOT NULL,
    "type" TEXT NOT NULL,
    "roofType" TEXT NOT NULL,
    "overallFoodRating" INTEGER NOT NULL DEFAULT 3,
    "overallFansAtmosphereRating" INTEGER NOT NULL DEFAULT 3,
    "overallCleanlinessRating" INTEGER NOT NULL DEFAULT 3,
    "overallRating" INTEGER NOT NULL DEFAULT 3,

    PRIMARY KEY ("id")
)

CREATE UNIQUE INDEX "User.email_unique" ON "User"("email")

ALTER TABLE "Review" ADD FOREIGN KEY("userId")REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE

ALTER TABLE "Review" ADD FOREIGN KEY("stadiumId")REFERENCES "Stadium"("id") ON DELETE CASCADE ON UPDATE CASCADE
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration ..20210825154558-initial-migration
--- datamodel.dml
+++ datamodel.dml
@@ -1,0 +1,52 @@
+datasource db {
+  provider = "postgresql"
+  url = "***"
+}
+
+generator client {
+  provider = "prisma-client-js"
+}
+
+model User {
+  id          String        @id @default(uuid())
+  createdAt   DateTime      @default(now())
+  username    String
+  email       String        @unique
+  avatar      String        @default("https://scontent-ort2-2.cdninstagram.com/v/t51.2885-19/s150x150/82559664_3161307737426774_8687807477812559872_n.jpg?_nc_ht=scontent-ort2-2.cdninstagram.com&_nc_ohc=llb3VCRb-mkAX_XTEi3&oh=64f0323db646c01299e513e3337b83ff&oe=5E8620BF")
+  about       String        @default("")
+  reviews     Review[]
+}
+
+model Review { 
+  id                        String        @id @default(uuid())
+  createdAt                 DateTime      @default(now())
+  foodRating                Int           @default(3)
+  fansAtmosphereRating      Int           @default(3)
+  cleanlinessRating         Int           @default(3)
+  overallRating             Int           @default(3)
+  text                      String 
+  recommends                Boolean
+  userId                    String
+  stadiumId                 String
+  user                      User          @relation(fields: [userId], references: [id])
+  stadium                   Stadium       @relation(fields: [stadiumId], references: [id])
+}
+
+model Stadium {
+  id                              String        @id @default(uuid())
+  createdAt                       DateTime      @default(now())
+  image                           String
+  name                            String 
+  capacity                        Int
+  surface                         String
+  team                            String
+  opened                          Int
+  distanceToCenterFieldInFeet     Int 
+  type                            String
+  roofType                        String 
+  overallFoodRating               Int @default(3)
+  overallFansAtmosphereRating     Int @default(3)
+  overallCleanlinessRating        Int @default(3)
+  overallRating                   Int @default(3)
+  reviews                         Review[]
+}
```

