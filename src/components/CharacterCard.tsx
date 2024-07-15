import { ReactNode } from 'react';
import PropTypes from 'prop-types';
import { useGetCharacterQuery } from '../store';
import type { SwapiCharacter } from '../types';
import Photo from './Photo';
import DefaultPortrait from '../images/default-portrait.png';

interface CharacterCardProps {
  children?: ReactNode | undefined;
  uid: number;
  name: string;
  url: string;
  [props: string]: any;
}

CharacterCard.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]),
  uid: PropTypes.number,
  name: PropTypes.string,
  url: PropTypes.string,
  rest: function(props: Object, propName: string, componentName: string) { },
};

function CharacterCard(props: CharacterCardProps) {
  const { children, uid, name, url, ...rest } = props;

  const { data, error, isFetching } = useGetCharacterQuery(uid);

  let photoQuery: string = "";


  let content = null;
  let character: any = {};
  if (isFetching) {
    content = <div>Loading image...</div>;
  } else if (error) {
    content = <div>Error loading image</div>
  } else {
    character = data.result satisfies SwapiCharacter;
    photoQuery = character.properties?.name || "";
    content = <div className="px-6 py-4">
    <div className="font-bold text-xl mb-2">{ character.properties?.name }</div>
    <ul className="character-attributes text-gray-400 ml-0">
      <li>Height: {character.properties.height} </li>
      <li>Mass: {character.properties.mass}</li>
      <li>Birthday: {character.properties.birth_year}</li>
    </ul>
  </div>
  }

  const portrait = photoQuery ? <Photo query={photoQuery} /> : <img className='w-full h-64' src={DefaultPortrait}/>;

  return (
    <div className="max-w-sm w-72 rounded overflow-hidden shadow-lg">
      <div className="card-image-area h-48 overflow-hidden">
        {photoQuery && <Photo query={photoQuery} />}
      </div>
      {content}
  </div>
  );
}

export default CharacterCard;