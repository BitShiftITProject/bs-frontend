import React, { useEffect } from "react";
import Loading from "../CommonComponents/Loading";
import PublicSidebar from "./PublicSidebar";
import { useParams } from "react-router-dom";
import usePortfolio from "../../Hooks/usePortfolio";
import usePages from "../../Hooks/usePages";
import useEditPortfolio from "../../Hooks/useEditPortfolio";
import { useStore } from "../../Hooks/Store";

const setPageIdSelector = (state) => state.setPageId;
const setPortfolioIdSelector = (state) => state.setPortfolioId;

function PublicPortfolio() {
  // Store the details of a portfolio so that we can use it later

  const { portfolio: portfolioId, page: pageIndex } = useParams();
  const { data: portfolio, status: portfolioStatus } = usePortfolio(
    portfolioId
  );
  const { data: pages } = usePages(portfolioId);
  const [editPortfolio] = useEditPortfolio();
  const setPageId = useStore(setPageIdSelector);
  const setPortfolioId = useStore(setPortfolioIdSelector);

  useEffect(() => {
    if (portfolioStatus === "success" && !portfolio) {
      window.location.href = "/publicfailed";
    }
  }, [portfolioStatus, portfolio]);

  useEffect(() => {
    console.log(pages);
    if (portfolioId && portfolio && pages) {
      setPortfolioId(portfolioId);

      const pageOrder = portfolio.pageOrder;

      if (!pageOrder) {
        const patchDetails = { pageOrder: pages.map((p) => p.id) };
        editPortfolio({ portfolioId, patchDetails });
      } else {
        pages.sort((a, b) => {
          return pageOrder.indexOf(a.id) - pageOrder.indexOf(b.id);
        });
      }
      if (pages && pages.length > pageIndex && pageIndex >= 0) {
        setPageId(pages[pageIndex].id);
      } else {
        window.location.href = "/publicfailed";
      }
    }
  }, [
    editPortfolio,
    setPageId,
    pageIndex,
    pages,
    portfolio,
    portfolioId,
    setPortfolioId,
  ]);

  return (
    <div style={{ height: "100%" }}>
      {portfolio && pages ? (
        <PublicSidebar pages={pages} />
      ) : (
        <div style={{ height: "100vh" }}>
          <Loading vertical />
        </div>
      )}
    </div>
  );
}

export default PublicPortfolio;
