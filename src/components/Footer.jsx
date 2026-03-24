// import { useStore } from '../hooks/useStore.js';

export default function Footer() {
  // const { go } = useStore();
  // function scrollTo_(id) {
  //   go('landing');
  //   setTimeout(() => {
  //     const el = document.getElementById(id);
  //     if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  //   }, 120);
  // }

  return (
    <footer className="bg-[#180806]">
      <div className="max-w-site mx-auto px-5 md:px-[72px] pt-16 pb-9">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[1.6fr_1fr_1fr_1fr] gap-8 lg:gap-12 pb-12 border-b border-white/7">
          {/* Brand */}
          <div>
            <span className="font-serif text-[1.5rem] font-bold text-white block mb-[14px]">
              Gift<em className="text-rose not-italic">ly</em> 
            </span>
            <p className="text-[.86rem] text-white/42 leading-[1.75] mb-6">
              AI-powered gift discovery that helps you find thoughtful, personalized gifts for anyone - in seconds. No stress, no guesswork.
            </p>
           
          </div>

          {/* Product */}
          <div>
            <h4 className="text-[.8rem] font-extrabold tracking-[.1em] uppercase text-white/50 mb-[18px]">Product</h4>
            <ul className="list-none">
              {[
                { label: 'Gift Finder'  },
                { label: 'Collections' },
                { label: '' },
                { label: 'Saved Gifts' },
              ].map(({ label, action }) => (
                <li key={label} className="mb-[10px]">
                  <a className="text-[.85rem] text-white/42 no-underline cursor-pointer hover:text-white transition-colors"
                    onClick={action}>{label}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-[.8rem] font-extrabold tracking-[.1em] uppercase text-white/50 mb-[18px]">Company</h4>
            <ul className="list-none">
              {['About Us','Blog','Contact'].map(l => (
                <li key={l} className="mb-[10px]">
                  <a className="text-[.85rem] text-white/42 no-underline cursor-pointer hover:text-white transition-colors"
                    onClick={() => l === 'Blog'}>{l}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-[.8rem] font-extrabold tracking-[.1em] uppercase text-white/50 mb-[18px]">Legal</h4>
            <ul className="list-none">
              {['Privacy Policy','Terms of Use','Cookie Policy'].map(l => (
                <li key={l} className="mb-[10px]">
                  <a href="#" className="text-[.85rem] text-white/42 no-underline hover:text-white transition-colors">{l}</a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="pt-7 text-center justify-between items-center gap-3 flex-wrap">
           <p className="text-[.78rem] text-white/25">© 2026 Giftly · All rights reserved. </p>
        </div>
      </div>
    </footer>
  );
}