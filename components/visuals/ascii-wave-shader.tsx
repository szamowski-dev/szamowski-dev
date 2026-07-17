"use client";

import { useEffect, useState } from "react";
import {
  Ascii,
  Circle,
  FilmGrain,
  Group,
  Shader,
  SineWave,
  SolidColor,
} from "shaders/react";

// CSS font-family matching is case-insensitive. Lowercase keeps the package's
// case-sensitive Google Fonts loader from replacing the self-hosted face.
const localAsciiFontFamily = "ibm plex mono";

export function AsciiWaveShader() {
  const [isReady, setIsReady] = useState(false);
  const [patternOpacity, setPatternOpacity] = useState(1);

  useEffect(() => {
    const compactQuery = window.matchMedia("(max-width: 47.999rem)");
    const syncPatternOpacity = () => {
      setPatternOpacity(compactQuery.matches ? 0.28 : 1);
    };

    syncPatternOpacity();
    compactQuery.addEventListener("change", syncPatternOpacity);

    return () => {
      compactQuery.removeEventListener("change", syncPatternOpacity);
    };
  }, []);

  return (
    <Shader
      aria-hidden="true"
      className="ascii-wave-shader"
      data-ready={isReady ? "true" : undefined}
      disableTelemetry
      onReady={() => setIsReady(true)}
      style={{ height: "100%", width: "100%" }}
    >
      <SolidColor color="#0b0f24" />
      <Circle
        id="heroMask"
        center={{ x: 1, y: 0.5 }}
        color="#ffffff"
        radius={2}
        softness={1}
        visible={false}
      />
      <Circle
        id="heroBottomFadeMask"
        center={{ x: 0.5, y: 0 }}
        color="#ffffff"
        radius={2}
        softness={1}
        visible={false}
      />
      <Group maskSource="heroBottomFadeMask">
        <Group
          blendMode="normal-oklch"
          maskSource="heroMask"
          opacity={patternOpacity}
        >
          <SolidColor color="#5413ed" visible />
          <SineWave
            id="idmh10tevmvxufaxu22"
            amplitude={0.26}
            angle={36}
            color="#16ded7"
            frequency={0.3}
            position={{ x: 0.5, y: 1 }}
            softness={0.52}
            thickness={0.99}
            visible
          />
          <Ascii
            cellSize={25}
            characters="〜*"
            fontFamily={localAsciiFontFamily}
            maskSource="idmh10tevmvxufaxu22"
            visible
          />
        </Group>
      </Group>
      <FilmGrain strength={0.05} />
    </Shader>
  );
}
