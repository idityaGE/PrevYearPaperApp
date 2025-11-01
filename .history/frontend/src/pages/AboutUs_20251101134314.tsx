import { Button } from "../components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export function SigninComponent() {
  return (
    <Card className="w-full max-w-md p-2 shadow-xl border border-white/10 backdrop-blur-md">
      <CardHeader className="pb-0 space-y-2">
        <CardTitle className="text-2xl font-extrabold tracking-tight">
          Welcome Back 👋
        </CardTitle>
        <CardDescription className="text-sm text-muted-foreground">
          Sign in to access previous year papers, bookmarks & dashboard.
        </CardDescription>
      </CardHeader>

      <CardContent className="pt-4">
        <form className="flex flex-col gap-5">
          <div className="grid gap-2">
            <Label htmlFor="email" className="text-sm font-medium">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="you@example.com"
              className="h-11 text-base"
              required
            />
          </div>

          <div className="grid gap-2">
            <div className="flex justify-between items-center">
              <Label htmlFor="password" className="text-sm font-medium">Password</Label>
              <a href="#" className="text-xs hover:underline text-primary">
                Forgot password?
              </a>
            </div>
            <Input
              id="password"
              type="password"
              placeholder="••••••••"
              className="h-11 text-base"
              required
            />
          </div>

          <Button type="submit" className="w-full h-11 text-base font-semibold">
            Sign In
          </Button>
        </form>
      </CardContent>

      <CardFooter className="flex flex-col gap-3 pt-2">
        <Button
          variant="outline"
          className="w-full h-11 text-base font-medium flex items-center gap-2"
        >
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/4/4e/Google_2015_logo.svg"
            alt="Google"
            className="h-5"
          />
          Continue with Google
        </Button>

        <p className="text-sm text-center text-muted-foreground">
          Don't have an account?{" "}
          <a href="/signup" className="text-primary font-medium hover:underline">
            Sign Up
          </a>
        </p>
      </CardFooter>
    </Card>
  )
}
