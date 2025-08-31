interface Props {
  search: string;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
}

export default function SearchBar({ search, setSearch }: Props) {
  return (
    <input
      type="text"
      placeholder="Buscar tarefa..."
      value={search}
      onChange={e => setSearch(e.target.value)}
      className="w-full mb-4 border rounded px-2 py-1"
    />
  );
}
