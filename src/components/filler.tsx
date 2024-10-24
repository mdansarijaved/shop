export default function Filler() {

    const prices = [
        {
            limit: "Gifts Under",
            value: 499,
        },
        {
            limit: "Gifts Under",
            value: 999,
        },
        {
            limit: "Gifts Under",
            value: 1999,
        },
        {
            limit: "Gifts Above",
            value: 2000,
        },
    ]

  return (
    <div className="mt-20">
      <h1 className="bg-gradient-to-r from-[#e0c08a] via-[#edd8ab] to-[#e0c08a] w-[80%] mx-auto py-6 text-center text-3xl font-semibold">
        For corporate bulk gifting enquiries, Call: 123-456-7890
      </h1>
      <div className="flex w-[80%] justify-between mx-auto gap-4 mt-4 items-center text-center">
        {prices.map((price) => (
            <div className="bg-gradient-to-r from-[#e0c08a] w-full to-[#edd8ab] py-10">
                <h1 className="text-3xl mb-2">
                {price.limit}
                </h1>
                <h1 className="border-t-2 pt-2 border-black w-fit mx-auto text-5xl font-semibold">&#8377;{price.value}</h1>
            </div>
        ))}
      </div>
    </div>
  );
}
