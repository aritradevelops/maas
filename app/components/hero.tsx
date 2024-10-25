import { Button } from "@/components/ui/button";
import { buttonVariants } from "@/components/ui/button";
import { HeroCards } from "./hero-cards";
import { GitHubLogoIcon } from "@radix-ui/react-icons";
import Image from "next/image";
import Link from "next/link";

export const Hero = () => {
  return (
    <section className="container grid lg:grid-cols-2 place-items-center py-10 md:py-32 gap-10">
      <div className="text-center lg:text-start space-y-6">
        <main className="text-5xl md:text-6xl font-bold">
          <h1 className="inline">
            <span className="inline bg-gradient-to-r from-[#F596D3]  to-[#D247BF] text-transparent bg-clip-text">
              Meow
            </span>{" "}
          </h1>{" "}
          as a {" "}
          <h2 className="inline">
            <span className="inline bg-gradient-to-r from-[#61DAFB] via-[#1fc0f1] to-[#03a3d7] text-transparent bg-clip-text">
              Service
            </span>{" "}
          </h2>
        </main>

        <p className="text-xl text-muted-foreground md:w-10/12 mx-auto lg:mx-0">
          The purr-fect platform for all things meows! Whether you're adding new feline friends, tweaking their profiles, or simply browsing through a list of delightful meows, this service has you covered. With MasS, managing meows has never been this easy ! Unleash the paws-ibilities and get started today!
        </p>

        <div className="space-y-4 md:space-y-0 md:space-x-4">
          <Button className="w-full md:w-1/3" asChild>
            <Link href="/identify">Get Started</Link>
          </Button>

          <a
            rel="noreferrer noopener"
            href="https://github.com/aritradevelops/mass.git"
            target="_blank"
            className={`w-full md:w-1/3 ${buttonVariants({
              variant: "outline",
            })}`}
          >
            Github Repository
            <GitHubLogoIcon className="ml-2 w-5 h-5" />
          </a>
        </div>
      </div>

      {/* Hero cards sections */}
      <div className="w-full relative pt-[50%] z-10">
        <Image
          src="/hero-meow.jpg"
          objectFit="cover"
          fill
          className="absolute w-full h-full top-0 left-0 object-cover rounded-2xl"
          alt="meow"
        />
      </div>

      {/* Shadow effect */}
      <div className="shadow"></div>
    </section>
  );
};
