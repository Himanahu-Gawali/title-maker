import { TitleSuggestion } from '../types';

// Emotions and their patterns for title generation
const emotionPatterns = {
  shock: [
    "😱 You Won't BELIEVE What [subject] Did!",
    "SHOCKING: [subject] Changed Everything in 24 Hours",
    "The Dark Truth About [subject] They're Hiding",
    "I Discovered [subject]'s BIGGEST Secret...",
    "This [subject] Discovery Will Change Your Life Forever",
  ],
  excitement: [
    "🔥 [subject] Just Broke The Internet!",
    "This [subject] Hack is Going VIRAL!",
    "How [subject] Made Me $100K in One Day",
    "The [subject] Method Nobody Knows About",
    "INSANE [subject] Results in 7 Days!",
  ],
  emotional: [
    "I Lost Everything Because of [subject]... 💔",
    "What [subject] Taught Me About Life",
    "The Day [subject] Changed My Life Forever",
    "Why I'm Quitting [subject] (Not Clickbait)",
    "My Last Video About [subject] (Emotional)",
  ],
  curiosity: [
    "🤔 The [subject] Secret Billionaires Use",
    "Why [subject] is Taking Over in 2024",
    "Inside The Secret World of [subject]",
    "Scientists Can't Explain This [subject] Phenomenon",
    "The Hidden Truth Behind [subject] Revealed",
  ],
  urgency: [
    "⚠️ Watch This [subject] Video Before It's Deleted",
    "WARNING: [subject] Will Never Be The Same After This",
    "HURRY: This [subject] Trick Won't Last Long",
    "The [subject] Crisis Nobody's Talking About",
    "EMERGENCY: What You Must Know About [subject]",
  ],
};

// Keywords to enhance titles
const enhancers = [
  "Ultimate", "Insane", "Life-Changing", "Revolutionary", "Mind-Blowing",
  "Viral", "Secret", "Exclusive", "Controversial", "Shocking",
  "Epic", "Genius", "Powerful", "Underground", "Elite",
];

// Fill in template with subject
const fillTemplate = (template: string, subject: string): string => {
  let result = template.replace('[subject]', subject);
  
  // Add year or time reference to some titles
  if (Math.random() > 0.7) {
    const currentYear = new Date().getFullYear();
    const timeReferences = [
      `(${currentYear})`,
      `(Updated ${currentYear})`,
      '(New Method)',
      '(Must Watch)',
      '(Time Sensitive)',
    ];
    result += ` ${timeReferences[Math.floor(Math.random() * timeReferences.length)]}`;
  }
  
  return result;
};

// Generate unique ID
const generateId = (): string => {
  return Math.random().toString(36).substring(2, 15);
};

// Add enhancers to subject
const enhanceSubject = (subject: string): string => {
  if (Math.random() > 0.5 && subject.length < 30) {
    const enhancer = enhancers[Math.floor(Math.random() * enhancers.length)];
    return `${enhancer} ${subject}`;
  }
  return subject;
};

// Get confidence score based on title analysis
const getConfidenceScore = (title: string, emotion: string): number => {
  let score = 75; // Base score
  
  // Length factor (40-100 characters is ideal)
  const length = title.length;
  if (length >= 40 && length <= 100) score += 5;
  
  // Emotional impact bonus
  if (emotion === 'emotional' || emotion === 'shock') score += 5;
  
  // Contains numbers or statistics
  if (/\d+/.test(title)) score += 3;
  
  // Contains emojis (sparingly)
  if (/[\u{1F300}-\u{1F9FF}]/u.test(title)) score += 2;
  
  // Contains urgency words
  if (/urgent|warning|hurry|emergency|last chance/i.test(title)) score += 3;
  
  // Contains power words
  if (/ultimate|exclusive|secret|revealed|shocking/i.test(title)) score += 2;
  
  // Ensure score stays within bounds
  return Math.min(Math.max(score, 70), 98);
};

// Main title generation function
export const generateTitles = async (description: string): Promise<TitleSuggestion[]> => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 2000));
  
  const titles: TitleSuggestion[] = [];
  const emotions = Object.keys(emotionPatterns) as Array<keyof typeof emotionPatterns>;
  
  // Extract key subjects from description
  const words = description.split(' ');
  let subject = description;
  
  if (words.length > 3) {
    // Take a meaningful portion of the description
    const keyPhraseLength = Math.min(5, Math.ceil(words.length / 2));
    subject = words.slice(0, keyPhraseLength).join(' ');
  }
  
  // Generate titles with varied emotions
  for (let i = 0; i < 10; i++) {
    const emotionType = emotions[i % emotions.length];
    const patterns = emotionPatterns[emotionType];
    const pattern = patterns[Math.floor(Math.random() * patterns.length)];
    
    const enhancedSubject = enhanceSubject(subject);
    const title = fillTemplate(pattern, enhancedSubject);
    
    titles.push({
      id: generateId(),
      title,
      confidence: getConfidenceScore(title, emotionType),
      emotion: emotionType,
    });
  }
  
  // Sort by confidence score
  return titles.sort((a, b) => b.confidence - a.confidence);
};