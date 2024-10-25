'use client'

import { About } from "./components/about";
import { FAQ } from "./components/faq";
import { Features } from "./components/features";
import { Footer } from "./components/footer";
import { Hero } from "./components/hero";
import { Navbar } from "./components/nav-bar";
import { ScrollToTop } from "./components/scroll-to-top";
import { Testimonials } from "./components/testimonials";

export default function Home() {
  return (
    <div>
      <Navbar />
      <Hero />
      <About />
      <Features />
      <Testimonials />
      <FAQ />
      <Footer />
      <ScrollToTop />
    </div>
  );
}
