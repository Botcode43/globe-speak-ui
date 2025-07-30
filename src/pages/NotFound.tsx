import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Globe, Home } from "lucide-react";

const NotFound = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-gradient-surface flex items-center justify-center p-4">
      <div className="text-center max-w-md">
        <div className="flex items-center justify-center gap-3 mb-6">
          <div className="w-16 h-16 bg-gradient-sky rounded-2xl flex items-center justify-center">
            <Globe className="w-8 h-8 text-white" />
          </div>
        </div>
        
        <h1 className="text-6xl font-bold text-foreground mb-4">404</h1>
        <h2 className="text-2xl font-semibold text-foreground mb-3">Page Not Found</h2>
        <p className="text-muted-foreground mb-8">
          Oops! The page you're looking for seems to have gotten lost in translation.
        </p>
        
        <Button 
          variant="hero" 
          size="lg"
          onClick={() => navigate('/')}
          className="gap-2"
        >
          <Home className="w-5 h-5" />
          Return to Home
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
