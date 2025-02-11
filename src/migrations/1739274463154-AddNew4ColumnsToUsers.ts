import { MigrationInterface, QueryRunner } from "typeorm";

export class AddNew4ColumnsToUsers1739274463154 implements MigrationInterface {
    name = 'AddNew4ColumnsToUsers1739274463154'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Users" ADD "verifyUserToken" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "Users" ADD "passwordResetExpires" TIMESTAMP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "Users" ADD "passwordResetToken" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "Users" ADD "passwordChangedAt" TIMESTAMP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Users" DROP COLUMN "passwordChangedAt"`);
        await queryRunner.query(`ALTER TABLE "Users" DROP COLUMN "passwordResetToken"`);
        await queryRunner.query(`ALTER TABLE "Users" DROP COLUMN "passwordResetExpires"`);
        await queryRunner.query(`ALTER TABLE "Users" DROP COLUMN "verifyUserToken"`);
    }

}
