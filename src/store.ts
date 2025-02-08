import { create } from 'zustand'
import { OrderItem } from './types';
import { Product } from '@prisma/client';

interface Store {
    order: OrderItem[]
    addToOrder: (product: Product) => void
    increaseQuantity: (id: Product['id']) => void
    decreaseQuantity: (id: Product['id']) => void
    removeOrder: (id: Product['id']) => void
    clearOrder: () => void
}

export const useStore = create<Store>((set, get) =>({
    order: [],
    addToOrder: (product) => {
        const { ...data} = product
        let order : OrderItem[] = []
        if (get().order.find((item) => item.id === product.id)) {
            order = get().order.map((item) => {
                if (item.id === product.id) {
                    return {
                        ...item,
                        quantity: item.quantity + 1,
                        subtotal: item.subtotal + product.price
                    }
                } else {
                    return item
                }
            })
        } else {
            order = [...get().order, {
                ...data,
                quantity: 1,
                subtotal: 1 * product.price
            }]
        } 
        set(() => ({
            order: order
        }))
    },
    increaseQuantity: (id) => {
        set(() => ({
            order: get().order.map((item) => {
                if (item.id === id) {
                    return {
                        ...item,
                        quantity: item.quantity + 1,
                        subtotal: item.subtotal + item.price
                    }
                } else {
                    return item
                }
            })
        }))
    },
    decreaseQuantity: (id) => {
        const order = get().order.map(item => item.id === id ? {
            ...item,
            quantity: item.quantity - 1,
            subtotal: item.subtotal - item.price
        } : item)
        set(() => ({
            order: order
        }))
    },
    removeOrder: (id) => {
        set(() => ({
            order: get().order.filter((item) => item.id !== id)
        }))
    },
    clearOrder: () => {
        set(() => ({
            order: []
        }))
    }
}))