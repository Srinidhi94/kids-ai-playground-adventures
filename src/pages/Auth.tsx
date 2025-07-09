import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Brain, Mail, Lock, User, BookOpen, Star, Gamepad, LogIn } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';

const Auth = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [loading, setLoading] = useState(false);
  const { signIn, signUp, user } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate('/dashboard');
    }
  }, [user, navigate]);

  const handleEmailAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      let result;
      if (isSignUp) {
        if (!displayName.trim()) {
          toast({
            title: "Name Required",
            description: "Please enter your display name.",
            variant: "destructive",
          });
          return;
        }
        result = await signUp(email, password, displayName);
      } else {
        result = await signIn(email, password);
      }

      if (result.error) {
        toast({
          title: "Authentication Error",
          description: result.error.message,
          variant: "destructive",
        });
      } else if (isSignUp) {
        toast({
          title: "Account Created!",
          description: "Please check your email to verify your account.",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "An unexpected error occurred.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-400 via-cyan-400 to-blue-400">
      <div className="w-full max-w-md mx-auto min-h-screen bg-white/10 backdrop-blur-sm">
        {/* Mobile Header */}
        <div className="sticky top-0 z-50 bg-white/20 backdrop-blur-md border-b border-white/20">
          <div className="flex items-center justify-center p-4">
            <div className="flex items-center space-x-3">
              <Brain className="w-8 h-8 text-white animate-star-twinkle" />
              <h1 className="text-xl font-bold text-white drop-shadow-lg">
                Future Minds AI
              </h1>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-4 space-y-6">
          {/* Main CTA Card with Sign In */}
          <Card className="bg-gradient-to-br from-purple-500 via-pink-500 to-indigo-500 text-white shadow-2xl border-0">
            <CardContent className="p-6">
              <div className="text-center mb-6">
                <div className="flex items-center justify-center mb-4">
                  <Gamepad className="w-16 h-16 text-white animate-wiggle" />
                </div>
                <h2 className="text-2xl font-bold mb-2">
                  {isSignUp ? 'Join the Adventure' : 'Continue Your Journey'}
                </h2>
                <p className="text-lg text-white/95 font-bold">
                  Welcome back to your AI adventure
                </p>
              </div>

              {/* Embedded Sign In Form */}
              <form onSubmit={handleEmailAuth} className="space-y-4">
                {isSignUp && (
                  <div className="space-y-2">
                    <Label htmlFor="displayName" className="flex items-center text-sm font-medium text-white">
                      <User className="w-4 h-4 mr-2" />
                      Name
                    </Label>
                    <Input
                      id="displayName"
                      type="text"
                      placeholder="Enter your name"
                      value={displayName}
                      onChange={(e) => setDisplayName(e.target.value)}
                      required={isSignUp}
                      className="h-12 bg-white/90 border-white/20 text-gray-800"
                    />
                  </div>
                )}
                
                <div className="space-y-2">
                  <Label htmlFor="email" className="flex items-center text-sm font-medium text-white">
                    <Mail className="w-4 h-4 mr-2" />
                    Email
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="h-12 bg-white/90 border-white/20 text-gray-800"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="password" className="flex items-center text-sm font-medium text-white">
                    <Lock className="w-4 h-4 mr-2" />
                    Password
                  </Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="h-12 bg-white/90 border-white/20 text-gray-800"
                  />
                </div>
                
                <Button
                  type="submit"
                  disabled={loading}
                  size="lg"
                  className="w-full bg-white text-purple-600 hover:bg-gray-100 font-bold py-4 text-lg shadow-xl transform hover:scale-105 transition-all"
                >
                  <LogIn className="w-6 h-6 mr-3" />
                  {loading ? 'Loading...' : 'Start Your AI Adventure'}
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Feature Tiles - moved below login */}
          <div className="grid grid-cols-2 gap-3">
            <Card className="bg-white/95 backdrop-blur-sm shadow-lg border-0">
              <CardContent className="p-4 text-center">
                <BookOpen className="w-8 h-8 text-blue-500 mx-auto mb-2" />
                <h4 className="text-sm font-bold text-gray-800 mb-1">Interactive Learning</h4>
                <p className="text-xs text-gray-600">
                  Step-by-step adventures
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white/95 backdrop-blur-sm shadow-lg border-0">
              <CardContent className="p-4 text-center">
                <Star className="w-8 h-8 text-yellow-500 mx-auto mb-2" />
                <h4 className="text-sm font-bold text-gray-800 mb-1">Track Progress</h4>
                <p className="text-xs text-gray-600">
                  Earn stars & achievements
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Why Choose Section (replaces sign up link) */}
          {!isSignUp && (
            <Card className="bg-white/95 backdrop-blur-sm shadow-xl border-0">
              <CardContent className="p-5 text-center">
                <h3 className="text-lg font-bold text-gray-800 mb-3">Why Choose Future Minds AI?</h3>
                <div className="space-y-2 mb-4">
                  <div className="flex items-center justify-center text-sm text-gray-600">
                    <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                    Learn through fun games & puzzles
                  </div>
                  <div className="flex items-center justify-center text-sm text-gray-600">
                    <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                    No prior AI knowledge needed
                  </div>
                  <div className="flex items-center justify-center text-sm text-gray-600">
                    <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                    Ready to explore AI concepts?
                  </div>
                </div>
                <Button 
                  variant="outline"
                  onClick={() => setIsSignUp(true)}
                  className="border-purple-500 text-purple-600 hover:bg-purple-50 font-semibold"
                >
                  Create New Account →
                </Button>
              </CardContent>
            </Card>
          )}

          {/* Back to sign in for sign up users */}
          {isSignUp && (
            <div className="text-center">
              <Button
                variant="link"
                onClick={() => setIsSignUp(false)}
                className="text-white/90 hover:text-white"
              >
                Already have an account? Sign in
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Auth;