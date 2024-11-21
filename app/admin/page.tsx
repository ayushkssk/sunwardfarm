"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/contexts/AuthContext"
import { collection, addDoc, getDocs, doc, updateDoc, deleteDoc } from "firebase/firestore"
import { db } from "@/lib/firebase"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
}

interface BlogPost {
  id: string;
  title: string;
  content: string;
}

export default function AdminPanel() {
  const { user, loading } = useAuth()
  const router = useRouter()
  const [products, setProducts] = useState<Product[]>([])
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([])
  const [newProduct, setNewProduct] = useState({ name: "", price: "", description: "" })
  const [newBlogPost, setNewBlogPost] = useState({ title: "", content: "" })

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login")
    }
  }, [user, loading, router])

  useEffect(() => {
    const fetchData = async () => {
      const productsSnapshot = await getDocs(collection(db, "products"))
      const fetchedProducts: Product[] = []
      productsSnapshot.forEach((doc) => {
        fetchedProducts.push({ id: doc.id, ...doc.data() } as Product)
      })
      setProducts(fetchedProducts)

      const blogPostsSnapshot = await getDocs(collection(db, "blogPosts"))
      const fetchedBlogPosts: BlogPost[] = []
      blogPostsSnapshot.forEach((doc) => {
        fetchedBlogPosts.push({ id: doc.id, ...doc.data() } as BlogPost)
      })
      setBlogPosts(fetchedBlogPosts)
    }

    fetchData()
  }, [])

  const handleAddProduct = async (e: React.FormEvent) => {
    e.preventDefault()
    const docRef = await addDoc(collection(db, "products"), {
      name: newProduct.name,
      price: Number(newProduct.price),
      description: newProduct.description
    })
    setProducts([...products, { id: docRef.id, ...newProduct, price: Number(newProduct.price) }])
    setNewProduct({ name: "", price: "", description: "" })
  }

  const handleAddBlogPost = async (e: React.FormEvent) => {
    e.preventDefault()
    const docRef = await addDoc(collection(db, "blogPosts"), newBlogPost)
    setBlogPosts([...blogPosts, { id: docRef.id, ...newBlogPost }])
    setNewBlogPost({ title: "", content: "" })
  }

  const handleEditProduct = async (id: string, updatedProduct: Partial<Product>) => {
    await updateDoc(doc(db, "products", id), updatedProduct)
    setProducts(products.map(product => product.id === id ? { ...product, ...updatedProduct } : product))
  }

  const handleEditBlogPost = async (id: string, updatedBlogPost: Partial<BlogPost>) => {
    await updateDoc(doc(db, "blogPosts", id), updatedBlogPost)
    setBlogPosts(blogPosts.map(post => post.id === id ? { ...post, ...updatedBlogPost } : post))
  }

  const handleDeleteProduct = async (id: string) => {
    await deleteDoc(doc(db, "products", id))
    setProducts(products.filter(product => product.id !== id))
  }

  const handleDeleteBlogPost = async (id: string) => {
    await deleteDoc(doc(db, "blogPosts", id))
    setBlogPosts(blogPosts.filter(post => post.id !== id))
  }

  if (loading) return <div>Loading...</div>

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-8 text-center font-playfair">Admin Panel</h1>
      <Tabs defaultValue="products" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="products">Manage Products</TabsTrigger>
          <TabsTrigger value="blog">Manage Blog Posts</TabsTrigger>
        </TabsList>
        <TabsContent value="products">
          <Card>
            <CardHeader>
              <CardTitle className="font-merriweather">Add New Product</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleAddProduct} className="space-y-4">
                <Input
                  placeholder="Product Name"
                  value={newProduct.name}
                  onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                  required
                />
                <Input
                  type="number"
                  placeholder="Price"
                  value={newProduct.price}
                  onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
                  required
                />
                <Textarea
                  placeholder="Description"
                  value={newProduct.description}
                  onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
                  required
                />
                <Button type="submit">Add Product</Button>
              </form>
            </CardContent>
          </Card>
          <div className="mt-8 grid gap-4">
            {products.map((product) => (
              <Card key={product.id}>
                <CardHeader>
                  <CardTitle>{product.name}</CardTitle>
                  <CardDescription>Price: ₹{product.price}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p>{product.description}</p>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" onClick={() => handleEditProduct(product.id, { name: prompt("New name") || product.name })}>Edit</Button>
                  <Button variant="destructive" className="ml-2" onClick={() => handleDeleteProduct(product.id)}>Delete</Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>
        <TabsContent value="blog">
          <Card>
            <CardHeader>
              <CardTitle className="font-merriweather">Add New Blog Post</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleAddBlogPost} className="space-y-4">
                <Input
                  placeholder="Blog Post Title"
                  value={newBlogPost.title}
                  onChange={(e) => setNewBlogPost({ ...newBlogPost, title: e.target.value })}
                  required
                />
                <Textarea
                  placeholder="Content"
                  value={newBlogPost.content}
                  onChange={(e) => setNewBlogPost({ ...newBlogPost, content: e.target.value })}
                  required
                />
                <Button type="submit">Add Blog Post</Button>
              </form>
            </CardContent>
          </Card>
          <div className="mt-8 grid gap-4">
            {blogPosts.map((post) => (
              <Card key={post.id}>
                <CardHeader>
                  <CardTitle>{post.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>{post.content.substring(0, 100)}...</p>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" onClick={() => handleEditBlogPost(post.id, { title: prompt("New title") || post.title })}>Edit</Button>
                  <Button variant="destructive" className="ml-2" onClick={() => handleDeleteBlogPost(post.id)}>Delete</Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

