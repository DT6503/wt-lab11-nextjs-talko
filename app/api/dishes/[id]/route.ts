import { NextResponse } from "next/server";
import { pool } from "@/lib/db";

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        const resolvedParams = await params;
        const id = Number(resolvedParams.id);

        if (isNaN(id)) {
            return NextResponse.json({ error: "Invalid ID format" }, { status: 400 });
        }

        const body = await request.json();
        const { name, category, price, description, imageUrl } = body;

        if (!name || !category || price === undefined) {
            return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
        }

        const existing = await pool.query(`SELECT "CreatedAt" FROM "Dishes" WHERE "Id" = $1`, [id]);
        if (existing.rows.length === 0) {
            return NextResponse.json({ error: "Dish not found" }, { status: 404 });
        }

        const createdAt = existing.rows[0].CreatedAt;

        const result = await pool.query(
            `UPDATE "Dishes" 
       SET "Name" = $1, "Category" = $2, "Price" = $3, "Description" = $4, "ImageUrl" = $5, "CreatedAt" = $6 
       WHERE "Id" = $7 RETURNING *`,
            [name, category, price, description, imageUrl, createdAt, id]
        );

        return NextResponse.json(result.rows[0]);
    } catch (error) {
        console.error("Database error:", error);
        return NextResponse.json({ error: "Failed to update dish" }, { status: 500 });
    }
}

export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        const resolvedParams = await params;
        const id = Number(resolvedParams.id);

        if (isNaN(id)) {
            return NextResponse.json({ error: "Invalid ID format" }, { status: 400 });
        }

        const result = await pool.query(`DELETE FROM "Dishes" WHERE "Id" = $1 RETURNING *`, [id]);

        if (result.rows.length === 0) {
            return NextResponse.json({ error: "Dish not found" }, { status: 404 });
        }
        return NextResponse.json({ message: "Dish deleted" });
    } catch (error) {
        console.error("Database error:", error);
        return NextResponse.json({ error: "Failed to delete dish" }, { status: 500 });
    }
}