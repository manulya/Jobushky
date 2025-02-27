import React, { useEffect, useState } from "react";
import Search_main from "./search_main/search_main";
import styled from "styled-components";
import Vacancy from "./Vacancy";
import { useDispatch, useSelector } from "react-redux";
import Header from "./header";
import { fetchJobs, getAllJobs } from "../http/jobAPI";
import { addJobAC } from "../store/jobReducer";
import { fetchCompanyAC } from "../store/companyReducer";
import { fetchCompanies, getAllCompanies } from "../http/companyAPI";
import { Spinner } from "react-bootstrap";
import { Dropdown } from "react-bootstrap";

const Catalog = () => {
  const vacancies = useSelector((state) => state.jobs.jobs);
  const found = useSelector((state) => state.jobs.found);
  const dispatch = useDispatch();
  const [searchResult, setSearchResult] = useState([]);
  const [sortOrder, setSortOrder] = useState("");
  const [jobCount, setJobCount] = useState(0);

  const handleSearch = (search, sort) => {
    setSearchResult(search);
    setSortOrder(sort);
  };

  useEffect(() => {
    setJobCount(vacancies.length);
    dispatch(
      fetchJobs(searchResult[0], searchResult[1], searchResult[2], sortOrder)
    );
    dispatch(fetchCompanies());
  }, [
    dispatch,
    searchResult[0],
    searchResult[1],
    searchResult[2],
    setSearchResult,
    sortOrder,
    [vacancies],
  ]);

  return (
    <Container>
      <Header />
      <SearchContainer>
        <Search_main onSearch={handleSearch} jobCount={jobCount} />
      </SearchContainer>
      {!found ? (
        <Nothing>Ничего не найдено :(</Nothing>
      ) : (
        <VacanciesContainer>
          {vacancies.map((vacancy, index) => {
            return <Vacancy key={index} vacancy={vacancy} />;
          })}
        </VacanciesContainer>
      )}
    </Container>
  );
};

export default Catalog;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: start;
`;
const Nothing = styled.h1`
  align-self: center;
  justify-self: center;
`;

const VacanciesContainer = styled.div`
  display: grid;
  width: 90vw;
  grid-template-columns: repeat(auto-fit, minmax(450px, 1fr));
  grid-gap: 50px;
  justify-items: center;
  margin: 100px auto 0px;
`;
const SearchContainer = styled.div`
  margin-top: 50px;
`;
