import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const revealSelector = [
  ".hero-card",
  ".surface-card",
  ".list-card",
  ".feature-card",
  ".stat-card",
  ".home-footer",
  ".active-page-header",
  ".vehicle-health-card",
  ".vehicle-health-alert-item",
  ".vehicle-health-maintenance-item",
  ".explore-section-head",
  ".explore-card",
  ".explore-service-card",
  ".explore-stats-row button",
  ".explore-cta-card",
  ".explore-footer > div",
].join(",");

function ScrollReveal() {
  const location = useLocation();

  useEffect(() => {
    const shouldReduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const elements = Array.from(document.querySelectorAll(revealSelector));

    if (shouldReduceMotion) {
      elements.forEach((element) => element.classList.add("is-revealed"));
      return undefined;
    }

    elements.forEach((element, index) => {
      element.classList.add("reveal-on-scroll");
      element.style.setProperty("--reveal-delay", `${Math.min(index % 8, 7) * 55}ms`);
    });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-revealed");
            observer.unobserve(entry.target);
          }
        });
      },
      {
        rootMargin: "0px 0px -8% 0px",
        threshold: 0.12,
      }
    );

    elements.forEach((element) => observer.observe(element));

    return () => observer.disconnect();
  }, [location.pathname]);

  return null;
}

export default ScrollReveal;
