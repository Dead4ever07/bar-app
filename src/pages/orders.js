import { useEffect, useState } from "react"
import { supabase } from "../supabaseClient"
import Layout from "../components/Layout"

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
        `).order("created_at", { ascending: false });

    if (!error) {
      setOrders(
        updated.sort((a, b) => b.is_pending - a.is_pending)
      )
    }

  }


  useEffect(() => {
    fetchOrders();

    const ordersChannel = supabase
      .channel("orders-changes")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "orders" },
        (payload) => {
          console.log("New order!", payload);
          setOrders(prev => [payload.new, ...prev]);
        }
      )
      .subscribe();


    const broadcastChannel = supabase
      .channel("orders-broadcast")
      .on("broadcast", { event: "new_order" }, (payload) => {
        console.log("Broadcast received!", payload)
        setOrders(prev => {
          const updated = [payload.payload.new, ...prev];

          return updated.sort((a, b) => b.is_pending - a.is_pending);
        });
      })
      .subscribe();

    return () => {
      supabase.removeChannel(ordersChannel);
    };
  }, []);

  async function toggleItem(orderId, itemId, currentValue) {
    const { error: itemError } = await supabase
      .from("order_items")
      .update({ is_done: !currentValue })
      .eq("id", itemId);

    if (itemError) {
      console.error(itemError);
      return;
    }

    // Step 2: fetch all items in this order to check overall status
    const { data: orderItems, error: fetchError } = await supabase
      .from("order_items")
      .select("*")
      .eq("order_id", orderId);

    if (fetchError) {
      console.error(fetchError);
      return;
    }

    // Step 3: determine if order should be pending
    const allDone = orderItems.every((i) => i.is_done);

    const { error: orderError } = await supabase
      .from("orders")
      .update({ is_pending: !allDone }) // true if at least one item is not done
      .eq("id", orderId);

    if (orderError) console.error(orderError);

    // Step 4: refresh orders
    fetchOrders();
  }




  return (
    <Layout>
      <h2>Orders</h2>
      {orders.map((order) => (
        <div
          key={order.id}
          className={`w3-card w3-padding w3-margin-bottom ${order.is_pending ? "" : "w3-light-grey"
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
    </Layout>


  )
}
