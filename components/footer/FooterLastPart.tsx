import Link from "next/link";
import { IoLocationOutline } from "react-icons/io5";

function FooterLastPart() {
  return (
    <div className="sm:flex sm:justify-between sm:items-center grid grid-cols-1 justify-items-center items-center py-5 border-b-2 w-full border-neutral-100 mb-4 px-4 sm:px-0">
      <div className="sm:flex sm:flex-1/3 gap-10 sm:flex-col">
        <h6 className="text-sm text-center mb-4 sm:text-left text-white sm:mb-0">
          Operating hours: Monday – Saturday (10am - 8pm) Sunday (12pm - 8pm)
        </h6>
        <p className="flex text-white items-center justify-center sm:justify-start sm:text-left text-center mb-5 sm:mb-0">
          <IoLocationOutline /> Literally Nowhere
        </p>
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3261.8583186244705!2d-98.44475562477331!3d35.1601540584231!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x87adb30a8a545c83%3A0x145a97e92e23432a!2sNowhere%20Bait%20Shop%20%26%20Lake%20Store!5e0!3m2!1sen!2sng!4v1768399308267!5m2!1sen!2sng"
          width="400"
          height="300"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>
      <div className="my-10 sm:mt-0 flex flex-1/3 flex-col gap-5 text-center sm:text-right">
        <h5 className="text-white">Quick Links</h5>
        <Link href="/" className="text-white">
          Home
        </Link>
        <Link href="/" className="text-white">
          Home
        </Link>
        <Link href="/" className="text-white">
          Home
        </Link>
        <Link href="/" className="text-white">
          Home
        </Link>
        <Link href="/" className="text-white">
          Home
        </Link>
      </div>
    </div>
  );
}

export default FooterLastPart;
