import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
export default function TopNav() {
  return (
    <header className="w-full border-b border-gray-300 p-4 px-4 text-xl font-semibold sm:px-6">
      {" "}
      <nav className="flex w-full justify-between">
        <div>Gallery</div>
        <div>
          <SignedOut>
            <SignInButton>
              <button className="rounded-xl bg-blue-100 px-4 py-1.5 text-sm text-blue-600 shadow-sm transition-colors duration-200 hover:bg-blue-200">
                Sign In
              </button>
            </SignInButton>
          </SignedOut>
          <SignedIn>
            <UserButton></UserButton>
          </SignedIn>
        </div>
      </nav>
    </header>
  );
}
