import {
  Atom, Braces, FileCode2, Palette, Wind, GitBranch, Github,
  Coffee, Database, Brain, UtensilsCrossed, HelpCircle,
  MessageSquare, Bot, Film, Trophy, Rocket, Shield,
  Gamepad2, Code2, Crosshair, Terminal
} from 'lucide-react';

const icons = {
  Atom, Braces, FileCode2, Palette, Wind, GitBranch, Github,
  Coffee, Database, Brain, UtensilsCrossed, HelpCircle,
  MessageSquare, Bot, Film, Trophy, Rocket, Shield,
  Gamepad2, Code2, Crosshair, Terminal
};

export function getIcon(name) {
  return icons[name] || Gamepad2;
}
