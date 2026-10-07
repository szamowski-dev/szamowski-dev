interface Window {
  posthog?: {
    config?: { token?: string };
    init: (token: string, config: Record<string, unknown>) => void;
    set_config: (config: { disable_persistence: boolean }) => void;
    register: (properties: { marketing_consent: boolean }) => void;
    has_opted_in_capturing: () => boolean;
    opt_in_capturing: (options?: { captureEventName: false }) => void;
    opt_out_capturing: () => void;
  };
}
