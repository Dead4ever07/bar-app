import { useEffect, useState } from "react"
import { supabase } from "../supabaseClient"
import OrdersLayout from "../components/OrdersLayout"
import { useNavigate } from "react-router-dom";

export default function Orders() {
  const [orders, setOrders] = useState([])
  const navigate = useNavigate();
  
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
        data.sort((a, b) => b.is_pending - a.is_pending)
      )
    }

  }


  useEffect(() => {

    const checkUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        navigate("/login"); // redirect to login if not logged in
      }
    };

    checkUser();

    fetchOrders();

    const broadcastChannel = supabase
      .channel("orders-broadcast")
      .on("broadcast", { event: "new-order" }, (payload) => {
        console.log("Broadcast received!", payload)
        const newOrder = payload.payload

        setOrders((prev) => {
          const updated = [newOrder, ...prev]
          return updated.sort((a, b) => b.is_pending - a.is_pending)
        })
      })
      .subscribe((status) => {
        console.log("Subscription status:", status)
      })




    return () => {
      supabase.removeChannel(broadcastChannel);
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

    const { data: orderItems, error: fetchError } = await supabase
      .from("order_items")
      .select("*")
      .eq("order_id", orderId);

    if (fetchError) {
      console.error(fetchError);
      return;
    }

    const allDone = orderItems.every((i) => i.is_done);

    const { error: orderError } = await supabase
      .from("orders")
      .update({ is_pending: !allDone })
      .eq("id", orderId);

    if (orderError) console.error(orderError);

  }




  return (
    <OrdersLayout>
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
    </OrdersLayout>


  )
}
