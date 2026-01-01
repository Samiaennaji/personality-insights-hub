export interface Question {
  id: number;
  text: string;
  trait: 'openness' | 'conscientiousness' | 'extraversion' | 'agreeableness' | 'neuroticism';
  reverse?: boolean;
}

export const questions: Question[] = [
  // Ouverture à l'expérience
  { id: 1, text: "J'aime découvrir de nouvelles idées et concepts.", trait: 'openness' },
  { id: 2, text: "Je suis curieux(se) de comprendre comment les choses fonctionnent.", trait: 'openness' },
  { id: 3, text: "J'apprécie les œuvres d'art et la beauté.", trait: 'openness' },
  
  // Conscienciosité
  { id: 4, text: "Je suis organisé(e) et méthodique dans mon travail.", trait: 'conscientiousness' },
  { id: 5, text: "Je termine toujours ce que j'ai commencé.", trait: 'conscientiousness' },
  { id: 6, text: "Je planifie mes activités à l'avance.", trait: 'conscientiousness' },
  
  // Extraversion
  { id: 7, text: "Je me sens à l'aise dans les situations sociales.", trait: 'extraversion' },
  { id: 8, text: "J'aime être le centre de l'attention.", trait: 'extraversion' },
  { id: 9, text: "Je me sens énergisé(e) après avoir passé du temps avec des gens.", trait: 'extraversion' },
  
  // Agréabilité
  { id: 10, text: "Je fais confiance aux autres facilement.", trait: 'agreeableness' },
  { id: 11, text: "J'essaie d'aider les autres autant que possible.", trait: 'agreeableness' },
  { id: 12, text: "Je suis sensible aux besoins des autres.", trait: 'agreeableness' },
  
  // Neuroticisme
  { id: 13, text: "Je m'inquiète souvent pour l'avenir.", trait: 'neuroticism' },
  { id: 14, text: "Je ressens facilement du stress.", trait: 'neuroticism' },
  { id: 15, text: "Mes émotions changent rapidement.", trait: 'neuroticism' },
];

export const traitDescriptions: Record<string, { name: string; description: string; color: string }> = {
  openness: {
    name: "Ouverture",
    description: "Curiosité intellectuelle, créativité et appréciation de l'art et des nouvelles expériences.",
    color: "hsl(var(--trait-openness))"
  },
  conscientiousness: {
    name: "Conscienciosité",
    description: "Organisation, fiabilité, autodiscipline et orientation vers les objectifs.",
    color: "hsl(var(--trait-conscientiousness))"
  },
  extraversion: {
    name: "Extraversion",
    description: "Énergie sociale, enthousiasme et tendance à rechercher la stimulation.",
    color: "hsl(var(--trait-extraversion))"
  },
  agreeableness: {
    name: "Agréabilité",
    description: "Coopération, confiance, empathie et souci du bien-être des autres.",
    color: "hsl(var(--trait-agreeableness))"
  },
  neuroticism: {
    name: "Stabilité émotionnelle",
    description: "Gestion des émotions négatives, résilience et calme face au stress.",
    color: "hsl(var(--trait-neuroticism))"
  }
};
