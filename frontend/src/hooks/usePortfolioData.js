import portfolioData from '../data/portfolioData.json';

export default function usePortfolioData() {
  return { data: portfolioData, loading: false, error: null };
}
