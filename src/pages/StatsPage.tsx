import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getUserIdFromJWT } from "../api/common";
import { tp } from "../routing";
import NavBar from "../components/NavBar";
import { useGetRestaurantsByOwnerId } from "../hooks/useGetRestaurantsByOwnerId";
import { useGetMostOrderedStats } from "../hooks/getMostOrderedStats";
import { useGetMenuById } from "../hooks/useGetMenuById";

function HomePage() {
  const [userId] = useState<string | undefined>(getUserIdFromJWT());
  const navigate = useNavigate();
  const { data: restaurant } = useGetRestaurantsByOwnerId(userId!);
  const { data: mostOrderedStats } = useGetMostOrderedStats(restaurant?.uid!);
  const { data: menuName } = useGetMenuById(
    mostOrderedStats?.mostOrderedItems[1].itemId!
  );

  useEffect(() => {
    if (userId === undefined) {
      navigate(tp("/profile"));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <NavBar />
      <div className="flex justify-center items-center flex-col mt-10 gap-5">
        <div>Most ordered item in {restaurant?.restaurantName}</div>
        <div>
          {mostOrderedStats && (
            <div>
              {menuName?.name && (
                <div className="flex">
                  <div>{menuName?.name}</div>
                  <div className="mx-2">-</div>
                  <div>{`${mostOrderedStats.mostOrderedItems[0].count}`}</div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default HomePage;
