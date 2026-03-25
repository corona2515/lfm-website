ALTER TABLE "Lead"
ADD COLUMN "buildingName" TEXT,
ADD COLUMN "addressLine1" TEXT,
ADD COLUMN "city" TEXT,
ADD COLUMN "state" TEXT,
ADD COLUMN "postalCode" TEXT;

ALTER TABLE "SampleIntakeAsset"
ADD COLUMN "storageProvider" TEXT,
ADD COLUMN "storageBucket" TEXT,
ADD COLUMN "storageKey" TEXT,
ADD COLUMN "storageRegion" TEXT,
ADD COLUMN "storageEndpoint" TEXT;
