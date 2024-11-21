"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/contexts/AuthContext"
import { collection, query, where, getDocs } from "firebase/firestore"
import { db } from "@/lib/firebase"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

interface Order {
  id: string;
  products: { name: string; quantity: number }[];
  total: number;
  date: string;
}

export default function Dashboard() {
  const { user, loading } = useAuth()
  const router = useRouter()
  const [orders, setOrders] = useState<Order[]>([])

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login")
    }
  }, [user, loading, router])

  useEffect(() => {
    const fetchOrders = async () => {
      if (user) {
        const q = query(collection(db, "orders"), where("userId", "==", user.uid))
        const querySnapshot = await getDocs(q)
        const fetchedOrders: Order[] = []
        querySnapshot.forEach((doc) => {
          fetchedOrders.push({ id: doc.id, ...doc.data() } as Order)
        })
        setOrders(fetchedOrders)
      }
    }

    fetchOrders()
  }, [user])

  if (loading) return <div>Loading...</div>

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-8 text-center font-playfair">Your Dashboard</h1>
      <div className="grid gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="font-merriweather">Your Information</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Email: {user?.email}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="font-merriweather">Your Orders</CardTitle>
          </CardHeader>
          <CardContent>
            {orders.length === 0 ? (
              <p>You haven't placed any orders yet.</p>
            ) : (
              <ul className="space-y-4">
                {orders.map((order) => (
                  <li key={order.id}>
                    <Card>
                      <CardHeader>
                        <CardTitle>Order #{order.id}</CardTitle>
                        <CardDescription>Date: {order.date}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <ul>
                          {order.products.map((product, index) => (
                            <li key={index}>
                              {product.name} x {product.quantity}
                            </li>
                          ))}
                        </ul>
                      </CardContent>
                      <CardFooter>
                        <p>Total: ₹{order.total}</p>
                      </CardFooter>
                    </Card>
                  </li>
                ))}
              </ul>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

