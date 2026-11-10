/**
 * <Shine> — the light streak that sweeps across a card on hover.
 * Place inside any `group relative overflow-hidden` element.
 */
export function Shine() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden z-[2]" aria-hidden="true">
      <div className="absolute -inset-y-16 -left-1/2 w-1/3 rotate-[14deg] bg-gradient-to-r from-transparent via-white/55 to-transparent -translate-x-full group-hover:translate-x-[460%] transition-transform duration-[1200ms] ease-out" />
    </div>
  )
}
