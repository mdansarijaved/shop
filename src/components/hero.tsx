import Image from "next/image";

export default function Hero() {
  return (
    <div className="w-[80vw] h-[80vh] border-2 border-black mx-auto place-items-center mt-4 rounded-md overflow-clip">
      <div className="absolute z-10 flex flex-col place-items-center justify-center gap-2 border-2">
        <h1 className="text-white text-4xl font-bold italic">
          Welcome to Vishwakarma Woodworks.
        </h1>
        <p className="text-white font-semibold">
          New in from Vishwakarma Woodworks. Traditional craftmanship.
        </p>
        <button className="bg-gray-700/50 hover:bg-gray-700/70 px-6 py-3 mt-4 text-white border-2 border-black/30 rounded-md">
          Shop Products
        </button>
      </div>
      <div className="relative w-full h-full">
        <Image
          src="/Sofas/sofa1.webp"
          layout="fill"
          objectFit="cover"
          alt="Sofa Image"
        />
      </div>
    </div>
  );
}
