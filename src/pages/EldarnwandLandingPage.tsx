import React from 'react';
import HeaderComponent from '@/components/layout/HeaderComponent'; // Custom component
import FooterComponent from '@/components/layout/FooterComponent'; // Custom component
import ColorTokenCard from '@/components/ColorTokenCard'; // Custom component

import { ScrollArea } from '@/components/ui/scroll-area';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { ClipboardCopy, Palette, Accessibility, Puzzle, PaintbrushChart, CheckCircle, XCircle, AlertTriangle, Info, Brain, Layers, Users, Sparkles, Eye } from 'lucide-react'; // Using PaintbrushChart for variety

// --- Helper: GlassmorphicInfoCard (Conceptual component implementation) ---
interface GlassmorphicInfoCardProps {
  icon?: React.ElementType;
  title: string;
  description: string;
  className?: string;
}
const GlassmorphicInfoCard: React.FC<GlassmorphicInfoCardProps> = ({ icon: Icon, title, description, className }) => (
  <Card className={`bg-white/5 backdrop-blur-lg border border-white/10 shadow-xl rounded-xl hover:bg-white/10 transition-all duration-300 text-gray-200 ${className}`}>
    <CardHeader>
      {Icon && <Icon className="w-10 h-10 mb-4 text-pink-400" />}
      <CardTitle className="text-2xl font-semibold text-white">{title}</CardTitle>
    </CardHeader>
    <CardContent>
      <p className="text-gray-300 leading-relaxed">{description}</p>
    </CardContent>
  </Card>
);

// --- Helper: ColorSwatchInteractive (Conceptual component implementation) ---
interface ColorSwatchInteractiveProps {
  colorName: string;
  hex: string;
  description?: string;
  onCopy: (hex: string, name: string) => void;
}
const ColorSwatchInteractive: React.FC<ColorSwatchInteractiveProps> = ({ colorName, hex, description, onCopy }) => (
  <Card className="bg-white/5 backdrop-blur-md border border-white/10 p-4 rounded-lg shadow-lg text-center group hover:shadow-xl transition-shadow">
    <div
      className="w-full h-24 md:h-32 rounded-md mb-3 border border-white/20 shadow-inner"
      style={{ backgroundColor: hex }}
      title={`HEX: ${hex}`}
    />
    <h3 className="text-lg font-semibold text-white mb-1">{colorName}</h3>
    {description && <p className="text-xs text-gray-400 mb-2">{description}</p>}
    <div className="flex items-center justify-center space-x-2">
      <span className="text-sm font-mono text-pink-300 select-all">{hex}</span>
      <Button
        variant="ghost"
        size="icon"
        className="h-7 w-7 text-gray-400 hover:text-pink-400"
        onClick={() => onCopy(hex, colorName)}
        aria-label={`Copy ${hex} to clipboard`}
      >
        <ClipboardCopy className="h-4 w-4" />
      </Button>
    </div>
  </Card>
);

// --- Helper: FeedbackColorListItem (Conceptual component implementation) ---
interface FeedbackColorListItemProps {
  colorName: string;
  hexLight: string;
  hexDark: string;
  icon: React.ElementType;
  description: string;
}
const FeedbackColorListItem: React.FC<FeedbackColorListItemProps> = ({ colorName, hexLight, hexDark, icon: Icon, description }) => (
  <Card className="bg-white/5 backdrop-blur-md border border-white/10 p-4 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
    <div className="flex items-center mb-3">
      <Icon className={`w-6 h-6 mr-3`} style={{ color: hexDark }} />
      <h3 className="text-xl font-semibold text-white">{colorName}</h3>
    </div>
    <p className="text-sm text-gray-300 mb-3">{description}</p>
    <div className="flex space-x-3">
      <div className="flex-1">
        <div className="w-full h-12 rounded" style={{ backgroundColor: hexLight }} />
        <p className="text-xs text-center mt-1 text-gray-400">Light: {hexLight}</p>
      </div>
      <div className="flex-1">
        <div className="w-full h-12 rounded" style={{ backgroundColor: hexDark }} />
        <p className="text-xs text-center mt-1 text-gray-400">Dark: {hexDark}</p>
      </div>
    </div>
  </Card>
);

// --- Placeholder Data ---
const coreColorsData = [
  { name: "Primary Pink", hex: "#EC4899", description: "Trust, friendliness" },
  { name: "Primary Pink (Light)", hex: "#F9A8D4", description: "Softer primary shade" },
  { name: "Primary Pink (Dark)", hex: "#BE185D", description: "Stronger primary shade" },
  { name: "Secondary Purple", hex: "#8B5CF6", description: "Innovation, creativity" },
  { name: "Secondary Purple (Light)", hex: "#C4B5FD", description: "Lighter accent" },
  { name: "Secondary Purple (Dark)", hex: "#6D28D9", description: "Deeper accent" },
  { name: "Tertiary Indigo", hex: "#4F46E5", description: "Precision, technology" },
  { name: "Neutral Gray", hex: "#6B7280", description: "Balance, support" },
  { name: "Neutral Off-White", hex: "#F3F4F6", description: "Clean background (light themes)" },
];

const feedbackColorsData = [
  { name: "Success", hexLight: "#A7F3D0", hexDark: "#059669", icon: CheckCircle, description: "Indicates a successful operation or positive confirmation." },
  { name: "Error", hexLight: "#FECACA", hexDark: "#DC2626", icon: XCircle, description: "Highlights errors or critical issues requiring attention." },
  { name: "Warning", hexLight: "#FDE68A", hexDark: "#D97706", icon: AlertTriangle, description: "Warns about potential issues or important notices." },
  { name: "Info", hexLight: "#BFDBFE", hexDark: "#2563EB", icon: Info, description: "Provides neutral, informative messages or tips." },
];

const colorTokenExamples = [
    {
        groupLabel: "Primary Colors",
        groupDescription: "Core brand colors for primary actions and highlights.",
        base: { hex: "#EC4899", tokenName: "var(--primary)" },
        light: { hex: "#F9A8D4", tokenName: "var(--primary-light)" },
        dark: { hex: "#BE185D", tokenName: "var(--primary-dark)" },
    },
    {
        groupLabel: "Secondary Colors",
        groupDescription: "Accent colors for secondary elements and visual interest.",
        base: { hex: "#8B5CF6", tokenName: "var(--secondary)" },
        light: { hex: "#C4B5FD", tokenName: "var(--secondary-light)" },
        dark: { hex: "#6D28D9", tokenName: "var(--secondary-dark)" },
    },
    {
        groupLabel: "Neutral Tones",
        groupDescription: "For backgrounds, text, and general UI structure.",
        base: { hex: "#374151", tokenName: "var(--neutral-base)" }, // Example: Gray 700
        light: { hex: "#9CA3AF", tokenName: "var(--neutral-light)" }, // Example: Gray 400
        dark: { hex: "#1F2937", tokenName: "var(--neutral-dark)" }, // Example: Gray 800
    },
    {
        groupLabel: "Success Feedback",
        groupDescription: "Tokens for success messages and indicators.",
        base: { hex: "#10B981", tokenName: "var(--feedback-success)" },
        light: { hex: "#A7F3D0", tokenName: "var(--feedback-success-light)" },
        dark: { hex: "#047857", tokenName: "var(--feedback-success-dark)" },
    },
];


const EldarnwandLandingPage: React.FC = () => {
  console.log('EldarnwandLandingPage loaded');
  const { toast } = useToast();

  const handleCopyToClipboard = (textToCopy: string, itemName: string) => {
    if (!navigator.clipboard) {
      toast({
        title: "Clipboard Error",
        description: "Clipboard API not available in this browser.",
        variant: "destructive",
      });
      return;
    }
    navigator.clipboard.writeText(textToCopy).then(() => {
      toast({
        title: "Copied to Clipboard!",
        description: `${itemName} (${textToCopy}) copied.`,
      });
    }).catch(err => {
      console.error("Failed to copy:", err);
      toast({
        title: "Copy Failed",
        description: "Could not copy text.",
        variant: "destructive",
      });
    });
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-900 text-gray-100 font-['Inter',_sans-serif]">
      <HeaderComponent />
      <ScrollArea className="flex-1">
        <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 space-y-20 md:space-y-32">

          {/* Foundational Principles Section */}
          <section id="principles">
            <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12 text-white tracking-tight">
              Foundational Principles
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              <GlassmorphicInfoCard
                icon={Puzzle}
                title="Core Philosophy"
                description="Eldarnwand is built on the belief that color is not just aesthetic, but a powerful tool for communication, usability, and brand identity. We prioritize clarity, consistency, and emotional resonance."
              />
              <GlassmorphicInfoCard
                icon={Brain}
                title="Emotional Clarity"
                description="Our palette is carefully curated to evoke specific emotions and guide user perception, ensuring that the interface feels intuitive and aligned with its purpose."
              />
              <GlassmorphicInfoCard
                icon={Layers}
                title="Brand Cohesion"
                description="Achieve consistent branding across all touchpoints. Eldarnwand provides a unified color language that reinforces your identity and builds recognition."
              />
            </div>
          </section>

          <Separator className="bg-white/10" />

          {/* Brand Color Strategy Section */}
          <section id="strategy">
            <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12 text-white tracking-tight">
              Brand Color Strategy: The 60-30-10 Rule
            </h2>
            <GlassmorphicInfoCard
              icon={PaintbrushChart}
              title="Balanced Visual Harmony"
              description="We advocate the 60-30-10 rule for applying brand colors: 60% primary/neutral color for overall theme, 30% secondary color for contrast and visual interest, and 10% accent color for calls-to-action and highlights. This creates a balanced and engaging user experience."
              className="max-w-3xl mx-auto"
            />
          </section>
          
          <Separator className="bg-white/10" />

          {/* Color Psychology Section */}
          <section id="psychology">
            <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12 text-white tracking-tight">
              The Psychology Behind Our Palette
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              <GlassmorphicInfoCard
                icon={Sparkles}
                title="Primary Pink: Trust & Approachability"
                description="Our primary pink evokes feelings of trust, warmth, and modern friendliness. It's inviting and aims to create a positive user connection."
              />
              <GlassmorphicInfoCard
                icon={Palette}
                title="Secondary Purple: Innovation & Creativity"
                description="Purple signifies innovation, creativity, and a touch of luxury. It's used to highlight forward-thinking features and inspire users."
              />
              <GlassmorphicInfoCard
                icon={Eye} // Using Eye for Precision/Focus
                title="Tertiary Indigo: Precision & Technology"
                description="Indigo conveys precision, depth, and technological sophistication. It grounds the palette and adds a sense of reliability and intelligence."
              />
            </div>
          </section>

          <Separator className="bg-white/10" />

          {/* Accessibility Commitment Section */}
          <section id="accessibility">
            <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12 text-white tracking-tight">
              Commitment to Accessibility
            </h2>
            <GlassmorphicInfoCard
              icon={Accessibility}
              title="Inclusive by Design (WCAG 2.1 AA+)"
              description="Eldarnwand is designed with accessibility at its core. We strive for WCAG 2.1 Level AA compliance, ensuring sufficient color contrast, support for color-blind users, and clear visual hierarchies to make interfaces usable for everyone."
              className="max-w-3xl mx-auto"
            />
          </section>

          <Separator className="bg-white/10" />

          {/* Core Color System Section */}
          <section id="core-colors">
            <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12 text-white tracking-tight">
              Explore Our Core Color System
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {coreColorsData.map((color) => (
                <ColorSwatchInteractive
                  key={color.name}
                  colorName={color.name}
                  hex={color.hex}
                  description={color.description}
                  onCopy={handleCopyToClipboard}
                />
              ))}
            </div>
          </section>

          <Separator className="bg-white/10" />

          {/* Feedback Colors Section */}
          <section id="feedback-colors">
            <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12 text-white tracking-tight">
              Intuitive Feedback Colors
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
              {feedbackColorsData.map((color) => (
                <FeedbackColorListItem
                  key={color.name}
                  colorName={color.name}
                  hexLight={color.hexLight}
                  hexDark={color.hexDark}
                  icon={color.icon}
                  description={color.description}
                />
              ))}
            </div>
          </section>

          <Separator className="bg-white/10" />

          {/* Color Tokens Section */}
          <section id="color-tokens">
            <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12 text-white tracking-tight">
              Demystify Color Tokens
            </h2>
            <div className="space-y-8">
              {colorTokenExamples.map((tokenGroup) => (
                <ColorTokenCard
                  key={tokenGroup.groupLabel}
                  groupLabel={tokenGroup.groupLabel}
                  groupDescription={tokenGroup.groupDescription}
                  base={tokenGroup.base}
                  light={tokenGroup.light}
                  dark={tokenGroup.dark}
                />
              ))}
            </div>
             <p className="text-center text-gray-400 mt-12 text-sm">
                These tokens provide a systematic way to apply colors, ensuring consistency and easier theme management. <br/> Click any HEX code or token name (where applicable) to copy.
            </p>
          </section>

        </main>
      </ScrollArea>
      <FooterComponent />
    </div>
  );
};

export default EldarnwandLandingPage;