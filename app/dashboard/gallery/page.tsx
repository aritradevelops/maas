import Wrapper from "../components/wrapper";
import ResponsiveGallery from "./components/image-gallery";

export default function Gallery() {
  return (
    <Wrapper title="Meow Gallery" desc="Find all the cute meows.">
      <ResponsiveGallery />
    </Wrapper>
  )
}