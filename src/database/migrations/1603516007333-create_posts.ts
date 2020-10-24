import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class createPosts1603516007333 implements MigrationInterface {
  tableName = 'posts';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: this.tableName,
        columns: [
          {
            name: 'id',
            type: 'integer',
            unsigned: true,
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'title',
            type: 'varchar',
          },
          {
            name: 'content',
            type: 'text',
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: `date('now')`,
          },
          {
            name: 'updated_at',
            type: 'timestamp',
            default: `date('now')`,
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable(this.tableName);
  }
}
