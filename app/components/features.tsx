import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Icon } from "next/dist/lib/metadata/types/metadata-types";

interface FeatureProps {
  title: string;
  description: string;
}

const features: FeatureProps[] = [
  {
    title: "View All Meows",
    description:
      "Get meows from gallery with searching, filtering and pagination. (10 calls/minute)",
  },
  {
    title: "Add Your Meows",
    description:
      "Add upto 5 of your meows to this global gallery.",
  },
  {
    title: "Update Your Meows Occasionally",
    description:
      "Update your meows periodically",
  },
];

const featureList: string[] = [
  "Robust Api Doc",
  "Affordable Pricing (Free)",
  "Mood Refresher",
  "Searching",
  "Sorting",
  "Filtering",
  "Pagination",
];

export const Features = () => {
  return (
    <section
      id="features"
      className="container py-24 sm:py-32 space-y-8"
    >
      <h2 className="text-3xl lg:text-4xl font-bold md:text-center">
        Many{" "}
        <span className="bg-gradient-to-b from-primary/60 to-primary text-transparent bg-clip-text">
          Great Features
        </span>
      </h2>

      <div className="flex flex-wrap md:justify-center gap-4">
        {featureList.map((feature: string) => (
          <div key={feature}>
            <Badge
              variant="secondary"
              className="text-sm"
            >
              {feature}
            </Badge>
          </div>
        ))}
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {features.map(({ title, description }: FeatureProps) => (
          <Card key={title}>
            <CardHeader>
              <CardTitle>{title}</CardTitle>
            </CardHeader>

            <CardContent>{description}</CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
};
