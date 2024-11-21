import { redirect } from "next/navigation";
import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

async function verifySubscription(code: string) {
  const response = await fetch(
    `https://2983-36-66-71-34.ngrok-free.app/api/v1/authorize?auth_code=${code}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  if (!response.ok) {
    return { success: false };
  }
  return { success: true };
}

interface AuthorizePageProps {
  searchParams: Promise<{ code: string }>;
}

export default async function AuthorizePage({
  searchParams,
}: AuthorizePageProps) {
  const params = await searchParams;
  const { code } = params;

  if (!code) {
    redirect("/");
  }

  const result = await verifySubscription(code);

  if (!result.success) {
    redirect("/");
  }

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
            Subscription Successful!
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-center text-green-600 mb-4">
            Thank you for subscribing to the AI Task Assistant bot. Your
            subscription has been successfully verified.
          </p>
          <p className="text-center text-green-600">
            You can now close this window and return to your workflow.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
