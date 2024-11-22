"use client";
import { Suspense, useState } from "react";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";

async function verifySubscription(code: string, personality: string) {
  const response = await fetch(
    `/api/authorize?auth_code=${code}&personality=${personality}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "ngrok-skip-browser-warning": "true",
      },
    }
  );
  console.log(response);
  if (!response.ok) {
    return { success: false };
  }
  return { success: true };
}

function SubscriptionForm() {
  const searchParams = useSearchParams();
  const code = searchParams.get("code");
  const [personality, setPersonality] = useState("");
  const [isVerified, setIsVerified] = useState(false);
  const [message, setMessage] = useState("");

  const handleVerify = async () => {
    if (!code || !personality) {
      setMessage("Please select a personality before verifying.");
      return;
    }

    const result = await verifySubscription(code, personality);
    setIsVerified(result.success);
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
            {isVerified
              ? "Subscription Successful!"
              : "Verify Your Subscription"}
          </CardTitle>
        </CardHeader>
        <CardContent>
          {!isVerified ? (
            <>
              <p className="text-center text-green-600 mb-4">
                Please select your preferred AI assistant personality and click
                verify to complete your subscription.
              </p>
              <Select onValueChange={setPersonality} value={personality}>
                <SelectTrigger className="w-full mb-4">
                  <SelectValue placeholder="Select AI personality" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="normal">Normal</SelectItem>
                  <SelectItem value="oogway">
                    Oogway (From Kungfu Panda)
                  </SelectItem>
                  <SelectItem value="gordan_ramsay">Gordon Ramsay</SelectItem>
                </SelectContent>
              </Select>
              <Button
                onClick={handleVerify}
                className={`w-full ${
                  isVerified
                    ? "bg-gray-700 cursor-not-allowed"
                    : "bg-green-500 hover:bg-green-600"
                }`}
                disabled={isVerified}
              >
                Verify Subscription
              </Button>
              {message && (
                <p className="text-center text-green-600 mt-4">{message}</p>
              )}
            </>
          ) : (
            <>
              <p className="text-center text-green-600 mb-4">{message}</p>
              <p className="text-center text-green-600">
                You can now close this window and return to your workflow.
              </p>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

export default function SubscriptionSuccessPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SubscriptionForm />
    </Suspense>
  );
}
