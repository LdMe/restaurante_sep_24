-- MySQL Script generated by MySQL Workbench
-- Mon Nov 18 10:19:45 2024
-- Model: New Model    Version: 1.0
-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema restaurante
-- -----------------------------------------------------
DROP SCHEMA IF EXISTS `restaurante` ;

-- -----------------------------------------------------
-- Schema restaurante
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `restaurante` ;
USE `restaurante` ;

-- -----------------------------------------------------
-- Table `restaurante`.`dish`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `restaurante`.`dish` ;

CREATE TABLE IF NOT EXISTS `restaurante`.`dish` (
  `dish_id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(50) NOT NULL,
  `description` VARCHAR(200) NULL,
  `price` SMALLINT UNSIGNED NOT NULL,
  `type` ENUM("starter", "first-course", "second-course", "dessert") NOT NULL,
  PRIMARY KEY (`dish_id`),
  INDEX `dish_type_idx` (`type` ASC) VISIBLE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `restaurante`.`user`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `restaurante`.`user` ;

CREATE TABLE IF NOT EXISTS `restaurante`.`user` (
  `user_id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL,
  `last_name` VARCHAR(45) NULL,
  `email` VARCHAR(100) NOT NULL,
  `tel` VARCHAR(45) NULL,
  `role` ENUM("client", "staff", "admin") NULL DEFAULT 'client',
  `password` VARCHAR(100) NOT NULL,
  PRIMARY KEY (`user_id`),
  UNIQUE INDEX `email_UNIQUE` (`email` ASC) VISIBLE,
  INDEX `user_role_idx` (`role` ASC) VISIBLE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `restaurante`.`provider`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `restaurante`.`provider` ;

CREATE TABLE IF NOT EXISTS `restaurante`.`provider` (
  `provider_id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(100) NOT NULL,
  `email` VARCHAR(100) NOT NULL,
  `address` VARCHAR(200) NOT NULL,
  PRIMARY KEY (`provider_id`),
  UNIQUE INDEX `name_UNIQUE` (`name` ASC) VISIBLE,
  UNIQUE INDEX `email_UNIQUE` (`email` ASC) VISIBLE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `restaurante`.`drink`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `restaurante`.`drink` ;

CREATE TABLE IF NOT EXISTS `restaurante`.`drink` (
  `drink_id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL,
  `type` ENUM("juice", "water", "alcoholic", "infusion", "soft-drink") NOT NULL DEFAULT 'soft-drink',
  `description` VARCHAR(45) NULL,
  `price` SMALLINT UNSIGNED NOT NULL,
  PRIMARY KEY (`drink_id`),
  INDEX `drink_type_idx` (`type` ASC) VISIBLE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `restaurante`.`menu`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `restaurante`.`menu` ;

CREATE TABLE IF NOT EXISTS `restaurante`.`menu` (
  `menu_id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(50) NOT NULL,
  `price` SMALLINT UNSIGNED NOT NULL,
  PRIMARY KEY (`menu_id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `restaurante`.`local`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `restaurante`.`local` ;

CREATE TABLE IF NOT EXISTS `restaurante`.`local` (
  `local_id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(100) NOT NULL,
  `address` VARCHAR(200) NOT NULL,
  `phone` VARCHAR(45) NULL,
  PRIMARY KEY (`local_id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `restaurante`.`client`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `restaurante`.`client` ;

CREATE TABLE IF NOT EXISTS `restaurante`.`client` (
  `client_id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `user_id` INT UNSIGNED NOT NULL,
  PRIMARY KEY (`client_id`),
  INDEX `fk_client_user1_idx` (`user_id` ASC) VISIBLE,
  CONSTRAINT `fk_client_user1`
    FOREIGN KEY (`user_id`)
    REFERENCES `restaurante`.`user` (`user_id`)
    ON DELETE CASCADE
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `restaurante`.`order`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `restaurante`.`order` ;

CREATE TABLE IF NOT EXISTS `restaurante`.`order` (
  `order_id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `local_id` INT UNSIGNED NOT NULL,
  `client_id` INT UNSIGNED NOT NULL,
  PRIMARY KEY (`order_id`),
  INDEX `fk_order_local1_idx` (`local_id` ASC) VISIBLE,
  INDEX `fk_order_client1_idx` (`client_id` ASC) VISIBLE,
  CONSTRAINT `fk_order_local1`
    FOREIGN KEY (`local_id`)
    REFERENCES `restaurante`.`local` (`local_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_order_client1`
    FOREIGN KEY (`client_id`)
    REFERENCES `restaurante`.`client` (`client_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `restaurante`.`ingredient`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `restaurante`.`ingredient` ;

CREATE TABLE IF NOT EXISTS `restaurante`.`ingredient` (
  `ingredient_id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`ingredient_id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `restaurante`.`dish_has_ingredient`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `restaurante`.`dish_has_ingredient` ;

CREATE TABLE IF NOT EXISTS `restaurante`.`dish_has_ingredient` (
  `dish_id` INT UNSIGNED NOT NULL,
  `ingredient_id` INT UNSIGNED NOT NULL,
  INDEX `fk_dish_has_ingredient_ingredient1_idx` (`ingredient_id` ASC) VISIBLE,
  INDEX `fk_dish_has_ingredient_dish_idx` (`dish_id` ASC) VISIBLE,
  PRIMARY KEY (`ingredient_id`, `dish_id`),
  CONSTRAINT `fk_dish_has_ingredient_dish`
    FOREIGN KEY (`dish_id`)
    REFERENCES `restaurante`.`dish` (`dish_id`)
    ON DELETE CASCADE
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_dish_has_ingredient_ingredient1`
    FOREIGN KEY (`ingredient_id`)
    REFERENCES `restaurante`.`ingredient` (`ingredient_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `restaurante`.`order_has_dish`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `restaurante`.`order_has_dish` ;

CREATE TABLE IF NOT EXISTS `restaurante`.`order_has_dish` (
  `order_id` INT UNSIGNED NOT NULL,
  `dish_id` INT UNSIGNED NOT NULL,
  `quantity` INT NOT NULL DEFAULT 1,
  PRIMARY KEY (`order_id`, `dish_id`),
  INDEX `fk_order_has_dish_dish1_idx` (`dish_id` ASC) VISIBLE,
  INDEX `fk_order_has_dish_order1_idx` (`order_id` ASC) VISIBLE,
  CONSTRAINT `fk_order_has_dish_order1`
    FOREIGN KEY (`order_id`)
    REFERENCES `restaurante`.`order` (`order_id`)
    ON DELETE CASCADE
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_order_has_dish_dish1`
    FOREIGN KEY (`dish_id`)
    REFERENCES `restaurante`.`dish` (`dish_id`)
    ON DELETE CASCADE
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `restaurante`.`menu_has_dish`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `restaurante`.`menu_has_dish` ;

CREATE TABLE IF NOT EXISTS `restaurante`.`menu_has_dish` (
  `menu_id` INT UNSIGNED NOT NULL,
  `dish_id` INT UNSIGNED NOT NULL,
  PRIMARY KEY (`menu_id`, `dish_id`),
  INDEX `fk_menu_has_dish_dish1_idx` (`dish_id` ASC) VISIBLE,
  INDEX `fk_menu_has_dish_menu1_idx` (`menu_id` ASC) VISIBLE,
  CONSTRAINT `fk_menu_has_dish_menu1`
    FOREIGN KEY (`menu_id`)
    REFERENCES `restaurante`.`menu` (`menu_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_menu_has_dish_dish1`
    FOREIGN KEY (`dish_id`)
    REFERENCES `restaurante`.`dish` (`dish_id`)
    ON DELETE CASCADE
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `restaurante`.`order_has_drink`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `restaurante`.`order_has_drink` ;

CREATE TABLE IF NOT EXISTS `restaurante`.`order_has_drink` (
  `order_id` INT UNSIGNED NOT NULL,
  `drink_id` INT UNSIGNED NOT NULL,
  `quantity` INT NOT NULL DEFAULT 1,
  PRIMARY KEY (`order_id`, `drink_id`),
  INDEX `fk_order_has_drink_drink1_idx` (`drink_id` ASC) VISIBLE,
  INDEX `fk_order_has_drink_order1_idx` (`order_id` ASC) VISIBLE,
  CONSTRAINT `fk_order_has_drink_order1`
    FOREIGN KEY (`order_id`)
    REFERENCES `restaurante`.`order` (`order_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_order_has_drink_drink1`
    FOREIGN KEY (`drink_id`)
    REFERENCES `restaurante`.`drink` (`drink_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `restaurante`.`menu_has_drink`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `restaurante`.`menu_has_drink` ;

CREATE TABLE IF NOT EXISTS `restaurante`.`menu_has_drink` (
  `menu_id` INT UNSIGNED NOT NULL,
  `drink_id` INT UNSIGNED NOT NULL,
  PRIMARY KEY (`menu_id`, `drink_id`),
  INDEX `fk_menu_has_drink_drink1_idx` (`drink_id` ASC) VISIBLE,
  INDEX `fk_menu_has_drink_menu1_idx` (`menu_id` ASC) VISIBLE,
  CONSTRAINT `fk_menu_has_drink_menu1`
    FOREIGN KEY (`menu_id`)
    REFERENCES `restaurante`.`menu` (`menu_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_menu_has_drink_drink1`
    FOREIGN KEY (`drink_id`)
    REFERENCES `restaurante`.`drink` (`drink_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `restaurante`.`drink_has_provider`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `restaurante`.`drink_has_provider` ;

CREATE TABLE IF NOT EXISTS `restaurante`.`drink_has_provider` (
  `drink_id` INT UNSIGNED NOT NULL,
  `provider_id` INT UNSIGNED NOT NULL,
  `price` SMALLINT UNSIGNED NOT NULL,
  PRIMARY KEY (`drink_id`, `provider_id`),
  INDEX `fk_drink_has_provider_provider1_idx` (`provider_id` ASC) VISIBLE,
  INDEX `fk_drink_has_provider_drink1_idx` (`drink_id` ASC) VISIBLE,
  CONSTRAINT `fk_drink_has_provider_drink1`
    FOREIGN KEY (`drink_id`)
    REFERENCES `restaurante`.`drink` (`drink_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_drink_has_provider_provider1`
    FOREIGN KEY (`provider_id`)
    REFERENCES `restaurante`.`provider` (`provider_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `restaurante`.`ingredient_has_provider`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `restaurante`.`ingredient_has_provider` ;

CREATE TABLE IF NOT EXISTS `restaurante`.`ingredient_has_provider` (
  `ingredient_id` INT UNSIGNED NOT NULL,
  `provider_id` INT UNSIGNED NOT NULL,
  `price` SMALLINT UNSIGNED NOT NULL,
  PRIMARY KEY (`ingredient_id`, `provider_id`),
  INDEX `fk_ingredient_has_provider_provider1_idx` (`provider_id` ASC) VISIBLE,
  INDEX `fk_ingredient_has_provider_ingredient1_idx` (`ingredient_id` ASC) VISIBLE,
  CONSTRAINT `fk_ingredient_has_provider_ingredient1`
    FOREIGN KEY (`ingredient_id`)
    REFERENCES `restaurante`.`ingredient` (`ingredient_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_ingredient_has_provider_provider1`
    FOREIGN KEY (`provider_id`)
    REFERENCES `restaurante`.`provider` (`provider_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `restaurante`.`order_has_menu`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `restaurante`.`order_has_menu` ;

CREATE TABLE IF NOT EXISTS `restaurante`.`order_has_menu` (
  `order_id` INT UNSIGNED NOT NULL,
  `menu_id` INT UNSIGNED NOT NULL,
  `quantity` INT NOT NULL DEFAULT 1,
  PRIMARY KEY (`order_id`, `menu_id`),
  INDEX `fk_order_has_menu_menu1_idx` (`menu_id` ASC) VISIBLE,
  INDEX `fk_order_has_menu_order1_idx` (`order_id` ASC) VISIBLE,
  CONSTRAINT `fk_order_has_menu_order1`
    FOREIGN KEY (`order_id`)
    REFERENCES `restaurante`.`order` (`order_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_order_has_menu_menu1`
    FOREIGN KEY (`menu_id`)
    REFERENCES `restaurante`.`menu` (`menu_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `restaurante`.`ingredient_history`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `restaurante`.`ingredient_history` ;

CREATE TABLE IF NOT EXISTS `restaurante`.`ingredient_history` (
  `ingredient_id` INT UNSIGNED NOT NULL,
  `provider_id` INT UNSIGNED NOT NULL,
  `ingredient_name` VARCHAR(45) NULL,
  `provider_name` VARCHAR(100) NULL,
  `price` SMALLINT NOT NULL,
  `timestamp` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`ingredient_id`, `provider_id`, `timestamp`))
ENGINE = InnoDB;

USE `restaurante` ;

-- -----------------------------------------------------
-- Placeholder table for view `restaurante`.`top_ordered_dishes`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `restaurante`.`top_ordered_dishes` (`dish_id` INT, `name` INT, `description` INT, `price` INT, `type` INT, `orders` INT);

-- -----------------------------------------------------
-- Placeholder table for view `restaurante`.`orders_for_client`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `restaurante`.`orders_for_client` (`client_id` INT, `orders` INT);

-- -----------------------------------------------------
-- View `restaurante`.`top_ordered_dishes`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `restaurante`.`top_ordered_dishes`;
DROP VIEW IF EXISTS `restaurante`.`top_ordered_dishes` ;
USE `restaurante`;
CREATE  OR REPLACE VIEW `top_ordered_dishes` AS
SELECT dish.*,COUNT(order_id) as orders
FROM dish
JOIN order_has_dish as ohd ON ohd.dish_id=dish.dish_id
GROUP BY dish.dish_id
ORDER BY orders DESC
LIMIT 10;

-- -----------------------------------------------------
-- View `restaurante`.`orders_for_client`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `restaurante`.`orders_for_client`;
DROP VIEW IF EXISTS `restaurante`.`orders_for_client` ;
USE `restaurante`;
CREATE  OR REPLACE VIEW `orders_for_client` AS
SELECT client_id,COUNT(order_id) as orders
FROM `order`
GROUP BY client_id
ORDER BY orders DESC;
USE `restaurante`;

DELIMITER $$

USE `restaurante`$$
DROP TRIGGER IF EXISTS `restaurante`.`user_AFTER_INSERT` $$
USE `restaurante`$$
CREATE DEFINER = CURRENT_USER TRIGGER `restaurante`.`user_AFTER_INSERT` AFTER INSERT ON `user` FOR EACH ROW
BEGIN
IF(NEW.role="client")THEN
	INSERT INTO client(user_id) VALUES(NEW.user_id);
END IF;
END$$


USE `restaurante`$$
DROP TRIGGER IF EXISTS `restaurante`.`ingredient_has_provider_AFTER_INSERT` $$
USE `restaurante`$$
CREATE DEFINER = CURRENT_USER TRIGGER `restaurante`.`ingredient_has_provider_AFTER_INSERT` AFTER INSERT ON `ingredient_has_provider` FOR EACH ROW
BEGIN
SET @ingredient_name = (SELECT name FROM ingredient WHERE ingredient_id=NEW.ingredient_id);
SET @provider_name = (SELECT name FROM provider WHERE provider_id=NEW.provider_id);
INSERT INTO ingredient_history (ingredient_id,provider_id,ingredient_name,provider_name,price)
VALUES (NEW.ingredient_id,NEW.provider_id,@ingredient_name,@provider_name,NEW.price);
END$$


USE `restaurante`$$
DROP TRIGGER IF EXISTS `restaurante`.`ingredient_has_provider_AFTER_UPDATE` $$
USE `restaurante`$$
CREATE DEFINER = CURRENT_USER TRIGGER `restaurante`.`ingredient_has_provider_AFTER_UPDATE` AFTER UPDATE ON `ingredient_has_provider` FOR EACH ROW
BEGIN
SET @ingredient_name = (SELECT name FROM ingredient WHERE ingredient_id=NEW.ingredient_id);
SET @provider_name = (SELECT name FROM provider WHERE provider_id=NEW.provider_id);
INSERT INTO ingredient_history (ingredient_id,provider_id,ingredient_name,provider_name,price)
VALUES (NEW.ingredient_id,NEW.provider_id,@ingredient_name,@provider_name,NEW.price);
END$$


DELIMITER ;

SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
