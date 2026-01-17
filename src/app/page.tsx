// app/page.jsx
import { Footer, Header } from "@/components";

export default function Home() {
  return (
    <div className=" bg-[#121212] text-white flex flex-col font-sans selection:bg-[#FF1C45] selection:text-white">
      <div className="max-w-md mx-auto w-full flex-1 flex flex-col max-h-195.5 overflow-y-scroll pb-32 scrollbar-hide">
        {/* 1. HEADER */}
        <div className="pt-8 px-5 mb-6">
          <Header />
        </div>

        {/* 2. HERO BANNER */}
        <div className="px-5 mb-8">
          <div className="w-full h-44 bg-gradient-to-br from-[#FF1C45] to-[#FF6B00] rounded-3xl relative overflow-hidden shadow-2xl shadow-red-900/20 group cursor-pointer transition-transform hover:scale-[1.02]">
            <div className="absolute left-6 top-8 z-10">
              <span className="bg-white/20 backdrop-blur-md text-white text-[10px] font-bold px-3 py-1 rounded-full border border-white/10">
                LIMITED OFFER
              </span>
              <h2 className="text-3xl font-black text-white leading-none mt-3 tracking-tight">
                Hungry? <br /> Get 50% Off
              </h2>
            </div>
            <div className="absolute -right-4 -bottom-6 text-[160px] drop-shadow-lg opacity-90 group-hover:rotate-12 transition-transform duration-500">
              🍔
            </div>
          </div>
        </div>

        {/* 3. ESSENTIALS (The Daily Drivers) */}
        <div className="px-5 mb-2">
          <h3 className="text-xl font-bold text-white mb-6">Essentials</h3>

          {/* 4 Columns x 2 Rows Grid */}
          <div className="grid grid-cols-4 gap-3 mb-3">
            <ServiceItem
              label="Food"
              icon="🍔"
              color="bg-red-500/10 text-red-500"
            />
            <ServiceItem
              label="Snoomart"
              icon="🛍️"
              color="bg-gradient-to-br from-orange-500 to-red-500 text-white shadow-lg shadow-orange-900/20"
              badge="24/7"
              isSpecial={true}
            />
            <ServiceItem
              label="Grocery"
              icon="🥦"
              color="bg-green-500/10 text-green-500"
            />
            <ServiceItem
              label="Pharmacy"
              icon="💊"
              color="bg-blue-500/10 text-blue-500"
            />

            <ServiceItem
              label="Flowers"
              icon="💐"
              color="bg-pink-500/10 text-pink-500"
            />
            <ServiceItem
              label="Send"
              icon="📦"
              color="bg-purple-500/10 text-purple-500"
            />
            <ServiceItem
              label="S City"
              icon="🎡"
              color="bg-gradient-to-br from-purple-600 to-indigo-600 text-white shadow-lg shadow-purple-900/20"
              badge="New"
              isSpecial={true}
            />
            {/* Added Market here to fill the grid since Electronics moved down */}
            <ServiceItem
              label="Market"
              icon="🏪"
              color="bg-yellow-500/10 text-yellow-500"
            />
          </div>
        </div>

        {/* 4. YOUR EVERYTHING APP (New Horizontal Scroll Section) */}
        <div className="pl-5 mb-8 pt-4">
          <h3 className="text-xl font-bold text-white mb-5">
            Your Everything App
          </h3>
          <div className="flex gap-3 overflow-x-auto pb-4 pr-5 scrollbar-hide">
            <SecondaryCard
              label="Laundry"
              icon="👕"
              bg="from-cyan-900/80 to-blue-900/80"
            />
            <SecondaryCard
              label="Prime"
              icon="💎"
              bg="from-slate-800 to-black border-white/10 border"
            />
            <SecondaryCard
              label="Tamwin"
              icon="🌾"
              bg="from-amber-900/80 to-yellow-900/80"
            />
            <SecondaryCard
              label="Electronics"
              icon="🎮"
              bg="from-indigo-900/80 to-violet-900/80"
            />
            <SecondaryCard
              label="Home Biz"
              icon="💼"
              bg="from-rose-900/80 to-pink-900/80"
            />
            <SecondaryCard
              label="Takeaway"
              icon="🥡"
              bg="from-emerald-900/80 to-green-900/80"
            />
            <SecondaryCard
              label="Drive Thru"
              icon="🚗"
              bg="from-red-900/80 to-orange-900/80"
            />
            <SecondaryCard
              label="Charity"
              icon="🎗️"
              bg="from-teal-900/80 to-cyan-900/80"
            />
            <SecondaryCard
              label="My House"
              icon="🏡"
              bg="from-blue-900/80 to-indigo-900/80"
            />
            <SecondaryCard
              label="My Car"
              icon="🚘"
              bg="from-gray-800 to-slate-800"
            />
          </div>
        </div>

        {/* 5. POPULAR BRANDS */}
        <div className="pl-5 mb-8">
          <div className="flex items-center justify-between pr-5 mb-4">
            <h3 className="text-xl font-bold text-white">Popular Brands</h3>
            <span className="text-[#FF1C45] text-xs font-bold">See all</span>
          </div>
          <div className="flex gap-4 overflow-x-auto pb-4 pr-5 scrollbar-hide">
            <BrandItem
              name="Jollibee"
              color="bg-[#D30F15]"
              textColor="text-white"
            />
            <BrandItem
              name="Oak Berry"
              color="bg-[#4B1E63]"
              textColor="text-white"
            />
            <BrandItem name="Koshari" color="bg-white" textColor="text-black" />
            <BrandItem
              name="Shabrawi"
              color="bg-[#FFF8E7]"
              textColor="text-red-800"
            />
            <BrandItem
              name="McDonalds"
              color="bg-[#FFC72C]"
              textColor="text-black"
            />
          </div>
        </div>

        {/* 6. OFFERS & EVENTS */}
        <div className="pl-5 mb-6">
          <h3 className="text-xl font-bold text-white mb-4">Offers & Events</h3>
          <div className="flex gap-4 overflow-x-auto pb-4 pr-5 scrollbar-hide">
            <OfferCard
              title="Be The Next Millionaire"
              sub="Win 10k QAR"
              bg="bg-gradient-to-r from-blue-900 to-slate-900"
            />
            <OfferCard
              title="Weekly Offers"
              sub="Up to 60% OFF"
              bg="bg-gradient-to-r from-gray-100 to-gray-300"
              isLight={true}
            />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

// --- COMPONENT LIBRARY ---

const ServiceItem = ({ label, icon, color, badge, isSpecial }) => (
  <div className="flex flex-col items-center gap-2 cursor-pointer group">
    <div
      className={`relative w-[76px] h-[76px] rounded-[24px] ${color} flex items-center justify-center transition-all duration-300 group-hover:scale-105 ${!isSpecial && "group-hover:bg-opacity-20"}`}
    >
      {badge && (
        <span
          className={`absolute -top-2 -right-1 text-[9px] font-bold px-2 py-0.5 rounded-full shadow-sm z-10 border border-[#121212] ${isSpecial ? "bg-white text-black" : "bg-[#FF1C45] text-white"}`}
        >
          {badge}
        </span>
      )}
      <span className="text-3xl filter drop-shadow-sm">{icon}</span>
    </div>
    <span
      className={`text-[11px] font-medium transition-colors ${isSpecial ? "text-white font-bold" : "text-gray-400 group-hover:text-white"}`}
    >
      {label}
    </span>
  </div>
);

const SecondaryCard = ({ label, icon, bg }) => (
  <div
    className={`min-w-[85px] h-[100px] rounded-2xl bg-gradient-to-br ${bg} border border-white/5 flex flex-col items-center justify-center gap-2 relative overflow-hidden group cursor-pointer`}
  >
    <div className="absolute top-0 left-0 w-full h-full bg-white/0 group-hover:bg-white/10 transition-colors"></div>
    <span className="text-3xl group-hover:scale-110 transition-transform duration-300 filter drop-shadow-lg">
      {icon}
    </span>
    <span className="text-[10px] font-bold text-gray-200 text-center leading-tight px-1">
      {label}
    </span>
  </div>
);

const BrandItem = ({ name, color, textColor }) => (
  <div className="flex flex-col items-center gap-2 cursor-pointer group min-w-[80px]">
    <div
      className={`w-20 h-20 rounded-[20px] ${color} flex items-center justify-center shadow-md transition-transform duration-300 group-hover:scale-105 border border-white/5`}
    >
      <span
        className={`text-[10px] font-black uppercase text-center leading-tight px-1 ${textColor}`}
      >
        {name}
      </span>
    </div>
  </div>
);

const OfferCard = ({ title, sub, bg, isLight }) => (
  <div
    className={`min-w-[240px] h-[130px] rounded-[24px] ${bg} relative overflow-hidden shadow-lg group cursor-pointer`}
  >
    <div className="absolute top-4 left-5 z-10 flex flex-col items-start">
      <h4
        className={`text-xl font-black leading-tight max-w-[120px] ${isLight ? "text-black" : "text-white"}`}
      >
        {title}
      </h4>
      <span
        className={`mt-2 text-[10px] font-bold px-2 py-1 rounded-full ${isLight ? "bg-[#FF1C45] text-white" : "bg-white text-black"}`}
      >
        {sub}
      </span>
    </div>
    <div
      className={`absolute -right-6 -bottom-6 w-32 h-32 rounded-full opacity-20 ${isLight ? "bg-black" : "bg-white"}`}
    ></div>
  </div>
);
