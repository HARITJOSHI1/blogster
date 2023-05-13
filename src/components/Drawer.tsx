import { type Url } from "next/dist/shared/lib/router/router";
import Link from "next/link";

export interface IDrawerConfig {
  list: {
    link: Url;
    value: string;
    as?: string;
    fn?: <T>(args?: T[]) => void;
  }[];
}

export default function Drawer(props: IDrawerConfig) {
  const generateLists = (list: IDrawerConfig["list"]) => {
    return list.map((s, idx) => {
      return (
        <Link
          href={s.link}
          key={idx}
          className="text-2xl font-semibold"
          as={s.as}
          onClick={() => {
            if (s.fn) s.fn();
          }}
        >
          <div className="mb-12 text-white">{s.value}</div>
        </Link>
      );
    });
  };

  return (
    <div className="drawer-mobile drawer">
      <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
      <div className="item-start drawer-content flex flex-col">
        <label
          htmlFor="my-drawer-2"
          className="drawer-button lg:hidden mt-4 pl-2"
        >
          <div className="space-y-2">
            <span className="block h-0.5 w-8 bg-gray-600"></span>
            <span className="block h-0.5 w-5 bg-gray-600"></span>
          </div>
        </label>
      </div>
      <div className="drawer-side">
        <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
        <ul className="menu w-80 bg-base-100 bg-gray-900 p-4 text-base-content">
          {generateLists(props.list)}
        </ul>
      </div>
    </div>
  );
}
