import { useEffect, useState } from "react"
import { supabase } from "../supabaseClient"

export default function Orders() {
  const [orders, setOrders] = useState([])

  useEffect(() => {
    const fetchOrders = async () => {
      let { data, error } = await supabase
        .from("orders")
        .select("id, product_id, status, created_at")
        .eq("status", "pending")
      if (!error) setOrders(data)
    }
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

  return (
    <div>
      <h1>Orders</h1>
      <ul>
        {orders.map((order) => (
          <li key={order.id}>
            Order #{order.id} - {order.status}
          </li>
        ))}
      </ul>
    </div>
  )
}
