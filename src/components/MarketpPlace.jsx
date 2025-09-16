import React, { useEffect, useState, useCallback } from "react";
import { motion } from "framer-motion";
import productsData from "../data/products.json";
import ProductCard from "../ui/ProductCard";
import Topbar from "../ui/header";
import SearchFilters from "../ui/SearchFilters";
import CategoryTabs from "../ui/CategoryTabs";
import EmptyState from "../ui/EmptyState";

const categories = [
  { id: "all", label: "All" },
  { id: "paintings", label: "Paintings" },
  { id: "pottery", label: "Pottery" },
  { id: "jewelry", label: "Jewelry" },
];

const states = ["All States", "Rajasthan", "Gujarat", "Kerala", "Karnataka"];
const priceRanges = [
  { label: "All Prices", min: 0, max: Infinity },
  { label: "Under ₹1,000", min: 0, max: 1000 },
  { label: "₹1,000 - ₹5,000", min: 1000, max: 5000 },
  { label: "₹5,000 - ₹15,000", min: 5000, max: 15000 },
  { label: "Above ₹15,000", min: 15000, max: Infinity },
];

const Marketplace = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [activeCategory, setActiveCategory] = useState("all");
  const [selectedState, setSelectedState] = useState("All States");
  const [selectedPriceRange, setSelectedPriceRange] = useState(priceRanges[0]);
  const [searchQuery, setSearchQuery] = useState("");
  const [wishlist, setWishlist] = useState(new Set());
  const [cart, setCart] = useState(new Set());

  useEffect(() => {
    setProducts(productsData);
    setFilteredProducts(productsData);
  }, []);

  const applyFilters = useCallback(() => {
    let filtered = [...products];

    if (activeCategory !== "all") filtered = filtered.filter((p) => p.category === activeCategory);
    if (selectedState !== "All States") filtered = filtered.filter((p) => p.state === selectedState);
    filtered = filtered.filter((p) => p.price >= selectedPriceRange.min && p.price <= selectedPriceRange.max);
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter((p) => p.name.toLowerCase().includes(query) || p.description.toLowerCase().includes(query));
    }
    setFilteredProducts(filtered);
  }, [products, activeCategory, selectedState, selectedPriceRange, searchQuery]);

  useEffect(() => {
    applyFilters();
  }, [applyFilters]);

  const resetFilters = () => {
    setSearchQuery("");
    setActiveCategory("all");
    setSelectedState("All States");
    setSelectedPriceRange(priceRanges[0]);
  };

  return (
    <motion.div
      className="min-h-screen flex flex-col bg-gradient-to-br from-purple-50 to-blue-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      {/* Topbar */}
      <div className="sticky top-0 z-50">
        <Topbar />
      </div>

      <div className="flex-1 container mx-auto px-4 md:px-8 pt-24 pb-10">
        {/* Title */}
        <motion.div
          className="text-center mb-8"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0, y: 30 },
            visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
          }}
        >
          <motion.h1
            className="text-4xl md:text-5xl font-bold text-gray-900 mb-3"
            whileHover={{ scale: 1.02 }}
          >
            Artisan Marketplace
          </motion.h1>
          <motion.p
            className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            Discover and purchase authentic Indian art and crafts directly from skilled artisans.
          </motion.p>
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <SearchFilters
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            selectedState={selectedState}
            setSelectedState={setSelectedState}
            selectedPriceRange={selectedPriceRange}
            setSelectedPriceRange={setSelectedPriceRange}
            wishlist={wishlist}
            cart={cart}
            states={states}
            priceRanges={priceRanges}
          />
        </motion.div>

        {/* Categories */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          <CategoryTabs
            activeCategory={activeCategory}
            setActiveCategory={setActiveCategory}
            categories={categories}
          />
        </motion.div>

        {/* Products */}
        <motion.div
          className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mt-6"
          initial="hidden"
          animate="visible"
          variants={{
            visible: { 
              transition: { staggerChildren: 0.1 } 
            },
          }}
        >
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                whileHover={{ scale: 1.03, boxShadow: "0px 10px 20px rgba(0,0,0,0.2)" }}
                transition={{ duration: 0.4 }}
              >
                <ProductCard product={product} />
              </motion.div>
            ))
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <EmptyState onReset={resetFilters} />
            </motion.div>
          )}
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Marketplace;
