type SupportLinkProps = {
  href: string;
  title: string;
  note: string;
};

export function SupportLink({ href, title, note }: SupportLinkProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="flex min-h-28 flex-col items-start justify-center rounded-[1.35rem] bg-cream bg-[radial-gradient(circle_at_92%_18%,rgba(221,241,232,0.9),transparent_34%)] p-[1.35rem] shadow-xs transition duration-450 ease-soft hover:-translate-y-0.5 hover:bg-mint hover:shadow-card"
    >
      <span className="text-lead font-black text-ink">{title}</span>
      <small className="mt-1 text-[0.82rem] font-extrabold text-muted">{note}</small>
    </a>
  );
}
