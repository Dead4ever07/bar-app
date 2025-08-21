import React from "react";
import "../../index.css";
import members from "./Members";
/**
 * TeamGrid Component
 * 
 * Props:
 *  - members: Array<{
 *      name: string;
 *      photo?: string;   // image url
 *      role?: string;    // optional subtitle under the name
 *      href?: string;    // optional link wrapper around the card
 *    }>
 *  - columns?: number    // optional base column count (default 2)
 *
 * Usage:
 *  <TeamGrid members={[{ name: 'Sam', photo: '...' }]} />
 */
export function TeamGrid({columns = 2 }) {
  return (
    <div
      className={[
        "grid gap-6",
        columns === 1 ? "grid-cols-1" : "grid-cols-2",
        "sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6",
      ].join(" ")}
    >
      {members.map((m, i) => (
        <MemberCard key={m.name + i} member={m} />)
      )}
    </div>
  );
}

function MemberCard({ member }) {
  const { name, role, photo, href } = member;
  const content = (
    <div
      className="group rounded-2xl p-3 bg-white/5 hover:bg-white/10 transition shadow-sm hover:shadow-md backdrop-blur-sm border border-white/10"
      aria-label={name}
    >
      <Avatar name={name} src={photo} />
      <div className="mt-3 text-center">
        <div className="text-base font-semibold tracking-tight">{name}</div>
        {role ? (
          <div className="text-sm opacity-70 leading-tight">{role}</div>
        ) : null}
      </div>
    </div>
  );

  return href ? (
    <a href={href} className="focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 rounded-2xl">
      {content}
    </a>
  ) : (
    content
  );
}

function Avatar({ name, src }) {
  // Fallback initials (e.g., "Sam Doe" -> "SD")
  const initials = name
    .split(" ")
    .map((n) => n[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  return (
    <div className="w-full aspect-square rounded-xl overflow-hidden bg-white/10 flex items-center justify-center">
      {src ? (
        
        <img
          src={src}
          alt={name}
          loading="lazy"
          className="w-full h-full object-cover group-hover:scale-105 transition"
          onError={(e) => {
            e.currentTarget.style.display = "none";
            const fallback = e.currentTarget.nextElementSibling;
            if (fallback) fallback.style.display = "flex";
          }}
        />
      ) : null}
      {/* Fallback tile with initials */}
      <div
        className="hidden w-full h-full items-center justify-center text-2xl font-semibold select-none"
        style={{
          background:
            "radial-gradient(circle at 30% 20%, rgba(255,255,255,0.35), transparent 60%), linear-gradient(135deg, rgba(255,255,255,0.15), rgba(255,255,255,0.05))",
        }}
      >
        {initials}
      </div>
    </div>
  );
}