export default function NavBar({ title, tabs }) {
  return (
    <nav className="flex items-center max-sm:flex-col max-sm:items-stretch max-sm:pb-4 max-sm:px-4 py-6 px-8 border-b border-b-divider gap-y-5 sticky top-0 z-10 bg-background">
      <h1 className="grow max-sm:text-xl font-bold text-2xl text-title">
        {title}
      </h1>
      <div className="flex items-center gap-x-3 empty:hidden max-sm:*:w-full">
        {tabs}
      </div>
    </nav>
  );
}
