import ColorButton from "../components/ColorButton";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 bg-bg-alt/20 backdrop-blur-md border-b border-line">
      <nav className="flex flex-row items-center font-bold justify-between px-7 p-4.5 max-w-(--maxw) mx-auto">
        <div className="flex gap-3 items-center">
          <span className="bg-blue ml-3 w-2 h-5 shadow-sm shadow-blue rounded-full"></span>
          <a
            href="#top"
            className="flex font-space  shadow-ink-faint text-ink text-[1.05rem] gap-0.5 font-medium tracking-widest items-center"
          >
            port studio
          </a>
        </div>

        <div className=" flex gap-3 items-center">
          <a className="text-ink-soft tracking-wide mr-1 text-sm font-monospace">
            X-ADMIN_KEY:
          </a>
          <input
            placeholder="*+'#$%&/()=?"
            type="text"
            className="text-ink font-normal h-9 border border-line focus:border-blue focus:outline focus:outline-blue rounded-md px-2 py-1 text-sm"
          />
          <ColorButton color="transparent" text="Prüfen" onClick={() => {}} />
        </div>
      </nav>
    </header>
  );
}
