import Link from "next/link";

export default function Menu({
  text,
  link,
  children,
}: {
  text: string;
  link: string;
  children: React.ReactNode;
}) {
  return (
    <>
      <li>
        <Link
          href={link}
          className="flex items-center p-2 text-white hover:text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
        >
          {children}
          <span className="ml-3">{text}</span>
        </Link>
      </li>
    </>
  );
}
