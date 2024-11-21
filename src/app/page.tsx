"use client";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useState } from "react";

export default function SubscribePage() {
  const router = useRouter();
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitted(true);
    const encodedUri = encodeURIComponent(
      "https://goto-reminder-client.vercel.app/authorize"
    );
    router.push(
      `${process.env.NEXT_PUBLIC_AUTH_LARK_URL}?app_id=${process.env.NEXT_PUBLIC_LARK_APP_ID}&redirect_uri=${encodedUri}&scope=calendar:calendar`
    );
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
          <form onSubmit={handleSubmit} className="space-y-4">
            <Button
              type="submit"
              className={`w-full ${
                isSubmitted
                  ? "bg-gray-700 cursor-not-allowed"
                  : "bg-green-500 hover:bg-green-600"
              }`}
              disabled={isSubmitted}
            >
              Authorize & Subscribe
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
