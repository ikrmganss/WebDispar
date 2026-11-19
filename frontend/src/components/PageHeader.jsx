import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Sparkles } from 'lucide-react';

const PageHeader = ({
  badge = 'Dinas Pariwisata Provinsi Sulawesi Tengah',
  badgeIcon: BadgeIcon = Sparkles,
  title,
  subtitle,
  breadcrumbs = [],
  children,
}) => {
  return (
    <div className="bg-gradient-to-r from-[#1F5BA6] via-[#383087] to-[#5C2180] py-12 lg:py-16 text-white relative overflow-hidden">
      {/* Background Radial Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-white/10 via-transparent to-transparent pointer-events-none" />

      <div className="container mx-auto max-w-7xl px-4 md:px-8 relative z-10">
        {/* Badge */}
        {badge && (
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/15 backdrop-blur-sm text-xs font-semibold text-amber-300 mb-4 border border-white/20">
            {BadgeIcon && <BadgeIcon size={14} className="text-amber-300 flex-shrink-0" />}
            <span>{badge}</span>
          </div>
        )}

        {/* Title */}
        <h1 className="text-3xl lg:text-5xl font-black tracking-tight leading-tight text-white">
          {title}
        </h1>

        {/* Subtitle */}
        {subtitle && (
          <p className="text-white/80 mt-3 max-w-3xl text-sm lg:text-base leading-relaxed">
            {subtitle}
          </p>
        )}

        {/* Breadcrumb */}
        {breadcrumbs && breadcrumbs.length > 0 && (
          <nav aria-label="Breadcrumb" className="flex items-center flex-wrap gap-2 text-xs text-white/70 mt-6 font-medium">
            <Link to="/" className="hover:text-amber-300 transition-colors">
              Home
            </Link>
            {breadcrumbs.map((crumb, idx) => {
              const isLast = idx === breadcrumbs.length - 1;
              return (
                <React.Fragment key={idx}>
                  <ChevronRight size={12} className="text-white/50 flex-shrink-0" />
                  {crumb.path && !isLast ? (
                    <Link to={crumb.path} className="hover:text-amber-300 transition-colors">
                      {crumb.label}
                    </Link>
                  ) : (
                    <span className="text-amber-300 font-semibold">{crumb.label}</span>
                  )}
                </React.Fragment>
              );
            })}
          </nav>
        )}

        {/* Optional Extra Elements */}
        {children && <div className="mt-6">{children}</div>}
      </div>
    </div>
  );
};

export default PageHeader;
