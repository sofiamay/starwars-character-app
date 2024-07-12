import { ReactNode } from 'react';
import PropTypes from 'prop-types';
import { useSearchPhotosQuery } from '../store';

interface PhotoProps {
  children?: ReactNode | undefined;
  query: string;
}

Photo.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]),
  query: PropTypes.string,
  rest: function(props: Object, propName: string, componentName: string) { },
};

function Photo(props: PhotoProps) {
  const { children, query, ...rest } = props;

  const { data, error, isFetching } = useSearchPhotosQuery(query);

  let content = null;
  let photoResult: any = {};
  if (isFetching) {
    content = <div>Loading character...</div>;
  } else if (error) {
    content = <div>Error loading character</div>
  } else {
    if (data.results) {
      photoResult = data.results[0];
      content = <img className="w-full h-64" src={photoResult.urls?.full} alt={photoResult.alt_description} />
    }
  }

  return (
    <>
      {content}
    </>
  );
}

export default Photo;