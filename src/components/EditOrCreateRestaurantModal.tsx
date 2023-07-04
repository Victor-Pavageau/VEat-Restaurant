import {
  Button,
  Form,
  Input,
  InputNumber,
  Select,
  Tag,
  TimePicker,
} from "antd";
import {
  Restaurant,
  SendRestaurant,
  createRestaurant,
  updateRestaurant,
} from "../api/restaurant";
import { PlusOutlined } from "@ant-design/icons";
import { nanoid } from "nanoid";
import { tags } from "../api/common";
import TextArea from "antd/es/input/TextArea";
import { CiCircleRemove } from "react-icons/ci";
import dayjs from "dayjs";

type Props = {
  restaurant?: Restaurant;
  userId: string;
};

function EditOrCreateRestaurantModal(props: Props) {
  const { restaurant, userId } = props;

  const { Option } = Select;
  const defaultOpenTime = "11:30:00";
  const defaultClosureTime = "14:00:00";

  const onFinish = async (values: any) => {
    console.log(values);

    const sendRestaurant: SendRestaurant = {
      ownerId: userId,
      address: values.address,
      logo: values.logo,
      restaurantName: values.name,
      articles: values.articles,
      tags: values.tags,
      menus: values.menus,
      schedule: [
        {
          day: "monday",
          timeSpan: [
            {
              openTime: dayjs(values.monday[0]).format("HH:mm"),
              closureTime: dayjs(values.monday[1]).format("HH:mm"),
            },
          ],
        },
        {
          day: "tuesday",
          timeSpan: [
            {
              openTime: dayjs(values.tuesday[0]).format("HH:mm"),
              closureTime: dayjs(values.tuesday[1]).format("HH:mm"),
            },
          ],
        },
        {
          day: "wednesday",
          timeSpan: [
            {
              openTime: dayjs(values.wednesday[0]).format("HH:mm"),
              closureTime: dayjs(values.wednesday[1]).format("HH:mm"),
            },
          ],
        },
        {
          day: "thursday",
          timeSpan: [
            {
              openTime: dayjs(values.thursday[0]).format("HH:mm"),
              closureTime: dayjs(values.thursday[1]).format("HH:mm"),
            },
          ],
        },
        {
          day: "friday",
          timeSpan: [
            {
              openTime: dayjs(values.friday[0]).format("HH:mm"),
              closureTime: dayjs(values.friday[1]).format("HH:mm"),
            },
          ],
        },
        {
          day: "saturday",
          timeSpan: [
            {
              openTime: dayjs(values.saturday[0]).format("HH:mm"),
              closureTime: dayjs(values.saturday[1]).format("HH:mm"),
            },
          ],
        },
        {
          day: "sunday",
          timeSpan: [
            {
              openTime: dayjs(values.sunday[0]).format("HH:mm"),
              closureTime: dayjs(values.sunday[1]).format("HH:mm"),
            },
          ],
        },
      ],
    };
    if (restaurant) {
      await updateRestaurant(sendRestaurant, restaurant.uid);
    } else {
      await createRestaurant(sendRestaurant);
    }
  };

  return (
    <>
      <Form
        initialValues={{ remember: true }}
        onFinish={onFinish}
        className="h-[80vh] overflow-auto"
      >
        <div className="flex flex-col px-2 pt-1 text-[--gray] gap-y-2">
          <div className="flex flex-col gap-1">
            Name
            <Form.Item
              required
              name={"name"}
              initialValue={restaurant?.restaurantName}
            >
              <Input
                className="bg-[--light-gray] hover:bg-[--light-gray] focus:bg-[--light-gray]"
                bordered={false}
                required
                size="large"
              />
            </Form.Item>
          </div>
        </div>
        <div className="flex flex-col px-2 pt-1 text-[--gray] gap-y-2">
          <div className="flex flex-col gap-1">
            Address
            <Form.Item
              required
              name={"address"}
              initialValue={restaurant?.address.fullAddress}
            >
              <Input
                className="bg-[--light-gray] hover:bg-[--light-gray] focus:bg-[--light-gray]"
                bordered={false}
                required
                size="large"
              />
            </Form.Item>
          </div>
        </div>
        <div className="flex flex-col px-2 pt-1 text-[--gray] gap-y-2">
          <div className="flex flex-col gap-1">
            Tags
            <Form.Item required name={"tags"} initialValue={restaurant?.tags}>
              <Select mode="multiple">
                {tags.map((tag) => {
                  return (
                    <Option value={tag} key={nanoid()}>
                      <Tag color="gold-inverse">{tag}</Tag>
                    </Option>
                  );
                })}
              </Select>
            </Form.Item>
          </div>
        </div>
        <div className="flex flex-col px-2 pt-1 text-[--gray] gap-y-2">
          <div className="flex flex-col gap-1">
            Logo
            <Form.Item required name={"logo"} initialValue={restaurant?.logo}>
              <Input
                className="bg-[--light-gray] hover:bg-[--light-gray] focus:bg-[--light-gray]"
                bordered={false}
                required
                size="large"
              />
            </Form.Item>
          </div>
        </div>
        <Form.List name="menus" initialValue={restaurant?.menus}>
          {(fields, { add, remove }) => (
            <>
              {fields.map(({ name }) => (
                <div className="flex flex-col px-2" key={nanoid()}>
                  <div className="flex gap-3 items-center">
                    <div className="flex gap-3 items-center justify-between w-full">
                      <Form.Item
                        name={[name, "name"]}
                        rules={[{ required: true }]}
                      >
                        <Input placeholder="Name" />
                      </Form.Item>
                      <Form.Item
                        name={[name, "price"]}
                        rules={[{ required: true }]}
                      >
                        <InputNumber placeholder="Price" />
                      </Form.Item>
                    </div>
                    <CiCircleRemove
                      className="mb-6"
                      color="red"
                      size={25}
                      onClick={() => remove(name)}
                    />
                  </div>
                  <Form.Item required name={"articles"}>
                    <Select mode="multiple" className="mb-5">
                      {restaurant?.articles?.map((article) => {
                        return (
                          <Option value={article.uid} key={nanoid()}>
                            {article.name}
                          </Option>
                        );
                      })}
                    </Select>
                  </Form.Item>
                  <div className="flex gap-3 w-full">
                    <Form.Item
                      name={[name, "description"]}
                      rules={[{ required: true }]}
                      className="w-full"
                    >
                      <TextArea
                        placeholder="Description"
                        rows={3}
                        className="w-full min-w-full"
                      />
                    </Form.Item>
                  </div>
                </div>
              ))}
              <Form.Item className="px-20">
                <Button
                  type="dashed"
                  onClick={() => add()}
                  block
                  icon={<PlusOutlined />}
                >
                  Add menu
                </Button>
              </Form.Item>
            </>
          )}
        </Form.List>
        <Form.List name="articles" initialValue={restaurant?.articles}>
          {(fields, { add, remove }) => (
            <>
              {fields.map(({ name }) => (
                <div className="flex flex-col px-2" key={nanoid()}>
                  <div className="flex gap-3 items-center">
                    <div className="flex gap-3 items-center justify-between w-full">
                      <Form.Item
                        name={[name, "name"]}
                        rules={[{ required: true }]}
                      >
                        <Input placeholder="Name" />
                      </Form.Item>
                      <Form.Item
                        name={[name, "price"]}
                        rules={[{ required: true }]}
                      >
                        <InputNumber placeholder="Price" />
                      </Form.Item>
                    </div>
                    <CiCircleRemove
                      className="mb-6"
                      color="red"
                      size={25}
                      onClick={() => remove(name)}
                    />
                  </div>
                  <div className="flex gap-3 w-full">
                    <Form.Item
                      name={[name, "description"]}
                      rules={[{ required: true }]}
                      className="w-full"
                    >
                      <TextArea
                        placeholder="Description"
                        rows={3}
                        className="w-full min-w-full"
                      />
                    </Form.Item>
                  </div>
                </div>
              ))}
              <Form.Item className="px-20">
                <Button
                  type="dashed"
                  onClick={() => add()}
                  block
                  icon={<PlusOutlined />}
                >
                  Add article
                </Button>
              </Form.Item>
            </>
          )}
        </Form.List>
        <div className="flex flex-col px-2 pt-1 text-[--gray]">
          <div className="flex flex-col gap-1 w-full">
            Monday
            <Form.Item
              required
              name={"monday"}
              className="w-full"
              initialValue={[
                dayjs(defaultOpenTime, "HH:mm:ss"),
                dayjs(defaultClosureTime, "HH:mm:ss"),
              ]}
            >
              <TimePicker.RangePicker className="w-full" showNow={true} />
            </Form.Item>
          </div>
          <div className="flex flex-col gap-1 w-full">
            Tuesday
            <Form.Item
              required
              name={"tuesday"}
              className="w-full"
              initialValue={[
                dayjs(defaultOpenTime, "HH:mm:ss"),
                dayjs(defaultClosureTime, "HH:mm:ss"),
              ]}
            >
              <TimePicker.RangePicker className="w-full" showNow={true} />
            </Form.Item>
          </div>
          <div className="flex flex-col gap-1 w-full">
            Wednesday
            <Form.Item
              required
              name={"wednesday"}
              className="w-full"
              initialValue={[
                dayjs(defaultOpenTime, "HH:mm:ss"),
                dayjs(defaultClosureTime, "HH:mm:ss"),
              ]}
            >
              <TimePicker.RangePicker className="w-full" showNow={true} />
            </Form.Item>
          </div>
          <div className="flex flex-col gap-1 w-full">
            Thursday
            <Form.Item
              required
              name={"thursday"}
              className="w-full"
              initialValue={[
                dayjs(defaultOpenTime, "HH:mm:ss"),
                dayjs(defaultClosureTime, "HH:mm:ss"),
              ]}
            >
              <TimePicker.RangePicker className="w-full" showNow={true} />
            </Form.Item>
          </div>
          <div className="flex flex-col gap-1 w-full">
            Friday
            <Form.Item
              required
              name={"friday"}
              className="w-full"
              initialValue={[
                dayjs(defaultOpenTime, "HH:mm:ss"),
                dayjs(defaultClosureTime, "HH:mm:ss"),
              ]}
            >
              <TimePicker.RangePicker className="w-full" showNow={true} />
            </Form.Item>
          </div>
          <div className="flex flex-col gap-1 w-full">
            Saturday
            <Form.Item
              required
              name={"saturday"}
              className="w-full"
              initialValue={[
                dayjs(defaultOpenTime, "HH:mm:ss"),
                dayjs(defaultClosureTime, "HH:mm:ss"),
              ]}
            >
              <TimePicker.RangePicker className="w-full" showNow={true} />
            </Form.Item>
          </div>
          <div className="flex flex-col gap-1 w-full">
            Sunday
            <Form.Item
              required
              name={"sunday"}
              className="w-full"
              initialValue={[
                dayjs(defaultOpenTime, "HH:mm:ss"),
                dayjs(defaultClosureTime, "HH:mm:ss"),
              ]}
            >
              <TimePicker.RangePicker className="w-full" showNow={true} />
            </Form.Item>
          </div>
        </div>
        <div className="flex flex-col px-5 justify-center items-center">
          <Form.Item>
            <Button
              className="flex justify-center items-center w-min mt-7"
              type="primary"
              size="large"
              htmlType="submit"
            >
              <div className="flex justify-center items-center mx-2">
                {restaurant ? (
                  <div>Update my restaurant</div>
                ) : (
                  <div>Create my restaurant</div>
                )}
              </div>
            </Button>
          </Form.Item>
        </div>
      </Form>
    </>
  );
}

export default EditOrCreateRestaurantModal;
