import { Helmet } from 'react-helmet-async';

const MetaData = ({ title }) => {
  return (
    <Helmet>
      <title>{`${title} - NJ ShopIT`}</title>
    </Helmet>
  );
};
export default MetaData;
