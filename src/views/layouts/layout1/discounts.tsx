
"use client";
import React, { useContext, useState } from "react";
import { useRouter } from "next/navigation";
import { NextPage } from "next";
import { Col, Row, Button } from "reactstrap";
import { Discount, searchController, Product } from "@/app/globalProvider";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination"
import { CartContext } from "../../../helpers/cart/cart.context";
import { WishlistContext } from "../../../helpers/wishlist/wish.context";
import { CompareContext } from "../../../helpers/compare/compare.context";
import ProductBox from "@/views/layouts/widgets/Product-Box/productbox";
import { CurrencyContext } from "@/helpers/currency/CurrencyContext";

interface Props {
  products?: Discount[];
  item?: Product | Discount;
}

const DiscountProducts: NextPage<Props> = ({ item, products = [] }) => {
  const router = useRouter();
  const { selectedCurr } = useContext(CurrencyContext);
  const { symbol, value } = selectedCurr;
  const { addToWish } = React.useContext(WishlistContext);
  const { addToCart } = React.useContext(CartContext);
  const { addToCompare } = React.useContext(CompareContext);

  if (!products.length) return null;

  const getPrice = (productId: string) => {
      const price = searchController.getDetails(productId, 'getProductPrice');
  
      return price;
    }
  
  return (
    <section className="rts-grocery-feature-area section-pt-space">
      
        <Row>
          <Col lg="12">
            <div className="custom-container title-area-between">
              <h2 className="title-left">Products With Discounts</h2>
            </div>
          </Col>
        </Row >
        <div  className="discount-banners-container">
        <Swiper
          // direction="vertical"
          slidesPerView={products.length === 1 ? 1 : 2}
          spaceBetween={20}
          navigation
          loop={false}
              speed={2000}
              
          // navigation
          // pagination={{ clickable: true }}
          autoplay={{ delay: 3000, disableOnInteraction: true, pauseOnMouseEnter: true }}
          modules={[Navigation, Autoplay]}
          className={`discount-products-swiper ${products.length === 1 ? "single-banner" : ""}`}
          breakpoints={{
            0: {
              slidesPerView: 1,
            },
            768: {
              slidesPerView: products.length === 1 ? 1 : 1,
            },
          }}
         
        >
          {products.map((banner) => (
            <SwiperSlide key={banner.id}>
              <Row>
                {/* left banner */}
                <Col xl="4" lg="12" className=" mb-xl-0">
                  <div
                    className="discount-product-card"
                    style={{ cursor: "pointer" }}
                    onClick={() =>router.push(`/collections/no-sidebar?id=${banner.id}&type=discount`)}
                  >
                    <img
                      src={banner.img?.[0] ?? "/placeholder.jpg"}
                      alt={banner.name}
                      className="discount-product-image"
                    />
                      {/* <div className="discount-product-overlay">
                        <h4 className="discount-product-name">{banner.name}</h4>
                        <div className="discount-product-amount">
                          Only{" "}
                          <strong className="discount-product-percentage">
                            {banner.is_discount_percent
                              ? `${banner.discount}%`
                              : `₹${banner.discount}`}
                          </strong>{" "}
                          off
                        </div>
                      </div> */}
                  </div>
                </Col>
                {/* right products */}
                <Col xl="8" lg="8" className="discount-products-col">
                  <Row>                  
                    {(banner.discountItems ?? []).slice(0, 2).map((item: any, i: number) => (                      
                      <Col md="6" xs="6" key={i}>                        
                        <div className="d-block d-sm-none">
                          <div className="product">
                          <ProductBox 
                            layout="layout-one" 
                            price={item.id ? getPrice(item.id) : 0} 
                            hoverEffect={"icon-inline"} 
                            data={item} 
                            newLabel={item.name} 
                            addCart={() => addToCart(item)} 
                            addCompare={() => addToCompare(item)} 
                            addWish={() => addToWish(item)} />
                          </div>
                        </div>
                        <div className="d-none d-sm-block">                        
                          <div className="custom-product-card d-flex align-items-center p-3 mb-4 shadow-sm rounded bg-white border position-relative">
                            {/* discount badge */}
                              <div className="discount-badge">{item.discount}% Off</div>
                            {/* product image */}
                            <div
                              className="product-thumbnail me-3 flex-shrink-0"
                              style={{ cursor: "pointer" }}
                              onClick={() => router.push(`/product-details/${item.id}`)}
                            >
                              <img src={item.img?.[0] ?? "/placeholder.jpg"} alt={item.name} />
                              </div>
                            {/* product content */}
                            <div className="flex-grow-1">
                              <h5 className="mb-1 fw-bold ms-2 mb-2">{item.name}</h5>
                              <div className="d-flex align-items-center mb-2">                            
                                <span className="text-muted ms-2 me-4 mb-3">
                                  <del>
                                    {symbol}
                                    {(getPrice(item.id) * value).toFixed(2)}
                                  </del>
                                </span>                                                                                                 
                                <span className=" text-success fw-bold mb-3">
                                  {symbol}
                                  {(getPrice(item.id) * value * (1 - item.discount / 100)).toFixed(2)}
                                </span>
                              </div>
                              <div className="d-flex align-items-center gap-2 ms-2 ">                                
                                  <div className="rating-star">
                                    {[...Array(5)].map((_, i) => (
                                      <i
                                        key={i}
                                        className={`fa fa-star ${
                                          i <
                                          (item.rating
                                            ? item.rating.calculateRating()
                                            : 0)
                                            ? "text-warning"
                                            : "fa-star-o text-warning"
                                        }`}
                                      ></i>
                                    ))}
                                  </div>                                                      
                                {/* <Button
                                  color="success"
                                  size="sm"
                                  onClick={() => addToCart(item)}
                                  className="add-to-cart-button"
                                >
                                  <i className="fa fa-shopping-cart me-1"></i>
                                  Add to Cart */}                                  
                                {/* </Button> */}
                                <div className="product-buttons ">
                                  <a                                
                                    data-toggle="modal"
                                    data-target="#addtocart "
                                    className="btn btn-normal "
                                    onClick={() => addToCart(item)}
                                  >
                                  add to cart
                                  </a>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>                                           
                      </Col>
                    ))}                    
                  </Row>
                </Col>
              </Row>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      
    </section>
  );
};

export default DiscountProducts;
