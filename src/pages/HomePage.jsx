import Hero from "../components/home/Hero";
import StatsBar from "../components/home/StatsBar";
import LogoBanner from "../components/home/LogoBanner";
import NewsletterSignup from "../components/home/NewsletterSignup";

export default function HomePage() {
  return (
    <>
      <Hero />
      <StatsBar />
      <LogoBanner />
      <NewsletterSignup />
    </>
  );
}
