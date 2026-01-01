import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Brain, ArrowRight, Sparkles, Users, Target, ChevronDown } from "lucide-react";

const Home = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setIsLoggedIn(!!session?.user);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setIsLoggedIn(!!session?.user);
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  const handleGetStarted = () => {
    if (isLoggedIn) {
      navigate("/dashboard");
    } else {
      navigate("/auth");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/30 to-background">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-accent/10 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 right-1/3 w-64 h-64 bg-primary/5 rounded-full blur-3xl animate-pulse delay-500" />
      </div>

      {/* Navigation */}
      <nav className="relative z-10 container mx-auto px-4 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-primary to-accent rounded-xl flex items-center justify-center shadow-lg">
              <Brain className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              PersonaQuest
            </span>
          </div>
          <div className="flex items-center gap-4">
            {isLoggedIn ? (
              <Button onClick={() => navigate("/dashboard")} variant="default">
                Mon Dashboard
              </Button>
            ) : (
              <>
                <Button onClick={() => navigate("/auth")} variant="ghost">
                  Connexion
                </Button>
                <Button onClick={() => navigate("/auth")} variant="default">
                  S'inscrire
                </Button>
              </>
            )}
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative z-10 container mx-auto px-4 pt-20 pb-32">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-8">
            <Sparkles className="w-4 h-4" />
            Test de personnalité Big Five
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            Découvrez votre{" "}
            <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent animate-gradient">
              personnalité unique
            </span>
          </h1>
          
          <p className="text-xl text-muted-foreground mb-12 max-w-2xl mx-auto leading-relaxed">
            Explorez les cinq dimensions fondamentales de votre personnalité grâce à notre 
            test scientifique basé sur le modèle Big Five. Comprenez mieux qui vous êtes.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              onClick={handleGetStarted}
              size="lg"
              className="bg-gradient-to-r from-primary to-accent hover:opacity-90 text-lg px-8 py-6 rounded-2xl shadow-xl shadow-primary/25"
            >
              Commencer le test
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
            <Button 
              variant="outline"
              size="lg"
              className="text-lg px-8 py-6 rounded-2xl"
              onClick={() => document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' })}
            >
              En savoir plus
              <ChevronDown className="w-5 h-5 ml-2" />
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="relative z-10 container mx-auto px-4 py-24">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Pourquoi choisir PersonaQuest ?
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Une approche scientifique et personnalisée pour comprendre votre personnalité
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Feature 1 */}
          <div className="bg-card/80 backdrop-blur-xl rounded-3xl p-8 border border-border/50 hover:border-primary/30 transition-all hover:shadow-xl group">
            <div className="w-14 h-14 bg-gradient-to-br from-primary/20 to-accent/20 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <Brain className="w-7 h-7 text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-3">Basé sur la science</h3>
            <p className="text-muted-foreground">
              Le modèle Big Five est reconnu mondialement comme l'un des plus fiables 
              en psychologie de la personnalité.
            </p>
          </div>

          {/* Feature 2 */}
          <div className="bg-card/80 backdrop-blur-xl rounded-3xl p-8 border border-border/50 hover:border-primary/30 transition-all hover:shadow-xl group">
            <div className="w-14 h-14 bg-gradient-to-br from-primary/20 to-accent/20 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <Target className="w-7 h-7 text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-3">Résultats détaillés</h3>
            <p className="text-muted-foreground">
              Obtenez une analyse approfondie de vos cinq traits de personnalité 
              avec des visualisations claires.
            </p>
          </div>

          {/* Feature 3 */}
          <div className="bg-card/80 backdrop-blur-xl rounded-3xl p-8 border border-border/50 hover:border-primary/30 transition-all hover:shadow-xl group">
            <div className="w-14 h-14 bg-gradient-to-br from-primary/20 to-accent/20 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <Users className="w-7 h-7 text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-3">Suivi personnalisé</h3>
            <p className="text-muted-foreground">
              Créez un compte pour sauvegarder vos résultats et suivre 
              l'évolution de votre personnalité.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative z-10 container mx-auto px-4 py-24">
        <div className="bg-gradient-to-br from-primary/10 to-accent/10 rounded-3xl p-12 border border-primary/20 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Prêt à vous découvrir ?
          </h2>
          <p className="text-muted-foreground text-lg mb-8 max-w-xl mx-auto">
            Rejoignez des milliers de personnes qui ont déjà exploré leur personnalité avec PersonaQuest.
          </p>
          <Button 
            onClick={handleGetStarted}
            size="lg"
            className="bg-gradient-to-r from-primary to-accent hover:opacity-90 text-lg px-8 py-6 rounded-2xl shadow-xl shadow-primary/25"
          >
            Commencer gratuitement
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 border-t border-border/50 py-8">
        <div className="container mx-auto px-4 text-center text-muted-foreground">
          <p>© 2026 PersonaQuest. Tous droits réservés.</p>
        </div>
      </footer>
    </div>
  );
};

export default Home;
