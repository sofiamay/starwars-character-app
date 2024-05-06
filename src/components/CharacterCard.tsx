import { ReactNode } from 'react';
import PropTypes from 'prop-types';

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

function CharacterCard() {
  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg">
      <img className="w-full" src="/img/card-top.jpg" alt="Sunset in the mountains" />
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">The Coldest Sunset</div>
        <p className="text-gray-700 text-base">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus quia, nulla! Maiores et perferendis eaque, exercitationem praesentium nihil.
        </p>
      </div>
  </div>
  );
}

export default CharacterCard;