import React from "react";
import { Helmet } from "react-helmet";

const MetaData = ({ title }) => (
  <Helmet>
    <title>{`${title} - PriceGetter`}</title>
  </Helmet>
);

export default MetaData;
