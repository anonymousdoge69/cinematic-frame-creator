import { Link } from "react-router-dom";
import { Instagram, Youtube, Mail, Phone, Linkedin } from "lucide-react";
import logo from "@/assets/framestate-logo.png";

const Footer = () => {
  return (
    <footer className="bg-card border-t border-border">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Logo & Tagline */}
          <div>
            <img src={logo} alt="Framestate Studios" className="h-12 w-auto mb-4" />
            <p className="text-muted-foreground text-sm">
              Cinematic storytelling for the real estate world.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-foreground font-semibold mb-4">Quick Links</h3>
            <div className="space-y-2">
              <Link to="/showcase" className="block text-muted-foreground hover:text-primary transition-colors text-sm">
                Our Work
              </Link>
              <Link to="/packages" className="block text-muted-foreground hover:text-primary transition-colors text-sm">
                Packages
              </Link>
              <Link to="/about" className="block text-muted-foreground hover:text-primary transition-colors text-sm">
                About Us
              </Link>
              <Link to="/contact" className="block text-muted-foreground hover:text-primary transition-colors text-sm">
                Contact
              </Link>
            </div>
          </div>

          {/* Contact & Social */}
          <div>
            <h3 className="text-foreground font-semibold mb-4">Get in Touch</h3>
            <div className="space-y-3">
              <a
                href="tel:+919558737783"
                className="flex items-center text-muted-foreground hover:text-primary transition-colors text-sm"
              >
                <Phone size={16} className="mr-2" />
                +91 95587 37783
              </a>
              <a
                href="mailto:hello@framestatestudios.com"
                className="flex items-center text-muted-foreground hover:text-primary transition-colors text-sm"
              >
                <Mail size={16} className="mr-2" />
                hello@framestatestudios.com
              </a>
              <div className="flex space-x-4 pt-2">
                <a
                  href="https://www.instagram.com/framestate_studio/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-primary transition-colors"
                  aria-label="Instagram"
                >
                  <Instagram size={20} />
                </a>
                <a
                  href="https://www.linkedin.com/company/framestate-studio/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-primary transition-colors"
                  aria-label="LinkedIn"
                >
                  <Linkedin size={20} />
                </a>
                <a
                  href="https://www.youtube.com/@FramestateStudio"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-primary transition-colors"
                  aria-label="YouTube"
                >
                  <Youtube size={20} />
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-border pt-8 text-center">
          <p className="text-muted-foreground text-sm">
            © {new Date().getFullYear()} Framestate Studios — All Rights Reserved
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
