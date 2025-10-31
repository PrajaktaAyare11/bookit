import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Experience } from "@/types";

interface ExperienceCardProps {
  experience: Experience;
}

export default function ExperienceCard({ experience }: ExperienceCardProps) {
  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow border border-gray-200 w-[280px] h-[312px] flex flex-col bg-[#f0f0f0]">
      {/* Image */}
      <div className="relative h-[160px] w-full bg-gray-200 flex-shrink-0">
        <Image
          src={experience.image}
          alt={experience.title}
          fill
          className="object-cover"
        />
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col flex-1">
        {/* Title and Location Badge */}
        <div className="flex items-start justify-between gap-2 mb-2">
          <h3 className="font-semibold text-base leading-tight flex-1">
            {experience.title}
          </h3>
          <Badge 
            variant="secondary" 
            className="text-xs whitespace-nowrap bg-[#d6d6d6]  hover:bg-gray-100 font-normal flex-shrink-0"
          >
            {experience.location}
          </Badge>
        </div>

        {/* Description */}
        <p className="text-sm text-gray-600 leading-relaxed line-clamp-2 mb-auto">
          {experience.description}
        </p>

        {/* Price and CTA */}
        <div className="flex items-center justify-between mt-3">
          <div className="flex items-baseline gap-1">
            <span className="text-xs text-gray-500">From</span>
            <p className="text-lg font-bold text-gray-900">₹{experience.price.toFixed(0)}</p>
          </div>

          <Link href={`/experiences/${experience.id}`}>
            <Button className="bg-yellow-400 hover:bg-yellow-500 text-black font-semibold shadow-sm h-9 px-4">
              View Details
            </Button>
          </Link>
        </div>
      </div>
    </Card>
  );
}