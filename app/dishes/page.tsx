"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

type Dish = {
    Id: number;
    Name: string;
    Category: string;
    Price: number;
    Description: string;
    ImageUrl: string;
};

export default function DishesPage() {
    const [dishes, setDishes] = useState<Dish[]>([]);
    const [name, setName] = useState("");
    const [category, setCategory] = useState("");
    const [price, setPrice] = useState("");
    const [description, setDescription] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    const fetchDishes = async () => {
        const res = await fetch("/api/dishes");
        const data = await res.json();
        setDishes(data);
    };

    useEffect(() => {
        fetchDishes();
    }, []);

    const handleCreate = async (e: React.FormEvent) => {
        e.preventDefault();
        if (isSubmitting) return;

        setIsSubmitting(true);
        try {
            await fetch("/api/dishes", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name, category, price: Number(price), description }),
            });
            fetchDishes();
            setName(""); setCategory(""); setPrice(""); setDescription("");
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleDelete = async (id: number) => {
        if (confirm("Are you sure you want to delete this dish?")) {
            await fetch(`/api/dishes/${id}`, { method: "DELETE" });
            fetchDishes();
        }
    };

    const handleUpdatePrice = async (dish: Dish) => {
        const newPrice = prompt(`Enter new price for ${dish.Name}:`, dish.Price.toString());
        if (newPrice !== null && !isNaN(Number(newPrice))) {
            const res = await fetch(`/api/dishes/${dish.Id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    name: dish.Name,
                    category: dish.Category,
                    price: Number(newPrice),
                    description: dish.Description,
                    imageUrl: dish.ImageUrl
                }),
            });

            if (res.ok) {
                fetchDishes();
            } else {
                alert("Failed to update price");
            }
        }
    };

    return (
        <main style={{ padding: '40px', fontFamily: 'sans-serif', maxWidth: '1000px', margin: '0 auto' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h1>Dishes Management</h1>
                <Link href="/" style={{ color: '#0070f3' }}>← Back to Home</Link>
            </div>

            <div style={{ marginTop: '20px', padding: '20px', border: '1px solid #ddd', borderRadius: '8px', backgroundColor: '#f9f9f9' }}>
                <h2>Add New Dish</h2>
                <form onSubmit={handleCreate} style={{ display: 'grid', gap: '10px', maxWidth: '400px' }}>
                    <input placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} required style={{ padding: '8px' }} />
                    <input placeholder="Category" value={category} onChange={(e) => setCategory(e.target.value)} required style={{ padding: '8px' }} />
                    <input placeholder="Price" type="number" value={price} onChange={(e) => setPrice(e.target.value)} required style={{ padding: '8px' }} />
                    <input placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} style={{ padding: '8px' }} />

                    <button
                        type="submit"
                        disabled={isSubmitting}
                        style={{
                            padding: '10px',
                            backgroundColor: isSubmitting ? '#ccc' : '#0070f3',
                            color: 'white',
                            border: 'none',
                            borderRadius: '5px',
                            cursor: isSubmitting ? 'not-allowed' : 'pointer'
                        }}
                    >
                        {isSubmitting ? 'Adding...' : 'Add Dish'}
                    </button>
                </form>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '20px', marginTop: '30px' }}>
                {dishes.map((dish) => (
                    <div key={dish.Id} style={{ border: '1px solid #ddd', borderRadius: '8px', padding: '20px', boxShadow: '0 2px 5px rgba(0,0,0,0.1)' }}>
                        <img src={dish.ImageUrl} alt={dish.Name} style={{ width: '100%', height: '150px', objectFit: 'cover', borderRadius: '5px' }} />
                        <h2>{dish.Name}</h2>
                        <p>{dish.Category}</p>
                        <p>{dish.Price} BYN</p>
                        <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
                            <button onClick={() => handleUpdatePrice(dish)} style={{ padding: '5px 10px', backgroundColor: '#f0ad4e', color: 'white', border: 'none', borderRadius: '3px', cursor: 'pointer' }}>Edit Price</button>
                            <button onClick={() => handleDelete(dish.Id)} style={{ padding: '5px 10px', backgroundColor: '#d9534f', color: 'white', border: 'none', borderRadius: '3px', cursor: 'pointer' }}>Delete</button>
                        </div>
                    </div>
                ))}
            </div>
        </main>
    );
}