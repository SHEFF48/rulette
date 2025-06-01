// import Header from "@/components/layout/main/Header";
// import Footer from "@/components/layout/main/Footer";
import { cn } from "@/lib/utils";

export default function PageLayout({
  className,
  children,
}: Readonly<{
  className?: string;
  children: React.ReactNode;
}>) {
  return (
    <div className="grid grid-rows-[minmax(50px,_auto)_minmax(20px,_1fr)_minmax(20px,_auto)] items-start justify-items-center min-h-screen font-josefin transition-all  duration-300 ease-in-out delay-200">
      {/* <Header /> */}
      <main
        className={cn(
          "flex flex-col  items-start sm:items-start h-fit w-[1280px] mx-auto overflow-hidden ",
          className
        )}
      >
        {children}
      </main>
      {/* <Footer /> */}
    </div>
  );
}
