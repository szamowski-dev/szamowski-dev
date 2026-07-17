"use client";

import { useEffect, useRef, useState, type ComponentType } from "react";

type AsciiWaveShaderComponent = ComponentType;

type IdleCapableWindow = Window & {
  cancelIdleCallback?: (handle: number) => void;
  requestIdleCallback?: (
    callback: () => void,
    options?: { timeout: number },
  ) => number;
};

type NavigatorWithConnection = Navigator & {
  connection?: EventTarget & {
    readonly saveData?: boolean;
  };
};

type ShaderGateProps = {
  className?: string;
};

/**
 * Keeps WebGPU out of the critical path. The shader chunk is requested only
 * after the hero is visible, the browser has had an idle slot, reduced motion
 * is not enabled, and the user has not requested reduced data usage.
 */
export function ShaderGate({ className }: ShaderGateProps) {
  const hostRef = useRef<HTMLDivElement>(null);
  const [Shader, setShader] = useState<AsciiWaveShaderComponent | null>(null);

  useEffect(() => {
    const host = hostRef.current;

    if (!host) {
      return;
    }

    const browserWindow = window as IdleCapableWindow;
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const connection = (navigator as NavigatorWithConnection).connection;
    let active = true;
    let idleHandle: number | undefined;
    let idleKind: "idle" | "timeout" | undefined;
    let idleReady = false;
    let idleScheduled = false;
    let isNearViewport = false;
    let isLoading = false;
    let loadedShader: AsciiWaveShaderComponent | null = null;

    const shouldBlockShader = () =>
      motionQuery.matches || document.hidden || connection?.saveData === true;

    const showLoadedShader = () => {
      if (
        !active ||
        shouldBlockShader() ||
        !idleReady ||
        !isNearViewport ||
        !loadedShader
      ) {
        if (active) {
          setShader(null);
        }
        return;
      }

      setShader(() => loadedShader);
    };

    const requestShader = () => {
      if (
        !active ||
        shouldBlockShader() ||
        !idleReady ||
        !isNearViewport ||
        isLoading
      ) {
        return;
      }

      if (loadedShader) {
        showLoadedShader();
        return;
      }

      isLoading = true;

      void import("./ascii-wave-shader")
        .then(({ AsciiWaveShader }) => {
          if (!active) {
            return;
          }

          isLoading = false;
          loadedShader = AsciiWaveShader;
          showLoadedShader();
        })
        .catch(() => {
          // The static CSS fallback remains visible if WebGPU is unavailable.
          isLoading = false;
        });
    };

    const markIdle = () => {
      idleScheduled = false;

      if (!active) {
        return;
      }

      idleReady = true;
      requestShader();
    };

    const scheduleIdle = () => {
      if (idleScheduled || idleReady || shouldBlockShader()) {
        return;
      }

      idleScheduled = true;

      if (browserWindow.requestIdleCallback) {
        idleKind = "idle";
        idleHandle = browserWindow.requestIdleCallback(markIdle, {
          timeout: 1_200,
        });
        return;
      }

      idleKind = "timeout";
      idleHandle = window.setTimeout(markIdle, 240);
    };

    const syncShaderEligibility = () => {
      if (!active) {
        return;
      }

      if (shouldBlockShader() || !isNearViewport) {
        setShader(null);
        return;
      }

      scheduleIdle();
      requestShader();
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        isNearViewport = entry?.isIntersecting ?? false;

        syncShaderEligibility();
      },
      { threshold: 0 },
    );

    observer.observe(host);
    motionQuery.addEventListener("change", syncShaderEligibility);
    document.addEventListener("visibilitychange", syncShaderEligibility);
    connection?.addEventListener("change", syncShaderEligibility);

    return () => {
      active = false;
      observer.disconnect();
      motionQuery.removeEventListener("change", syncShaderEligibility);
      document.removeEventListener("visibilitychange", syncShaderEligibility);
      connection?.removeEventListener("change", syncShaderEligibility);

      if (idleHandle === undefined) {
        return;
      }

      if (idleKind === "idle") {
        browserWindow.cancelIdleCallback?.(idleHandle);
      } else {
        window.clearTimeout(idleHandle);
      }
    };
  }, []);

  return (
    <div
      ref={hostRef}
      aria-hidden="true"
      className={className}
      style={{ pointerEvents: "none" }}
    >
      {Shader ? <Shader /> : null}
    </div>
  );
}
