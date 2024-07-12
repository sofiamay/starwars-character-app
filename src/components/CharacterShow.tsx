import { ReactNode } from 'react';
import PropTypes from 'prop-types';
import { useGetCharactersByPageQuery } from "../store";
import CharacterCard from './CharacterCard';

interface CharacterShowProps  {
  children?: ReactNode | undefined;
  currentPage: number;
  [props: string]: any;
}

CharacterShow.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]),
  currentPage: PropTypes.number,
  rest: function(props: Object, propName: string, componentName: string) { },
};

function CharacterShow(props: CharacterShowProps) {
  const { children, currentPage, ...rest } = props;

  const { data, error, isFetching } = useGetCharactersByPageQuery(currentPage);

  let content = null;
  if (isFetching) {
    content = <div>Loading characters...</div>;
  } else if (error) {
    content = <div>Error loading characters</div>
  } else {
    let characters: any[] = [];
    data.results?.forEach((result: any) => {
      characters.push({
        uid: result.uid || -1,
        name: result.name || "Not Found",
        url: result.url || null,
      });
    });
    content = characters.map((character: any) => {
      return <div className="card-wrapper" key={character.uid}>
        <CharacterCard  uid={Number(character.uid)} name={character.name} url={character.url}/>
      </div>;
    });
  }

  return (
    <div className="CharacterShow">
      <div className="section-content flex flex-col items-center justify-between">
        <div className="title">
          <h3 className="text-lg font-bold">Testing Character Show</h3>
        </div>
        <div className="card-area flex flex-row flex-wrap justify-center gap-8">
          {content}
        </div>
      </div>
    </div>
  );
}

export default CharacterShow;