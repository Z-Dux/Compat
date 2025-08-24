"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Share2, Instagram, MessageCircle, Copy, Check } from "lucide-react"
import { toast } from "@/hooks/use-toast"

interface SocialShareProps {
  person1Name: string
  person2Name: string
  compatibilityPercentage: number
  size?: "sm" | "lg"
}

export function SocialShare({ person1Name, person2Name, compatibilityPercentage, size = "lg" }: SocialShareProps) {
  const [copied, setCopied] = useState(false)

  const shareText = `${person1Name} & ${person2Name} are ${compatibilityPercentage}% compatible! 💕 Find out your compatibility too:`
  const shareUrl = typeof window !== "undefined" ? window.location.origin : ""

  const handleInstagramShare = () => {
    // Instagram doesn't support direct URL sharing, so we copy text for users to paste
    const instagramText = `${shareText} ${shareUrl}`
    navigator.clipboard.writeText(instagramText)
    toast({
      title: "Copied for Instagram!",
      description: "Text copied to clipboard. Paste it in your Instagram story or post!",
    })
  }

  const handleTwitterShare = () => {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`
    window.open(twitterUrl, "_blank", "width=550,height=420")
  }

  const handleLineShare = () => {
    const lineUrl = `https://social-plugins.line.me/lineit/share?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(shareText)}`
    window.open(lineUrl, "_blank", "width=550,height=420")
  }

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(`${shareText} ${shareUrl}`)
      setCopied(true)
      toast({
        title: "Link copied!",
        description: "Share link has been copied to your clipboard.",
      })
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      toast({
        title: "Failed to copy",
        description: "Please try again or copy the link manually.",
        variant: "destructive",
      })
    }
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          size={size}
          className={`font-geist rounded-xl bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 ${
            size === "lg" ? "px-8 py-3" : "px-4 py-2"
          }`}
        >
          <Share2 className={`${size === "lg" ? "w-5 h-5" : "w-4 h-4"} mr-2`} />
          Share Results
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="font-geist text-xl text-primary">Share Your Results</DialogTitle>
          <DialogDescription className="font-manrope">
            Let your friends know about your compatibility! Choose your favorite platform below.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          {/* Instagram - Priority #1 */}
          <Card className="border-pink-200 bg-gradient-to-r from-pink-50 to-purple-50">
            <CardContent className="p-4">
              <Button
                onClick={handleInstagramShare}
                variant="outline"
                className="w-full justify-start border-pink-300 hover:bg-pink-100 bg-transparent"
              >
                <Instagram className="w-5 h-5 mr-3 text-pink-600" />
                <div className="text-left">
                  <div className="font-semibold text-pink-700">Share on Instagram</div>
                  <div className="text-xs text-pink-600">Copy text for your story or post</div>
                </div>
              </Button>
            </CardContent>
          </Card>

          {/* X (Twitter) - Priority #2 */}
          <Card className="border-blue-200 bg-gradient-to-r from-blue-50 to-sky-50">
            <CardContent className="p-4">
              <Button
                onClick={handleTwitterShare}
                variant="outline"
                className="w-full justify-start border-blue-300 hover:bg-blue-100 bg-transparent"
              >
                <svg className="w-5 h-5 mr-3 text-blue-600" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
                <div className="text-left">
                  <div className="font-semibold text-blue-700">Share on X</div>
                  <div className="text-xs text-blue-600">Post directly to your timeline</div>
                </div>
              </Button>
            </CardContent>
          </Card>

          {/* LINE - Priority #3 */}
          <Card className="border-green-200 bg-gradient-to-r from-green-50 to-emerald-50">
            <CardContent className="p-4">
              <Button
                onClick={handleLineShare}
                variant="outline"
                className="w-full justify-start border-green-300 hover:bg-green-100 bg-transparent"
              >
                <MessageCircle className="w-5 h-5 mr-3 text-green-600" />
                <div className="text-left">
                  <div className="font-semibold text-green-700">Share on LINE</div>
                  <div className="text-xs text-green-600">Send to your LINE friends</div>
                </div>
              </Button>
            </CardContent>
          </Card>

          {/* Copy Link */}
          <Card className="border-gray-200 bg-gradient-to-r from-gray-50 to-slate-50">
            <CardContent className="p-4">
              <Button
                onClick={handleCopyLink}
                variant="outline"
                className="w-full justify-start border-gray-300 hover:bg-gray-100 bg-transparent"
              >
                {copied ? (
                  <Check className="w-5 h-5 mr-3 text-green-600" />
                ) : (
                  <Copy className="w-5 h-5 mr-3 text-gray-600" />
                )}
                <div className="text-left">
                  <div className="font-semibold text-gray-700">{copied ? "Copied!" : "Copy Link"}</div>
                  <div className="text-xs text-gray-600">Share anywhere you want</div>
                </div>
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Preview Text */}
        <div className="mt-6 p-4 bg-muted rounded-lg">
          <p className="text-sm font-medium text-muted-foreground mb-2">Preview:</p>
          <p className="text-sm font-manrope">{shareText}</p>
        </div>
      </DialogContent>
    </Dialog>
  )
}
