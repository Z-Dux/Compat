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
            理想の相性を
            <span className="text-primary block">見つけよう</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed mb-8">
            星座、MBTI、血液型などを使った総合診断で、二人の本当の相性を見つけましょう。
            運命の人かどうか、今すぐチェック！
          </p>
          <Link href="/generate">
            <Button
              size="lg"
              className="text-lg px-12 py-6 rounded-md bg-primary hover:bg-primary/90 text-primary-foreground border-0 transition-all duration-300 hover:scale-105"
            >
              恋の相性診断を始める
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
              <CardTitle className="text-xl text-foreground">多彩な診断システム</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-base leading-relaxed">
                星座、MBTI、血液型、干支など、さまざまな占い・診断で相性を分析します。
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="border-0 bg-card rounded-md p-8 text-center transition-all duration-300 hover:scale-105">
            <CardHeader className="pb-4">
              <div className="w-16 h-16 bg-secondary rounded-md flex items-center justify-center mx-auto mb-4">
                <Zap className="w-8 h-8 text-secondary-foreground" />
              </div>
              <CardTitle className="text-xl text-foreground">独自ロジック診断</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-base leading-relaxed">
                あなたの情報をもとに、独自の診断ロジックで二人の関係性を分析します。
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="border-0 bg-card rounded-md p-8 text-center transition-all duration-300 hover:scale-105">
            <CardHeader className="pb-4">
              <div className="w-16 h-16 bg-accent rounded-md flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-accent-foreground" />
              </div>
              <CardTitle className="text-xl text-foreground">結果をシェア</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-base leading-relaxed">
                インスタやパートナーとの会話にぴったりな、シェアしやすい美しい診断結果が手に入ります。
              </CardDescription>
            </CardContent>
          </Card>
        </div>

        {/* How It Works */}
        <Card className="border-0 bg-secondary/20 rounded-md p-12 mb-16">
          <CardHeader className="text-center pb-8">
            <CardTitle className="text-3xl text-foreground mb-4">使い方</CardTitle>
            <CardDescription className="text-lg max-w-2xl mx-auto">
              3ステップで簡単に相性診断！
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-primary text-primary-foreground rounded-md flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
                  1
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-2">情報を入力</h3>
                <p className="text-muted-foreground">
                  二人の星座、MBTI、血液型など分かる範囲で入力してください。
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-secondary text-secondary-foreground rounded-md flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
                  2
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-2">診断ロジックによる分析</h3>
                <p className="text-muted-foreground">
                  独自の診断ロジックで複数のシステムを使い、二人の相性を分析します。
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-accent text-accent-foreground rounded-md flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
                  3
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-2">結果を受け取る</h3>
                <p className="text-muted-foreground">
                  詳細な診断結果を受け取り、パートナーとシェアしましょう。
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* CTA Section */}
        <div className="text-center mb-16">
          <Card className="border-0 bg-primary/10 rounded-md p-12">
            <CardContent className="pt-0">
              <h2 className="text-4xl font-bold text-foreground mb-4">さっそく診断してみよう！</h2>
              <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                今すぐあなたと大切な人の本当の相性をチェックしましょう。
              </p>
              <Link href="/generate">
                <Button
                  size="lg"
                  className="text-lg px-12 py-6 rounded-md bg-primary hover:bg-primary/90 text-primary-foreground border-0 transition-all duration-300 hover:scale-105"
                >
                  <Heart className="w-6 h-6 mr-2" fill="currentColor" />
                  今すぐ相性診断
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>

        {/* Footer */}
        <footer className="text-center pt-8 border-t border-border">
          <div className="flex flex-wrap justify-center gap-6 mb-4">
            <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
              このサイトについて
            </a>
            <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
              プライバシー
            </a>
            <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
              インスタグラム
            </a>
          </div>
          <p className="text-sm text-muted-foreground">恋と相性を見つけるために❤️で作りました</p>
        </footer>
      </div>
    </div>
  )
}
