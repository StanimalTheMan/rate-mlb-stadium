import React from "react";
import { useQuery } from "react-query";
import { Route, Switch } from "react-router-dom";
import ErrorMessage from "./components/ErrorMessage";
import Navbar from "./components/Navbar";
// import { useLocationChange } from "./hooks/use-location-change";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import Stadium from "./pages/Stadium";
import HomeSkeleton from "./skeletons/HomeSkeleton";
import Container from "./styles/Container";
import { client } from "./utils/api-client";

function App() {
  const [stadiums, setStadiums] = React.useState([]);

  const { isLoading, isError, error } = useQuery(
    "Home",
    () => client.get("/stadiums").then((res) => res.data.stadiums),
    {
      onSuccess: setStadiums,
    }
  );

  let filteredStadiums = stadiums;

  const filterStadiums = (filterString) => {
    filteredStadiums = stadiums.filter((stadium) =>
      stadium.name.toLowerCase().includes(filterString.toLowerCase())
    );
    console.log(filterString, filteredStadiums);
  };

  if (isLoading) return <HomeSkeleton />;
  if (isError) return <ErrorMessage error={error} />;

  return (
    <>
      <Navbar stadiums={stadiums} filterStadiums={filterStadiums} />
      <Container>
        <Switch>
          <Route
            exact
            path="/"
            render={() => <Home filteredStadiums={filteredStadiums} />}
          />
          <Route path="/stadiums/:stadiumId" component={Stadium} />
          <Route path="*" component={NotFound} />
        </Switch>
      </Container>
    </>
  );
}

export default App;
