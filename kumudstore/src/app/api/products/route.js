import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function POST(req) {
  try {
    const data = await req.formData();
    const image = data.get("img");

    // 1. Insert Product Data first (WITHOUT the image URL yet)
    const { data: newProduct, error: dbError } = await supabase
      .from("products")
      .insert([
        {
          slug: data.get("slug"),
          title: data.get("productName"),
          description: data.get("description"),
          features: JSON.parse(data.get("features") || "[]"),
          img: "", // Temporary empty string
          homeDelivery: data.get("homeDelivery") === "true",
          freeInstallation: data.get("freeInstallation") === "true",
        },
      ])
      .select()
      .single(); // Use .single() to get the object directly

    if (dbError) throw dbError;

    // 2. ONLY IF DATABASE SAVED: Upload the image
    if (image && typeof image !== "string") {
      const fileName = `${Date.now()}-${image.name}`;
      
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from("product-images")
        .upload(fileName, image);

      // If image upload fails, you might want to delete the product or just log it
      if (uploadError) {
        console.error("Image upload failed, but product was created:", uploadError);
        return NextResponse.json({ 
          message: "Product saved, but image upload failed.", 
          product: newProduct 
        }, { status: 201 });
      }

      // 3. Get Public URL and UPDATE the product row
      const { data: publicUrlData } = supabase.storage
        .from("product-images")
        .getPublicUrl(fileName);
      
      const imgPublicUrl = publicUrlData.publicUrl;

      await supabase
        .from("products")
        .update({ img: imgPublicUrl })
        .eq("id", newProduct.id);
        
      // Update local object for the response
      newProduct.img = imgPublicUrl;
    }

    return NextResponse.json({ message: "Product and Image saved!", product: newProduct }, { status: 201 });

  } catch (error) {
    console.error("Operation Error:", error);
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

export async function GET() {
  try {
    // 1. Fetch all products from the "products" table
    // 2. Order by 'id' or 'created_at' so the list stays consistent
    const { data, error } = await supabase
      .from("products")
      .select("*")
      .order("id", { ascending: false });

    if (error) {
      throw error;
    }

    // Return the array of products
    return NextResponse.json(data, { status: 200 });
    
  } catch (error) {
    console.error("Fetch error:", error);
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
