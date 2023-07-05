import React from "react";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import Providers from "../Contexts/Providers";
import { UserApi } from "../Api/UserApi";
import { WarcraftBuildOrderPage } from "../Components/Main/WarcraftBuildOrder";
import { act } from "react-dom/test-utils";
import { mockBuildOrdersApi } from "../__mocks__/mockApis";
import { QueryClient } from "react-query";
import { emptyWarcrafBuildOrder, wc3BuildOrderMocks } from "../__mocks__/buildOrderMocks";
import { testErrorMessage } from "../utils";

jest.mock("../Api/UserApi");

const id = "1";
const mockUserApi = new UserApi();
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
});

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"), // use actual for all non-hook parts
  useParams: () => ({
    id: id, // this is the mock id value
  }),
}));

const renderComponent = () => {
  render(
    <MemoryRouter initialEntries={["/", `/warcraft/build-order/${id}`]}>
      <Providers userApi={mockUserApi} buildOrdersApi={mockBuildOrdersApi} queryClient={queryClient}>
        <Routes>
          <Route path={`/warcraft/build-order/${id}`} element={<WarcraftBuildOrderPage />} />
          <Route path="/" element={<div data-testid="test-route">Test Route</div>} />
        </Routes>
      </Providers>
    </MemoryRouter>
  );
};

describe("Warcraft Build Order", () => {
  beforeEach(() => {
    queryClient.setQueryData(["warcraft-build-order", id], emptyWarcrafBuildOrder);
    mockBuildOrdersApi.getWarcraftBuildOrderById = jest.fn().mockResolvedValue(wc3BuildOrderMocks.find((b) => b.id === id));
  });

  test("Render the component and call the api to fetch data", async () => {
    renderComponent();

    const warcraft = screen.getByTestId("warcraft-build-order-page");

    await waitFor(() => {
      expect(warcraft).toBeDefined();
      expect(mockBuildOrdersApi.getWarcraftBuildOrderById).toHaveBeenCalledWith(id);
    });
  });

  test("Render the build order if data is loaded", async () => {
    await act(async () => {
      renderComponent();
    });

    await waitFor(() => {
      const notFound = document.querySelector(locators.notFound);
      const buildOrder = document.querySelector(locators.buildOrderList);
      const loading = document.querySelector(locators.loading);
      expect(notFound).toBeNull();
      expect(buildOrder).toBeDefined();
      expect(loading).toBeNull();
    });
  });

  test("Render not found page if fetching errors", async () => {
    mockBuildOrdersApi.getWarcraftBuildOrderById = jest.fn().mockRejectedValue(new Error(testErrorMessage));

    await act(async () => {
      renderComponent();
    });
    await waitFor(() => {
      const buildOrder = document.querySelector(locators.buildOrderList);
      const loading = document.querySelector(locators.loading);
      const notFound = document.querySelector(locators.notFound);
      expect(notFound).not.toBeNull();
      expect(buildOrder).toBeNull();
      expect(loading).toBeNull();
    });
  });

  test("Render loading modal if still fetching", async () => {
    mockBuildOrdersApi.getWarcraftBuildOrderById = jest.fn(() => {
      return new Promise(() => {});
    });

    await act(async () => {
      renderComponent();
    });

    await waitFor(() => {
      const notFound = document.querySelector(locators.notFound);
      const loading = document.querySelector(locators.loading);
      expect(notFound).toBeNull();
      expect(loading).not.toBeNull();
    });
  });

  test("Clicking a Go Back button will redirect to '/", async () => {
    renderComponent();

    const goBack = screen.getByTestId("go-back-button");

    act(() => {
      fireEvent.click(goBack);
    });

    const routTest = screen.getByTestId("test-route");

    await waitFor(() => {
      expect(routTest).toBeDefined();
    });
  });
});

const locators = {
  buildOrderList: `[data-testid="warcraft-build-order-${id}"]`,
  notFound: `[data-testid="not-found-page"]`,
  loading: `[data-testid="loading-modal"]`,
};
