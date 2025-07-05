"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import {
    Sparkles,
    MapPin,
    Calendar,
    Users,
    Clock,
    RefreshCw,
    Copy,
    Check,
    Backpack,
    Camera,
    Thermometer,
    Mountain,
    Utensils,
    Shield,
    Info,
    Lightbulb,
    AlertTriangle,
} from "lucide-react"
import {Tour} from "@/types";

interface AITourismAdvisorProps {
    tourData: Tour
}

interface TourismAdvice {
    packingList: string[]
    weatherInfo: string
    fitnessRequirements: string
    culturalTips: string[]
    photographyTips: string[]
    safetyAdvice: string[]
    localInsights: string[]
    budgetTips: string[]
    bestTimeToVisit: string
    additionalActivities: string[]
}

export default function AITourismAdvisor({ tourData }: AITourismAdvisorProps) {
    const [isGenerating, setIsGenerating] = useState(false)
    const [tourismAdvice, setTourismAdvice] = useState<TourismAdvice | null>(null)
    const [copied, setCopied] = useState<string | null>(null)
    const [error, setError] = useState<string | null>(null)

    // Your Gemini API key - replace with your actual key
    const GEMINI_API_KEY = "AIzaSyAXf62pxwhsr6_feUf0NJkxS7bG6cXHkwY"

    const generateAdvice = async () => {
        setIsGenerating(true)
        setError(null)

        try {
            const prompt = `
        You are a professional travel advisor. Provide detailed recommendations and additional information for this tourism experience:
        
        Tour: ${tourData.title}
        Location: ${tourData.location}
        Duration: ${tourData.duration} days
        Price: $${tourData.price}
        Description: ${tourData.description}
        Included Services: ${tourData.includedServices}
        Excluded Services: ${tourData.excludedServices}
        Itinerary: ${tourData.itinerary}
        Meeting Point: ${tourData.meetingPoint}
        
        Respond in the following JSON format only:
        {
          "packingList": ["Essential items to bring - 8-10 important items"],
          "weatherInfo": "Detailed weather information and clothing recommendations",
          "fitnessRequirements": "Physical preparation requirements and recommendations",
          "culturalTips": ["Uzbek culture and local customs advice - 5-6 tips"],
          "photographyTips": ["Best photography locations and timing - 4-5 tips"],
          "safetyAdvice": ["Safety measures and precautions - 5-6 items"],
          "localInsights": ["Local information and interesting facts - 4-5 items"],
          "budgetTips": ["Money-saving and additional expense advice - 4-5 tips"],
          "bestTimeToVisit": "Best visiting time and reasons",
          "additionalActivities": ["Additional activities and attractions - 5-6 items"]
        }
        
        All responses should be in English, accurate and practical. Consider the specific characteristics of Chimgan Mountains and Uzbekistan.
      `

            const response = await fetch(
                "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "X-goog-api-key": GEMINI_API_KEY,
                    },
                    body: JSON.stringify({
                        contents: [
                            {
                                parts: [
                                    {
                                        text: prompt,
                                    },
                                ],
                            },
                        ],
                        generationConfig: {
                            temperature: 0.7,
                            topK: 40,
                            topP: 0.95,
                            maxOutputTokens: 2048,
                        },
                    }),
                },
            )

            if (!response.ok) {
                throw new Error(`API Error: ${response.status} ${response.statusText}`)
            }

            const data = await response.json()

            if (!data.candidates || !data.candidates[0] || !data.candidates[0].content) {
                throw new Error("Invalid response format from Gemini API")
            }

            const generatedText = data.candidates[0].content.parts[0].text

            // Clean and parse JSON response
            const cleanedText = generatedText
                .replace(/```json\n?|\n?```/g, "")
                .replace(/```\n?|\n?```/g, "")
                .trim()

            let advice: TourismAdvice

            try {
                advice = JSON.parse(cleanedText)
            } catch (parseError) {
                console.error("JSON Parse Error:", parseError)
                console.log("Raw response:", generatedText)
                throw new Error("Failed to parse AI response as JSON")
            }

            setTourismAdvice(advice)
        } catch (error) {
            console.error("Error generating advice:", error)
            setError(error instanceof Error ? error.message : "Failed to generate advice")

            // Fallback advice if API fails
            setTourismAdvice({
                packingList: [
                    "Sturdy hiking boots with ankle support",
                    "Layered clothing system (base, insulating, shell)",
                    "Waterproof rain jacket and pants",
                    "Sun hat and UV-protection sunglasses",
                    "High SPF sunscreen (30+ recommended)",
                    "Personal medications and first aid kit",
                    "Water bottles (minimum 2-3 liters capacity)",
                    "Portable power bank and charging cables",
                    "Headlamp with extra batteries",
                    "Personal hygiene essentials",
                ],
                weatherInfo:
                    "Chimgan Mountains experience variable weather conditions. Daytime temperatures range from 15°C to 25°C (59-77°F), while nights can drop to 5-10°C (41-50°F). Summer months are generally sunny but evenings remain cool. Rain is possible, so waterproof gear is essential. Layered clothing is the best approach - mornings are cool, midday can be warm, and evenings turn chilly again.",
                fitnessRequirements:
                    "Moderate physical fitness is required. Expect 4-6 hours of hiking daily with some steep sections. Begin regular walking exercises 2-3 weeks before your trip. If you have cardiovascular conditions, consult your doctor. Mountain altitude may cause mild breathing difficulties for some visitors.",
                culturalTips: [
                    "Respect local customs - handshakes are common when greeting",
                    "Dress modestly near mosques and religious sites",
                    "Try local cuisine - plov (pilaf), manti, and fresh bread",
                    "Ask permission before photographing people",
                    "Support local economy by shopping at village stores",
                    "Learn basic Uzbek phrases: rahmat (thank you), salom (hello)",
                ],
                photographyTips: [
                    "Golden hour (sunrise/sunset) provides the best lighting",
                    "Chimgan peak offers spectacular panoramic views",
                    "Charvak Lake and mountain combination shots",
                    "Capture local life and cultural scenes",
                    "Night sky photography - minimal light pollution",
                ],
                safetyAdvice: [
                    "Always stay with your group, never hike alone",
                    "Monitor weather conditions constantly",
                    "Carry sufficient water and emergency snacks",
                    "Bring a comprehensive first aid kit",
                    "Keep communication devices charged",
                    "Follow local guidelines and restrictions",
                ],
                localInsights: [
                    "Chimgan means 'grassy' in the local language",
                    "Former popular Soviet-era ski resort destination",
                    "Local honey and dried fruits are exceptional",
                    "Charvak Lake is artificial, built in the 1970s",
                    "Ancient Kokand fortress ruins are nearby",
                ],
                budgetTips: [
                    "Buy food supplies from local markets",
                    "Share transportation costs with group members",
                    "Bring refillable water bottles",
                    "Choose local guesthouses over hotels",
                    "Purchase authentic handicrafts from local artisans",
                ],
                bestTimeToVisit:
                    "Best months are May through September. Summer (June-August) offers warmest weather but can be hot in valleys. Spring (April-May) and autumn (September-October) provide moderate temperatures. Winter months feature snow and cold, suitable for winter sports.",
                additionalActivities: [
                    "Swimming and water sports at Charvak Lake",
                    "Visit Beldersay ski resort (seasonal)",
                    "Explore Kokand fortress and museum",
                    "Visit local handicraft workshops",
                    "Mountain biking on designated trails",
                    "Paragliding and adventure sports",
                ],
            })
        } finally {
            setIsGenerating(false)
        }
    }

    const copySection = async (sectionName: string, content: string | string[]) => {
        const textToCopy = Array.isArray(content) ? content.join("\n• ") : content
        await navigator.clipboard.writeText(`${sectionName}:\n• ${textToCopy}`)
        setCopied(sectionName)
        setTimeout(() => setCopied(null), 2000)
    }

    const adviceSections = [
        {
            title: "Packing Essentials",
            icon: Backpack,
            key: "packingList" as keyof TourismAdvice,
        },
        {
            title: "Weather & Climate",
            icon: Thermometer,
            key: "weatherInfo" as keyof TourismAdvice,
        },
        {
            title: "Fitness Requirements",
            icon: Mountain,
            key: "fitnessRequirements" as keyof TourismAdvice,
        },
        {
            title: "Cultural Guidelines",
            icon: Users,
            key: "culturalTips" as keyof TourismAdvice,
        },
        {
            title: "Photography Tips",
            icon: Camera,
            key: "photographyTips" as keyof TourismAdvice,
        },
        {
            title: "Safety Measures",
            icon: Shield,
            key: "safetyAdvice" as keyof TourismAdvice,
        },
        {
            title: "Local Insights",
            icon: Info,
            key: "localInsights" as keyof TourismAdvice,
        },
        {
            title: "Budget Planning",
            icon: Utensils,
            key: "budgetTips" as keyof TourismAdvice,
        },
        {
            title: "Best Time to Visit",
            icon: Calendar,
            key: "bestTimeToVisit" as keyof TourismAdvice,
        },
        {
            title: "Additional Activities",
            icon: Lightbulb,
            key: "additionalActivities" as keyof TourismAdvice,
        },
    ]

    return (
        <div className="max-w-7xl mx-auto px-6 py-16 space-y-12">
            {/* Header */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
                <div className="space-y-2">
                    <h1 className="text-3xl font-light text-gray-900 tracking-tight">Travel Advisory</h1>
                    <p className="text-gray-600 text-lg">AI-powered recommendations for your journey</p>
                </div>
            </motion.div>

            {/* Tour Overview */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
                <div className="space-y-6">
                    <div className="flex items-start justify-between">
                        <div className="space-y-1">
                            <h2 className="text-xl font-medium text-gray-900">{tourData.title}</h2>
                            <p className="text-gray-600">{tourData.description}</p>
                        </div>
                        <div className="text-right space-y-1">
                            <div className="text-2xl font-light text-gray-900">${tourData.price}</div>
                            <div className="text-sm text-gray-500">per person</div>
                        </div>
                    </div>

                    <div className="grid grid-cols-4 gap-8 py-6">
                        <div className="text-center space-y-2">
                            <Clock className="h-5 w-5 text-gray-400 mx-auto" />
                            <div className="font-medium text-gray-900">{tourData.duration} days</div>
                            <div className="text-sm text-gray-500">Duration</div>
                        </div>
                        <div className="text-center space-y-2">
                            <Users className="h-5 w-5 text-gray-400 mx-auto" />
                            <div className="font-medium text-gray-900">{tourData.availableSeats} seats</div>
                            <div className="text-sm text-gray-500">Available</div>
                        </div>
                        <div className="text-center space-y-2">
                            <Calendar className="h-5 w-5 text-gray-400 mx-auto" />
                            <div className="font-medium text-gray-900">
                                {new Date(tourData.startDate).toLocaleDateString("en-GB")}
                            </div>
                            <div className="text-sm text-gray-500">Starts</div>
                        </div>
                        <div className="text-center space-y-2">
                            <MapPin className="h-5 w-5 text-gray-400 mx-auto" />
                            <div className="font-medium text-gray-900">Tashkent</div>
                            <div className="text-sm text-gray-500">Meeting point</div>
                        </div>
                    </div>
                </div>
            </motion.div>

            <Separator className="bg-gray-200" />

            {/* Generate Button */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="flex justify-center"
            >
                <Button
                    onClick={generateAdvice}
                    disabled={isGenerating}
                    className="bg-gray-900 hover:bg-gray-800 text-white px-8 py-3 rounded-none font-normal"
                >
                    {isGenerating ? (
                        <div className="flex items-center gap-3">
                            <RefreshCw className="h-4 w-4 animate-spin" />
                            Generating recommendations...
                        </div>
                    ) : (
                        <div className="flex items-center gap-3">
                            <Sparkles className="h-4 w-4" />
                            Get AI Recommendations
                        </div>
                    )}
                </Button>
            </motion.div>

            {/* Error Message */}
            {error && (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
                    <Card className="border-gray-200 bg-gray-50">
                        <CardContent className="p-6">
                            <div className="flex items-center gap-3 text-gray-700">
                                <AlertTriangle className="h-5 w-5" />
                                <div>
                                    <div className="font-medium">Unable to connect to AI service</div>
                                    <div className="text-sm text-gray-600 mt-1">Showing default recommendations below</div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </motion.div>
            )}

            {/* Generated Advice */}
            <AnimatePresence>
                {tourismAdvice && (
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="space-y-8"
                    >
                        <div className="space-y-2">
                            <h3 className="text-2xl font-light text-gray-900">Recommendations</h3>
                            <p className="text-gray-600">Essential information for your journey</p>
                        </div>

                        <div className="space-y-8">
                            {adviceSections.map((section, index) => {
                                const content = tourismAdvice[section.key]
                                const IconComponent = section.icon

                                return (
                                    <motion.div
                                        key={section.key}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.5, delay: index * 0.05 }}
                                    >
                                        <Card className="border-gray-200 shadow-none">
                                            <CardContent className="p-8">
                                                <div className="flex items-start justify-between mb-6">
                                                    <div className="flex items-center gap-3">
                                                        <div className="p-2 bg-gray-100 rounded">
                                                            <IconComponent className="h-4 w-4 text-gray-600" />
                                                        </div>
                                                        <h4 className="text-lg font-medium text-gray-900">{section.title}</h4>
                                                    </div>
                                                    <Button
                                                        variant="ghost"
                                                        size="sm"
                                                        onClick={() => copySection(section.title, content)}
                                                        className="text-gray-400 hover:text-gray-600 hover:bg-gray-50"
                                                    >
                                                        {copied === section.title ? (
                                                            <Check className="h-4 w-4 text-gray-600" />
                                                        ) : (
                                                            <Copy className="h-4 w-4" />
                                                        )}
                                                    </Button>
                                                </div>

                                                <div className="space-y-3">
                                                    {Array.isArray(content) ? (
                                                        <div className="space-y-2">
                                                            {content.map((item, itemIndex) => (
                                                                <motion.div
                                                                    key={itemIndex}
                                                                    initial={{ opacity: 0, x: -10 }}
                                                                    animate={{ opacity: 1, x: 0 }}
                                                                    transition={{ duration: 0.3, delay: itemIndex * 0.03 }}
                                                                    className="flex items-start gap-3 text-gray-700"
                                                                >
                                                                    <div className="h-1.5 w-1.5 rounded-full bg-gray-400 mt-2 flex-shrink-0" />
                                                                    <span className="leading-relaxed">{item}</span>
                                                                </motion.div>
                                                            ))}
                                                        </div>
                                                    ) : (
                                                        <p className="text-gray-700 leading-relaxed">{content}</p>
                                                    )}
                                                </div>
                                            </CardContent>
                                        </Card>
                                    </motion.div>
                                )
                            })}
                        </div>

                        {/* Regenerate Button */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.5 }}
                            className="flex justify-center pt-8"
                        >
                            <Button
                                onClick={generateAdvice}
                                disabled={isGenerating}
                                variant="outline"
                                className="border-gray-300 text-gray-700 hover:bg-gray-50 px-6 py-2 rounded-none font-normal bg-transparent"
                            >
                                <RefreshCw className="h-4 w-4 mr-2" />
                                Generate New Recommendations
                            </Button>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}
