import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Check, TrendingUp, Users, Zap } from "lucide-react";

export default function ForBusinessesPage() {
  return (
    <div>
      {/* Hero Section */}
      <section className="bg-black text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-5xl font-bold mb-6">
              Grow Your Business with Crypto Payments
            </h1>
            <p className="text-xl text-gray-300 mb-8">
              Join Spendr and connect with crypto holders looking for businesses like yours.
            </p>
            <Button size="lg" className="bg-white text-black hover:bg-gray-200">
              Get Started
            </Button>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            Why Accept Cryptocurrency?
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <Card>
              <CardContent className="p-6">
                <div className="bg-black w-12 h-12 rounded-full flex items-center justify-center mb-4">
                  <Users className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Reach New Customers</h3>
                <p className="text-muted-foreground">
                  Tap into a growing community of cryptocurrency holders actively looking for places to spend their digital assets.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="bg-black w-12 h-12 rounded-full flex items-center justify-center mb-4">
                  <Zap className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Fast Transactions</h3>
                <p className="text-muted-foreground">
                  Process payments quickly with lower fees compared to traditional payment processors.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="bg-black w-12 h-12 rounded-full flex items-center justify-center mb-4">
                  <TrendingUp className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Stay Ahead</h3>
                <p className="text-muted-foreground">
                  Position your business at the forefront of payment innovation and attract tech-savvy customers.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold mb-8 text-center">
              What You Get with Spendr
            </h2>
            <div className="space-y-4">
              {[
                "Featured listing on our marketplace",
                "Custom business profile page",
                "Display accepted cryptocurrencies",
                "Customer reviews and ratings",
                "Location-based discovery",
                "Analytics and insights",
                "Verified business badge",
                "Priority customer support"
              ].map((feature, index) => (
                <div key={index} className="flex items-center gap-3">
                  <div className="bg-black w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0">
                    <Check className="h-4 w-4 text-white" />
                  </div>
                  <span className="text-lg">{feature}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">Simple, Transparent Pricing</h2>
            <p className="text-xl text-muted-foreground mb-8">
              Get listed on Spendr and start connecting with crypto-spending customers
            </p>
            <Card className="p-8">
              <CardContent>
                <div className="text-5xl font-bold mb-2">$99</div>
                <div className="text-muted-foreground mb-6">per month</div>
                <ul className="text-left space-y-3 mb-8">
                  <li className="flex items-start gap-2">
                    <Check className="h-5 w-5 flex-shrink-0 mt-0.5" />
                    <span>Full business profile</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-5 w-5 flex-shrink-0 mt-0.5" />
                    <span>Unlimited cryptocurrency options</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-5 w-5 flex-shrink-0 mt-0.5" />
                    <span>Customer reviews</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-5 w-5 flex-shrink-0 mt-0.5" />
                    <span>Analytics dashboard</span>
                  </li>
                </ul>
                <Button size="lg" className="w-full">
                  Get Started Today
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-black text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-4">
            Ready to Accept Crypto?
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            Join the growing network of businesses embracing the future of payments
          </p>
          <div className="flex gap-4 justify-center">
            <Button size="lg" className="bg-white text-black hover:bg-gray-200">
              List Your Business
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-black">
              Contact Sales
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
