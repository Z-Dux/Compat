"use client"

import { useState, useCallback, useMemo } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Heart, ArrowLeft, ChevronLeft, ChevronRight, AlertCircle, Loader2 } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { Checkbox } from "@/components/ui/checkbox"
import { Textarea } from "@/components/ui/textarea"

interface PersonData {
  nickname: string
  zodiacSign: string
  bloodType: string
  mbti: string
  fourPillars: string
  kuseiKigaku: string
  rokuseiAstrology: string
  sanmeigaku: string
  chineseZodiac: string
  enneagram: string
  animalHoroscope: string
  aboutMe: string
  isMe?: boolean | string
  above30: boolean;
}

const cardSteps = [
  { id: "names", title: "Names", imagePath: "/malheadshot.png", alt: "/femheadshot.png" },
  { id: "zodiac", title: "Zodiac", imagePath: "/zodiac.png" },
  { id: "blood-mbti", title: "Blood & MBTI", imagePath: "/mbloodmbti.png", alt: "/fbloodmbti.png" },
  { id: "enneagram-pillars", title: "Enneagram & Pillars", imagePath: "/pillarenneag.png" },
  { id: "japanese-systems", title: "Japanese Systems", imagePath: "/kusei.png", alt: "/fkusei.png" },
  { id: "animal-horoscope", title: "Animal Horoscope", imagePath: "/manimal.png", alt: "/fanimal.png" },
  { id: "about-me", title: "About Me", imagePath: "/about.png" },
]

export default function GeneratePage() {
  const [currentStep, setCurrentStep] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)
  const [animationDirection, setAnimationDirection] = useState<"forward" | "backward">("forward")

  const [person1, setPerson1] = useState<PersonData>({
    nickname: "",
    zodiacSign: "",
    bloodType: "",
    mbti: "",
    fourPillars: "",
    kuseiKigaku: "",
    rokuseiAstrology: "",
    sanmeigaku: "",
    chineseZodiac: "",
    enneagram: "",
    animalHoroscope: "",
    aboutMe: "",
    isMe: false,
    above30: false
  })

  const [person2, setPerson2] = useState<PersonData>({
    nickname: "",
    zodiacSign: "",
    bloodType: "",
    mbti: "",
    fourPillars: "",
    kuseiKigaku: "",
    rokuseiAstrology: "",
    sanmeigaku: "",
    chineseZodiac: "",
    enneagram: "",
    animalHoroscope: "",
    aboutMe: "",
    above30: false
  })

  const [errors, setErrors] = useState<string[]>([])
  const [isSubmitting, setIsSubmitting] = useState(false)
  const router = useRouter()

  const nextStep = () => {
    if (currentStep < cardSteps.length - 1 && !isAnimating) {
      setAnimationDirection("forward")
      setIsAnimating(true)
      setTimeout(() => {
        setCurrentStep(currentStep + 1)
        setTimeout(() => {
          setIsAnimating(false)
        }, 100)
      }, 400)
    }
  }

  const prevStep = () => {
    if (currentStep > 0 && !isAnimating) {
      setAnimationDirection("backward")
      setIsAnimating(true)
      setTimeout(() => {
        setCurrentStep(currentStep - 1)
        setTimeout(() => {
          setIsAnimating(false)
        }, 100)
      }, 400)
    }
  }

  const validateForm = () => {
    const newErrors: string[] = []

    if (!person1.nickname.trim()) {
      newErrors.push("Person 1 nickname is required")
    }
    if (!person2.nickname.trim()) {
      newErrors.push("Person 2 nickname is required")
    }
    console.log(person1, person2)
    const person1Fields = Object.entries(person1).filter(([key, value]) => key !== "nickname" && value && value?.trim() !== "")
    const person2Fields = Object.entries(person2).filter(([key, value]) => key !== "nickname" && value && value?.trim() !== "")

    if (person1Fields.length === 0) {
      newErrors.push("Please fill at least one field besides nickname for Person 1")
    }
    if (person2Fields.length === 0) {
      newErrors.push("Please fill at least one field besides nickname for Person 2")
    }

    setErrors(newErrors)
    return newErrors.length === 0
  }

  const handleSubmit = async () => {
    if (validateForm()) {
      setIsSubmitting(true)

      await new Promise((resolve) => setTimeout(resolve, 800))

      const params = new URLSearchParams()

      Object.entries(person1).forEach(([key, value]) => {
        if (value && value.trim()) {
          params.append(`person1_${key}`, value)
        }
      })

      Object.entries(person2).forEach(([key, value]) => {
        if (value && value.trim()) {
          params.append(`person2_${key}`, value)
        }
      })

      router.push(`/results?${params.toString()}`)
    }
  }

  const updatePerson1 = useCallback(
    (field: keyof PersonData, value: string) => {
      if (errors.length > 0) {
        setErrors([])
      }
      setPerson1((prev) => {
        const newData = { ...prev, [field]: value }
        if (field === "isMe" && value === "true") {
          setPerson2((prev2) => ({ ...prev2, isMe: false }))
        }
        return newData
      })
    },
    [errors.length],
  )

  const updatePerson2 = useCallback(
    (field: keyof PersonData, value: string) => {
      if (errors.length > 0) {
        setErrors([])
      }
      setPerson2((prev) => {
        const newData = { ...prev, [field]: value }
        if (field === "isMe" && value === "true") {
          setPerson1((prev1) => ({ ...prev1, isMe: false }))
        }
        return newData
      })
    },
    [errors.length],
  )

  const zodiacSigns = [
    "Aries",
    "Taurus",
    "Gemini",
    "Cancer",
    "Leo",
    "Virgo",
    "Libra",
    "Scorpio",
    "Sagittarius",
    "Capricorn",
    "Aquarius",
    "Pisces",
  ]
  const bloodTypes = ["A", "B", "AB", "O"]
  const mbtiTypes = [
    "INTJ",
    "INTP",
    "ENTJ",
    "ENTP",
    "INFJ",
    "INFP",
    "ENFJ",
    "ENFP",
    "ISTJ",
    "ISFJ",
    "ESTJ",
    "ESFJ",
    "ISTP",
    "ISFP",
    "ESTP",
    "ESFP",
  ]
  const chineseZodiacs = [
    "Rat",
    "Ox",
    "Tiger",
    "Rabbit",
    "Dragon",
    "Snake",
    "Horse",
    "Goat",
    "Monkey",
    "Rooster",
    "Dog",
    "Pig",
  ]
  const enneagramTypes = ["1", "2", "3", "4", "5", "6", "7", "8", "9"]

  const NamesFields = useCallback(
    ({
      data,
      onChange,
      personNumber,
    }: {
      data: PersonData
      onChange: (field: keyof PersonData, value: string) => void
      personNumber: 1 | 2
    }) => (
      <div className="space-y-4">
        <div className="space-y-2">
          <Label className="text-sm font-medium">ニックネーム</Label>
          <Input
            placeholder="ニックネームを入力"
            value={data.nickname}
            onChange={(e) => onChange("nickname", e.target.value)}
            className="rounded-sm border-2 border-foreground h-10 bg-background focus:ring-2 focus:ring-primary/20"
          />
        </div>
        <div className="space-y-2">
          <Label className="text-sm font-medium">年齢</Label>
            <Select
            value={data.above30 ? "above30" : "under30"}
            onValueChange={(value) => onChange("above30", value === "above30" ? "true" : "false")}
            >
            <SelectTrigger className="rounded-sm border-2 border-foreground h-10 bg-background">
              <SelectValue placeholder="年齢層を選択" />
            </SelectTrigger>
            <SelectContent className="rounded-sm border-2 border-foreground">
              <SelectItem value="under30">30歳未満</SelectItem>
              <SelectItem value="above30">30歳以上</SelectItem>
            </SelectContent>
            </Select>
        </div>
        <div className="flex items-center space-x-3 p-2 rounded-sm border border-muted">
          <Checkbox
            id={`isMe-${personNumber}`}
            checked={data.isMe === true || data.isMe === "true"}
            onCheckedChange={(checked) => {
              onChange("isMe", checked ? "true" : "")
            }}
            disabled={
              (personNumber === 1 && person2.isMe === "true") || (personNumber === 2 && person1.isMe === "true")
            }
            className="w-5 h-5 border-2 border-foreground rounded-sm data-[state=checked]:bg-primary data-[state=checked]:border-primary"
          />
          <Label htmlFor={`isMe-${personNumber}`} className="text-sm font-medium cursor-pointer select-none">
            自分です
          </Label>
        </div>
      </div>
    ),
    [person1.isMe, person2.isMe],
  )

  const ZodiacFields = useCallback(
    ({
      data,
      onChange,
    }: {
      data: PersonData
      onChange: (field: keyof PersonData, value: string) => void
    }) => (
      <div className="space-y-2">
        <Label className="text-sm font-medium">星座</Label>
        <Select value={data.zodiacSign} onValueChange={(value) => onChange("zodiacSign", value)}>
          <SelectTrigger className="rounded-sm border-2 border-foreground h-10 bg-background">
            <SelectValue placeholder="星座を選択" />
          </SelectTrigger>
          <SelectContent className="rounded-sm border-2 border-foreground">
            {zodiacSigns.map((sign) => (
              <SelectItem key={sign} value={sign}>
                {sign}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    ),
    [],
  )

  const BloodMbtiFields = useCallback(
    ({
      data,
      onChange,
    }: {
      data: PersonData
      onChange: (field: keyof PersonData, value: string) => void
    }) => (
      <div className="flex space-x-4">
        <div className="flex-1 space-y-2">
          <Label className="text-sm font-medium">血液型</Label>
          <Select value={data.bloodType} onValueChange={(value) => onChange("bloodType", value)}>
            <SelectTrigger className="rounded-sm border-2 border-foreground h-10 bg-background">
              <SelectValue placeholder="血液型を選択" />
            </SelectTrigger>
            <SelectContent className="rounded-sm border-2 border-foreground">
              {bloodTypes.map((type) => (
                <SelectItem key={type} value={type}>
                  {type}型
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="flex-1 space-y-2">
          <Label className="text-sm font-medium">MBTI</Label>
          <Select value={data.mbti} onValueChange={(value) => onChange("mbti", value)}>
            <SelectTrigger className="rounded-sm border-2 border-foreground h-10 bg-background">
              <SelectValue placeholder="MBTIを選択" />
            </SelectTrigger>
            <SelectContent className="rounded-sm border-2 border-foreground">
              {mbtiTypes.map((type) => (
                <SelectItem key={type} value={type}>
                  {type}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
    ),
    [],
  )

  const EnneagramPillarsFields = useCallback(
    ({
      data,
      onChange,
    }: {
      data: PersonData
      onChange: (field: keyof PersonData, value: string) => void
    }) => (
      <div className="space-y-3">
        <div className="space-y-2">
          <Label className="text-sm font-medium">エニアグラム</Label>
          <Select value={data.enneagram} onValueChange={(value) => onChange("enneagram", value)}>
            <SelectTrigger className="rounded-sm border-2 border-foreground h-10 bg-background">
              <SelectValue placeholder="タイプを選択" />
            </SelectTrigger>
            <SelectContent className="rounded-sm border-2 border-foreground">
              {enneagramTypes.map((type) => (
                <SelectItem key={type} value={type}>
                  タイプ {type}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label className="text-sm font-medium">四柱推命</Label>
          <Input
            placeholder="分かれば入力"
            value={data.fourPillars}
            onChange={(e) => onChange("fourPillars", e.target.value)}
            className="rounded-sm border-2 border-foreground h-10 bg-background"
          />
        </div>
      </div>
    ),
    [],
  )

  const JapaneseSystemsFields = useCallback(
    ({
      data,
      onChange,
    }: {
      data: PersonData
      onChange: (field: keyof PersonData, value: string) => void
    }) => (
      <div className="space-y-3">
        <div className="space-y-2">
          <Label className="text-sm font-medium">九星気学</Label>
          <Input
            placeholder="分かれば入力"
            value={data.kuseiKigaku}
            onChange={(e) => onChange("kuseiKigaku", e.target.value)}
            className="rounded-sm border-2 border-foreground h-10 bg-background"
          />
        </div>
        <div className="space-y-2">
          <Label className="text-sm font-medium">六星占術</Label>
          <Input
            placeholder="分かれば入力"
            value={data.rokuseiAstrology}
            onChange={(e) => onChange("rokuseiAstrology", e.target.value)}
            className="rounded-sm border-2 border-foreground h-10 bg-background"
          />
        </div>
        <div className="space-y-2">
          <Label className="text-sm font-medium">算命学</Label>
          <Input
            placeholder="分かれば入力"
            value={data.sanmeigaku}
            onChange={(e) => onChange("sanmeigaku", e.target.value)}
            className="rounded-sm border-2 border-foreground h-10 bg-background"
          />
        </div>
      </div>
    ),
    [],
  )

  const AnimalHoroscopeFields = useCallback(
    ({
      data,
      onChange,
    }: {
      data: PersonData
      onChange: (field: keyof PersonData, value: string) => void
    }) => (
      <div className="space-y-2">
        <Label className="text-sm font-medium">動物占い</Label>
        <Input
          placeholder="分かれば入力"
          value={data.animalHoroscope}
          onChange={(e) => onChange("animalHoroscope", e.target.value)}
          className="rounded-sm border-2 border-foreground h-10 bg-background"
        />
      </div>
    ),
    [],
  )

  const AboutMeFields = useCallback(
    ({
      data,
      onChange,
      personNumber,
    }: {
      data: PersonData
      onChange: (field: keyof PersonData, value: string) => void
      personNumber: 1 | 2
    }) => (
      <div className="space-y-2">
        <Label className="text-sm font-medium">
          {personNumber === 1 ? "自己紹介" : "理想の相手像"}
        </Label>
        <Textarea
          placeholder={
            personNumber === 1
              ? "あなた自身や性格、趣味などを教えてください..."
              : "理想の相手について教えてください..."
          }
          value={data.aboutMe}
          onChange={(e) => onChange("aboutMe", e.target.value)}
          className="rounded-sm border-2 border-foreground bg-background focus:ring-2 focus:ring-primary/20 min-h-[100px] resize-none"
          rows={4}
        />
      </div>
    ),
    [],
  )

  const renderImage = (step: number, num: number) => {
    return num == 2 && cardSteps[step].alt ? cardSteps[step].alt : cardSteps[step].imagePath
  }

  const PersonCard = useMemo(() => {
    return ({
      personNumber,
      data,
      onChange,
      showNavigation,
    }: {
      personNumber: 1 | 2
      data: PersonData
      onChange: (field: keyof PersonData, value: string) => void
      showNavigation: "left" | "right" | "none"
    }) => {
      const currentStepData = cardSteps[currentStep]
      const isBlue = personNumber === 1

      return (
        <div
          className="relative w-full max-w-sm mx-auto"
        >
          {showNavigation === "left" && currentStep > 0 && (
            <button
              onClick={prevStep}
              className="absolute -left-4 cursor-pointer top-4 z-10 w-12 h-12 bg-background border-2 border-foreground rounded-sm flex items-center justify-center hover:bg-muted transition-all duration-300 hover:scale-110 hover:-translate-x-1 disabled:opacity-50"
              disabled={isAnimating}
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
          )}

          {showNavigation === "right" && currentStep < cardSteps.length - 1 && (
            <button
              onClick={nextStep}
              className="cursor-pointer absolute -right-4 top-4 z-10 w-12 h-12 bg-background border-2 border-foreground rounded-sm flex items-center justify-center hover:bg-muted transition-all duration-300 hover:scale-110 hover:translate-x-1 disabled:opacity-50"
              disabled={isAnimating}
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          )}

          <div
            className={`bg-background border-2 border-foreground rounded-sm p-6 h-min-96 flex flex-col transition-all duration-300 hover:scale-[1.02] ${
              isBlue ? "ring-4 ring-blue-200" : "ring-4 ring-pink-200"
            }`}
          >
            <div className="text-center mb-4">
              <h3
                className={`text-lg font-bold transition-colors duration-300 ${isBlue ? "text-blue-600" : "text-pink-600"}`}
              >
                {personNumber === 1 ? "Boy" : "Girl"}
              </h3>
            </div>

            <div className="flex justify-center mb-4">
              <div className="w-40 h-40 border-2 border-foreground rounded-full bg-muted flex items-center justify-center overflow-hidden transition-all duration-300 hover:scale-105">
                <Image
                  src={renderImage(currentStep, personNumber) || "/placeholder.svg"}
                  alt="image"
                  width={160}
                  height={160}
                  className="w-full h-full object-cover rounded-full transition-all duration-500"
                  style={{
                    transform: isAnimating ? "scale(0.8) rotate(5deg)" : "scale(1) rotate(0deg)",
                  }}
                />
              </div>
            </div>

            <div className="flex-1 space-y-3">
              {currentStep === 0 && <NamesFields data={data} onChange={onChange} personNumber={personNumber} />}
              {currentStep === 1 && <ZodiacFields data={data} onChange={onChange} />}
              {currentStep === 2 && <BloodMbtiFields data={data} onChange={onChange} />}
              {currentStep === 3 && <EnneagramPillarsFields data={data} onChange={onChange} />}
              {currentStep === 4 && <JapaneseSystemsFields data={data} onChange={onChange} />}
              {currentStep === 5 && <AnimalHoroscopeFields data={data} onChange={onChange} />}
              {currentStep === 6 && <AboutMeFields data={data} onChange={onChange} personNumber={personNumber} />}
            </div>
          </div>
        </div>
      )
    }
  }, [
    currentStep,
    isAnimating,
    animationDirection,
    NamesFields,
    ZodiacFields,
    BloodMbtiFields,
    EnneagramPillarsFields,
    JapaneseSystemsFields,
    AnimalHoroscopeFields,
    AboutMeFields,
  ])

  return (
    <div className="min-h-screen bg-background">
      <style jsx>{`
        @keyframes pulse-glow {
          0%, 100% { box-shadow: 0 0 5px rgba(255, 179, 71, 0.3); }
          50% { box-shadow: 0 0 20px rgba(255, 179, 71, 0.6); }
        }
      `}</style>

      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="mb-8">
          <Link href="/">
            <Button variant="ghost" className="mb-4 text-muted-foreground hover:text-foreground rounded-sm">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Button>
          </Link>
        </div>

        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">{cardSteps[currentStep].title}</h1>
          <p className="text-muted-foreground">
            Step {currentStep + 1} of {cardSteps.length}
          </p>
        </div>

        <div className="flex justify-center mb-8">
          <div className="flex space-x-2">
            {cardSteps.map((_, index) => (
              <div
                key={index}
                className={`w-3 h-3 rounded-full border-2 border-foreground transition-all duration-500 ${
                  index <= currentStep ? "bg-primary" : "bg-background"
                } ${index === currentStep ? "animate-pulse" : ""}`}
                style={{
                  animation: index === currentStep ? "pulse-glow 2s ease-in-out infinite" : "none",
                }}
              />
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <PersonCard personNumber={1} data={person1} onChange={updatePerson1} showNavigation="left" />
          <PersonCard personNumber={2} data={person2} onChange={updatePerson2} showNavigation="right" />
        </div>

        {errors.length > 0 && (
          <Alert className="mb-8 border-destructive/50 bg-destructive/5 rounded-sm border-2">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              <div className="space-y-1">
                {errors.map((error, index) => (
                  <p key={index} className="text-destructive text-sm font-medium">
                    • {error}
                  </p>
                ))}
              </div>
            </AlertDescription>
          </Alert>
        )}

        {currentStep === cardSteps.length - 1 && (
          <div className="text-center">
            <Button
              onClick={handleSubmit}
              disabled={isSubmitting}
              size="lg"
              className="text-lg px-12 py-6 rounded-sm bg-primary hover:bg-primary/90 text-primary-foreground border-2 border-foreground transition-all duration-300 hover:scale-105 disabled:opacity-50 animate-pulse"
              style={{
                animation: !isSubmitting ? "pulse-glow 3s ease-in-out infinite" : "none",
              }}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                  診断中...
                </>
              ) : (
                <>
                  <Heart className="w-5 h-5 mr-2" fill="currentColor" />
                  診断結果を表示
                </>
              )}
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
