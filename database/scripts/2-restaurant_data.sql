USE restaurante;
INSERT INTO `dish` (`name`, `description`, `price`, `type`) VALUES
('Ensalada de la Tía Maruja', 'Con más verde que un jardín botánico', 12, 'starter'),
('Sopa de Misterios', '¿Pollo o ternera? No se sabe...', 8, 'starter'),
('Pasta al Revés', 'Pasta dentro de la salsa, no al revés', 15, 'first-course'),
('Biftek de Otro Mundo', 'Carne más tierna que un abrazo de abuela', 22, 'second-course'),
('Helado Espacial', 'Con un sabor que te lleva fuera de órbita', 6, 'dessert');

INSERT INTO `user` (`name`, `last_name`, `email`, `tel`, `role`) VALUES
('Luis', 'Sinprisas', 'luis@clientexample.com', '555-1234', 'client'),
('María', 'Rápida', 'maria@clientexample.com', '555-5678', 'staff'),
('Juan', 'ElAdmin', 'juan@adminexample.com', '555-8765', 'admin'),
('Ana', 'Lalala', 'ana@clientexample.com', '555-4321', 'client'),
('Carlos', 'SiempreTarde', 'carlos@clientexample.com', '555-0001', 'staff');

INSERT INTO `provider` (`name`, `email`, `address`) VALUES
('Proveedores Manolo', 'manolo@providers.com', 'Calle del Suministro 42'),
('Suministros Delicatesen', 'contacto@delicatesen.com', 'Avenida Gourmet 12'),
('Bebidas y Más', 'info@bebidasymas.com', 'Plaza de la Hidratación 5'),
('La Verdulería', 'ventas@verduleria.com', 'Calle de la Zanahoria 18'),
('Panadería Universal', 'pan@panaderiauniversal.com', 'Ronda de la Harina 22');

INSERT INTO `drink` (`name`, `type`, `description`, `price`) VALUES
('Agua de las Montañas', 'water', 'Tan pura que te hace llorar de felicidad', 2),
('Café de Medianoche', 'infusion', 'Ideal para no dormir en tres días', 3),
('Zumo de Mandarina Galáctica', 'juice', 'Directo del espacio exterior', 4),
('Refresco UltraMega', 'soft-drink', 'Más gas que una fábrica de globos', 3),
('Cerveza Artesanal del Pueblo', 'alcoholic', 'Con el poder del campo en cada sorbo', 5);

INSERT INTO `menu` (`name`, `price`) VALUES
('Menú Sorpresa', 25),
('Menú Veggie Supremo', 20),
('Menú Todo lo que puedas comer', 30),
('Menú Exprés', 15),
('Menú de los Misterios', 27);

INSERT INTO `local` (`name`, `address`, `phone`) VALUES
('Restaurante El Buen Comer', 'Calle Sabor 10', '555-0123'),
('El Rincón de Sabores', 'Avenida del Gusto 22', '555-4567'),
('La Terraza de la Vista', 'Plaza Mirador 3', '555-8910'),
('Sazón y Corazón', 'Calle del Amor 8', '555-2345'),
('Gastro-Mundo', 'Calle Internacional 14', '555-6789');



INSERT INTO `ingredient` (`name`) VALUES
('Albahaca mágica'),
('Queso del Olimpo'),
('Harina de la fortuna'),
('Miel de las mil colmenas'),
('Pimienta del fin del mundo');

INSERT INTO `order` (`local_id`, `client_id`) VALUES
(1, 1),
(2, 2),
(3, 1),
(1, 2),
(5, 1);

INSERT INTO `dish_has_ingredient` (`dish_id`, `ingredient_id`) VALUES
(1, 1),
(2, 3),
(3, 2),
(4, 4),
(5, 5);

INSERT INTO `order_has_dish` (`order_id`, `dish_id`, `quantity`) VALUES
(1, 1, 2),
(1, 2, 1),
(2, 3, 1),
(3, 4, 3),
(4, 5, 2);

INSERT INTO `order_has_drink` (`order_id`, `drink_id`, `quantity`) VALUES
(1, 1, 1),
(1, 3, 2),
(2, 4, 1),
(3, 5, 3),
(4, 2, 2);

INSERT INTO `restaurante`.`ingredient_has_provider` (ingredient_id, provider_id, price) VALUES
    (1, 1, 50),  -- Tomate proporcionado por "TomateKing" a precio de amigo
    (2, 2, 75),  -- Albahaca del "Jardín de Juan", fresquita y directa al plato
    (3, 3, 100), -- Queso parmesano de "Los queseros audaces", finamente rallado
    (4, 4, 35),  -- Lechuga "del campo de Pepe", pura y sin pesticidas... según dicen
    (5, 5, 120); -- Trufas negras de "El Trufazo", precio de lujo y sabor de monte

