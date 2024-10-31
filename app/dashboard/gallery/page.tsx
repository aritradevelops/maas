import prisma from "@/lib/db";
import Wrapper from "../components/wrapper";
import ResponsiveGallery from "./components/image-gallery";

export default async function Gallery() {
  const cats = await prisma.cat.findMany({ where: { image: { not: null } } })
  return (
    <Wrapper title="Meow Gallery" desc="Find all the cute meows.">
      <ResponsiveGallery cats={cats} />
    </Wrapper>
  )
}