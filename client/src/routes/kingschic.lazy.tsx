import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/kingschic")({
  component: () => <KingsChic />,
});

function KingsChic() {
  return (
    <div className="bg-black font-body">
      <div className="min-h-screen flex flex-col bg-gray-100 w-screen md:w-[430px] mx-auto">
        <div className="flex items-center py-4 px-6 gap-4">
          <img
            src="/kingschic-logo.png"
            alt="Logo"
            className="w-16 h-16 rounded-lg"
          />

          <div className="flex flex-col">
            <h1 className="text-2xl font-bold font-body">
              King’s Chic Signature
            </h1>
            <p
              className="text-sm font-body font-regular"
              style={{
                fontFamily: "Ex",
              }}
            >
              Food Delivery App
            </p>
          </div>
        </div>

        <div className="flex-grow flex flex-col items-center justify-center  p-4">
          <div className="w-full flex justify-center">
            <img
              src="/kingschic-home.png"
              alt="Home Screen"
              className="w-64 h-auto rounded-lg"
            />
          </div>
        </div>

        <div className="w-full p-4">
          <div className="flex gap-6 justify-center">
            <a
              href="https://play.google.com/store/apps/details?id=com.kingschic.user"
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
              href="https://apps.apple.com/in/app/kings-chic-signature/id6739277590"
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
