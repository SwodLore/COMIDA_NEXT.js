import { Order, OrderProucts, Product } from "@prisma/client";

export type OrderItem = Pick<Product, 'id' | 'name' | 'price' > & {
    quantity: number;
    subtotal: number;
};

export type OrderWithProducts = Order & {
    OrderProducts: (OrderProucts & {
        product: Product;
    })[]
}