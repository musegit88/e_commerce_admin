import { LucideIcon } from "lucide-react";
import { usePathname } from "next/navigation";
import React from "react";
import { string } from "zod";

interface HeadingProps {
  title: string;
  description: string;
  icon: LucideIcon;
}
const Heading: React.FC<HeadingProps> = ({
  title,
  description,
  icon: Icon,
}) => {
  return (
    <div className="flex gap-4">
      <div className="flex items-center">
        <Icon size={44} />
      </div>
      <div>
        <h2 className="text-4xl font-semibold tracking-tight">{title}</h2>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
    </div>
  );
};

export default Heading;
