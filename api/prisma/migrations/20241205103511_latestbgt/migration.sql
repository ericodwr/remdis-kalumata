-- CreateTable
CREATE TABLE `roles` (
    `id` VARCHAR(191) NOT NULL,
    `nama` CHAR(100) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `roles_nama_key`(`nama`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `users` (
    `id` VARCHAR(191) NOT NULL,
    `username` CHAR(255) NOT NULL,
    `nama` CHAR(255) NOT NULL,
    `password` TEXT NOT NULL,
    `token` TEXT NULL,
    `roleId` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `users_username_key`(`username`),
    UNIQUE INDEX `users_nama_key`(`nama`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `pasien` (
    `id` VARCHAR(191) NOT NULL,
    `nama` CHAR(255) NOT NULL,
    `NIK` CHAR(16) NOT NULL,
    `pekerjaan` CHAR(255) NOT NULL,
    `no_telp` CHAR(20) NOT NULL,
    `usia` INTEGER NOT NULL,
    `agama` CHAR(255) NOT NULL,
    `jenis_kelamin` CHAR(255) NOT NULL,
    `alamat` TEXT NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `createdBy` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `pasien_NIK_key`(`NIK`),
    UNIQUE INDEX `pasien_no_telp_key`(`no_telp`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `rekam_medis` (
    `id` VARCHAR(191) NOT NULL,
    `pasienId` VARCHAR(191) NOT NULL,
    `userId` VARCHAR(191) NOT NULL,
    `keluhan_utama` TEXT NOT NULL,
    `riwayat_penyakit_obat_opsional` TEXT NULL,
    `diagnosa_penyakit` TEXT NOT NULL,
    `rencana_tindakan_opsional` TEXT NULL,
    `tekanan_darah` VARCHAR(191) NULL,
    `denyut_nadi` INTEGER NULL,
    `pernapasan` INTEGER NULL,
    `suhu_tubuh` DOUBLE NULL,
    `tinggi_badan` INTEGER NULL,
    `berat_badan` INTEGER NULL,
    `pemeriksaan_fisik_tambahan_opsional` TEXT NULL,
    `nama_dokter` CHAR(255) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `users` ADD CONSTRAINT `users_roleId_fkey` FOREIGN KEY (`roleId`) REFERENCES `roles`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `rekam_medis` ADD CONSTRAINT `rekam_medis_pasienId_fkey` FOREIGN KEY (`pasienId`) REFERENCES `pasien`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `rekam_medis` ADD CONSTRAINT `rekam_medis_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
