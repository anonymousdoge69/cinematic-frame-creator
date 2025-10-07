import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import behindScenes from "@/assets/behind-scenes.jpg";

const About = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <div className="pt-32 pb-24">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h1 className="text-4xl md:text-6xl font-serif font-bold mb-6 text-foreground">
                Cinematic storytelling for the{" "}
                <span className="text-primary">real estate world</span>
              </h1>
            </div>

            <div className="mb-16 rounded-lg overflow-hidden shadow-elegant">
              <img
                src={behindScenes}
                alt="Behind the scenes at Framestate Studios"
                className="w-full h-auto"
              />
            </div>

            <div className="prose prose-lg max-w-none text-muted-foreground space-y-6 mb-16">
              <p className="text-lg leading-relaxed">
                <span className="text-foreground font-semibold">Framestate Studios</span> is a
                creative production house specializing in real estate cinematography. We're not just
                another video production company — we're storytellers who understand that selling a
                property is about selling a dream, a lifestyle, an emotion.
              </p>

              <p className="text-lg leading-relaxed">
                We combine cinematic visuals, clean edits, and compelling storytelling to help
                properties sell faster and attract genuine buyers. Every frame is carefully crafted,
                every transition purposefully designed, and every second optimized to showcase your
                property in its best light.
              </p>

              <p className="text-lg leading-relaxed">
                Our approach is simple yet powerful: <span className="text-primary font-semibold">
                  we don't just create videos — we create results
                </span>
                . Whether it's a luxury villa, a modern apartment, or a heritage property, we bring
                the same level of cinematic excellence that you'd expect from a feature film.
              </p>

              <blockquote className="border-l-4 border-primary pl-6 py-2 my-8">
                <p className="text-xl italic text-foreground">
                  "In real estate, first impressions happen online. We make sure yours is
                  unforgettable."
                </p>
              </blockquote>

              <h2 className="text-3xl font-serif font-bold text-foreground mt-12 mb-6">
                Our Process
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 not-prose">
                <div className="bg-card p-6 rounded-lg border border-border">
                  <div className="text-4xl font-bold text-primary mb-4">01</div>
                  <h3 className="text-xl font-semibold text-foreground mb-3">Plan & Scout</h3>
                  <p className="text-muted-foreground">
                    We visit your property, understand its unique features, and plan the perfect
                    shoot schedule for optimal lighting.
                  </p>
                </div>

                <div className="bg-card p-6 rounded-lg border border-border">
                  <div className="text-4xl font-bold text-primary mb-4">02</div>
                  <h3 className="text-xl font-semibold text-foreground mb-3">Shoot & Capture</h3>
                  <p className="text-muted-foreground">
                    Using professional cinema cameras and equipment, we capture every angle with
                    cinematic precision and artistic vision.
                  </p>
                </div>

                <div className="bg-card p-6 rounded-lg border border-border">
                  <div className="text-4xl font-bold text-primary mb-4">03</div>
                  <h3 className="text-xl font-semibold text-foreground mb-3">Edit & Deliver</h3>
                  <p className="text-muted-foreground">
                    Post-production magic: color grading, music, motion graphics, and storytelling
                    that makes buyers want to see more.
                  </p>
                </div>
              </div>

              <h2 className="text-3xl font-serif font-bold text-foreground mt-12 mb-6">
                Why Choose Us?
              </h2>

              <ul className="space-y-4 not-prose">
                <li className="flex items-start">
                  <span className="text-primary mr-3 mt-1">✓</span>
                  <span className="text-muted-foreground">
                    <strong className="text-foreground">Cinematic Quality:</strong> Film-grade
                    equipment and techniques used in every project
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary mr-3 mt-1">✓</span>
                  <span className="text-muted-foreground">
                    <strong className="text-foreground">Quick Turnaround:</strong> Professional
                    delivery without compromising on quality
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary mr-3 mt-1">✓</span>
                  <span className="text-muted-foreground">
                    <strong className="text-foreground">ROI-Focused:</strong> Videos designed to
                    generate genuine buyer interest and faster sales
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary mr-3 mt-1">✓</span>
                  <span className="text-muted-foreground">
                    <strong className="text-foreground">Full Service:</strong> From concept to
                    final delivery, we handle everything
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default About;
