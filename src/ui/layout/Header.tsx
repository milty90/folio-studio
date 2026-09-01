import ColorButton from "../components/ColorButton";

interface HeaderProps {
  onLogin: () => void;
  onLogout: () => void;
  onChangePassword: (value: string) => void;
  isLoggedIn: boolean | null;

  password: string;
}

export default function Header({
  onLogin,
  onLogout,
  onChangePassword,
  isLoggedIn,

  password,
}: HeaderProps) {
  return (
    <header className="sticky top-0 z-50 bg-bg-alt/20 backdrop-blur-md border-b border-line">
      <nav className="flex flex-row items-center font-bold justify-between px-7 p-4.5 h-19 max-w-(--maxw) mx-auto">
        <div className="flex gap-3 items-center">
          <span className="bg-blue ml-3 w-2 h-5 shadow-sm shadow-blue rounded-full"></span>
          <a
            href="#top"
            className="flex font-space  shadow-ink-faint text-ink text-[1.05rem] gap-0.5 font-medium tracking-widest items-center"
          >
            port studio
          </a>
        </div>

        <div className=" flex justify-between gap-3 md:w-2/4 items-center">
          <div className="flex flex-row gap-3 items-center">
            <a className="text-ink-soft tracking-wide mr-1 text-sm font-monospace">
              ADMIN_Password:
            </a>
            {isLoggedIn ? (
              <span className="text-ink font-light tracking-wider ml-1 text-xs font-monospace">
                {"LOGGED_IN"}
              </span>
            ) : (
              <form
                onSubmit={(event) => {
                  event.preventDefault();
                  onLogin();
                }}
              >
                <input
                  type="password"
                  autoComplete="current-password"
                  placeholder="Enter Password"
                  value={password}
                  onChange={(event) => onChangePassword(event.target.value)}
                  className="text-ink pl-3 font-normal h-10 border bg-bg/30 border-line placeholder:text-[0.82rem] placeholder:pl-1 focus:outline rounded-md px-2 py-1 text-sm font-monospace border-line placeholder:text-ink-faint focus:border-blue focus:ring focus:ring-blue-500"
                />
              </form>
            )}
          </div>
          <ColorButton
            isActive={true}
            color={isLoggedIn ? "blue" : "transparent"}
            text={isLoggedIn ? "Logout" : "Login"}
            onClick={isLoggedIn ? () => onLogout() : () => onLogin()}
          />
        </div>
      </nav>
    </header>
  );
}
