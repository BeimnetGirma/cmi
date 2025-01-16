"use client";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import Image from "next/image";
// import Slider from "react-slick";

export default function ClientsSlider() {
  const settings = {
    dots: false,
    infinite: true,
    speed: 3000,
    slidesToShow: 5,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <>
      {/* Our Clients */}

      <div className="flex justify-center">
        <Slider className="w-1/2" {...settings}>
          <div>
            <Image width={150} height={150} src="/assets/imgs/dummy-logo-1.svg" alt="Client 1" />
          </div>
          <div>
            <Image width={150} height={150} src="/assets/imgs/dummy-logo-2.svg" alt="Client 2" />
          </div>
          <div>
            <Image width={150} height={150} src="/assets/imgs/dummy-logo-3.svg" alt="Client 3" />
          </div>
          <div>
            <Image width={150} height={150} src="/assets/imgs/dummy-logo-4.svg" alt="Client 4" />
          </div>
          <div>
            <Image width={150} height={150} src="/assets/imgs/dummy-logo-5.svg" alt="Client 5" />
          </div>
          {/* Add more client logos here */}
        </Slider>
      </div>
    </>
  );
}
