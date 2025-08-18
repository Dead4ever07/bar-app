import { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";
import "../index.css";

export default function Menu() {
    const [products, setProducts] = useState([])
    const [cart, setCart] = useState([])

    useEffect(() => {
        const fetchProducts = async () => {
            const { data, error } = await supabase.from("products").select("*")
            if (!error) setProducts(data)
        }
        fetchProducts()
    }, [])

    const addToCart = (product) => {
        setCart((prev) => {
            const exists = prev.find((item) => item.id === product.id)
            if (exists) {
                return prev.map((item) =>
                    item.id === product.id
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                )
            }
            return [...prev, { ...product, quantity: 1 }]
        })
    }

    // Decrease quantity by 1
    const decreaseQuantity = (productId) => {
        setCart((prevCart) =>
            prevCart
                .map((item) =>
                    item.id === productId
                        ? { ...item, quantity: item.quantity - 1 }
                        : item
                )
                .filter((item) => item.quantity > 0) // remove if quantity hits 0
        )
    }

    // Remove all of a product
    const removeFromCart = (productId) => {
        setCart((prevCart) => prevCart.filter((item) => item.id !== productId))
    }

    const handleCheckout = async () => {
        if (cart.length === 0) return

        // 1. Create order
        const { data: order, error: orderError } = await supabase
            .from("orders")
            .insert([{ is_pending: true }])
            .select()
            .single()

        if (orderError) {
            console.error(orderError)
            return
        }

        // 2. Insert order items
        const items = cart.map((item) => ({
            order_id: order.id,
            product_id: item.id,
            quantity: item.quantity,
        }))

        const { error: itemsError } = await supabase
            .from("order_items")
            .insert(items)

        if (itemsError) {
            console.error(itemsError)
            return
        }

        alert("Order created successfully!")
        setCart([]) // reset cart
    }

    return (
        <div className="w3-row-padding">
            {/* Product grid */}
            <div className="w3-threequarter">
                <h2>Products</h2>
                <div className="w3-row-padding">
                    {products.map((p) => (
                        <div key={p.id} className="w3-third w3-margin-bottom">
                            <div className="w3-card w3-padding w3-center"
                                onClick={() => addToCart(p)}
                            >
                                {p.image_url && (
                                    <img src={p.image_url} alt={p.name} style={{ width: "100%" }} />
                                )}
                                <h3>{p.name}</h3>
                                <p>${p.price}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Cart sidebar */}
            <div className="w3-quarter">
                <h2>Your Cart</h2>
                <ul className="w3-ul">
                    {cart.map((item) => (
                        <li key={item.id}>
                            {item.name} — {item.quantity}
                            <button
                                className="w3-button w3-small w3-red w3-right"
                                onClick={() => removeFromCart(item.id)}
                            >
                                X
                            </button>
                            <button
                                className="w3-button w3-small w3-blue w3-right"
                                onClick={() => decreaseQuantity(item.id)}
                            >
                                -
                            </button>
                        </li>
                    ))}
                </ul>
                {cart.length > 0 && (
                    <button
                        onClick={handleCheckout}
                        className="w3-button w3-blue w3-round w3-margin-top w3-block"
                    >
                        Buy
                    </button>
                )}
            </div>
        </div>
    )
}
