import { expect, afterEach, vi, beforeAll, afterAll } from "vitest";
import * as matchers from "@testing-library/jest-dom/matchers";
import { act, cleanup } from "@testing-library/react";
import { StateCreator } from "zustand";
import "@testing-library/jest-dom/vitest";

import { server } from "./server";

type ZustandModel = typeof import("zustand");

const storeResetFns = vi.hoisted(() => new Set<() => void>());

vi.mock("zustand", async (zustandOriginal: () => Promise<ZustandModel>) => {
  const zustand = await zustandOriginal();

  const createStore =
    () =>
    <S>(createState: StateCreator<S>) => {
      const store = zustand.createStore(createState);
      const initialState = store.getState();
      storeResetFns.add(() => store.setState(initialState, true));
      return store;
    };

  return { ...zustand, createStore };
});

expect.extend(matchers);

beforeAll(() => server.listen());

afterEach(() => {
  cleanup();

  act(() => {
    storeResetFns.forEach((resetFn) => {
      resetFn();
    });
  });

  server.resetHandlers();
});

afterAll(() => server.close());
