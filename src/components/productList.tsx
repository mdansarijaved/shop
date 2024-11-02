export default function ProductList() {
  return (
    <>
      <main className="md:p-4 mt-4 mb-12 h-[100vh] overflow-y-scroll 2xl:flex flex-col 2xl:place-items-center">
        <h2 className="text-xl 2xl:text-3xl font-bold mb-4">Products</h2>
        <div className="grid xl:grid-cols-3 grid-cols-2 2xl:gap-6 gap-4 w-[95%] mx-auto">
          {/* {filteredProducts.map((product) => (
            <div key={product.id} className="border hover:scale-105 h-72 transition-all duration-300 cursor-pointer md:max-h-80 p-2 shadow-md">
              <div className='2xl:h-[85%] h-[85%] md:h-[90%] mx-auto'>
                {product.icon}
              </div>
              <div className='flex justify-between pt-2 gap-2'>
              <h3 className="font-semibold font-sans text-[0.75rem] md:text-sm 2xl:text-xl">{product.name}</h3>
              <h3 className="font-bold 2xl:text-[1.65rem]">&#8377;{product.price}</h3>
              </div>
            </div>
          ))} */}
        </div>
      </main>
    </>
  );
}
