import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface FAQProps {
  question: string;
  answer: string;
  value: string;
}

const FAQList: FAQProps[] = [
  {
    question: "What is Meow as a Service (MasS)?",
    answer:
      "MasS is your one-stop service for all things cat! From adorable meows to feline facts, we have it all.",
    value: "item-2",
  },
  {
    question: "Can I upload pictures of my cat?",
    answer:
      "Absolutely! We love seeing new furry friends on the platform. The more the meow-rier!",
    value: "item-3",
  },
  {
    question: "How many meows can I request per day?",
    answer:
      "As many as your heart desires! We have an infinite supply of meows ready to brighten your day.",
    value: "item-4",
  },
  {
    question: "Will this make my cat jealous?",
    answer:
      "Possibly. Cats are known for their diva behavior, so be sure to give your feline friend plenty of attention after using MasS!",
    value: "item-5",
  },
  {
    question: "Does MasS work with dogs?",
    answer:
      "MasS is strictly for cat lovers. We suggest our bark-loving friends look elsewhere for their canine needs!",
    value: "item-6",
  },
  {
    question: "What if I don’t have a cat?",
    answer:
      "No worries! You can still enjoy the cuteness and chaos of cats through MasS, even if you're not a cat parent.",
    value: "item-7",
  },
  {
    question: "Can MasS translate my cat's meows?",
    answer:
      "While we're working on that feature, for now, just know that every meow means 'feed me' or 'pet me.'",
    value: "item-8",
  },
];


export const FAQ = () => {
  return (
    <section
      id="faq"
      className="container py-24 sm:py-32"
    >
      <h2 className="text-3xl md:text-4xl font-bold mb-4">
        Frequently Asked{" "}
        <span className="bg-gradient-to-b from-primary/60 to-primary text-transparent bg-clip-text">
          Questions
        </span>
      </h2>

      <Accordion
        type="single"
        collapsible
        className="w-full AccordionRoot"
      >
        {FAQList.map(({ question, answer, value }: FAQProps) => (
          <AccordionItem
            key={value}
            value={value}
          >
            <AccordionTrigger className="text-left">
              {question}
            </AccordionTrigger>

            <AccordionContent>{answer}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>

      <h3 className="font-medium mt-4">
        Still have questions?{" "}
        <a
          rel="noreferrer noopener"
          href="mailto:admin@swiftgeek.dev"
          className="text-primary transition-all border-primary hover:border-b-2"
        >
          Contact us
        </a>
      </h3>
    </section>
  );
};
