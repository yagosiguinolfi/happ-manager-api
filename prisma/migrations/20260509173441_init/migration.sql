-- CreateTable
CREATE TABLE `User` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `uuid` CHAR(36) NOT NULL,
    `name` VARCHAR(255) NULL,
    `email` VARCHAR(255) NULL,
    `passwordHash` VARCHAR(255) NULL,
    `settings` JSON NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    UNIQUE INDEX `User_uuid_key`(`uuid`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Account` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `userId` BIGINT NOT NULL,
    `name` VARCHAR(255) NOT NULL,
    `currency` CHAR(3) NOT NULL DEFAULT 'BRL',
    `balance` DECIMAL(15, 2) NOT NULL DEFAULT 0.00,
    `metadata` JSON NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Category` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `userId` BIGINT NULL,
    `name` VARCHAR(255) NOT NULL,
    `type` VARCHAR(10) NOT NULL,
    `color` VARCHAR(7) NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Transaction` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `userId` BIGINT NOT NULL,
    `accountId` BIGINT NULL,
    `categoryId` BIGINT NULL,
    `type` VARCHAR(10) NOT NULL,
    `amount` DECIMAL(15, 2) NOT NULL,
    `occurred_at` DATETIME(3) NOT NULL,
    `description` TEXT NULL,
    `metadata` JSON NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Income` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `userId` BIGINT NOT NULL,
    `accountId` BIGINT NULL,
    `title` VARCHAR(255) NOT NULL,
    `amount` DECIMAL(15, 2) NOT NULL,
    `recurrenceRule` VARCHAR(255) NULL,
    `next_date` DATETIME(3) NULL,
    `active` BOOLEAN NOT NULL DEFAULT true,
    `metadata` JSON NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `FixedBill` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `userId` BIGINT NOT NULL,
    `accountId` BIGINT NULL,
    `title` VARCHAR(255) NOT NULL,
    `amount` DECIMAL(15, 2) NOT NULL,
    `due_day` INTEGER NULL,
    `recurrenceRule` VARCHAR(255) NULL,
    `next_due` DATETIME(3) NULL,
    `active` BOOLEAN NOT NULL DEFAULT true,
    `metadata` JSON NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `VariableBill` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `userId` BIGINT NOT NULL,
    `accountId` BIGINT NULL,
    `title` VARCHAR(255) NOT NULL,
    `estimated_amount` DECIMAL(15, 2) NULL,
    `last_amount` DECIMAL(15, 2) NULL,
    `last_date` DATETIME(3) NULL,
    `metadata` JSON NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `CustomField` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `userId` BIGINT NULL,
    `entity_type` VARCHAR(191) NOT NULL,
    `name` VARCHAR(255) NOT NULL,
    `field_type` VARCHAR(191) NOT NULL,
    `required` BOOLEAN NOT NULL DEFAULT false,
    `settings` JSON NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `CustomFieldValue` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `customFieldId` BIGINT NOT NULL,
    `entity_type` VARCHAR(191) NOT NULL,
    `entity_id` BIGINT NOT NULL,
    `value` VARCHAR(191) NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Schedule` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `userId` BIGINT NOT NULL,
    `source_type` VARCHAR(191) NOT NULL,
    `source_id` BIGINT NOT NULL,
    `scheduled_for` DATETIME(3) NOT NULL,
    `processed` BOOLEAN NOT NULL DEFAULT false,
    `metadata` JSON NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Account` ADD CONSTRAINT `Account_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Category` ADD CONSTRAINT `Category_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Transaction` ADD CONSTRAINT `Transaction_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Transaction` ADD CONSTRAINT `Transaction_accountId_fkey` FOREIGN KEY (`accountId`) REFERENCES `Account`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Transaction` ADD CONSTRAINT `Transaction_categoryId_fkey` FOREIGN KEY (`categoryId`) REFERENCES `Category`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Income` ADD CONSTRAINT `Income_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Income` ADD CONSTRAINT `Income_accountId_fkey` FOREIGN KEY (`accountId`) REFERENCES `Account`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `FixedBill` ADD CONSTRAINT `FixedBill_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `FixedBill` ADD CONSTRAINT `FixedBill_accountId_fkey` FOREIGN KEY (`accountId`) REFERENCES `Account`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `VariableBill` ADD CONSTRAINT `VariableBill_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `VariableBill` ADD CONSTRAINT `VariableBill_accountId_fkey` FOREIGN KEY (`accountId`) REFERENCES `Account`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CustomField` ADD CONSTRAINT `CustomField_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CustomFieldValue` ADD CONSTRAINT `CustomFieldValue_customFieldId_fkey` FOREIGN KEY (`customFieldId`) REFERENCES `CustomField`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Schedule` ADD CONSTRAINT `Schedule_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
