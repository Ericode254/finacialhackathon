"use client"
import Image from 'next/image'
import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { ArrowRight, BarChart2, Bell, BookOpen, DollarSign, Lock, PieChart, Shield, Target, Zap } from 'lucide-react'
import { useRouter } from 'next/navigation'
export default function Home() {
  const router = useRouter()
  const handleButtonClick=()=>{
    console.log("hello")
    router.push("/auth/register")
  }
  return (
    <div className="flex flex-col min-h-screen">
      <header className="px-4 lg:px-6 h-14 flex items-center">
        <Link className="flex items-center justify-center" href="#">
          <DollarSign className="h-6 w-6" />
          <span className="sr-only">FinTrack</span>
        </Link>
        <nav className="ml-auto flex gap-4 sm:gap-6">
          <Link className="text-sm font-medium hover:underline underline-offset-4" href="#features">
            Features
          </Link>
          <Link className="text-sm font-medium hover:underline underline-offset-4" href="#testimonials">
            Testimonials
          </Link>
          <Link className="text-sm font-medium hover:underline underline-offset-4" href="#pricing">
            Pricing
          </Link>
        </nav>
      </header>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                  Master Your Finances with AI-Powered Insights
                </h1>
                <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
                  Take control of your financial future with our intelligent budget tracking and personalized recommendations.
                </p>
              </div>
              <div className="space-x-4">
                <Button onClickCapture={handleButtonClick}>Get Started</Button>
                <Button variant="outline">Learn More</Button>
              </div>
            </div>
          </div>
        </section>
        <section id="features" className="w-full py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-gray-800">
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12">Key Features</h2>
            <div className="grid gap-6 lg:grid-cols-3">
              <Card>
                <CardHeader>
                  <Zap className="h-8 w-8 mb-2 text-primary" />
                  <CardTitle>AI Insights</CardTitle>
                </CardHeader>
                <CardContent>
                  Automatically analyze spending habits and receive actionable insights based on your financial data.
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <BarChart2 className="h-8 w-8 mb-2 text-primary" />
                  <CardTitle>Budget Tracking</CardTitle>
                </CardHeader>
                <CardContent>
                  Set monthly and yearly budgets, track spending, and visualize your financial goals with interactive charts.
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <Bell className="h-8 w-8 mb-2 text-primary" />
                  <CardTitle>Personalized Notifications</CardTitle>
                </CardHeader>
                <CardContent>
                  Receive timely alerts for bill payments, budget limits, and financial milestones tailored to your needs.
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <PieChart className="h-8 w-8 mb-2 text-primary" />
                  <CardTitle>Investment Recommendations</CardTitle>
                </CardHeader>
                <CardContent>
                  Get AI-driven investment suggestions based on your financial situation, goals, and risk appetite.
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <Target className="h-8 w-8 mb-2 text-primary" />
                  <CardTitle>Goal Setting & Tracking</CardTitle>
                </CardHeader>
                <CardContent>
                  Set and track long-term financial goals with personalized strategies for faster achievement.
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <Shield className="h-8 w-8 mb-2 text-primary" />
                  <CardTitle>Data Security & Privacy</CardTitle>
                </CardHeader>
                <CardContent>
                  Rest easy with end-to-end encryption and multi-factor authentication protecting your financial data.
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
              <div className="space-y-4">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Your Personal Financial Assistant</h2>
                <p className="text-gray-500 dark:text-gray-400">
                  Our AI-powered platform provides personalized insights, automates expense tracking, and helps you make
                  informed financial decisions. Take control of your money and achieve your financial goals with ease.
                </p>
                <ul className="grid gap-2">
                  <li className="flex items-center gap-2">
                    <ArrowRight className="h-4 w-4" /> Automated expense categorization
                  </li>
                  <li className="flex items-center gap-2">
                    <ArrowRight className="h-4 w-4" /> Customizable dashboard
                  </li>
                  <li className="flex items-center gap-2">
                    <ArrowRight className="h-4 w-4" /> Real-time financial insights
                  </li>
                  <li className="flex items-center gap-2">
                    <ArrowRight className="h-4 w-4" /> Secure bank connections
                  </li>
                </ul>
              </div>
              <div className="flex justify-center">
                <Image
                  alt="Dashboard preview"
                  className="aspect-video overflow-hidden rounded-xl object-cover object-center"
                  height="310"
                  src="/placeholder.svg"
                  width="550"
                />
              </div>
            </div>
          </div>
        </section>
        <section id="testimonials" className="w-full py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-gray-800">
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12">What Our Users Say</h2>
            <div className="grid gap-6 lg:grid-cols-3">
              <Card>
                <CardHeader>
                  <CardTitle>Sarah M.</CardTitle>
                  <CardDescription>Freelance Designer</CardDescription>
                </CardHeader>
                <CardContent>
                  "This app has completely transformed how I manage my finances. The AI insights have helped me save money I didn't even know I was wasting!"
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>John D.</CardTitle>
                  <CardDescription>Small Business Owner</CardDescription>
                </CardHeader>
                <CardContent>
                  "As a business owner, keeping track of expenses is crucial. This platform makes it easy and even provides valuable insights for growth."
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Emily R.</CardTitle>
                  <CardDescription>Recent Graduate</CardDescription>
                </CardHeader>
                <CardContent>
                  "I've learned so much about personal finance thanks to the educational resources. The goal-setting feature keeps me motivated to save!"
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Start Your Financial Journey Today</h2>
                <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
                  Join thousands of users who have taken control of their finances. Sign up now and get a 30-day free trial.
                </p>
              </div>
              <div className="w-full max-w-sm space-y-2">
                <form className="flex space-x-2">
                  <Input className="max-w-lg flex-1" placeholder="Enter your email" type="email" />
                  <Button type="submit">Get Started</Button>
                </form>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  By signing up, you agree to our <Link className="underline underline-offset-2" href="#">Terms & Conditions</Link>
                </p>
              </div>
            </div>
          </div>
        </section>
        <section id="pricing" className="w-full py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-gray-800">
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12">Simple, Transparent Pricing</h2>
            <div className="grid gap-6 lg:grid-cols-3">
              <Card>
                <CardHeader>
                  <CardTitle>Basic</CardTitle>
                  <CardDescription>For individuals just starting out</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-4xl font-bold">$9.99/mo</div>
                  <ul className="mt-4 space-y-2">
                    <li className="flex items-center">
                      <ArrowRight className="h-4 w-4 mr-2" /> Basic budget tracking
                    </li>
                    <li className="flex items-center">
                      <ArrowRight className="h-4 w-4 mr-2" /> Limited AI insights
                    </li>
                    <li className="flex items-center">
                      <ArrowRight className="h-4 w-4 mr-2" /> Up to 2 financial accounts
                    </li>
                  </ul>
                  <Button className="w-full mt-6">Choose Plan</Button>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Pro</CardTitle>
                  <CardDescription>For serious financial planners</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-4xl font-bold">$19.99/mo</div>
                  <ul className="mt-4 space-y-2">
                    <li className="flex items-center">
                      <ArrowRight className="h-4 w-4 mr-2" /> Advanced budget tracking
                    </li>
                    <li className="flex items-center">
                      <ArrowRight className="h-4 w-4 mr-2" /> Full AI insights and recommendations
                    </li>
                    <li className="flex items-center">
                      <ArrowRight className="h-4 w-4 mr-2" /> Unlimited financial accounts
                    </li>
                    <li className="flex items-center">
                      <ArrowRight className="h-4 w-4 mr-2" /> Investment tracking
                    </li>
                  </ul>
                  <Button className="w-full mt-6">Choose Plan</Button>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Enterprise</CardTitle>
                  <CardDescription>For businesses and financial advisors</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-4xl font-bold">Custom</div>
                  <ul className="mt-4 space-y-2">
                    <li className="flex items-center">
                      <ArrowRight className="h-4 w-4 mr-2" /> All Pro features
                    </li>
                    <li className="flex items-center">
                      <ArrowRight className="h-4 w-4 mr-2" /> Custom integrations
                    </li>
                    <li className="flex items-center">
                      <ArrowRight className="h-4 w-4 mr-2" /> Dedicated support
                    </li>
                    <li className="flex items-center">
                      <ArrowRight className="h-4 w-4 mr-2" /> Advanced reporting
                    </li>
                  </ul>
                  <Button className="w-full mt-6">Contact Sales</Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
        <p className="text-xs text-gray-500 dark:text-gray-400">© 2024 FinTrack. All rights reserved.</p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link className="text-xs hover:underline underline-offset-4" href="#">
            Terms of Service
          </Link>
          <Link className="text-xs hover:underline underline-offset-4" href="#">
            Privacy
          </Link>
        </nav>
      </footer>
    </div>
  )
}