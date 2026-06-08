import { useQuery } from '@tanstack/react-query';
import useEmblaCarousel from 'embla-carousel-react';
import {
  Calendar,
  CheckCircle,
  ChevronLeft, ChevronRight,
  FileText,
  Fuel,
  Gauge,
  Palette,
  Settings
} from 'lucide-react';
import { useCallback } from 'react';
import { useParams } from 'react-router';
import Loading from '../../components/Loading';
import { fetchListingById } from './details';

const DetailsOfListing = () => {


  // Slider Logic
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });

  const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi]);



  const { id } = useParams()

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["listing", id],
    queryFn: () => fetchListingById(id as string),
  });


  const seller = {
    avatar: data?.data?.seller?.avatar ?? "https://res.cloudinary.com/dzvxz7fdt/image/upload/v1773341258/images/96145e67-1c24-4e2c-91aa-c34657038b90-1_all_41328.jpg-1773341247128.jpg",
    fullName: data?.data?.seller?.fullName,
    email: data?.data?.seller?.email,
    bio: data?.data?.seller?.bio,
    location: data?.data?.seller?.location,
    isVerified: data?.data?.seller?.isVerified,
    isActive: data?.data?.seller?.isActive,
  };


  const imagesOrvideos = data?.data?.imagesAndVideos || []


  const vehicleSpecs = [
    { label: 'Year', value: `${data?.data?.year ?? 33}`, icon: Calendar },
    { label: 'Mileage', value: `${data?.data?.mileage ?? 'Empty'}`, icon: Gauge },
    { label: 'Transmission', value: data?.data?.trans ?? "Empty", icon: Settings },
    { label: 'Condition', value: data?.data?.condition ?? 'Empty', icon: Fuel },
    { label: 'Color', value: data?.data?.color ?? "Empty", icon: Palette },
    { label: 'Sold', value: data?.data?.sold ? 'Sold' : 'Available', icon: FileText },
  ];

  if (isLoading) {
    return <Loading></Loading>
  }

  if (isError || error) {
    return <h1 className='text-white text-center'>Something Error!!</h1>
  }
  return (

    <div className="min-h-screen px-4  py-6 bg-linear-to-b from-[#0B0F1A] to-[#05070D]">

      <main className="grid grid-cols-1 lg:grid-cols-12 gap-8">

        {/* LEFT SIDE */}
        <div className="lg:col-span-8 space-y-8">

          {/* HERO SLIDER */}
          <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-white/10">
            <div className="overflow-hidden" ref={emblaRef}>
              <div className="flex">

                {imagesOrvideos?.map((item) => (
                  <div
                    key={item?._id}
                    className="flex-[0_0_100%] h-65 sm:h-100 lg:h-130"
                  >
                    <img
                      src={
                        item?.url ||
                        "https://images.unsplash.com/photo-1541899481282-d53bffe3c35d"
                      }
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                    />
                  </div>
                ))}

              </div>
            </div>

            {/* controls */}
            <button
              onClick={scrollPrev}
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-white/90 text-white hover:text-black p-3 rounded-full backdrop-blur"
            >
              <ChevronLeft />
            </button>

            <button
              onClick={scrollNext}
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-white/90 text-white hover:text-black p-3 rounded-full backdrop-blur"
            >
              <ChevronRight />
            </button>
          </div>

          {/* VEHICLE INFO CARD */}
          <div className="rounded-3xl p-6 sm:p-8 border border-white/10 bg-white/5 backdrop-blur-xl">

            <h2 className="text-white text-2xl font-semibold mb-6">
              Vehicle Overview
            </h2>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-5">
              {vehicleSpecs.map((spec, i) => (
                <div
                  key={i}
                  className="p-4 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition"
                >
                  <spec.icon className="text-blue-400 mb-2" size={22} />
                  <p className="text-xs text-gray-400">{spec.label}</p>
                  <p className="text-white text-sm font-medium">
                    {spec.value}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-8 space-y-6">
              <div>
                <h3 className="text-gray-400 text-sm">Title</h3>
                <p className="text-white text-lg">{data?.data?.title}</p>
              </div>

              <div>
                <h3 className="text-gray-400 text-sm">Description</h3>
                <p className="text-white leading-relaxed">
                  {data?.data?.description}
                </p>
              </div>
            </div>

          </div>
        </div>

        {/* RIGHT SIDEBAR */}
        <div className="lg:col-span-4 space-y-6 lg:sticky lg:top-6 h-fit">

          {/* SELLER CARD */}
          <div className="rounded-3xl p-6 border border-white/10 bg-white/5 backdrop-blur-xl text-center">

            <img
              src={seller.avatar}
              className="w-24 h-24 mx-auto rounded-full object-cover border-4 border-white/10"
            />

            <h2 className="text-white mt-4 text-lg font-semibold flex justify-center items-center gap-2">
              {seller.fullName}
              {seller.isVerified && (
                <CheckCircle className="text-blue-400 w-5 h-5" />
              )}
            </h2>

            <p className="text-gray-400 text-sm">{seller.email}</p>
            <p className="text-gray-400 text-sm mt-2">{seller.location}</p>

            <div className="flex justify-center gap-2 mt-4">
              <span className="px-3 py-1 text-xs rounded-full bg-green-500/10 text-green-400 border border-green-500/30">
                {seller.isActive ? "Active" : "Inactive"}
              </span>

              <span className="px-3 py-1 text-xs rounded-full bg-white/10 text-white border border-white/10">
                {seller.isVerified ? "Verified" : "Not Verified"}
              </span>
            </div>

          </div>

          {/* PRICE CARD */}
          <div className="rounded-3xl p-6 border border-white/10 bg-linear-to-br from-white/10 to-white/5 backdrop-blur-xl">

            <h2 className="text-white text-lg font-semibold mb-4">
              Listing Details
            </h2>

            <div className="space-y-3 text-sm text-gray-300">

              <div className="flex justify-between">
                <span>Price</span>
                <span className="text-white font-semibold">
                  ${data?.data?.price}
                </span>
              </div>

              <div className="flex justify-between">
                <span>Category</span>
                <span className="text-white">
                  {data?.data?.category}
                </span>
              </div>

              <div className="flex justify-between">
                <span>Inquiries</span>
                <span className="text-white">
                  {data?.data?.inquiryCount}
                </span>
              </div>

            </div>

          </div>

        </div>

      </main>
    </div>
  );
};

export default DetailsOfListing;