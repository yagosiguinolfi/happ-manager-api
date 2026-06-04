/*
  Warnings:

  - Added the required column `name` to the `accounts` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_accounts" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "balance" DECIMAL NOT NULL DEFAULT 0.00,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "accounts_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_accounts" ("balance", "createdAt", "id", "updatedAt", "userId") SELECT "balance", "createdAt", "id", "updatedAt", "userId" FROM "accounts";
DROP TABLE "accounts";
ALTER TABLE "new_accounts" RENAME TO "accounts";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
