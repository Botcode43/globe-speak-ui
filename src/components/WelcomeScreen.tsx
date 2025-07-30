import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Globe, MessageCircle, Users } from "lucide-react";
import heroImage from "@/assets/hero-globe.jpg";

const WelcomeScreen = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-surface">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="container mx-auto px-4 py-8">
          {/* Header */}
          <header className="flex justify-between items-center mb-8">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-sky rounded-xl flex items-center justify-center">
                <Globe className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-2xl font-bold text-foreground">GlobeSpeak</h1>
            </div>
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => navigate('/login')}
            >
              Sign In
            </Button>
          </header>

          {/* Hero Content */}
          <div className="text-center max-w-4xl mx-auto">
            <div className="mb-8 animate-fade-in">
              <img 
                src={heroImage} 
                alt="Global Communication" 
                className="w-full max-w-2xl mx-auto rounded-2xl shadow-floating"
              />
            </div>
            
            <h2 className="text-5xl md:text-6xl font-bold text-foreground mb-6 animate-fade-in">
              Break Barriers.{" "}
              <span className="bg-gradient-hero bg-clip-text text-transparent">
                Speak Freely.
              </span>
            </h2>
            
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto animate-fade-in">
              Connect with anyone, anywhere. Real-time translation powered by advanced AI, 
              making conversations flow naturally across language barriers.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12 animate-scale-in">
              <Button 
                variant="hero" 
                size="xl"
                onClick={() => navigate('/signup')}
              >
                Get Started Free
              </Button>
              <Button 
                variant="outline" 
                size="xl"
                onClick={() => navigate('/login')}
              >
                Sign In
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-3 gap-8">
          <div className="text-center p-6 bg-card rounded-2xl shadow-gentle hover:shadow-floating transition-all duration-300 hover:transform hover:scale-105">
            <div className="w-16 h-16 bg-gradient-sky rounded-2xl flex items-center justify-center mx-auto mb-4">
              <MessageCircle className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-semibold text-foreground mb-3">
              Real-time Translation
            </h3>
            <p className="text-muted-foreground">
              Instant voice translation with natural conversation flow. Speak and be understood immediately.
            </p>
          </div>

          <div className="text-center p-6 bg-card rounded-2xl shadow-gentle hover:shadow-floating transition-all duration-300 hover:transform hover:scale-105">
            <div className="w-16 h-16 bg-gradient-warm rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Users className="w-8 h-8 text-accent-foreground" />
            </div>
            <h3 className="text-xl font-semibold text-foreground mb-3">
              Connect Anyone
            </h3>
            <p className="text-muted-foreground">
              Bridge language gaps between friends, colleagues, or new connections from around the world.
            </p>
          </div>

          <div className="text-center p-6 bg-card rounded-2xl shadow-gentle hover:shadow-floating transition-all duration-300 hover:transform hover:scale-105">
            <div className="w-16 h-16 bg-gradient-sky rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Globe className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-semibold text-foreground mb-3">
              Global Reach
            </h3>
            <p className="text-muted-foreground">
              Support for 100+ languages with offline capabilities. Communicate anywhere, anytime.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WelcomeScreen;