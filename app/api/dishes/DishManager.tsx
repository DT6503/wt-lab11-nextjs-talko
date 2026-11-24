"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function DishManager() {
    const router = useRouter();
    const [name, setName] = useState("");
    const [category, setCategory] = useState("");
    const [price, setPrice] = useState("");
    const [description, setDescription] = useState("");

    const handleCreate = async (e: React.FormEvent) => {
        e.preventDefault();
        await fetch("/api/dishes", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name, category, price: Number(price), description }),
        });
        router.refresh(); // ќбновл€ем страницу, чтобы увидеть новое блюдо
        setName(""); setCategory(""); setPrice(""); setDescription("");
    };

    const handleDelete = async (id: number) => {
        if (confirm("Delete this dish?")) {
            await fetch(`/api/dishes/${id}`, { method: "DELETE" });
            router.refresh();
        }
    };

    const handleUpdatePrice = async (id: number, currentName: string, currentCategory: string, currentPrice: number, currentDesc: string) => {
        const newPrice = prompt("Enter new price:", currentPrice.toString());
        if (newPrice !== null) {
            await fetch(`/api/dishes/${id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name: currentName, category: currentCategory, price: Number(newPrice), description: currentDesc }),
            });
            router.refresh();
        }
    };

    return (
        <div style={{ marginTop: '30px', padding: '20px', border: '1px solid #ccc', borderRadius: '8px' }}>
            <h2>Add New Dish</h2>
            <form onSubmit={handleCreate} style={{ display: 'flex', flexDirection: 'column', gap: '10px', maxWidth: '300px' }}>
                <input placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} required style={{ padding: '8px' }} />
                <input placeholder="Category" value={category} onChange={(e) => setCategory(e.target.value)} required style={{ padding: '8px' }} />
                <input placeholder="Price" type="number" value={price} onChange={(e) => setPrice(e.target.value)} required style={{ padding: '8px' }} />
                <input placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} style={{ padding: '8px' }} />
                <button type="submit" style={{ padding: '10px', backgroundColor: '#0070f3', color: 'white', border: 'none', cursor: 'pointer' }}>Create Dish</button>
            </form>

            <hr style={{ margin: '20px 0' }} />

            <h2>Manage Dishes</h2>
            <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
                {/* Ётот блок нужен, чтобы передать управление. 
            Ќо лучше мы отрендерим карточки пр€мо в page.tsx, 
            а сюда добавим только кнопки управлени€. */}
            </div>

            {/* ƒл€ передачи данных в этот компонент можно использовать props, 
          но дл€ простоты мы будем вызывать методы удалени€ и обновлени€ 
          через кнопки на карточках, которые отрендерим в page.tsx */}
        </div>
    );
}