interface Props {
  search: string;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
}

export default function SearchBar({ search, setSearch }: Props) {
  return (
    <div className="relative w-full">
      <input
        type="text"
        placeholder="Search note..."
        value={search}
        onChange={e => setSearch(e.target.value)}
        className="w-full border border-purple-400 rounded-md px-6 py-3 pr-12 bg-white text-purple-500 placeholder-purple-300 focus:outline-none focus:ring-2 focus:ring-purple-200 text-base transition"
      />
      <span className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none">
        <svg
          className="w-6 h-6 text-purple-400"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          viewBox="0 0 24 24"
        >
          <circle cx="11" cy="11" r="7" />
          <line x1="21" y1="21" x2="16.65" y2="16.65" />
        </svg>
      </span>
    </div>
  );
}
