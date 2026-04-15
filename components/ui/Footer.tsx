import Link from "next/link";

export function Footer() {
  return (
    <>

      {/* ══════════ FOOTER ══════════ */}
      <footer className="w-full bg-[#050505] pt-16 pb-20 flex flex-col items-center border-t border-white/5" id="main-footer">
        <div className="w-full max-w-7xl mx-auto px-6 flex flex-col items-center justify-center text-center gap-4">
          <div className="flex flex-row items-center justify-center gap-3 w-full">
            <img
              src="/logo.webp"
              alt="LockerRoom"
              className="w-8 h-8 object-contain"
            />
            <span className="text-white font-bold tracking-wider text-sm uppercase">
              LockerRoom Clothing
            </span>
          </div>
          <p className="text-gray-500 text-xs tracking-widest text-center w-full">
            Custom clothing, dibuat untuk ekspresi dirimu.
          </p>
          <p className="text-white/40 text-xs pb-4 w-full text-center">
            &copy; {new Date().getFullYear()} LockerRoom Clothing. All rights reserved.
          </p>
        </div>
      </footer>
    </>
  );
}