import { useEffect, useState } from "react"
import { supabase } from "../supabaseClient"

export default function Orders() {
  const [orders, setOrders] = useState([])

  const fetchOrders = async () => {
    let { data, error } = await supabase
      .from("orders")
      .select(
        `id,
         is_pending,
         created_at,
         order_items (
          id,
          product_id,
          quantity,
          is_done,
          products (name)
         )
        `)

    if (!error) {
      const sorted = data.sort((a, b) => b.is_pending - a.is_pending);
      setOrders(data);
    }

  }
  useEffect(() => {
    fetchOrders()
    const channel = supabase
      .channel("orders-changes")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "orders" },
        (payload) => {
          console.log("Change received!", payload)

          fetchOrders()
        }
      )
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [])

  async function toggleItem(orderId, itemId, currentValue) {
    await supabase
      .from("order_items")
      .update({ is_done: !currentValue })
      .eq("id", itemId);

    const { data: updatedOrder } = await supabase
      .from("order_items")
      .select("*")
      .eq("order_id", orderId);

    const allDone = updatedOrder.every((i) => i.is_done);

    if (allDone) {
      await supabase.from("orders").update({ is_pending: false }).eq("id", orderId);
    }

    fetchOrders();
  }



  return (
    <div className="w3-container">
      <h2>Orders</h2>
      {orders.map((order) => (
        <div
          key={order.id}
          className={`w3-card w3-padding w3-margin-bottom ${order.is_pending ? "w3-pale-yellow" : "w3-light-grey"
            }`}
        >
          <h4>Order #{order.id}</h4>
          <ul className="w3-ul">
            {order.order_items.map((item) => (
              <li key={item.id}>
                <input
                  type="checkbox"
                  checked={item.is_done}
                  onChange={() => toggleItem(order.id, item.id, item.is_done)}
                  className="w3-check"
                />
                {item.products.name} × {item.quantity}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>

  )
}
