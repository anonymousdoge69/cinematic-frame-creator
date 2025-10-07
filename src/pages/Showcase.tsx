import { Play } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

const Showcase = () => {
  const projects = [
    {
      id: 1,
      title: "Luxury Villa - Whitefield",
      client: "Prestige Estates",
      thumbnail: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80",
      impact: "Sold within 2 weeks",
    },
    {
      id: 2,
      title: "Modern Penthouse - Indiranagar",
      client: "Brigade Group",
      thumbnail: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80",
      impact: "3x viewing requests",
    },
    {
      id: 3,
      title: "Lakeside Villa - Sarjapur",
      client: "Sobha Limited",
      thumbnail: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&q=80",
      impact: "Featured in top listings",
    },
    {
      id: 4,
      title: "Contemporary Home - HSR Layout",
      client: "Embassy Group",
      thumbnail: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80",
      impact: "100K+ social reach",
    },
    {
      id: 5,
      title: "Urban Apartment - Koramangala",
      client: "Godrej Properties",
      thumbnail: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&q=80",
      impact: "Sold above asking price",
    },
    {
      id: 6,
      title: "Heritage Villa - Jayanagar",
      client: "Independent Owner",
      thumbnail: "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=800&q=80",
      impact: "Multiple offers received",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <div className="pt-32 pb-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-6xl font-serif font-bold mb-4 text-foreground">
              Our Work
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Where Stories Sell Homes
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {projects.map((project) => (
              <div
                key={project.id}
                className="group relative overflow-hidden rounded-lg bg-card border border-border hover:border-primary transition-all duration-300 cursor-pointer"
              >
                <div className="aspect-video relative overflow-hidden">
                  <img
                    src={project.thumbnail}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-background/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center">
                      <Play className="text-primary-foreground" size={28} fill="currentColor" />
                    </div>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2 text-foreground">{project.title}</h3>
                  <p className="text-sm text-muted-foreground mb-1">{project.client}</p>
                  <p className="text-sm text-primary font-medium">{project.impact}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Instagram Reels Section */}
          <div className="text-center py-16 bg-card rounded-lg border border-border">
            <h2 className="text-3xl font-serif font-bold mb-4 text-foreground">
              Behind the Scenes
            </h2>
            <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
              Follow us on social media to see how we create cinematic magic
            </p>
            <div className="flex justify-center gap-4">
              <a
                href="https://instagram.com/framestatestudios"
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-3 bg-gradient-gold text-primary-foreground rounded-md font-semibold hover:shadow-glow transition-all"
              >
                View on Instagram
              </a>
              <a
                href="https://youtube.com/@framestatestudios"
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-3 border-2 border-primary text-foreground rounded-md font-semibold hover:bg-primary hover:text-primary-foreground transition-all"
              >
                Watch on YouTube
              </a>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Showcase;
