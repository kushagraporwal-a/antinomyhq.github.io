import { Button } from "@/components/ui/button";
import { ExternalLink, Lock, Terminal, Puzzle, Bot } from "lucide-react";
import { ThemeProvider, useTheme } from "@/components/theme-provider";
import { ThemeToggle } from "@/components/theme-toggle";

const Logo = (props: { className?: string }) => {
  const { theme } = useTheme();
  const isDark = theme === 'dark' || (theme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches);
  const className = isDark ? "dark:brightness-0 dark:invert" : "";
  return <img src={isDark ? "/antinomy-logo-dark.png" : "/antinomy-logo.png"} alt="Antinomy" className={`${props.className || 'h-8'} ${className}`} />;
}

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <div className="min-h-screen bg-background text-foreground">
        {/* Header */}
        <header className="fixed top-0 left-0 right-0 border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <nav className="flex h-16 items-center justify-between px-6">
            <div className="flex items-center space-x-10">
              <div className="flex items-center space-x-2">
                <Logo />
              </div>
              <div className="hidden md:flex space-x-8">
                <a href="#" className="text-[13px] font-medium transition-colors hover:text-foreground/70">Quickstart</a>
                <a href="#" className="text-[13px] font-medium transition-colors hover:text-foreground/70">Docs</a>
                <a href="#" className="text-[13px] font-medium transition-colors hover:text-foreground/70">Blog</a>
                <a href="#" className="text-[13px] font-medium transition-colors hover:text-foreground/70">Extensions</a>
              </div>
            </div>
            <div className="flex items-center space-x-6">
              <ThemeToggle />
              <a href="#" className="text-[13px] font-medium flex items-center space-x-1.5 text-foreground/70 hover:text-foreground">
                <span>Discord</span> <ExternalLink className="h-3.5 w-3.5" />
              </a>
              <a href="#" className="text-[13px] font-medium flex items-center space-x-1.5 text-foreground/70 hover:text-foreground">
                <span>GitHub</span> <ExternalLink className="h-3.5 w-3.5" />
              </a>
            </div>
          </nav>
        </header>

        {/* Main Content */}
        <main className="flex flex-col items-center justify-center">
          {/* Hero Section */}
          <section className="flex min-h-screen w-full flex-col items-center justify-center px-4">
            <div className="text-center space-y-6 max-w-[600px]">
              {/* Logo */}
              <div className="mx-auto w-48 mb-12">
                <Logo className="w-full" />
              </div>

              <div className="space-y-4">
              <h1 className="text-[32px] font-semibold tracking-tight">Engineered for the Seasoned Professional</h1>
                <p className="text-[17px] leading-relaxed text-foreground/70 font-light">
                Enhance your proven practices with a measured, intelligent assistant built to support complex engineering challenges.
                </p>
              </div>

              {/* Install Button */}
              <div className="pt-2">
                <Button 
                  size="lg" 
                  className="h-10 px-6 text-[13px] font-medium rounded-md bg-foreground text-background hover:bg-foreground/90"
                >
                  install antinomy
                </Button>
              </div>

              {/* Terminal Demo */}
              <div className="mt-20 w-full">
                <div className="rounded-lg border bg-secondary text-secondary-foreground shadow-sm overflow-hidden">
                  <div className="flex h-8 items-center border-b border-border/50 px-3 bg-secondary">
                    <div className="flex items-center space-x-1.5">
                      <div className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
                      <div className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
                      <div className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
                    </div>
                  </div>
                  <div className="p-4 text-[13px] font-mono">
                    <div className="space-y-2 text-foreground/70">
                      <p>Antinomy {'>'} Writing tests for user authentication...</p>
                      <p className="text-[#28c840]">✓ Generated 15 test cases</p>
                      <p className="text-[#28c840]">✓ All tests passed successfully</p>
                      <p>Antinomy {'>'} Deploying to production...</p>
                      <p className="text-[#28c840]">✓ Build completed</p>
                      <p className="text-[#28c840]">✓ Deployment successful</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Features Section */}
          <section className="w-full py-24 px-4 border-t border-border/40">
            <div className="max-w-6xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
                {/* Open Source */}
                <div className="space-y-3">
                  <div className="w-10 h-10 rounded-lg bg-foreground/5 flex items-center justify-center">
                    <Lock className="w-5 h-5" />
                  </div>
                  <h3 className="text-[15px] font-semibold">Open Source</h3>
                  <p className="text-[13px] leading-relaxed text-foreground/70 font-light">
                    Built with transparency and collaboration in mind, Antinomy empowers developers to contribute, customize, and innovate freely.
                  </p>
                </div>

                {/* Runs Locally */}
                <div className="space-y-3">
                  <div className="w-10 h-10 rounded-lg bg-foreground/5 flex items-center justify-center">
                    <Terminal className="w-5 h-5" />
                  </div>
                  <h3 className="text-[15px] font-semibold">Runs Locally</h3>
                  <p className="text-[13px] leading-relaxed text-foreground/70 font-light">
                    Antinomy runs locally to execute tasks efficiently, keeping control in your hands and your data secure.
                  </p>
                </div>

                {/* Extensible */}
                <div className="space-y-3">
                  <div className="w-10 h-10 rounded-lg bg-foreground/5 flex items-center justify-center">
                    <Puzzle className="w-5 h-5" />
                  </div>
                  <h3 className="text-[15px] font-semibold">Extensible</h3>
                  <p className="text-[13px] leading-relaxed text-foreground/70 font-light">
                    Customize Antinomy with your preferred LLM and enhance its capabilities by connecting it to any external API or service.
                  </p>
                </div>

                {/* Autonomous */}
                <div className="space-y-3">
                  <div className="w-10 h-10 rounded-lg bg-foreground/5 flex items-center justify-center">
                    <Bot className="w-5 h-5" />
                  </div>
                  <h3 className="text-[15px] font-semibold">Autonomous</h3>
                  <p className="text-[13px] leading-relaxed text-foreground/70 font-light">
                    Antinomy independently handles complex tasks, from debugging to deployment, freeing you to focus on what matters most.
                  </p>
                </div>
              </div>
            </div>
          </section>
        </main>
      </div>
    </ThemeProvider>
  );
}

export default App;