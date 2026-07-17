interface TikTokTrackingQueue extends Array<unknown> {
  grantConsent?: () => void;
  revokeConsent?: () => void;
}

interface Window {
  gtag?: (...args: unknown[]) => void;
  dataLayer?: unknown[];
  fbq?: (...args: unknown[]) => void;
  ttq?: TikTokTrackingQueue;
  lintrk?: (...args: unknown[]) => void;
  _linkedin_data_partner_ids?: string[];
}
