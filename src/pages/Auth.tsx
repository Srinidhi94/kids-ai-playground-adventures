import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Brain, Mail, Lock, User, ArrowLeft } from 'lucide-react';
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
      navigate('/');
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
          <div className="p-4">
            <Button
              onClick={() => navigate('/')}
              variant="ghost"
              size="sm"
              className="bg-white/20 hover:bg-white/30 text-white border border-white/30"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Button>
          </div>
        </div>

        {/* Content */}
        <div className="p-4 space-y-6">
          {/* Header */}
          <div className="text-center py-6">
            <div className="flex items-center justify-center mb-4">
              <Brain className="w-10 h-10 text-white mr-3 animate-star-twinkle" />
              <h1 className="text-2xl font-bold text-white drop-shadow-lg">Future Minds AI</h1>
            </div>
            <p className="text-white/90 text-base px-4">
              {isSignUp ? 'Create your account to start learning!' : 'Welcome back to your AI adventure!'}
            </p>
          </div>

          <Card className="bg-white/95 backdrop-blur-sm shadow-xl border-0">
            <CardHeader className="pb-4">
              <CardTitle className="text-center text-xl font-bold text-gray-800">
                {isSignUp ? 'Create Account' : 'Sign In'}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6 px-4 pb-6">
              {/* Email Form */}
              <form onSubmit={handleEmailAuth} className="space-y-4">
                {isSignUp && (
                  <div className="space-y-2">
                    <Label htmlFor="displayName" className="flex items-center text-sm font-medium">
                      <User className="w-4 h-4 mr-2" />
                      Display Name
                    </Label>
                    <Input
                      id="displayName"
                      type="text"
                      placeholder="Enter your name"
                      value={displayName}
                      onChange={(e) => setDisplayName(e.target.value)}
                      required={isSignUp}
                      className="h-12"
                    />
                  </div>
                )}
                
                <div className="space-y-2">
                  <Label htmlFor="email" className="flex items-center text-sm font-medium">
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
                    className="h-12"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="password" className="flex items-center text-sm font-medium">
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
                    className="h-12"
                  />
                </div>
                
                <Button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white font-semibold py-3 h-12"
                >
                  {loading ? 'Loading...' : isSignUp ? 'Create Account' : 'Sign In'}
                </Button>
              </form>

              <div className="text-center">
                <Button
                  variant="link"
                  onClick={() => setIsSignUp(!isSignUp)}
                  className="text-purple-600 hover:text-purple-700"
                >
                  {isSignUp 
                    ? 'Already have an account? Sign in' 
                    : "Don't have an account? Sign up"
                  }
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Auth;