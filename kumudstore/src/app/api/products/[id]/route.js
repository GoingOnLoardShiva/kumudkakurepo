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
      const formData = await req.formData();
  
      // 1. Extract text data from FormData
      const title = formData.get("productName");
      const slug = formData.get("slug");
      const description = formData.get("description");
      const features = formData.get("features"); // This is a JSON string
      const homeDelivery = formData.get("homeDelivery") === "true";
      const freeInstallation = formData.get("freeInstallation") === "true";
      const imageFile = formData.get("img"); // This is the file object
  
      let updateData = {
        title,
        slug,
        description,
        features, // Storing as JSON string
        homeDelivery,
        freeInstallation,
      };
  
      // 2. Handle Image Upload (only if a new file was provided)
      if (imageFile && typeof imageFile !== "string") {
        const fileName = `${Date.now()}-${imageFile.name}`;
        
        const { data: uploadData, error: uploadError } = await supabase.storage
          .from("product-images") // Make sure this bucket exists in Supabase
          .upload(fileName, imageFile);
  
        if (uploadError) throw uploadError;
  
        // Get Public URL for the uploaded image
        const { data: urlData } = supabase.storage
          .from("product-images")
          .getPublicUrl(fileName);
  
        updateData.img = urlData.publicUrl;
      }
  
      // 3. Update Database
      const { error } = await supabase
        .from("products")
        .update(updateData)
        .eq("id", id);
  
      if (error) throw error;
  
      return NextResponse.json({ message: "Product updated successfully" });
    } catch (error) {
      console.error("Update Error:", error);
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