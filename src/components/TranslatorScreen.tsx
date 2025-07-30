import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { 
  Globe, 
  LogOut, 
  Mic, 
  MicOff, 
  Play, 
  Square, 
  Wifi, 
  WifiOff,
  Languages,
  Download,
  CheckCircle
} from "lucide-react";
import { translationService } from "@/services/translationService";
import { useNetworkStatus } from "@/hooks/useNetworkStatus";
import { useToast } from "@/hooks/use-toast";

const TranslatorScreen = () => {
  const navigate = useNavigate();
  const networkOnline = useNetworkStatus();
  const { toast } = useToast();
  const [isRecording, setIsRecording] = useState(false);
  const [isOnline, setIsOnline] = useState(true);
  const [originalText, setOriginalText] = useState("");
  const [translatedText, setTranslatedText] = useState("");
  const [userName] = useState("Sarah Johnson"); // Mock user
  const [isTranslating, setIsTranslating] = useState(false);
  const [isInitializingOffline, setIsInitializingOffline] = useState(false);
  const [offlineReady, setOfflineReady] = useState(false);

  // Initialize offline translator on component mount
  useEffect(() => {
    const initOffline = async () => {
      setIsInitializingOffline(true);
      try {
        await translationService.initializeOfflineTranslator();
        setOfflineReady(true);
        toast({
          title: "Offline mode ready",
          description: "Translation will work even without internet connection",
        });
      } catch (error) {
        console.error("Failed to initialize offline translator:", error);
        toast({
          title: "Offline mode unavailable",
          description: "Could not load offline translation model",
          variant: "destructive",
        });
      } finally {
        setIsInitializingOffline(false);
      }
    };

    initOffline();
  }, [toast]);

  // Auto-update online status based on network
  useEffect(() => {
    if (!networkOnline && isOnline) {
      setIsOnline(false);
      toast({
        title: "Network disconnected",
        description: "Switched to offline mode automatically",
      });
    }
  }, [networkOnline, isOnline, toast]);

  // Mock translation effect with real translation service
  useEffect(() => {
    if (isRecording) {
      const timer = setTimeout(async () => {
        const mockText = "Hello, how are you today?";
        setOriginalText(mockText);
        setIsTranslating(true);
        
        try {
          const result = await translationService.translate(mockText, isOnline && networkOnline);
          setTranslatedText(result.text);
          
          // Auto-play translated text
          if (result.text && 'speechSynthesis' in window) {
            const utterance = new SpeechSynthesisUtterance(result.text);
            utterance.lang = 'es-ES'; // Spanish
            speechSynthesis.speak(utterance);
          }
        } catch (error) {
          console.error("Translation failed:", error);
          setTranslatedText("Translation unavailable");
        } finally {
          setIsTranslating(false);
        }
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [isRecording, isOnline, networkOnline, toast]);

  const handleStartStop = () => {
    if (isRecording) {
      setIsRecording(false);
    } else {
      setIsRecording(true);
      setOriginalText("");
      setTranslatedText("");
    }
  };

  const handleToggleOnlineMode = () => {
    if (!networkOnline) {
      toast({
        title: "No network connection",
        description: "Cannot switch to online mode without internet",
        variant: "destructive",
      });
      return;
    }
    setIsOnline(!isOnline);
  };

  const handleLogout = () => {
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gradient-surface">
      {/* Top Bar */}
      <header className="bg-card/95 backdrop-blur-sm border-b border-border shadow-gentle">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-sky rounded-xl flex items-center justify-center">
                <Globe className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-foreground">GlobeSpeak</h1>
                <p className="text-sm text-muted-foreground">Welcome, {userName}</p>
              </div>
            </div>
            
            <div className="flex items-center gap-2 md:gap-3">
              {/* Online/Offline Toggle - Hidden on mobile */}
              <div className="hidden sm:flex items-center gap-2">
                {isOnline ? (
                  <Wifi className="w-5 h-5 text-success" />
                ) : (
                  <WifiOff className="w-5 h-5 text-muted-foreground" />
                )}
                <span className="text-sm text-muted-foreground">
                  {isOnline ? 'Online' : 'Offline'}
                </span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleToggleOnlineMode}
                  className="h-8"
                  disabled={!networkOnline}
                >
                  Toggle
                </Button>
              </div>
              
              {/* Mobile Status Indicator */}
              <div className="sm:hidden flex items-center gap-1">
                {isOnline ? (
                  <Wifi className="w-4 h-4 text-success" />
                ) : (
                  <WifiOff className="w-4 h-4 text-muted-foreground" />
                )}
              </div>
              
              <Button
                variant="ghost"
                size="sm"
                onClick={handleLogout}
                className="text-destructive hover:text-destructive hover:bg-destructive/10 flex-shrink-0"
              >
                <LogOut className="w-4 h-4" />
                <span className="hidden sm:inline ml-1">Logout</span>
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto space-y-6">
          
          {/* Language Selection */}
          <Card className="shadow-gentle">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Languages className="w-5 h-5 text-primary" />
                  <span className="font-medium text-foreground">English (US)</span>
                </div>
                <div className="text-muted-foreground">→</div>
                <div className="flex items-center gap-3">
                  <span className="font-medium text-foreground">Español (ES)</span>
                  <Languages className="w-5 h-5 text-primary" />
                </div>
              </div>
              
              {/* Status indicators */}
              <div className="mt-4 flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                  {isInitializingOffline ? (
                    <>
                      <Download className="w-4 h-4 text-primary animate-pulse" />
                      <span className="text-muted-foreground">Loading offline model...</span>
                    </>
                  ) : offlineReady ? (
                    <>
                      <CheckCircle className="w-4 h-4 text-success" />
                      <span className="text-success">Offline ready</span>
                    </>
                  ) : (
                    <span className="text-muted-foreground">Offline unavailable</span>
                  )}
                </div>
                
                <div className="flex items-center gap-2">
                  <div className={`w-2 h-2 rounded-full ${
                    (isOnline && networkOnline) ? 'bg-success' : 'bg-warning'
                  }`} />
                  <span className="text-muted-foreground">
                    {(isOnline && networkOnline) ? 'Online mode' : 'Offline mode'}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Control Button */}
          <div className="flex justify-center">
            <Button
              variant={isRecording ? "destructive" : "hero"}
              size="fab"
              onClick={handleStartStop}
              className="relative"
            >
              {isRecording ? (
                <>
                  <Square className="w-8 h-8" />
                  <div className="absolute -inset-2 rounded-full border-4 border-destructive animate-pulse" />
                </>
              ) : (
                <Play className="w-8 h-8 ml-1" />
              )}
            </Button>
          </div>

          <div className="text-center">
            <p className="text-muted-foreground">
              {isRecording ? "Listening..." : isTranslating ? "Translating..." : "Tap to start speaking"}
            </p>
          </div>

          {/* Translation Display */}
          <div className="space-y-4">
            {/* You Said */}
            <Card className="shadow-gentle">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-3">
                  <Mic className="w-5 h-5 text-primary" />
                  <h3 className="font-semibold text-foreground">You Said</h3>
                </div>
                <div className="min-h-[60px] bg-surface rounded-lg p-4 border border-border">
                  {originalText ? (
                    <p className="text-foreground text-lg">{originalText}</p>
                  ) : (
                    <p className="text-muted-foreground italic">Your speech will appear here...</p>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Translated */}
            <Card className="shadow-gentle">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-3">
                  <Globe className="w-5 h-5 text-accent" />
                  <h3 className="font-semibold text-foreground">Translated</h3>
                </div>
                <div className="min-h-[60px] bg-gradient-warm/10 rounded-lg p-4 border border-accent/20">
                  {translatedText ? (
                    <p className="text-foreground text-lg font-medium">{translatedText}</p>
                  ) : (
                    <p className="text-muted-foreground italic">Translation will appear here...</p>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Status Indicators */}
          <div className="flex justify-center gap-6 pt-4">
            <div className="flex items-center gap-2">
              <div className={`w-3 h-3 rounded-full ${
                (isOnline && networkOnline) ? 'bg-success animate-pulse' : 'bg-warning'
              }`} />
              <span className="text-sm text-muted-foreground">
                {(isOnline && networkOnline) ? 'Online' : 'Offline Mode'}
              </span>
            </div>
            
            <div className="flex items-center gap-2">
              <div className={`w-3 h-3 rounded-full ${isRecording ? 'bg-destructive animate-pulse' : 'bg-muted-foreground'}`} />
              <span className="text-sm text-muted-foreground">
                {isRecording ? 'Recording' : 'Ready'}
              </span>
            </div>
            
            <div className="flex items-center gap-2">
              <div className={`w-3 h-3 rounded-full ${offlineReady ? 'bg-success' : 'bg-muted-foreground'}`} />
              <span className="text-sm text-muted-foreground">
                {offlineReady ? 'Offline Ready' : 'Offline N/A'}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TranslatorScreen;