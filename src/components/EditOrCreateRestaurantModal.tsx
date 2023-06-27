import { Restaurant } from "../api/restaurant";

type Props = {
  restaurant?: Restaurant;
};

function EditOrCreateRestaurantModal(props: Props) {
  const { restaurant } = props;

  return (
    <>
      {restaurant ? (
        <div>{restaurant?.restaurantName}</div>
      ) : (
        <div>Create a restaurant modal</div>
      )}
    </>
  );
}

export default EditOrCreateRestaurantModal;
