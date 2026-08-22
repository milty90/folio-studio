import ColorButton from "../components/ColorButton";
import { InputField } from "../components/InputField";

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
              <InputField
                label=""
                hint={"Enter Password"}
                value={password}
                onChange={(value) => onChangePassword(value)}
                type="password"
                isActive={!isLoggedIn}
              />
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
