
import { theme } from '../theme';

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
        style={{
          width: '100%',
          border: `1px solid ${theme.colors.primary}`,
          borderRadius: 6,
          padding: '12px 48px 12px 24px',
          background: theme.colors.background,
          color: theme.colors.text,
          fontSize: 16,
          outline: 'none',
          transition: 'box-shadow 0.2s',
        }}
        className="pr-12 focus:ring-2"
      />
      <span className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none">
        <svg
          className="w-6 h-6"
          fill="none"
          stroke={theme.colors.primary}
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
