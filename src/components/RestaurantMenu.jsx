import { useParams } from 'react-router-dom';
import { useState } from 'react';

import RestaurantCategory from './RestaurantCategory';
import Shimmer from './Shimmer';
import useRestaurantMenu from '../hooks/useRestaurantMenu';

const RestaurantMenu = () => {
  const cardIndex = window.innerWidth >= 400 ? 2 : 3;
  const { resId } = useParams();
  const resInfo = useRestaurantMenu(resId);
  const [showIndex, setShowIndex] = useState(null);
  const dummy = 'Dummy data';

  if (resInfo === null) {
    return <Shimmer />;
  }

  const { name, cuisines, costForTwoMessage } =
    resInfo?.cards[0]?.card?.card?.info;

  const categories = resInfo?.cards[
    cardIndex
  ]?.groupedCard?.cardGroupMap?.REGULAR?.cards.filter(
    (c) =>
      c.card?.card?.['@type'] ===
      'type.googleapis.com/swiggy.presentation.food.v2.ItemCategory'
  );

  const toggleCategory = (index) => {
    setShowIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  return (
    <div className="text-center">
      <h1 className="font-bold my-6 text-2xl">{name}</h1>
      <p className="font-semibold text-lg">
        {cuisines?.join(', ')} - {costForTwoMessage}
      </p>

      {/* categories accordion */}
      {categories.map((category, index) => (
        <RestaurantCategory
          key={category?.card?.card?.title}
          data={category?.card?.card}
          dummy={dummy}
          showItems={index === showIndex}
          toggleCategory={() => toggleCategory(index)}
        />
      ))}
    </div>
  );
};

export default RestaurantMenu;
