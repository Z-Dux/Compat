import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Heart, Sparkles, Users, ArrowRight, Star, Zap } from "lucide-react"
import FallingIconsBackground from "@/components/FallingIconsBackground"

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background relative">
      <FallingIconsBackground />
      <div className="container mx-auto px-4 py-8 max-w-6xl relative z-10">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="flex justify-center mb-8">
            <div className="relative">
              <Heart className="w-20 h-20 text-primary animate-float bg-gradient-to-r from-[#f46b45] to-[#eea849] bg-clip-text" fill="currentColor" />
              <Sparkles className="w-8 h-8 text-accent absolute -top-2 -right-2 animate-pulse-soft" />
            </div>
          </div>
          <h1 className="text-5xl md:text-7xl font-bold text-foreground mb-6 leading-tight">
            Discover Your
            <span className="text-primary block">Perfect Match</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed mb-8">
            Unlock the secrets of compatibility with our comprehensive analysis using zodiac signs, MBTI, blood types,
            and more. Find out if you're meant to be together.
          </p>
          <Link href="/generate">
            <Button
              size="lg"
              className="text-lg px-12 py-6 rounded-md bg-primary hover:bg-primary/90 text-primary-foreground border-0 transition-all duration-300 hover:scale-105"
            >
              Start Your Love Journey
              <ArrowRight className="w-6 h-6 ml-2" />
            </Button>
          </Link>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <Card className="border-0 bg-card rounded-md p-8 text-center transition-all duration-300 hover:scale-105">
            <CardHeader className="pb-4">
              <div className="w-16 h-16 bg-primary rounded-md flex items-center justify-center mx-auto mb-4">
                <Star className="w-8 h-8 text-primary-foreground" />
              </div>
              <CardTitle className="text-xl text-foreground">Multiple Systems</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-base leading-relaxed">
                Analyze compatibility through zodiac signs, MBTI, blood types, Chinese zodiac, and more fortune-telling
                systems.
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="border-0 bg-card rounded-md p-8 text-center transition-all duration-300 hover:scale-105">
            <CardHeader className="pb-4">
              <div className="w-16 h-16 bg-secondary rounded-md flex items-center justify-center mx-auto mb-4">
                <Zap className="w-8 h-8 text-secondary-foreground" />
              </div>
              <CardTitle className="text-xl text-foreground">AI-Powered</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-base leading-relaxed">
                Our advanced AI analyzes your data and provides personalized insights about your relationship
                compatibility.
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="border-0 bg-card rounded-md p-8 text-center transition-all duration-300 hover:scale-105">
            <CardHeader className="pb-4">
              <div className="w-16 h-16 bg-accent rounded-md flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-accent-foreground" />
              </div>
              <CardTitle className="text-xl text-foreground">Share Results</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-base leading-relaxed">
                Get beautiful, shareable results perfect for Instagram stories and discussing with your partner.
              </CardDescription>
            </CardContent>
          </Card>
        </div>

        {/* How It Works */}
        <Card className="border-0 bg-secondary/20 rounded-md p-12 mb-16">
          <CardHeader className="text-center pb-8">
            <CardTitle className="text-3xl text-foreground mb-4">How It Works</CardTitle>
            <CardDescription className="text-lg max-w-2xl mx-auto">
              Get your compatibility results in just three simple steps
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-primary text-primary-foreground rounded-md flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
                  1
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-2">Enter Your Info</h3>
                <p className="text-muted-foreground">
                  Fill in what you know about both people - zodiac signs, MBTI, blood types, and more.
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-secondary text-secondary-foreground rounded-md flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
                  2
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-2">AI Analysis</h3>
                <p className="text-muted-foreground">
                  Our AI analyzes your compatibility across multiple fortune-telling systems.
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-accent text-accent-foreground rounded-md flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
                  3
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-2">Get Results</h3>
                <p className="text-muted-foreground">
                  Receive detailed compatibility insights and share them with your partner.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* CTA Section */}
        <div className="text-center mb-16">
          <Card className="border-0 bg-primary/10 rounded-md p-12">
            <CardContent className="pt-0">
              <h2 className="text-4xl font-bold text-foreground mb-4">Ready to Find Out?</h2>
              <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                Don't wait any longer. Discover if you and your special someone are truly compatible.
              </p>
              <Link href="/generate">
                <Button
                  size="lg"
                  className="text-lg px-12 py-6 rounded-md bg-primary hover:bg-primary/90 text-primary-foreground border-0 transition-all duration-300 hover:scale-105"
                >
                  <Heart className="w-6 h-6 mr-2" fill="currentColor" />
                  Test Your Compatibility Now
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>

        {/* Footer */}
        <footer className="text-center pt-8 border-t border-border">
          <div className="flex flex-wrap justify-center gap-6 mb-4">
            <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
              About
            </a>
            <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
              Privacy
            </a>
            <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
              Instagram
            </a>
          </div>
          <p className="text-sm text-muted-foreground">Made with ❤️ for finding love and compatibility</p>
        </footer>
      </div>
    </div>
  )
}
