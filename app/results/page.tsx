"use client"

import { Suspense, useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Heart, ArrowLeft, Sparkles, Users, AlertTriangle, CheckCircle, Loader2 } from "lucide-react"
import Link from "next/link"
import { SocialShare } from "@/components/social-share"

interface CompatibilityData {
  person1: {
    nickname: string
    profile: string
  }
  person2: {
    nickname: string
    profile: string
  }
  compatibilityPoints: string[]
  cautionPoints: string[]
  overallPercentage: number
  overallReview: string
}

function ResultsContent() {
  const searchParams = useSearchParams()
  const [compatibilityData, setCompatibilityData] = useState<CompatibilityData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchCompatibilityData = async () => {
      try {
        // Get all the form data from URL params
        const formData = {
          person1: {
            nickname: searchParams.get("person1_nickname") || "",
            zodiacSign: searchParams.get("person1_zodiacSign") || "",
            bloodType: searchParams.get("person1_bloodType") || "",
            mbti: searchParams.get("person1_mbti") || "",
            fourPillars: searchParams.get("person1_fourPillars") || "",
            kuseiKigaku: searchParams.get("person1_kuseiKigaku") || "",
            rokuseiAstrology: searchParams.get("person1_rokuseiAstrology") || "",
            sanmeigaku: searchParams.get("person1_sanmeigaku") || "",
            chineseZodiac: searchParams.get("person1_chineseZodiac") || "",
            enneagram: searchParams.get("person1_enneagram") || "",
            animalHoroscope: searchParams.get("person1_animalHoroscope") || "",
          },
          person2: {
            nickname: searchParams.get("person2_nickname") || "",
            zodiacSign: searchParams.get("person2_zodiacSign") || "",
            bloodType: searchParams.get("person2_bloodType") || "",
            mbti: searchParams.get("person2_mbti") || "",
            fourPillars: searchParams.get("person2_fourPillars") || "",
            kuseiKigaku: searchParams.get("person2_kuseiKigaku") || "",
            rokuseiAstrology: searchParams.get("person2_rokuseiAstrology") || "",
            sanmeigaku: searchParams.get("person2_sanmeigaku") || "",
            chineseZodiac: searchParams.get("person2_chineseZodiac") || "",
            enneagram: searchParams.get("person2_enneagram") || "",
            animalHoroscope: searchParams.get("person2_animalHoroscope") || "",
          },
        }

        const response = await fetch("/api/analyze-compatibility", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        })

        if (!response.ok) {
          throw new Error("Failed to analyze compatibility")
        }

        const data = await response.json()
        console.log(data)
        setCompatibilityData(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred")
      } finally {
        setLoading(false)
      }
    }

    fetchCompatibilityData()
  }, [searchParams])

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-card to-secondary/10 flex items-center justify-center p-4">
        <div className="text-center max-w-md">
          <div className="relative mb-6">
            <Heart className="w-16 h-16 text-primary mx-auto animate-pulse" fill="currentColor" />
            <Sparkles className="w-6 h-6 text-accent absolute top-0 right-1/2 translate-x-8 animate-bounce" />
          </div>
          <div className="space-y-3">
            <p className="font-manrope text-lg text-muted-foreground">Analyzing your compatibility...</p>
            <p className="font-manrope text-sm text-muted-foreground">
              Our AI is carefully examining your personalities and traits
            </p>
            <div className="flex items-center justify-center gap-2 mt-4">
              <Loader2 className="w-4 h-4 animate-spin text-primary" />
              <span className="text-sm text-primary font-medium">This may take a few moments</span>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (error || !compatibilityData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-card to-secondary/10 flex items-center justify-center p-4">
        <div className="text-center max-w-md">
          <AlertTriangle className="w-16 h-16 text-destructive mx-auto mb-6" />
          <Alert className="mb-6">
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription className="font-manrope">
              {error || "Failed to load compatibility results. Please try again."}
            </AlertDescription>
          </Alert>
          <Link href="/">
            <Button className="rounded-xl">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Test
            </Button>
          </Link>
        </div>
      </div>
    )
  }

  const getPercentageColor = (percentage: number) => {
    if (percentage >= 80) return "text-green-600"
    if (percentage >= 60) return "text-primary"
    if (percentage >= 40) return "text-accent"
    return "text-muted-foreground"
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-card to-secondary/10">
      <div className="container mx-auto px-4 py-6 sm:py-8 max-w-5xl">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6 sm:mb-8">
          <Link href="/">
            <Button variant="outline" size="sm" className="rounded-xl bg-transparent hover:bg-card transition-colors">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Test
            </Button>
          </Link>
          <SocialShare
            person1Name={compatibilityData.person1.nickname}
            person2Name={compatibilityData.person2.nickname}
            compatibilityPercentage={compatibilityData.overallPercentage}
            size="sm"
          />
        </div>

        <div className="text-center mb-8 sm:mb-12">
          <div className="flex justify-center mb-4 sm:mb-6">
            <div className="relative">
              <Heart className="w-12 h-12 sm:w-16 sm:h-16 text-primary animate-pulse" fill="currentColor" />
              <Sparkles className="w-4 h-4 sm:w-6 sm:h-6 text-accent absolute -top-1 -right-1 animate-bounce" />
            </div>
          </div>
          <h1 className="font-geist text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-3 sm:mb-4">
            Compatibility Results
          </h1>
          <p className="font-manrope text-base sm:text-lg text-muted-foreground">
            {compatibilityData.person1.nickname} & {compatibilityData.person2.nickname}
          </p>
        </div>

        <Card className="mb-6 sm:mb-8 bg-gradient-to-r from-primary/5 to-accent/5 border-primary/20 shadow-lg">
          <CardContent className="pt-6 sm:pt-8 pb-6 sm:pb-8">
            <div className="text-center">
              <div className="mb-6">
                <div
                  className={`text-4xl sm:text-6xl font-bold ${getPercentageColor(compatibilityData.overallPercentage)} mb-4 animate-pulse`}
                >
                  {compatibilityData.overallPercentage}%
                </div>
                <div className="w-full max-w-md mx-auto mb-4">
                  <Progress
                    value={compatibilityData.overallPercentage}
                    className="h-3 rounded-full transition-all duration-1000 ease-out"
                  />
                </div>
                <Badge variant="secondary" className="text-base sm:text-lg px-4 py-2 rounded-xl shadow-md">
                  {compatibilityData.overallPercentage >= 80
                    ? "Excellent Match"
                    : compatibilityData.overallPercentage >= 60
                      ? "Great Compatibility"
                      : compatibilityData.overallPercentage >= 40
                        ? "Good Potential"
                        : "Needs Work"}
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 mb-6 sm:mb-8">
          <Card className="transition-all duration-200 hover:shadow-lg">
            <CardHeader className="pb-3">
              <CardTitle className="font-geist text-lg sm:text-xl text-primary flex items-center gap-2">
                <Users className="w-5 h-5" />
                {compatibilityData.person1.nickname}
              </CardTitle>
              <CardDescription className="font-manrope">Personal Profile</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="font-manrope text-sm leading-relaxed text-foreground">
                {compatibilityData.person1.profile}
              </p>
            </CardContent>
          </Card>

          <Card className="transition-all duration-200 hover:shadow-lg">
            <CardHeader className="pb-3">
              <CardTitle className="font-geist text-lg sm:text-xl text-primary flex items-center gap-2">
                <Users className="w-5 h-5" />
                {compatibilityData.person2.nickname}
              </CardTitle>
              <CardDescription className="font-manrope">Personal Profile</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="font-manrope text-sm leading-relaxed text-foreground">
                {compatibilityData.person2.profile}
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Compatibility Points */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="font-geist text-xl text-green-600 flex items-center">
              <CheckCircle className="w-5 h-5 mr-2" />
              Compatibility Strengths
            </CardTitle>
            <CardDescription>7 reasons why you work well together</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {compatibilityData.compatibilityPoints.map((point, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-sm font-bold mt-0.5">
                    {index + 1}
                  </div>
                  <p className="font-manrope text-sm leading-relaxed text-foreground flex-1">{point}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Caution Points */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="font-geist text-xl text-amber-600 flex items-center">
              <AlertTriangle className="w-5 h-5 mr-2" />
              Areas to Watch
            </CardTitle>
            <CardDescription>3 things to be mindful of in your relationship</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {compatibilityData.cautionPoints.map((point, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-amber-100 text-amber-600 rounded-full flex items-center justify-center text-sm font-bold mt-0.5">
                    !
                  </div>
                  <p className="font-manrope text-sm leading-relaxed text-foreground flex-1">{point}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Overall Review */}
        <Card className="mb-8 bg-gradient-to-r from-primary/5 to-accent/5 border-primary/20">
          <CardHeader>
            <CardTitle className="font-geist text-xl text-primary flex items-center">
              <Heart className="w-5 h-5 mr-2" fill="currentColor" />
              Overall Assessment
            </CardTitle>
            <CardDescription>Our comprehensive analysis of your compatibility</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="font-manrope leading-relaxed text-foreground">{compatibilityData.overallReview}</p>
          </CardContent>
        </Card>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
          <SocialShare
            person1Name={compatibilityData.person1.nickname}
            person2Name={compatibilityData.person2.nickname}
            compatibilityPercentage={compatibilityData.overallPercentage}
            size="lg"
          />
          <Link href="/">
            <Button
              variant="outline"
              size="lg"
              className="font-geist px-6 sm:px-8 py-3 rounded-xl bg-transparent hover:bg-card transition-colors w-full sm:w-auto"
            >
              Take Another Test
            </Button>
          </Link>
        </div>

        <footer className="mt-12 sm:mt-16 pt-6 sm:pt-8 border-t border-border text-center">
          <p className="font-manrope text-xs sm:text-sm text-muted-foreground px-4 leading-relaxed">
            Results are for entertainment purposes. Real relationships require communication, understanding, and effort
            from both people.
          </p>
        </footer>
      </div>
    </div>
  )
}

export default function ResultsPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-gradient-to-br from-background via-card to-secondary/10 flex items-center justify-center">
          <div className="text-center">
            <Heart className="w-16 h-16 text-primary mx-auto mb-4 animate-pulse" fill="currentColor" />
            <p className="font-manrope text-lg text-muted-foreground">Loading your compatibility results...</p>
          </div>
        </div>
      }
    >
      <ResultsContent />
    </Suspense>
  )
}
