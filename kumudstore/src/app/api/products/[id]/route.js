import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function DELETE(req, { params }) {
    try {
        const { id } = await params;

        const { error } = await supabase
            .from("products")
            .delete()
            .eq("id", id);

        if (error) throw error;

        return NextResponse.json({ message: "Product deleted" });
    } catch (error) {
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
}
export async function PUT(req, { params }) {
    try {
        const { id } = await params;
        const data = await req.json(); // If sending JSON for edits

        const { error } = await supabase
            .from("products")
            .update({
                title: data.productName,
                description: data.description,
                features: data.features,
                homeDelivery: data.homeDelivery,
                freeInstallation: data.freeInstallation,
            })
            .eq("id", id);

        if (error) throw error;
        return NextResponse.json({ message: "Product updated successfully" });
    } catch (error) {
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
}
export async function GET(req, { params }) {
    try {
        // In Next.js 15, we must await params
        const { id } = await params;

        const { data, error } = await supabase
            .from("products")
            .select("*")
            .eq("id", id)
            .single(); // Gets the object {} instead of an array []

        if (error) {
            return NextResponse.json({ message: "Product not found" }, { status: 404 });
        }

        return NextResponse.json(data, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
}