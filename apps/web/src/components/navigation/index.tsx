import { NavigationLink } from "./NavigationLink";

export const Navigation = () => {
  return (
    <nav className="fixed bottom-0 left-0 flex h-20 w-full items-center justify-center sm:bottom-10 sm:px-4">
      <NavigationLink />
    </nav>
  );
};
