import { useLoaderData, useParams } from "react-router-dom";
import Hero from "../components/Hero";
import { useEffect, useState } from "react";
const ProductDetails = () => {
  const data = useLoaderData();
  // console.log(data);
  const { detail } = useParams();
  // console.log(detail);
  const [product, setProduct] = useState({});
  const [cart, setCart] = useState([]);
  const [wishList,setWishList] =useState([])

  useEffect(() => {
    const productDetails = data.find((item) => Number(item.id )=== Number(detail));
    setProduct(productDetails)
  }, [data,detail])
  const { image, title, price, description, specification, rating } = product;

 useEffect(() => {
   // Retrieve the existing cart from localStorage on initial load
   const existingCart = JSON.parse(localStorage.getItem("cart")) || [];
   setCart(existingCart);

   const existingWish = JSON.parse(localStorage.getItem("wish")) || [];
   setWishList(existingWish);
 }, []);
const addToCart = (product) => {
  const existingCart = JSON.parse(localStorage.getItem("cart")) || [];
  const isProductInCart = existingCart.some((item) => item.id === product.id);

  if (!isProductInCart) {
    existingCart.push(product);
    localStorage.setItem("cart", JSON.stringify(existingCart));
    setCart(existingCart);

    // Dispatch custom event
    const cartUpdatedEvent = new Event("cartUpdated");
    window.dispatchEvent(cartUpdatedEvent);
  } else {
    alert("This item is already in your cart.");
  }
};

const addToWishlist = (product) => {
  const existingWish = JSON.parse(localStorage.getItem("wish")) || [];
  const isProductInWishlist = existingWish.some(
    (item) => item.id === product.id
  );

  if (!isProductInWishlist) {
    const updatedWishlist = [...existingWish, product];
    localStorage.setItem("wish", JSON.stringify(updatedWishlist));
    setWishList(updatedWishlist);

    // Dispatch custom event
    const wishUpdatedEvent = new Event("wishUpdated");
    window.dispatchEvent(wishUpdatedEvent);
  } else {
    alert("This item is already in your wishlist.");
  }
};


  return (
    <div>
      <div className="bg-[#9538E2] relative  pb-32 text-white -mt-[48px] text-center ">
        <h1 className="font-bold text-5xl pt-8 ">Product Details</h1>
        <p className="my-6">
          Explore the latest gadgets that will take your experience to <br />{" "}
          the next level. From smart devices to the coolest accessories, we have
          it all!
        </p>

        <Hero></Hero>
      </div>
      <div className="mb-16 w-full   -mt-28 sticky">
        <div className="border-2 bg-white w-3/4 mx-auto p-4 rounded-xl flex   gap-2">
          <div className="border-2 w-[300px]">
            <img src={image} alt="" />
          </div>

          <div className="border-2">
            <h3>{title}</h3>
            <p>Price:${price}</p>
            <button>
              <strong>In Stock</strong>:{product?.availability ? "Yes" : "No"}
            </button>
            <p>{description}</p>
            <h3 className="font-bold">Specification:</h3>
            <ul>
              {specification?.map((item, ind) => (
                <li key={ind}>
                  {ind + 1} {item}
                </li>
              ))}
            </ul>
            <p>Rating : {rating}⭐ </p>
            <div className=" w-full flex justify-start items-center gap-4  py-1">
            
              <button
                className="bg-[#9538E2] md:w-max rounded-full py-1 px-3 text-[white]"
                onClick={() => addToCart(product)}
              >
                Add To Card{" "}
                <i className="fa-solid fa-cart-arrow-down ml-[4px]"></i>
              </button>

              <button onClick={() => addToWishlist(product)}>
                {" "}
                <i className="fa-regular fa-heart text-xl"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
      <h1>Product Details Page...</h1>
    </div>
  );
};

export default ProductDetails;