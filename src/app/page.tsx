"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import ExperienceCard from "@/components/ExperienceCard";
import { Experience } from "@/types";
import { BarLoader } from "react-spinners";

export default function HomePage() {
  const searchParams = useSearchParams();
  const searchQuery = searchParams.get("search") || "";
  
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [filteredExperiences, setFilteredExperiences] = useState<Experience[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch experiences from API
  useEffect(() => {
    fetch('/api/experiences')
      .then(res => res.json())
      .then(data => {
        setExperiences(data);
        setFilteredExperiences(data);
        setLoading(false);
      })
      .catch(error => {
        console.error("Failed to fetch experiences:", error);
        setLoading(false);
      });
  }, []);

  // Filter experiences based on search
  useEffect(() => {
    if (searchQuery) {
      const filtered = experiences.filter((exp) =>
        exp.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        exp.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
        exp.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredExperiences(filtered);
    } else {
      setFilteredExperiences(experiences);
    }
  }, [searchQuery, experiences]);

   if (loading) {
    return (
      <div>
        <BarLoader className="mt-4" width={"100%"} color="#facc15" />
        <p className="text-gray-500 text-center">Loading experience...</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-6 py-8 max-w-7xl">
      {/* Search Results Info */}
      {searchQuery && (
        <div className="mb-6">
          <p className="text-gray-600 text-sm">
            Found {filteredExperiences.length} results for "{searchQuery}"
          </p>
        </div>
      )}

      {/* Experiences Grid - 4 columns on large screens */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 place-items-center sm:place-items-start">
        {filteredExperiences.map((experience) => (
          <ExperienceCard key={experience.id} experience={experience} />
        ))}
      </div>

      {/* No Results */}
      {filteredExperiences.length === 0 && (
        <div className="text-center py-20">
          <p className="text-gray-500 text-lg">No experiences found</p>
          <p className="text-gray-400 text-sm mt-2">Try a different search term</p>
        </div>
      )}
    </div>
  );
}