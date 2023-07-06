-- CreateTable
CREATE TABLE "houses" (
    "id" SERIAL NOT NULL,
    "user_id" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "latitude" DOUBLE PRECISION NOT NULL,
    "longitude" DOUBLE PRECISION NOT NULL,
    "address" TEXT NOT NULL,
    "bedrooms" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "houses_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "houses.userId" ON "houses"("user_id");

