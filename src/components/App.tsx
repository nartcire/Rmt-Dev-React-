import Header, { HeaderTop } from "./Header";
import Sidebar, { SidebarTop } from "./Sidebar";
import { useActiveId, useJobItem, useJobItems } from "../lib/hooks";

import Background from "./Background";
import BookmarksButton from "./BookmarksButton";
import Container from "./Container";
import Footer from "./Footer";
import JobItemContent from "./JobItemContent";
import JobList from "./JobList";
import Logo from "./Logo";
import PaginationControls from "./PaginationControls";
import ResultsCount from "./ResultsCount";
import SearchForm from "./SearchForm";
import SortingControls from "./SortingControls";

function App() {
  const [searchText, setSearchText] = useState("");
  const [isLoading, jobItems] = useJobItems(searchText);
  const activeId = useActiveId();
  const jobDetails = useJobItem(activeId);

  return (
    <>
      <Background />
      <Header>
        <HeaderTop>
          <Logo />
          <BookmarksButton />
        </HeaderTop>

        <SearchForm searchText={searchText} setSearchText={setSearchText} />
      </Header>
      <Container>
        <Sidebar>
          <SidebarTop>
            <ResultsCount />
            <SortingControls />
          </SidebarTop>

          <JobList isLoading={isLoading} jobItems={jobItems} />

          <PaginationControls />
        </Sidebar>
        <JobItemContent />
      </Container>
      <Footer />
    </>
  );
}

export default App;
