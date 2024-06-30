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
