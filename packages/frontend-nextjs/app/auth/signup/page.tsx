import { SignupForm } from '@/components/pages/signup/signup-form';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function Signup() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <Card className="w-full max-w-sm shadow-lg">
        <CardHeader>
          <CardTitle className="text-2xl text-center">Sign Up</CardTitle>
        </CardHeader>
        <CardContent>
          <SignupForm />
        </CardContent>
      </Card>
    </div>
  );
}
