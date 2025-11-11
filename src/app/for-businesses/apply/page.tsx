"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function ApplyPage() {
  const [formData, setFormData] = useState({
    businessName: "",
    category: "",
    description: "",
    address: "",
    city: "",
    state: "",
    zip: "",
    phone: "",
    email: "",
    website: "",
    contactName: "",
    acceptedCryptos: [] as string[],
  });
  
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Send to your backend/Supabase
    console.log("Form submitted:", formData);
    setSubmitted(true);
  };

  const cryptos = ["Bitcoin (BTC)", "Ethereum (ETH)", "USD Coin (USDC)", "Tether (USDT)", "Solana (SOL)"];

  if (submitted) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center p-4">
        <Card className="max-w-md w-full bg-neutral-900 border-gray-800">
          <CardContent className="p-8 text-center">
            <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-white mb-2">Application Submitted!</h2>
            <p className="text-gray-400 mb-6">
              Thank you for your interest in Spendr. We'll review your application and get back to you within 2-3 business days.
            </p>
            <Button className="bg-white text-black hover:bg-gray-200" asChild>
              <Link href="/">Return to Home</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black py-12 px-4">
      <div className="max-w-3xl mx-auto">
        <Link href="/for-businesses" className="inline-flex items-center text-gray-400 hover:text-white mb-6">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </Link>

        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">List Your Business</h1>
          <p className="text-gray-400">Fill out the form below to get your business listed on Spendr</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Business Information */}
          <Card className="bg-neutral-900 border-gray-800">
            <CardHeader>
              <CardTitle className="text-white">Business Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="businessName" className="text-white">Business Name *</Label>
                <Input
                  id="businessName"
                  required
                  className="bg-neutral-800 border-gray-700 text-white"
                  value={formData.businessName}
                  onChange={(e) => setFormData({...formData, businessName: e.target.value})}
                />
              </div>

              <div>
                <Label htmlFor="category" className="text-white">Category *</Label>
                <select
                  id="category"
                  required
                  className="w-full bg-neutral-800 border border-gray-700 text-white rounded-md px-3 py-2"
                  value={formData.category}
                  onChange={(e) => setFormData({...formData, category: e.target.value})}
                >
                  <option value="">Select a category</option>
                  <option value="Coffee & Tea">Coffee & Tea</option>
                  <option value="Restaurant">Restaurant</option>
                  <option value="Bar & Nightlife">Bar & Nightlife</option>
                  <option value="Electronics">Electronics</option>
                  <option value="Retail & Shopping">Retail & Shopping</option>
                  <option value="Health & Fitness">Health & Fitness</option>
                  <option value="Personal Care">Personal Care</option>
                  <option value="Automotive">Automotive</option>
                  <option value="Hotel & Lodging">Hotel & Lodging</option>
                </select>
              </div>

              <div>
                <Label htmlFor="description" className="text-white">Description *</Label>
                <Textarea
                  id="description"
                  required
                  rows={4}
                  className="bg-neutral-800 border-gray-700 text-white"
                  placeholder="Describe your business..."
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                />
              </div>
            </CardContent>
          </Card>

          {/* Location */}
          <Card className="bg-neutral-900 border-gray-800">
            <CardHeader>
              <CardTitle className="text-white">Location</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="address" className="text-white">Street Address *</Label>
                <Input
                  id="address"
                  required
                  className="bg-neutral-800 border-gray-700 text-white"
                  value={formData.address}
                  onChange={(e) => setFormData({...formData, address: e.target.value})}
                />
              </div>

              <div className="grid md:grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="city" className="text-white">City *</Label>
                  <Input
                    id="city"
                    required
                    className="bg-neutral-800 border-gray-700 text-white"
                    value={formData.city}
                    onChange={(e) => setFormData({...formData, city: e.target.value})}
                  />
                </div>
                <div>
                  <Label htmlFor="state" className="text-white">State *</Label>
                  <Input
                    id="state"
                    required
                    className="bg-neutral-800 border-gray-700 text-white"
                    value={formData.state}
                    onChange={(e) => setFormData({...formData, state: e.target.value})}
                  />
                </div>
                <div>
                  <Label htmlFor="zip" className="text-white">ZIP Code *</Label>
                  <Input
                    id="zip"
                    required
                    className="bg-neutral-800 border-gray-700 text-white"
                    value={formData.zip}
                    onChange={(e) => setFormData({...formData, zip: e.target.value})}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Contact Information */}
          <Card className="bg-neutral-900 border-gray-800">
            <CardHeader>
              <CardTitle className="text-white">Contact Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="contactName" className="text-white">Contact Name *</Label>
                <Input
                  id="contactName"
                  required
                  className="bg-neutral-800 border-gray-700 text-white"
                  value={formData.contactName}
                  onChange={(e) => setFormData({...formData, contactName: e.target.value})}
                />
              </div>

              <div>
                <Label htmlFor="phone" className="text-white">Phone Number *</Label>
                <Input
                  id="phone"
                  type="tel"
                  required
                  className="bg-neutral-800 border-gray-700 text-white"
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                />
              </div>

              <div>
                <Label htmlFor="email" className="text-white">Email *</Label>
                <Input
                  id="email"
                  type="email"
                  required
                  className="bg-neutral-800 border-gray-700 text-white"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                />
              </div>

              <div>
                <Label htmlFor="website" className="text-white">Website</Label>
                <Input
                  id="website"
                  type="url"
                  className="bg-neutral-800 border-gray-700 text-white"
                  placeholder="https://"
                  value={formData.website}
                  onChange={(e) => setFormData({...formData, website: e.target.value})}
                />
              </div>
            </CardContent>
          </Card>

          {/* Accepted Cryptocurrencies */}
          <Card className="bg-neutral-900 border-gray-800">
            <CardHeader>
              <CardTitle className="text-white">Accepted Cryptocurrencies *</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {cryptos.map((crypto) => (
                <div key={crypto} className="flex items-center space-x-2">
                  <Checkbox
                    id={crypto}
                    checked={formData.acceptedCryptos.includes(crypto)}
                    onCheckedChange={(checked) => {
                      if (checked) {
                        setFormData({...formData, acceptedCryptos: [...formData.acceptedCryptos, crypto]});
                      } else {
                        setFormData({...formData, acceptedCryptos: formData.acceptedCryptos.filter(c => c !== crypto)});
                      }
                    }}
                  />
                  <Label htmlFor={crypto} className="text-white cursor-pointer">
                    {crypto}
                  </Label>
                </div>
              ))}
            </CardContent>
          </Card>

          <Button type="submit" size="lg" className="w-full bg-white text-black hover:bg-gray-200">
            Submit Application
          </Button>
        </form>
      </div>
    </div>
  );
}
