import React from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

const OfferCarousel: React.FC = () => {
  const offerImages = [
    {
      id: 1,
      src: "https://img.freepik.com/premium-vector/big-offer-sale-banner-special-offer-price-label-design-product-discount-festival-tag-design_1135545-1198.jpg",
      alt: "Offer 1",
    },
    {
      id: 2,
      src: "https://static.vecteezy.com/system/resources/thumbnails/004/243/606/small/special-offer-final-sale-banner-on-red-background-illustration-premium-free-vector.jpg",
      alt: "Offer 2",
    },
    {
      id: 3,
      src: "https://static.vecteezy.com/system/resources/previews/006/532/742/non_2x/flash-sale-banner-illustration-template-design-of-special-offer-discount-for-media-promotion-and-social-media-post-free-vector.jpg",
      alt: "Offer 3",
    },
  ];

  return (
    <div className="w-full">
      <Carousel
        showThumbs={false}
        autoPlay
        infiniteLoop
        interval={3000}
        showStatus={false}
        className="w-full"
      >
        {offerImages.map((image) => (
          <div key={image.id} className="w-full h-full">
            <img
              src={image.src}
              alt={image.alt}
              className="w-full h-full object-contain"
            />
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default OfferCarousel;
