import { NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";

// 1. Point to a JSON file instead of a JS file
const productsFilePath = path.join(process.cwd(), "src/lib", "products.json");

export async function POST(req) {
  try {
    const data = await req.formData();
    
    // Handle Image (keeping your existing logic)
    const image = data.get("img");
    let imgPath = "/images/default.jpg";
    if (image && typeof image !== "string") {
      const bytes = await image.arrayBuffer();
      const buffer = Buffer.from(bytes);
      const fileName = `${Date.now()}-${image.name}`;
      const uploadDir = path.join(process.cwd(), "public/images");
      
      // Ensure directory exists
      await fs.mkdir(uploadDir, { recursive: true });
      await fs.writeFile(path.join(uploadDir, fileName), buffer);
      imgPath = `/images/${fileName}`;
    }

    // 2. Read existing products from JSON file
    let products = [];
    try {
      const fileData = await fs.readFile(productsFilePath, "utf-8");
      products = JSON.parse(fileData);
    } catch (e) {
      // If file doesn't exist yet, we start with empty array
      products = [];
    }

    const newProduct = {
      id: products.length + 1,
      slug: data.get("slug"),
      title: data.get("productName"),
      description: data.get("description"),
      features: JSON.parse(data.get("features") || "[]"),
      img: imgPath,
      homeDelivery: data.get("homeDelivery") === "true",
      freeInstallation: data.get("freeInstallation") === "true",
    };

    // 3. Add to array and Save back to JSON
    products.push(newProduct);
    await fs.writeFile(productsFilePath, JSON.stringify(products, null, 2));

    return NextResponse.json({ message: "Product saved!", product: newProduct }, { status: 201 });

  } catch (error) {
    console.error("Save error:", error);
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}