import React from "react";

interface LayoutProps {
  children: React.ReactNode;
  title?: string;
  subtitle?: string;
  headerActions?: React.ReactNode;
  sidebar?: React.ReactNode;
  className?: string;
  contentClassName?: string;
  headerClassName?: string;
  showHeader?: boolean;
  padding?: "none" | "sm" | "md" | "lg";
}

const Layout: React.FC<LayoutProps> = ({
  children,
  title,
  subtitle,
  headerActions,
  sidebar,
  className = "",
  contentClassName = "",
  headerClassName = "",
  showHeader = true,
  padding = "md"
}) => {
  const paddingClasses = {
    none: "",
    sm: "p-4",
    md: "p-6",
    lg: "p-8"
  };

  const contentPaddingClasses = {
    none: "",
    sm: "p-4",
    md: "p-6", 
    lg: "p-8"
  };

  return (
    <div className={`min-h-screen bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 ${className}`}>
      {sidebar && (
        <div className="flex">
          {sidebar}
          <div className="flex-1">
            {showHeader && (title || subtitle || headerActions) && (
              <header className={`border-b border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 ${headerClassName}`}>
                <div className={`${contentPaddingClasses[padding]}`}>
                  <div className="flex items-center justify-between">
                    <div>
                      {title && (
                        <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">
                          {title}
                        </h1>
                      )}
                      {subtitle && (
                        <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
                          {subtitle}
                        </p>
                      )}
                    </div>
                    {headerActions && (
                      <div className="flex items-center gap-3">
                        {headerActions}
                      </div>
                    )}
                  </div>
                </div>
              </header>
            )}
            <main className={`${contentClassName}`}>
              {children}
            </main>
          </div>
        </div>
      )}
      
      {!sidebar && (
        <>
          {showHeader && (title || subtitle || headerActions) && (
            <header className={`border-b border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 ${headerClassName}`}>
              <div className={`${contentPaddingClasses[padding]}`}>
                <div className="flex items-center justify-between">
                  <div>
                    {title && (
                      <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">
                        {title}
                      </h1>
                    )}
                    {subtitle && (
                      <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
                        {subtitle}
                      </p>
                    )}
                  </div>
                  {headerActions && (
                    <div className="flex items-center gap-3">
                      {headerActions}
                    </div>
                  )}
                </div>
              </div>
            </header>
          )}
          <main className={`${contentClassName}`}>
            {children}
          </main>
        </>
      )}
    </div>
  );
};

export default Layout;
