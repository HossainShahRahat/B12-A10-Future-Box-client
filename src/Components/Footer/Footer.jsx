import { FaFacebook, FaYoutube } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

const Footer = () => {
  return (
    <footer className="flex flex-wrap justify-around items-start p-10 bg-base-200 text-base-content rounded-t-lg mt-16 gap-8">
      <aside>
        <div className="flex flex-row items-center">
          <span className="text-3xl">🗓️</span>
          <p className="font-bold text-xl">SocialEvents</p>
        </div>
        <br />
        <p>
          <span className="font-normal text-base">
            Connecting communities since 2025
          </span>
        </p>
      </aside>

      <nav className="flex flex-col gap-1">
        <h6 className="footer-title">Services</h6>
        <a className="link link-hover">Event Hosting</a>
        <a className="link link-hover">Community Outreach</a>
        <a className="link link-hover">Volunteer Matching</a>
        <a className="link link-hover">Donation Drives</a>
      </nav>
      <nav className="flex flex-col gap-1">
        <h6 className="footer-title">Company</h6>
        <a className="link link-hover">About us</a>
        <a className="link link-hover">Contact</a>
        <a className="link link-hover">Privacy Policy</a>
        <a className="link link-hover">Terms of Use</a>
      </nav>
      <nav className="flex flex-col gap-2">
        <h6 className="footer-title">Social</h6>
        <div className="grid grid-flow-col gap-4 text-3xl">
          <a>
            <FaFacebook />
          </a>
          <a>
            <FaYoutube />
          </a>
          <a>
            <FaXTwitter />
          </a>
        </div>
      </nav>
    </footer>
  );
};

export default Footer;
