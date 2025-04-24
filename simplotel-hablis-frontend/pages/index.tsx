import styles from "../styles/Home.module.css";
import Image from "next/image";
import { GetStaticProps } from "next";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination, Autoplay } from "swiper/modules";

interface HeroSlide {
  id: number;
  description: string;
  imageUrl: string;
}

interface PackageSlide {
  id: number;
  title: string;
  imageUrl: string;
}

interface FacilitiesSlide {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
}

export const getStaticProps: GetStaticProps = async () => {
  try {
    const [
      heroSlidesRes,
      packageSlidesRes,
      accommodationImagesRes,
      facilitiesSlidesRes,
    ] = await Promise.all([
      fetch(
        "https://simplotel-hablis-backend.onrender.com/api/hero-slides?populate=*"
      ),
      fetch(
        "https://simplotel-hablis-backend.onrender.com/api/package-slides?populate=*"
      ),
      fetch(
        "https://simplotel-hablis-backend.onrender.com/api/accommodation-images?populate=*"
      ),
      fetch(
        "https://simplotel-hablis-backend.onrender.com/api/facilities-slides?populate=*"
      ),
    ]);

    const [
      heroSlidesData,
      packageSlidesData,
      accommodationImagesData,
      facilitiesSlidesData,
    ] = await Promise.all([
      heroSlidesRes.json(),
      packageSlidesRes.json(),
      accommodationImagesRes.json(),
      facilitiesSlidesRes.json(),
    ]);

    return {
      props: {
        heroSlides: heroSlidesData.data.map((item: any) => ({
          id: item.id,
          description: item.Description,
          imageUrl: item.img_url,
        })),
        packageSlides: packageSlidesData.data.map((item: any) => ({
          id: item.id,
          title: item.title,
          imageUrl: item.img_url,
        })),
        accommodationImages: accommodationImagesData.data.map((item: any) => ({
          id: item.id,
          title: item.title,
          imageUrl: item.img_url,
        })),
        facilitiesSlides: facilitiesSlidesData.data.map((item: any) => ({
          id: item.id,
          title: item.title,
          description: item.description,
          imageUrl: item.img_url,
        })),
      },
      // revalidate: 3600, Removing revalidation because the strapi server spins down occasionally in free tier
    };
  } catch (error) {
    console.error("Error fetching data:", error);
    return {
      props: {
        heroSlides: [],
        packageSlides: [],
        accommodationImages: [],
        facilitiesSlides: [],
      },
    };
  }
};

export default function Home({
  heroSlides = [],
  packageSlides = [],
  accommodationImages = [],
  facilitiesSlides = [],
}: {
  heroSlides: HeroSlide[];
  packageSlides: PackageSlide[];
  accommodationImages: PackageSlide[];
  facilitiesSlides: FacilitiesSlide[];
}) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50); // Change header style after scrolling 50px
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="font-sans">
      {/* Header */}
      <header
        className={`${styles.header} ${
          isScrolled ? styles.headerScrolled : styles.headerTransparent
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <img
            alt="download"
            src="https://assets.simplotel.com/simplotel/image/upload/x_0,y_0,w_165,h_176,r_0,c_crop,q_90/hablis-hotel-chennai/download_symhyg"
          ></img>

          <nav className="hidden md:flex space-x-10 text-sm text-white font-bold">
            <a href="#">ROOMS</a>
            <a href="#">BANQUETS</a>
            <a href="#">DINING</a>
            <a href="#">DAY USE ROOMS</a>
            <a href="#">OFFERS</a>
            <a href="#">MANAGE BOOKING</a>
          </nav>

          <button className="hidden md:block bg-orange-600 text-white px-4 py-2 rounded-md text-sm">
            Book Now
          </button>

          <div className="md:hidden">
            <button onClick={() => setMenuOpen(!menuOpen)}>
              {menuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {menuOpen && (
          <div className="md:hidden px-4 pb-4 space-y-2 bg-black shadow-md">
            <a href="#" className="block text-white">
              ROOMS
            </a>
            <a href="#" className="block text-white">
              BANQUETS
            </a>
            <a href="#" className="block text-white">
              DINING
            </a>
            <a href="#" className="block text-white">
              DAY USE ROOMS
            </a>
            <a href="#" className="block text-white">
              OFFERS
            </a>
            <a href="#" className="block text-white">
              MANAGE BOOKING
            </a>
            <button className="bg-orange-600 w-full text-white px-4 py-2 rounded-md text-sm">
              Book Now
            </button>
          </div>
        )}
      </header>

      {/* Booking Section */}
      <div
        className={
          "absolute bottom-35 left-1/2 transform -translate-x-1/2 bg-black text-white px-7 py-5 shadow-lg w-full max-w-4xl " +
          styles.bookingSection
        }
        style={{ zIndex: 10 }}
      >
        <div className="grid grid-cols-10 gap-4 items-center">
          {/* Check In */}
          <div className="flex flex-col col-span-2">
            <label className="text-sm mb-1">Check In</label>
            <div
              className={
                "flex items-center bg-white text-black px-2 py-1 rounded-md " +
                styles.inputContainer
              }
            >
              <input
                type="text"
                placeholder="22/04/2025"
                className="w-full focus:outline-none"
              />
              <span className="ml-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5m-9-6h.008v.008H12v-.008ZM12 15h.008v.008H12V15Zm0 2.25h.008v.008H12v-.008ZM9.75 15h.008v.008H9.75V15Zm0 2.25h.008v.008H9.75v-.008ZM7.5 15h.008v.008H7.5V15Zm0 2.25h.008v.008H7.5v-.008Zm6.75-4.5h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V15Zm0 2.25h.008v.008h-.008v-.008Zm2.25-4.5h.008v.008H16.5v-.008Zm0 2.25h.008v.008H16.5V15Z"
                  />
                </svg>
              </span>
            </div>
          </div>

          {/* Check Out */}
          <div className="flex flex-col col-span-2">
            <label className="text-sm mb-1">Check Out</label>
            <div
              className={
                "flex items-center bg-white text-black px-2 py-1 rounded-md " +
                styles.inputContainer
              }
            >
              <input
                type="text"
                placeholder="23/04/2025"
                className="w-full focus:outline-none"
              />
              <span className="ml-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5m-9-6h.008v.008H12v-.008ZM12 15h.008v.008H12V15Zm0 2.25h.008v.008H12v-.008ZM9.75 15h.008v.008H9.75V15Zm0 2.25h.008v.008H9.75v-.008ZM7.5 15h.008v.008H7.5V15Zm0 2.25h.008v.008H7.5v-.008Zm6.75-4.5h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V15Zm0 2.25h.008v.008h-.008v-.008Zm2.25-4.5h.008v.008H16.5v-.008Zm0 2.25h.008v.008H16.5V15Z"
                  />
                </svg>
              </span>
            </div>
          </div>

          {/* Adults */}
          <div className="flex flex-col col-span-1">
            <label className="text-sm mb-1">Adults</label>
            <select
              className={
                "bg-white text-black px-2 py-1 rounded-md focus:outline-none " +
                styles.inputContainer
              }
            >
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
            </select>
          </div>

          {/* Children */}
          <div className="flex flex-col col-span-1">
            <label className="text-sm mb-1">Children</label>
            <select
              className={
                "bg-white text-black px-2 py-1 rounded-md focus:outline-none " +
                styles.inputContainer
              }
            >
              <option value="0">0</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
            </select>
          </div>

          {/* Promo Code */}
          <div className="flex flex-col col-span-2">
            <label className="text-sm mb-1">Promo Code</label>
            <input
              type="text"
              className={
                "bg-white text-black px-2 py-1 rounded-md focus:outline-none " +
                styles.inputContainer
              }
            />
          </div>

          {/* Book Now Button */}
          <div className="flex flex-col col-span-2">
            <button className="bg-orange-600 text-white px-6 py-2 rounded-md text-sm font-bold w-full">
              Book Now
            </button>
          </div>
          <label className="flex flex-col col-span-2 text-sm mb-1">
            why book direct?
          </label>
        </div>
      </div>

      {/* Hero Section with Carousel */}
      <section className="h-screen relative" id="hero-carousel">
        <Swiper
          modules={[Pagination, Autoplay]}
          pagination={{ clickable: true }}
          autoplay={{ delay: 5000 }}
          speed={600}
          loop
          className="h-full"
        >
          {heroSlides.map(
            (
              slide: { id: number; description: string; imageUrl: string },
              index: number
            ) => (
              <SwiperSlide key={slide.id}>
                <div
                  className={
                    "h-full bg-cover bg-center flex items-center justify-center relative " +
                    styles.animateZoomOut
                  }
                  style={{ backgroundImage: `url(${slide.imageUrl})` }}
                >
                  <div className="absolute inset-0 bg-black opacity-40"></div>
                  <div className={styles.carouselText}>
                    <p className="text-lg md:text-xl">{slide.description}</p>
                  </div>
                </div>
              </SwiperSlide>
            )
          )}
        </Swiper>
      </section>

      <section className="pt-7">
        {/* Contact detail */}
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl md:text-3xl text-center mb-4 uppercase">
            Hablis - A Signature Business Hotel Near Chennai International
            Airport
          </h2>
          <p className="text-center text-gray-600 mb-6">
            No. 19, Grand Southern Trunk Road, Guindy, Chennai, Tamil Nadu
            600032
          </p>
          <div className="flex justify-center space-x-8 text-gray-800">
            <div className="flex items-center space-x-2">
              <span className="text-lg">📞</span>
              <span className="text-black">+91 44 4023 5555</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-lg">📞</span>
              <span className="text-black">+91 44 2233 4000</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-lg">✉️</span>
              <span className="text-black">reservations@hablis.com</span>
            </div>
          </div>
        </div>
        <hr className="border-t border-gray-300 my-8 w-full" />

        {/* packages */}
        <div className="max-w-7xl mx-auto px-4 custom-swiper" id="packages">
          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            navigation
            pagination={{ clickable: true }}
            autoplay={{ delay: 5000 }}
            speed={600}
            loop
            spaceBetween={20}
            slidesPerView={1}
            breakpoints={{
              640: { slidesPerView: 1 },
              768: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }}
          >
            {packageSlides.map((card, index) => (
              <SwiperSlide key={card.id}>
                <div className="overflow-hidden">
                  <img
                    src={card.imageUrl}
                    alt={card.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-4 text-center">
                    <h3 className="text-xl">{card.title}</h3>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </section>

      {/* Parallax Section */}
      <section className="relative">
        {/* Content Section */}
        <div className="relative z-10">
          <div className="max-w-7xl mx-auto px-4 pb-16">
            <h2 className="text-2xl md:text-3xl text-center font-bold mb-4">
              WHERE BUSINESS MEETS CONVENIENCE
            </h2>
            <p className="text-base md:text-lg text-left text-gray-500 font-[400] leading-[32px]">
              The Hablis, a new-age hotel near Chennai International Airport,
              offers the optimal blend of comfort and convenience to its guests.
              Being one of the most coveted hotels in Chennai, Hablis, with its
              modern amenities and world-class service, has made a name for
              itself in the hospitality industry.{" "}
              <span className="text-sm md:text-base font-[500]">
                Airport / Offices Transfers/Meals are included for eligible
                rates. Contact the hotel directly to avail the inclusions.
              </span>
            </p>
          </div>
        </div>
        <div className={styles.parallaxImage}></div>
        <div className="max-w-7xl mx-auto px-4 pb-16 pt-8">
          <p className="text-base md:text-lg text-left text-gray-500 font-[400] leading-[32px]">
            Situated in Guindy, The Hablis is the most adored hotel near{" "}
            <span className="text-black">Chennai International Airport</span>.
            Our business hotel is commutable by both public and private
            transportation modes, allowing guests to avoid heavy traffic within
            the city. Located within walking distance from the Guindy Metro
            Station, commercial hubs, and travel hubs in the city, our 5-star
            hotel is just 10 mins away from Chennai Airport and 5 mins away from
            Chennai Trade Centre and provides an ideal stay for business and
            leisure travellers.
          </p>
        </div>
      </section>

      {/* Accommodation Section */}
      <section>
        <div className="max-w-7xl mx-auto px-4">
          {/* Section Title */}
          <h2 className="text-2xl md:text-3xl text-center font-bold mb-8">
            ACCOMMODATION AT OUR HOTEL IN CHENNAI
          </h2>

          {/* Image Grid */}
          <div className={styles.imageGrid}>
            {/* Image 1 */}
            <div className={"overflow-hidden " + styles.imageGridItem1}>
              <img
                src={accommodationImages[0].imageUrl}
                alt={accommodationImages[0].title}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Image 2 */}
            <div className={"overflow-hidden " + styles.imageGridItem2}>
              <img
                src={accommodationImages[1].imageUrl}
                alt={accommodationImages[1].title}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Image 3 */}
            <div className={"overflow-hidden " + styles.imageGridItem3}>
              <img
                src={accommodationImages[2].imageUrl}
                alt={accommodationImages[2].title}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Image 4 */}
            <div className={"overflow-hidden " + styles.imageGridItem4}>
              <img
                src={accommodationImages[3].imageUrl}
                alt={accommodationImages[3].title}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Image 5 */}
            <div className={"overflow-hidden " + styles.imageGridItem5}>
              <img
                src={accommodationImages[4].imageUrl}
                alt={accommodationImages[4].title}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Image 6 */}
            <div className={"overflow-hidden " + styles.imageGridItem6}>
              <img
                src={accommodationImages[5].imageUrl}
                alt={accommodationImages[5].title}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Image 7 */}
            <div className={"overflow-hidden " + styles.imageGridItem7}>
              <img
                src={accommodationImages[6].imageUrl}
                alt={accommodationImages[6].title}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
          <div className="max-w-7xl mx-auto px-4 pb-16 pt-8">
            <p className="text-base md:text-lg text-left text-gray-500 font-[400] leading-[32px]">
              Hablis is a business hotel in Chennai that offers two categories
              of exquisitely designed{" "}
              <span className="text-black">accommodations</span>, namely{" "}
              <span className="text-black">HABLIS MASTER</span> and{" "}
              <span className="text-black">HABLIS SUITE</span>. Each of these
              rooms & suites is built spaciously, making it one of the best
              places to stay in Chennai for both business and leisure
              travellers. Each and every room has been designed intricately to
              cater to both short and long stay travellers. The room sizes vary
              between 330 sq. ft. to 625 sq. ft. and have sufficient storage
              facilities.
            </p>
          </div>
        </div>
      </section>

      {/* Facilities Section */}
      <section>
        <div className="max-w-7xl mx-auto px-4 pb-16">
          <h2 className="text-2xl md:text-3xl text-center font-bold mb-4">
            FACILITIES AT THE HABLIS BUSINESS HOTEL IN CHENNAI
          </h2>
          <p className="text-base md:text-lg text-left text-gray-500 font-[400] leading-[32px]">
            Our business hotel in Guindy is home to a host of facilities. The
            hotel provides other facilities that include an elegant lounge,
            complimentary baby food, free airport shuttle (Monday to Thursday),
            a fitness centre,{" "}
            <span className="text-black">banquets and conference halls</span>,
            and long-stay rooms.
          </p>
        </div>
        <div className="max-w-7xl mx-auto px-4 custom-swiper" id="facilities">
          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            navigation
            pagination={{ clickable: true }}
            autoplay={{ delay: 5000 }}
            speed={600}
            loop
            spaceBetween={20}
            slidesPerView={3}
            breakpoints={{
              640: { slidesPerView: 1 },
              768: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }}
          >
            {facilitiesSlides.map((slide, index) => (
              <SwiperSlide key={index}>
                <div className="overflow-hidden">
                  <img
                    src={slide.imageUrl}
                    alt={slide.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-4 text-center gap-10">
                    <h3 className="text-xl text-gray-600 py-12 font-[700]">
                      {slide.title}
                    </h3>
                    <p className="text-base md:text-lg text-left text-gray-500 font-[400] leading-[32px]">
                      {slide.description}
                    </p>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 pb-16">
        <img
          src="https://assets.simplotel.com/simplotel/image/upload/x_0,y_184,w_2560,h_1089,r_0,c_crop,q_90,fl_progressive/w_1650,f_auto,c_fit/hablis-hotel-chennai/services_at_hablis_hotel_chennai"
          alt="comfort-card"
        ></img>
      </div>

      {/* Experience Section */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          {/* Title */}
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-8">
            EXPERIENCE THE HABLIS WAY OF LIFE
          </h2>

          {/* Content */}
          <div className="flex flex-col md:flex-row gap-5">
            {/* Text Content */}
            <div className="md:w-2/3 text-left">
              <p className="text-base md:text-lg text-left text-gray-500 font-[400] leading-[32px] mb-8 px-4 md:px-0">
                Inspired by the local culture, our eclectic spaces offer the
                finest accommodation and services. Our facilities and amenities
                make Hablis one of the best hotels near Chennai Airport and
                embody our cultural values of charm, sophistication, and
                elegance. Our unbridled passion-curated experiences and
                unparalleled expertise will ensure the highest levels of
                satisfaction and will leave you feeling spoilt. Find your peace
                in a space that articulates flair and style, experience engaging
                stays, and create memorable moments.
              </p>
              <p className="text-lg text-black text-center md:text-center px-4 md:px-0 hover:underline hover:cursor-pointer">
                Book your stay now and make memories!
              </p>
            </div>

            {/* Circular Image */}
            <div className="md:w-1/3 flex justify-center md:justify-end mt-8 md:mt-0">
              <div
                className="rounded-full overflow-hidden shadow-lg"
                style={{
                  width: "100%",
                  aspectRatio: "1",
                }}
              >
                <img
                  src="https://assets.simplotel.com/simplotel/image/upload/w_5000,h_3333/x_1216,y_783,w_2666,h_2549,r_max,c_crop,q_90,fl_progressive/w_825,f_png,c_fit/hablis-hotel-chennai/white_flower_2"
                  alt="Experience Hablis"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Popular Locations Section */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          {/* Title */}
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-8">
            POPULAR LOCATIONS NEAR OUR CHENNAI HOTEL
          </h2>

          {/* Description */}
          <p className="text-base md:text-lg text-gray-500 font-[400] leading-[32px] text-center mb-8">
            Several IT parks, hospitals, and colleges are located close to
            Hablis Hotel Chennai, ensuring you remain unperturbed about
            travelling to your destination during your stay with us. If you are
            a shopaholic, enjoy a range of accessories, clothing, shoes, and
            much more at Phoenix Marketcity, which is just 6.6 km away (14
            mins). Here is a list of hubs nearby and the distance from our
            hotel.
          </p>

          {/* Locations List */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Column 1 */}
            <ul
              className="list-disc text-gray-700 space-y-2"
              style={{ listStylePosition: "outside" }}
            >
              <li>
                Olympia Technology Park - <strong>1.3 km / 3 mins</strong>
              </li>
              <li>
                Tamarai Tech Park - <strong>1 km / 3 mins</strong>
              </li>
              <li>
                Kochar Building - <strong>4 km / 17 mins</strong>
              </li>
              <li>
                HTC Towers - <strong>0.1 km / 1 min</strong>
              </li>
              <li>
                Chennai Trade Centre - <strong>2.5 km / 5 mins</strong>
              </li>
              <li>
                DLF Cybercity Chennai - <strong>4.9 km / 20 mins</strong>
              </li>
            </ul>

            {/* Column 2 */}
            <ul
              className="list-disc text-gray-700 space-y-2"
              style={{ listStylePosition: "outside" }}
            >
              <li>
                IITM Institute Hospital - <strong>10.2 km / 30 mins</strong>
              </li>
              <li>
                Adyar Cancer Institute - <strong>5.5 km / 18 mins</strong>
              </li>
              <li>
                MGM Healthcare - <strong>8.8 km / 25 mins</strong>
              </li>
            </ul>

            {/* Column 3 */}
            <ul
              className="list-disc text-gray-700 space-y-2"
              style={{ listStylePosition: "outside" }}
            >
              <li>
                Indian Institute Of Technology, Chennai -{" "}
                <strong>9.8 km / 30 mins</strong>
              </li>
              <li>
                IIT Madras Research Centre - <strong>9.1 km / 25 mins</strong>
              </li>
              <li>
                College of Engineering, Guindy -{" "}
                <strong>5.2 km / 16 mins</strong>
              </li>
            </ul>
          </div>
          <p className="text-base md:text-lg text-gray-500 font-[400] leading-[32px] text-center my-8">
            Getting to Hablis by road is a convenience that is seldom provided
            by business hotels in Chennai. Offering excellent connectivity to
            highways such as The Grand Southern Trunk Road - the road which
            connects Chennai and Trichy, our hotel is at the major entry point
            to the city, making sure that our signature hospitality greets you
            at the very doorstep!
          </p>
        </div>
      </section>

      {/* Tripadvisor Section */}
      <section className="pb-12">
        <div className="max-w-7xl text-gray-500 mx-auto px-4 text-center">
          {/* Title */}
          <h2 className="text-lg md:text-xl font-[700] mb-15 flex justify-center items-center gap-1">
            <span>
              <svg
                className="h-8 w-8 text-gray-950"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
                />
              </svg>
            </span>
            Tripadvisor Travellers' Choice 2023
          </h2>

          {/* Image */}
          <div className="flex justify-center">
            <img
              src="https://assets.simplotel.com/simplotel/image/upload/x_-1,y_0,w_1276,h_1276,r_0,c_crop,q_90,fl_progressive/w_550,f_auto,c_fit/hablis-hotel-chennai/Travellers_Choice_Award_page-0001_wzmapt"
              alt="Tripadvisor Travellers' Choice 2023"
              className="w-[380px]"
            />
          </div>
        </div>
      </section>

      {/* Reviews Section */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 reviews-swiper">
          {/* Title */}
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-8">
            REVIEWS
          </h2>

          {/* Swiper */}
          <Swiper
            modules={[Navigation, Autoplay]}
            navigation
            autoplay={{ delay: 3000 }}
            speed={500}
            loop
            spaceBetween={20}
            slidesPerView={3}
            slidesPerGroup={3}
            breakpoints={{
              640: { slidesPerView: 1 },
              768: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }}
          >
            {[
              {
                title: "Very Good",
                rating: 5,
                content:
                  "I had a wonderful experience at Hablis hotel. Mr. Jawahar helped us a lot with his service. He made our family proud by guaranteeing us how delicious the food is. Each and every guest from our side said the food was totally worth it. My favourite was briyani both veg and non-veg, Chettinad chicken.",
                author: "Sarath Kumar B",
                date: "2022-08-26",
              },
              {
                title: "Excellent banquet halls",
                rating: 4,
                content:
                  "Banquet hall booking process was easy. Mr. Jawahar has smoothened the process. He was very polite and available at anytime to answer our queries. The hotel receptionist was very humble and gave a warm welcome. The best part is food. Food was sumptuous and everyone enjoyed the party with good hospitality.",
                author: "Lakshmi Yogesh",
                date: "2022-08-18",
              },
              {
                title: "Excellent banquet halls",
                rating: 5,
                content:
                  "Banquet hall booking process was easy. Mr. Jawahar has smoothened the process. He was very polite and available at anytime to answer our queries. The hotel receptionist was very humble and gave a warm welcome. The best part is food. Food was sumptuous and everyone enjoyed the party with good hospitality.",
                author: "Lakshmi Yogesh",
                date: "2022-08-18",
              },
              {
                title: "Excellent banquet halls",
                rating: 4,
                content:
                  "Banquet hall booking process was easy. Mr. Jawahar has smoothened the process. He was very polite and available at anytime to answer our queries. The hotel receptionist was very humble and gave a warm welcome. The best part is food. Food was sumptuous and everyone enjoyed the party with good hospitality.",
                author: "Lakshmi Yogesh",
                date: "2022-08-18",
              },
              {
                title: "Very Good",
                rating: 5,
                content:
                  "I had a wonderful experience at Hablis hotel. Mr. Jawahar helped us a lot with his service. He made our family proud by guaranteeing us how delicious the food is. Each and every guest from our side said the food was totally worth it. My favourite was briyani both veg and non-veg, Chettinad chicken.",
                author: "Sarath Kumar B",
                date: "2022-08-26",
              },
              {
                title: "Excellent banquet halls",
                rating: 4,
                content:
                  "Banquet hall booking process was easy. Mr. Jawahar has smoothened the process. He was very polite and available at anytime to answer our queries. The hotel receptionist was very humble and gave a warm welcome. The best part is food. Food was sumptuous and everyone enjoyed the party with good hospitality.",
                author: "Lakshmi Yogesh",
                date: "2022-08-18",
              },
            ].map((review, index) => (
              <SwiperSlide key={index}>
                <div className="bg-gray-100 p-6 rounded-lg shadow-md h-[300px] flex flex-col">
                  {/* Title */}
                  <h3 className="text-lg font-bold mb-2">{review.title}</h3>

                  {/* Rating */}
                  <div className="flex items-center mb-2">
                    {Array.from({ length: review.rating }).map((_, i) => (
                      <span key={i} className="text-yellow-500 text-lg">
                        ★
                      </span>
                    ))}
                  </div>

                  {/* Content */}
                  <div className="text-sm text-gray-600 overflow-y-auto flex-grow">
                    {review.content}
                  </div>

                  {/* Author and Date */}
                  <div className="mt-4 text-sm text-gray-800 font-semibold">
                    {review.author}
                  </div>
                  <div className="text-xs text-gray-500">{review.date}</div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </section>

      {/* Hotel Amenities Section */}
      <section className="py-12 pb-40">
        <div className="max-w-4xl mx-auto px-4">
          {/* Title */}
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-8">
            HOTEL AMENITIES
          </h2>

          {/* Amenities Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-20 text-gray-500 text-lg">
            {/* Column 1 */}
            <ul className="list-none space-y-4">
              <li className="flex space-x-2">
                <span>📉</span>
                <span>Lowest Prices Ever</span>
              </li>
              <li className="flex space-x-2">
                <span>🚗</span>
                <span>
                  Airport transfers / Office transfers / Meals are included for
                  eligible rates. Please contact the hotel directly to avail of
                  these inclusions.
                </span>
              </li>
            </ul>

            {/* Column 2 */}
            <ul className="list-none space-y-4">
              <li className="flex space-x-2">
                <span>📍</span>
                <span>Great Location - 10 mins From Chennai Airport</span>
              </li>
              <li className="flex space-x-2">
                <span>🍴</span>
                <span>Up to 15% Off on Food & Beverage</span>
              </li>
              <li className="flex space-x-2">
                <span>🏢</span>
                <span>Hotel Near IIT Chennai & Chennai Trade Centre</span>
              </li>
            </ul>

            {/* Column 3 */}
            <ul className="list-none space-y-4">
              <li className="flex space-x-2">
                <span>⭐</span>
                <span>Enjoy Risk-Free Booking</span>
              </li>
              <li className="flex space-x-2">
                <span>🅿️</span>
                <span>Free Parking</span>
              </li>
              <li className="flex space-x-2">
                <span>🥪</span>
                <span>Packed breakfast for early check-out guests</span>
              </li>
              <li className="flex space-x-2">
                <span>🎟️</span>
                <span>Voucher for next Booking</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Footer Section */}
      <footer className={"bg-gray-800 text-white py-8 " + styles.footer}>
        <div className="max-w-7xl mx-auto px-4">
          {/* Contact Details */}
          <div className="text-center mb-6">
            <h3 className="text-lg">Hablis Hotel Chennai</h3>
            <p className="text-sm">
              No. 19, Grand Southern Trunk Road, Guindy, Chennai, Tamil Nadu
              600032
            </p>
            <div className="flex justify-center space-x-4 mt-2">
              <div className="flex items-center space-x-2">
                <span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="size-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75"
                    />
                  </svg>
                </span>
                <span>reservations@hablis.com</span>
              </div>
              <div className="flex items-center space-x-2">
                <span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="size-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z"
                    />
                  </svg>
                </span>
                <span>+91 44 4023 5555</span>
              </div>
              <div className="flex items-center space-x-2">
                <span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="size-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z"
                    />
                  </svg>
                </span>
                <span>+91 44 2233 4000</span>
              </div>
            </div>
          </div>

          {/* Social Media and Review Badge */}
          <div className="flex justify-center items-center flex-col gap-3 mb-6">
            {/* Social Media Icons */}
            <div className="text-lg">Get in Touch</div>
            <div className="flex space-x-4">
              <a href="#" className="text-white text-xl">
                <span>
                  <svg
                    className="h-8 w-8 text-slate-50"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                    <path d="M4 4l11.733 16h4.267l-11.733 -16z" />
                    <path d="M4 20l6.768 -6.768m2.46 -2.46l6.772 -6.772" />
                  </svg>
                </span>
              </a>
              <a href="#" className="text-white text-xl">
                <span>
                  <svg
                    className="h-8 w-8 text-slate-50"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    {" "}
                    <rect
                      x="2"
                      y="2"
                      width="20"
                      height="20"
                      rx="5"
                      ry="5"
                    />{" "}
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />{" "}
                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                  </svg>
                </span>
              </a>
              <a href="#" className="text-white text-xl">
                <span>
                  <svg
                    className="h-8 w-8 text-slate-50"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    {" "}
                    <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z" />{" "}
                    <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" />
                  </svg>
                </span>
              </a>
            </div>

            {/* Review Badge */}
            <div className="bg-white text-black px-4 py-2 rounded-md text-center">
              <p className="text-sm font-bold">VERY GOOD</p>
              <p className="text-lg font-bold">4.3</p>
              <p className="text-xs">2,756 reviews</p>
            </div>
          </div>

          {/* Separation Line */}
          <hr className="my-6" />

          {/* Navigation Links */}
          <div className="text-center text-sm space-y-2">
            <div className="flex flex-wrap justify-center space-x-4">
              <a href="#" className="hover:underline">
                HOME
              </a>
              <a href="#" className="hover:underline">
                ROOMS
              </a>
              <a href="#" className="hover:underline">
                OFFERS
              </a>
              <a href="#" className="hover:underline">
                DINING
              </a>
              <a href="#" className="hover:underline">
                BANQUETS
              </a>
              <a href="#" className="hover:underline">
                DAY USE ROOMS
              </a>
              <a href="#" className="hover:underline">
                BLOG
              </a>
              <a href="#" className="hover:underline">
                LOCATE US
              </a>
              <a href="#" className="hover:underline">
                GALLERY
              </a>
              <a href="#" className="hover:underline">
                CONTACT
              </a>
              <a href="#" className="hover:underline">
                AWARDS
              </a>
              <a href="#" className="hover:underline">
                PRESS
              </a>
              <a href="#" className="hover:underline">
                FEEDBACK
              </a>
            </div>
            <div className="text-xs text-white mt-4">
              <p>Simplotel - Hotel Website Design & Booking Engine</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
