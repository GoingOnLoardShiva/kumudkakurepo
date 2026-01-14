import { NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";

// 1. Point to a .js file
const productsFilePath = path.join(process.cwd(), "src/lib", "productsa.js");

export async function POST(req) {
  try {
    const data = await req.formData();
    
    // Image Handling logic
    const image = data.get("img");
    let imgPath = "/images/default.jpg";
    if (image && typeof image !== "string") {
      const bytes = await image.arrayBuffer();
      const buffer = Buffer.from(bytes);
      const fileName = `${Date.now()}-${image.name}`;
      const uploadDir = path.join(process.cwd(), "public/images");
      
      await fs.mkdir(uploadDir, { recursive: true });
      await fs.writeFile(path.join(uploadDir, fileName), buffer);
      imgPath = `/images/${fileName}`;
    }

    // 2. Read existing products from the .js file
    let products = [];
    try {
      const fileContent = await fs.readFile(productsFilePath, "utf-8");
      // Extract the JSON part from "export const products = [...];"
      const jsonString = fileContent.replace("export const products = ", "").replace(/;$/, "");
      products = JSON.parse(jsonString);
    } catch (e) {
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

    products.push(newProduct);

    // 3. Write back as a JavaScript Export
    const fileOutput = `export const products = ${JSON.stringify(products, null, 2)};`;
    await fs.writeFile(productsFilePath, fileOutput);

    return NextResponse.json({ message: "Product saved to JS file!", product: newProduct }, { status: 201 });

  } catch (error) {
    console.error("Save error:", error);
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}