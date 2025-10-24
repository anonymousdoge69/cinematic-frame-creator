import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Video, Users, TrendingUp, Award, Check, Phone, Mail, MessageCircle, Send } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { VideoPlayer } from "@/components/VideoPlayer";
import { supabase } from "@/integrations/supabase/client";
import heroImage from "@/assets/hero-villa.jpg";
import behindScenes from "@/assets/behind-scenes.jpg";
import video1 from "@/assets/video1.mp4";
import video2 from "@/assets/video2.mp4";
import video3 from "@/assets/video3.mp4";
import video4 from "@/assets/video4.mp4";
import video5 from "@/assets/video5.mp4";

const SinglePage = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    timeSlot: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.timeSlot) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    try {
      const { error } = await supabase.functions.invoke('send-meeting-confirmation', {
        body: formData,
      });

      if (error) throw error;

      toast({
        title: "Meeting Scheduled! 🎉",
        description: "A meeting link has been sent to your email!",
      });

      setFormData({ name: "", email: "", timeSlot: "" });
    } catch (error) {
      console.error("Error scheduling meeting:", error);
      toast({
        title: "Error",
        description: "Failed to schedule meeting. Please try again.",
        variant: "destructive",
      });
    }
  };

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

  const videos: Array<{
    id: number;
    title: string;
    client: string;
    video: string;
    aspectRatio: "16:9" | "9:16";
    impact: string;
  }> = [
    {
      id: 1,
      title: "Modern Luxury Villa",
      client: "Premium Real Estate",
      video: video1,
      aspectRatio: "16:9",
      impact: "Sold within 2 weeks",
    },
    {
      id: 2,
      title: "Contemporary Penthouse",
      client: "Elite Properties",
      video: video2,
      aspectRatio: "9:16",
      impact: "3x viewing requests",
    },
    {
      id: 3,
      title: "Lakeside Villa Tour",
      client: "Luxury Estates",
      video: video3,
      aspectRatio: "16:9",
      impact: "Featured in top listings",
    },
    {
      id: 4,
      title: "Downtown Loft",
      client: "Metropolitan Homes",
      video: video5,
      aspectRatio: "16:9",
      impact: "Record-breaking engagement",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* HOME SECTION */}
      <section id="home" className="relative h-screen flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center brightness-110"
          style={{ 
            backgroundImage: `url(${heroImage})`,
            boxShadow: 'inset 0 0 100px rgba(241, 196, 15, 0.15)'
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-background/30 to-background" />
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
            <a href="#showcase">
              <Button variant="hero" size="lg" className="w-full sm:w-auto">
                <Video className="mr-2" size={20} />
                View Our Work
              </Button>
            </a>
            <a href="#contact">
              <Button variant="heroOutline" size="lg" className="w-full sm:w-auto">
                Book a Shoot
              </Button>
            </a>
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
            <div className="text-center p-8 bg-card rounded-lg border border-border hover:border-primary transition-all duration-500">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-4">
                <TrendingUp className="text-primary" size={32} />
              </div>
              <h3 className="text-4xl font-bold text-primary mb-2">250K+</h3>
              <p className="text-muted-foreground">Organic Engagements</p>
            </div>

            <div className="text-center p-8 bg-card rounded-lg border border-border hover:border-primary transition-all duration-500">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-4">
                <Users className="text-primary" size={32} />
              </div>
              <h3 className="text-4xl font-bold text-primary mb-2">100+</h3>
              <p className="text-muted-foreground">Premium Collaborations</p>
            </div>

            <div className="text-center p-8 bg-card rounded-lg border border-border hover:border-primary transition-all duration-500">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-4">
                <Video className="text-primary" size={32} />
              </div>
              <h3 className="text-4xl font-bold text-primary mb-2">500+</h3>
              <p className="text-muted-foreground">Cinematic Videos</p>
            </div>

            <div className="text-center p-8 bg-card rounded-lg border border-border hover:border-primary transition-all duration-500">
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
          <a href="#contact">
            <Button variant="hero" size="lg">
              Book a Call
            </Button>
          </a>
        </div>
      </section>

      {/* SHOWCASE SECTION */}
      <section id="showcase" className="py-32 bg-background scroll-mt-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-6xl font-serif font-bold mb-4 text-foreground">
              Our Work
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Where Stories Sell Homes
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
            {videos.map((video) => (
              <div
                key={video.id}
                className={`rounded-xl border border-border bg-card overflow-hidden shadow-lg hover:shadow-elegant transition-all duration-300 ${
                  video.aspectRatio === "9:16" ? "lg:row-span-2" : ""
                }`}
              >
                <VideoPlayer
                  src={video.video}
                  title={video.title}
                  client={video.client}
                  impact={video.impact}
                  aspectRatio={video.aspectRatio}
                />
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
                href="https://www.instagram.com/framestate_studio/"
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-3 bg-gradient-gold text-primary-foreground rounded-md font-semibold hover:shadow-glow transition-all duration-300"
              >
                View on Instagram
              </a>
              <a
                href="https://www.youtube.com/@FramestateStudio"
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-3 border-2 border-primary text-foreground rounded-md font-semibold hover:bg-primary hover:text-primary-foreground transition-all duration-300"
              >
                Watch on YouTube
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* PACKAGES SECTION */}
      <section id="packages" className="py-32 bg-card scroll-mt-20">
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
                    ? "border-primary bg-background shadow-elegant"
                    : "border-border bg-background hover:border-primary"
                } transition-all duration-500`}
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
                </div>

                <ul className="space-y-4 mb-8">
                  {pkg.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start">
                      <Check className="text-primary mr-3 mt-1 flex-shrink-0" size={20} />
                      <span className="text-muted-foreground text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>

                <a href="#contact" className="block">
                  <Button
                    variant={pkg.popular ? "hero" : "heroOutline"}
                    className="w-full"
                    size="lg"
                  >
                    Choose This Package
                  </Button>
                </a>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="text-center bg-background rounded-lg border border-border p-12">
            <h2 className="text-3xl font-serif font-bold mb-4 text-foreground">
              Not sure which fits your property?
            </h2>
            <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
              Let's plan your shoot together. We'll help you choose the perfect package and
              customize it to match your vision.
            </p>
            <a href="#contact">
              <Button variant="hero" size="lg">
                Book a Consultation Call
              </Button>
            </a>
          </div>
        </div>
      </section>

      {/* ABOUT SECTION */}
      <section id="about" className="py-32 bg-background scroll-mt-20">
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
                <div className="bg-card p-6 rounded-lg border border-border hover:border-primary transition-all duration-500">
                  <div className="text-4xl font-bold text-primary mb-4">01</div>
                  <h3 className="text-xl font-semibold text-foreground mb-3">Plan & Scout</h3>
                  <p className="text-muted-foreground">
                    We visit your property, understand its unique features, and plan the perfect
                    shoot schedule for optimal lighting.
                  </p>
                </div>

                <div className="bg-card p-6 rounded-lg border border-border hover:border-primary transition-all duration-500">
                  <div className="text-4xl font-bold text-primary mb-4">02</div>
                  <h3 className="text-xl font-semibold text-foreground mb-3">Shoot & Capture</h3>
                  <p className="text-muted-foreground">
                    Using professional cinema cameras and equipment, we capture every angle with
                    cinematic precision and artistic vision.
                  </p>
                </div>

                <div className="bg-card p-6 rounded-lg border border-border hover:border-primary transition-all duration-500">
                  <div className="text-4xl font-bold text-primary mb-4">03</div>
                  <h3 className="text-xl font-bold text-foreground mb-3">Edit & Deliver</h3>
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
      </section>

      {/* CONTACT SECTION */}
      <section id="contact" className="py-32 bg-card scroll-mt-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-6xl font-serif font-bold mb-4 text-foreground">
              Let's Create Something{" "}
              <span className="text-primary">Cinematic</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Ready to showcase your property like never before? Get in touch with us today.
            </p>
          </div>

          <div className="max-w-5xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              {/* Contact Information */}
              <div>
                <h2 className="text-3xl font-serif font-bold mb-6 text-foreground">
                  Get in Touch
                </h2>
                <p className="text-muted-foreground mb-8">
                  We're here to help bring your vision to life. Reach out to discuss your project,
                  get a quote, or schedule a consultation.
                </p>

                <div className="space-y-6">
                  <a
                    href="tel:+919558737783"
                    className="flex items-center p-4 bg-background rounded-lg border border-border hover:border-primary transition-all duration-300 group"
                  >
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mr-4 group-hover:bg-primary/20 transition-all duration-300">
                      <Phone className="text-primary" size={24} />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Call Us</p>
                      <p className="text-foreground font-semibold">+91 95587 37783</p>
                    </div>
                  </a>

                  <a
                    href="mailto:hello@framestatestudios.com"
                    className="flex items-center p-4 bg-background rounded-lg border border-border hover:border-primary transition-all duration-300 group"
                  >
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mr-4 group-hover:bg-primary/20 transition-all duration-300">
                      <Mail className="text-primary" size={24} />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Email Us</p>
                      <p className="text-foreground font-semibold">hello@framestatestudios.com</p>
                    </div>
                  </a>

                  <a
                    href="https://wa.me/919558737783"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center p-4 bg-background rounded-lg border border-border hover:border-primary transition-all duration-300 group"
                  >
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mr-4 group-hover:bg-primary/20 transition-all duration-300">
                      <MessageCircle className="text-primary" size={24} />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">WhatsApp</p>
                      <p className="text-foreground font-semibold">Chat with us instantly</p>
                    </div>
                  </a>
                </div>

                <div className="mt-8 p-6 bg-gradient-gold rounded-lg">
                  <h3 className="text-xl font-semibold text-primary-foreground mb-2">
                    Quick Response Time
                  </h3>
                  <p className="text-primary-foreground/90 text-sm">
                    We typically respond within 2 hours during business hours (9 AM - 7 PM IST).
                  </p>
                </div>
              </div>

              {/* Meeting Scheduler */}
              <div>
                <h2 className="text-3xl font-serif font-bold mb-6 text-foreground">
                  Schedule a 15-Minute Meeting
                </h2>
                <p className="text-muted-foreground mb-8">
                  Book a quick consultation call to discuss your project. We'll send you the meeting link via email.
                </p>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2">
                      Name *
                    </label>
                    <Input
                      id="name"
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Your full name"
                      required
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                      Email *
                    </label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="your@email.com"
                      required
                    />
                  </div>

                  <div>
                    <label htmlFor="timeSlot" className="block text-sm font-medium text-foreground mb-2">
                      Preferred Time Slot *
                    </label>
                    <select
                      id="timeSlot"
                      value={formData.timeSlot}
                      onChange={(e) => setFormData({ ...formData, timeSlot: e.target.value })}
                      className="w-full px-3 py-2 bg-background border border-border rounded-md text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                      required
                    >
                      <option value="">Select a time slot</option>
                      <option value="Morning (9:00 AM - 12:00 PM)">Morning (9:00 AM - 12:00 PM)</option>
                      <option value="Afternoon (12:00 PM - 5:00 PM)">Afternoon (12:00 PM - 5:00 PM)</option>
                      <option value="Evening (5:00 PM - 8:00 PM)">Evening (5:00 PM - 8:00 PM)</option>
                    </select>
                  </div>

                  <div className="p-4 bg-primary/10 border border-primary/20 rounded-lg">
                    <p className="text-sm text-foreground">
                      <strong>What happens next?</strong>
                    </p>
                    <p className="text-sm text-muted-foreground mt-2">
                      After submitting, we'll send you a meeting link via WhatsApp and email instantly!
                    </p>
                  </div>

                  <Button type="submit" variant="hero" size="lg" className="w-full">
                    <Send className="mr-2" size={20} />
                    Schedule Meeting
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default SinglePage;