import { Check } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

const Packages = () => {
  const packages = [
    {
      name: "Essential Showcase",
      icon: "🎥",
      description: "Perfect for apartments and compact luxury listings",
      price: "Starting at ₹25,000",
      features: [
        "2-3 minute cinematic walkthrough",
        "Instagram Reel edit (9:16)",
        "Professional color grading",
        "Licensed music",
        "One round of revisions included",
        "Delivery within 5 business days",
      ],
    },
    {
      name: "Enhanced Highlight",
      icon: "🎬",
      description: "Designed to highlight features and boost engagement",
      price: "Starting at ₹45,000",
      popular: true,
      features: [
        "Everything in Essential Showcase",
        "3D text overlays (sq. ft., amenities, landmarks)",
        "Animated intro/outro with logo",
        "1 main cinematic video + 2 social reels",
        "Enhanced motion graphics",
        "Drone footage (if applicable)",
        "Two rounds of revisions",
        "Delivery within 7 business days",
      ],
    },
    {
      name: "Storytelling Experience",
      icon: "🎞️",
      description: "A narrative-driven experience that builds emotional connection",
      price: "Starting at ₹75,000",
      features: [
        "Everything in Enhanced Highlight",
        "Scripted storytelling with voiceover narration",
        "Lifestyle cut-ins (cafés, nearby areas)",
        "3-4 min cinematic property story + 3 Reels",
        "Professional voice talent",
        "Advanced motion design",
        "Multiple location shoots",
        "Unlimited revisions",
        "Priority delivery within 10 business days",
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <div className="pt-32 pb-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-6xl font-serif font-bold mb-4 text-foreground">
              Choose Your Cinematic Experience
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Select the package that fits your property and vision. Every project is tailored to
              showcase your space at its absolute best.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {packages.map((pkg, index) => (
              <div
                key={index}
                className={`relative rounded-lg border-2 p-8 ${
                  pkg.popular
                    ? "border-primary bg-card shadow-elegant"
                    : "border-border bg-card hover:border-primary"
                } transition-all duration-300`}
              >
                {pkg.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                    <span className="bg-gradient-gold text-primary-foreground px-4 py-1 rounded-full text-sm font-semibold">
                      Most Popular
                    </span>
                  </div>
                )}

                <div className="text-center mb-6">
                  <div className="text-5xl mb-4">{pkg.icon}</div>
                  <h3 className="text-2xl font-serif font-bold mb-2 text-foreground">
                    {pkg.name}
                  </h3>
                  <p className="text-muted-foreground text-sm mb-4">{pkg.description}</p>
                  <p className="text-3xl font-bold text-primary">{pkg.price}</p>
                </div>

                <ul className="space-y-4 mb-8">
                  {pkg.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start">
                      <Check className="text-primary mr-3 mt-1 flex-shrink-0" size={20} />
                      <span className="text-muted-foreground text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Link to="/contact" className="block">
                  <Button
                    variant={pkg.popular ? "hero" : "heroOutline"}
                    className="w-full"
                    size="lg"
                  >
                    Choose This Package
                  </Button>
                </Link>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="text-center bg-card rounded-lg border border-border p-12">
            <h2 className="text-3xl font-serif font-bold mb-4 text-foreground">
              Not sure which fits your property?
            </h2>
            <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
              Let's plan your shoot together. We'll help you choose the perfect package and
              customize it to match your vision.
            </p>
            <Link to="/contact">
              <Button variant="hero" size="lg">
                Book a Consultation Call
              </Button>
            </Link>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Packages;
