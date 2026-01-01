import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { 
  Brain, 
  LogOut, 
  Play, 
  History, 
  User, 
  BarChart3,
  Sparkles,
  ArrowRight
} from "lucide-react";
import { User as SupabaseUser } from "@supabase/supabase-js";

const Dashboard = () => {
  const [user, setUser] = useState<SupabaseUser | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setUser(session?.user ?? null);
        setLoading(false);
        if (!session?.user) {
          navigate("/auth");
        }
      }
    );

    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      setLoading(false);
      if (!session?.user) {
        navigate("/auth");
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/");
  };

  const handleStartQuiz = () => {
    navigate("/?start=true");
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-muted/30 to-background flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  const userName = user?.user_metadata?.full_name || user?.email?.split("@")[0] || "Utilisateur";

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/30 to-background">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-accent/5 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      {/* Header */}
      <header className="relative border-b border-border/50 bg-card/50 backdrop-blur-xl">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-primary to-accent rounded-xl flex items-center justify-center shadow-lg">
              <Brain className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              PersonaQuest
            </span>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <User className="w-4 h-4" />
              <span>{userName}</span>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleLogout}
              className="text-muted-foreground hover:text-foreground"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Déconnexion
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative container mx-auto px-4 py-12">
        {/* Welcome Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">
            Bienvenue,{" "}
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              {userName}
            </span>
          </h1>
          <p className="text-muted-foreground text-lg">
            Découvrez votre personnalité et suivez votre évolution
          </p>
        </div>

        {/* Quick Actions */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {/* Start Quiz Card */}
          <div 
            onClick={handleStartQuiz}
            className="group bg-gradient-to-br from-primary/10 to-accent/10 rounded-3xl p-8 border border-primary/20 hover:border-primary/40 transition-all cursor-pointer hover:shadow-xl hover:shadow-primary/10"
          >
            <div className="w-14 h-14 bg-gradient-to-br from-primary to-accent rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <Play className="w-7 h-7 text-primary-foreground" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Commencer le test</h3>
            <p className="text-muted-foreground mb-4">
              Passez le test de personnalité Big Five et découvrez vos traits dominants
            </p>
            <div className="flex items-center text-primary font-medium group-hover:gap-2 transition-all">
              <span>Démarrer</span>
              <ArrowRight className="w-4 h-4 ml-1" />
            </div>
          </div>

          {/* History Card */}
          <div className="bg-card/80 backdrop-blur-xl rounded-3xl p-8 border border-border/50 hover:border-border transition-all hover:shadow-lg">
            <div className="w-14 h-14 bg-muted rounded-2xl flex items-center justify-center mb-6">
              <History className="w-7 h-7 text-muted-foreground" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Historique</h3>
            <p className="text-muted-foreground mb-4">
              Consultez vos résultats précédents et suivez votre évolution
            </p>
            <span className="text-sm text-muted-foreground">Bientôt disponible</span>
          </div>

          {/* Stats Card */}
          <div className="bg-card/80 backdrop-blur-xl rounded-3xl p-8 border border-border/50 hover:border-border transition-all hover:shadow-lg">
            <div className="w-14 h-14 bg-muted rounded-2xl flex items-center justify-center mb-6">
              <BarChart3 className="w-7 h-7 text-muted-foreground" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Statistiques</h3>
            <p className="text-muted-foreground mb-4">
              Analysez vos traits de personnalité en détail
            </p>
            <span className="text-sm text-muted-foreground">Bientôt disponible</span>
          </div>
        </div>

        {/* Info Section */}
        <div className="bg-card/80 backdrop-blur-xl rounded-3xl p-8 border border-border/50">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-gradient-to-br from-primary/20 to-accent/20 rounded-2xl flex items-center justify-center flex-shrink-0">
              <Sparkles className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2">À propos du test Big Five</h3>
              <p className="text-muted-foreground leading-relaxed">
                Le modèle Big Five, également connu sous le nom de modèle OCEAN, est l'un des 
                cadres les plus reconnus en psychologie de la personnalité. Il mesure cinq 
                dimensions fondamentales : l'Ouverture à l'expérience, la Conscience, 
                l'Extraversion, l'Agréabilité et le Névrosisme. Ce test vous aidera à mieux 
                vous comprendre et à identifier vos points forts.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
