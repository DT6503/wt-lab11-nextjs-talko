import { NextResponse } from "next/server";
import { pool } from "@/lib/db";

export async function GET() {
    try {
        const result = await pool.query('SELECT * FROM "Dishes" ORDER BY "Id"');
        return NextResponse.json(result.rows);
    } catch (error) {
        console.error("Database error:", error);
        return NextResponse.json({ error: "Failed to fetch dishes" }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { name, category, price, description, imageUrl } = body;

        if (!name || !category || price === undefined) {
            return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
        }

        const result = await pool.query(
            `INSERT INTO "Dishes" ("Name", "Category", "Price", "IsAvailable", "Description", "ImageUrl", "CreatedAt") 
       VALUES ($1, $2, $3, true, $4, $5, NOW()) RETURNING *`,
            [name, category, price, description, imageUrl || "https://placehold.co/400x300?text=Dish"]
        );
        return NextResponse.json(result.rows[0], { status: 201 });
    } catch (error) {
        console.error("Database error:", error);
        return NextResponse.json({ error: "Failed to create dish" }, { status: 500 });
    }
}