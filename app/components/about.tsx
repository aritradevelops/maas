import Image from "next/image";
import { Statistics } from "./statistics";

export const About = () => {
  return (
    <section
      id="about"
      className="container py-24 sm:py-32"
    >
      <div className="bg-muted/50 border rounded-lg py-12">
        <div className="px-6 flex flex-col-reverse md:flex-row gap-8 md:gap-12">
          <div className="w-full md:w-1/4 relative z-10">
            <Image
              src="/about-meow.webp"
              objectFit="contain"
              fill
              className="absolute w-full h-full top-0 left-0 object-contain rounded-2xl"
              alt="meow"
            />
          </div>
          <div className="bg-green-0 flex flex-col justify-between md:w-3/4">
            <div className="pb-6">
              <h2 className="text-3xl md:text-4xl font-bold">
                <span className="bg-gradient-to-b from-primary/60 to-primary text-transparent bg-clip-text">
                  About{" "}
                </span>
                Service
              </h2>
              <p className="text-xl text-muted-foreground mt-4">
                Meow as a Service is built for all the cat enthusiasts out there who want to
                seamlessly add, modify, and explore their favorite feline friends. Whether
                you're a proud owner or an admirer of these majestic creatures, this platform
                brings the world of cats to your fingertips. Created by cat lovers, for cat
                lovers, we're here to make every meow count!
              </p>
            </div>

            <Statistics />
          </div>
        </div>
      </div>
    </section>

  );
};
