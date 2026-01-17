// app/page.jsx
import { Footer, Header } from "@/components";

export default function Profile() {
  return (
    <div className=" bg-[#121212] flex-1 text-white flex flex-col font-sans selection:bg-[#FF1C45] selection:text-white">
      <div className="max-w-md mx-auto w-full flex-1 flex flex-col h-195.5 overflow-y-scroll">
        {/* 1. HEADER: Add bottom padding to separate it from content */}
        <div className="pt-8 px-5 mb-6">
          <Header />
        </div>
        <div className="flex-1"></div>
      </div>
      <Footer />
    </div>
  );
}
