const HeroBackground = () => {
  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 -z-10 overflow-hidden pointer-events-none"
    >
      {/* Base ambient layer — soft full-screen gradient that fills gaps between orbs */}
      <div className="absolute inset-0 bg-linear-to-br from-pink-200/20 via-transparent to-cyan-200/20 dark:from-pink-900/10 dark:via-transparent dark:to-cyan-900/10" />

      {/* Gradient orb 1 - Pink/Rose - Top Left */}
      <div className="absolute -top-[25%] -left-[15%] w-[70vw] h-[70vw] max-w-175 max-h-175 rounded-full opacity-25 dark:opacity-15 blur-[120px] bg-linear-to-br from-pink-200 to-rose-300 dark:from-pink-500 dark:to-rose-600 will-change-transform animate-aurora-1" />

      {/* Gradient orb 2 - Violet/Blue - Top Right */}
      <div className="absolute -top-[15%] -right-[20%] w-[65vw] h-[65vw] max-w-162.5 max-h-162.5 rounded-full opacity-25 dark:opacity-15 blur-[120px] bg-linear-to-bl from-violet-200 to-blue-300 dark:from-violet-500 dark:to-blue-600 will-change-transform animate-aurora-2" />

      {/* Gradient orb 3 - Cyan/Teal - Center Left */}
      <div className="absolute top-[40%] -left-[10%] w-[55vw] h-[55vw] max-w-137.5 max-h-137.5 rounded-full opacity-20 dark:opacity-[0.12] blur-[120px] bg-linear-to-tr from-cyan-200 to-teal-300 dark:from-cyan-500 dark:to-teal-600 will-change-transform animate-aurora-3" />

      {/* Gradient orb 4 - Amber/Orange - Bottom Right */}
      <div className="absolute top-[55%] right-[0%] w-[50vw] h-[50vw] max-w-125 max-h-125 rounded-full opacity-15 dark:opacity-[0.1] blur-[120px] bg-linear-to-tl from-amber-100 to-orange-200 dark:from-amber-500 dark:to-orange-600 will-change-transform animate-aurora-4" />
    </div>
  )
}

export default HeroBackground
