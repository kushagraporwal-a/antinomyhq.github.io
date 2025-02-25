# Installation

Welcome to Antinomy UI - the elegantly crafted component library designed to streamline your application development process.

## Quick Start 🚀

You can add Antinomy UI to your project with our simple CLI tool:

```bash
npx antinomy-ui@latest init
```

## Manual Installation 🛠️

If you prefer to set things up manually, follow these steps:

### 1. Install Dependencies

First, install Antinomy UI along with its peer dependencies:

```bash
npm install antinomy-ui @radix-ui/react-icons tailwindcss-animate class-variance-authority clsx tailwind-merge
```

### 2. Configure Your Project

Add the following to your `tailwind.config.js`:

```js
/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
	],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      keyframes: {
        "accordion-down": {
          from: { height: 0 },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: 0 },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}
```

### 3. Configure Components

Create a `components.json` file in your project root:

```json
{
  "$schema": "https://ui.shadcn.com/schema.json",
  "style": "default",
  "rsc": true,
  "tsx": true,
  "tailwind": {
    "config": "tailwind.config.js",
    "css": "app/globals.css",
    "baseColor": "slate",
    "cssVariables": true
  },
  "aliases": {
    "components": "@/components",
    "utils": "@/lib/utils"
  }
}
```

### 4. Add CSS

Add the following to your global CSS file:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
 
@layer base {
  :root {
    --background: 0 0% 100%;
    --foreground: 222.2 47.4% 11.2%;
 
    --muted: 210 40% 96.1%;
    --muted-foreground: 215.4 16.3% 46.9%;
 
    --popover: 0 0% 100%;
    --popover-foreground: 222.2 47.4% 11.2%;
 
    --border: 214.3 31.8% 91.4%;
    --input: 214.3 31.8% 91.4%;
 
    --card: 0 0% 100%;
    --card-foreground: 222.2 47.4% 11.2%;
 
    --primary: 222.2 47.4% 11.2%;
    --primary-foreground: 210 40% 98%;
 
    --secondary: 210 40% 96.1%;
    --secondary-foreground: 222.2 47.4% 11.2%;
 
    --accent: 210 40% 96.1%;
    --accent-foreground: 222.2 47.4% 11.2%;
 
    --destructive: 0 100% 50%;
    --destructive-foreground: 210 40% 98%;
 
    --ring: 215 20.2% 65.1%;
 
    --radius: 0.5rem;
  }
 
  .dark {
    --background: 224 71% 4%;
    --foreground: 213 31% 91%;
 
    --muted: 223 47% 11%;
    --muted-foreground: 215.4 16.3% 56.9%;
 
    --accent: 216 34% 17%;
    --accent-foreground: 210 40% 98%;
 
    --popover: 224 71% 4%;
    --popover-foreground: 215 20.2% 65.1%;
 
    --border: 216 34% 17%;
    --input: 216 34% 17%;
 
    --card: 224 71% 4%;
    --card-foreground: 213 31% 91%;
 
    --primary: 210 40% 98%;
    --primary-foreground: 222.2 47.4% 1.2%;
 
    --secondary: 222.2 47.4% 11.2%;
    --secondary-foreground: 210 40% 98%;
 
    --destructive: 0 63% 31%;
    --destructive-foreground: 210 40% 98%;
 
    --ring: 216 34% 17%;
 
    --radius: 0.5rem;
  }
}
 
@layer base {
  * {
    @apply border-border;
  }
  body {
    @apply bg-background text-foreground;
    font-feature-settings: "rlig" 1, "calt" 1;
  }
}
```

## Using Components 🎨

Once installed, you can start using Antinomy UI components in your React application:

```tsx
import { Button } from "antinomy-ui/components/button"

export default function Home() {
  return (
    <Button variant="outline">
      Click me
    </Button>
  )
}
```

## Customization 🎯

Antinomy UI components are built using Tailwind CSS and are fully customizable. You can modify them by:

1. Adjusting the Tailwind CSS configuration
2. Using CSS variables for theming
3. Extending component variants

## Theming 🌈

Antinomy UI supports both light and dark modes out of the box. Use the `theme-provider` component to enable theme switching:

```tsx
import { ThemeProvider } from "antinomy-ui/components/theme-provider"

export default function App() {
  return (
    <ThemeProvider>
      {/* Your app content */}
    </ThemeProvider>
  )
}
```

## Next Steps 🎯

- Check out our [Components](/components) section for detailed documentation
- Visit our [GitHub repository](https://github.com/antinomyhq/ui) for the latest updates
- Join our [Discord community](https://discord.gg/antinomy) for support