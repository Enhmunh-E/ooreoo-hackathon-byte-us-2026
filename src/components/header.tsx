// export const Header = () => {
//   return (
//     <header className="flex flex-col">
//       {/* --- Top Tag --- */}
//       <div className="flex items-start">
//         <span className="text-xs font-semibold py-1.5 px-3 text-white bg-[#333333] rounded-lg">
//           Carnegie Mellon university
//         </span>
//       </div>

//       {/* --- Main Address Title --- */}
//       <div className="text-xl font-bold text-white mb-2">
//         Ar-Rayyan Zone 52, Al Rayy...
//       </div>

//       {/* --- Search Bar --- */}
//       <div className="bg-[#333333] rounded-full flex items-center px-4 py-3">
//         <svg
//           width="24"
//           height="24"
//           viewBox="0 0 24 24"
//           fill="none"
//           xmlns="http://www.w3.org/2000/svg"
//           className="flex-shrink-0"
//         >
//           <g id="Interface / Search_Magnifying_Glass">
//             <path
//               id="Vector"
//               d="M14.4304 15.5656L18.4293 19.5656M9.43185 17.5656C5.56693 17.5656 2.4338 14.4315 2.4338 10.5656C2.4338 6.69956 5.56693 3.56555 9.43185 3.56555C13.2968 3.56555 16.4299 6.69956 16.4299 10.5656C16.4299 14.4315 13.2968 17.5656 9.43185 17.5656Z"
//               stroke="#B4B4B4"
//               strokeWidth="2"
//               strokeLinecap="round"
//               strokeLinejoin="round"
//             />
//           </g>
//         </svg>
//         <input
//           className="bg-transparent border-none outline-none text-white placeholder-[#B4B4B4] w-full ml-3 text-base"
//           placeholder="Search for Pizza"
//           type="text"
//         />
//       </div>
//     </header>
//   );
// };

// components/Header.jsx
export const Header = () => {
  return (
    <header className="flex flex-col gap-4 mb-6">
      {/* Top Row: Address & Premium CTA */}
      <div className="flex items-center justify-between">
        <div className="flex flex-col">
          <span className="text-xs font-medium text-gray-400 bg-[#2C2C2C] w-fit px-2 py-1 rounded-md mb-1">
            Carnegie Mellon University
          </span>
          <div className="flex items-center gap-1">
            <span className="text-white font-bold text-lg truncate max-w-[200px]">
              Ar-Rayyan Zone 52, Al Rayy...
            </span>
            {/* Dropdown Arrow */}
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M6 9l6 6 6-6" />
            </svg>
          </div>
        </div>

        {/* Royal Club Button */}
        <button className="bg-white text-black text-xs font-bold px-3 py-2 rounded-full flex items-center gap-2 shadow-lg hover:bg-gray-200 transition">
          <div className="leading-tight flex flex-col items-start">
            <span>Join our</span>
            <span>Royal Club</span>
          </div>
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="black"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M2 4l3 12h14l3-12-6 7-4-7-4 7-6-7zm3 16h14v2H5z" />
          </svg>
        </button>
      </div>

      {/* Search Bar */}
      <div className="relative">
        <div className="absolute left-4 top-1/2 -translate-y-1/2">
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#9CA3AF"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          </svg>
        </div>
        <input
          type="text"
          placeholder="Search for Pizza, Groceries, Pharmacy..."
          className="w-full bg-[#2C2C2C] text-white placeholder-gray-400 rounded-xl py-3.5 pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-primary/50"
        />
      </div>
    </header>
  );
};
