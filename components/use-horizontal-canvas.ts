"use client";

import { useCallback, useEffect, useState } from "react";

const panelsOf = (el: HTMLElement) =>
  Array.from(el.querySelectorAll<HTMLElement>("[data-panel]"));

/**
 * Drives the horizontal panel canvas: vertical wheel becomes horizontal
 * travel, pointer drag pans, and the panel counter tracks whatever column is
 * currently parked against the left edge.
 *
 * `key` identifies the mounted section — changing it re-measures the panels.
 */
export function useHorizontalCanvas(key: string | null) {
  const [node, setNode] = useState<HTMLDivElement | null>(null);
  const [index, setIndex] = useState(0);
  const [count, setCount] = useState(0);

  const sync = useCallback(() => {
    if (!node) return;
    const panels = panelsOf(node);
    if (!panels.length) {
      setCount(0);
      return;
    }
    const left = node.getBoundingClientRect().left;
    let best = Infinity;
    let nearest = 0;
    panels.forEach((panel, i) => {
      const distance = Math.abs(panel.getBoundingClientRect().left - left);
      if (distance < best) {
        best = distance;
        nearest = i;
      }
    });
    setIndex(nearest);
    setCount(panels.length);
  }, [node]);

  const step = useCallback(
    (direction: number) => {
      if (!node) return;
      const panels = panelsOf(node);
      if (!panels.length) return;
      const box = node.getBoundingClientRect();
      const current = panels.findIndex(
        (panel) => panel.getBoundingClientRect().left >= box.left - 8,
      );
      const next = Math.max(
        0,
        Math.min(panels.length - 1, (current < 0 ? 0 : current) + direction),
      );
      const target = panels[next];
      if (!target) return;
      node.scrollTo({
        left: node.scrollLeft + target.getBoundingClientRect().left - box.left,
        behavior: "smooth",
      });
    },
    [node],
  );

  // Wheel: convert vertical intent into horizontal travel, but let a nested
  // vertical scroller (a project's overview column) consume it first.
  useEffect(() => {
    if (!node) return;
    const onWheel = (event: WheelEvent) => {
      if (Math.abs(event.deltaY) <= Math.abs(event.deltaX)) return;
      for (
        let el = event.target as HTMLElement | null;
        el && el !== node;
        el = el.parentElement
      ) {
        const scrollable = el.scrollHeight - el.clientHeight > 2;
        if (!scrollable) continue;
        if (!/(auto|scroll|overlay)/.test(getComputedStyle(el).overflowY)) continue;
        const max = el.scrollHeight - el.clientHeight;
        const canScrollDown = event.deltaY > 0 && el.scrollTop < max - 1;
        const canScrollUp = event.deltaY < 0 && el.scrollTop > 1;
        if (canScrollDown || canScrollUp) return;
      }
      node.scrollLeft += event.deltaY;
      event.preventDefault();
    };
    node.addEventListener("wheel", onWheel, { passive: false });
    return () => node.removeEventListener("wheel", onWheel);
  }, [node]);

  // Pointer drag to pan.
  useEffect(() => {
    if (!node) return;
    let down = false;
    let moved = false;
    let startX = 0;
    let startLeft = 0;

    const onDown = (event: PointerEvent) => {
      if ((event.target as HTMLElement).closest("a,button")) return;
      down = true;
      moved = false;
      startX = event.clientX;
      startLeft = node.scrollLeft;
      node.style.cursor = "grabbing";
    };
    const onMove = (event: PointerEvent) => {
      if (!down) return;
      const delta = event.clientX - startX;
      if (!moved && Math.abs(delta) > 3) {
        moved = true;
        node.setPointerCapture(event.pointerId);
        // Stop text/image selection from fighting the pan mid-gesture.
        node.style.userSelect = "none";
      }
      if (moved) {
        node.scrollLeft = startLeft - delta;
        event.preventDefault();
      }
    };
    const onUp = () => {
      down = false;
      node.style.cursor = "grab";
      node.style.userSelect = "";
    };

    node.addEventListener("pointerdown", onDown);
    node.addEventListener("pointermove", onMove, { passive: false });
    node.addEventListener("pointerup", onUp);
    node.addEventListener("pointercancel", onUp);
    return () => {
      node.removeEventListener("pointerdown", onDown);
      node.removeEventListener("pointermove", onMove);
      node.removeEventListener("pointerup", onUp);
      node.removeEventListener("pointercancel", onUp);
    };
  }, [node]);

  // Keep the counter in step with scrolling and with layout settling.
  useEffect(() => {
    if (!node) return;
    let settle: ReturnType<typeof setTimeout>;
    const onScroll = () => {
      clearTimeout(settle);
      settle = setTimeout(sync, 90);
    };
    node.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", sync);

    const frame = requestAnimationFrame(sync);
    const timers = [60, 300].map((delay) => setTimeout(sync, delay));
    return () => {
      node.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", sync);
      cancelAnimationFrame(frame);
      clearTimeout(settle);
      timers.forEach(clearTimeout);
    };
  }, [node, sync, key]);

  return { ref: setNode, index, count, step };
}
