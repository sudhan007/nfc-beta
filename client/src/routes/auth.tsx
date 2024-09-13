import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { axios } from "@/lib/axios";
import { useMutation } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";

export const Route = createFileRoute("/auth")({
  component: () => <LoginPage />,
});

function LoginPage() {
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
  });

  const { mutate } = useMutation({
    mutationFn: async (data: any) => {
      return axios.post("/auth/login", data);
    },
    onSuccess: (data) => {
      console.log(data);
      sessionStorage.setItem("session", "true");
      window.location.replace("/dashboard/members");
    },
    onError: () => {
      toast.error("Error logging in");
    },
  });

  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append("email", inputs.email);
    formData.append("password", inputs.password);
    mutate(formData);
  };

  return (
    <div className="bg-black flex justify-center items-center h-screen">
      <Card className="w-full max-w-sm bg-black text-white">
        <CardHeader>
          <CardTitle className="text-2xl">Login</CardTitle>
          <CardDescription className="text-white">
            Enter your email below to login to your account.
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="admin@example.com"
              required
              value={inputs.email}
              onChange={(e) => {
                setInputs({ ...inputs, email: e.target.value });
              }}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              required
              value={inputs.password}
              onChange={(e) => {
                setInputs({ ...inputs, password: e.target.value });
              }}
            />
          </div>
        </CardContent>
        <CardFooter>
          <Button
            variant={"ghost"}
            className="bg-white text-black w-full"
            onClick={handleSubmit}
          >
            Sign in
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
