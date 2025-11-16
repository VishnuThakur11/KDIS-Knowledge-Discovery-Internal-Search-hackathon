
import React from "react";
import { motion } from "framer-motion";
import SearchBar from "../components/SearchBar";
import { Link } from "react-router-dom";
export default function Home() {
  return (
    <div className="min-h-screen w-full bg-white text-black pt-24">
      {/* ===== Hero Section ===== */}
      <section className="relative max-w-7xl mx-auto px-6 py-20 text-center">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-4xl sm:text-5xl md:text-6xl font-extrabold leading-tight"
        >
          Find Anything.
          <span className="text-blue-600"> Instantly.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.7 }}
          className="mt-6 text-base sm:text-lg md:text-xl text-gray-700 max-w-3xl mx-auto"
        >
          A smart internal search tool that understands documents, assets, and teams.
          Search across PDFs, Slides, Figma, Docs, and more — all in one place.
        </motion.p>

        <SearchBar />
      </section>

      {/* ===== Features Section ===== */}
      <section className="max-w-7xl mx-auto px-6 py-16 grid md:grid-cols-3 gap-8">
        <FeatureCard
          title="Index Everything"
          desc="Documents, slides, spreadsheets, images, videos — automatically parsed and searchable."
        />
        <FeatureCard
          title="Semantic Search"
          desc="Find relevant results by meaning, not just keywords — across formats and teams."
        />
        <FeatureCard
          title="Auto Categorization"
          desc="Documents auto-tagged by project, topic and team using AI classifiers."
        />
        <FeatureCard
          title="Fast Previews"
          desc="Open a lightweight preview with highlighted matches and page-level navigation."
        />
        <FeatureCard
          title="Access Controls"
          desc="Users only see what they are permitted to view."
        />
        <FeatureCard
          title="Hybrid Performance"
          desc="Vector + keyword search for speed and precision at scale."
        />
      </section>

      {/* ===== CTA Section ===== */}
      <section className="text-center py-20 px-6">
        <motion.h2
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-3xl sm:text-4xl font-bold"
        >
          Ready to make your team smarter?
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.6 }}
          className="text-gray-700 mt-4 max-w-xl mx-auto"
        >
          Deploy a search experience that surfaces the right content, when your team needs it.
        </motion.p>

        <Link to="/signup"><motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mt-8 px-8 py-3 bg-linear-to-r from-blue-600 to-indigo-600 text-white rounded-full font-semibold shadow-md hover:from-blue-700 hover:to-indigo-700 transition"
        >
          Get Started
        </motion.button>
        </Link>
      </section>
    </div>
  );
}

function FeatureCard({ title, desc }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6 }}
      className="bg-white backdrop-blur-lg border border-gray-200 p-6 rounded-2xl shadow-sm hover:shadow-lg hover:-translate-y-1 transition"
    >
      <h3 className="text-lg font-semibold text-black">{title}</h3>
      <p className="text-gray-700 mt-3 text-sm">{desc}</p>
    </motion.div>
  );
}