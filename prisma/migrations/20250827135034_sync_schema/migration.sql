-- noop migration, replaced by later diff-based migration

-- -- CreateTable
-- CREATE TABLE `department` (
--     `id` INTEGER NOT NULL AUTO_INCREMENT,
--     `name` VARCHAR(40) NOT NULL,

--     PRIMARY KEY (`id`)
-- ) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- -- CreateTable
-- CREATE TABLE `research` (
--     `id` INTEGER NOT NULL AUTO_INCREMENT,
--     `title` VARCHAR(150) NOT NULL,
--     `year` DATE NOT NULL,
--     `path` VARCHAR(150) NOT NULL,
--     `deptId` INTEGER NULL,

--     INDEX `dept_fk_idx`(`deptId`),
--     PRIMARY KEY (`id`)
-- ) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- -- CreateTable
-- CREATE TABLE `manual` (
--     `id` VARCHAR(191) NOT NULL,
--     `title` VARCHAR(191) NOT NULL,
--     `path` VARCHAR(191) NOT NULL,

--     PRIMARY KEY (`id`)
-- ) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- -- CreateTable
-- CREATE TABLE `resource` (
--     `id` VARCHAR(191) NOT NULL,
--     `title` VARCHAR(191) NOT NULL,
--     `path` VARCHAR(191) NOT NULL,
--     `type` VARCHAR(191) NOT NULL,

--     PRIMARY KEY (`id`)
-- ) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- -- CreateTable
-- CREATE TABLE `resourceType` (
--     `id` VARCHAR(191) NOT NULL,
--     `name` VARCHAR(191) NOT NULL,
--     `name_am` VARCHAR(255) NULL,

--     PRIMARY KEY (`id`)
-- ) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- -- CreateTable
-- CREATE TABLE `Image` (
--     `id` VARCHAR(191) NOT NULL,
--     `caption` VARCHAR(255) NOT NULL,
--     `tags` TEXT NOT NULL,
--     `uploadedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
--     `imagePath` VARCHAR(1000) NOT NULL,

--     INDEX `tags_idx`(`tags`(255)),
--     PRIMARY KEY (`id`)
-- ) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- -- CreateTable
-- CREATE TABLE `Executive` (
--     `id` VARCHAR(191) NOT NULL,
--     `departmentName` VARCHAR(100) NOT NULL,
--     `headName` VARCHAR(100) NOT NULL,
--     `headTitle` VARCHAR(100) NOT NULL,
--     `dutiesDescription` TEXT NOT NULL,
--     `imagePath` VARCHAR(1000) NOT NULL,
--     `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
--     `updatedAt` DATETIME(3) NOT NULL,
--     `departmentName_am` VARCHAR(100) NULL,
--     `dutiesDescription_am` TEXT NULL,
--     `headName_am` VARCHAR(100) NULL,
--     `headTitle_am` VARCHAR(100) NULL,

--     PRIMARY KEY (`id`)
-- ) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- -- CreateTable
-- CREATE TABLE `ProfilePicture` (
--     `id` VARCHAR(191) NOT NULL,
--     `imagePath` VARCHAR(1000) NOT NULL,
--     `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

--     PRIMARY KEY (`id`)
-- ) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- -- CreateTable
-- CREATE TABLE `magazine` (
--     `id` VARCHAR(191) NOT NULL,
--     `title` VARCHAR(191) NOT NULL,
--     `path` VARCHAR(191) NOT NULL,

--     PRIMARY KEY (`id`)
-- ) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- -- CreateTable
-- CREATE TABLE `Service` (
--     `id` VARCHAR(191) NOT NULL,
--     `slug` VARCHAR(191) NOT NULL,
--     `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
--     `updatedAt` DATETIME(3) NOT NULL,
--     `imageUrl` VARCHAR(191) NULL,
--     `backgroundImageUrl` VARCHAR(191) NULL,

--     UNIQUE INDEX `Service_slug_key`(`slug`),
--     PRIMARY KEY (`id`)
-- ) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- -- CreateTable
-- CREATE TABLE `ServiceTranslation` (
--     `id` VARCHAR(191) NOT NULL,
--     `language` VARCHAR(191) NOT NULL,
--     `title` VARCHAR(191) NOT NULL,
--     `summary` VARCHAR(191) NULL,
--     `content` JSON NULL,
--     `serviceId` VARCHAR(191) NOT NULL,

--     PRIMARY KEY (`id`)
-- ) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- -- CreateTable
-- CREATE TABLE `SubService` (
--     `id` VARCHAR(191) NOT NULL,
--     `order` INTEGER NULL,
--     `link` VARCHAR(191) NULL,
--     `serviceId` VARCHAR(191) NOT NULL,

--     PRIMARY KEY (`id`)
-- ) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- -- CreateTable
-- CREATE TABLE `SubServiceTranslation` (
--     `id` VARCHAR(191) NOT NULL,
--     `language` VARCHAR(191) NOT NULL,
--     `title` VARCHAR(191) NOT NULL,
--     `description` TEXT NULL,
--     `subserviceId` VARCHAR(191) NOT NULL,

--     PRIMARY KEY (`id`)
-- ) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- -- CreateTable
-- CREATE TABLE `announcement` (
--     `id` VARCHAR(191) NOT NULL,
--     `title` VARCHAR(191) NOT NULL,
--     `description` TEXT NULL,
--     `title_am` VARCHAR(191) NULL,
--     `description_am` TEXT NULL,
--     `attachment` VARCHAR(191) NULL,
--     `link` VARCHAR(191) NULL,
--     `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
--     `updatedAt` DATETIME(3) NOT NULL,

--     PRIMARY KEY (`id`)
-- ) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- -- CreateTable
-- CREATE TABLE `Translation` (
--     `id` INTEGER NOT NULL AUTO_INCREMENT,
--     `key` VARCHAR(191) NOT NULL,
--     `value` JSON NULL,
--     `language` VARCHAR(191) NOT NULL,
--     `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
--     `updatedAt` DATETIME(3) NOT NULL,

--     UNIQUE INDEX `Translation_key_language_key`(`key`, `language`),
--     PRIMARY KEY (`id`)
-- ) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- -- CreateTable
-- CREATE TABLE `VisitorCount` (
--     `id` INTEGER NOT NULL DEFAULT 1,
--     `count` INTEGER NOT NULL DEFAULT 0,

--     PRIMARY KEY (`id`)
-- ) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- -- CreateTable
-- CREATE TABLE `TraineeCount` (
--     `id` INTEGER NOT NULL DEFAULT 1,
--     `count` INTEGER NOT NULL DEFAULT 0,

--     PRIMARY KEY (`id`)
-- ) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- -- CreateTable
-- CREATE TABLE `BIMCount` (
--     `id` INTEGER NOT NULL DEFAULT 1,
--     `count` INTEGER NOT NULL DEFAULT 0,

--     PRIMARY KEY (`id`)
-- ) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- -- CreateTable
-- CREATE TABLE `PMPCount` (
--     `id` INTEGER NOT NULL DEFAULT 1,
--     `count` INTEGER NOT NULL DEFAULT 0,

--     PRIMARY KEY (`id`)
-- ) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- -- CreateTable
-- CREATE TABLE `ResearchCount` (
--     `id` INTEGER NOT NULL DEFAULT 1,
--     `count` INTEGER NOT NULL DEFAULT 0,

--     PRIMARY KEY (`id`)
-- ) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- -- CreateTable
-- CREATE TABLE `Event` (
--     `id` INTEGER NOT NULL AUTO_INCREMENT,
--     `title_en` VARCHAR(191) NOT NULL,
--     `title_am` VARCHAR(191) NULL,
--     `description_en` TEXT NOT NULL,
--     `description_am` TEXT NULL,
--     `banner_en` VARCHAR(191) NULL,
--     `banner_am` VARCHAR(191) NULL,
--     `link` VARCHAR(191) NULL,
--     `endDate` DATETIME(3) NOT NULL,
--     `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

--     PRIMARY KEY (`id`)
-- ) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- -- AddForeignKey
-- ALTER TABLE `research` ADD CONSTRAINT `dept_fk` FOREIGN KEY (`deptId`) REFERENCES `department`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- -- AddForeignKey
-- ALTER TABLE `ServiceTranslation` ADD CONSTRAINT `ServiceTranslation_serviceId_fkey` FOREIGN KEY (`serviceId`) REFERENCES `Service`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- -- AddForeignKey
-- ALTER TABLE `SubService` ADD CONSTRAINT `SubService_serviceId_fkey` FOREIGN KEY (`serviceId`) REFERENCES `Service`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- -- AddForeignKey
-- ALTER TABLE `SubServiceTranslation` ADD CONSTRAINT `SubServiceTranslation_subserviceId_fkey` FOREIGN KEY (`subserviceId`) REFERENCES `SubService`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
