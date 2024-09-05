<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20240719124910 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE TABLE food (id INT AUTO_INCREMENT NOT NULL, nutrition_id INT DEFAULT NULL, price DOUBLE PRECISION NOT NULL, name VARCHAR(255) NOT NULL, favourite TINYINT(1) NOT NULL, star INT NOT NULL, tags LONGTEXT DEFAULT NULL COMMENT \'(DC2Type:simple_array)\', image_url VARCHAR(255) NOT NULL, cook_time VARCHAR(255) NOT NULL, origins VARCHAR(255) NOT NULL, facts LONGTEXT DEFAULT NULL COMMENT \'(DC2Type:simple_array)\', calories INT NOT NULL, UNIQUE INDEX UNIQ_D43829F7B5D724CD (nutrition_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE nutrition (id INT AUTO_INCREMENT NOT NULL, fat VARCHAR(255) DEFAULT NULL, carbohydrates VARCHAR(255) DEFAULT NULL, protein VARCHAR(255) DEFAULT NULL, sodium VARCHAR(255) DEFAULT NULL, fiber VARCHAR(255) DEFAULT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('ALTER TABLE food ADD CONSTRAINT FK_D43829F7B5D724CD FOREIGN KEY (nutrition_id) REFERENCES nutrition (id)');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE food DROP FOREIGN KEY FK_D43829F7B5D724CD');
        $this->addSql('DROP TABLE food');
        $this->addSql('DROP TABLE nutrition');
    }
}
