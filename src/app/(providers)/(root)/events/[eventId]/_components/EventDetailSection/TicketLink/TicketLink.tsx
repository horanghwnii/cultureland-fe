import Image from "next/image";
import Link from "next/link";

function TicketLink() {
  const bookingLink = ["인터파크", "위메프", "쿠팡"];

  return (
    <div className="group relative w-80 mx-auto mb-16 z-40">
      <button className=" transition duration-200 rounded-lg overflow-hidden bg-user-theme-100 text-font-white text-center text-fs-14 w-full px-[10px] py-[10px] focus:outline-none">
        예매처
        <Image
          src={"/utils/icons/white.png"}
          alt="drop-down"
          width={24}
          height={24}
          className="absolute top-2 right-8"
        />
      </button>

      <div className="opacity-0 group-hover:opacity-100 hover:opacity-0 absolute w-full mt-6 transition-opacity duration-300 transform group-hover:translate-y-0">
        <ul className="flex flex-col shadow-primary rounded-md py-2 px-2 bg-white">
          {bookingLink.map((link, index) => (
            <li
              key={index}
              className="px-4 py-[15px] text-fs-14 text-font-40 hover:text-user-theme-100 transition cursor-pointer"
            >
              <Link href={"#"}>{link}</Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default TicketLink;
