import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Video, Users, TrendingUp, Award } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import heroImage from "@/assets/hero-villa.jpg";

const Home = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${heroImage})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/60 to-background" />
        </div>

        <div className="relative z-10 container mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-7xl font-serif font-bold mb-6 text-foreground animate-fade-in">
            We make properties look like{" "}
            <span className="text-primary">films</span>
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto">
            Because you sell what you show.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/showcase">
              <Button variant="hero" size="lg" className="w-full sm:w-auto">
                <Video className="mr-2" size={20} />
                View Our Work
              </Button>
            </Link>
            <Link to="/contact">
              <Button variant="heroOutline" size="lg" className="w-full sm:w-auto">
                Book a Shoot
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* About Preview */}
      <section className="py-24 bg-card">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-5xl font-serif font-bold mb-6 text-foreground">
              Cinematic Visuals That Sell
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Framestate Studios creates cinematic visuals that help real estate brands sell faster
              and stand out online. We combine professional video production, storytelling, and
              clean editing to showcase properties in a way that attracts genuine buyers.
            </p>
          </div>
        </div>
      </section>

      {/* Stats Highlight */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center p-8 bg-card rounded-lg border border-border hover:border-primary transition-colors">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-4">
                <TrendingUp className="text-primary" size={32} />
              </div>
              <h3 className="text-4xl font-bold text-primary mb-2">250K+</h3>
              <p className="text-muted-foreground">Organic Engagements</p>
            </div>

            <div className="text-center p-8 bg-card rounded-lg border border-border hover:border-primary transition-colors">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-4">
                <Users className="text-primary" size={32} />
              </div>
              <h3 className="text-4xl font-bold text-primary mb-2">100+</h3>
              <p className="text-muted-foreground">Premium Collaborations</p>
            </div>

            <div className="text-center p-8 bg-card rounded-lg border border-border hover:border-primary transition-colors">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-4">
                <Video className="text-primary" size={32} />
              </div>
              <h3 className="text-4xl font-bold text-primary mb-2">500+</h3>
              <p className="text-muted-foreground">Cinematic Videos</p>
            </div>

            <div className="text-center p-8 bg-card rounded-lg border border-border hover:border-primary transition-colors">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-4">
                <Award className="text-primary" size={32} />
              </div>
              <h3 className="text-4xl font-bold text-primary mb-2">100%</h3>
              <p className="text-muted-foreground">Cinematic Quality</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Strip */}
      <section className="py-24 bg-gradient-gold">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-serif font-bold mb-6 text-primary-foreground">
            Let's bring your property to life
          </h2>
          <Link to="/contact">
            <Button variant="hero" size="lg">
              Book a Call
            </Button>
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Home;
