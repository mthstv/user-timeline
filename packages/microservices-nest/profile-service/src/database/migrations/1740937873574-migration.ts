import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migration1740937873574 implements MigrationInterface {
  name = 'Migration1740937873574';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "profile" ADD CONSTRAINT "UQ_d80b94dc62f7467403009d88062" UNIQUE ("username")`,
    );
    await queryRunner.query(
      `ALTER TABLE "profile" ADD CONSTRAINT "UQ_a24972ebd73b106250713dcddd9" UNIQUE ("userId")`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "profile" DROP CONSTRAINT "UQ_a24972ebd73b106250713dcddd9"`,
    );
    await queryRunner.query(
      `ALTER TABLE "profile" DROP CONSTRAINT "UQ_d80b94dc62f7467403009d88062"`,
    );
  }
}
