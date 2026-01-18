import SmoothScroll from "../components/SmoothScroll";
import Hero from "../components/Hero";
import Footer from "../components/Footer";
import Productcetagory from "@/components/Productcetagory";
import AboutPage from "./about/page";
import Testimonials from "@/components/Testimonials";
import WorkShowcase from "@/components/WorkShowcase";
import WorkLocations from "@/components/WorkLocations";

export default function Home() {
  return (
    <SmoothScroll>
      <div className="font-sans dark:bg-black">
        <main className=" flex flex-col">
          <Hero />
          {/* <ProductGrid /> */}
          <Productcetagory/>
          <AboutPage/>
          <Testimonials/>
          <WorkShowcase/>
          <WorkLocations/>

          <Footer />
        </main>
      </div>
    </SmoothScroll>
  );
}
