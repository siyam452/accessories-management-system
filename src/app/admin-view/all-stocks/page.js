import CommonListing from "@/components/CommonListing";
import { getAllAdminStocks } from "@/services/stock";

export default async function AdminAllProducts() {
  const allAdminProducts = await getAllAdminStocks();

  return (
    <div>
      <CommonListing data={allAdminProducts && allAdminProducts.data} />
    </div>
  );
}
