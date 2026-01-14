import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function POST(req) {
  try {
    const data = await req.formData();
    const image = data.get("img");
    let imgPublicUrl = "";

    // 1. Upload Image to Supabase Storage
    if (image && typeof image !== "string") {
      const fileName = `${Date.now()}-${image.name}`;
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from("product-images")
        .upload(fileName, image);

      if (uploadError) throw uploadError;

      // Get the Public URL for the uploaded image
      const { data: publicUrlData } = supabase.storage
        .from("product-images")
        .getPublicUrl(fileName);
      
      imgPublicUrl = publicUrlData.publicUrl;
    }

    // 2. Insert Product Data into Supabase Database
    const { data: newProduct, error: dbError } = await supabase
      .from("products")
      .insert([
        {
          slug: data.get("slug"),
          title: data.get("productName"),
          description: data.get("description"),
          features: JSON.parse(data.get("features") || "[]"),
          img: imgPublicUrl,
          homeDelivery: data.get("homeDelivery") === "true",
          freeInstallation: data.get("freeInstallation") === "true",
        },
      ])
      .select();

    if (dbError) throw dbError;

    return NextResponse.json({ message: "Product saved!", product: newProduct[0] }, { status: 201 });

  } catch (error) {
    console.error("Supabase Save Error:", error);
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
