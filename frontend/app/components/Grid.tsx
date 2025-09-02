import type { ReactNode } from 'react';

interface GridProps {
  children: ReactNode;
  cols?: 2 | 3 | 4;
  gap?: 4 | 6 | 8;
}

export default function Grid({ children, cols = 3, gap = 6 }: GridProps) {
  const colsClasses = {
    2: 'grid-cols-1 md:grid-cols-2',
    3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4',
  };

  const gapClasses = {
    4: 'gap-4',
    6: 'gap-6',
    8: 'gap-8',
  };

  return (
    <div className={`grid ${colsClasses[cols]} ${gapClasses[gap]} justify-items-center`}>
      {children}
    </div>
  );
}
