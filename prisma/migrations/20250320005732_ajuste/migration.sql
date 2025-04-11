-- AlterTable
CREATE SEQUENCE contas_id_seq;
ALTER TABLE "Contas" ALTER COLUMN "id" SET DEFAULT nextval('contas_id_seq');
ALTER SEQUENCE contas_id_seq OWNED BY "Contas"."id";
