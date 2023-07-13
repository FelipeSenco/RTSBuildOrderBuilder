import React from "react";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import Providers from "../Contexts/Providers";
import { UserApi } from "../Api/UserApi";
import { act } from "react-dom/test-utils";
import { mockBuildOrdersApi } from "../__mocks__/mockApis";
import { QueryClient } from "react-query";
import { Sc2BuildOrderMocks, emptyStarcraftBuildOrder } from "../__mocks__/buildOrderMocks";
import { queryKeys } from "../Types&Globals/queryKeys";
import { AppRoutes } from "../Types&Globals/Routes";
import { StarcraftBuildOrderPage } from "../Components/Main/Starcraft/StarcraftBuildOrder";

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
    <MemoryRouter initialEntries={["/", `/starcraft/build-order/${id}`]}>
      <Providers userApi={mockUserApi} buildOrdersApi={mockBuildOrdersApi} queryClient={queryClient}>
        <Routes>
          <Route path={AppRoutes.StarcraftBuildOrder.replace(":id", id)} element={<StarcraftBuildOrderPage />} />
          <Route path="/" element={<div data-testid="test-route">Test Route</div>} />
        </Routes>
      </Providers>
    </MemoryRouter>
  );
};

describe("Starcraft Build Order", () => {
  beforeEach(() => {
    queryClient.setQueryData([queryKeys.starcraftBuildOrder, id], emptyStarcraftBuildOrder);
    mockBuildOrdersApi.getStarcraftBuildOrderById = jest.fn().mockResolvedValue(Sc2BuildOrderMocks.find((b) => b.id === id));
  });

  test("Render the component and call the api to fetch data", async () => {
    renderComponent();

    const starcraft = screen.getByTestId("starcraft-build-order-page");

    await waitFor(() => {
      expect(starcraft).toBeDefined();
      expect(mockBuildOrdersApi.getStarcraftBuildOrderById).toHaveBeenCalledWith(id);
    });
  });

  test("Render the build order if data is loaded", async () => {
    await act(async () => {
      renderComponent();
    });

    await waitFor(() => {
      const notFound = document.querySelector(locators.notFound);
      const buildOrder = document.querySelector(locators.buildOrderList);
      const skeleton = document.querySelector(locators.skeleton);
      expect(notFound).toBeNull();
      expect(buildOrder).toBeDefined();
      expect(skeleton).toBeNull();
    });
  });

  test("Render not found page if fetching errors", async () => {
    mockBuildOrdersApi.getStarcraftBuildOrderById = jest.fn().mockRejectedValue({});

    await act(async () => {
      renderComponent();
    });
    await waitFor(() => {
      const buildOrder = document.querySelector(locators.buildOrderList);
      const skeleton = document.querySelector(locators.skeleton);
      const notFound = document.querySelector(locators.notFound);
      expect(notFound).not.toBeNull();
      expect(buildOrder).toBeNull();
      expect(skeleton).toBeNull();
    });
  });

  test("Render loading modal if still fetching", async () => {
    mockBuildOrdersApi.getStarcraftBuildOrderById = jest.fn(() => {
      return new Promise(() => {});
    });

    await act(async () => {
      renderComponent();
    });

    await waitFor(() => {
      const notFound = document.querySelector(locators.notFound);
      const skeleton = document.querySelector(locators.skeleton);
      expect(notFound).toBeNull();
      expect(skeleton).not.toBeNull();
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
  buildOrderList: `[data-testid="starcraft-build-order-${id}"]`,
  notFound: `[data-testid="not-found-page"]`,
  skeleton: `[data-testid="build-order-detail-skeleton"]`,
};