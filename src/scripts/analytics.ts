export type AnalyticsParams = Record<string, string | number | boolean | undefined>;

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (command: "config" | "event" | "js", target: string | Date, params?: AnalyticsParams) => void;
  }
}

export function trackEvent(eventName: string, params: AnalyticsParams = {}) {
  window.gtag?.("event", eventName, params);
}

export function setupAnalyticsClickTracking() {
  const handleClick = (event: MouseEvent) => {
    if (!(event.target instanceof Element)) {
      return;
    }

    const explicitTarget = event.target.closest<HTMLElement>("[data-analytics-event]");
    const link = event.target.closest("a");

    if (!explicitTarget) {
      if (link?.href && new URL(link.href).origin !== window.location.origin) {
        trackEvent("outbound_click", {
          event_category: "outbound",
          event_label: new URL(link.href).hostname,
          href: link.href,
          location: window.location.pathname,
        });
      }
      return;
    }

    const eventName = explicitTarget.dataset.analyticsEvent;
    if (!eventName) {
      return;
    }

    const explicitLink = explicitTarget instanceof HTMLAnchorElement ? explicitTarget : explicitTarget.closest("a");
    trackEvent(eventName, {
      event_category: explicitTarget.dataset.analyticsCategory,
      event_label: explicitTarget.dataset.analyticsLabel ?? explicitTarget.textContent?.trim(),
      href: explicitLink?.href,
      location: window.location.pathname,
    });
  };

  document.addEventListener("click", handleClick);

  return () => {
    document.removeEventListener("click", handleClick);
  };
}
