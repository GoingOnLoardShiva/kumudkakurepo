import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function POST(req) {
  try {
    const data = await req.formData();
    
    // 1. COLLECT TEXT DATA
    const productInfo = {
      slug: data.get("slug"),
      title: data.get("productName"),
      description: data.get("description"),
      features: JSON.parse(data.get("features") || "[]"),
      img: "", // Placeholder
      homeDelivery: data.get("homeDelivery") === "true",
      freeInstallation: data.get("freeInstallation") === "true",
    };

    const imageFile = data.get("img");

    // 2. INSERT TEXT DATA FIRST
    const { data: newProduct, error: dbError } = await supabase
      .from("products")
      .insert([productInfo])
      .select()
      .single();

    if (dbError) {
      console.error("DB Error:", dbError.message);
      return NextResponse.json({ message: "Database Connection Failed", error: dbError.message }, { status: 500 });
    }

    // 3. IF TEXT SAVED, UPLOAD IMAGE
    if (imageFile && typeof imageFile !== "string") {
      const fileName = `${newProduct.id}-${Date.now()}.jpg`;
      
      // Convert File to Buffer (Crucial for Node.js environments)
      const arrayBuffer = await imageFile.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);

      const { error: uploadError } = await supabase.storage
        .from("product-images")
        .upload(fileName, buffer, {
          contentType: imageFile.type,
          upsert: true
        });

      if (uploadError) {
        console.error("Upload Error:", uploadError.message);
        return NextResponse.json({ message: "Text saved, but image upload failed", product: newProduct }, { status: 201 });
      }

      // 4. GET URL AND UPDATE DATABASE
      const { data: urlData } = supabase.storage
        .from("product-images")
        .getPublicUrl(fileName);

      const publicUrl = urlData.publicUrl;

      await supabase
        .from("products")
        .update({ img: publicUrl })
        .eq("id", newProduct.id);

      newProduct.img = publicUrl;
    }

    return NextResponse.json({ message: "All data saved successfully!", product: newProduct ,status: 201});

  } catch (err) {
    console.error("Critical Error:", err);
    return NextResponse.json({ message: "Server connection timed out or crashed" }, { status: 500 });
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
