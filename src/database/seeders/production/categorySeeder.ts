import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
  await knex("plans").del();
  await knex("income").del();
  await knex("expenses").del();
  await knex("categories").del();

  await knex("categories").insert([
    {
      name: "Xăng xe",
      color: "rgb(0, 255, 0)",
      icon: "https://storage.googleapis.com/upload-xdata/xdata-file//icons/data-crawled/9382f490-96be-4526-a622-fbfc9d321655.png",
      status: "expenses",
    },
    {
      name: "Ăn uống",
      color: "rgb(0, 0, 255)",
      icon: "https://storage.googleapis.com/upload-xdata/xdata-file//icons/data-crawled/328386f1-2454-4b39-959d-fa5c05e065f5.png",
      status: "expenses",
    },
    {
      name: "Tình yêu",
      color: "rgb(255, 0, 255)",
      icon: "https://storage.googleapis.com/upload-xdata/xdata-file//icons/data-crawled/692b4963-c76b-4c1d-bf4b-805b51bfa467.png",
      status: "expenses",
    },
    {
      name: "Giải trí",
      color: "rgb(0, 255, 255)",
      icon: "https://storage.googleapis.com/upload-xdata/xdata-file//icons/data-crawled/9d5fef27-9e08-44d1-86d3-074b8b3d058c.png",
      status: "expenses",
    },
    {
      name: "Mục khác",
      color: "rgb(0, 255, 255)",
      icon: "https://storage.googleapis.com/upload-xdata/xdata-file//icons/data-crawled/9d5fef27-9e08-44d1-86d3-074b8b3d058c.png",
      status: "expenses",
    },
    {
      name: "Lương",
      color: "rgb(255, 0, 0)",
      icon: "https://storage.googleapis.com/upload-xdata/xdata-file//icons/data-crawled/e3986861-d2bf-42f3-93b1-b618a89f89be.png",
      status: "incomes",
    },
    {
      name: "Đầu tư",
      color: "rgb(255, 255, 0)",
      icon: "https://storage.googleapis.com/upload-xdata/xdata-file//icons/data-crawled/3e2a019a-9a67-4cb1-8954-f1eaa85f878d.png",
      status: "incomes",
    },
    {
      name: "Tiết kiệm",
      color: "rgb(128, 128, 128)",
      icon: "https://storage.googleapis.com/upload-xdata/xdata-file//icons/data-crawled/617b697b-dbb1-4548-837d-bab94ecc120f.png",
      status: "incomes",
    },
    {
      name: "Mục khác",
      color: "rgb(128, 128, 128)",
      icon: "https://storage.googleapis.com/upload-xdata/xdata-file//icons/data-crawled/617b697b-dbb1-4548-837d-bab94ecc120f.png",
      status: "incomes",
    },

    // await knex("categories").insert([
    //   {
    //     name: "Lương",
    //     color: "rgb(255, 0, 0)",
    //     icon: "https://storage.googleapis.com/upload-xdata/xdata-file//icons/data-crawled/e3986861-d2bf-42f3-93b1-b618a89f89be.png",
    //     status: "incomes",
    //     amount: 0
    //   },
    //   {
    //     name: "Đi lại",
    //     color: "rgb(0, 255, 0)",
    //     icon: "https://storage.googleapis.com/upload-xdata/xdata-file//icons/data-crawled/9382f490-96be-4526-a622-fbfc9d321655.png",
    //     status: "expenses",
    //     amount: 0
    //   },
    //   {
    //     name: "Ăn uống",
    //     color: "rgb(0, 0, 255)",
    //     icon: "https://storage.googleapis.com/upload-xdata/xdata-file//icons/data-crawled/328386f1-2454-4b39-959d-fa5c05e065f5.png",
    //     status: "expenses",
    //     amount: 0
    //   },
    //   {
    //     name: "Đầu tư",
    //     color: "rgb(255, 255, 0)",
    //     icon: "https://storage.googleapis.com/upload-xdata/xdata-file//icons/data-crawled/3e2a019a-9a67-4cb1-8954-f1eaa85f878d.png",
    //     status: "incomes",
    //     amount: 0
    //   },
    //   {
    //     name: "Mua sắm",
    //     color: "rgb(255, 0, 255)",
    //     icon: "https://storage.googleapis.com/upload-xdata/xdata-file//icons/data-crawled/692b4963-c76b-4c1d-bf4b-805b51bfa467.png",
    //     status: "expenses",
    //     amount: 0
    //   },
    //   {
    //     name: "Giải trí",
    //     color: "rgb(0, 255, 255)",
    //     icon: "https://storage.googleapis.com/upload-xdata/xdata-file//icons/data-crawled/9d5fef27-9e08-44d1-86d3-074b8b3d058c.png",
    //     status: "expenses",
    //     amount: 0
    //   },
    //   {
    //     name: "Gửi tiết kiệm",
    //     color: "rgb(128, 128, 128)",
    //     icon: "https://storage.googleapis.com/upload-xdata/xdata-file//icons/data-crawled/617b697b-dbb1-4548-837d-bab94ecc120f.png",
    //     status: "incomes",
    //     amount: 0
    //   },
  ]);
}
