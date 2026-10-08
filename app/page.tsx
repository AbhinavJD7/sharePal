import fs from "fs/promises";
import path from "path";
import { Header } from "@/components/layout/Header";
import { CategoryNav } from "@/components/layout/CategoryNav";
import { MainContentLayout } from "@/components/layout/MainContentLayout";
import { IProduct, IProductResponse } from "@/types/product";

// Server Component: Ingests product data on the server
async function getProducts(): Promise<IProduct[]> {
  try {
    const filePath = path.join(process.cwd(), "product-list.json");
    const fileContents = await fs.readFile(filePath, "utf-8");
    const data: IProductResponse = JSON.parse(fileContents);
    const existing = data.products || [];

    // Ensure GTA VI items shown in screenshot exist in products collection with correct images
    const gtaItems: IProduct[] = [
      {
        id: 99001,
        name: "PS5 + GTA 6 with 1 Controller",
        image:
          "https://images.sharepal.in/categories/gaming-consoles/ps5/ps5-with-1-controller-gta-6/ps5-with-gta-6-with-1-controller-on-rent-sharepal-1.webp",
        rating: 0,
        booked_count: 0,
        tag: "New",
        per_day_rent: 200,
        out_of_stock: true,
        category: "gta-vi",
      },
      {
        id: 99002,
        name: "Xbox Series S + GTA 6 with 1 Controller",
        image:
          "https://images.sharepal.in/categories/gaming-consoles/xbox/xbox-with-1-controller-gta-6/xbox-series-s-with-gta-6-with-1-controller-on-rent-sharepal-1.webp",
        rating: 0,
        booked_count: 0,
        tag: "New",
        per_day_rent: 200,
        out_of_stock: true,
        category: "gta-vi",
      },
    ];

    // Mark other items with category or keep as consoles
    const enrichedExisting = existing.map((p) => {
      let category = "ps5-console";
      const lower = p.name.toLowerCase();
      if (lower.includes("xbox")) category = "xbox-console";
      else if (lower.includes("portal") || lower.includes("vr")) category = "vr";
      else if (lower.includes("racing") || lower.includes("wheel"))
        category = "racing-wheel";

      return {
        ...p,
        category,
      };
    });

    return [...gtaItems, ...enrichedExisting];
  } catch (error) {
    console.error("Failed to load products from product-list.json:", error);
    return [];
  }
}

export default async function Page() {
  const products = await getProducts();

  return (
    <div className="min-h-screen flex flex-col bg-[#fdfdfd]">
      {/* 1. Global Header Navigation */}
      <Header />

      {/* 2. Horizontal Category Navigation */}
      <CategoryNav />

      {/* 3. Main Two-Column Layout (Sidebar + Hero + Dynamic Product Grid) */}
      <MainContentLayout initialProducts={products} />
    </div>
  );
}
