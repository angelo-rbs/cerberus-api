-- CreateEnum
CREATE TYPE "Genero" AS ENUM ('HOMEM_CIS', 'MULHER_CIS', 'HOMEM_TRANS', 'MULHER_TRANS', 'NAO_BINARIO', 'OUTRO');

-- CreateEnum
CREATE TYPE "Sexo" AS ENUM ('MASCULINO', 'FEMININO');

-- CreateTable
CREATE TABLE "Endereco" (
    "id" TEXT NOT NULL,
    "pais" TEXT,
    "cidade" TEXT,

    CONSTRAINT "Endereco_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Usuario" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletado" BOOLEAN NOT NULL DEFAULT false,
    "ativo" BOOLEAN NOT NULL DEFAULT true,
    "verificado" BOOLEAN NOT NULL DEFAULT false,
    "nome" TEXT NOT NULL,
    "dataNascimento" TIMESTAMP(3) NOT NULL,
    "sexo" "Sexo",
    "genero" "Genero",
    "email" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "senha" TEXT NOT NULL,

    CONSTRAINT "Usuario_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Endereco" ADD CONSTRAINT "Endereco_id_fkey" FOREIGN KEY ("id") REFERENCES "Usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
