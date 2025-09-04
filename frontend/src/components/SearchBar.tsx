
interface Props {
  search: string;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
}

export default function SearchBar({ search, setSearch }: Props) {
  return (
    <div className="relative w-full">
      <input
        type="text"
        placeholder="Buscar tarefa..."
        value={search}
        onChange={e => setSearch(e.target.value)}
        className="pr-12 focus:ring-2 w-full border border-primary rounded-lg py-3 pl-6 pr-12 bg-white text-primary text-base outline-none transition"
      />
      <span className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none">
        <svg
          className="w-6 h-6 stroke-primary"
          fill="none"
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
