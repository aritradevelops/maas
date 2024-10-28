import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface TestimonialProps {
  image: string;
  name: string;
  userName: string;
  comment: string;
}

const testimonials: TestimonialProps[] = [
  {
    image: "/owners/1.jpg",
    name: "Fluffy Whiskers",
    userName: "@fluffywhiskers",
    comment: "Purrfection! I never knew I needed this until now. 10/10 would recommend to all the cool cats.",
  },
  {
    image: "/owners/2.jpg",
    name: "Mr. Whiskers",
    userName: "@whisker_master",
    comment: "Meow as a Service has revolutionized my catnip delivery schedule. No more waiting around!",
  },
  {
    image: "/owners/3.webp",
    name: "Sir Pawsington",
    userName: "@sir_paws",
    comment: "From whiskers to tail, this service is pawsitively amazing. Never miss a cat photo update again!",
  },
  {
    image: "/owners/4.webp",
    name: "Mittens the Third",
    userName: "@mittens3rd",
    comment: "I signed up for the premium plan, and now I'm living the catnap dream. MaaS has my paw of approval.",
  },
  {
    image: "/owners/5.webp",
    name: "Cleo Purrtra",
    userName: "@queen_cleo",
    comment: "A meow-velous service! I’ve never felt so connected to my feline friends, and they love it too.",
  },
  {
    image: "/owners/6.webp",
    name: "Kitty Stardust",
    userName: "@space_cat",
    comment: "One small step for meowkind, one giant leap for cat services everywhere. Purrfect innovation!",
  },
];


export const Testimonials = () => {
  return (
    <section
      id="testimonials"
      className="container py-24 sm:py-32"
    >
      <h2 className="text-3xl md:text-4xl font-bold">
        Discover Why
        <span className="bg-gradient-to-b from-primary/60 to-primary text-transparent bg-clip-text">
          {" "}
          People Love{" "}
        </span>
        MaaS
      </h2>

      <p className="text-xl text-muted-foreground pt-4 pb-8">
        Cats are connoisseurs of comfort.
      </p>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 sm:block columns-2  lg:columns-3 lg:gap-6 mx-auto space-y-4 lg:space-y-6">
        {testimonials.map(
          ({ image, name, userName, comment }: TestimonialProps) => (
            <Card
              key={userName}
              className="max-w-md md:break-inside-avoid overflow-hidden"
            >
              <CardHeader className="flex flex-row items-center gap-4 pb-2">
                <Avatar>
                  <AvatarImage
                    alt=""
                    src={image}
                  />
                  <AvatarFallback>OM</AvatarFallback>
                </Avatar>

                <div className="flex flex-col">
                  <CardTitle className="text-lg">{name}</CardTitle>
                  <CardDescription>{userName}</CardDescription>
                </div>
              </CardHeader>

              <CardContent>{comment}</CardContent>
            </Card>
          )
        )}
      </div>
    </section>
  );
};
