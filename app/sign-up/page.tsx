import { SignUp } from "@clerk/nextjs";

export default function SignUpPage() {
  return (
    <div className="flex h-screen w-full">
      {/* Left panel - hidden on small screens */}
      <div className="hidden md:flex md:w-1/2 flex-col justify-center items-center px-8 bg-base">
        <div className="max-w-md">
          <h1 className="text-3xl font-bold text-copy-primary mb-4">DevAI</h1>
          <p className="text-copy-secondary mb-8">
            Build and design your projects with AI-powered tools.
          </p>
          <ul className="space-y-4 text-copy-muted">
            <li className="flex items-start">
              <span className="mr-3">•</span>
              <span>Intelligent code generation</span>
            </li>
            <li className="flex items-start">
              <span className="mr-3">•</span>
              <span>Collaborative editor</span>
            </li>
            <li className="flex items-start">
              <span className="mr-3">•</span>
              <span>Real-time design system</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Right panel - form */}
      <div className="w-full md:w-1/2 flex items-center justify-center bg-surface px-4">
        <SignUp routing="hash" />
      </div>
    </div>
  );
}
