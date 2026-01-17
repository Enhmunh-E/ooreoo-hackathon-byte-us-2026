/* eslint-disable */
// Disable all typescript - eslint checks for this file
"use client";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";
import { useEffect, useState } from "react";
// Ensure this path matches your project structure
import data from "../../../../public/data.json";

export default function MarketPage() {
  const pathname = usePathname();
  const router = useRouter();

  // State
  const [product, setProduct] = useState(null);
  const [storeName, setStoreName] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [specialRequest, setSpecialRequest] = useState("");

  // 1. Find Product Logic
  useEffect(() => {
    const slug = pathname?.split("/").pop();

    if (!slug || !data) return;

    const normalize = (str: string) =>
      str.toLowerCase().replace(/[^a-z0-9]/g, "");

    const targetSlug = normalize(decodeURIComponent(slug));

    let foundItem = null;
    let foundStore = "";

    for (const serviceObj of data) {
      if (foundItem) break;
      const store = serviceObj.store;
      const categories = serviceObj.data;

      for (const categoryKey in categories) {
        const items = categories[categoryKey];
        const match = items.find((item) => normalize(item.name) === targetSlug);

        if (match) {
          foundItem = match;
          foundStore = store;
          break;
        }
      }
    }

    if (foundItem) {
      setProduct(foundItem);
      setStoreName(foundStore);
    }
  }, [pathname]);

  if (!product) {
    return (
      <div className="h-screen bg-[#121212] text-white flex items-center justify-center">
        Loading...
      </div>
    );
  }

  return (
    // MAIN CONTAINER: Full screen height, Flex Column
    // h-[100dvh] ensures it fits perfectly on mobile browsers with dynamic URL bars
    <div className="h-[100dvh] bg-[#121212] text-white font-sans flex flex-col overflow-hidden">
      {/* --- 1. TOP SECTION (SCROLLABLE) --- */}
      {/* flex-1: Takes up all space NOT used by the footer */}
      {/* overflow-y-auto: Allows scrolling ONLY inside this box */}
      <div className="flex-1 overflow-y-auto scrollbar-hide relative">
        {/* Hero Image Section */}
        <div className="relative w-full h-[40vh] bg-white shrink-0">
          {/* Nav Buttons (Absolute relative to this scrollable container) */}
          <div className="absolute top-0 left-0 w-full p-4 flex justify-between items-start z-10">
            <button
              onClick={() => router.back()}
              className="w-10 h-10 bg-black/50 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:bg-black/70 transition"
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            </button>

            <div className="flex gap-3">
              <button className="w-10 h-10 bg-black/50 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:bg-black/70 transition">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                </svg>
              </button>
              <button className="w-10 h-10 bg-black/50 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:bg-black/70 transition">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" />
                  <polyline points="16 6 12 2 8 6" />
                  <line x1="12" y1="2" x2="12" y2="15" />
                </svg>
              </button>
            </div>
          </div>

          <div className="w-full h-full relative">
            <Image
              src={product.image}
              alt={product.name}
              fill
              className="object-contain p-8"
            />
          </div>
        </div>

        {/* Product Content */}
        <div className="px-5 pt-6 pb-8">
          {/* Title */}
          <h1 className="text-2xl font-bold leading-tight mb-2">
            {product.name}
          </h1>

          {/* Store Name Row */}
          <div className="flex items-center justify-between mb-6 cursor-pointer">
            <div className="flex flex-col">
              <span className="text-base font-bold text-white flex items-center gap-1">
                {storeName}
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-gray-400"
                >
                  <path d="M9 18l6-6-6-6" />
                </svg>
              </span>
              <span className="text-xs text-gray-400">45 mins • Delivery</span>
            </div>
          </div>

          {/* Description */}
          <div className="mb-8">
            <p className="text-gray-400 text-sm leading-relaxed whitespace-pre-line">
              {product.description}
            </p>
          </div>

          <hr className="border-[#2C2C2C] mb-6" />

          {/* Special Request */}
          <div className="mb-4">
            <div className="flex justify-between items-center mb-3">
              <h3 className="font-bold text-lg">Special Request</h3>
              <span className="text-xs text-gray-500 bg-[#2C2C2C] px-2 py-1 rounded">
                Optional
              </span>
            </div>
            <div className="flex items-center gap-3 text-gray-400 border-b border-[#2C2C2C] pb-4 cursor-pointer hover:text-white transition-colors">
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
              </svg>
              <input
                type="text"
                placeholder="Add a note (e.g. Gift wrap please)"
                className="bg-transparent border-none outline-none w-full placeholder:text-gray-500 text-sm text-white"
                value={specialRequest}
                onChange={(e) => setSpecialRequest(e.target.value)}
              />
            </div>
          </div>
        </div>
      </div>

      {/* --- 2. BOTTOM SECTION (STATIC/STUCK) --- */}
      {/* shrink-0 prevents this from collapsing if content is huge */}
      <div className="w-full bg-[#121212] border-t border-[#2C2C2C] p-4 pb-8 shrink-0 z-50">
        <div className="max-w-md mx-auto flex items-center gap-4">
          {/* Quantity Selector */}
          <div className="flex items-center bg-[#2C2C2C] rounded-full px-1 py-1 h-14 min-w-[120px] justify-between">
            <button
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              className="w-10 h-full flex items-center justify-center text-2xl text-gray-400 hover:text-white pb-1"
            >
              −
            </button>
            <span className="font-bold text-lg">{quantity}</span>
            <button
              onClick={() => setQuantity(quantity + 1)}
              className="w-10 h-full flex items-center justify-center text-2xl text-gray-400 hover:text-white pb-1"
            >
              +
            </button>
          </div>

          {/* Add To Cart Button */}
          <button className="flex-1 bg-[#FF1C45] hover:bg-[#ff3d60] active:scale-[0.98] transition-all h-14 rounded-full flex items-center justify-between px-6 font-bold text-white shadow-lg shadow-red-900/20">
            <span>Add to cart</span>
            <span>{(product.price * quantity).toLocaleString()} QR</span>
          </button>
        </div>
      </div>
    </div>
  );
}
