import type { SVGProps } from "react";

export function SoutheastArrowIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      viewBox="0 0 512 512"
      {...props}
      style={{
        transform: "rotate(113deg)",
      }}
    >
      <path
        fill="currentColor"
        d="M390.624 150.625L256 16L121.376 150.625l22.628 22.627l95.997-95.998v417.982h32V77.257l95.995 95.995z"
      >
      </path>
    </svg>
  );
}
