import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/pressup")({
  component: () => <Pressup />,
});

function Pressup() {
  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-50 p-4 mt-[20vh]">
      <div className="w-full flex justify-center mb-8">
        <img
          src="/pressup.jpg"
          alt="Logo"
          className="w-32 h-32 rounded-lg shadow-lg shadow-black/50"
        />
      </div>

      <div className="flex gap-4">
        <a
          href="https://m.9m.io/kug2pu7"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            src="/google-play.svg"
            alt="Google Play"
            className="w-40 h-auto cursor-pointer transition-transform transform hover:scale-105"
          />
        </a>

        <a
          href="https://m.9m.io/ku7pkso"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            src="/app-store.svg"
            alt="App Store"
            className="w-40 h-auto cursor-pointer transition-transform transform hover:scale-105"
          />
        </a>
      </div>
    </div>
  );
}
