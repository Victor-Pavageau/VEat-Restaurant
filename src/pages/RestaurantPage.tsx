import { useEffect, useState } from "react";
import { tp } from "../routing";
import { useNavigate } from "react-router-dom";
import { getUserIdFromJWT } from "../api/common";
import NavBar from "../components/NavBar";
import { useGetUserById } from "../hooks/useGetUserById";
import { useGetRestaurantsByOwnerId } from "../hooks/useGetRestaurantsByOwnerId";
import { nanoid } from "nanoid";
import { BsFillHouseFill, BsFillImageFill } from "react-icons/bs";
import { Button, Modal, Tag } from "antd";
import { AiFillTag } from "react-icons/ai";
import { FaBurger } from "react-icons/fa6";
import { MdFastfood } from "react-icons/md";
import EditOrCreateRestaurantModal from "../components/EditOrCreateRestaurantModal";

function HomePage() {
  const [userId] = useState<string | undefined>(getUserIdFromJWT());
  const navigate = useNavigate();
  const { data: user } = useGetUserById(userId!);
  const { data: restaurant } = useGetRestaurantsByOwnerId(userId!);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  useEffect(() => {
    if (userId === undefined) {
      navigate(tp("/profile"));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const shortAddress = (fullAddress: string) => {
    if (fullAddress) {
      if (fullAddress.includes(",")) {
        return fullAddress.split(",")[0];
      }
    }
    return fullAddress;
  };

  return (
    <>
      {user && (
        <>
          <NavBar />
          <Modal
            open={modalIsOpen}
            centered
            onCancel={() => setModalIsOpen(false)}
            footer={null}
          >
            <EditOrCreateRestaurantModal
              restaurant={restaurant}
              userId={user.uid}
            />
          </Modal>
          <div className="overflow-auto h-screen">
            <div className="flex justify-center items-center mt-10">
              <div className="text-xl text-[--orange] font-bold">
                {user.name} {user.surname}
              </div>
            </div>
            <div>
              {restaurant ? (
                <div className="flex justify-center items-center mt-10 px-10 mb-10">
                  <div
                    key={nanoid()}
                    className="bg-white rounded-2xl flex shadow-xl w-full p-3 flex-col mb-20"
                  >
                    <div className="bg-transparent text-lg font-bold mb-3">
                      {restaurant.restaurantName}
                    </div>
                    <div className="flex mt-5 gap-3">
                      <div className="flex items-center justify-center">
                        <BsFillHouseFill size={20} />
                      </div>
                      {shortAddress(restaurant.address.fullAddress)}
                    </div>
                    <div className="flex mt-5 gap-3">
                      <div className="flex items-center justify-center">
                        <AiFillTag size={20} />
                      </div>
                      {restaurant.tags?.map((tag) => {
                        return (
                          <div className="flex" key={nanoid()}>
                            <Tag color="gold-inverse">{tag}</Tag>
                          </div>
                        );
                      })}
                    </div>
                    <div className="flex mt-5 gap-2">
                      <div className="flex items-center justify-center">
                        <BsFillImageFill size={20} />
                      </div>
                      <img
                        src={restaurant.logo}
                        alt="logo"
                        className="h-20 w-auto rounded-lg"
                      />
                    </div>
                    <div className="flex mt-5 gap-2">
                      <div className="flex justify-center">
                        <MdFastfood size={20} />
                      </div>
                      <div className="flex flex-col w-full">
                        {restaurant.menus?.map((menu) => {
                          return (
                            <div key={nanoid()} className="flex flex-col">
                              <div className="flex justify-between w-full">
                                <div>{menu.name}</div>
                                <div>{menu.price} €</div>
                              </div>
                              <div className="text-xs text-[--gray] my-1">
                                {menu.description}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                    <div className="flex mt-5 gap-2">
                      <div className="flex justify-center">
                        <FaBurger size={20} />
                      </div>
                      <div className="flex flex-col w-full">
                        {restaurant.articles?.map((article) => {
                          return (
                            <div key={nanoid()} className="flex flex-col">
                              <div className="flex justify-between w-full">
                                <div>{article.name}</div>
                                <div>{article.price} €</div>
                              </div>
                              <div className="text-xs text-[--gray] my-1">
                                {article.description}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                    <div className="flex justify-center items-center mt-7 mb-3">
                      <Button
                        type="primary"
                        size="large"
                        onClick={() => {
                          setModalIsOpen(true);
                        }}
                      >
                        <div className="flex mx-2">Edit this restaurant</div>
                      </Button>
                    </div>
                  </div>
                </div>
              ) : (
                <>
                  <div className="flex justify-center items-center mt-10 text-[--gray]">
                    You don't have any restaurant yet.
                  </div>
                  <div className="flex justify-center items-center mt-10">
                    <Button
                      type="primary"
                      size="large"
                      onClick={() => {
                        setModalIsOpen(true);
                      }}
                    >
                      <div className="flex mx-2">Create a restaurant</div>
                    </Button>
                  </div>
                </>
              )}
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default HomePage;
