import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/pressup")({
  component: () => <Pressup />,
});

function Pressup() {
  return (
    <div className="bg-black font-body">
      <div className="min-h-screen flex flex-col bg-gray-100 w-screen md:w-[430px] mx-auto">
        <div className="flex items-center py-4 px-6 gap-4">
          <img
            src="/pressup.jpg"
            alt="Logo"
            className="w-16 h-16 rounded-lg shadow-md shadow-black/30"
          />

          <div className="flex flex-col">
            <h1 className="text-2xl font-bold font-body">Pressup</h1>
            <p
              className="text-sm font-body font-regular"
              style={{
                fontFamily: "Ex",
              }}
            >
              ONE STOP IRONING SOLUTIONS
            </p>
          </div>
        </div>

        {/* Main Content Section */}
        <div className="flex-grow flex flex-col items-center justify-center  p-4">
          <div className="w-full flex justify-center">
            <img
              src="/pressup-home.png"
              alt="Home Screen"
              className="w-64 h-auto rounded-lg shadow-lg shadow-black/30"
            />
          </div>
        </div>

        {/* Footer Section with Download Links */}
        <div className="w-full p-4">
          <div className="flex gap-6 justify-center">
            <a
              href="https://m.9m.io/kug2pu7"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block"
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
              className="inline-block"
            >
              <img
                src="/app-store.svg"
                alt="App Store"
                className="w-40 h-auto cursor-pointer transition-transform transform hover:scale-105"
              />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
