'use client'

import { About } from "./components/about";
import { Cta } from "./components/cta";
import { FAQ } from "./components/faq";
import { Features } from "./components/features";
import { Footer } from "./components/footer";
import { Hero } from "./components/hero";
import { HowItWorks } from "./components/how-it-works";
import { Navbar } from "./components/nav-bar";
import { Newsletter } from "./components/news-letter";
import { Pricing } from "./components/pricing";
import { ScrollToTop } from "./components/scroll-to-top";
import { Services } from "./components/services";
import { Sponsors } from "./components/sponsors";
import { Team } from "./components/team";
import { Testimonials } from "./components/testimonials";

export default function Home() {
  return (
    <div>
      <Navbar />
      <Hero />
      <About />
      <HowItWorks />
      <Features />
      <Services />
      <Cta />
      <Testimonials />
      <Team />
      <Pricing />
      <Newsletter />
      <FAQ />
      <Footer />
      <ScrollToTop />
    </div>
  );
}
