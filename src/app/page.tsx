"use client";

import { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function EmailCapturePage() {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Here you would typically send the email to your backend
    console.log("Email submitted:", email);
    setIsSubmitted(true);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-green-50">
      <Card className="w-full max-w-md border-green-500">
        <CardHeader>
          <div className="flex justify-center mb-4">
            <Image
              src="/goto-logo.png"
              alt="Goto Logo"
              width={120}
              height={40}
              priority
            />
          </div>
          <CardTitle className="text-2xl font-bold text-center text-green-700">
            AI Task Assistant Bot
          </CardTitle>
          <CardDescription className="text-center text-green-600">
            Subscribe to enhance your productivity with Lark and Jira
            integration.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {!isSubmitted ? (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-green-700">
                  Work Email Address
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="you@company.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="border-green-300 focus:border-green-500 focus:ring-green-500"
                />
                <p className="text-xs text-green-600">
                  Please use your work email linked to Lark and Jira.
                </p>
              </div>
              <Button
                type="submit"
                className="w-full bg-green-500 hover:bg-green-600"
              >
                Subscribe
              </Button>
            </form>
          ) : (
            <div className="text-center text-green-600">
              Thank you for subscribing to the AI Task Assistant bot!
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
