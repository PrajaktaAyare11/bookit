"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import Image from "next/image";

export default function Header() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/?search=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <header className="bg-white border-b sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between gap-4">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            
            <div className="flex flex-col leading-tight">
              <Image
                src="/attachment.png"
                alt="Highway Delite Logo"
                width={120}    
                height={120}
                className="rounded-sm object-contain"
                priority
              />
            </div>
          </Link>

          {/* Search Bar */}
          <form onSubmit={handleSearch} className="flex-1 max-w-md">
            <div className="flex gap-4">
              <Input
                type="text"
                placeholder="Search experiences"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1 bg-[#ededed]"
              />
              <Button
                type="submit"
                className="bg-yellow-400 hover:bg-yellow-500 text-black font-medium px-6"
              >
                Search
              </Button>
            </div>
          </form>
        </div>
      </div>
    </header>
  );
}